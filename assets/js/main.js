/* ==========================================================================
   A Granel 24/7 — Comportamiento del sitio
   Header, footer y formulario se generan aquí para editarlos en un solo lugar.
   ========================================================================== */

/* ---------- Configuración editable ---------- */
const CONFIG = {
  // Si se define, los formularios se envían por POST (JSON) a esta URL (ej. Formspree, n8n, CRM).
  // Si está vacío, el formulario abre WhatsApp con el mensaje armado.
  formEndpoint: "",
  whatsapp: "523336308620",
  email: "contacto@agranel24-7.com",
  social: {
    facebook: "https://www.facebook.com/share/17qP31fJcX/",
    instagram: "https://www.instagram.com/agranel247/",
    tiktok: "https://www.tiktok.com/@agranel24_7",
  },
  privacyUrl: "", // URL del Aviso de Privacidad; mientras esté vacío se muestra como texto
};

const NAV = [
  ["index.html", "Inicio"],
  ["equipos.html", "Equipos"],
  ["modelos.html", "Modelo de negocio"],
  ["corporativos.html", "Corporativos"],
  ["franquicias.html", "Franquicias"],
  ["distribuidores.html", "Distribuidores"],
  ["calculadora.html", "Calculadora"],
  ["nosotros.html", "Nosotros"],
  ["contacto.html", "Contacto"],
];

const ESTADOS = ["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"];

/* Catálogo de equipos: tipo = kioskos | ventanas | vending; cat = filtro de producto */
const EQUIPOS = [
  { name: "Ventana <br>de agua", desc: "Ventana automatizada de agua empotrada en muro", img: "equipo-ventana-agua", tipo: "ventanas", cat: ["agua"] },
  { name: "Ventana <br>de hielo y agua", desc: "Ventana automatizada de hielo y agua empotrada en muro", img: "equipo-ventana-hielo-agua", tipo: "ventanas", cat: ["agua-hielo", "agua", "hielo"], href: "equipo-ventana-duo.html" },
  { name: "Ventana <br>de hielo", desc: "Ventana automatizada de hielo empotrada en muro", img: "equipo-ventana-hielo", tipo: "ventanas", cat: ["hielo"], href: "equipo-ventana-hielo.html" },
  { name: "Ventana <br>de limpieza", desc: "Ventana automatizada de seis productos de limpieza empotrada en muro", img: "equipo-ventana-limpieza", tipo: "ventanas", cat: ["limpieza"], href: "equipo-ventana-limpieza.html" },
  { name: "Ventana de <br>limpieza 12", desc: "Ventana automatizada de doce productos de limpieza empotrada en muro", img: "equipo-ventana-limpieza-12", tipo: "ventanas", cat: ["limpieza"], href: "equipo-ventana-limpieza.html" },
  { name: "Ventana <br>de croquetas", desc: "Ventana automatizada de cuatro tipos de croquetas empotrada en muro", img: "equipo-ventana-croquetas", tipo: "ventanas", cat: ["croquetas"], href: "equipo-ventana-croquetas.html" },
  { name: "Ventana <br>de leguminosas", desc: "Ventana automatizada de cuatro tipos de granos y semillas empotrada en muro", img: "equipo-ventana-leguminosas", tipo: "ventanas", cat: ["leguminosas"], href: "equipo-ventana-leguminosas.html" },
  { name: "Vending <br>de hielo", desc: "Máquina vending móvil de hielo a granel, ocupa aproximadamente 1 m²", img: "equipo-vending-hielo", tipo: "vending", cat: ["hielo"], href: "equipo-vending-hielo.html" },
  { name: "Vending <br>de croquetas", desc: "Máquina vending móvil de cuatro tipos de croquetas", img: "equipo-vending-croquetas", tipo: "vending", cat: ["croquetas"], href: "equipo-vending-croquetas.html" },
  { name: "Vending <br>de leguminosas", desc: "Máquina vending móvil de cuatro tipos de granos y semillas", img: "equipo-vending-leguminosas", tipo: "vending", cat: ["leguminosas"], href: "equipo-vending-leguminosas.html" },
  { name: "Kiosko de agua", desc: "Sistema de purificación de agua <br>y ventana automatizada de agua empotrable en muro.", img: "equipo-kiosko-agua", tipo: "kioskos", cat: ["agua"], wide: true, href: "equipo-kiosko-agua.html" },
  { name: "Kiosko dúo hielo &amp; agua", desc: "Sistema de purificación de agua <br>y ventana automatizada de hielo y agua empotrable en muro.", img: "equipo-kiosko-duo", tipo: "kioskos", cat: ["agua-hielo", "agua", "hielo"], wide: true, href: "equipo-kiosko-duo.html" },
];
const FRANQUICIAS = ["Modelo Kiosko Dúo", "Modelo Kiosko Dúo y Limpieza", "Modelo Kiosko Dúo y Croquetas", "Modelo Kiosko Dúo, Croquetas y Limpieza"];
const CHIPS = [["todos", "Todos"], ["kioskos", "Kioskos"], ["ventanas", "Ventanas"], ["vending", "Vending"], ["agua-hielo", "Agua y hielo"], ["agua", "Agua"], ["hielo", "Hielo"], ["limpieza", "Limpieza"], ["croquetas", "Croquetas"], ["leguminosas", "Leguminosas"]];

