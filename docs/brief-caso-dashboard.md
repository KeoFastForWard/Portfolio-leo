# Brief: caso nuevo de dashboard (para diseñar en Figma)

Objetivo: sumar al portfolio un caso de producto más complejo que los de 2024, con datos, estados y un test con usuarios. Es lo que piden las ofertas de SaaS (por ejemplo FX Replay: dashboards, trabajo con PMs e ingenieros, IA para prototipar).

## Propuesta: "Pulso", panel para creadores de contenido

Un dashboard para que una persona que publica en TikTok o Instagram vea qué videos funcionan y decida qué grabar después. Se conecta con tu experiencia real en Artisse: el caso puede abrir con "en Artisse medía esto a mano; así lo diseñaría como producto".

- **Usuario:** creador o community manager freelance que maneja 1 a 3 cuentas.
- **Problema:** las estadísticas de las plataformas muestran números sueltos; no dicen qué formato repetir.
- **Tarea principal:** en menos de un minuto, saber qué video rindió mejor esta semana y por qué.

## Pantallas (alcance de 1 a 2 semanas)

1. **Resumen semanal:** 4 indicadores (vistas, seguidores nuevos, tasa de interacción, videos publicados), comparación con la semana anterior y el "video de la semana".
2. **Lista de videos:** tabla con orden y filtros (formato, gancho, fecha), y miniaturas.
3. **Detalle de un video:** curva de retención, comentarios destacados y etiquetas del formato (gancho, transformación, llamado a la acción).
4. **Ideas:** sugerencias de qué formato repetir según los datos, generadas con IA y marcadas como sugerencias.
5. **Estados:** cuenta sin datos todavía, carga, error de conexión y una semana sin publicaciones.
6. **Versión mobile** del resumen.

## Proceso para mostrar en el caso

1. Benchmark de 3 productos (TikTok Analytics, Metricool y uno más), con capturas anotadas.
2. Flujo de la tarea principal y wireframes en baja.
3. Sistema de componentes: tarjeta de indicador, tabla, gráfico, filtros y vacíos.
4. Prototipo navegable en Figma.
5. **Test con 3 a 5 personas** siguiendo `docs/guia-test-usuarios.md`, con tareas como "¿cuál fue el mejor video de la semana?" y "filtrá los videos con pregunta en el gancho".
6. Cambios después del test y la versión final.

## Datos de ejemplo

Usá números inventados pero plausibles y aclará en el caso que son de ejemplo. Podés tomar como base las proporciones reales de Artisse (un video con la mayoría de las vistas y el resto con pocas), sin caras de famosos.

## Cómo sumarlo al portfolio

Exportá las pantallas a WebP en `assets/projects/uxui/pulso/`, agregá el proyecto en `portfolio-data.js` siguiendo el formato de Órbita (con `presentation`, `experience` y el embed de Figma), su traducción en `portfolio-data.en.js` y el bloque `validation` con los resultados del test. Si tiene validación, va segundo, después de Artisse.
