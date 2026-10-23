"""Extrae textos y recursos gráficos de los diseños 'LANDING POR EQUIPO/*.ai'.

Genera:
  assets/img/equipos/<slug>-*.webp   (producto, iconos, diagramas, cinta de garantía…)
  assets/img/equipos/comun-*.webp    (recursos compartidos: engranes, cashback…)
  tools/equipos.json                 (textos y colores de cada equipo)

Uso:  python tools/extraer_equipos.py "<carpeta LANDING POR EQUIPO>"
Después: python tools/generar_equipos.py
"""
import glob, io, json, os, re, sys

import pymupdf
from PIL import Image, ImageDraw

SRC = sys.argv[1]
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(BASE, "assets", "img", "equipos")
os.makedirs(OUT, exist_ok=True)

SLUGS = {
    "KIOSKO_AGUA": "kiosko-agua", "KIOSKO_DUO": "kiosko-duo", "VENTANA_DUO": "ventana-duo",
    "VENTANA_HIELO": "ventana-hielo", "VENTANA_LIMPIEZA": "ventana-limpieza",
    "VENTANA_CROQUETAS": "ventana-croquetas", "VENTANA_LEGUMINOSAS": "ventana-leguminosas",
    "VENDING_HIELO": "vending-hielo", "VENDING_CROQUETAS": "vending-croquetas",
    "VENDING_LEGUMINOSAS": "vending-leguminosas",
}


def hexc(rgb):
    return "#%02x%02x%02x" % tuple(round(c * 255) for c in rgb[:3])


def save(img, name, max_w=None, lossless=False):
    if max_w and img.width > max_w:
        img = img.resize((max_w, round(img.height * max_w / img.width)), Image.LANCZOS)
    path = os.path.join(OUT, name + ".webp")
    img.save(path, "WEBP", quality=88, lossless=lossless, method=6)
    return "assets/img/equipos/" + name + ".webp", img.size


def trim(img, pad=4):
    bb = img.getchannel("A").point(lambda a: 255 if a > 6 else 0).getbbox()
    if not bb:
        return img
    x0, y0, x1, y1 = bb
    return img.crop((max(0, x0 - pad), max(0, y0 - pad), min(img.width, x1 + pad), min(img.height, y1 + pad)))


def render(page, rect, scale=2.0):
    pix = page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), clip=rect, alpha=True)
    return Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGBA")


def raster(doc, xref):
    pix = pymupdf.Pixmap(doc, xref)
    if pix.n - pix.alpha >= 4:
        pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
    im = Image.open(io.BytesIO(pix.tobytes("png")))
    sm = doc.xref_get_key(xref, "SMask")
    if sm[0] == "xref":
        m = pymupdf.Pixmap(doc, int(sm[1].split()[0]))
        mi = Image.open(io.BytesIO(m.tobytes("png"))).convert("L").resize(im.size)
        im = im.convert("RGB")
        im.putalpha(mi)
    return im.convert("RGBA")


def text_blocks(page):
    out = []
    for b in page.get_text("dict")["blocks"]:
        if b["type"] != 0:
            continue
        lines, size, color = [], 0, None
        for l in b["lines"]:
            t = "".join(s["text"] for s in l["spans"]).replace("ﬁ", "fi").replace("ﬂ", "fl")
            t = re.sub(r"\s+", " ", t).strip()
            if t:
                lines.append(t)
            for s in l["spans"]:
                if s["text"].strip():
                    size = max(size, s["size"]); color = "#%06x" % s["color"]
        if lines:
            r = pymupdf.Rect(b["bbox"])
            if not any(abs(r.x0 - o["r"].x0) < 2 and abs(r.y0 - o["r"].y0) < 2 and o["lines"] == lines for o in out):
                out.append({"r": r, "lines": lines, "size": size, "color": color})
    out.sort(key=lambda b: (round(b["r"].y0), b["r"].x0))
    return out


def para(lines):
    """Une líneas de un bloque en un párrafo (corrige guiones y espacios)."""
    return re.sub(r"\s+", " ", " ".join(lines)).strip()


def title_rect(page, txt):
    rs = page.search_for(txt)
    return rs[0] if rs else None


