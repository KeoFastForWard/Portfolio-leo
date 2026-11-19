# Test rápido con usuarios (3 a 5 personas)

Para sumar validación a los casos UX/UI (Órbita, Vértice Motors, Proto Red, Just Vision). Cada test dura unos 15 minutos por persona y se puede hacer por videollamada compartiendo el prototipo de Figma.

## Antes de empezar

- Elegí 3 a 5 personas que no hayan visto el proyecto. No hace falta que sean diseñadores.
- Abrí el prototipo de Figma en modo presentación y pediles que compartan pantalla.
- Pedí permiso para tomar notas. No grabes sin permiso.
- Decí esto: "Estoy probando el diseño, no a vos. No hay respuestas incorrectas. Pensá en voz alta mientras usás la pantalla."

## Tareas por caso

Dales una tarea por vez, sin decirles dónde tocar. Anotá si la completan, cuánto tardan y dónde dudan.

| Caso | Tarea 1 | Tarea 2 | Tarea 3 |
|---|---|---|---|
| Órbita | "Encontrá la galería de fotos." | "Volvé al inicio." | "¿Cómo contactarías a este sitio?" |
| Vértice Motors | "Elegí un auto que te guste y mirá su precio." | "Cambiá el color del auto." | "Volvé al catálogo." |
| Proto Red | "Entrá a tu perfil." | "Mandale un mensaje a alguien." | "Creá una publicación nueva." |
| Just Vision | "Encontrá un producto y abrí su ficha." | "¿Qué talles hay?" | "Volvé a la portada." |

## Preguntas al final

1. Del 1 al 5, ¿qué tan fácil fue? (1 = muy difícil, 5 = muy fácil)
2. ¿Qué fue lo más confuso?
3. ¿Qué cambiarías?

## Planilla para anotar

| Persona | Tarea | ¿Completó? | Tiempo | Dónde dudó | Comentario |
|---|---|---|---|---|---|
| P1 | 1 | Sí / No | | | |

## Cómo cargarlo en el portfolio

Cuando tengas los resultados, agregá un bloque `validation` al proyecto en `portfolio-data.js` (al lado de `outcome`). La sección "Validación" aparece sola en el caso; si el bloque no está, no se muestra nada.

```js
validation: {
  method: "Test con 5 personas por videollamada, con 3 tareas en el prototipo de Figma.",
  metric: "4 de 5 completaron todas las tareas · facilidad promedio 4,2 / 5",
  findings: [
    "3 personas no encontraron el botón de contacto en el primer intento.",
    "La galería se entendió sin ayuda."
  ],
  changes: [
    "Moví el contacto al menú principal.",
    "Subí el contraste de los botones secundarios."
  ]
},
```

Usá solo datos reales. Si hacés los cambios en Figma, actualizá también las capturas del caso.