/* ---------- Iconos ---------- */
const ICON = {
  left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="M6 4l15 8-15 8z"/></svg>',
  sound: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 4V5L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4zM14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>Ver con sonido',
  facebook: '<svg viewBox="0 0 24 24"><path d="M14 8V6.2c0-.8.2-1.2 1.4-1.2H17V2h-2.6C11.3 2 10.3 3.5 10.3 6v2H8v3h2.3v11H14V11h2.6l.4-3z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24"><path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.9-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM21 8.1c-.1-1.6-.4-3-1.6-4.1C18.3 2.9 16.9 2.5 15.3 2.5 13.7 2.4 10.3 2.4 8.7 2.5 7.1 2.5 5.7 2.9 4.6 4 3.5 5.1 3.1 6.5 3 8.1c-.1 1.6-.1 6.2 0 7.8.1 1.6.4 3 1.6 4.1 1.1 1.1 2.5 1.5 4.1 1.5 1.6.1 5 .1 6.6 0 1.6-.1 3-.4 4.1-1.5 1.1-1.1 1.5-2.5 1.6-4.1.1-1.6.1-6.2 0-7.8zm-2 9.9a3 3 0 0 1-1.7 1.7c-1.2.5-3.9.4-5.3.4s-4.1.1-5.3-.4A3 3 0 0 1 5 18c-.5-1.2-.4-3.9-.4-5.3s-.1-4.1.4-5.3A3 3 0 0 1 6.7 5.7C7.9 5.2 10.6 5.3 12 5.3s4.1-.1 5.3.4A3 3 0 0 1 19 7.4c.5 1.2.4 3.9.4 5.3s.1 4.1-.4 5.3z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24"><path d="M16.6 2h-3.4v13.4a2.9 2.9 0 1 1-2-2.8V9.1a6.3 6.3 0 1 0 5.4 6.3V8.6a8.2 8.2 0 0 0 4.8 1.5V6.7a4.8 4.8 0 0 1-4.8-4.7z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2C.5 9.1.5 12 .5 12s0 2.9.5 4.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-4.8.5-4.8s0-2.9-.5-4.8zM9.7 15V9l5.8 3-5.8 3z"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/></svg>',
};

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

