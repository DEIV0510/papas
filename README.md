# FRITO MAX — Landing Page

Landing page premium para la marca de pasabocas colombiana **FRITO MAX**.
HTML5 + CSS3 + JavaScript Vanilla (sin frameworks). Lista para producción.

## Estructura

```
fritomax/
├── index.html          # Estructura (semántica, SEO, Open Graph)
├── styles.css          # Diseño completo (tema oscuro · rojo/dorado · glassmorphism)
├── script.js           # Loader, partículas, parallax, 3D, galería, carrusel, formulario
├── assets/
│   ├── favicon.svg
│   ├── img/            # Imágenes optimizadas (.webp)  ← las que usa el sitio
│   └── src/            # Imágenes originales (.png) de la carpeta "Mecato"
├── process.js          # (dev) Optimiza src/*.png → img/*.webp con sharp
├── crop-chicharron.js  # (dev) Recorta guías de render de la imagen de chicharrón
└── serve.js            # (dev) Servidor estático local (node serve.js → :5210)
```

## Cómo verlo

Es un sitio estático: basta con abrir `index.html` en el navegador.
Para servirlo localmente (recomendado, evita restricciones de rutas):

```bash
node serve.js      # → http://localhost:5210
```

## Productos detectados (carpeta "Mecato")

You Kitas · Papas (Natural/Limón/Pollo/BBQ) · Papas Olitas · Chicharrón
(Natural/Picante) · Rosquitas Caleñísimas · Chips de Plátano (Verde/Maduro).

Los productos, sabores, galería y testimonios se generan desde **arreglos de
datos** en `script.js` (`PRODUCTS`, `FLAVORS`, `TESTIMONIALS`). Para **agregar un
producto nuevo**: coloca la imagen en `assets/src/`, corre `node process.js`, y
añade una entrada al arreglo `PRODUCTS`.

## ⚠️ Pendiente de reemplazar (placeholders)

Estos datos son provisionales. Reemplázalos por los reales:

| Dónde | Qué | Valor actual |
|---|---|---|
| `script.js` → `WHATSAPP` | Número de WhatsApp comercial | `573000000000` |
| `index.html` (footer) | Teléfono | `+57 300 000 0000` |
| `index.html` (footer) | Correo | `hola@fritomax.com` |
| `index.html` (footer) | Redes sociales (Instagram/Facebook/TikTok) | `href="#"` |
| Testimonios (`script.js`) | Nombres/comentarios reales de clientes | inventados |
| Estadísticas (`index.html`) | +50.000 / +10 / +100 / +5 | confirmar cifras |

## Características

- Loader cinematográfico (partículas, barra de progreso, animación de marca).
- Hero inmersivo con empaques flotantes, parallax y movimiento por mouse / giroscopio.
- Productos premium con efecto de elevación, brillo y profundidad.
- "Universo de Sabores" con identidad visual por sabor.
- Sección 3D interactiva (los empaques reaccionan al cursor con luz y sombra).
- Contadores animados, galería masonry con lightbox (zoom, teclado, swipe).
- Carrusel de testimonios con autoplay y gestos táctiles.
- Formulario de distribuidores con validación y envío directo a WhatsApp.
- 100% responsive (móvil, tablet, desktop), accesible y con soporte de
  `prefers-reduced-motion`.

Hecho con sabor en Colombia 🇨🇴
