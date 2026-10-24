/* ============================================================
   HACKINSECOND: script.js
   PART 1: Edit business information, products, courses and phrases.
   Product type: "free" or "paid"
   Price: USD; use 0 for free.
   Images: assets/images/filename.webp
   ============================================================ */

const SITE = {
  whatsapp: "923104515679",
  whatsappShow: "WhatsApp",
  telegram: "Hackinsecon",
  telegramShow: "Hack In Second",
  youtube: "https://www.youtube.com/@hackin2",
  formspree: "https://formspree.io/f/mvkzqyjr",
  url: "https://hackinsecond.github.io/"
};

const PHRASES = [
  "Hacking Tools",
  "Free YouTube Tutorials",
  "Hands-on Security Courses",
  "Legal. Authorized. Practical."
];

// Paid tools
const TOOLS = [
  {
    id: "888 Rat",
    type: "paid",
    name: "888 RAT ( Remote Access Trojans )",
    price: 3,
    desc: "A RAT is a tool that we use to Hack Divices like mobile, computer etc.",
    features: [
      "This Rat can Hack",
      "Window / Linux",
      "Android / IOS"
    ],
    img: "888.webp"
  },
  {
    id: "best-black-hat",
    type: "paid",
    name: "Black Hat Hacking",
    price: 5,
      desc: `Video Series Intro, Labs, Carding, Malwares, Trojans, Hacking From Internet VPS, Antivirus Bypassing, Ransomwares, Malware, Silent Exploits, Phishing, Email, Identity Hiding, Calling Scams, Tips, Social Engineering, Cpanel SMTP, Next Steps in Black Hat`,
   features: [
    "30 Video with tools",
    "Black Hat Hacking Series",
    "Malware and Forensics",
    "Phishing and Social Engineering",
    "VPS and SMTP Topics"
  ],
    img: "ethical-hacking.webp",
    cta: "Go To PRO"
  },
  {
    id: "report-pro",
    type: "paid",
    name: "Pentest Report Pro",
    price: 15,
    desc: "Professional report and scope-agreement templates for authorized security assessments.",
    features: [
      "Word + PDF templates",
      "Scope & permission form",
      "Severity rating guide"
    ],
    img: "2.webp"
  }
];

// Courses
const COURSES = [
  {
    id: "ethical-101",
    type: "free",
    name: "Ethical Hacking Basics",
    price: 0,
    desc: "Free beginner series on YouTube covering core concepts, legal boundaries and terminology.",
    features: [
      "Video lessons",
      "Beginner friendly",
      "Legal & ethical focus"
    ],
    img: "logo.webp",
    link: SITE.youtube,
    cta: "Watch free"
  },
];

// Free resources
const FREE = [
  {
    id: "roadmap",
    type: "free",
    name: "Beginner Cybersecurity Roadmap",
    price: 0,
    desc: "What to learn first, free platforms to practice on, and how to stay legal while learning.",
    features: [
      "Free to read",
      "Updated on YouTube"
    ],
    img: "",
    link: SITE.youtube,
    cta: "Get it on YouTube"
  }
];

/* ============================================================
   PART 2: Main website code
   ============================================================ */