/* ---------- Componentes compartidos ---------- */
function renderHeader() {
  const slot = $("[data-header]");
  if (!slot) return;
  const page = document.body.dataset.page ? `${document.body.dataset.page}.html` : location.pathname.split("/").pop() || "index.html";
  slot.outerHTML = `
  <header class="site-header">
    <div class="inner">
      <a class="logo" href="index.html" aria-label="A Granel 24/7 — Inicio"><img src="assets/img/logo-blanco.webp" alt="A Granel 24/7 by Water Target" width="600" height="425"></a>
      <nav class="nav" aria-label="Principal">
        ${NAV.map(([href, label]) => `<a href="${href}"${href === page ? ' class="active" aria-current="page"' : ""}>${label}</a>`).join("")}
      </nav>
      <button class="menu-toggle" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </header>`;
  const header = $(".site-header");
  const toggle = $(".menu-toggle", header);
  toggle.addEventListener("click", () => {
    const open = header.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  document.addEventListener("click", (e) => { if (!header.contains(e.target)) header.classList.remove("open"); });
}

function renderFooter() {
  const slot = $("[data-footer]");
  if (!slot) return;
  const year = new Date().getFullYear() < 2026 ? 2026 : new Date().getFullYear();
  slot.outerHTML = `
  <footer class="site-footer">
    <div class="inner">
      <div>
        <a class="logo" href="index.html"><img src="assets/img/logo-blanco.webp" alt="A Granel 24/7" width="600" height="425" loading="lazy"></a>
        <p>Todos los derechos reservados A Granel 24/7 ${year} ® <br>Consulta nuestra Política de uso de datos personales. ${CONFIG.privacyUrl && CONFIG.privacyUrl !== "#" ? `<a href="${CONFIG.privacyUrl}">Aviso de Privacidad</a>` : "Aviso de Privacidad"}</p>
      </div>
      <div class="social">
        ${Object.keys(CONFIG.social).map((k) => `<a href="${CONFIG.social[k]}" target="_blank" rel="noopener" aria-label="A Granel 24/7 en ${k[0].toUpperCase() + k.slice(1)}">${ICON[k]}</a>`).join("")}
      </div>
    </div>
  </footer>`;
}

function renderContactForms() {
  $$("[data-contact-form]").forEach((slot) => {
    const variant = slot.dataset.contactForm; // "default" | "distribuidor" | "franquicia"
    const title = slot.dataset.title || "Contáctanos para más información";
    const extra = variant === "distribuidor" || variant === "franquicia";
    const opts = ESTADOS.map((e) => `<option>${e}</option>`).join("");
    slot.outerHTML = `
    <section class="section panel-width contact-form-box reveal" id="formulario">
      <h2 class="h-section center">${title}</h2>
      <p class="h-sub center">Estamos para ayudarte. Déjanos tus datos y recibe asesoría de acuerdo a tus necesidades</p>
      <form class="form" novalidate data-form="${variant}">
        <div class="row"><label for="f-nombre-${variant}">Nombre y apellido:</label><input id="f-nombre-${variant}" name="nombre" required autocomplete="name" placeholder="Escribe tu nombre completo"></div>
        ${extra ? `<div class="row"><label for="f-correo-${variant}">Correo electrónico:</label><input id="f-correo-${variant}" name="correo" type="email" required autocomplete="email" placeholder="nombre@empresa.com"></div>` : ""}
        <div class="row"><label for="f-tel-${variant}">WhatsApp:</label><input id="f-tel-${variant}" name="whatsapp" type="tel" inputmode="numeric" required pattern="[0-9]{10}" maxlength="10" autocomplete="tel-national" placeholder="Escribe los 10 dígitos de tu teléfono"></div>
        ${variant === "distribuidor" ? `<div class="row"><label for="f-giro-${variant}">Giro de tu empresa:</label><input id="f-giro-${variant}" name="giro" placeholder="Ej. Fabricación de productos de limpieza"></div>` : ""}
        <div class="row"><label for="f-estado-${variant}">Estado:</label><select id="f-estado-${variant}" name="estado" required><option value="" disabled selected>Aguascalientes</option>${opts}</select></div>
        <div class="row"><label for="f-ciudad-${variant}">Ciudad:</label><input id="f-ciudad-${variant}" name="ciudad" required placeholder="Ej. Zapopan"></div>
        ${variant === "franquicia" ? `<div class="row"><label for="f-modelo-${variant}">Modelo de franquicia:</label><select id="f-modelo-${variant}" name="modelo" class="filled">${FRANQUICIAS.map((m) => `<option>${m}</option>`).join("")}</select></div>` : ""}
        <div class="row top"><label for="f-msg-${variant}">Mensaje:</label><textarea id="f-msg-${variant}" name="mensaje" placeholder="${variant === "franquicia" ? "Ej. Hola! Quiero más información sobre el modelo de franquicia Dúo y Limpieza." : "Ej. Hola! Quiero más información sobre los equipos vending."}">${slot.dataset.equipo ? `Hola! Quiero más información sobre el equipo ${slot.dataset.equipo}.` : ""}</textarea></div>
        <div class="actions"><span class="form-msg" role="status"></span><button class="btn btn-send" type="submit">Enviar</button></div>
      </form>
    </section>`;
  });

  $$("form[data-form]").forEach((form) => {
    const sel = $("select", form);
    sel.addEventListener("change", () => sel.classList.add("filled"));
    $("input[type=tel]", form).addEventListener("input", (e) => (e.target.value = e.target.value.replace(/\D/g, "").slice(0, 10)));
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const msg = $(".form-msg", form);
      let ok = true;
      $$("[required]", form).forEach((f) => {
        const bad = !f.value.trim() || !f.checkValidity();
        f.classList.toggle("invalid", bad);
        if (bad) ok = false;
      });
      if (!ok) { msg.textContent = "Revisa los campos marcados."; msg.className = "form-msg error"; return; }
      const data = Object.fromEntries(new FormData(form));
      data.origen = `${document.title} (${form.dataset.form})`;
      if (CONFIG.formEndpoint) {
        try {
          const r = await fetch(CONFIG.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
          if (!r.ok) throw new Error();
          form.reset(); sel.classList.remove("filled");
          msg.textContent = "¡Gracias! Un asesor se pondrá en contacto contigo."; msg.className = "form-msg";
        } catch {
          msg.textContent = "No pudimos enviar tu mensaje. Intenta de nuevo."; msg.className = "form-msg error";
        }
        return;
      }
      const lines = [
        `Hola, soy ${data.nombre}.`,
        data.correo && `Correo: ${data.correo}`,
        `WhatsApp: ${data.whatsapp}`,
        data.giro && `Giro: ${data.giro}`,
        data.modelo && `Modelo de franquicia: ${data.modelo}`,
        `Ubicación: ${data.ciudad}, ${data.estado}`,
        data.mensaje && `Mensaje: ${data.mensaje}`,
        `(${data.origen})`,
      ].filter(Boolean);
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
      msg.textContent = "¡Gracias! Te estamos redirigiendo a WhatsApp."; msg.className = "form-msg";
    });
  });
}

/* ---------- Carrusel de banners (fade + autoplay) ---------- */
function initCarousels() {
  $$("[data-carousel]").forEach((c) => {
    const slides = $$(".slide", c);
    if (slides.length < 2) { slides[0]?.classList.add("is-active"); return; }
    const dots = $(".carousel-dots", c);
    let i = slides.findIndex((s) => s.classList.contains("is-active"));
    if (i < 0) i = 0;
    let timer;
    if (dots) dots.innerHTML = slides.map((_, k) => `<button aria-label="Ir al slide ${k + 1}"></button>`).join("");
    const go = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => { s.classList.toggle("is-active", k === i); s.setAttribute("aria-hidden", k !== i); });
      dots && $$("button", dots).forEach((d, k) => d.classList.toggle("is-active", k === i));
    };
    const play = () => { clearInterval(timer); if (!matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(() => go(i + 1), +(c.dataset.interval || 6000)); };
    $(".carousel-arrow.prev", c)?.addEventListener("click", () => { go(i - 1); play(); });
    $(".carousel-arrow.next", c)?.addEventListener("click", () => { go(i + 1); play(); });
    dots && $$("button", dots).forEach((d, k) => d.addEventListener("click", () => { go(k); play(); }));
    c.addEventListener("mouseenter", () => clearInterval(timer));
    c.addEventListener("mouseleave", play);
    let x0 = null;
    c.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
    c.addEventListener("touchend", (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) { go(i + (dx < 0 ? 1 : -1)); play(); } x0 = null; });
    go(i); play();
  });
}

