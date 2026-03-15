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
        "Refinamiento del prototipo y validación de jerarquías para una experiencia web fluida."
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
        "Video de presentación"
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
          type: "visual",
          title: "HUD",
          image: "assets/projects/uxui/nike-vision/images/nike-vision-hud.png"
        },
        {
          type: "visual",
          title: "Product Page",
          image: "assets/projects/uxui/nike-vision/images/nike-vision-product-page.png"
        },
        {
          type: "visual",
          title: "Product Page Complete",
          image: "assets/projects/uxui/nike-vision/images/nike-vision-product-page-complete.png"
        },
        {
          type: "visual",
          title: "Slide",
          image: "assets/projects/uxui/nike-vision/images/slide.png"
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
      title: "ProtoDealership",
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
        "Galería de pantallas"
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
        src: "assets/projects/uxui/protodealership/cover/cover.png",
        position: "68% center",
        tint: "rgba(7, 10, 18, 0.12)",
        shadow: "rgba(7, 10, 18, 0.74)"
      },
      media:             [
        {
          type: "visual",
          title: "Catalogue Protodealersip",
          image: "assets/projects/uxui/protodealership/images/catalogue-protodealersip.png"
        },
        {
          type: "visual",
          title: "Dashboard Presentation",
          image: "assets/projects/uxui/protodealership/images/dashboard-presentation.png"
        },
        {
          type: "visual",
          title: "HUD",
          image: "assets/projects/uxui/protodealership/images/hud-protodealership.png"
        },
        {
          type: "visual",
          title: "More",
          image: "assets/projects/uxui/protodealership/images/more-protodealership.png"
        },
        {
          type: "visual",
          title: "Catalogue Part 1",
          image: "assets/projects/uxui/protodealership/images/property-1-catalogue-part-1.png"
        },
        {
          type: "visual",
          title: "Catalogue Part 2",
          image: "assets/projects/uxui/protodealership/images/property-1-catalogue-part-2.png"
        },
        {
          type: "visual",
          title: "Catalogue Part 3",
          image: "assets/projects/uxui/protodealership/images/property-1-catalogue-part-3.png"
        },
        {
          type: "visual",
          title: "Catalogue Part 4",
          image: "assets/projects/uxui/protodealership/images/property-1-catalogue-part-4.png"
        },
        {
          type: "visual",
          title: "Catalogue Part 5",
          image: "assets/projects/uxui/protodealership/images/property-1-catalogue-part-5.png"
        },
        {
          type: "visual",
          title: "Catalogue Part 6",
          image: "assets/projects/uxui/protodealership/images/property-1-catalogue-part-6.png"
        },
        {
          type: "visual",
          title: "Catalogue Part 7",
          image: "assets/projects/uxui/protodealership/images/property-1-catalogue-part-7.png"
        },
        {
          type: "visual",
          title: "Catalogue Transition",
          image: "assets/projects/uxui/protodealership/images/property-1-catalogue-transition.png"
        },
        {
          type: "visual",
          title: "Default",
          image: "assets/projects/uxui/protodealership/images/property-1-default.png"
        },
        {
          type: "visual",
          title: "Variant 10",
          image: "assets/projects/uxui/protodealership/images/property-1-variant10.png"
        },
        {
          type: "visual",
          title: "Variant 16",
          image: "assets/projects/uxui/protodealership/images/property-1-variant16.png"
        },
        {
          type: "visual",
          title: "Variant 2",
          image: "assets/projects/uxui/protodealership/images/property-1-variant2.png"
        },
        {
          type: "visual",
          title: "Variant 20",
          image: "assets/projects/uxui/protodealership/images/property-1-variant20.png"
        },
        {
          type: "visual",
          title: "Variant 3",
          image: "assets/projects/uxui/protodealership/images/property-1-variant3.png"
        },
        {
          type: "visual",
          title: "Variant 4",
          image: "assets/projects/uxui/protodealership/images/property-1-variant4.png"
        },
        {
          type: "visual",
          title: "Variant 5",
          image: "assets/projects/uxui/protodealership/images/property-1-variant5.png"
        },
        {
          type: "visual",
          title: "Variant 6",
          image: "assets/projects/uxui/protodealership/images/property-1-variant6.png"
        },
        {
          type: "visual",
          title: "Variant 7",
          image: "assets/projects/uxui/protodealership/images/property-1-variant7.png"
        },
        {
          type: "visual",
          title: "Variant 8",
          image: "assets/projects/uxui/protodealership/images/property-1-variant8.png"
        },
        {
          type: "visual",
          title: "Variant 9",
          image: "assets/projects/uxui/protodealership/images/property-1-variant9.png"
        }
      ]
    },
    {
      id: "protogalaxy",
      title: "ProtoGalaxy",
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
        "Galería de variaciones"
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
        src: "assets/projects/uxui/protogalaxy/cover/cover.png",
        position: "center center",
        tint: "rgba(5, 8, 18, 0.16)",
        shadow: "rgba(5, 8, 18, 0.8)"
      },
      media:             [
        {
          type: "visual",
          title: "The Galaxy Is In Your Hands",
          image: "assets/projects/uxui/protogalaxy/images/the-galaxy-is-in-your-hands.png"
        },
        {
          type: "visual",
          title: "About Us Part 1",
          image: "assets/projects/uxui/protogalaxy/images/the-galaxy-is-in-your-hands-about-us-part-1.png"
        },
        {
          type: "visual",
          title: "About Us Part 2",
          image: "assets/projects/uxui/protogalaxy/images/the-galaxy-is-in-your-hands-about-us-part-2.png"
        },
        {
          type: "visual",
          title: "About Us Part 3",
          image: "assets/projects/uxui/protogalaxy/images/the-galaxy-is-in-your-hands-about-us-part-3.png"
        },
        {
          type: "visual",
          title: "Contact Part 1",
          image: "assets/projects/uxui/protogalaxy/images/the-galaxy-is-in-your-hands-contact-part-1.png"
        },
        {
          type: "visual",
          title: "Contact Part 2",
          image: "assets/projects/uxui/protogalaxy/images/the-galaxy-is-in-your-hands-contact-part-2.png"
        },
        {
          type: "visual",
          title: "Contact Part 3",
          image: "assets/projects/uxui/protogalaxy/images/the-galaxy-is-in-your-hands-contact-part-3.png"
        },
        {
          type: "visual",
          title: "Photos Part 1",
          image: "assets/projects/uxui/protogalaxy/images/the-galaxy-is-in-your-hands-photos-part-1.png"
        },
        {
          type: "visual",
          title: "Photos Part 2",
          image: "assets/projects/uxui/protogalaxy/images/the-galaxy-is-in-your-hands-photos-part-2.png"
        },
        {
          type: "visual",
          title: "Photos Part 3",
          image: "assets/projects/uxui/protogalaxy/images/the-galaxy-is-in-your-hands-photos-part-3.png"
        },
        {
          type: "visual",
          title: "Principal Button Part 1",
          image: "assets/projects/uxui/protogalaxy/images/the-galaxy-is-in-your-hands-principal-button-part-1.png"
        },
        {
          type: "visual",
          title: "Principal Button Part 2",
          image: "assets/projects/uxui/protogalaxy/images/the-galaxy-is-in-your-hands-principal-button-part-2.png"
        }
      ]
    },
    {
      id: "protored",
      title: "ProtoRed",
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
        "Galería de estados"
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
          type: "visual",
          title: "Call",
          image: "assets/projects/uxui/protored/images/call-protored.png"
        },
        {
          type: "visual",
          title: "Camera",
          image: "assets/projects/uxui/protored/images/camera-protored.png"
        },
        {
          type: "visual",
          title: "Camera 1",
          image: "assets/projects/uxui/protored/images/camera-protored-1.png"
        },
        {
          type: "visual",
          title: "Chat",
          image: "assets/projects/uxui/protored/images/chat-protored.png"
        },
        {
          type: "visual",
          title: "Create Post",
          image: "assets/projects/uxui/protored/images/create-post-protored.png"
        },
        {
          type: "visual",
          title: "Highlights Perfil",
          image: "assets/projects/uxui/protored/images/highlights-perfil-protored.png"
        },
        {
          type: "visual",
          title: "History Perfil",
          image: "assets/projects/uxui/protored/images/history-perfil-protored.png"
        },
        {
          type: "visual",
          title: "History",
          image: "assets/projects/uxui/protored/images/history-protored.png"
        },
        {
          type: "visual",
          title: "HUD",
          image: "assets/projects/uxui/protored/images/hud-protored.png"
        },
        {
          type: "visual",
          title: "Login",
          image: "assets/projects/uxui/protored/images/login-protored.png"
        },
        {
          type: "visual",
          title: "Messages",
          image: "assets/projects/uxui/protored/images/messages-protored.png"
        },
        {
          type: "visual",
          title: "Notification Scene",
          image: "assets/projects/uxui/protored/images/notification-scene-protored.png"
        },
        {
          type: "visual",
          title: "Perfil Person Notification",
          image: "assets/projects/uxui/protored/images/perfil-person-notification-protored.png"
        },
        {
          type: "visual",
          title: "Perfil Person",
          image: "assets/projects/uxui/protored/images/perfil-person-protored.png"
        },
        {
          type: "visual",
          title: "Perfil Person Search",
          image: "assets/projects/uxui/protored/images/perfil-person-search-protored.png"
        },
        {
          type: "visual",
          title: "Perfil",
          image: "assets/projects/uxui/protored/images/perfil-protored.png"
        },
        {
          type: "visual",
          title: "Post Comments",
          image: "assets/projects/uxui/protored/images/post-comments-protored.png"
        },
        {
          type: "visual",
          title: "Post Comments 1",
          image: "assets/projects/uxui/protored/images/post-comments-protored-1.png"
        },
        {
          type: "visual",
          title: "Publicacion Perfil",
          image: "assets/projects/uxui/protored/images/publicacion-perfil-protored.png"
        },
        {
          type: "visual",
          title: "Register",
          image: "assets/projects/uxui/protored/images/register-protored.png"
        },
        {
          type: "visual",
          title: "Search",
          image: "assets/projects/uxui/protored/images/search-protored.png"
        },
        {
          type: "visual",
          title: "Videocall",
          image: "assets/projects/uxui/protored/images/videocall-protored.png"
        }
      ]
    },
    {
      id: "prototv",
      title: "ProtoTV",
      category: "UX/UI",
      categories:       [
        "UX/UI"
      ],
      context: "Sitio web UI",
      year: "2024",
      summary:
        "Concepto de streaming con biblioteca visual, navegación por categorías y una experiencia pensada para explorar contenido.",
      overview:
        "Caso UX/UI para una plataforma de streaming orientado a exhibir organización de contenido, módulos visuales y experiencia de browsing.",
      objective:
        "Diseñar una interfaz de streaming clara, actual y entretenida, con foco en contenido destacado y navegación horizontal.",
      challenge:
        "La grilla debía verse atractiva y reconocible sin saturar la pantalla ni perder jerarquía entre secciones.",
      process:       [
        "Definición de navegación principal y categorías de contenido.",
        "Diseño de módulos horizontales, estados de portadas y áreas destacadas.",
        "Ajuste de contraste entre UI oscura, posters y acciones del usuario.",
        "Prototipado de la experiencia general y refinamiento del layout final."
      ],
      tools:       [
        "Figma",
        "Diseño web",
        "UI kit",
        "Prototipado"
      ],
      deliverables:       [
        "Home de streaming",
        "Sistema de categorías",
        "Grillas de contenido",
        "Pantallas de reproducción"
      ],
      outcome:
        "La propuesta resuelve una interfaz de streaming moderna, reconocible y lista para escalar hacia más vistas y funciones.",
      learnings:
        "La organización del contenido es tan importante como la estética cuando la experiencia depende de explorar rápido.",
      accent: {
        start: "#0c1016",
        end: "#8f95a8",
        label: "Interfaz de streaming"
      },
      cover: {
        src: "assets/projects/uxui/prototv/cover/cover.png",
        position: "center center",
        tint: "rgba(7, 10, 18, 0.1)",
        shadow: "rgba(7, 10, 18, 0.56)"
      },
      media:             [
        {
          type: "visual",
          title: "Agree Perfil",
          image: "assets/projects/uxui/prototv/images/agree-perfil-prototv.png"
        },
        {
          type: "visual",
          title: "Choose Account",
          image: "assets/projects/uxui/prototv/images/choose-account-prototv.png"
        },
        {
          type: "visual",
          title: "Film Repodructor For Explore",
          image: "assets/projects/uxui/prototv/images/film-repodructor-for-explore-prototv.png"
        },
        {
          type: "visual",
          title: "Film Repodructor For Explore 1",
          image: "assets/projects/uxui/prototv/images/film-repodructor-for-explore-prototv-1.png"
        },
        {
          type: "visual",
          title: "Film Repodructor For My List",
          image: "assets/projects/uxui/prototv/images/film-repodructor-for-my-list-prototv.png"
        },
        {
          type: "visual",
          title: "Film Repodructor For My List 1",
          image: "assets/projects/uxui/prototv/images/film-repodructor-for-my-list-prototv-1.png"
        },
        {
          type: "visual",
          title: "Film Repodructor For Popular News",
          image: "assets/projects/uxui/prototv/images/film-repodructor-for-popular-news-prototv.png"
        },
        {
          type: "visual",
          title: "Film Repodructor For Popular News 1",
          image: "assets/projects/uxui/prototv/images/film-repodructor-for-popular-news-prototv-1.png"
        },
        {
          type: "visual",
          title: "Film Repodructor",
          image: "assets/projects/uxui/prototv/images/film-repodructor-prototv.png"
        },
        {
          type: "visual",
          title: "Film Repodructor 1",
          image: "assets/projects/uxui/prototv/images/film-repodructor-prototv-1.png"
        },
        {
          type: "visual",
          title: "HUD Explore Languages",
          image: "assets/projects/uxui/prototv/images/hud-explore-languages-prototv.png"
        },
        {
          type: "visual",
          title: "HUD Films Presentation For Explore",
          image: "assets/projects/uxui/prototv/images/hud-films-presentation-for-explore-prototv.png"
        },
        {
          type: "visual",
          title: "HUD Films Presentation For My List",
          image: "assets/projects/uxui/prototv/images/hud-films-presentation-for-my-list-prototv.png"
        },
        {
          type: "visual",
          title: "HUD Films Presentation For Popular News",
          image: "assets/projects/uxui/prototv/images/hud-films-presentation-for-popular-news-prototv.png"
        },
        {
          type: "visual",
          title: "HUD Films Presentation",
          image: "assets/projects/uxui/prototv/images/hud-films-presentation-prototv.png"
        },
        {
          type: "visual",
          title: "HUD Films",
          image: "assets/projects/uxui/prototv/images/hud-films-prototv.png"
        },
        {
          type: "visual",
          title: "HUD My List",
          image: "assets/projects/uxui/prototv/images/hud-my-list-prototv.png"
        },
        {
          type: "visual",
          title: "HUD Popular News",
          image: "assets/projects/uxui/prototv/images/hud-popular-news-prototv.png"
        },
        {
          type: "visual",
          title: "HUD Serie",
          image: "assets/projects/uxui/prototv/images/hud-serie-prototv.png"
        },
        {
          type: "visual",
          title: "HUD Series Presentation For Explore",
          image: "assets/projects/uxui/prototv/images/hud-series-presentation-for-explore-prototv.png"
        },
        {
          type: "visual",
          title: "HUD Series Presentation For My List",
          image: "assets/projects/uxui/prototv/images/hud-series-presentation-for-my-list-prototv.png"
        },
        {
          type: "visual",
          title: "HUD Series Presentation For Popular News",
          image: "assets/projects/uxui/prototv/images/hud-series-presentation-for-popular-news-prototv.png"
        },
        {
          type: "visual",
          title: "HUD Series Presentation",
          image: "assets/projects/uxui/prototv/images/hud-series-presentation-prototv.png"
        },
        {
          type: "visual",
          title: "HUD Start",
          image: "assets/projects/uxui/prototv/images/hud-start-prototv.png"
        },
        {
          type: "visual",
          title: "Presentation",
          image: "assets/projects/uxui/prototv/images/prototv-presentation.png"
        },
        {
          type: "visual",
          title: "Register",
          image: "assets/projects/uxui/prototv/images/register-prototv.png"
        },
        {
          type: "visual",
          title: "Sign In",
          image: "assets/projects/uxui/prototv/images/sign-in-prototv.png"
        }
      ]
    },
    {
      id: "motion-launch",
      title: "Napoly Barbershop | Animación de isotipo",
      category: "Motion",
      categories: ["Motion", "Branding"],
      context: "After Effects / Napoly Barbershop",
      year: "2025",
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














