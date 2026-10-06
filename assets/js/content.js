/*
 * ─────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit this file to make the site yours.
 * ─────────────────────────────────────────────────────────────
 *  • Put your photos in /images and reference them below.
 *  • Every section/category falls back to a gradient until its
 *    photo exists, so the site never looks broken.
 */
window.SITE = {
  // Shown in capitals as the logo in the middle of the nav, and on the title card.
  name: "DanieSankey",
  tagline: "Photographer & Storyteller",

  contact: {
    email: "daniesankey@gmail.com",
    phone: "+255 659 936 142",
    // WhatsApp number in international format, digits only ("" to hide).
    whatsapp: "255659936142",
    // Leave location "" to hide it; mapUrl opens when someone taps it.
    location: "",
    mapUrl: "",
  },

  // Leave any link "" to hide it.
  social: {
    instagram: "https://www.instagram.com/daniesankey",
    linkedin: "https://www.linkedin.com/in/sankey-daniel-258a2b1b3/",
  },

  about: {
    image: "images/about.jpg",
    heading: "Every frame tells a tale.",
    paragraphs: [
      "Write a short introduction here: who you are, what you shoot, and what you care about when you pick up a camera.",
      "Add a second paragraph about your approach, the people and brands you've worked with, or where your work has been featured.",
    ],
  },

  /*
   * Each category is one full-screen section on the home page and
   * gets its own gallery page. `fallback` is the gradient shown
   * until the cover photo is added.
   */
  categories: [
    {
      slug: "lifestyle",
      title: "Lifestyle",
      cover: "images/hero.jpg",
      fallback: "radial-gradient(ellipse at 60% 35%, #8a5a3c 0%, #3b2418 45%, #120b08 100%)",
      images: ["images/lifestyle/01.jpg", "images/hero.jpg", "images/lifestyle/02.jpg", "images/lifestyle/03.jpg", "images/lifestyle/04.jpg", "images/lifestyle/05.jpg"],
    },
    {
      slug: "couples",
      title: "Couples",
      cover: "images/couples/cover.jpg",
      // Optional upright photo used on phones instead of the wide cover.
      coverMobile: "images/couples/01.jpg",
      fallback: "radial-gradient(ellipse at 55% 35%, #2f7d86 0%, #123a40 50%, #061214 100%)",
      images: ["images/couples/01.jpg", "images/couples/02.jpg", "images/couples/03.jpg", "images/couples/04.jpg", "images/couples/05.jpg"],
    },
    {
      slug: "commercial",
      title: "Commercial",
      cover: "images/commercial/cover.jpg",
      fallback: "radial-gradient(ellipse at 50% 30%, #5b6670 0%, #232a30 50%, #0a0c0e 100%)",
      images: ["images/commercial/01.jpg", "images/commercial/02.jpg", "images/commercial/03.jpg", "images/commercial/04.jpg", "images/commercial/05.jpg", "images/commercial/06.jpg", "images/commercial/07.jpg", "images/commercial/08.jpg", "images/commercial/09.jpg", "images/commercial/10.jpg", "images/commercial/11.jpg", "images/commercial/12.jpg"],
    },
    {
      slug: "portraits",
      title: "Portraits",
      cover: "images/portraits/cover.jpg",
      fallback: "radial-gradient(ellipse at 40% 30%, #6d6a64 0%, #2b2a28 50%, #0b0b0b 100%)",
      images: ["images/portraits/01.jpg", "images/portraits/02.jpg", "images/portraits/03.jpg", "images/portraits/04.jpg", "images/portraits/05.jpg", "images/portraits/06.jpg"],
    },
    {
      slug: "editorial",
      title: "Editorial",
      cover: "images/editorial/cover.jpg",
      fallback: "radial-gradient(ellipse at 65% 40%, #7a2e2a 0%, #3a1514 50%, #0e0606 100%)",
      images: ["images/editorial/01.jpg", "images/editorial/02.jpg", "images/editorial/03.jpg", "images/editorial/04.jpg", "images/editorial/05.jpg", "images/editorial/06.jpg"],
    },
    {
      slug: "fashion",
      title: "Fashion",
      cover: "images/fashion/cover.jpg",
      fallback: "radial-gradient(ellipse at 50% 30%, #3f5a5c 0%, #1a2627 50%, #070a0a 100%)",
      images: ["images/fashion/01.jpg", "images/fashion/02.jpg", "images/fashion/03.jpg", "images/fashion/04.jpg", "images/fashion/05.jpg", "images/fashion/06.jpg"],
    },
    {
      slug: "events",
      title: "Events",
      cover: "images/events/cover.jpg",
      fallback: "radial-gradient(ellipse at 35% 45%, #8c6d3a 0%, #3a2c15 50%, #0f0b05 100%)",
      images: ["images/events/01.jpg", "images/events/02.jpg", "images/events/03.jpg", "images/events/04.jpg", "images/events/05.jpg", "images/events/06.jpg"],
    },
  ],
};