/* ---------- Pistas con scroll horizontal (equipos, testimonios) ---------- */
function bindTrack(wrap) {
  const track = $(".track", wrap);
  const prev = $("[data-prev]", wrap), next = $("[data-next]", wrap);
  if (!track || !prev || !next) return;
  const step = () => (track.firstElementChild?.getBoundingClientRect().width || 300) + parseFloat(getComputedStyle(track).columnGap || 0);
  const update = () => {
    prev.disabled = track.scrollLeft <= 4;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  };
  prev.onclick = () => track.scrollBy({ left: -step(), behavior: "smooth" });
  next.onclick = () => track.scrollBy({ left: step(), behavior: "smooth" });
  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
  return update;
}

/* ---------- Tarjetas en bucle infinito ("5 negocios en uno") ---------- */
function initLoops() {
  $$("[data-loop]").forEach((root) => {
    const track = $(".track", root);
    const items = [...track.children];
    if (items.length < 2) return;
    // Ventana recortada + segunda copia de las tarjetas: la pista corre sin fin y sin saltos visibles
    const view = document.createElement("div");
    view.className = "loop-view";
    track.before(view); view.appendChild(track);
    items.forEach((el) => { const c = el.cloneNode(true); c.setAttribute("aria-hidden", "true"); track.appendChild(c); });
    let period = 0, step = 0;
    const measure = () => {
      period = track.children[items.length].offsetLeft - items[0].offsetLeft;
      step = items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
    };
    measure();
    new ResizeObserver(measure).observe(view);

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const secsPerCard = +(root.dataset.speed || 3.2); // una tarjeta cada ~3 s, en movimiento continuo
    let offset = 0, pending = 0, drag = null, last = 0, raf = 0;
    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05); last = now;
      if (!drag && !reduce) offset += (step / secsPerCard) * dt;
      if (pending) { const d = Math.abs(pending) < 0.5 ? pending : pending * Math.min(1, dt * 7); offset += d; pending -= d; } // flechas: salto suave
      if (period) offset = ((offset % period) + period) % period;
      track.style.transform = `translate3d(${-offset}px, 0, 0)`;
      raf = requestAnimationFrame(frame);
    };
    const start = () => { if (!raf) { last = performance.now(); raf = requestAnimationFrame(frame); } };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    $("[data-prev]", root)?.addEventListener("click", () => (pending -= step));
    $("[data-next]", root)?.addEventListener("click", () => (pending += step));
    // Arrastrar con el dedo o el mouse también la mueve (el scroll vertical de la página sigue libre)
    track.addEventListener("pointerdown", (e) => { drag = { x: e.clientX }; track.setPointerCapture(e.pointerId); });
    track.addEventListener("pointermove", (e) => { if (!drag) return; offset -= e.clientX - drag.x; drag.x = e.clientX; });
    const release = () => (drag = null);
    track.addEventListener("pointerup", release);
    track.addEventListener("pointercancel", release);

    // Solo se anima mientras la sección está en pantalla
    if ("IntersectionObserver" in window) new IntersectionObserver(([en]) => (en.isIntersecting ? start() : stop())).observe(root);
    else start();
  });
}

