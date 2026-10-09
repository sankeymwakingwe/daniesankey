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
      cover: "images/lifestyle/01.jpg",
      fallback: "radial-gradient(ellipse at 60% 35%, #8a5a3c 0%, #3b2418 45%, #120b08 100%)",
      images: ["images/lifestyle/01.jpg", "images/lifestyle/02.jpg", "images/lifestyle/03.jpg", "images/lifestyle/04.jpg", "images/lifestyle/05.jpg", "images/lifestyle/06.jpg", "images/lifestyle/07.jpg", "images/lifestyle/08.jpg", "images/lifestyle/09.jpg", "images/lifestyle/10.jpg", "images/lifestyle/11.jpg", "images/lifestyle/12.jpg", "images/lifestyle/13.jpg"],
    },
    {
      slug: "couples",
      title: "Couples",
      cover: "images/couples/02.jpg",
      // Optional upright photo used on phones instead of the wide cover.
      coverMobile: "images/couples/01.jpg",
      fallback: "radial-gradient(ellipse at 55% 35%, #2f7d86 0%, #123a40 50%, #061214 100%)",
      images: ["images/couples/01.jpg", "images/couples/02.jpg", "images/couples/03.jpg", "images/couples/04.jpg", "images/couples/05.jpg"],
    },
    {
      slug: "commercial",
      title: "Commercial",
      cover: "images/commercial/01.jpg",
      fallback: "radial-gradient(ellipse at 50% 30%, #5b6670 0%, #232a30 50%, #0a0c0e 100%)",
      images: ["images/commercial/01.jpg", "images/commercial/02.jpg", "images/commercial/03.jpg", "images/commercial/04.jpg", "images/commercial/05.jpg", "images/commercial/06.jpg", "images/commercial/07.jpg", "images/commercial/08.jpg", "images/commercial/09.jpg", "images/commercial/10.jpg", "images/commercial/11.jpg", "images/commercial/12.jpg"],
    },
    {
      slug: "aerial",
      title: "Aerial",
      cover: "images/aerial/01.jpg",
      // The boat sits off-centre in the wide cover, so phones use the centred dhow shot.
      coverMobile: "images/aerial/02.jpg",
      fallback: "radial-gradient(ellipse at 50% 40%, #2a9db0 0%, #0f4a55 50%, #051a1e 100%)",
      images: ["images/aerial/02.jpg", "images/aerial/01.jpg", "images/aerial/03.jpg"],
    },
    {
      slug: "portraits",
      title: "Portraits",
      cover: "images/hero.jpg",
      fallback: "radial-gradient(ellipse at 40% 30%, #6d6a64 0%, #2b2a28 50%, #0b0b0b 100%)",
      images: ["images/portraits/04.jpg", "images/portraits/01.jpg", "images/portraits/02.jpg", "images/portraits/03.jpg"],
    },
    {
      slug: "weddings",
      title: "Weddings",
      cover: "images/weddings/01.jpg",
      fallback: "radial-gradient(ellipse at 50% 35%, #8f7d6a 0%, #3a3128 50%, #0f0c0a 100%)",
      images: ["images/weddings/01.jpg", "images/weddings/02.jpg", "images/weddings/03.jpg", "images/weddings/04.jpg", "images/weddings/05.jpg", "images/weddings/06.jpg"],
    },
    {
      slug: "events",
      title: "Events",
      cover: "images/events/01.jpg",
      fallback: "radial-gradient(ellipse at 35% 45%, #8c6d3a 0%, #3a2c15 50%, #0f0b05 100%)",
      images: ["images/events/01.jpg", "images/events/02.jpg", "images/events/03.jpg", "images/events/04.jpg", "images/events/05.jpg", "images/events/06.jpg"],
    },
  ],
};
