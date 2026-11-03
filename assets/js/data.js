/* =========================================================
   كل محتوى الموقع هنا — عدّل الملف ده بس.
   All site content lives here — this is the only file you edit.

   Media types for "cover" and inside "blocks":
     { type: "image", src: "assets/media/xxx.jpg", alt: "..." }
     { type: "video", src: "assets/media/xxx.mp4", poster: "assets/media/xxx.jpg" }   // autoplay, muted, loop
     { type: "youtube", id: "VIDEO_ID" }      // YouTube embed
     { type: "vimeo",   id: "VIDEO_ID" }      // Vimeo embed
     { type: "placeholder", label: "..." }    // temporary art until you add real files

   Block layouts: "full" (edge to edge), "wide", "grid2", "grid3", "text", "quote", "stats"
   ========================================================= */

window.SITE = {
  name: { en: "Mohamed Ibrahim", ar: "محمد إبراهيم" },
  short: "MI",
  role: {
    en: "Graphic Designer · 3D Artist · Brand Identity",
    ar: "مصمم جرافيك · فنان ثري دي · هويات بصرية",
  },
  disciplines: {
    en: ["Brand Identity", "3D Modeling", "Graphic Design", "Motion & Video"],
    ar: ["هويات بصرية", "تصميم ثري دي", "جرافيك ديزاين", "موشن وفيديو"],
  },
  intro: {
    en: "I build visual worlds for brands — from the first mark on paper to the last frame on screen.",
    ar: "ببني عوالم بصرية للبراندات — من أول خط في اللوجو لحد آخر فريم في الفيديو.",
  },
  // Showreel in the hero. Use a "video" (mp4) or "youtube"/"vimeo", or leave placeholder.
  showreel: { type: "placeholder", label: "Showreel 2026" },
  about: {
    en: "I'm a multidisciplinary designer working across brand identity, 3D and motion. I care about systems that feel alive: logos that move, products that glow, and campaigns that feel like one story across every screen.",
    ar: "أنا مصمم بشتغل بين الهوية البصرية والثري دي والموشن. بهتم إن التصميم يبقى سيستم حي: لوجو بيتحرك، منتج بينوّر، وكامبين شكلها قصة واحدة على كل شاشة.",
  },
  services: [
    { en: "Brand Identity & Logo Systems", ar: "هويات بصرية وأنظمة لوجو" },
    { en: "3D Modeling, Lighting & Rendering", ar: "تصميم ثري دي وإضاءة ورندر" },
    { en: "Social Media & Campaign Content", ar: "محتوى سوشيال وكامبينز" },
    { en: "Motion Graphics & Video Editing", ar: "موشن جرافيك ومونتاج" },
    { en: "Packaging & Print", ar: "باكدجينج وطباعة" },
  ],
  stats: [
    { value: "60+", en: "Projects delivered", ar: "مشروع اتسلّم" },
    { value: "25+", en: "Brands", ar: "براند" },
    { value: "6", en: "Years of practice", ar: "سنين خبرة" },
  ],
  email: "hello@example.com", // ← حط إيميلك هنا
  socials: [
    { label: "Behance", url: "https://www.behance.net/" },
    { label: "Instagram", url: "https://www.instagram.com/" },
    { label: "ArtStation", url: "https://www.artstation.com/" },
    { label: "LinkedIn", url: "https://www.linkedin.com/" },
  ],
};

/* Filters shown above the work grid. Each project lists its "tags" keys. */
window.FILTERS = [
  { key: "all", en: "All", ar: "الكل" },
  { key: "identity", en: "Identity", ar: "هوية" },
  { key: "3d", en: "3D", ar: "ثري دي" },
  { key: "graphic", en: "Graphic", ar: "جرافيك" },
  { key: "motion", en: "Motion", ar: "موشن" },
];

/* ---------------------------------------------------------
   PROJECTS — the 4 below are SAMPLES with placeholder art.
   Replace titles, text and media with your real work.
   --------------------------------------------------------- */