def strip_backgrounds(page, extra=()):
    """Quita fondos (cajas grandes, tarjetas y píldoras) para renderizar solo los elementos."""
    targets = []
    for dr in page.get_drawings():
        r, f = dr["rect"], dr.get("fill")
        if not f:
            continue
        big = r.width >= 1200 and r.height >= 60
        pill = 560 <= r.width <= 720 and 80 <= r.height <= 130
        circle = 240 <= r.width <= 300 and 240 <= r.height <= 300 and hexc(f) in ("#e3f5ff", "#e2f5ff", "#e1f4ff")
        if big or pill or circle:
            targets.append(r)
    for i in page.get_image_info(xrefs=True):
        r = pymupdf.Rect(i["bbox"])
        if i["xref"] == 0 and r.width >= 1200:
            targets.append(r)
    targets += list(extra)
    for r in targets:
        page.add_redact_annot(pymupdf.Rect(r.x0 + 5, r.y0 + 5, r.x0 + 8, r.y0 + 8))
    page.apply_redactions(images=pymupdf.PDF_REDACT_IMAGE_REMOVE,
                          graphics=pymupdf.PDF_REDACT_LINE_ART_REMOVE_IF_TOUCHED,
                          text=pymupdf.PDF_REDACT_TEXT_NONE)


def replay(page, rect, scale=2.0):
    """Redibuja en una página nueva solo los trazos contenidos en 'rect' y los renderiza con transparencia."""
    tmp = pymupdf.open()
    np_ = tmp.new_page(width=page.rect.width, height=page.rect.height)
    for dr in page.get_drawings():
        if not rect.contains(dr["rect"]) or dr["rect"].width > rect.width * 0.95:
            continue
        sh = np_.new_shape()
        for it in dr["items"]:
            op = it[0]
            if op == "l": sh.draw_line(it[1], it[2])
            elif op == "c": sh.draw_bezier(it[1], it[2], it[3], it[4])
            elif op == "re": sh.draw_rect(it[1])
            elif op == "qu": sh.draw_quad(it[1])
        sh.finish(color=dr.get("color"), fill=dr.get("fill"), width=dr.get("width") or 1,
                  lineCap=max(dr.get("lineCap") or (0,)) if isinstance(dr.get("lineCap"), (list, tuple)) else (dr.get("lineCap") or 0),
                  lineJoin=dr.get("lineJoin") or 0, closePath=dr.get("closePath", False),
                  even_odd=dr.get("even_odd", False), fill_opacity=dr.get("fill_opacity", 1) or 1,
                  stroke_opacity=dr.get("stroke_opacity", 1) or 1)
        sh.commit()
    return render(np_, rect, scale)


def sample(page, x, y):
    pix = page.get_pixmap(matrix=pymupdf.Matrix(1, 1), clip=pymupdf.Rect(x, y, x + 1, y + 1))
    return "#%02x%02x%02x" % tuple(pix.pixel(0, 0)[:3])


data = {}
shared_done = False