(function () {
  "use strict";

  const $ = (selector, root = document) =>
    root.querySelector(selector);

  const all = (selector, root = document) =>
    Array.from(root.querySelectorAll(selector));

  const el = (tag, className = "", text = "") => {
    const node = document.createElement(tag);

    if (className) node.className = className;
    if (text !== "") node.textContent = text;

    return node;
  };

  const wa = (message) =>
    "https://wa.me/" +
    SITE.whatsapp +
    "?text=" +
    encodeURIComponent(message);

  const still =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ext = (anchor) => {
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    return anchor;
  };

  // Safely create a product, course or resource card.
  function card(item, index = 0) {
    const c = el("article", "card rv");

    c.style.setProperty("--d", (index % 3) * 0.12 + "s");

    c.dataset.search = (
      item.name +
      " " +
      item.desc +
      " " +
      item.features.join(" ")
    ).toLowerCase();

    if (item.img) {
      const img = el("img");

      img.src = "assets/images/" + item.img;
      img.alt = item.name;
      img.loading = "lazy";
      img.decoding = "async";
      img.width = 640;
      img.height = 360;

      img.addEventListener("error", () => {
        const fallback = el(
          "div",
          "thumb " + item.type,
          item.name
            .split(/\s+/)
            .slice(0, 2)
            .map(word => word[0] || "")
            .join("")
            .toUpperCase()
        );

        fallback.setAttribute("aria-hidden", "true");
        img.replaceWith(fallback);
      }, { once: true });

      c.append(img);
    } else {
      const thumb = el(
        "div",
        "thumb " + item.type,
        item.name
          .split(/\s+/)
          .slice(0, 2)
          .map(word => word[0] || "")
          .join("")
          .toUpperCase()
      );

      thumb.setAttribute("aria-hidden", "true");
      c.append(thumb);
    }

    c.append(
      el(
        "span",
        "tag " + item.type,
        item.type === "free" ? "FREE" : "PAID"
      ),
      el("h3", "", item.name),
      el("p", "", item.desc)
    );

    const ul = el("ul");

    item.features.forEach(feature => {
      ul.append(el("li", "", feature));
    });

    c.append(ul);

    const row = el("div", "row");

    row.append(
      el(
        "span",
        "price",
        item.price > 0 ? "$" + item.price : "Free"
      )
    );

    const anchor = el("a", "btn");

    if (item.link || item.type === "free") {
      anchor.href = item.link || SITE.youtube;
      anchor.textContent = item.cta || "Watch free";
    } else {
      anchor.href = wa(
        "Hi Hackinsecond, I want to buy: " +
        item.name +
        " ($" +
        item.price +
        "). Please share payment details."
      );

      anchor.textContent = "Buy on WhatsApp";
    }

    ext(anchor);

    anchor.setAttribute(
      "aria-label",
      anchor.textContent + ": " + item.name
    );

    row.append(anchor);
    c.append(row);

    return c;
  }

  // Render listings safely.
  [
    ["free-grid", FREE],
    ["tools-grid", TOOLS],
    ["courses-grid", COURSES]
  ].forEach(([id, items]) => {
    const grid = $("#" + id);

    if (!grid) return;

    grid.textContent = "";

    items.forEach((item, index) => {
      grid.append(card(item, index));
    });
  });

  // Add product and course structured data.
  (function addStructuredData() {
    const offer = item => ({
      "@type": "Offer",
      price: String(item.price),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: SITE.url
    });

    const product = item => ({
      "@type": "Product",
      name: item.name,
      description: item.desc,
      brand: {
        "@type": "Brand",
        name: "Hackinsecond"
      },
      offers: offer(item)
    });

    const course = item => ({
      "@type": "Course",
      name: item.name,
      description: item.desc,
      provider: {
        "@type": "Organization",
        name: "Hackinsecond",
        sameAs: SITE.youtube
      },
      offers: offer(item)
    });

    const items = TOOLS.map(product)
      .concat(COURSES.map(course))
      .map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item
      }));

    const script = el("script");

    script.type = "application/ld+json";

    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Hackinsecond tools and courses",
      url: SITE.url,
      itemListElement: items
    });

    document.head.append(script);
  })();

  // Search index.
  const status = $("#search-status");
  const results = $("#results");
  const box = $("#search");

  const INDEX = FREE.map(item => [item, "free resource"])
    .concat(TOOLS.map(item => [item, "paid tool"]))
    .concat(COURSES.map(item => [item, "course"]))
    .map(([item, category]) => ({
      item,
      hay: (
        item.name +
        " " +
        item.desc +
        " " +
        item.features.join(" ") +
        " " +
        item.type +
        " " +
        category
      ).toLowerCase()
    }));

  const FAQS = all("#about details").map(detail => {
    const summary = $("summary", detail);
    const paragraph = $("p", detail);

    return {
      question: summary ? summary.textContent : "",
      answer: paragraph ? paragraph.textContent : "",
      hay: detail.textContent.toLowerCase()
    };
  });

  const BUYHAY =
    "buy purchase payment pay order whatsapp telegram delivery price how to buy";

  function info(title, text, href, label) {
    const c = el("article", "card");

    c.append(
      el("span", "tag free", "ANSWER"),
      el("h3", "", title),
      el("p", "", text)
    );

    const row = el("div", "row");
    const anchor = el("a", "btn", label);

    anchor.href = href;

    if (/^https?:\/\//i.test(href)) {
      ext(anchor);
    }

    row.append(el("span"), anchor);
    c.append(row);

    return c;
  }

  function search(raw) {
    if (!results || !status) return;

    const query = raw.trim().toLowerCase();
    const words = query.split(/\s+/).filter(Boolean);

    results.textContent = "";

    if (!words.length) {
      status.textContent = "";
      return;
    }

    const matches = hay =>
      words.every(word => hay.includes(word));

    const hits = INDEX.filter(entry => matches(entry.hay));

    hits.forEach((entry, index) => {
      const resultCard = card(entry.item, index);

      resultCard.classList.remove("rv");
      results.append(resultCard);
    });

    FAQS.filter(faq => matches(faq.hay)).forEach(faq => {
      results.append(
        info(
          faq.question,
          faq.answer,
          "#about",
          "See FAQ"
        )
      );
    });

    if (matches(BUYHAY)) {
      results.append(
        info(
          "How to buy",
          "Message us on WhatsApp or Telegram with the product name. Confirm the price and payment details with us before paying. Delivery follows payment confirmation.",
          wa("Hi Hackinsecond, I want to buy a tool or course."),
          "Ask on WhatsApp"
        )
      );
    }

    const count = results.children.length;

    if (!count) {
      results.append(
        info(
          "No match for \"" + raw.trim() + "\"",
          "We may still have what you need. Contact us with your requirements.",
          wa(
            "Hi Hackinsecond, I am looking for: " +
            raw.trim()
          ),
          "Ask on WhatsApp"
        )
      );
    }

    status.textContent = count
      ? count +
        " result" +
        (count === 1 ? "" : "s") +
        ' for "' +
        raw.trim() +
        '"'
      : "No exact matches. Ask us below.";
  }

  if (box) {
    box.addEventListener("input", () => {
      search(box.value);
    });
  }

  all(".chip").forEach(button => {
    button.addEventListener("click", () => {
      if (!box) return;

      box.value = button.dataset.q || "";
      search(box.value);

      if (results && results.scrollIntoView) {
        results.scrollIntoView({
          behavior: still ? "auto" : "smooth",
          block: "nearest"
        });
      }
    });
  });

  // Contact links.
  all("[data-wa]").forEach(anchor => {
    anchor.href = wa("Hi Hackinsecond, I have a question.");
    anchor.textContent = SITE.whatsappShow;
    ext(anchor);
  });

  all("[data-tg]").forEach(anchor => {
    anchor.href = "https://t.me/" + SITE.telegram;
    anchor.textContent = "@" + SITE.telegram;
    ext(anchor);
  });

  all("[data-wa-btn]").forEach(anchor => {
    anchor.href = wa(
      "Hi Hackinsecond, I want to buy a tool or course."
    );

    ext(anchor);
  });

  all("[data-tg-btn]").forEach(anchor => {
    anchor.href = "https://t.me/" + SITE.telegram;
    ext(anchor);
  });

  all("[data-yt-btn]").forEach(anchor => {
    anchor.href = SITE.youtube;
    ext(anchor);
  });

  // Mobile navigation.
  const menu = $("#menu");
  const navList = $("#nav-list");

  const closeMenu = () => {
    if (!menu || !navList) return;

    navList.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  };

  if (menu && navList) {
    menu.addEventListener("click", () => {
      const isOpen = navList.classList.toggle("open");

      menu.setAttribute("aria-expanded", String(isOpen));
    });

    navList.addEventListener("click", event => {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();

        const dialog = $("#popup");

        if (dialog && dialog.open) {
          dialog.close();
        }
      }
    });
  }

  // Form handling: Formspree, consent and honeypot.
  function wire(form, done) {
    if (!form) return;

    form.addEventListener("submit", async event => {
      event.preventDefault();

      const message = $(".msg", form);
      const button = $('button[type="submit"]', form);

      const showMessage = text => {
        if (message) message.textContent = text;
      };

      const honeypot = form.elements.namedItem("_gotcha");
      const consent = form.elements.namedItem("consent");

      if (honeypot && honeypot.value) {
        return;
      }

      if (
        !consent ||
        !consent.checked
      ) {
        showMessage("Please tick the privacy consent box.");
        return;
      }

      if (button) button.disabled = true;

      showMessage("Sending…");

      try {
        const response = await fetch(SITE.formspree, {
          method: "POST",
          body: new FormData(form),
          headers: {
            Accept: "application/json"
          }
        });

        if (!response.ok) {
          throw new Error("Form submission failed");
        }

        form.reset();

        showMessage("Thanks! Your message was sent.");

        if (typeof done === "function") {
          done();
        }
      } catch (error) {
        showMessage(
          "Couldn't send. Please try again or message us on WhatsApp."
        );
      } finally {
        if (button) button.disabled = false;
      }
    });
  }

  wire($("#contact-form"));

  // Email popup: show once per visitor after five seconds.
  const dialog = $("#popup");
  const popupForm = $("#popup-form");
  const popupClose = $("#popup-close");
  const STORAGE_KEY = "hs_popup_seen";

  const seen = () => {
    try {
      return window.localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  };

  const markSeen = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch (error) {
      // Popup still works if storage is unavailable.
    }
  };

  if (
    dialog &&
    typeof dialog.showModal === "function" &&
    !seen()
  ) {
    window.setTimeout(() => {
      if (!seen() && !dialog.open) {
        dialog.showModal();
      }
    }, 5000);
  }

  if (dialog) {
    dialog.addEventListener("close", markSeen);

    dialog.addEventListener("click", event => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  }

  if (popupClose && dialog) {
    popupClose.addEventListener("click", () => {
      dialog.close();
    });
  }

  wire(popupForm, () => {
    markSeen();

    window.setTimeout(() => {
      if (dialog && dialog.open) {
        dialog.close();
      }
    }, 1500);
  });

  // Footer year.
  const year = $("#year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Typing animation.
  const typed = $("#typed");

  if (!still && typed) {
    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function tick() {
      const phrase = PHRASES[phraseIndex];

      typed.textContent = phrase.slice(0, characterIndex);

      if (!deleting && characterIndex === phrase.length) {
        deleting = true;
        window.setTimeout(tick, 1600);
        return;
      }

      if (deleting && characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
      }

      characterIndex += deleting ? -1 : 1;

      window.setTimeout(tick, deleting ? 35 : 75);
    }

    tick();
  }

  // Scroll reveal and navigation highlighting.
  if ("IntersectionObserver" in window) {
    if (!still) {
      all("main section h2").forEach(heading => {
        heading.classList.add("reveal");
      });
    }

    const revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    all(".reveal, .rv").forEach(node => {
      revealObserver.observe(node);
    });

    const links = all("nav a");
    const sectionMap = {};

    links.forEach(anchor => {
      const href = anchor.getAttribute("href");

      if (href && href.startsWith("#")) {
        sectionMap[href.slice(1)] = anchor;
      }
    });

    const spy = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (
            entry.isIntersecting &&
            sectionMap[entry.target.id]
          ) {
            links.forEach(anchor => {
              anchor.removeAttribute("aria-current");
            });

            sectionMap[entry.target.id].setAttribute(
              "aria-current",
              "true"
            );
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px"
      }
    );

    Object.keys(sectionMap).forEach(id => {
      const section = document.getElementById(id);

      if (section) {
        spy.observe(section);
      }
    });
  } else {
    all(".rv").forEach(node => {
      node.classList.add("in");
    });
  }

  // Scroll progress indicator.
  const progress = $("#progress");
  let progressPending = false;

  if (progress) {
    window.addEventListener(
      "scroll",
      () => {
        if (progressPending) return;

        progressPending = true;

        window.requestAnimationFrame(() => {
          const html = document.documentElement;

          const maxScroll =
            html.scrollHeight - html.clientHeight;

          const amount =
            maxScroll > 0
              ? html.scrollTop / maxScroll
              : 0;

          progress.style.transform =
            "scaleX(" + amount + ")";

          progressPending = false;
        });
      },
      {
        passive: true
      }
    );
  }
})();