window.PROJECTS = [
  {
    slug: "sample-identity",
    title: { en: "Nour Coffee", ar: "نور كوفي" },
    subtitle: { en: "Brand identity & social content", ar: "هوية بصرية ومحتوى سوشيال" },
    tags: ["identity", "graphic"],
    year: "2026",
    client: { en: "Sample client", ar: "عميل تجريبي" },
    color: "#ff6a3d",
    size: "large", // large | tall | normal — controls the card size in the grid
    cover: { type: "placeholder", label: "Identity" },
    summary: {
      en: "A warm, light-driven identity for a specialty coffee brand: a mark built from a rising sun, a custom type pairing, and a content system that scales from cups to reels.",
      ar: "هوية دافية مبنية على فكرة النور لبراند قهوة مختصة: لوجو مستوحى من شمس طالعة، خطوط مخصوصة، وسيستم محتوى ينفع من الكوباية لحد الريلز.",
    },
    credits: [
      { role: { en: "Creative Direction", ar: "إخراج فني" }, name: "Mohamed Ibrahim" },
      { role: { en: "Identity Design", ar: "تصميم الهوية" }, name: "Mohamed Ibrahim" },
    ],
    blocks: [
      { layout: "full", items: [{ type: "placeholder", label: "Hero visual" }] },
      { layout: "text", title: { en: "The idea", ar: "الفكرة" }, body: { en: "Every morning starts with light. The mark is a sun cut by a horizon line — simple enough for a stamp, rich enough to animate.", ar: "كل صباح بيبدأ بنور. اللوجو شمس مقطوعة بخط أفق — بسيط كفاية يتطبع ختم، وغني كفاية يتحرك." } },
      { layout: "grid2", items: [{ type: "placeholder", label: "Logo" }, { type: "placeholder", label: "Palette" }] },
      { layout: "wide", items: [{ type: "placeholder", label: "Motion logo (video)" }] },
      { layout: "grid3", items: [{ type: "placeholder", label: "Post 01" }, { type: "placeholder", label: "Post 02" }, { type: "placeholder", label: "Post 03" }] },
      { layout: "quote", body: { en: "Light is the brand. Everything else is a shadow it casts.", ar: "النور هو البراند. وكل حاجة تانية ضل بيعمله." } },
    ],
  },
  {
    slug: "sample-3d",
    title: { en: "Orbit Speaker", ar: "أوربت سبيكر" },
    subtitle: { en: "3D product visualization", ar: "تصوير منتج ثري دي" },
    tags: ["3d", "motion"],
    year: "2026",
    client: { en: "Sample client", ar: "عميل تجريبي" },
    color: "#7c5cff",
    size: "tall",
    cover: { type: "placeholder", label: "3D" },
    summary: {
      en: "Full CGI launch film and stills for a wireless speaker — modeled, lit and rendered from scratch.",
      ar: "فيلم إطلاق وصور CGI كاملة لسبيكر وايرلس — موديلنج وإضاءة ورندر من الصفر.",
    },
    credits: [
      { role: { en: "3D & Lighting", ar: "ثري دي وإضاءة" }, name: "Mohamed Ibrahim" },
    ],
    blocks: [
      { layout: "full", items: [{ type: "placeholder", label: "Launch film" }] },
      { layout: "stats", items: [{ value: "48", en: "Renders", ar: "رندر" }, { value: "30s", en: "Launch film", ar: "فيلم إطلاق" }, { value: "4K", en: "Resolution", ar: "دقة" }] },
      { layout: "grid2", items: [{ type: "placeholder", label: "Detail 01" }, { type: "placeholder", label: "Detail 02" }] },
      { layout: "full", items: [{ type: "placeholder", label: "Exploded view" }] },
    ],
  },
  {
    slug: "sample-campaign",
    title: { en: "Pulse Run", ar: "بلس ران" },
    subtitle: { en: "Campaign & social content", ar: "كامبين ومحتوى سوشيال" },
    tags: ["graphic", "motion"],
    year: "2025",
    client: { en: "Sample client", ar: "عميل تجريبي" },
    color: "#c6ff3d",
    size: "normal",
    cover: { type: "placeholder", label: "Campaign" },
    summary: {
      en: "A high-energy content system for a running event: kinetic type, bold color and 40+ assets across formats.",
      ar: "سيستم محتوى مليان طاقة لماراثون: تايبوجرافي متحركة، ألوان جريئة، وأكتر من 40 تصميم بكل المقاسات.",
    },
    credits: [{ role: { en: "Design & Motion", ar: "تصميم وموشن" }, name: "Mohamed Ibrahim" }],
    blocks: [
      { layout: "full", items: [{ type: "placeholder", label: "Key visual" }] },
      { layout: "grid3", items: [{ type: "placeholder", label: "Story 01" }, { type: "placeholder", label: "Story 02" }, { type: "placeholder", label: "Story 03" }] },
      { layout: "wide", items: [{ type: "placeholder", label: "Reel" }] },
    ],
  },
  {
    slug: "sample-packaging",
    title: { en: "Sahara Oils", ar: "صحارى أويلز" },
    subtitle: { en: "Identity & packaging", ar: "هوية وباكدجينج" },
    tags: ["identity", "3d"],
    year: "2025",
    client: { en: "Sample client", ar: "عميل تجريبي" },
    color: "#e8c27a",
    size: "normal",
    cover: { type: "placeholder", label: "Packaging" },
    summary: {
      en: "Desert-inspired identity and packaging, visualized in 3D before a single bottle was printed.",
      ar: "هوية وباكدجينج مستوحاة من الصحرا، اتعملت ثري دي قبل ما تتطبع أول إزازة.",
    },
    credits: [{ role: { en: "Identity & 3D", ar: "هوية وثري دي" }, name: "Mohamed Ibrahim" }],
    blocks: [
      { layout: "full", items: [{ type: "placeholder", label: "Bottle lineup" }] },
      { layout: "grid2", items: [{ type: "placeholder", label: "Label" }, { type: "placeholder", label: "Box" }] },
    ],
  },
];
