# Sitio web A Granel 24/7

Réplica en código (HTML + CSS + JavaScript, sin dependencias ni compilación) de la maqueta
`EN PROCESO/WIREFRAMES/AG247_NUEVOSITIOWEB_MAQUETA_1080X1920.ai` y del wireframe de `DISTRIBUIDORES`.

## Cómo verlo
Doble clic en `index.html`. Para publicarlo, sube la carpeta `SITIO_WEB` completa a cualquier hosting
(cPanel, Netlify, Vercel, Hostinger, etc.).

## Páginas
| Archivo | Sección del menú | Fuente del diseño |
|---|---|---|
| index.html | Inicio | Maqueta pág. 1 |
| equipos.html | Equipos | Maqueta pág. 2 |
| modelos.html | Modelo de negocio | Maqueta pág. 3 |
| nosotros.html | Nosotros | Maqueta pág. 4 |
| contacto.html | Contacto | Maqueta pág. 5 |
| franquicias.html | Franquicias | Maqueta pág. 6 (wireframe gris → se aplicó el estilo del sitio) |
| distribuidores.html | Distribuidores | `DISTRIBUIDORES/AG247_NUEVOSITIO_WIREFRAME_DISTRIBUIDORES.ai` |
| corporativos.html | Corporativos | Sin diseño → página "muy pronto" + formulario |
| calculadora.html | Calculadora | `CALCULADORA_ROI/index (5).html` (también abre como pop-up desde Equipos) |

## Dónde editar
- **Menú, footer, redes sociales, WhatsApp y formulario**: `assets/js/main.js` → bloque `CONFIG` y `NAV`.
  Se editan una sola vez y cambian en todas las páginas.
- **Catálogo de equipos** (tarjetas y filtros): `assets/js/main.js` → `EQUIPOS`. Para agregar un equipo,
  copia una línea, pon la imagen en `assets/img/` (formato .webp) y asígnale `tipo` y `cat`.
- **Colores y tamaños**: `assets/css/styles.css` → variables al inicio (`--navy`, `--blue`, etc.).
  Todas las medidas están en "px de la maqueta" (`calc(N * var(--u))`), por eso el sitio conserva
  las proporciones exactas del diseño en cualquier pantalla de escritorio.

## Formularios
Sin servidor, el botón **Enviar** abre WhatsApp con los datos capturados (número en `CONFIG.whatsapp`).
Para recibirlos por correo/CRM, pega la URL de tu servicio (Formspree, n8n, HubSpot…) en `CONFIG.formEndpoint`.

## Pendientes de contenido (vienen así en la maqueta)
- Testimonios: texto "Lorem ipsum" y la misma foto repetida.
- Preguntas frecuentes de Modelos de negocio: respuestas "Lorem ipsum".
- Preguntas de Franquicias (excepto la primera): sin respuesta en el diseño.
- Diferenciadores 2, 3 y 4 (texto al pasar el mouse): el diseño solo traía el del primero; se redactaron provisionales.
- Franquicias: planes Dúo / +Limpieza / +Croquetas sin textos ni imágenes definitivas.
- Reels "Agranel 24-7 en acción": falta el enlace a cada video (Instagram/TikTok).
- Enlaces de redes sociales y Aviso de Privacidad: `CONFIG.social` y `CONFIG.privacyUrl`.
- WhatsApp: se asumió el 33 3630 8620 (ícono de chat en Contacto). Confirmar.
