# Portfolio de Leonel Kunst

Base estática para un portfolio profesional en español, con foco en UX/UI, diseño gráfico, branding, motion y piezas visuales.

## Archivos principales

- `index.html`: estructura general del sitio.
- `styles.css`: sistema visual, layout responsive y microinteracciones.
- `portfolio-data.js`: contenido editable del portfolio, especialmente proyectos, experiencia, formación y habilidades.
- `script.js`: filtros, modal de proyectos, formulario de contacto y animaciones.

## Cómo actualizar proyectos

1. Abrí `portfolio-data.js`.
2. Buscá el array `projects`.
3. Duplicá un proyecto existente y editá sus campos.

Campos importantes:

- `category`: categoría principal que aparece en la tarjeta.
- `categories`: categorías usadas por los filtros.
- `summary`: descripción corta de la tarjeta.
- `overview`, `objective`, `challenge`, `process`, `tools`, `deliverables`, `outcome`, `learnings`: contenido del detalle.
- `accent.start` y `accent.end`: colores del proyecto.
- `media`: bloques internos para imágenes, video o embeds.

## Cómo agregar imágenes, videos o embeds

Para imágenes:

- guardá los archivos dentro de una carpeta como `assets/projects/`
- agregá `image: "assets/projects/nombre-archivo.jpg"` dentro del bloque correspondiente

Para videos:

- exportá un `.mp4`
- guardalo dentro de `assets/projects/`
- en un item de `media`, usá:

```js
{
  type: "video",
  title: "Demo motion",
  description: "Animación exportada para mostrar dentro del portfolio.",
  src: "assets/projects/demo-motion.mp4",
  poster: "assets/projects/demo-motion-cover.jpg"
}
```

Para Figma:

- si tenés un link público o embed, cargalo en `embedUrl`
- si todavía no lo definiste, el sitio muestra un placeholder listo para reemplazar

Ejemplo:

```js
{
  type: "embed",
  title: "Prototipo interactivo",
  description: "Embed del archivo de Figma.",
  embedUrl: "https://www.figma.com/embed?embed_host=share&url=TU_URL_PUBLICA"
}
```

## Formulario de contacto

El formulario actual usa `mailto:` para abrir el cliente de correo del usuario. Si más adelante querés un envío real desde la web, podés conectarlo a Formspree, Netlify Forms o un backend propio.

## Animaciones

Las animaciones complejas están preparadas con GSAP por CDN para mantener el proyecto liviano y sin paso de build. Si querés una versión completamente offline, podés descargar GSAP y servirlo localmente.
