# Portfolio de Leonel Kunst — v2

Esta carpeta es una copia de trabajo del portfolio. Los archivos de la raíz no
se tocaron. `v2` contiene solo lo que cambia: el código, las imágenes de
proyecto en WebP, el CV y la imagen para compartir. Todo lo demás (videos,
páginas del manual de marca) se sigue leyendo de `../assets`.

## Qué cambia en v2

**Para quien recluta**

- El hero dice qué hacés, tu disponibilidad, ubicación, modalidad e idiomas, y
  ofrece el CV sin hacer scroll. Esos textos se editan en `profile`, dentro de
  `portfolio-data.js` (`availability`, `location`, `mode`, `languages`, `cv`).
- Las tres tarjetas del hero resumen experiencia, formación y herramientas.
- Cada tarjeta de proyecto muestra el año y tu rol.
- "Sobre mí" y "Contacto" suman lo que aportás, el CV y el estado de disponibilidad.
- Metadatos para compartir: `og:image` (`assets/og-cover.png`), URL canónica y JSON-LD.

**Seguridad**

- Política de contenido (CSP) por cabecera en `vercel.json` y por `<meta>` en
  `index.html`. Si cambiás una, cambiá la otra: `tests/security.test.cjs` lo verifica.
- Sin scripts de terceros ni scripts en línea: GSAP 3.12.7 está en `vendor/` y
  el arranque del tema en `theme-init.js`.
- Todo el contenido de `portfolio-data.js` se escapa antes de llegar a la
  página y las URL se validan (`getViewData`, `safeUrl` en `script.js`). Los
  iframes solo aceptan Figma.
- El formulario limita longitudes, descarta envíos de bots (campo oculto y
  tiempo mínimo) y ya no desactiva el captcha de FormSubmit en el envío sin JS.
- `.vercelignore` evita publicar respaldos, notas internas, tests y carpetas de origen.
- Se quitó la foto de fondo que se cargaba desde pexels.com (ver `styles.css`,
  `.site-shell::after`).

**Animaciones**

- La entrada dura unos 3 segundos, se ve una vez por sesión, se salta con un
  clic, scroll o Esc, y no aparece con enlaces directos (`/#contacto`) ni con
  "reducir movimiento" activado.
- Las secciones aparecen con opacidad y desplazamiento, sin desenfoque ni
  parallax por panel. Los títulos suben detrás de una máscara y las tarjetas de
  proyecto entran escalonadas, también al filtrar.
- El detalle de proyecto se cierra con animación y bloquea el foco del fondo.
- El modo oscuro vuelve a tener fondo oscuro.

## Cómo pasar v2 a producción

1. Revisá la vista previa (`Abrir-vista-previa.cmd`, puerto 4174).
2. Copiá el contenido de `v2/` sobre la raíz del repositorio, incluida la
   carpeta `v2/assets`, que se combina con `assets`. Las rutas no cambian.
3. Borrá la carpeta `v2/` de la raíz o dejala: `.vercelignore` no la publica.
4. Corré `node --test tests/*.cjs` y publicá.

El plan con las decisiones está en `docs/PLAN-V2.md`.

Base estática para un portfolio profesional en español, con foco en UX/UI, diseño gráfico, branding, motion y piezas visuales.

## Archivos principales

Para abrir la vista previa en Windows, hacé doble clic en `Abrir-vista-previa.cmd`.
También podés iniciarla con `node preview.cjs` y abrir `http://127.0.0.1:4174/`.
La vista previa envía las mismas cabeceras de seguridad que producción.
La vista es local y funciona mientras el servidor esté activo; no publica nada.

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
- `presentation`: ficha opcional para casos UX/UI; muestra aporte, formato y foco,
  y prioriza el video y el prototipo antes de las pantallas.

La dirección de presentación y la evidencia pendiente de cada caso están en
`PRESENTACION.md`. Verificá todo con `node --test tests/*.cjs`.

## Cómo agregar imágenes, videos o embeds

Para imágenes:

- guardá los archivos dentro de una carpeta como `assets/projects/`, de preferencia en WebP
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

El formulario usa FormSubmit. El primer envío puede requerir que el titular del
correo confirme la activación desde su bandeja de entrada. Ese correo de
activación trae un alias aleatorio: pegalo en `profile.formAlias` y la
dirección deja de figurar como destino del formulario. Si el servicio no
confirma el envío, se conserva el mensaje y se ofrece el correo directo.

## Animaciones

La bienvenida inspirada en un lienzo de diseño está aislada en `design-intro.js`
y `design-intro.css`: escribe el nombre y el cursor pulsa la entrada al terminar.
Se puede saltar y repetir desde el hero. El sonido sintético de teclado es opcional
y se activa con un clic para respetar las restricciones de audio del navegador.
La escritura usa el mismo `h1` del hero: reserva su espacio, lo traslada con una
transición FLIP y lo devuelve a su ubicación sin duplicar el título. El espaciado
del nombre se comparte entre ambas escenas. Escape, scroll o resize completan
la entrada inmediatamente y restauran siempre el título.
Incluye cambio de acento en la entrada y un modo diseño con cursor y selección
en loop que recorre los elementos visibles del hero sin activar enlaces ni
modificar el contenido. Se pausa fuera del hero, durante el scroll, con un proyecto
abierto o con la pestaña oculta. El botón Modo diseño permite desactivarlo.
Un halo circular tenue sigue el mouse y una luz local ilumina la tarjeta bajo
el cursor, con un pequeño refuerzo al arrastrar. Usa degradados recortados, no
partículas ni filtros de blur. Los movimientos se agrupan en un único frame
pendiente, sin un loop permanente. Se desactiva sobre los proyectos abiertos.
Las miniaturas del listado no se pueden seleccionar ni arrastrar como archivos
para evitar el tinte azul del navegador; los clics y las galerías no cambian.
El marco se apaga durante los desplazamientos del cursor y reaparece con las
dimensiones exactas del componente; no interpola cajas de tamaños diferentes.
Todos los proyectos usan columnas iguales y portadas con la misma proporción,
sin textos decorativos superpuestos a las imágenes.

GSAP se sirve desde `vendor/`, sin CDN ni paso de build, así el sitio no depende de terceros para ejecutar scripts.