/* ---------- Catálogo de equipos ---------- */
function initCatalog() {
  $$("[data-catalog]").forEach((root) => {
    const chipsEl = $(".chips", root);
    const track = $(".track", root);
    const empty = $(".catalog-empty", root);
    const tabs = $$(".cat-tabs button", root.closest("section") || document);
    chipsEl.innerHTML = CHIPS.map(([k, l]) => `<button data-chip="${k}">${l}</button>`).join("");
    const update = bindTrack($(".track-wrap", root));
    const select = (key) => {
      $$("button", chipsEl).forEach((b) => b.classList.toggle("is-active", b.dataset.chip === key));
      tabs.forEach((t) => t.classList.toggle("is-active", t.dataset.tab === key));
      const items = EQUIPOS.filter((p) => key === "todos" || p.tipo === key || p.cat.includes(key));
      track.innerHTML = items.map((p) => `
        <article class="product-card${p.wide ? " wide" : ""}">
          <div class="pc-img"><img src="assets/img/${p.img}.webp" alt="${p.name.replace(/ <br>/g, " ")}" loading="lazy"></div>
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          ${p.href ? `<a class="btn btn-sm" href="${p.href}">Ver más</a>` : `<a class="btn btn-sm" href="#formulario" data-interes="${p.name.replace(/ <br>/g, " ")}">Cotizar</a>`}
        </article>`).join("");
      empty.classList.toggle("show", items.length === 0);
      track.scrollLeft = 0;
      update && requestAnimationFrame(update);
    };
    chipsEl.addEventListener("click", (e) => { const b = e.target.closest("[data-chip]"); if (b) select(b.dataset.chip); });
    tabs.forEach((t) => t.addEventListener("click", () => select(t.dataset.tab)));
    select(root.dataset.catalog || "todos");
  });
}

