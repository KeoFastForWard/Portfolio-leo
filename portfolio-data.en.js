// English copy of portfolio-data.js. Only text is listed here: ids, images,
// colors and links still come from portfolio-data.js. Projects are matched by id;
// lists of objects (chapters, media) are matched by position.
const portfolioDataEn = {
  profile: {
    role: "UX/UI Designer | Graphic Design",
    tagline: "I design clear interfaces, clickable prototypes and brands with a strong visual point of view.",
    availability: "Open to UX/UI roles",
    location: "Argentina (GMT-3)",
    mode: "Remote",
    languages: "Spanish (native) · English (intermediate)"
  },
  experiences: [
    {
      role: "Multimedia Designer",
      type: "Professional experience",
      description: "Graphic and video content for digital platforms, the web and social media.",
      bullets: [
        "Graphic and video content for digital platforms.",
        "Created and adapted visual assets for the web and social media.",
        "Basic web content management and visual support.",
        "Visual proposals based on current video and social trends."
      ]
    },
    {
      role: "Branding and Digital Content Designer",
      type: "Freelance / Project",
      description: "Visual identities and communication pieces for digital projects and emerging brands.",
      bullets: [
        "Visual identities for digital projects and emerging brands.",
        "Graphic pieces for social media and online communication.",
        "Multimedia content aligned with each brand's identity.",
        "Creative support on visual guidelines and graphic concepts."
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor's in Graphic Design",
      period: "2025 - Present",
      description: "Focused on visual design, communication, typography, graphic systems and design thinking."
    },
    {
      degree: "Bachelor's in Computer Science",
      description: "Completed up to the second year. It gave me an analytical, structured base that I now apply to interface design."
    }
  ],
  skillGroups: [
    {
      title: "UX/UI and experience",
      description: "Skills for designing digital journeys that are clear, scalable and visually consistent.",
      items: ["UX/UI design", "Wireframes", "User flows", "Interface design", "Prototyping", "Information architecture"]
    },
    {
      title: "Visual and graphic design",
      description: "Visual judgment applied to brand, editorial, print, composition and digital pieces.",
      items: ["Branding and visual identity", "Editorial design", "Packaging", "Social media design", "Typography", "Color", "Visual composition", "Illustration"]
    },
    {
      title: "Tools and production",
      description: "The technical setup I use for digital, print and video work.",
      items: ["Figma", "Photoshop", "Illustrator", "After Effects", "Premiere Pro", "Basic motion graphics", "CMYK color management", "Print-ready file preparation"]
    }
  ],
  projects: {
    "artisse-social": {
      experience: {
        eyebrow: "AI-powered social content",
        headline: "A million views. Nineteen lessons.",
        introduction: "Short TikTok videos promoting Artisse, an AI photo app, to Spanish-speaking audiences. I came up with the ideas, generated the AI visuals, and edited and published every video on the account.",
        role: "Concept, AI generation, editing and publishing",
        format: "TikTok · vertical video 9:16",
        deliverable: "20 short videos in ~2 weeks",
        tourLink: "See the results",
        tourTitle: "Test fast, measure, repeat.",
        tourDescription: "The original account, @artisse.espanol, with its real numbers.",
        thinkingTitle: "The hook wins. Everything else gets measured.",
        chapters: [
          { label: "Profile", title: "The original account, video by video.", description: "All 20 videos on @artisse.espanol with their real views: two pinned, one at 976.6K and most under 600." },
          { label: "Results", title: "One video drove more than 90% of the reach.", description: "~1.08 million total views and 51.1K likes. One video reached 976.6K and three others passed 12K; most stayed under 600." },
          { label: "Format", title: "Hook → AI transformation → call to action.", description: "A face the audience already follows, a question that invites comments, the photo moving through styles generated with the app, and a branded close." }
        ]
      },
      context: "Social Media / Motion",
      external: { label: "View the TikTok profile" },
      summary: "Short AI videos for TikTok: ~1 million views in two weeks, with one video at 976K.",
      overview: "Social content for Artisse Interactive, made to introduce the AI photo app to Spanish-speaking audiences.",
      objective: "Get fast organic reach and bring people to try the app, with pieces that could be produced and adjusted the same day.",
      challenge: "Grab attention in the first second, show what the app does without explaining it, and produce enough variations to learn what worked.",
      process: [
        "A hook with a question for the audience: “What other style would you like to see on her?” turned comments into ideas for the next video.",
        "AI transformation in a few seconds: the same photo moves through several styles, cut to the beat of the audio.",
        "Replying to comments with new videos: the reply to one follower reached 14.1K views.",
        "A clear call to action at the end (“Try it on Artisse”), which on its own produced two videos with more than 9K views.",
        "Several versions a day, tracking views and likes, and repeating the format that worked."
      ],
      tools: ["Generative AI tools", "Premiere Pro", "After Effects", "TikTok"],
      deliverables: ["20 vertical videos", "Reusable hook format", "Video replies to comments", "Publishing and metrics tracking"],
      outcome: "~1.08 million views and 51.1K likes in two weeks; one video reached 976.6K views and three others passed 12K.",
      learnings: "Hooks that asked the audience a question, and replies to comments, multiplied reach. Today I apply the same idea to UX/UI design: iterate with data, not assumptions.",
      accent: { label: "Social content" },
      media: [
        { title: "TikTok profile", description: "The @artisse.espanol account with its 20 videos and the views on each one." },
        { title: "Results", description: "Views per video and account totals (August 2023)." },
        { title: "Format", description: "Format outline: hook, AI transformation and call to action." },
        { title: "976.6K views", description: "The most viewed video: an AI style plus the question “What other style would you like to see on her?”." },
        { title: "Reply to a comment · 14.1K", description: "A follower's request, answered with a new video." },
        { title: "“Try it on Artisse” · 12.8K", description: "A direct call to action at the end of the video." }
      ]
    },
    protogalaxy: {
      experience: {
        eyebrow: "An interface to explore",
        headline: "A visual universe. A clear path.",
        introduction: "A web design exploration where space photography sets the mood and persistent navigation connects every part of the journey.",
        chapters: [
          { label: "Home", title: "Where the exploration begins.", description: "An immersive landscape introduces the visual world, with key actions placed over the image." },
          { label: "Gallery", title: "The image leads the way.", description: "The gallery puts photography first and keeps the main sections within reach." },
          { label: "Contact", title: "A familiar way out.", description: "Contact keeps the visual language of the experience without leaving its navigation structure." }
        ]
      },
      presentation: {
        role: "Research, UI design and prototyping",
        focus: "Visual exploration and navigation between sections",
        evidence: "Home, gallery, contact and clickable prototype."
      },
      context: "Website UI",
      summary: "A concept website with an immersive, space-themed look, designed to convey depth and exploration.",
      overview: "A web UX/UI case built around a cinematic visual experience, with immersive blocks and a clear interface inside a dark universe.",
      objective: "Build a striking interface that keeps visual order and clear navigation within a very bold graphic concept.",
      challenge: "Balancing visual spectacle, readability and continuity across image-heavy screens.",
      process: [
        "Defined the visual concept and the overall mood of the site.",
        "Designed key screens: home, about us, photos and contact.",
        "Built dark components focused on contrast and depth.",
        "Reviewed the flow so the journey stays clear inside the immersive concept."
      ],
      tools: ["Figma", "UI design", "Web design", "Art direction"],
      deliverables: ["Immersive home", "Inner pages", "Dark visual system", "Variations gallery", "Interactive Figma prototype"],
      outcome: "The proposal delivers a more atmospheric, aspirational web experience while keeping structure and narrative focus.",
      learnings: "Even in very visual interfaces, consistent components are still the foundation of solid navigation.",
      accent: { label: "Immersive experience" },
      media: [
        { title: "Interactive Figma prototype", description: "Explore Órbita's home, gallery and sections in the Figma prototype." }
      ]
    },
    protodealership: {
      experience: {
        eyebrow: "Precision in every interaction",
        headline: "Design that puts the product in motion.",
        introduction: "A digital car dealership experience that moves attention from the vehicle to the catalog and its details. Image, information and navigation share one direction.",
        chapters: [
          { label: "Home", title: "The vehicle, front and center.", description: "The image presents the product; navigation sits in its own band to keep reading clear." },
          { label: "Catalog", title: "Browse without losing focus.", description: "Model, color and selection live together in a view centered on the vehicle." },
          { label: "Detail", title: "From image to information.", description: "The detail page brings together features and price before the journey continues." }
        ]
      },
      presentation: {
        role: "Research, UI design and prototyping",
        focus: "Vehicle presentation and catalog browsing",
        evidence: "Home screen, catalog and clickable prototype."
      },
      context: "Website UI",
      summary: "An interactive landing page for a digital car dealership, focused on catalog, product and a clear web experience.",
      overview: "A UX/UI project presenting a digital dealership with an immersive interface, solid hierarchy and a commercial visual narrative.",
      objective: "Design an interactive page that combines visual impact, clear navigation and an attractive product presentation.",
      challenge: "The experience had to feel premium and high-tech without compromising readability, pacing or focus on conversion.",
      process: [
        "Defined the site structure, main hero and top navigation.",
        "Designed the layout to highlight the vehicle and organize key information.",
        "Adjusted contrast, typography and hierarchy to keep things clear over a strong image.",
        "Prototyped the main journey and refined micro-interactions in Figma."
      ],
      tools: ["Figma", "Web design", "Interface design", "Prototyping"],
      deliverables: ["Home hero", "Desktop UI system", "Catalog section", "Screen gallery", "Interactive Figma prototype"],
      outcome: "The case presents a more aspirational digital presence, with a commercial focus and a visually organized web interface.",
      learnings: "When the image takes center stage, typographic hierarchy and contrast control become decisive.",
      accent: { label: "Digital dealership" },
      media: [
        { title: "Interactive Figma prototype", description: "Explore Vértice Motors' home screen and catalog in the Figma prototype." }
      ]
    },
    protored: {
      experience: {
        eyebrow: "An interface to connect",
        headline: "From scrolling to talking.",
        introduction: "A mobile social network concept that connects the feed, the profile and the chat without breaking continuity between screens.",
        tourTitle: "The journey in the palm of your hand.",
        thinkingTitle: "An identity that holds across views.",
        chapters: [
          { label: "Feed", title: "A familiar starting point.", description: "Content takes the center while navigation keeps the main actions within reach." },
          { label: "Profile", title: "A space of your own.", description: "The profile brings together each person's content and identity within the same visual system." },
          { label: "Chat", title: "From content to conversation.", description: "The chat view shifts focus to direct exchange, without leaving the app's language." }
        ]
      },
      presentation: {
        role: "Research, UI design and prototyping",
        focus: "Feed, profiles and conversations",
        evidence: "App screens and a social interaction prototype."
      },
      context: "Mobile app UI",
      summary: "A mobile social network concept focused on feed, profiles, camera, messages and continuity between key views.",
      overview: "A UX/UI case for a social app, showing feed design, profiles, calls and a consistent mobile structure.",
      objective: "Build a visually distinctive app that is still easy to navigate, with a language close to a real product.",
      challenge: "The system had to cover many views within one identity without losing consistency or ease of use.",
      process: [
        "Defined the app's overall style and its essential screens.",
        "Designed the profile, feed, bottom navigation and social interaction states.",
        "Tested compositions to balance image, typography and interaction.",
        "Adjusted the UI system to keep continuity across views and actions."
      ],
      tools: ["Figma", "App design", "Mobile design", "UI systems"],
      deliverables: ["Profile and feed screens", "Social interaction views", "Main navigation", "States gallery", "Interactive Figma prototype"],
      outcome: "The proposal works as a solid social app concept, with its own identity and good control of the mobile layout.",
      learnings: "A product with many views needs a very consistent UI foundation so the experience stays intuitive.",
      accent: { label: "Social app" },
      media: [
        { title: "Interactive Figma prototype", description: "Explore Proto Red's feed, profiles and conversations in the Figma prototype." },
        {},
        { title: "Profile" }
      ]
    },
    "napoly-brand-manual": {
      experience: {
        tourLink: "Watch the animations",
        eyebrow: "Visual identity and motion",
        headline: "The identity, in motion.",
        introduction: "I designed an isotype for Napoly Barbershop, documented how to use it and explored two ways to present it in motion.",
        role: "Isotype design, brand manual and animation",
        format: "Visual identity · Motion graphics",
        deliverable: "Isotype, manual and two animations",
        tourTitle: "One symbol, two rhythms.",
        tourDescription: "Pick a version and play it to compare the pacing.",
        thinkingTitle: "Rhythm also communicates character.",
        chapters: [
          { label: "Main", title: "Brand introduction.", description: "The main sequence uses the entrance timing to reinforce the isotype's presence." },
          { label: "Secondary", title: "Another rhythm, the same symbol.", description: "The second version tries a different pace without changing the visual identity." }
        ]
      },
      context: "Visual identity / Motion",
      summary: "A visual identity with an isotype in positive and negative, two animations and an interactive brand manual.",
      overview: "An identity system for a barbershop, with usage guidelines and two animated presentation pieces.",
      objective: "Create an isotype that is recognizable on any background and carry its character into two short animations.",
      challenge: "Keeping the isotype readable both in static applications and in sequences only a few seconds long.",
      process: [
        "Designed the isotype in positive and negative and documented its uses in the manual.",
        "Defined how the Napoly Barbershop isotype behaves and the overall timing of entrance, pause and exit.",
        "Built the main sequence in After Effects, focused on cleanliness, rhythm and brand presence.",
        "Developed a second variation to explore a different visual pace within the same system.",
        "Final pass on transitions, speed and export for digital presentation and the portfolio."
      ],
      tools: ["After Effects", "Visual identity", "Editorial design"],
      deliverables: ["Main isotype animation", "Secondary animation", "Isotype in positive and negative", "Brand manual"],
      outcome: "A brand system with clear applications, a usage manual and two animations that give the same symbol different rhythms.",
      learnings: "In motion branding, impact doesn't come from adding effects but from controlling timing, energy and readability so the brand reads clearly.",
      accent: { label: "Brand motion" },
      media: [
        { title: "Main", description: "Main version of the Napoly Barbershop isotype animation, designed as the core presentation piece." },
        { title: "Secondary", description: "A second motion variation that complements the case and shows another visual take on the Napoly Barbershop identity." },
        { title: "Isotype on a light background", description: "The main isotype on a light background, showing readability, visual weight and definition." },
        { title: "Isotype on a dark background", description: "The inverted isotype, checking contrast and brand consistency on dark surfaces." },
        { title: "Napoly Barbershop brand manual", description: "Flip through the visual system and its applications without leaving the project." }
      ]
    },
    "nike-vision": {
      experience: {
        eyebrow: "Product in the spotlight",
        headline: "From first glance to the details.",
        introduction: "A concept store where the image opens the journey and the interface guides the way to the product page.",
        tourTitle: "Two scales of the same store.",
        thinkingTitle: "From image to information.",
        chapters: [
          { label: "Home", title: "First impression.", description: "The cover sets the visual tone and puts the product first without hiding navigation." },
          { label: "Product page", title: "Information takes over.", description: "The full product page shows how hierarchy shifts when attention moves from the brand to the product." }
        ]
      },
      presentation: {
        role: "Research, UI design and prototyping",
        focus: "Product, navigation and purchase details",
        evidence: "Interface, walkthrough video and clickable prototype."
      },
      context: "Website UI",
      summary: "A concept landing page for a Nike line, focused on product, visual storytelling and a clean browsing experience.",
      overview: "A web UX/UI project presenting a product line with a clear, minimal and commercially minded interface.",
      objective: "Build an interactive page that highlights product, brand identity and navigation with a simple, current read.",
      challenge: "The composition had to balance visual impact, product presence and a restrained interface without losing clarity.",
      process: [
        "Defined the site's visual tone and the relationship between product, typography and image.",
        "Designed the main hero, top navigation and product modules.",
        "Explored product screens and presentation variants with a commercial focus.",
        "Refined the prototype and reviewed visual hierarchies."
      ],
      tools: ["Figma", "Web design", "UI design", "Prototyping"],
      deliverables: ["Main cover", "Product screens", "Web UI system", "Presentation video", "Interactive Figma prototype"],
      outcome: "The project delivers a clean, aspirational visual proposal, focused on product and an interface that is easy to browse.",
      learnings: "On a product-driven site, art direction and visual hierarchy have to serve clarity.",
      accent: { label: "Product + interface" },
      media: [
        { title: "Interactive Figma prototype", description: "A clickable version of the Just Vision prototype, embedded in the portfolio so you can explore the UX/UI proposal from the case." },
        {},
        {},
        { title: "Video demo" }
      ]
    }
  }
};
