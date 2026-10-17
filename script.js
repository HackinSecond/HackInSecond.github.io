/* ============================================================
   HACKINSECOND: script.js
   PART 1 is the ONLY part you normally edit: business info, listings, typing phrases.
   To add a product: copy one {...} block, paste it in the list, change the text.
   type: "free" or "paid" | price: number (USD), 0 for free | img: optional file in assets/images/ (e.g. "tools/x.webp")
   If img is empty, a colorful animated tile with the item's initials is shown instead.
   ============================================================ */
const SITE = {
  whatsapp: "923104515679",            // digits only, with country code
  whatsappShow: "WhatsApp",
  telegram: "Hackinsecon",
  youtube: "https://www.youtube.com/@hackin2",
  formspree: "https://formspree.io/f/mvkzqyjr",
  url: "HackInSecond.github.io/"   // used for search-engine listing data
};
const PHRASES = ["Hacking tools", "Free YouTube tutorials", "Hands-on security courses", "Legal. Authorized. Practical."];

// Paid tools. Only list legal tools used on systems you own or have written permission to test.
const TOOLS = [
  { id:"recon-kit", type:"paid", name:"Recon Notes Toolkit", price:19,
    desc:"Organized templates and scripts to document authorized reconnaissance in your own lab.",
    features:["Report templates","Lab checklist","Lifetime updates"], img:"" },
  { id:"lab-builder", type:"paid", name:"Home Lab Builder Pack", price:29,
    desc:"Step-by-step setup of a safe, isolated practice lab with intentionally vulnerable machines.",
    features:["VM setup guides","Network diagrams","Practice targets list"], img:"" },
    // addd
  { id:"report-pro", type:"paid", name:"Pentest Report Pro", price:15,
    desc:"Professional report and scope-agreement templates for authorized security assessments.",
    features:["Word + PDF templates","Scope & permission form","Severity rating guide"], img:"2.webp" }
];
const COURSES = [
  { id:"ethical-101", type:"free", name:"Ethical Hacking Basics", price:0,
    desc:"Free beginner series on YouTube covering core concepts, legal boundaries and terminology.",
    features:["Video lessons","Beginner friendly","Legal & ethical focus"], img:"ethical-hacking.webp", link:SITE.youtube, cta:"Watch free" },
  { id:"web-sec", type:"paid", name:"Web Security Fundamentals", price:49,
    desc:"Learn how common web flaws work and how to fix them, using practice labs you control.",
    features:["Hands-on labs","Certificate of completion","Private support chat"], img:"" },
    // add
  { id:"net-def", type:"paid", name:"Network Defense Essentials", price:59,
    desc:"Monitoring, hardening and incident basics for small networks and home offices.",
    features:["Defense playbooks","Lab exercises","Community access"], img:"" }
];
const FREE = [
  { id:"yt", type:"free", name:"Watch on YouTube", price:0,
    desc:"Free tutorials, tool walkthroughs and security news on the Hackinsecond channel.",
    features:["Subscribe for updates","Tutorials in simple language"], img:"og-image.jpg", link:SITE.youtube, cta:"Open channel" },
    // add 
  { id:"roadmap", type:"free", name:"Beginner Cybersecurity Roadmap", price:0,
    desc:"What to learn first, free platforms to practice on, and how to stay legal while learning.",
    features:["Free to read","Updated on YouTube"], img:"", link:SITE.youtube, cta:"Get it on YouTube" }
];

/* ============================================================
   PART 2: site code. You don't need to edit below this line.
   ============================================================ */
