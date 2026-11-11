# Presentación del portfolio

## Dirección acordada

Mantener la identidad actual y tomar el portfolio de Julián Poblete como referencia
para la calidad de presentación e interacción, sin copiar su identidad ni sus piezas.
Trabajar y revisar primero en local; no publicar automáticamente.

La revisión compartida de Gemini sirve como insumo editorial, no como una fuente
verificada de estadísticas de contratación. No se incorporan sus porcentajes,
tiempos de revisión ni afirmaciones sobre ATS como hechos del portfolio.

## Selección vigente

- Nike Vision: presentación de producto y navegación web.
- Vértice Motors: catálogo y presentación de vehículos.
- Órbita: exploración visual y navegación web.
- Pulso: experiencia social móvil.
- Napoly Barbershop: identidad visual y motion, como trabajos complementarios.
- Mastantuono: diseño para redes, como trabajo complementario.

ProtoTV/Flick queda fuera de la selección. Se conservan sus archivos en assets;
no se renderiza una tarjeta ni un detalle para ese proyecto.

Los identificadores y rutas históricas de Vértice, Órbita y Pulso se conservan
para no romper imágenes o enlaces. Sus nombres públicos sí están actualizados.
Las capturas antiguas pueden contener las marcas anteriores: falta exportar las
versiones definitivas de Figma y aprobar las nuevas portadas de Illustrator.

## Estructura del caso UX/UI

1. Nombre, resumen y ficha: aporte, formato y foco.
2. Reto, objetivo y alcance del diseño.
3. Video de recorrido, si existe, y prototipo navegable, sin autoplay.
4. Enfoque de diseño: síntesis breve del trabajo existente.
5. Selección de pantallas con detalles relevantes.
6. Resultado de diseño, entregables y reflexión.

El campo opcional `presentation` activa esta estructura en `portfolio-data.js`.
Sin ese campo se conserva la presentación de branding, motion y social media.
Los videos y embeds se separan de la galería automáticamente, sin duplicarlos.

## Investigación y evidencia pendiente

Leonel confirmó investigación en los proyectos; no hubo pruebas con usuarios de
forma general. Antes de ampliar cada relato, documentar:

- Método utilizado, fuentes y pregunta que se buscaba responder.
- Hallazgos concretos y qué decisiones cambiaron a partir de ellos.
- Rol propio y colaboración, si la hubo.
- Restricciones reales, alternativas consideradas y motivos de descarte.
- Qué se probó efectivamente y con quién, solo cuando esté documentado.
- Límites del resultado y qué se validaría en una siguiente iteración.

No inventar entrevistas, participantes, porcentajes, mejoras de conversión ni
validación. Diferenciar resultado visual de impacto medido. No presentar un
prototipo como producto lanzado o una exploración como encargo comercial.

## Próxima etapa visual

- Aprobar portadas abstractas con identidad propia y títulos legibles en miniatura.
- Superponer interfaces reales en mockups independientes del fondo, para poder
  animarlas sin deformar capturas ni inventar pantallas con IA.
- Aplicar inclinación sutil solo con puntero fino; dejar una composición estática
  completa en dispositivos táctiles y con movimiento reducido.
- No añadir seguimiento global del mouse ni animar todo al mismo tiempo.
- Mantener navegación por teclado, contraste y reproducción de video estable.
- Revisar escritorio, móvil y modos claro/oscuro antes de publicar.

## Verificación local

Ejecutar `node --test tests/portfolio.test.cjs` para verificar la selección,
las rutas locales y la estructura de los casos sin instalar dependencias.

## Experiencias propias por proyecto

Vértice Motors y Órbita utilizan las portadas PDF entregadas por Leonel el
30 de octubre de 2026, renderizadas como WebP para la web. Los PDF originales y
las portadas anteriores permanecen conservados.

`project-experiences.js` y `project-experiences.css` comparten la estructura de
los seis casos sin sustituir las animaciones globales. El campo `experience`
define la identidad visual, la introducción y qué imágenes o videos destacar.

- Vértice: tonos acero, estructura lineal, trazos de velocidad y mockup de navegador.
- Órbita: fondo oscuro, luz cobriza, anillos y un punto animado sobre una elipse.
- Nike Vision: paleta neutra con acento deportivo y ficha de producto sin recortar.
- Pulso: marco de teléfono y recorrido por feed, perfil y chat.
- Napoly: un solo caso de identidad que abre con dos versiones de video y reúne
  las aplicaciones del isotipo y las 25 páginas del manual interactivo.
- Mastantuono: afiche cuadrado a tamaño completo y sin repetir la portada.
- Los recorridos con varias vistas usan pestañas operables por teclado. Las
  vistas fijas tienen inclinación sutil con mouse; los videos no se inclinan.
- Por indicación de Leonel, los casos arrancan con movimiento activado,
  incluso con movimiento reducido en el sistema. El visitante puede pausarlo
  mediante el botón del caso. No se cambia la preferencia global del portfolio
  y los efectos se desconectan al cerrar el proyecto.

Cada escenario tiene movimiento propio detrás del diseño y se pausa al quedar
fuera de vista. El catálogo conserva el zoom de la portada y el halo sin animar
la tarjeta completa al desplazarse. El manual carga sus páginas JPEG bajo demanda;
el PDF original permanece en `docs/` y no se abre en la interfaz.

Las pantallas de archivo se mantienen como evidencia del trabajo original; algunas
todavía muestran las marcas anteriores. La portada y la vista principal de Vértice
ya usan la nueva identidad. Reemplazar las demás cuando estén exportadas de Figma.
