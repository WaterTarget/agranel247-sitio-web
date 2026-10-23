# Sitio web A Granel 24/7

Réplica en código (HTML + CSS + JavaScript, sin dependencias ni compilación) de los diseños de la carpeta
"Nuevo Sitio Web". Publicado en GitHub Pages: https://watertarget.github.io/agranel247-sitio-web/

## Cómo verlo
Doble clic en `index.html`. Cada cambio que se sube al repositorio `WaterTarget/agranel247-sitio-web`
se publica solo en 1–2 minutos.

## Páginas
| Archivo | Sección del menú | Fuente del diseño |
|---|---|---|
| index.html | Inicio | `EN PROCESO/WIREFRAMES/AG247_NUEVOSITIOWEB_MAQUETA_1080X1920.ai` pág. 1 |
| equipos.html | Equipos | Maqueta pág. 2 |
| modelos.html | Modelo de negocio | Maqueta pág. 3 |
| nosotros.html | Nosotros | Maqueta pág. 4 |
| contacto.html | Contacto | Maqueta pág. 5 |
| franquicias.html | Franquicias | `FRANQUICIAS/AG247_NUEVOSITIO_WIREFRAME_FRANQUICIAS.ai` |
| distribuidores.html | Distribuidores | `DISTRIBUIDORES/AG247_NUEVOSITIO_WIREFRAME_DISTRIBUIDORES.ai` |
| equipo-*.html (10) | "Ver más" de cada equipo | `LANDING POR EQUIPO/*.ai` |
| corporativos.html | Corporativos | Sin diseño → página "muy pronto" + formulario |
| calculadora.html | Calculadora (pop-up desde el menú) | `CALCULADORA_ROI/index (5).html` |

## Medidas
Todas las medidas usan "px del diseño" (`calc(N * var(--u))`): a 1920 px de ancho el sitio mide exactamente
lo mismo que la maqueta. Escala tipográfica del diseñador: títulos 55, subtítulos 25 SemiBold, cuerpo 25
(interlineado 1.2), etiquetas 20 ExtraBold, formularios 20, separación entre secciones 184.
Los iconos 3D se exportan **con su margen transparente original** y se colocan en la misma caja del diseño.

## Páginas de equipo (se generan automáticamente)
Si el diseñador cambia un archivo de `LANDING POR EQUIPO`, ejecutar desde la carpeta "Nuevo Sitio Web":

```
python SITIO_WEB/tools/extraer_equipos.py "LANDING POR EQUIPO"
python SITIO_WEB/tools/generar_equipos.py
```

El primero saca textos, precios, colores, iconos y diagramas de cada diseño (`tools/equipos.json` e
imágenes en `assets/img/equipos/`); el segundo genera las 10 páginas `equipo-*.html`.

## Dónde editar
- **Menú, footer, redes sociales, WhatsApp, Aviso de Privacidad y formulario**: `assets/js/main.js` → `CONFIG` y `NAV`.
- **Catálogo de equipos** (tarjetas, filtros y a qué página lleva "Ver más"): `assets/js/main.js` → `EQUIPOS`.
- **Modelos de franquicia del formulario**: `assets/js/main.js` → `FRANQUICIAS`.

## Formularios
Sin servidor, **Enviar** abre WhatsApp con los datos (número en `CONFIG.whatsapp`). Para recibirlos por
correo/CRM, pega la URL del servicio (Formspree, n8n, HubSpot…) en `CONFIG.formEndpoint`.
Los botones **Cotizar** (equipos sin página propia) y **Seleccionar** (modelos de franquicia) llenan el
formulario automáticamente.

## Pendientes de contenido
- **Aviso de Privacidad**: falta la URL (`CONFIG.privacyUrl`); mientras tanto se muestra como texto.
- Testimonios y preguntas frecuentes de Modelos/Franquicias: el diseño trae "Lorem ipsum".
- **Landings por modelo de negocio** (`EN PROCESO/LANDINGS MODELOS`): siguen en wireframe gris; no se implementaron.
- **Catálogo PSB** (`EQUIPOS/CATALOGO/*.psb`, subido el 22 oct): sin exportar a PNG; se usaron los PNG de esa carpeta.
- Textos del diseño por confirmar con el diseñador:
  - Ventana de Limpieza: "Ofrece hasta 6 diferentes tipos de **croquetas**" (¿productos de limpieza?) y "Sensor de **chasback**".
  - Kiosko de Agua: "Integra al sistema agua alcalina **al sistema**" (repetido).
  - Vending de Hielo / Croquetas / Leguminosas: el texto de componentes dice "La **Ventana** de…".
  - Distribuidores: "TU EMPRESA ESTÁ LISTA PARA EL CRECIMIENTO?" (falta "¿"; en el sitio se agregó).
- WhatsApp de los formularios: 33 3630 8620 (confirmar).
