"""Genera las páginas equipo-<slug>.html a partir de tools/equipos.json.

Uso:  python tools/generar_equipos.py
(Primero corre tools/extraer_equipos.py si cambian los diseños.)
"""
import html, json, os, re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = json.load(open(os.path.join(BASE, "tools", "equipos.json"), encoding="utf-8"))
COMUN = DATA.pop("_comun")

X0, HERO_TOP, HERO_H = 594, 271, 1097  # origen del contenido en el diseño (px)


def u(v):
    return f"calc({v} * var(--u))"


def esc(t):
    return html.escape(t, quote=False)


def nombre(eq):
    return " ".join(eq["titulo"]).title().replace("Dúo", "Dúo").replace(" De ", " de ").replace(" Y ", " y ")


def mixcolor(hexc, amt):
    """Aclara un color hacia blanco (para el brillo del hero)."""
    h = hexc.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    r, g, b = (round(c + (255 - c) * amt) for c in (r, g, b))
    return f"#{r:02x}{g:02x}{b:02x}"


def precio_html(eq):
    rows = eq["precios"]
    if eq["precios_layout"] == "doble":
        out = []
        for i in range(0, len(rows), 2):
            lst, mes = rows[i], rows[i + 1] if i + 1 < len(rows) else None
            out.append(f'''          <div class="rowd">
            <div><p class="lbl">{esc(lst["etiqueta"])}</p><p class="big">{esc(lst["valor"])}</p></div>
            {f'<div class="m"><p class="lbl">Precio de meses<sup>1</sup>:</p><p class="mid">{esc(mes["valor"])}</p></div>' if mes else ''}
          </div>''')
        return "\n".join(out)
    lst = next(r for r in rows if r["tipo"] == "lista")
    mes = next((r for r in rows if r["tipo"] == "meses"), None)
    return f'''          <div class="rows">
            <div><p class="lbl">Precio de lista</p><p class="big">{esc(lst["valor"])}<small>MXN</small></p></div>
            {f'<div class="p2"><p class="lbl">Precio de meses<sup>1</sup>:</p><p class="big">{esc(mes["valor"])}<small>MXN</small></p></div>' if mes else ''}
          </div>'''


