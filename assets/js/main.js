(() => {
  "use strict";

  const S = window.SITE, P = window.PROJECTS || [], F = window.FILTERS || [];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;

  /* ---------------- i18n ---------------- */
  const UI = {
    en: { work: "Work", about: "About", contact: "Contact", available: "Available for freelance — 2026", scroll: "Scroll", selectedWork: "Selected Work", services: "Services", letsTalk: "Have a project in mind?", backTop: "Back to top ↑", allWork: "All work", view: "View", play: "Play", client: "Client", year: "Year", discipline: "Discipline", credits: "Credits", next: "Next project", notFound: "Project not found.", open: "Open" },
    ar: { work: "الأعمال", about: "عنّي", contact: "تواصل", available: "متاح لمشاريع فريلانس — 2026", scroll: "انزل", selectedWork: "أعمال مختارة", services: "الخدمات", letsTalk: "عندك مشروع في دماغك؟", backTop: "لفوق ↑", allWork: "كل الأعمال", view: "شوف", play: "شغّل", client: "العميل", year: "السنة", discipline: "المجال", credits: "الفريق", next: "المشروع اللي بعده", notFound: "المشروع مش موجود.", open: "افتح" },
  };
  let lang = "en";
  try { lang = localStorage.getItem("lang") || (navigator.language || "").startsWith("ar") && "ar" || "en"; } catch (e) {}
  const t = (k) => UI[lang][k] || k;
  const L = (o) => (o == null ? "" : typeof o === "string" ? o : o[lang] ?? o.en ?? "");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------------- media ---------------- */
  function media(m, opts = {}) {
    if (!m) return "";
    const color = opts.color || "#c6ff3d";
    switch (m.type) {
      case "image":
        return `<img src="${esc(m.src)}" alt="${esc(L(m.alt) || "")}" loading="lazy" decoding="async" data-zoom>`;
      case "video":
        return `<video src="${esc(m.src)}" ${m.poster ? `poster="${esc(m.poster)}"` : ""} muted loop playsinline preload="metadata" ${opts.hoverPlay ? "data-hover-play" : "autoplay"}></video>`;
      case "youtube":
        return `<iframe src="https://www.youtube-nocookie.com/embed/${esc(m.id)}?rel=0&modestbranding=1${opts.bg ? `&autoplay=1&mute=1&loop=1&controls=0&playlist=${esc(m.id)}` : ""}" title="Video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
      case "vimeo":
        return `<iframe src="https://player.vimeo.com/video/${esc(m.id)}?${opts.bg ? "background=1" : "title=0&byline=0&portrait=0"}" title="Video" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
      default:
        return placeholder(m.label, color);
    }
  }
  function placeholder(label, color) {
    return `<div class="ph" style="--c:${esc(color)}"><div class="ph-orb"></div><div class="ph-orb b"></div><div class="ph-grid"></div><span class="ph-label">${esc(L(label) || "")}</span></div>`;
  }

  /* ---------------- shared ---------------- */
  function applyStatic() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    $$("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
    $$("[data-site]").forEach((el) => (el.textContent = L(S[el.dataset.site])));
    $$(".lang-toggle").forEach((b) => (b.innerHTML = `<span class="${lang === "en" ? "on" : ""}">EN</span><span class="${lang === "ar" ? "on" : ""}">ع</span>`));
    const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  }

  function setLang(next) {
    lang = next;
    try { localStorage.setItem("lang", lang); } catch (e) {}
    render();
  }

  /* ---------------- home ---------------- */
  let activeFilter = "all";
  let rotTimer;

  function renderHome() {
    document.title = `${L(S.name)} — ${lang === "ar" ? "بورتفوليو" : "Portfolio"}`;

    const reel = $("#showreel");
    reel.innerHTML = media(S.showreel, { bg: true, color: "#c6ff3d" }) + `<div class="hero-shade"></div>`;

    // rotator
    clearInterval(rotTimer);
    const words = L(S.disciplines) || [];
    const rw = $(".rotator-word");
    let i = 0;
    rw.textContent = words[0] || "";
    if (!reduceMotion && words.length > 1) {
      rotTimer = setInterval(() => {
        rw.classList.add("out");
        setTimeout(() => { i = (i + 1) % words.length; rw.textContent = words[i]; rw.classList.remove("out"); }, 450);
      }, 2400);
    }

    // marquee
    const items = (L(S.disciplines) || []).map((w) => `<span>${esc(w)}</span><i>✦</i>`).join("");
    $("#marquee").innerHTML = items + items + items + items;

    // filters
    $("#filters").innerHTML = F.map((f) => `<button type="button" role="tab" class="chip ${f.key === activeFilter ? "on" : ""}" data-filter="${esc(f.key)}">${esc(L(f))}</button>`).join("");
    $$("#filters .chip").forEach((b) => b.addEventListener("click", () => { activeFilter = b.dataset.filter; renderGrid(); $$("#filters .chip").forEach((c) => c.classList.toggle("on", c === b)); }));

    renderGrid();

    $("#stats").innerHTML = (S.stats || []).map((s) => `<div class="stat reveal"><b data-count="${esc(s.value)}">${esc(s.value)}</b><span>${esc(L(s))}</span></div>`).join("");
    $("#services").innerHTML = (S.services || []).map((s, n) => `<li class="reveal"><span class="num">${String(n + 1).padStart(2, "0")}</span><span>${esc(L(s))}</span><i>↗</i></li>`).join("");

    const mail = $("#contact-mail");
    mail.href = `mailto:${S.email}`;
    mail.innerHTML = `<span class="roll" data-text="${esc(S.email)}">${esc(S.email)}</span><i>↗</i>`;
    $("#socials").innerHTML = (S.socials || []).map((s) => `<li><a href="${esc(s.url)}" target="_blank" rel="noopener" data-cursor="${esc(t("open"))}">${esc(s.label)}</a></li>`).join("");
  }

  function renderGrid() {
    const list = P.filter((p) => activeFilter === "all" || (p.tags || []).includes(activeFilter));
    $("#work-count").textContent = `(${String(list.length).padStart(2, "0")})`;
    const grid = $("#work-grid");
    grid.innerHTML = list.map((p, n) => `
      <a class="card size-${esc(p.size || "normal")} reveal" href="project.html?p=${encodeURIComponent(p.slug)}" data-cursor="${esc(t("view"))}" style="--c:${esc(p.color || "#c6ff3d")}; --d:${(n % 3) * 80}ms">
        <div class="card-media">${media(p.cover, { hoverPlay: true, color: p.color })}</div>
        <div class="card-meta">
          <span class="card-index">${String(n + 1).padStart(2, "0")}</span>
          <div class="card-text"><h3>${esc(L(p.title))}</h3><p>${esc(L(p.subtitle))}</p></div>
          <span class="card-year">${esc(p.year || "")}</span>
        </div>
      </a>`).join("");
    bindHoverVideos(grid);
    observeReveals();
    bindCursorTargets();
  }

  /* ---------------- project ---------------- */
  function renderProject() {
    const slug = new URLSearchParams(location.search).get("p");
    const idx = Math.max(0, P.findIndex((p) => p.slug === slug));
    const p = P.find((x) => x.slug === slug) || (slug ? null : P[0]);
    const root = $("#project");
    if (!p) { root.innerHTML = `<section class="p-hero"><h1 class="p-title">${esc(t("notFound"))}</h1><a class="chip" href="index.html">${esc(t("allWork"))}</a></section>`; return; }
    document.title = `${L(p.title)} — ${L(S.name)}`;
    document.documentElement.style.setProperty("--accent-p", p.color || "#c6ff3d");
    const next = P[(idx + 1) % P.length];
    const disc = (p.tags || []).map((k) => L(F.find((f) => f.key === k)) || k).join(", ");

    root.innerHTML = `
      <section class="p-hero" style="--c:${esc(p.color || "#c6ff3d")}">
        <a class="p-back" href="index.html#work">← ${esc(t("allWork"))}</a>
        <h1 class="p-title split">${esc(L(p.title))}</h1>
        <p class="p-sub reveal">${esc(L(p.subtitle))}</p>
      </section>
      <div class="p-cover reveal-scale" style="--c:${esc(p.color || "#c6ff3d")}">${media(p.cover, { color: p.color })}</div>
      <section class="p-info">
        <dl class="p-meta reveal">
          <div><dt>${esc(t("client"))}</dt><dd>${esc(L(p.client))}</dd></div>
          <div><dt>${esc(t("year"))}</dt><dd>${esc(p.year || "")}</dd></div>
          <div><dt>${esc(t("discipline"))}</dt><dd>${esc(disc)}</dd></div>
          ${(p.credits || []).length ? `<div><dt>${esc(t("credits"))}</dt><dd>${p.credits.map((c) => `<span class="credit"><em>${esc(L(c.role))}</em> ${esc(c.name)}</span>`).join("")}</dd></div>` : ""}
        </dl>
        <p class="p-summary reveal">${esc(L(p.summary))}</p>
      </section>
      <div class="p-blocks">${(p.blocks || []).map((b) => block(b, p)).join("")}</div>
      ${next && next !== p ? `
      <a class="p-next" href="project.html?p=${encodeURIComponent(next.slug)}" data-cursor="${esc(t("view"))}" style="--c:${esc(next.color || "#c6ff3d")}">
        <span class="about-label">${esc(t("next"))}</span>
        <span class="p-next-title">${esc(L(next.title))}</span>
        <div class="p-next-media">${media(next.cover, { hoverPlay: true, color: next.color })}</div>
      </a>` : ""}`;

    splitTitles();
    bindHoverVideos(root);
  }

  function block(b, p) {
    const c = p.color;
    const items = (b.items || []).map((m) => `<figure class="b-item ${["youtube", "vimeo"].includes(m.type) ? "is-embed" : ""}">${media(m, { color: c })}${m.caption ? `<figcaption>${esc(L(m.caption))}</figcaption>` : ""}</figure>`).join("");
    switch (b.layout) {
      case "text":
        return `<section class="b b-text reveal">${b.title ? `<h2>${esc(L(b.title))}</h2>` : "<span></span>"}<p>${esc(L(b.body))}</p></section>`;
      case "quote":
        return `<blockquote class="b b-quote reveal" style="--c:${esc(c)}">“${esc(L(b.body))}”</blockquote>`;
      case "stats":
        return `<section class="b b-stats">${(b.items || []).map((s) => `<div class="stat reveal"><b data-count="${esc(s.value)}">${esc(s.value)}</b><span>${esc(L(s))}</span></div>`).join("")}</section>`;
      default:
        return `<section class="b b-${esc(b.layout || "full")} reveal">${items}</section>`;
    }
  }

  function splitTitles() {
    $$(".split").forEach((el) => {
      const text = el.textContent;
      el.innerHTML = text.split(" ").map((w, i) => `<span class="w"><span style="--i:${i}">${esc(w)}</span></span>`).join(" ");
      requestAnimationFrame(() => el.classList.add("in"));
    });
  }

  /* ---------------- interactions ---------------- */
  let io;
  function observeReveals() {
    if (!("IntersectionObserver" in window) || reduceMotion) { $$(".reveal, .reveal-scale").forEach((e) => e.classList.add("in")); return; }
    io = io || new IntersectionObserver((ents) => ents.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); countUp(e.target); io.unobserve(e.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal:not(.in), .reveal-scale:not(.in)").forEach((e) => io.observe(e));
  }

  function countUp(el) {
    const b = el.matches("[data-count]") ? el : el.querySelector("[data-count]");
    if (!b || b.dataset.done) return;
    const m = b.dataset.count.match(/^(\d+)(.*)$/);
    if (!m) return;
    b.dataset.done = 1;
    const end = +m[1], suf = m[2], t0 = performance.now(), dur = 1400;
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      b.textContent = Math.round(end * e) + suf;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function bindHoverVideos(root) {
    $$("video[data-hover-play]", root).forEach((v) => {
      const card = v.closest("a, .card") || v;
      card.addEventListener("mouseenter", () => v.play().catch(() => {}));
      card.addEventListener("mouseleave", () => { v.pause(); });
      if (!finePointer) { v.setAttribute("autoplay", ""); v.play().catch(() => {}); }
    });
  }

  // custom cursor
  const cursor = $(".cursor"), cursorLabel = $(".cursor-label");
  let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
  if (finePointer && !reduceMotion && cursor) {
    document.body.classList.add("has-cursor");
    addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; cursor.classList.add("on"); });
    document.addEventListener("mouseleave", () => cursor.classList.remove("on"));
    const loop = () => { cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18; cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`; requestAnimationFrame(loop); };
    loop();
  }
  function bindCursorTargets() {
    if (!cursor) return;
    $$("[data-cursor], a, button, [data-zoom]").forEach((el) => {
      if (el.dataset.cb) return; el.dataset.cb = 1;
      el.addEventListener("mouseenter", () => {
        const label = el.dataset.cursor || (el.matches("[data-zoom]") ? "+" : "");
        cursorLabel.textContent = label;
        cursor.classList.add(label ? "big" : "hover");
      });
      el.addEventListener("mouseleave", () => cursor.classList.remove("big", "hover"));
    });
  }

  // lightbox (images)
  const lb = $("#lightbox");
  document.addEventListener("click", (e) => {
    const img = e.target.closest("[data-zoom]");
    if (img && lb && !img.closest(".card")) {
      $(".lightbox-inner", lb).innerHTML = `<img src="${esc(img.currentSrc || img.src)}" alt="${esc(img.alt)}">`;
      lb.hidden = false; requestAnimationFrame(() => lb.classList.add("open"));
    }
  });
  const closeLb = () => { if (!lb || lb.hidden) return; lb.classList.remove("open"); setTimeout(() => (lb.hidden = true), 300); };
  lb && lb.addEventListener("click", (e) => { if (e.target === lb || e.target.closest(".lightbox-close")) closeLb(); });
  addEventListener("keydown", (e) => e.key === "Escape" && closeLb());

  // nav hide on scroll + progress bar + hero parallax
  const nav = $(".nav"), bar = $(".progress span");
  let lastY = 0;
  addEventListener("scroll", () => {
    const y = scrollY;
    nav.classList.toggle("hide", y > lastY && y > 160);
    nav.classList.toggle("solid", y > 40);
    lastY = y;
    if (bar) bar.style.transform = `scaleX(${y / Math.max(1, document.documentElement.scrollHeight - innerHeight)})`;
    const hm = $(".hero-media");
    if (hm && !reduceMotion && y < innerHeight * 1.2) hm.style.setProperty("--py", `${y * 0.25}px`);
  }, { passive: true });

  $$(".lang-toggle").forEach((b) => b.addEventListener("click", () => setLang(lang === "en" ? "ar" : "en")));
  $$(".to-top").forEach((b) => b.addEventListener("click", () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })));

  /* ---------------- boot ---------------- */
  function render() {
    applyStatic();
    if (document.body.dataset.page === "home") renderHome(); else renderProject();
    observeReveals();
    bindCursorTargets();
  }

  const loader = $(".loader");
  let seen = false;
  try { seen = sessionStorage.getItem("seen"); sessionStorage.setItem("seen", 1); } catch (e) {}
  if (loader && !seen && !reduceMotion) {
    $(".loader-name", loader).textContent = L(S.name);
    loader.classList.add("show");
    setTimeout(() => loader.classList.add("done"), 1300);
    setTimeout(() => loader.remove(), 2200);
  } else if (loader) loader.remove();

  render();
})();
