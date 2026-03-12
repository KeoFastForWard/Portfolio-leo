const portfolioData = {
  profile: {
    name: "Leonel Kunst",
    role: "Diseñador UX/UI | Diseño Gráfico",
    tagline:
      "Diseño experiencias digitales claras, identidades visuales memorables y piezas que combinan estética, estrategia y usabilidad.",
    email: "leonelivankunst19@gmail.com",
    linkedin: "https://www.linkedin.com/in/leonel-kunst-96972522a/",
    behance: "https://www.behance.net/leonelkunst"
  },
  filters: [
    "Todos",
    "UX/UI",
    "Branding",
    "Motion",
    "Ilustración",
    "Packaging",
    "Editorial",
    "Social Media"
  ],
  experiences: [
    {
      company: "ARTISSE INTERACTIVE",
      role: "Diseñador Multimedial",
      period: "2023 - 2024",
      type: "Experiencia profesional",
      description:
        "Producción de piezas gráficas y contenido audiovisual para plataformas digitales, web y redes sociales.",
      bullets: [
        "Diseño de piezas gráficas y contenido audiovisual para plataformas digitales.",
        "Creación y adaptación de material visual para web y redes sociales.",
        "Gestión básica de contenidos web y soporte visual.",
        "Desarrollo de propuestas visuales siguiendo tendencias audiovisuales."
      ]
    },
    {
      company: "METADEV",
      role: "Diseñador de Branding y Contenido Digital",
      period: "2022 - 2023",
      type: "Freelance / Proyecto",
      description:
        "Desarrollo de identidades visuales y piezas de comunicación para proyectos digitales y marcas emergentes.",
      bullets: [
        "Desarrollo de identidades visuales para proyectos digitales y marcas emergentes.",
        "Diseño de piezas gráficas para redes sociales y comunicación online.",
        "Creación de contenido multimedia alineado a la identidad de marca.",
        "Apoyo creativo en lineamientos visuales y concepto gráfico."
      ]
    }
  ],
  education: [
    {
      institution: "Universidad Abierta Interamericana",
      degree: "Licenciatura en Diseño Gráfico",
      period: "2025 - Actualidad",
      description:
        "Etapa formativa enfocada en diseño visual, comunicación, tipografía, sistemas gráficos y pensamiento proyectual."
    },
    {
      institution: "Universidad Nacional de Quilmes",
      degree: "Licenciatura en Informática",
      period: "2023 - 2024",
      description:
        "Trayecto académico abandonado en 2° año que fortaleció una base analítica y estructurada antes de volcarme por completo al diseño."
    }
  ],
  skillGroups: [
    {
      title: "UX/UI y experiencia",
      description:
        "Habilidades orientadas a diseñar recorridos digitales claros, escalables y visualmente consistentes.",
      items: [
        "Diseño UX/UI",
        "Wireframes",
        "User flows",
        "Diseño de interfaces",
        "Prototipado",
        "Arquitectura de información"
      ]
    },
    {
      title: "Diseño visual y gráfico",
      description:
        "Criterio visual aplicado a marca, editorial, impresión, composición y piezas digitales.",
      items: [
        "Branding e identidad visual",
        "Diseño editorial",
        "Packaging",
        "Diseño para redes sociales",
        "Tipografía",
        "Color",
        "Composición visual",
        "Ilustración"
      ]
    },
    {
      title: "Herramientas y producción",
      description:
        "Entorno técnico para desarrollar materiales digitales, impresos y piezas audiovisuales.",
      items: [
        "Figma",
        "Photoshop",
        "Illustrator",
        "After Effects",
        "Premiere Pro",
        "Motion graphics básico",
        "Gestión de color CMYK",
        "Preparación de archivos para impresión"
      ]
    }
  ],
  projects: [
    {
      id: "fintech-onboarding",
      title: "Rediseño de onboarding fintech",
      category: "UX/UI",
      categories: ["UX/UI"],
      context: "Caso UX/UI",
      year: "2025",
      summary:
        "Replanteo del flujo de alta para una app financiera con foco en claridad, confianza y reducción de fricción.",
      overview:
        "Proyecto pensado para mostrar un caso completo de UX/UI con investigación visual, organización de información, wireframes y prototipado en Figma.",
      objective:
        "Simplificar el registro inicial, mejorar la jerarquía visual y construir una experiencia mobile más guiada y confiable.",
      challenge:
        "El recorrido original acumulaba demasiadas decisiones en pocas pantallas y generaba dudas en un momento crítico del producto.",
      process: [
        "Auditoría heurística del flujo existente y detección de puntos de abandono.",
        "Reorganización del user flow con una secuencia más clara y estados mejor definidos.",
        "Wireframes de baja fidelidad para validar jerarquías, inputs y progresión.",
        "Diseño visual del prototipo final en Figma con componentes reutilizables."
      ],
      tools: ["Figma", "Wireframes", "User flows", "Prototipado"],
      deliverables: [
        "Mapa del flujo completo",
        "Set de wireframes",
        "Pantallas clave del onboarding",
        "Prototipo navegable"
      ],
      outcome:
        "El resultado propone una experiencia más limpia, con mejor secuencia visual, menor carga cognitiva y una percepción de producto más sólida.",
      learnings:
        "La claridad de microcopy, la consistencia visual y el ritmo entre pasos tienen un impacto directo en la confianza percibida por el usuario.",
      accent: {
        start: "#dfeaf4",
        end: "#c1d4eb",
        label: "Flujo guiado"
      },
      external: {
        label: "Abrir Figma",
        href: "https://www.figma.com/"
      },
      media: [
        {
          type: "visual",
          title: "Arquitectura del flujo",
          description:
            "Espacio ideal para user flows, wireframes o un resumen del recorrido principal."
        },
        {
          type: "visual",
          title: "Pantallas principales",
          description:
            "Bloque preparado para mockups del onboarding, home inicial y confirmaciones."
        },
        {
          type: "embed",
          title: "Prototipo interactivo",
          description:
            "Podés reemplazar este placeholder por un embed público de Figma o un link navegable."
        }
      ]
    },
    {
      id: "metadev-brand-system",
      title: "Sistema visual METADEV",
      category: "Branding",
      categories: ["Branding", "Social Media"],
      context: "Freelance / Branding",
      year: "2023",
      summary:
        "Desarrollo de identidad visual y piezas digitales para una marca orientada a proyectos tecnológicos emergentes.",
      overview:
        "Caso de branding adaptable a redes sociales, comunicación online y lineamientos visuales para distintos soportes.",
      objective:
        "Construir una identidad reconocible, flexible y alineada a un perfil digital contemporáneo.",
      challenge:
        "La marca necesitaba verse actual y técnica sin perder cercanía ni orden visual en piezas de comunicación rápida.",
      process: [
        "Definición del tono gráfico, personalidad visual y referencias estratégicas.",
        "Exploración de logo, tipografía, color y sistema de composición.",
        "Aplicación del sistema a piezas sociales, contenido multimedia y lineamientos digitales.",
        "Ajuste de recursos visuales para mantener coherencia entre formatos."
      ],
      tools: ["Illustrator", "Photoshop", "Branding", "Dirección visual"],
      deliverables: [
        "Identidad base",
        "Sistema de color y tipografía",
        "Templates para redes sociales",
        "Guía visual resumida"
      ],
      outcome:
        "La propuesta deja una marca visual coherente y flexible, lista para comunicación digital y expansión futura.",
      learnings:
        "El valor de un branding fuerte no está solo en el logo, sino en la consistencia visual aplicada a cada punto de contacto.",
      accent: {
        start: "#eaded4",
        end: "#d7c4b7",
        label: "Sistema de marca"
      },
      external: {
        label: "Ver Behance",
        href: "https://www.behance.net/leonelkunst"
      },
      media: [
        {
          type: "visual",
          title: "Exploración de marca",
          description:
            "Área lista para mostrar versiones del logo, paleta cromática y construcción tipográfica."
        },
        {
          type: "visual",
          title: "Aplicaciones digitales",
          description:
            "Espacio pensado para mockups de redes sociales, cabeceras y piezas de comunicación."
        }
      ]
    },
    {
      id: "nativa-packaging",
      title: "Packaging línea botánica",
      category: "Packaging",
      categories: ["Packaging", "Branding"],
      context: "Proyecto visual",
      year: "2024",
      summary:
        "Diseño de envases con lenguaje natural, enfoque premium y lectura clara para una línea de productos botánicos.",
      overview:
        "Caso orientado a mostrar criterio de impresión, composición visual y coherencia de marca aplicada a packaging.",
      objective:
        "Crear un sistema de envases diferenciable en góndola y consistente con una identidad refinada.",
      challenge:
        "Había que equilibrar impacto visual, lectura de información y viabilidad para producción impresa.",
      process: [
        "Definición de universo visual, referentes y familia de envases.",
        "Diseño de jerarquías tipográficas, estructura de información y códigos por variante.",
        "Mockups tridimensionales para validar presencia visual y ritmo de línea.",
        "Ajustes finales para impresión y control cromático."
      ],
      tools: ["Illustrator", "Photoshop", "Packaging", "CMYK"],
      deliverables: [
        "Sistema de etiquetas",
        "Mockups de línea",
        "Jerarquía informativa",
        "Archivos listos para impresión"
      ],
      outcome:
        "El resultado destaca por una estética limpia, natural y contemporánea, con orden visual y consistencia de familia.",
      learnings:
        "En packaging, cada decisión visual debe convivir con la lógica de producción, la legibilidad y el contexto físico del producto.",
      accent: {
        start: "#e7e4d6",
        end: "#d8c59b",
        label: "Impresión + sistema"
      },
      media: [
        {
          type: "visual",
          title: "Sistema de etiquetas",
          description:
            "Bloque pensado para aplicar fotografías de envases, variantes cromáticas y detalles impresos."
        },
        {
          type: "visual",
          title: "Mockups de producto",
          description:
            "Espacio preparado para renders o fotografías del packaging en contexto."
        }
      ]
    },
    {
      id: "horizonte-editorial",
      title: "Proyecto editorial Horizonte",
      category: "Editorial",
      categories: ["Editorial"],
      context: "Trabajo académico",
      year: "2025",
      summary:
        "Diseño editorial de una publicación con retícula clara, ritmo visual y combinación de texto, imagen y jerarquías.",
      overview:
        "Caso ideal para mostrar criterio tipográfico, organización de información y sensibilidad editorial.",
      objective:
        "Desarrollar una publicación contemporánea con identidad propia, buena lectura y un sistema gráfico ordenado.",
      challenge:
        "La composición debía sostener personalidad visual sin sacrificar legibilidad ni coherencia entre secciones.",
      process: [
        "Definición de retícula base y sistema tipográfico.",
        "Pruebas de jerarquía entre títulos, copetes, texto corrido e imágenes.",
        "Diseño de aperturas, secciones internas y ritmo de página.",
        "Preparación final para salida impresa o versión digital."
      ],
      tools: ["Tipografía", "Composición visual", "Diseño editorial"],
      deliverables: [
        "Retícula editorial",
        "Sistema tipográfico",
        "Aperturas y páginas interiores",
        "Versión lista para impresión"
      ],
      outcome:
        "La propuesta comunica orden, sofisticación y control visual, con una narrativa gráfica consistente a lo largo de la pieza.",
      learnings:
        "El diseño editorial exige precisión constante: cada margen, ritmo y contraste modifica la experiencia de lectura.",
      accent: {
        start: "#e3e0eb",
        end: "#cbd6e5",
        label: "Tipografía + ritmo"
      },
      media: [
        {
          type: "visual",
          title: "Sistema editorial",
          description:
            "Espacio listo para mostrar grilla, jerarquías tipográficas y aperturas de secciones."
        },
        {
          type: "visual",
          title: "Páginas destacadas",
          description:
            "Bloque preparado para spreads, detalles de composición y piezas interiores."
        }
      ]
    },
    {
      id: "motion-launch",
      title: "Motion launch visual",
      category: "Motion",
      categories: ["Motion", "Social Media"],
      context: "Contenido audiovisual",
      year: "2024",
      summary:
        "Secuencia breve para lanzamiento digital con animaciones limpias, ritmo visual y narrativa orientada a redes.",
      overview:
        "Caso base para integrar reels, piezas animadas, visuales promocionales o videos exportados desde After Effects y Premiere.",
      objective:
        "Diseñar una pieza corta y dinámica que potencie el mensaje de marca sin perder claridad en pantalla.",
      challenge:
        "La animación debía sentirse premium y moderna, evitando efectos excesivos y manteniendo legibilidad.",
      process: [
        "Definición de keyframes, ritmo de transición y jerarquía de mensajes.",
        "Diseño de escenas principales con sistema de color y composición consistente.",
        "Animación en After Effects y ajuste de timings para plataformas digitales.",
        "Edición final y exportación optimizada para redes sociales."
      ],
      tools: ["After Effects", "Premiere Pro", "Motion graphics básico"],
      deliverables: [
        "Storyboard visual",
        "Frames clave",
        "Pieza exportada para redes",
        "Versiones cortas adaptadas"
      ],
      outcome:
        "La pieza final aporta dinamismo y sofisticación, acompañando la identidad de marca con movimiento controlado.",
      learnings:
        "En motion, una buena transición debe ordenar la atención antes que llamar la atención por sí sola.",
      accent: {
        start: "#dee6f5",
        end: "#c3d1eb",
        label: "Ritmo y transición"
      },
      media: [
        {
          type: "video",
          title: "Video principal",
          description:
            "Podés sumar aquí un MP4 exportado desde After Effects o Premiere para reproducirlo dentro del portfolio."
        },
        {
          type: "visual",
          title: "Frames clave",
          description:
            "Área preparada para mostrar capturas de escenas, storyboard o secuencias visuales."
        }
      ]
    },
    {
      id: "social-launch-kit",
      title: "Kit social para lanzamiento",
      category: "Social Media",
      categories: ["Social Media", "Branding"],
      context: "Campaña digital",
      year: "2024",
      summary:
        "Sistema de piezas para redes con consistencia visual, modularidad y adaptación a distintos formatos.",
      overview:
        "Caso útil para mostrar piezas de comunicación digital, layouts seriados y continuidad gráfica en campañas.",
      objective:
        "Construir una familia de publicaciones clara, flexible y reconocible, lista para escalar en redes.",
      challenge:
        "La campaña requería mantener identidad visual y ritmo de marca en formatos con tamaños y tiempos distintos.",
      process: [
        "Diseño del módulo base para posteos, stories y recursos complementarios.",
        "Prueba de jerarquías, templates y consistencia cromática.",
        "Adaptación del sistema a múltiples formatos con continuidad visual.",
        "Optimización de entregables para publicación digital."
      ],
      tools: ["Photoshop", "Illustrator", "Diseño para redes sociales"],
      deliverables: [
        "Templates base",
        "Piezas estáticas",
        "Adaptaciones para stories",
        "Lineamientos rápidos de uso"
      ],
      outcome:
        "El resultado deja una campaña ordenada, reconocible y lista para operar de forma consistente en canales digitales.",
      learnings:
        "La modularidad acelera la producción y sostiene mejor la coherencia cuando el sistema visual está bien resuelto.",
      accent: {
        start: "#f0dfd8",
        end: "#e3c1b0",
        label: "Sistema modular"
      },
      media: [
        {
          type: "visual",
          title: "Set de piezas",
          description:
            "Bloque preparado para mostrar carruseles, posteos, stories y variantes de campaña."
        },
        {
          type: "visual",
          title: "Adaptaciones",
          description:
            "Espacio ideal para destacar consistencia entre formatos y recursos gráficos."
        }
      ]
    },
    {
      id: "vector-bloom",
      title: "Serie ilustrada Vector Bloom",
      category: "Ilustración",
      categories: ["Ilustración"],
      context: "Exploración visual",
      year: "2025",
      summary:
        "Colección de ilustraciones digitales con foco en composición, color y construcción visual adaptable a piezas gráficas.",
      overview:
        "Proyecto pensado para exhibir sensibilidad creativa, manejo de color y capacidad expresiva dentro del portfolio.",
      objective:
        "Desarrollar una serie visual con identidad propia que pueda convivir con branding, editorial o contenido digital.",
      challenge:
        "La serie debía sostener unidad estilística sin volverse repetitiva y conservar impacto visual en distintas aplicaciones.",
      process: [
        "Búsqueda de lenguaje gráfico, paleta y recursos de forma.",
        "Definición de composiciones, balance de color y texturas visuales.",
        "Ajustes finales para uso en medios digitales e impresos.",
        "Exploración de aplicaciones complementarias dentro del portfolio."
      ],
      tools: ["Illustrator", "Photoshop", "Color", "Composición visual"],
      deliverables: [
        "Serie principal de ilustraciones",
        "Aplicaciones visuales",
        "Versiones para impresión o digital"
      ],
      outcome:
        "La colección funciona como una capa más expresiva dentro del portfolio y amplía la percepción de versatilidad creativa.",
      learnings:
        "Los proyectos autorales también fortalecen un perfil profesional cuando muestran criterio formal y consistencia.",
      accent: {
        start: "#ebe0f0",
        end: "#ecced9",
        label: "Expresión visual"
      },
      media: [
        {
          type: "visual",
          title: "Serie principal",
          description:
            "Área lista para incorporar ilustraciones completas, recortes o composiciones destacadas."
        },
        {
          type: "visual",
          title: "Aplicaciones",
          description:
            "Espacio pensado para mostrar cómo la serie se adapta a posters, redes o piezas editoriales."
        }
      ]
    },
    {
      id: "creative-studio-landing",
      title: "Landing para estudio creativo",
      category: "UX/UI",
      categories: ["UX/UI", "Branding"],
      context: "Proyecto freelance",
      year: "2025",
      summary:
        "Concepto web editorial para un estudio creativo, combinando narrativa visual, foco comercial y una interfaz de alto nivel.",
      overview:
        "Caso ideal para exhibir diseño web, jerarquía de secciones, narrativa visual y consistencia entre contenido y experiencia.",
      objective:
        "Diseñar una landing capaz de presentar servicios, casos y posicionamiento con claridad y sofisticación.",
      challenge:
        "Había que construir una experiencia impactante, pero clara y rápida de recorrer, sin perder rendimiento ni legibilidad.",
      process: [
        "Definición de arquitectura de contenidos y navegación principal.",
        "Diseño de hero, bloques editoriales y zonas de conversión.",
        "Construcción del sistema UI y ritmo entre secciones.",
        "Refinamiento visual con animaciones sutiles y microinteracciones."
      ],
      tools: ["Figma", "UX/UI", "Branding", "Diseño de interfaces"],
      deliverables: [
        "Arquitectura del sitio",
        "Mockup completo de landing",
        "Sistema UI",
        "Prototipo y lineamientos de animación"
      ],
      outcome:
        "La propuesta resuelve una presencia digital moderna, premium y comercial, lista para escalar en futuras páginas o estudios de caso.",
      learnings:
        "Un layout bien jerarquizado puede transformar contenido complejo en una experiencia ligera, editorial y convincente.",
      accent: {
        start: "#dfe8e1",
        end: "#cad7df",
        label: "Web editorial"
      },
      external: {
        label: "Abrir caso",
        href: "https://www.behance.net/leonelkunst"
      },
      media: [
        {
          type: "visual",
          title: "Wireframes y secciones",
          description:
            "Espacio listo para arquitectura, wireframes y layout base del sitio."
        },
        {
          type: "visual",
          title: "Pantallas finales",
          description:
            "Bloque preparado para mockups de desktop y mobile con foco en hero, servicios y CTA."
        },
        {
          type: "embed",
          title: "Embed o prototipo",
          description:
            "Podés integrar aquí un prototipo web de Figma o un enlace al caso publicado."
        }
      ]
    }
  ]
};