/* ---------- Reels "En acción" ---------- */
function initReels() {
  $$("[data-reels]").forEach((root) => {
    const reels = $$(".reel", root);
    const stage = $(".reels-stage", root);
    const isMobile = () => matchMedia("(max-width: 680px)").matches;
    let c = 1;
    let inView = false;

    // Reproduce en silencio solo los reels indicados; pausa el resto.
    const playOnly = (targets) => reels.forEach((r) => {
      const v = $("video", r);
      if (!v) return;
      if (inView && targets.includes(r)) {
        v.preload = "auto";
        v.play().then(() => r.classList.add("is-playing")).catch(() => {});
      } else {
        v.pause();
        r.classList.remove("is-playing");
      }
    });

    const layout = () => {
      if (isMobile()) {
        reels.forEach((r) => { r.style.order = ""; r.style.display = ""; r.classList.remove("is-center"); });
        return;
      }
      const n = reels.length;
      reels.forEach((r, k) => {
        const pos = (k - c + n) % n; // 0 = centro, 1 = derecha, n-1 = izquierda
        r.classList.toggle("is-center", pos === 0);
        r.style.order = pos === 0 ? 2 : pos === n - 1 ? 1 : 3;
        r.style.display = pos === 0 || pos === 1 || pos === n - 1 ? "" : "none";
      });
      playOnly([reels[c]]);
    };

    $("[data-prev]", root).onclick = () => { c = (c - 1 + reels.length) % reels.length; layout(); };
    $("[data-next]", root).onclick = () => { c = (c + 1) % reels.length; layout(); };
    reels.forEach((r, k) => r.addEventListener("click", () => {
      if (!isMobile() && !r.classList.contains("is-center")) { c = k; layout(); return; }
      playOnly([]);
      openVideo(r.dataset.video);
    }));

    // Solo reproducir cuando la sección está en pantalla (ahorra datos y batería)
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([en]) => { inView = en.isIntersecting; isMobile() ? mobilePick() : layout(); }, { threshold: 0.25 }).observe(root);
    } else { inView = true; }

    // En celular: reproducir el reel que quede centrado al deslizar
    const mobilePick = () => {
      if (!isMobile()) return;
      const mid = stage.getBoundingClientRect().left + stage.clientWidth / 2;
      let best = reels[0], dist = Infinity;
      reels.forEach((r) => { const b = r.getBoundingClientRect(); const d = Math.abs(b.left + b.width / 2 - mid); if (d < dist) { dist = d; best = r; } });
      playOnly([best]);
    };
    let t;
    stage.addEventListener("scroll", () => { clearTimeout(t); t = setTimeout(mobilePick, 120); }, { passive: true });

    layout();
    window.addEventListener("resize", () => (isMobile() ? (layout(), mobilePick()) : layout()));
  });
}

/* ---------- Acordeón ---------- */
function initAccordions() {
  $$(".accordion").forEach((acc) => {
    $$(".acc-item", acc).forEach((item) => {
      const q = $(".acc-q", item);
      q.insertAdjacentHTML("beforeend", ICON.chevron);
      q.setAttribute("aria-expanded", item.classList.contains("open"));
      q.addEventListener("click", () => {
        const willOpen = !item.classList.contains("open");
        $$(".acc-item", acc).forEach((o) => { o.classList.remove("open"); $(".acc-q", o).setAttribute("aria-expanded", false); });
        if (willOpen) { item.classList.add("open"); q.setAttribute("aria-expanded", true); }
      });
    });
  });
}

/* ---------- Modelos de negocio: categorías ---------- */
function initModelPanel() {
  const root = $("[data-models]");
  if (!root) return;
  const cats = $$(".model-cat", root);
  const panes = $$(".pane", root);
  const show = (k) => {
    cats.forEach((c) => c.classList.toggle("is-active", c.dataset.target === k));
    panes.forEach((p) => p.classList.toggle("is-active", p.dataset.pane === k));
  };
  cats.forEach((c) => c.addEventListener("click", (e) => {
    if (c.dataset.link) return; // enlace directo (franquicias)
    e.preventDefault();
    show(c.dataset.target);
  }));
  const hash = location.hash.replace("#", "");
  if (panes.some((p) => p.dataset.pane === hash)) show(hash);
}

/* ---------- Tarjetas diferenciadoras (tap en móvil) ---------- */
function initDiffCards() {
  $$(".diff-card[data-flip]").forEach((card) => {
    card.setAttribute("tabindex", "0");
    card.addEventListener("click", () => card.classList.toggle("is-open"));
  });
}