for f in sorted(glob.glob(os.path.join(SRC, "*.ai"))):
    key = os.path.basename(f).replace("AG247_NUEVOSITIO_LANDINGEQUIPO_", "").replace(".ai", "")
    if key not in SLUGS:
        continue
    slug = SLUGS[key]
    doc = pymupdf.open(f)
    page = doc[0]
    W = page.rect.width
    blocks = text_blocks(page)
    eq = {"slug": slug, "key": key}

    # ---------- Cajas de fondo (para colores y límites de secciones)
    boxes = []
    for dr in page.get_drawings():
        r, fl = dr["rect"], dr.get("fill")
        if fl and r.width >= 2000 and r.height >= 300:
            if not any(abs(r.y0 - b["r"].y0) < 3 for b in boxes):
                boxes.append({"r": r, "fill": hexc(fl)})
    boxes.sort(key=lambda b: b["r"].y0)

    def box_of(y):
        for b in boxes:
            if b["r"].y0 - 5 <= y <= b["r"].y1:
                return b
        return None

    # ---------- HERO
    hero_imgs = [i for i in page.get_image_info(xrefs=True) if i["xref"] and i["bbox"][1] < 1300]
    prod = max(hero_imgs, key=lambda i: (i["bbox"][2] - i["bbox"][0]) * (i["bbox"][3] - i["bbox"][1]))
    full = raster(doc, prod["xref"])
    pr = pymupdf.Rect(prod["bbox"])
    abb = full.getchannel("A").point(lambda a: 255 if a > 6 else 0).getbbox() or (0, 0, full.width, full.height)
    sx, sy = pr.width / full.width, pr.height / full.height
    eq["producto_box"] = [round(pr.x0 + abb[0] * sx), round(pr.y0 + abb[1] * sy), round(pr.x0 + abb[2] * sx), round(pr.y0 + abb[3] * sy)]
    img = full.crop(abb)
    eq["producto"], eq["producto_size"] = save(img, f"{slug}-producto", max_w=700)
    hero_box = [i for i in page.get_image_info(xrefs=True) if i["xref"] == 0 and i["bbox"][2] - i["bbox"][0] > 2000 and i["bbox"][1] > 230]
    eq["hero_top"] = round(min(i["bbox"][1] for i in hero_box)) if hero_box else 271
    eq["hero_h"] = round(max(i["bbox"][3] for i in hero_box) - eq["hero_top"]) if hero_box else 1097
    title = [b for b in blocks if b["r"].y1 < 760 and b["size"] >= 60]
    eq["titulo"] = title[0]["lines"] if title else []
    card = None
    for dr in page.get_drawings():
        r, fl = dr["rect"], dr.get("fill")
        if fl and hexc(fl) == "#ffffff" and r.y0 < 900 and r.width > 1000:
            card = r; break
    eq["hero_card"] = [round(v) for v in card] if card else None
    eq["hero_parrafos"] = [para(b["lines"]) for b in blocks if card and card.contains(b["r"]) and b["r"].x0 < pr.x0]
    # colores del degradado del hero
    eq["hero_colores"] = {
        "izq": sample(page, 120, 820), "der": sample(page, W - 120, 820),
        "brillo": sample(page, pr.x0 - 20, pr.y0 + 120), "arriba": sample(page, (pr.x0 + pr.x1) / 2, 300),
    }

    # ---------- CARACTERÍSTICAS
    t = title_rect(page, "CARACTERÍSTICAS DEL EQUIPO")
    pill_r = title_rect(page, "EQUIPOS DESARROLLADOS")
    circles = []
    for dr in page.get_drawings():
        r, fl = dr["rect"], dr.get("fill")
        if fl and 240 <= r.width <= 300 and 240 <= r.height <= 300 and t and pill_r and t.y1 < r.y0 < pill_r.y0:
            if not any(abs(r.x0 - c.x0) < 3 for c in circles):
                circles.append(r)
    circles.sort(key=lambda r: r.x0)
    eq["caracteristicas"] = []
    eq["sub_caracteristicas"] = para([b for b in blocks if t and t.y1 - 5 < b["r"].y0 < t.y1 + 60][0]["lines"]) if t else ""
    for c in circles:
        lines = []
        for b in blocks:
            if c.y1 < b["r"].y0 < c.y1 + 170 and b["r"].x0 < c.x1 + 20 and b["r"].x1 > c.x0 - 20:
                lines += b["lines"]
        eq["caracteristicas"].append({"texto": lines, "rect": [round(v) for v in c]})

    # ---------- COMPONENTES
    tc = title_rect(page, "COMPONENTES")
    comp_box = None
    for b in boxes:
        if tc and b["r"].y0 < tc.y0 < b["r"].y1:
            comp_box = b
    eq["componentes_bg"] = comp_box["fill"] if comp_box else "#f2f2f2"
    ccard = None
    for dr in page.get_drawings():
        r, fl = dr["rect"], dr.get("fill")
        if comp_box and fl and hexc(fl) == "#ffffff" and comp_box["r"].contains(r) and 500 < r.width < 800:
            ccard = r
    eq["componentes_parrafos"] = [para(b["lines"]) for b in blocks if ccard and ccard.contains(b["r"])]
    labels = [b for b in blocks if comp_box and comp_box["r"].contains(b["r"]) and ccard and b["r"].x0 > ccard.x1 and b["size"] < 30]
    eq["componentes_etiquetas"] = [para(b["lines"]) for b in labels]

    # ---------- PURIFICACIÓN
    tp = title_rect(page, "COMPONENTES DEL SISTEMA")
    eq["purificacion"] = bool(tp)
    if tp:
        pbox = box_of(tp.y0)
        eq["purificacion_bg"] = pbox["fill"] if pbox else "#e3f5ff"

    # ---------- VENDINGS MÓVILES
    tv = title_rect(page, "VENDINGS M")
    eq["vending"] = bool(tv)
    if tv:
        items = [b for b in blocks if tv.y1 + 20 < b["r"].y0 < tv.y1 + 500 and b["size"] < 30]
        eq["vending_items"] = [para(b["lines"]) for b in items]

    # ---------- CASHBACK
    tcb = title_rect(page, "OFRECE A TUS CLIENTES")
    eq["cashback"] = bool(tcb)

    # ---------- INVERSIÓN
    ti = title_rect(page, "INVERSIÓN SEGURA")
    ibox = box_of(ti.y0) if ti else None
    eq["inversion_bg"] = ibox["fill"] if ibox else "#e3f5ff"
    pblocks = [b for b in blocks if ti and ti.y1 < b["r"].y0 and b["size"] >= 60 and "AÑADE" not in " ".join(b["lines"])]
    rows = []
    for b in pblocks:
        txt = " | ".join(b["lines"])
        if "MESES" in txt and len(b["lines"]) >= 2:
            rows.append({"tipo": "meses", "etiqueta": b["lines"][0].replace("1:", "").replace("MESES1", "MESES").strip(), "valor": b["lines"][-1], "y": b["r"].y0, "x": b["r"].x0})
        elif "$" in txt:
            lab = [l for l in b["lines"] if "$" not in l]
            val = [l for l in b["lines"] if "$" in l][0]
            if not lab:
                prev = [x for x in blocks if x["r"].y1 <= b["r"].y0 + 30 and x["r"].y0 > b["r"].y0 - 60 and "PRECIO" in " ".join(x["lines"])]
                lab = prev[-1]["lines"] if prev else ["PRECIO DE LISTA"]
            rows.append({"tipo": "lista", "etiqueta": " | ".join(lab), "valor": val, "y": b["r"].y0, "x": b["r"].x0})
    rows.sort(key=lambda r: (round(r["y"] / 120), r["x"]))
    eq["precios"] = rows
    eq["precios_layout"] = "doble" if any("FABRICADORA" in r["etiqueta"] for r in rows) else "simple"
    alc = [b for b in blocks if "AÑADE AGUA ALCALINA" in " ".join(b["lines"])]
    eq["alcalina"] = bool(alc)
    nota = [b for b in blocks if "PRECIO DIFERIDO" in " ".join(b["lines"])]
    eq["nota_precio"] = para(nota[0]["lines"]) if nota else ""
    eq["nota_cashback"] = next((para(b["lines"]) for b in blocks if "RECOMENDAMOS ABONAR" in " ".join(b["lines"])), "")

    # ---------- Recursos gráficos (sin fondos)
    clean = pymupdf.open(f)
    cp = clean[0]
    strip_backgrounds(cp)

    eq["iconos"] = []
    for i, c in enumerate(circles):
        im = trim(render(cp, c, 2.0))
        eq["iconos"].append({"src": save(im, f"{slug}-carac{i + 1}", lossless=True)[0], "w": round(im.width / 2), "h": round(im.height / 2)})

    if ccard and comp_box:
        x0 = min([b["r"].x0 for b in labels] + [ccard.x1 + 60]) - 20
        rect = pymupdf.Rect(max(x0, ccard.x1 + 20), comp_box["r"].y0 + 20, W - 540, comp_box["r"].y1 - 20)
        im = trim(render(cp, rect, 2.0), pad=6)
        eq["diagrama_w"] = round(im.width / 2)
        eq["diagrama"], eq["diagrama_size"] = save(im, f"{slug}-componentes", lossless=True)

    if tp:
        pbox = box_of(tp.y0)
        tblock = [b for b in blocks if b["r"].intersects(tp)]
        ty = max(b["r"].y1 for b in tblock) if tblock else tp.y1
        rect = pymupdf.Rect(560, ty + 20, W - 540, pbox["r"].y1 - 20)
        raw = render(cp, rect, 2.0)
        abb = raw.getchannel("A").point(lambda a: 255 if a > 6 else 0).getbbox() or (0, 0, raw.width, raw.height)
        im = trim(raw, pad=6)
        eq["purificacion_w"] = round(im.width / 2)
        eq["purificacion_dx"] = round(560 + abb[0] / 2 - 594)
        eq["purificacion_img"], _ = save(im, f"{slug}-purificacion", max_w=2400)

    if tv:
        vbox_imgs = [i for i in page.get_image_info(xrefs=True) if i["xref"] and tv.y0 - 200 < i["bbox"][1] < tv.y1 + 600]
        if vbox_imgs:
            vi = max(vbox_imgs, key=lambda i: (i["bbox"][2] - i["bbox"][0]))
            eq["vending_img"], _ = save(trim(raster(doc, vi["xref"])), f"{slug}-espacio", max_w=900)
        eq["vending_iconos"] = []
        for k, b in enumerate(items):
            rect = pymupdf.Rect(590, b["r"].y0 - 20, b["r"].x0 - 10, b["r"].y1 + 20)
            vim = trim(render(cp, rect, 2.0))
            eq["vending_iconos"].append({"src": save(vim, f"{slug}-vend{k + 1}", lossless=True)[0], "w": round(vim.width / 2)})

    if ti:
        rib = None
        for dr in page.get_drawings():
            r, fl = dr["rect"], dr.get("fill")
            if fl and 240 <= r.width <= 320 and 450 <= r.height <= 600 and r.y0 > ti.y0:
                rib = r; eq["cinta_color"] = hexc(fl); break
        if not rib:  # en los vending la cinta es una imagen con degradado
            for i in page.get_image_info(xrefs=True):
                r = pymupdf.Rect(i["bbox"])
                if 240 <= r.width <= 320 and 450 <= r.height <= 600 and r.y0 > ti.y0:
                    rib = r; eq["cinta_color"] = sample(page, (r.x0 + r.x1) / 2, r.y0 + 40); break
        if rib:
            im = trim(render(cp, pymupdf.Rect(rib.x0 - 10, rib.y0 - 10, rib.x1 + 10, rib.y1 + 40), 2.0))
            eq["cinta_w"] = round(im.width / 2)
            eq["cinta"], _ = save(im, f"{slug}-garantia", lossless=True)

    # ---------- Recursos compartidos (una vez, del Kiosko Dúo)
    if key == "KIOSKO_DUO" and not shared_done:
        # icono de engranes: imagen cuadrada de ~434 px junto al título "Principales componentes"
        gear = [i for i in page.get_image_info(xrefs=True) if i["xref"] and 380 < i["bbox"][2] - i["bbox"][0] < 480
                and 380 < i["bbox"][3] - i["bbox"][1] < 480 and comp_box and comp_box["r"].y0 - 100 < i["bbox"][1] < comp_box["r"].y0 + 600]
        if gear:  # se conserva el margen transparente: se muestra en su caja de 434 px
            save(raster(doc, gear[0]["xref"]).resize((868, 868), Image.LANCZOS), "comun-engranes")
        # tarjetas cashback
        cards = [i for i in page.get_image_info(xrefs=True) if i["xref"] and tcb and i["bbox"][1] > tcb.y1 + 400]
        if cards:
            save(trim(raster(doc, cards[0]["xref"])), "comun-tarjetas", max_w=700)
        # arte CASH BACK: render y limpieza del degradado por relleno desde los bordes
        art_rect = pymupdf.Rect(560, tcb.y1 + 60, 1300, tcb.y1 + 700)
        pix = page.get_pixmap(matrix=pymupdf.Matrix(2, 2), clip=art_rect)
        art = Image.open(io.BytesIO(pix.tobytes("png"))).convert("RGB")
        mask = Image.new("L", art.size, 0)
        work = art.copy()
        for seed in [(1, 1), (art.width - 2, 1), (1, art.height - 2), (art.width - 2, art.height - 2), (art.width // 2, 1), (art.width // 2, art.height - 2), (1, art.height // 2), (art.width - 2, art.height // 2)]:
            ImageDraw.floodfill(work, seed, (255, 0, 255), thresh=38)
        px, wpx = art.load(), work.load()
        alpha = Image.new("L", art.size, 255)
        apx = alpha.load()
        for y in range(art.height):
            for x in range(art.width):
                if wpx[x, y] == (255, 0, 255):
                    apx[x, y] = 0
        rgba = art.convert("RGBA"); rgba.putalpha(alpha)
        save(trim(rgba), "comun-cashback", max_w=900)
        # iconos de las píldoras cashback
        pills = [b for b in blocks if tcb and tcb.y1 < b["r"].y0 < tcb.y1 + 520 and b["r"].x0 > 1400]
        for k, b in enumerate(pills[:3]):
            rect = pymupdf.Rect(b["r"].x0 - 150, b["r"].y0 - 10, b["r"].x0 - 10, b["r"].y1 + 10)
            # el icono se toma con el color de su propia píldora (blanco o celeste), igual al fondo en HTML
            rect = pymupdf.Rect(b["r"].x0 - 126, b["r"].y0 - 8, b["r"].x0 - 22, b["r"].y1 + 8)
            save(render(page, rect, 2.0), f"comun-cb{k + 1}", lossless=True)
        data["_comun"] = {"cashback_items": [para(b["lines"]) for b in pills[:3]]}
        shared_done = True

    data[slug] = eq
    print(f"{slug:22s} carac={len(circles)} precios={len(rows)} purif={eq['purificacion']} vend={eq['vending']} cb={eq['cashback']} alc={eq['alcalina']}")

json.dump(data, open(os.path.join(BASE, "tools", "equipos.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