(function () {
"use strict";
const $ = (s, r = document) => r.querySelector(s);
const all = (s, r = document) => Array.from(r.querySelectorAll(s));
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };
const wa = msg => "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(msg);
const still = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
const ext = a => { a.target = "_blank"; a.rel = "noopener noreferrer"; return a; };

// Reusable card. textContent is used everywhere so data can never inject HTML.
function card(item, i) {
  const c = el("article", "card rv");
  c.style.setProperty("--d", (i % 3) * 0.12 + "s");
  c.dataset.search = (item.name + " " + item.desc + " " + item.features.join(" ")).toLowerCase();
  if (item.img) { const im = el("img"); im.src = "assets/images/" + item.img; im.alt = item.name; im.loading = "lazy"; im.decoding = "async"; im.width = 640; im.height = 360; c.append(im); }
  else { const t = el("div", "thumb " + item.type, item.name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase()); t.setAttribute("aria-hidden", "true"); c.append(t); }
  c.append(el("span", "tag " + item.type, item.type === "free" ? "FREE" : "PAID"), el("h3", "", item.name), el("p", "", item.desc));
  const ul = el("ul"); item.features.forEach(f => ul.append(el("li", "", f))); c.append(ul);
  const row = el("div", "row"); row.append(el("span", "price", item.price ? "$" + item.price : "Free"));
  const a = el("a", "btn");
  if (item.link || item.type === "free") { a.href = item.link || SITE.youtube; a.textContent = item.cta || "Watch free"; }
  else { a.href = wa("Hi Hackinsecond, I want to buy: " + item.name + " ($" + item.price + "). Please share payment details."); a.textContent = "Buy on WhatsApp"; }
  ext(a); a.setAttribute("aria-label", a.textContent + ": " + item.name);
  row.append(a); c.append(row); return c;
}
[["free-grid", FREE], ["tools-grid", TOOLS], ["courses-grid", COURSES]].forEach(([id, list]) => { const g = $("#" + id); list.forEach((it, i) => g.append(card(it, i))); });

// Search listing data for Google/AI: Products + Courses as ItemList JSON-LD
(function () {
  const offer = i => ({ "@type": "Offer", price: String(i.price), priceCurrency: "USD", availability: "https://schema.org/InStock", url: SITE.url });
  const prod = i => ({ "@type": "Product", name: i.name, description: i.desc, brand: { "@type": "Brand", name: "Hackinsecond" }, offers: offer(i) });
  const course = i => ({ "@type": "Course", name: i.name, description: i.desc, provider: { "@type": "Organization", name: "Hackinsecond", sameAs: SITE.youtube }, offers: offer(i) });
  const items = TOOLS.map(prod).concat(COURSES.map(course)).map((it, n) => ({ "@type": "ListItem", position: n + 1, item: it }));
  const s = document.createElement("script"); s.type = "application/ld+json";
  s.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", name: "Hackinsecond tools and courses", itemListElement: items });
  document.head.append(s);
})();

// Search: results appear in a panel under the box (tools, courses, free items, buying help and FAQ answers)
const status = $("#search-status"), results = $("#results");
const INDEX = FREE.map(i => [i, "free resource"]).concat(TOOLS.map(i => [i, "paid tool"]), COURSES.map(i => [i, "course"]))
  .map(([it, cat]) => ({ it, hay: (it.name + " " + it.desc + " " + it.features.join(" ") + " " + it.type + " " + cat + "s " + cat).toLowerCase() }));
const FAQS = all("#about details").map(d => ({ q: $("summary", d).textContent, a: $("p", d).textContent, hay: d.textContent.toLowerCase() }));
const BUYHAY = "buy purchase payment pay order whatsapp telegram delivery deliver price how to buy";
function info(title, text, href, label) {
  const c = el("article", "card"); c.append(el("span", "tag free", "ANSWER"), el("h3", "", title), el("p", "", text));
  const row = el("div", "row"); const a = el("a", "btn", label); a.href = href; if (/^http/.test(href)) ext(a); row.append(el("span")); row.append(a); c.append(row); return c;
}
function search(raw) {
  const words = raw.trim().toLowerCase().split(/\s+/).filter(Boolean);
  results.textContent = "";
  if (!words.length) { status.textContent = ""; return; }
  const ok = hay => words.every(w => hay.includes(w));
  const hits = INDEX.filter(x => ok(x.hay));
  hits.forEach((x, i) => { const c = card(x.it, i); c.classList.remove("rv"); results.append(c); });
  FAQS.filter(f => ok(f.hay)).forEach(f => results.append(info(f.q, f.a, "#about", "See FAQ")));
  if (ok(BUYHAY)) results.append(info("How to buy", "Message us on WhatsApp or Telegram with the product name. Pay, send your confirmation, and we deliver after payment is confirmed.", wa("Hi Hackinsecond, I want to buy a tool or course."), "Ask on WhatsApp"));
  const n = results.children.length;
  if (!n) results.append(info("No match for \u201c" + raw.trim() + "\u201d", "We may still have what you need. Ask us directly and we will reply.", wa("Hi Hackinsecond, I am looking for: " + raw.trim()), "Ask on WhatsApp"));
  status.textContent = n ? n + " result" + (n === 1 ? "" : "s") + " for \u201c" + raw.trim() + "\u201d" : "No exact matches. Ask us below.";
}
const box = $("#search");
box.addEventListener("input", () => search(box.value));
all(".chip").forEach(b => b.addEventListener("click", () => { box.value = b.dataset.q; search(box.value); if (results.scrollIntoView) results.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "nearest" }); }));

