/* Shared chrome (header, floating nav) + per-page rendering. */
(function () {
  const S = window.SITE;
  const page = document.body.dataset.page;

  const icon = {
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6V16"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h15m-5-5 5 5-5 5"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  };

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const spaced = (word) => [...word].map((c) => `<span>${esc(c)}</span>`).join("");
  // Photo layered over a gradient: if the photo is missing, the gradient shows.
  const bg = (img, fallback) => `background-image: url('${img}'), ${fallback || "linear-gradient(#1a1a1a,#0a0a0a)"}`;
  // Category scenes: the CSS swaps in `coverMobile` (an upright photo) on phones when one is set.
  const sceneBg = (cat) => {
    // Absolute URLs: a url() inside a CSS variable would otherwise resolve against the stylesheet's folder.
    const layer = (img) => `url('${new URL(img, location.href).href}'), ${cat.fallback || "linear-gradient(#1a1a1a,#0a0a0a)"}`;
    return `--bg: ${layer(cat.cover)}; --bg-mobile: ${layer(cat.coverMobile || cat.cover)}`;
  };
  const fullName = S.name;
  // Sections marked hidden are turned off everywhere (home, Work page, galleries, "Next" links).
  S.categories = S.categories.filter((c) => !c.hidden);

  /* ── Header: centred nav ───────────────────────────────── */
  const links = [
    ["index.html", "Home", "home"],
    ["about.html", "About", "about"],
    ["work.html", "Work", "work"],
    ["contact.html", "Contact", "contact"],
  ];
  const navLink = ([href, label, key]) => {
    const current = page === key || (key === "work" && page === "gallery");
    return `<a class="nav-link" href="${href}"${current ? ' aria-current="page"' : ""}>${label}</a>`;
  };

  // Two links, the name, two links. Phones get the name and a menu button.
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<header class="site-header">
      <nav class="main-nav" aria-label="Main">
        ${links.slice(0, 2).map(navLink).join("")}
        <a class="logo" href="index.html">${esc(fullName)}</a>
        ${links.slice(2).map(navLink).join("")}
        <button type="button" class="menu-btn" aria-label="Menu" aria-expanded="false"><span></span><span></span></button>
      </nav>
    </header>
    <div class="mobile-menu" hidden>${links.map(navLink).join("")}</div>`
  );

  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  menuBtn.addEventListener("click", () => {
    const open = menuBtn.getAttribute("aria-expanded") !== "true";
    menuBtn.setAttribute("aria-expanded", open);
    mobileMenu.hidden = !open;
    document.body.classList.toggle("no-scroll", open);
  });

  const c = S.contact;

  /* ── Pages ──────────────────────────────────────────────── */
  const main = document.querySelector("main");

  if (page === "home") {
    main.innerHTML =
      S.categories
        .map(
          (cat, i) => `<section class="slide" id="${cat.slug}">
            <div class="slide-media scene-media" style="${sceneBg(cat)}"></div>
            <div class="slide-text">
              <h2>${esc(cat.title)}</h2>
              <a class="view-link" href="gallery.html?c=${cat.slug}">View Work ${icon.arrow}</a>
            </div>
          </section>`
        )
        .join("") +
      `<nav class="dots" aria-label="Sections">${S.categories
        .map((cat) => `<a href="#${cat.slug}" aria-label="${esc(cat.title)}"></a>`)
        .join("")}</nav>`;

    main.insertAdjacentHTML(
      "beforeend",
      `<div class="hud" aria-hidden="true">
        <span class="hud-tc"><i></i><b>00:00:00:00</b></span>
      </div>`
    );
    const slides = [...main.querySelectorAll(".slide")];
    const dots = [...main.querySelectorAll(".dots a")];
    main.addEventListener("scene", (e) => {
      const i = slides.indexOf(e.detail);
      dots.forEach((d, j) => d.classList.toggle("is-active", j === i));
    });

    // Running 24fps timecode, like a camera viewfinder.
    const tc = main.querySelector(".hud-tc b");
    const t0 = performance.now();
    const pad = (n) => String(n).padStart(2, "0");
    setInterval(() => {
      const f = Math.floor(((performance.now() - t0) / 1000) * 24);
      tc.textContent = `${pad(Math.floor(f / 86400))}:${pad(Math.floor(f / 1440) % 60)}:${pad(Math.floor(f / 24) % 60)}:${pad(f % 24)}`;
    }, 125); // 8 updates a second is plenty for a small readout and keeps scrolling smooth
  }

  if (page === "work") {
    main.innerHTML = `<section class="work-grid">${S.categories
      .map(
        (cat, i) => `<a class="work-tile reveal" href="gallery.html?c=${cat.slug}">
          <div class="work-tile-media reveal-media" style="${bg(cat.cover, cat.fallback)}"></div>
          <div class="work-tile-text">
            <h2>${esc(cat.title)}</h2>
            <span class="view-link">View Work ${icon.arrow}</span>
          </div>
        </a>`
      )
      .join("")}</section>`;
  }

  if (page === "gallery") {
    const slug = new URLSearchParams(location.search).get("c");
    const cat = S.categories.find((x) => x.slug === slug) || S.categories[0];
    document.title = `${cat.title} — ${fullName}`;
    const idx = S.categories.indexOf(cat);
    const next = S.categories[(idx + 1) % S.categories.length];
    // The grid shows exactly the listed photos; a cover left out of the list stays on the home page only.
    const photos = cat.images;

    main.innerHTML = `
      <header class="gallery-head">
        <a class="back-link" href="work.html">← All Work</a>
        <h1>${esc(cat.title)}</h1>
      </header>
      <section class="gallery">${photos
        .map((src, i) => `<button type="button" class="gallery-item reveal" data-i="${i}" aria-label="Open image ${i + 1}"><span class="reveal-media" style="${bg(src, cat.fallback)}"></span></button>`)
        .join("")}</section>
      <a class="next-cat slide" href="gallery.html?c=${next.slug}">
        <div class="slide-media scene-media" style="${sceneBg(next)}"></div>
        <div class="slide-text">
          <span class="slide-index">Next</span>
          <h2>${esc(next.title)}</h2>
          <span class="view-link">View Work ${icon.arrow}</span>
        </div>
      </a>`;

    // Lightbox
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.hidden = true;
    lb.innerHTML = `<button type="button" class="lb-close" aria-label="Close">${icon.close}</button>
      <button type="button" class="lb-prev" aria-label="Previous">‹</button>
      <div class="lb-img"></div>
      <button type="button" class="lb-next" aria-label="Next">›</button>
      <div class="lb-count"></div>`;
    document.body.appendChild(lb);
    let cur = 0;
    const show = (i) => {
      cur = (i + photos.length) % photos.length;
      lb.querySelector(".lb-img").style.cssText = bg(photos[cur], cat.fallback);
      lb.querySelector(".lb-count").textContent = `${cur + 1} / ${photos.length}`;
      lb.hidden = false;
      document.body.classList.add("no-scroll");
    };
    const hide = () => {
      lb.hidden = true;
      document.body.classList.remove("no-scroll");
    };
    main.querySelectorAll(".gallery-item").forEach((b) => b.addEventListener("click", () => show(+b.dataset.i)));
    lb.querySelector(".lb-close").addEventListener("click", hide);
    lb.querySelector(".lb-prev").addEventListener("click", () => show(cur - 1));
    lb.querySelector(".lb-next").addEventListener("click", () => show(cur + 1));
    lb.addEventListener("click", (e) => e.target === lb && hide());
    document.addEventListener("keydown", (e) => {
      if (lb.hidden) return;
      if (e.key === "Escape") hide();
      if (e.key === "ArrowLeft") show(cur - 1);
      if (e.key === "ArrowRight") show(cur + 1);
    });
  }

  if (page === "about") {
    const a = S.about;
    main.innerHTML = `<section class="slide is-active panel">
      <div class="slide-media" style="${bg(a.image, S.categories[0].fallback)}"></div>
      <div class="panel-text">
        <span class="slide-index">About</span>
        <h1>${esc(a.heading)}</h1>
        ${a.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}
        ${a.services && a.services.length ? `<p class="services-title">What I shoot</p><ul class="services">${a.services.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
        ${c.location ? `<p class="based">Based in ${esc(c.location)}</p>` : ""}
        <a class="view-link" href="contact.html">Work with me ${icon.arrow}</a>
      </div>
    </section>`;
  }

  if (page === "contact") {
    const cover = S.categories[1] || S.categories[0];
    main.innerHTML = `<section class="slide is-active panel">
      <div class="slide-media" style="${bg(cover.cover, cover.fallback)}"></div>
      <div class="panel-text">
        <span class="slide-index">Contact</span>
        <h1>Let's tell your story.</h1>
        <ul class="contact-list">
          ${c.whatsapp ? `<li><a href="https://wa.me/${c.whatsapp}" target="_blank" rel="noopener">${icon.whatsapp}WhatsApp ${esc(c.phone)}</a></li>` : ""}
          ${c.email ? `<li><a href="mailto:${c.email}">${icon.mail}${esc(c.email)}</a></li>` : ""}
          ${c.phone ? `<li><a href="tel:${c.phone.replace(/[^\d+]/g, "")}">${icon.phone}Call ${esc(c.phone)}</a></li>` : ""}
          ${c.location ? `<li><a href="${c.mapUrl}" target="_blank" rel="noopener">${icon.pin}${esc(c.location)}</a></li>` : ""}
          ${S.social.instagram ? `<li><a href="${S.social.instagram}" target="_blank" rel="noopener">${icon.instagram}Instagram</a></li>` : ""}
          ${S.social.linkedin ? `<li><a href="${S.social.linkedin}" target="_blank" rel="noopener">${icon.linkedin}LinkedIn</a></li>` : ""}
        </ul>
        <form class="contact-form">
          <input name="name" placeholder="Name" required>
          <input name="email" type="email" placeholder="Email" required>
          <textarea name="message" rows="4" placeholder="Tell me about your project" required></textarea>
          <button type="submit" class="view-link">Send ${icon.arrow}</button>
        </form>
      </div>
    </section>`;
    // No backend: open the visitor's email app with the message pre-filled.
    main.querySelector(".contact-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const f = new FormData(e.target);
      const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
      location.href = `mailto:${c.email}?subject=${encodeURIComponent("Enquiry from " + f.get("name"))}&body=${encodeURIComponent(body)}`;
    });
  }

  /* ── Cinematic layer ────────────────────────────────────── */
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="grain" aria-hidden="true"></div>
    <div class="vignette" aria-hidden="true"></div>
    <div class="letterbox" aria-hidden="true"><span></span><span></span></div>`
  );

  // Split headings into letters so they can resolve one by one, like a title card.
  document.querySelectorAll(".slide h2, .work-tile h2, .panel h1").forEach((el) => {
    const text = el.textContent;
    let n = 0;
    el.setAttribute("aria-label", text);
    el.innerHTML = text
      .split(" ")
      .map((word) => `<span class="w" aria-hidden="true">${[...word].map((ch) => `<span class="ch" style="--i:${n++}">${esc(ch)}</span>`).join("")}</span>`)
      .join(" ");
  });

  // Scenes reveal once, as they start to enter the screen, and stay revealed,
  // so scrolling flows smoothly instead of each photo popping into focus.
  const revealScene = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-active");
        revealScene.unobserve(e.target);
      });
    },
    { threshold: 0.25 }
  );
  // Separately track which scene fills the screen, for the side dots.
  const currentScene = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) main.dispatchEvent(new CustomEvent("scene", { detail: e.target }));
      });
    },
    { threshold: 0.5 }
  );
  // About/Contact panels can be taller than the screen, so they stay lit.
  document.querySelectorAll(".slide:not(.panel)").forEach((el) => {
    revealScene.observe(el);
    currentScene.observe(el);
  });

  // Tiles and gallery frames wipe in as they enter the screen.
  const revealIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in-view");
        revealIO.unobserve(e.target);
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealIO.observe(el));

  // Opening: letterbox bars part to reveal the page.
  const root = document.documentElement;
  const open = () => requestAnimationFrame(() => root.classList.add("is-open"));

  // Title card, shown only on someone's first-ever visit to the home page.
  let seenIntro = true;
  try {
    seenIntro = localStorage.getItem("intro") === "1" || sessionStorage.getItem("intro") === "1";
    localStorage.setItem("intro", "1");
  } catch (_) {}

  if (page === "home" && !seenIntro && !reduceMotion) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div class="intro" role="presentation">
        <span class="intro-pre">A tale by</span>
        <span class="intro-name">${spaced(fullName)}</span>
        <span class="intro-tag">${esc(S.tagline)}</span>
      </div>`
    );
    const intro = document.querySelector(".intro");
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      intro.classList.add("is-done");
      open();
      setTimeout(() => intro.remove(), 1200);
    };
    intro.addEventListener("click", finish);
    setTimeout(finish, 2600);
  } else {
    open();
  }

  // Closing: bars shut before moving to another page, then part again on arrival.
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || reduceMotion || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target === "_blank" || a.origin !== location.origin || a.getAttribute("href").startsWith("#")) return;
    if (a.pathname === location.pathname && a.search === location.search) return;
    e.preventDefault();
    root.classList.add("is-leaving");
    setTimeout(() => (location.href = a.href), 650);
  });
  // Coming back via the browser's back button restores the page mid-transition.
  addEventListener("pageshow", (e) => e.persisted && root.classList.remove("is-leaving"));
})();