/* ---------- Modales (calculadora desde Equipos / video) ---------- */
let lastFocus = null;
function openModal(html, { cls = "", title = "" } = {}) {
  let m = $("#modal");
  if (!m) {
    document.body.insertAdjacentHTML("beforeend", `
      <div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="dialog">
          <div class="bar"><strong id="modal-title"></strong><button class="close" aria-label="Cerrar">×</button></div>
          <div class="content"></div>
        </div>
      </div>`);
    m = $("#modal");
    const close = () => {
      m.classList.remove("open");
      $(".content", m).innerHTML = "";
      document.documentElement.style.overflow = "";
      lastFocus?.focus();
    };
    $(".close", m).onclick = close;
    m.addEventListener("click", (e) => { if (e.target === m) close(); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && m.classList.contains("open")) close(); });
  }
  lastFocus = document.activeElement;
  m.className = `modal open ${cls}`;
  $("#modal-title", m).textContent = title;
  $(".content", m).innerHTML = html;
  document.documentElement.style.overflow = "hidden";
  $(".close", m).focus();
}
function openVideo(src) { openModal(`<video src="${src}" controls autoplay playsinline></video>`, { cls: "video", title: "Video" }); }
function openCalculator() {
  openModal('<iframe src="calculadora-roi.html" title="Calculadora ROI A Granel 24/7"></iframe>', { title: "Calculadora ROI A Granel 24/7" });
}
function initModals() {
  // Botones con data-open-calculator abren la calculadora en pop-up (el menú lleva a la página completa)
  $$("[data-open-calculator]").forEach((b) => b.addEventListener("click", (e) => {
    e.preventDefault();
    openCalculator();
  }));
  $$("[data-video-box]").forEach((box) => {
    box.addEventListener("click", () => {
      if (box.classList.contains("playing")) return;
      const v = document.createElement("video");
      v.src = box.dataset.videoBox; v.controls = true; v.autoplay = true; v.playsInline = true;
      box.appendChild(v); box.classList.add("playing");
    });
  });
}

/* ---------- Calculadora ROI: página completa bajo el menú del sitio ---------- */
function initCalcFrame() {
  const frame = $("[data-calc-frame]");
  if (!frame) return;
  // calculadora-roi.html avisa su altura para que la página haga el scroll (sin barra interna)
  window.addEventListener("message", (e) => {
    if (e.source === frame.contentWindow && e.data && e.data.agCalcHeight) frame.style.height = `${Math.ceil(e.data.agCalcHeight)}px`;
  });
}

/* ---------- Mapa de Contacto (Leaflet + OpenStreetMap) ---------- */
function initContactMap() {
  const el = $("[data-osm-map]");
  if (!el || !window.L) return; // sin conexión se queda la imagen fija del mapa
  const pos = [+el.dataset.lat, +el.dataset.lng];
  el.innerHTML = "";
  const map = L.map(el, { scrollWheelZoom: false, zoomControl: true }).setView(pos, +(el.dataset.zoom || 17));
  const calles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
  }).addTo(map);
  const satelite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19, attribution: "Imágenes &copy; Esri",
  });
  L.control.layers({ Mapa: calles, "Satélite": satelite }, null, { position: "topright" }).addTo(map);
  // Marcador: el showroom en miniatura (assets/img/showroom-pin.svg); la punta marca la entrada del local
  const pin = L.icon({ iconUrl: "assets/img/showroom-pin.svg", iconSize: [104, 80], iconAnchor: [51, 77], popupAnchor: [0, -70], tooltipAnchor: [44, -46], className: "map-pin" });
  const ruta = `https://www.openstreetmap.org/directions?route=%3B${pos[0]}%2C${pos[1]}#map=17/${pos[0]}/${pos[1]}`;
  L.marker(pos, { icon: pin, title: "A Granel 24/7" }).addTo(map)
    .bindTooltip("A Granel 24-7", { permanent: true, direction: "right", className: "map-label" })
    .bindPopup(`<strong>A Granel 24/7</strong><br>${el.dataset.address}<br><a href="${ruta}" target="_blank" rel="noopener">Cómo llegar</a>`);
  // La rueda del mouse solo hace zoom después de dar clic en el mapa (no estorba el scroll de la página)
  map.on("click", () => map.scrollWheelZoom.enable());
  el.addEventListener("mouseleave", () => map.scrollWheelZoom.disable());
  // En celular, un dedo desliza la página; el mapa se mueve después de tocar el aviso
  if (L.Browser.mobile) {
    map.dragging.disable();
    const hint = L.DomUtil.create("button", "map-hint", el);
    hint.type = "button";
    hint.textContent = "Toca para mover el mapa";
    L.DomEvent.on(hint, "click", (e) => { L.DomEvent.stop(e); map.dragging.enable(); hint.remove(); });
  }
}