def page(eq):
    slug, nm = eq["slug"], nombre(eq)
    c = eq["hero_colores"]
    px0, py0, px1, py1 = eq["producto_box"]
    titulo = " <br>".join(esc(t) for t in eq["titulo"])
    hero_ps = "\n".join(f"            <p>{esc(p)}</p>" for p in eq["hero_parrafos"])
    feats = []
    for f, ic in zip(eq["caracteristicas"], eq["iconos"]):
        txt = " <br>".join(esc(t) for t in f["texto"])
        feats.append(f'''        <div class="item"><div class="circle"><img src="{ic["src"]}" alt="" style="width:{u(ic["w"])};height:auto" loading="lazy"></div><h3>{txt}</h3></div>''')
    comp_ps = "\n".join(f"            <p>{esc(p)}</p>" for p in eq["componentes_parrafos"])
    etiquetas = ", ".join(eq.get("componentes_etiquetas", []))
    desc = esc(eq["hero_parrafos"][0]) if eq["hero_parrafos"] else ""

    purif = ""
    if eq.get("purificacion"):
        purif = f'''
    <!-- COMPONENTES DEL SISTEMA DE PURIFICACIÓN -->
    <section class="eq eq-purif reveal" style="--bgp:{eq.get('purificacion_bg', '#e3f5ff')}">
      <div class="eq-wrap">
        <h2 class="t55">Componentes del sistema <br>de purificación</h2>
        <div class="scroll"><img src="{eq['purificacion_img']}" alt="Diagrama del sistema de purificación: depósito de agua cruda, presurizador con bomba, suavizador, ósmosis inversa, generador de ozono, filtro pulidor, luz ultravioleta y filtro alcalino" style="width:{u(eq['purificacion_w'])};margin-left:{u(eq['purificacion_dx'])}" loading="lazy"></div>
      </div>
    </section>'''

    vend = ""
    if eq.get("vending"):
        items = "\n".join(
            f'''          <li><img src="{ic["src"]}" alt="" style="width:{u(ic["w"])}" loading="lazy">{esc(t)}</li>'''
            for t, ic in zip(eq["vending_items"], eq["vending_iconos"]))
        vend = f'''
    <!-- VENDINGS MÓVILES -->
    <section class="eq eq-vend reveal">
      <div class="eq-wrap">
        <div>
          <h2 class="t55">Vendings móviles <br>para cualquier <br>ubicación</h2>
          <ul>
{items}
          </ul>
        </div>
        <img class="room" src="{eq['vending_img']}" alt="Ilustración de un espacio de 1 m² para instalar el equipo" loading="lazy">
      </div>
    </section>'''

    cb = ""
    if eq.get("cashback"):
        # mismos cortes de línea que el diseño
        cb_items = ["Genera más ventas dando a tus <br>clientes puntos en cada compra",
                    "Regala producto en <br>activaciones comerciales",
                    "Bonifica el cambio <br>para próximas compras"]
        lis = "\n".join(f'''          <li><img src="assets/img/equipos/comun-cb{i + 1}.webp" alt="">{t}</li>''' for i, t in enumerate(cb_items))
        cb = f'''
    <!-- PROGRAMA DE LEALTAD -->
    <section class="eq eq-cb reveal">
      <div class="eq-wrap">
        <h2 class="t55">Ofrece a tus clientes <br>el nuevo programa de lealtad</h2>
        <div class="grid">
          <img class="art" src="assets/img/equipos/comun-cashback.webp" alt="Cash Back" loading="lazy">
          <ul>
{lis}
          </ul>
        </div>
        <div class="gratis"><strong>¡GRATIS!</strong><span>Llévate las primeras 100 tarjetas de lealtad gratis</span><img src="assets/img/equipos/comun-tarjetas.webp" alt="Tarjetas de lealtad Cash Back" loading="lazy"></div>
        <p class="eq-note">{esc(eq.get("nota_cashback") or "*Te recomendamos abonar un 10% de cashback en hielo y agua.")}</p>
      </div>
    </section>'''

    alc = ""
    if eq.get("alcalina"):
        alc = '''
        <div class="eq-alc">
          <p class="a"><span>Aumenta tus ventas</span><strong>Añade agua alcalina</strong></p>
          <p class="b"><i>Por sólo</i>$10,000<em>adicionales</em></p>
        </div>'''

    nota = esc(re.sub(r"^1\.\s*", "", eq.get("nota_precio", "")))

    return f'''<!doctype html>
<html lang="es-MX">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{esc(nm)} | A Granel 24/7</title>
  <meta name="description" content="{desc}">
  <link rel="icon" href="assets/img/logo-color.webp">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/styles.css">
  <script src="assets/js/main.js" defer></script>
</head>
<body data-page="equipos">
  <!-- Página generada con tools/generar_equipos.py; edita tools/equipos.json y vuelve a generar -->
  <div data-header></div>

  <main>
    <!-- HERO -->
    <section class="eq eq-hero" style="--c1:{c['izq']};--c2:{c['der']};--glow:{mixcolor(c['der'], .35)}">
      <div class="eq-wrap">
        <h1>{titulo}</h1>
        <div class="card">
          <div class="txt">
{hero_ps}
          </div>
        </div>
        <img class="prod" src="{eq['producto']}" alt="{esc(nm)}" style="left:{u(px0 - X0)};top:{u(py0 - HERO_TOP)};width:{u(px1 - px0)}">
      </div>
    </section>

    <!-- CARACTERÍSTICAS DEL EQUIPO -->
    <section class="eq eq-feat reveal">
      <div class="eq-wrap">
        <h2 class="t55">Características del equipo</h2>
        <p class="s25">{esc(eq.get("sub_caracteristicas") or "Funciones que hacen únicos a nuestros equipos automatizados 24-7")}</p>
        <div class="row">
{chr(10).join(feats)}
        </div>
        <p class="pill">Equipos desarrollados por ingeniería 100% mexicana</p>
      </div>
    </section>

    <!-- PRINCIPALES COMPONENTES -->
    <section class="eq eq-comp reveal" style="--bgc:{eq['componentes_bg']}">
      <div class="eq-wrap">
        <div class="left">
          <img class="gear" src="assets/img/equipos/comun-engranes.webp" alt="" loading="lazy">
          <h2 class="t55">Principales <br>componentes</h2>
          <div class="card">
{comp_ps}
          </div>
        </div>
        <img class="diagram" src="{eq['diagrama']}" alt="Esquema de componentes: {esc(etiquetas)}" style="width:{u(eq['diagrama_w'])}" loading="lazy">
      </div>
    </section>
{purif}{vend}{cb}

    <!-- INVERSIÓN SEGURA Y CONFIABLE -->
    <section class="eq eq-inv reveal" style="--bgi:{eq['inversion_bg']}">
      <div class="eq-wrap">
        <h2 class="t55">Inversión segura <br>y confiable</h2>
        <div class="card">
{precio_html(eq)}
          <img class="ribbon" src="{eq['cinta']}" alt="Garantía de 12 meses y permisos básicos garantizados" style="width:{u(eq['cinta_w'])}" loading="lazy">
        </div>{alc}
        <p class="foot"><sup>1</sup>{nota}</p>
      </div>
    </section>

    <div data-contact-form="default" data-equipo="{esc(nm)}"></div>
  </main>

  <div data-footer></div>
</body>
</html>
'''


for slug, eq in DATA.items():
    out = os.path.join(BASE, f"equipo-{slug}.html")
    open(out, "w", encoding="utf-8").write(page(eq))
    print("generada", os.path.basename(out))