// Contact links
all("[data-wa]").forEach(a => { a.href = wa("Hi Hackinsecond, I have a question."); a.textContent = SITE.whatsappShow; ext(a); });
all("[data-tg]").forEach(a => { a.href = "https://t.me/" + SITE.telegram; a.textContent = "@" + SITE.telegram; ext(a); });
all("[data-wa-btn]").forEach(a => a.href = wa("Hi Hackinsecond, I want to buy a tool or course."));
all("[data-tg-btn]").forEach(a => a.href = "https://t.me/" + SITE.telegram);
all("[data-yt-btn]").forEach(a => a.href = SITE.youtube);

// Mobile menu
const menu = $("#menu"), list = $("#nav-list");
const closeMenu = () => { list.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); };
menu.addEventListener("click", () => menu.setAttribute("aria-expanded", String(list.classList.toggle("open"))));
list.addEventListener("click", e => { if (e.target.tagName === "A") closeMenu(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });

// Forms: Formspree, consent required, honeypot for bots
function wire(form, done) {
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const msg = $(".msg", form), btn = $("button[type=submit]", form);
    if (form.elements._gotcha && form.elements._gotcha.value) return;
    if (!form.elements.consent.checked) { msg.textContent = "Please tick the privacy consent box."; return; }
    msg.textContent = "Sending…"; btn.disabled = true;
    try {
      const r = await fetch(SITE.formspree, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!r.ok) throw new Error("bad response");
      form.reset(); msg.textContent = "Thanks! Your message was sent."; if (done) done();
    } catch (err) { msg.textContent = "Couldn't send. Please try again or message us on WhatsApp."; }
    btn.disabled = false;
  });
}
wire($("#contact-form"));

// Email popup: once per visitor, shortly after arrival
const dlg = $("#popup"), KEY = "hs_popup_seen";
const seen = () => { try { return localStorage.getItem(KEY); } catch (e) { return null; } };
const mark = () => { try { localStorage.setItem(KEY, "1"); } catch (e) {} };
if (!seen() && typeof dlg.showModal === "function") setTimeout(() => { if (!seen() && !dlg.open) dlg.showModal(); }, 5000);
dlg.addEventListener("close", mark);
dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
$("#popup-close").addEventListener("click", () => dlg.close());
wire($("#popup-form"), () => { mark(); setTimeout(() => dlg.close(), 1500); });
$("#year").textContent = new Date().getFullYear();

/* ---------- Animation (all skipped if visitor prefers reduced motion) ---------- */
const typed = $("#typed");
if (!still && typed) {
  let p = 0, c = 0, del = false;
  (function tick() {
    const word = PHRASES[p];
    typed.textContent = word.slice(0, c);
    if (!del && c === word.length) { del = true; return setTimeout(tick, 1600); }
    if (del && c === 0) { del = false; p = (p + 1) % PHRASES.length; }
    c += del ? -1 : 1;
    setTimeout(tick, del ? 35 : 75);
  })();
}
if ("IntersectionObserver" in window) {
  // Reveal headings, cards and steps once as they scroll into view
  if (!still) all("main section h2").forEach(h => h.classList.add("reveal"));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
  all(".reveal, .rv").forEach(n => io.observe(n));
  // Highlight the current section in the menu
  const links = all("nav a"), map = {};
  links.forEach(a => map[a.getAttribute("href").slice(1)] = a);
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting && map[e.target.id]) { links.forEach(a => a.removeAttribute("aria-current")); map[e.target.id].setAttribute("aria-current", "true"); }
  }), { rootMargin: "-45% 0px -50% 0px" });
  Object.keys(map).forEach(id => { const s = document.getElementById(id); if (s) spy.observe(s); });
} else { all(".rv").forEach(n => n.classList.add("in")); }
// Scroll progress bar
const bar = $("#progress"); let tickP = false;
addEventListener("scroll", () => {
  if (tickP) return; tickP = true;
  requestAnimationFrame(() => { const h = document.documentElement; const m = h.scrollHeight - h.clientHeight; bar.style.transform = "scaleX(" + (m > 0 ? h.scrollTop / m : 0) + ")"; tickP = false; });
}, { passive: true });
})();