/* ---------- Video del hero (desktop/móvil) ---------- */
function initHeroVideo() {
  const v = $("[data-hero-video]");
  if (!v) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { v.removeAttribute("autoplay"); return; }
  const mobile = matchMedia("(max-width: 680px)").matches;
  v.src = mobile ? v.dataset.mobile : v.dataset.desktop;
  v.play().catch(() => {});
}

/* ---------- Mapa de México + contadores (GSAP + ScrollTrigger) ---------- */
function countUp(el, duration = 1.8) {
  const end = +el.dataset.count, pre = el.dataset.prefix || "", suf = el.dataset.suffix || "";
  const render = (n) => (el.textContent = `${pre}${Math.round(n).toLocaleString("es-MX").replace(",", "")}${suf}`);
  if (window.gsap) {
    const o = { n: 0 };
    gsap.to(o, { n: end, duration, ease: "power2.out", onUpdate: () => render(o.n) });
  } else render(end);
}

function initMapAnimation() {
  const sections = $$(".reach");
  if (!sections.length) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  sections.forEach((sec) => {
    // Safari no reproduce video con transparencia (WebM VP9): ahí se muestra la imagen fija del mapa
    const map = $(".map", sec);
    if (map && map.tagName === "VIDEO" && !map.canPlayType('video/webm; codecs="vp9"')) {
      const img = new Image();
      img.className = "map"; img.src = map.getAttribute("poster"); img.alt = map.getAttribute("aria-label") || "";
      map.replaceWith(img);
    }
    // El mapa solo muestra el movimiento propio del video; aquí solo se animan textos y contadores.
    const title = $(".h-section", sec);
    const sub = $(".h-sub", sec);
    const stats = $$(".stat", sec);
    const counters = $$("[data-count]", sec);
    sec.classList.remove("reveal");
    if (reduce) return;

    if (!window.gsap || !window.ScrollTrigger) {
      const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { counters.forEach((c) => countUp(c)); io.disconnect(); } }, { threshold: 0.4 });
      io.observe(sec);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    gsap.set([title, sub, ...stats], { opacity: 0, y: 34 });
    counters.forEach((c) => (c.textContent = `${c.dataset.prefix || ""}0${c.dataset.suffix || ""}`));
    gsap.timeline({ scrollTrigger: { trigger: sec, start: "top 72%", once: true } })
      .to(title, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.1)
      .to(sub, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.3)
      .to(stats, { opacity: 1, y: 0, duration: 0.7, stagger: 0.18, ease: "power3.out", onStart: () => counters.forEach((c, i) => setTimeout(() => countUp(c), i * 180)) }, 0.5);
  });
}

/* ---------- Botones que llenan el formulario ("Cotizar", "Seleccionar") ---------- */
function initFormShortcuts() {
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-interes], [data-modelo]");
    if (!b) return;
    const form = $("#formulario form");
    if (!form) return;
    e.preventDefault();
    const msg = $("textarea", form);
    if (b.dataset.modelo) {
      const sel = $('select[name="modelo"]', form);
      if (sel) sel.value = b.dataset.modelo;
      msg.value = `Hola! Quiero más información sobre el ${b.dataset.modelo.replace("Modelo", "modelo de franquicia")}.`;
    } else {
      msg.value = `Hola! Quiero cotizar el equipo ${b.dataset.interes}.`;
    }
    $("#formulario").scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => $('input[name="nombre"]', form).focus({ preventScroll: true }), 600);
  });
}

/* ---------- Aparición al hacer scroll ---------- */
function initReveal() {
  const els = $$(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
  const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px" });
  els.forEach((e) => io.observe(e));
}

/* ---------- Íconos de flechas en botones ---------- */
function fillIcons() {
  $$("[data-icon]").forEach((el) => { if (!el.innerHTML.trim()) el.innerHTML = ICON[el.dataset.icon]; });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderContactForms();
  fillIcons();
  initCarousels();
  initCatalog();
  $$("[data-track]").forEach(bindTrack);
  initLoops();
  initReels();
  initAccordions();
  initModelPanel();
  initDiffCards();
  initModals();
  initCalcFrame();
  initContactMap();
  initHeroVideo();
  initMapAnimation();
  initFormShortcuts();
  initReveal();
});
