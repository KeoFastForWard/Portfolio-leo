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
    "Motion",
    "Branding",
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
      id: "nike-vision",
      title: "Nike Vision",
      experience: {
        theme: "vision",
        eyebrow: "Producto en primer plano",
        headline: "De la primera mirada al detalle.",
        introduction: "Una tienda conceptual donde la imagen abre el recorrido y la interfaz organiza el paso hacia la ficha de producto.",
        tourTitle: "Dos escalas de una misma tienda.",
        thinkingTitle: "De la imagen a la información.",
        chapters: [
          { label: "Inicio", title: "Primera impresión.", description: "La portada establece el tono visual y da protagonismo al producto sin ocultar la navegación.", mediaIndex: 1 },
          { label: "Ficha de producto", title: "La información toma el relevo.", description: "La ficha completa muestra cómo cambia la jerarquía cuando la atención pasa de la marca al producto.", mediaIndex: 2 }
        ]
      },
      presentation: {
        role: "Investigación, diseño UI y prototipado",
        format: "Web · Figma",
        focus: "Producto, navegación y detalle de compra",
        evidence: "Interfaz, video de recorrido y prototipo navegable."
      },
      category: "UX/UI",
      categories:       [
        "UX/UI"
      ],
      context: "Sitio web UI",
      year: "2024",
      summary:
        "Landing conceptual para una línea Nike con foco en producto, narrativa visual y una experiencia de browsing limpia.",
      overview:
        "Proyecto UX/UI web pensado para presentar una línea de producto con una interfaz clara, minimalista y visualmente comercial.",
      objective:
        "Construir una página interactiva que destaque producto, identidad de marca y navegación con una lectura simple y actual.",
      challenge:
        "La composición debía equilibrar protagonismo visual, presencia de producto y una interfaz sobria sin perder claridad.",
      process:       [
        "Definición del tono visual del sitio y de la relación entre producto, tipografía e imagen.",
        "Diseño de hero principal, navegación superior y módulos de producto.",
        "Exploración de pantallas de producto y variantes de presentación con foco comercial.",
        "Refinamiento del prototipo y revisión de las jerarquías visuales."
      ],
      tools:       [
        "Figma",
        "Diseño web",
        "Diseño UI",
        "Prototipado"
      ],
      deliverables:       [
        "Portada principal",
        "Pantallas de producto",
        "Sistema UI web",
        "Video de presentación",
        "Prototipo interactivo en Figma"
      ],
      outcome:
        "El proyecto deja una propuesta visual limpia y aspiracional, con foco en producto y una interfaz fácil de recorrer.",
      learnings:
        "En un sitio orientado a producto, la dirección de arte y la jerarquía visual tienen que trabajar al servicio de la claridad.",
      accent: {
        start: "#e8e5e1",
        end: "#cfcfcf",
        label: "Producto + interfaz"
      },
      cover: {
        src: "assets/projects/uxui/nike-vision/cover/cover.png",
        position: "center center",
        tint: "rgba(8, 8, 8, 0.06)",
        shadow: "rgba(8, 8, 8, 0.34)"
      },
      media:             [
        {
          type: "embed",
          title: "Prototipo interactivo en Figma",
          embedUrl:
            "https://embed.figma.com/proto/pjCniFuPBce7iySlz3jsKS/Nike-Vision?page-id=0%3A1&node-id=1-2&viewport=343%2C467%2C0.33&scaling=contain&content-scaling=fixed&embed-host=leonel-portfolio",
          frameHeight: "46rem",
          description:
            "Versión navegable del prototipo de Nike Vision embebida dentro del portfolio para recorrer la propuesta UX/UI directamente desde el caso."
        },
        {
          type: "visual",
          title: "HUD",
          image: "assets/projects/uxui/nike-vision/images/nike-vision-hud.png"
        },
        {
          type: "visual",
          title: "Product Page Complete",
          image: "assets/projects/uxui/nike-vision/images/nike-vision-product-page-complete.png"
        },
        {
          type: "video",
          title: "Demo en video",
          src: "assets/projects/uxui/nike-vision/videos/2024-07-21-17-36-34.mp4"
        }
      ]
    },
    {
      id: "protodealership",
      title: "Vértice Motors",
      experience: {
        theme: "motors",
        eyebrow: "Precisión en cada interacción",
        headline: "Diseño que pone el producto en movimiento.",
        introduction: "Una experiencia de concesionaria digital que lleva la atención del vehículo al catálogo y sus detalles. Imagen, información y navegación comparten una misma dirección.",
        chapters: [
          { label: "Inicio", title: "El vehículo, en primer plano.", description: "La imagen presenta el producto; la navegación queda en una franja independiente para mantener una lectura clara.", mediaIndex: 1 },
          { label: "Catálogo", title: "Explorar sin perder el foco.", description: "Modelo, color y selección conviven en una vista centrada en el vehículo.", mediaIndex: 2 },
          { label: "Detalle", title: "De la imagen a la información.", description: "La ficha reúne las características y el precio antes de continuar el recorrido.", mediaIndex: 3 }
        ]
      },
      presentation: {
        role: "Investigación, diseño UI y prototipado",
        format: "Web · Figma",
        focus: "Presentación de vehículos y exploración del catálogo",
        evidence: "Pantalla principal, catálogo y prototipo navegable."
      },
      category: "UX/UI",
      categories:       [
        "UX/UI"
      ],
      context: "Sitio web UI",
      year: "2024",
      summary:
        "Landing interactiva para una concesionaria digital con foco en catálogo, producto y una experiencia web clara.",
      overview:
        "Proyecto UX/UI orientado a presentar un concesionario digital con una interfaz inmersiva, jerarquía sólida y narrativa visual comercial.",
      objective:
        "Diseñar una página interactiva que combine impacto visual, claridad de navegación y una presentación atractiva del producto.",
      challenge:
        "La experiencia debía sentirse premium y tecnológica sin comprometer lectura, ritmo ni foco en la conversión.",
      process:       [
        "Definición de estructura general del sitio, hero principal y navegación superior.",
        "Diseño del layout visual para destacar el vehículo y ordenar la información clave.",
        "Ajuste de contraste, tipografía y jerarquía para sostener claridad sobre una imagen potente.",
        "Prototipado del recorrido principal y refinamiento de microinteracciones en Figma."
      ],
      tools:       [
        "Figma",
        "Diseño web",
        "Diseño de interfaces",
        "Prototipado"
      ],
      deliverables:       [
        "Portada visual del home",
        "Sistema UI desktop",
        "Sección catálogo",
        "Galería de pantallas",
        "Prototipo interactivo en Figma"
      ],
      outcome:
        "El caso comunica una presencia digital más aspiracional, con foco comercial y una interfaz web visualmente ordenada.",
      learnings:
        "Cuando la imagen tiene mucho protagonismo, la jerarquía tipográfica y el control del contraste se vuelven decisivos.",
      accent: {
        start: "#152031",
        end: "#4f79ab",
        label: "Concesionaria digital"
      },
      cover: {
        src: "assets/projects/uxui/protodealership/cover/vertice-motors-cover.webp",
        position: "center center",
        tint: "rgba(0, 0, 0, 0)",
        shadow: "rgba(0, 0, 0, 0)"
      },
      media:             [
        {
          type: "embed",
          title: "Prototipo interactivo en Figma",
          embedUrl:
            "https://embed.figma.com/proto/PHevkRtgAuxpbFm0lmxbjK/ProtoDealership?page-id=0%3A1&node-id=7-168&viewport=301%2C700%2C0.27&scaling=contain&content-scaling=fixed&embed-host=leonel-portfolio",
          frameHeight: "46rem",
          description:
            "Explorá la pantalla principal y el catálogo de Vértice Motors en el prototipo de Figma."
        },
        {
          type: "visual",
          title: "HUD",
          image: "assets/projects/uxui/protodealership/images/vertice-motors-home.webp"
        },
        {
          type: "visual",
          title: "Catalogue Part 1",
          image: "assets/projects/uxui/protodealership/images/property-1-catalogue-part-1.png"
        },
        {
          type: "visual",
          title: "Variant 16",
          image: "assets/projects/uxui/protodealership/images/property-1-variant16.png"
        },
        {
          type: "visual",
          title: "Variant 20",
          image: "assets/projects/uxui/protodealership/images/property-1-variant20.png"
        },
        {
          type: "visual",
          title: "Variant 4",
          image: "assets/projects/uxui/protodealership/images/property-1-variant4.png"
        },
        {
          type: "visual",
          title: "Variant 6",
          image: "assets/projects/uxui/protodealership/images/property-1-variant6.png"
        },
        {
          type: "visual",
          title: "Variant 8",
          image: "assets/projects/uxui/protodealership/images/property-1-variant8.png"
        }
      ]
    },
    {
      id: "protogalaxy",
      title: "Órbita",
      experience: {
        theme: "cosmos",
        eyebrow: "Una interfaz para explorar",
        headline: "Un universo visual. Un recorrido claro.",
        introduction: "Una exploración de diseño web donde la fotografía espacial construye la atmósfera y una navegación persistente conecta cada parte del recorrido.",
        chapters: [
          { label: "Inicio", title: "El comienzo de la exploración.", description: "Un paisaje inmersivo introduce el universo visual, con acciones destacadas sobre la imagen.", mediaIndex: 1 },
          { label: "Galería", title: "La imagen guía el viaje.", description: "La galería da protagonismo a la fotografía y mantiene a mano las secciones principales.", mediaIndex: 3 },
          { label: "Contacto", title: "Una salida reconocible.", description: "El contacto conserva el lenguaje visual de la experiencia sin abandonar su estructura de navegación.", mediaIndex: 5 }
        ]
      },
      presentation: {
        role: "Investigación, diseño UI y prototipado",
        format: "Web · Figma",
        focus: "Exploración visual y navegación entre secciones",
        evidence: "Inicio, galería, contacto y prototipo navegable."
      },
      category: "UX/UI",
      categories:       [
        "UX/UI"
      ],
      context: "Sitio web UI",
      year: "2024",
      summary:
        "Website conceptual con estética inmersiva y narrativa espacial, diseñado para comunicar profundidad y exploración.",
      overview:
        "Caso UX/UI web desarrollado para una experiencia visual cinematográfica, con bloques inmersivos y una interfaz clara dentro de un universo oscuro.",
      objective:
        "Construir una interfaz impactante que mantenga orden visual y una navegación clara dentro de un concepto gráfico muy protagonista.",
      challenge:
        "El reto fue equilibrar espectacularidad visual, legibilidad y continuidad entre pantallas con gran carga de imagen.",
      process:       [
        "Definición del concepto visual y del clima general del sitio.",
        "Diseño de pantallas clave para home, about us, fotos y contacto.",
        "Construcción de componentes oscuros con foco en contraste y profundidad.",
        "Revisión del flujo para que el recorrido no pierda claridad dentro del concepto inmersivo."
      ],
      tools:       [
        "Figma",
        "Diseño UI",
        "Diseño web",
        "Dirección visual"
      ],
      deliverables:       [
        "Home inmersivo",
        "Pantallas internas",
        "Sistema visual oscuro",
        "Galería de variaciones",
        "Prototipo interactivo en Figma"
      ],
      outcome:
        "La propuesta resuelve una experiencia web más atmosférica y aspiracional, manteniendo estructura y foco narrativo.",
      learnings:
        "Incluso en interfaces muy visuales, la consistencia de componentes sigue siendo la base de una navegación sólida.",
      accent: {
        start: "#0c1020",
        end: "#7a5f74",
        label: "Experiencia inmersiva"
      },
      cover: {
        src: "assets/projects/uxui/protogalaxy/cover/orbita-cover.webp",
        position: "center center",
        tint: "rgba(0, 0, 0, 0)",
        shadow: "rgba(0, 0, 0, 0)"
      },
      media:             [
        {
          type: "embed",
          title: "Prototipo interactivo en Figma",
          embedUrl:
            "https://embed.figma.com/proto/yzWBzgHpJ1EFDtV5vXr0Zp/ProtoGalaxy?page-id=0%3A1&node-id=1-2&viewport=260%2C224%2C0.06&scaling=contain&content-scaling=fixed&embed-host=leonel-portfolio",
          frameHeight: "46rem",
          description:
            "Recorré el inicio, la galería y las secciones de Órbita en el prototipo de Figma."
        },
        {
          type: "visual",
          title: "The Galaxy Is In Your Hands",
          image: "assets/projects/uxui/protogalaxy/images/the-galaxy-is-in-your-hands.png"
        },
        {
          type: "visual",
          title: "About Us Part 3",
          image: "assets/projects/uxui/protogalaxy/images/the-galaxy-is-in-your-hands-about-us-part-3.png"
        },
        {
          type: "visual",
          title: "Photos Part 3",
          image: "assets/projects/uxui/protogalaxy/images/the-galaxy-is-in-your-hands-photos-part-3.png"
        },
        {
          type: "visual",
          title: "Principal Button Part 2",
          image: "assets/projects/uxui/protogalaxy/images/the-galaxy-is-in-your-hands-principal-button-part-2.png"
        },
        {
          type: "visual",
          title: "Contact Part 3",
          image: "assets/projects/uxui/protogalaxy/images/the-galaxy-is-in-your-hands-contact-part-3.png"
        }
      ]
    },
    {
      id: "protored",
      title: "Pulso",
      experience: {
        theme: "pulso",
        eyebrow: "Una interfaz para conectar",
        headline: "De mirar a conversar.",
        introduction: "Un concepto de red social móvil que conecta el feed, el perfil y el chat sin perder continuidad entre pantallas.",
        tourTitle: "El recorrido en la palma de la mano.",
        thinkingTitle: "Una identidad que se sostiene entre vistas.",
        chapters: [
          { label: "Feed", title: "Un punto de partida familiar.", description: "El contenido ocupa el centro mientras la navegación mantiene al alcance las acciones principales.", mediaIndex: 1 },
          { label: "Perfil", title: "Un espacio propio.", description: "El perfil reúne el contenido y la identidad de cada persona dentro del mismo sistema visual.", mediaIndex: 2 },
          { label: "Chat", title: "Del contenido a la conversación.", description: "La vista de chat cambia el foco hacia el intercambio directo, sin salir del lenguaje de la app.", mediaIndex: 7 }
        ]
      },
      presentation: {
        role: "Investigación, diseño UI y prototipado",
        format: "Mobile · Figma",
        focus: "Feed, perfiles y conversaciones",
        evidence: "Pantallas de la app y prototipo de interacción social."
      },
      category: "UX/UI",
      categories:       [
        "UX/UI"
      ],
      context: "App mobile UI",
      year: "2024",
      summary:
        "Concepto de red social mobile con foco en feed, perfiles, cámara, mensajes y continuidad entre vistas clave.",
      overview:
        "Caso UX/UI para una aplicación social pensado para mostrar diseño de feed, perfiles, llamadas y una estructura mobile consistente.",
      objective:
        "Desarrollar una app visualmente distintiva pero fácil de recorrer, con un lenguaje cercano al de un producto real.",
      challenge:
        "El sistema debía resolver muchas vistas dentro de una misma identidad sin perder coherencia ni claridad de uso.",
      process:       [
        "Definición del estilo general de la app y de sus pantallas esenciales.",
        "Diseño del perfil, feed, navegación inferior y estados de interacción social.",
        "Pruebas de composición para balancear imagen, tipografía e interacción.",
        "Ajustes del sistema UI para sostener continuidad entre vistas y acciones."
      ],
      tools:       [
        "Figma",
        "Diseño de app",
        "Diseño mobile",
        "Sistemas UI"
      ],
      deliverables:       [
        "Pantallas de perfil y feed",
        "Vistas de interacción social",
        "Navegación principal",
        "Galería de estados",
        "Prototipo interactivo en Figma"
      ],
      outcome:
        "La propuesta funciona como un concepto de app social sólido, con identidad propia y buen control del layout mobile.",
      learnings:
        "Un producto con múltiples vistas necesita una base UI muy consistente para que la experiencia siga siendo intuitiva.",
      accent: {
        start: "#c9c8ca",
        end: "#8d8b90",
        label: "App social"
      },
      cover: {
        src: "assets/projects/uxui/protored/cover/cover.png",
        position: "center center",
        tint: "rgba(20, 20, 20, 0.08)",
        shadow: "rgba(26, 26, 30, 0.46)"
      },
      media:             [
        {
          type: "embed",
          title: "Prototipo interactivo en Figma",
          embedUrl:
            "https://embed.figma.com/proto/RkhSqzdlB3IXr1fZ60lqep/ProtoRed?page-id=0%3A1&node-id=37-396&viewport=1087%2C666%2C0.37&scaling=scale-down&content-scaling=fixed&starting-point-node-id=37%3A396&embed-host=leonel-portfolio",
          frameHeight: "46rem",
          description:
            "Explorá el feed, los perfiles y las conversaciones de Pulso en el prototipo de Figma."
        },
        {
          type: "visual",
          title: "HUD",
          image: "assets/projects/uxui/protored/images/hud-protored.png"
        },
        {
          type: "visual",
          title: "Perfil",
          image: "assets/projects/uxui/protored/images/perfil-protored.png"
        },
        {
          type: "visual",
          title: "Search",
          image: "assets/projects/uxui/protored/images/search-protored.png"
        },
        {
          type: "visual",
          title: "Create Post",
          image: "assets/projects/uxui/protored/images/create-post-protored.png"
        },
        {
          type: "visual",
          title: "History",
          image: "assets/projects/uxui/protored/images/history-protored.png"
        },
        {
          type: "visual",
          title: "Messages",
          image: "assets/projects/uxui/protored/images/messages-protored.png"
        },
        {
          type: "visual",
          title: "Chat",
          image: "assets/projects/uxui/protored/images/chat-protored.png"
        },
        {
          type: "visual",
          title: "Notification Scene",
          image: "assets/projects/uxui/protored/images/notification-scene-protored.png"
        },
        {
          type: "visual",
          title: "Call",
          image: "assets/projects/uxui/protored/images/call-protored.png"
        },
        {
          type: "visual",
          title: "Videocall",
          image: "assets/projects/uxui/protored/images/videocall-protored.png"
        },
        {
          type: "visual",
          title: "Login",
          image: "assets/projects/uxui/protored/images/login-protored.png"
        },
        {
          type: "visual",
          title: "Register",
          image: "assets/projects/uxui/protored/images/register-protored.png"
        }
      ]
    },
    {
      id: "napoly-brand-manual",
      title: "Napoly Barbershop | Manual de marca",
      experience: {
        theme: "napoly-print",
        eyebrow: "Identidad visual / Sistema de marca",
        headline: "Un isotipo. Dos formas de aplicarlo.",
        introduction: "La identidad de Napoly Barbershop se presenta en positivo y negativo, con un manual que reúne sus criterios de uso.",
        role: "Diseño de isotipo y manual de marca",
        format: "Identidad visual · Manual digital",
        deliverable: "Isotipo en dos versiones y manual",
        tourTitle: "El contraste también es identidad.",
        tourDescription: "Alterná entre las dos aplicaciones del isotipo.",
        thinkingTitle: "Un símbolo claro sobre cualquier fondo previsto.",
        chapters: [
          { label: "Positivo", title: "Sobre fondo claro.", description: "La versión oscura deja ver el contorno y el peso del isotipo con nitidez.", mediaIndex: 0 },
          { label: "Negativo", title: "Sobre fondo oscuro.", description: "La versión invertida conserva la silueta y la lectura del símbolo.", mediaIndex: 1 }
        ]
      },
      category: "Branding",
      categories: ["Branding"],
      context: "Identidad visual / Manual de marca",
      year: "2026",
      summary:
        "Sistema visual para Napoly Barbershop con el isotipo en positivo y negativo y un manual de marca que podés hojear en línea.",
      overview:
        "Proyecto de branding orientado a definir una base visual clara para Napoly Barbershop, mostrando el isotipo y una guía de uso resumida en formato editorial.",
      objective:
        "Presentar una identidad visual consistente para la barbería y ordenar sus criterios básicos de aplicación dentro de un manual de marca.",
      challenge:
        "La pieza debía transmitir carácter y prolijidad, sosteniendo una estética sobria y fácilmente reconocible para futuras aplicaciones de marca.",
      process: [
        "Definición del isotipo principal y de sus versiones sobre fondo claro y oscuro.",
        "Organización de una presentación editorial para resumir lineamientos de identidad en un documento legible.",
        "Ajuste de contraste, presencia visual y consistencia general entre símbolo, fondo y sistema.",
        "Preparación del manual en PDF y de los archivos visuales listos para portfolio."
      ],
      tools: ["Branding", "Identidad visual", "Diseño editorial"],
      deliverables: [
        "Isotipo principal",
        "Versión positiva y negativa",
        "Manual de marca en PDF",
        "Presentación visual para portfolio"
      ],
      outcome:
        "El proyecto deja una base de identidad clara para Napoly Barbershop, con un isotipo reconocible y un documento que ordena visualmente su uso.",
      learnings:
        "En branding, incluso una pieza breve gana valor cuando el sistema se muestra con criterio, contraste y una documentación visual ordenada.",
      accent: {
        start: "#efe8df",
        end: "#cfbeb0",
        label: "Sistema de marca"
      },
      cover: {
        src: "assets/projects/branding/napoly-barbershop-manual/cover/cover.png",
        position: "center center",
        tint: "rgba(10, 10, 10, 0.02)",
        shadow: "rgba(10, 10, 10, 0.16)"
      },
      media: [
        {
          type: "visual",
          title: "Isotipo sobre fondo claro",
          image: "assets/projects/branding/napoly-barbershop-manual/images/isotipo-negro-fondo-blanco.png",
          description:
            "Versión principal del isotipo presentada sobre fondo claro para mostrar lectura, peso visual y definición de la marca."
        },
        {
          type: "visual",
          title: "Isotipo sobre fondo oscuro",
          image: "assets/projects/branding/napoly-barbershop-manual/images/isotipo-blanco-fondo-negro.png",
          description:
            "Aplicación invertida del isotipo para validar contraste y consistencia de marca en superficies oscuras."
        },
        {
          type: "book",
          title: "Manual de marca de Napoly Barbershop",
          width: 1680,
          height: 1188,
          pages: Array.from({ length: 25 }, (_, index) =>
            `assets/projects/branding/napoly-barbershop-manual/docs/pages/pagina-${String(index + 1).padStart(2, "0")}.jpg`
          ),
          description:
            "Hojeá el sistema visual y sus aplicaciones sin salir del proyecto."
        }
      ]
    },
    {
      id: "motion-launch",
      title: "Napoly Barbershop | Animación de isotipo",
      experience: {
        theme: "napoly-motion",
        eyebrow: "Motion branding / After Effects",
        headline: "La identidad, en movimiento.",
        introduction: "Dos animaciones breves del mismo isotipo exploran distintas cadencias de presentación para Napoly Barbershop.",
        role: "Animación del isotipo y edición de ritmo",
        format: "Motion graphics · After Effects",
        deliverable: "Dos animaciones exportadas en video",
        tourTitle: "Un símbolo, dos cadencias.",
        tourDescription: "Elegí una versión y reproducila para comparar el ritmo.",
        thinkingTitle: "El ritmo también comunica carácter.",
        chapters: [
          { label: "Principal", title: "Presentación de marca.", description: "La secuencia principal usa el ritmo de entrada para reforzar la presencia del isotipo.", mediaIndex: 0 },
          { label: "Secundaria", title: "Otra cadencia, el mismo símbolo.", description: "La segunda versión prueba un ritmo distinto sin cambiar la identidad visual.", mediaIndex: 1 }
        ]
      },
      category: "Motion",
      categories: ["Motion", "Branding"],
      context: "After Effects / Napoly Barbershop",
      year: "2026",
      summary:
        "Animación breve del isotipo creada para Napoly Barbershop, enfocada en presencia de marca, ritmo visual y una entrada limpia y reconocible.",
      overview:
        "Proyecto motion desarrollado para Napoly Barbershop, pensado para presentar el isotipo de la barbería con una ejecución sobria, actual y orientada a branding.",
      objective:
        "Construir una animación corta y precisa que refuerce la identidad visual de Napoly Barbershop y funcione como pieza de presentación de marca.",
      challenge:
        "La pieza debía transmitir carácter, estilo y profesionalismo, manteniendo una estética limpia y una lectura clara del isotipo en pocos segundos.",
      process: [
        "Definición del comportamiento del isotipo de Napoly Barbershop y del timing general de entrada, pausa y salida.",
        "Construcción de la secuencia principal en After Effects con foco en limpieza, ritmo y presencia de marca.",
        "Desarrollo de una segunda variante para explorar otra cadencia visual dentro del mismo sistema.",
        "Ajuste final de transiciones, velocidad y exportación para presentación digital y portfolio."
      ],
      tools: ["After Effects", "Motion graphics básico", "Branding"],
      deliverables: [
        "Animación principal del isotipo",
        "Animación secundaria",
        "Portada visual",
        "Exportes listos para portfolio"
      ],
      outcome:
        "El resultado presenta la identidad de Napoly Barbershop en movimiento con una ejecución sobria, precisa y pensada para reforzar el reconocimiento de marca.",
      learnings:
        "En motion branding, el impacto no depende de sumar efectos sino de controlar tiempos, energía y legibilidad para que la marca se perciba con claridad.",
      accent: {
        start: "#dfe4ea",
        end: "#c5d0db",
        label: "Motion de marca"
      },
      cover: {
        src: "assets/projects/motion/isotipo-animado/cover/cover.png",
        position: "center center",
        tint: "rgba(10, 12, 16, 0.08)",
        shadow: "rgba(10, 12, 16, 0.3)"
      },
      media: [
        {
          type: "video",
          title: "Principal",
          src: "assets/projects/motion/isotipo-animado/videos/principal.mp4",
          poster: "assets/projects/motion/isotipo-animado/cover/cover.png",
          description:
            "Versión principal de la animación del isotipo de Napoly Barbershop, pensada como pieza base de presentación visual."
        },
        {
          type: "video",
          title: "Secundario",
          src: "assets/projects/motion/isotipo-animado/videos/secundario.mp4",
          poster: "assets/projects/motion/isotipo-animado/cover/cover.png",
          description:
            "Segunda variante del movimiento para complementar el caso y mostrar otra resolución visual de la identidad de Napoly Barbershop."
        }
      ]
    },
    {
      id: "mastantuono-real-madrid",
      title: "Future of Real Madrid | Mastantuono",
      experience: {
        theme: "mastantuono",
        showCover: false,
        eyebrow: "Dirección visual / Fútbol",
        headline: "Una promesa de futuro, en una imagen.",
        introduction: "Un afiche conceptual para redes que pone a Mastantuono en el centro de una composición deportiva de alto contraste.",
        role: "Concepto y composición visual",
        format: "Afiche digital · 1:1",
        deliverable: "Pieza gráfica para redes sociales",
        tourTitle: "La pieza completa.",
        tourDescription: "El formato cuadrado se conserva para ver la composición sin recortes.",
        thinkingTitle: "Profundidad y jerarquía en una sola pieza.",
        chapters: [
          { label: "Afiche final", title: "El jugador como punto de entrada.", description: "El retrato, el nombre y el escudo se organizan en capas para sostener una lectura rápida en redes.", mediaIndex: 0 }
        ]
      },
      category: "Social Media",
      categories: ["Social Media"],
      context: "Flyer para redes sociales",
      year: "2025",
      summary:
        "Flyer conceptual para redes sobre Mastantuono en clave Real Madrid, con composición editorial, alto contraste y foco aspiracional.",
      overview:
        "Pieza pensada para mostrar criterio de composición en social media, manejo de imagen deportiva y una narrativa visual de impacto en formato cuadrado.",
      objective:
        "Diseñar un flyer estático con lectura inmediata, presencia visual fuerte y una estética futbolera premium orientada a redes.",
      challenge:
        "La composición debía equilibrar múltiples recortes del jugador, branding implícito del club y una jerarquía tipográfica dominante sin perder limpieza.",
      process: [
        "Definición del concepto visual con tono aspiracional y eje en la promesa de futuro deportivo.",
        "Composición del flyer con layering de recortes, escudo, humo, tipografía condensada y fondo claro texturado.",
        "Ajuste de jerarquías entre claim, nombre del jugador y elementos secundarios para lectura rápida en redes.",
        "Refinamiento final de contraste, profundidad y balance general para publicación digital."
      ],
      tools: ["Photoshop", "Diseño para redes sociales", "Composición visual"],
      deliverables: [
        "Flyer principal 1:1",
        "Versión lista para publicación digital",
        "Dirección visual deportiva",
        "Composición de alto impacto"
      ],
      outcome:
        "La pieza logra una presencia visual fuerte y contemporánea, con foco en impacto inmediato, narrativa deportiva y carácter editorial para social media.",
      learnings:
        "En piezas deportivas para redes, la jerarquía tipográfica y la profundidad entre planos son clave para construir dramatismo sin saturar la lectura.",
      accent: {
        start: "#e6e6e4",
        end: "#bababa",
        label: "Flyer deportivo"
      },
      cover: {
        src: "assets/projects/social-media/mastantuono-real-madrid/cover/cover.png",
        position: "center center",
        tint: "rgba(12, 14, 18, 0.04)",
        shadow: "rgba(12, 14, 18, 0.22)"
      },
      media: [
        {
          type: "visual",
          title: "Flyer principal",
          image: "assets/projects/social-media/mastantuono-real-madrid/images/mastantuono-real-madrid-flyer.png",
          description:
            "Flyer cuadrado orientado a redes sociales con una construcción aspiracional, composición en capas y foco total en el impacto visual."
        }
      ]
    }
  ]
};














