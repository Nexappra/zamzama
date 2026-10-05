/* =========================================================
   ZAMZAMA COLLECTION — Website design by NexAppra
   One script for all three pages.

   EASY EDITS
   - WhatsApp number: change WHATSAPP below (country code, no + or 0).
   - Products: edit the PRODUCTS list. Each product's photo is
     images/p-<id>.jpg (e.g. images/p-zarnigar.jpg).
   ========================================================= */

const WHATSAPP = "923113203383";

const PRODUCTS = [
  // id, name, collection, colour, price (PKR), type, featured on home page?
  { id: "zarnigar",   name: "Zarnigar Bridal Lehenga",      collection: "bridal",  colour: "red",    price: 245000, type: "Barat lehenga",   featured: true },
  { id: "shehrbano",  name: "Shehrbano Lehenga",            collection: "bridal",  colour: "maroon", price: 198000, type: "Barat lehenga" },
  { id: "gulerana",   name: "Gul-e-Rana Walima Maxi",       collection: "bridal",  colour: "ivory",  price: 165000, type: "Walima maxi",     featured: true },
  { id: "mehrunisa",  name: "Mehrunisa Nikkah Gharara",     collection: "bridal",  colour: "pink",   price: 135000, type: "Nikkah gharara" },
  { id: "roshanara",  name: "Roshan Ara Lehenga",           collection: "bridal",  colour: "gold",   price: 285000, type: "Barat lehenga" },
  { id: "firoza",     name: "Firoza Formal Suit",           collection: "formals", colour: "blue",   price: 38500,  type: "Three piece",     featured: true },
  { id: "saba",       name: "Saba Organza Kurta Set",       collection: "formals", colour: "pink",   price: 26500,  type: "Kurta set" },
  { id: "nilofar",    name: "Nilofar Velvet Suit",          collection: "formals", colour: "maroon", price: 44000,  type: "Velvet with shawl" },
  { id: "afreen",     name: "Afreen Chiffon Formal",        collection: "formals", colour: "ivory",  price: 32000,  type: "Long shirt" },
  { id: "mehndi",     name: "Mehndi Gharara Set",           collection: "festive", colour: "green",  price: 18500,  type: "Gharara set",     featured: true },
  { id: "sunehri",    name: "Sunehri Eid Sharara",          collection: "festive", colour: "gold",   price: 14500,  type: "Sharara set" },
  { id: "gulabi",     name: "Gulabi Angrakha",              collection: "festive", colour: "pink",   price: 12800,  type: "Angrakha" },
  { id: "lal",        name: "Lal Festive Kurta",            collection: "festive", colour: "red",    price: 9800,   type: "Kurta with dupatta" },
  { id: "chhoti",     name: "Chhoti Gharara Set",           collection: "kids",    colour: "pink",   price: 6500,   type: "Girls, 2 to 10 years" },
  { id: "eidfrock",   name: "Eid Frock with Dupatta",       collection: "kids",    colour: "gold",   price: 5200,   type: "Girls, 2 to 8 years" },
  { id: "prince",     name: "Little Prince Kurta Waistcoat",collection: "kids",    colour: "maroon", price: 7800,   type: "Boys, 2 to 12 years" },
  { id: "minilehenga",name: "Mini Lehenga",                 collection: "kids",    colour: "red",    price: 8900,   type: "Girls, 3 to 12 years" }
];

const COLLECTIONS = {
  all:     { urdu: "زمزمہ", title: "All collections",  intro: "Every piece we make, from bridal lehengas to Eid outfits for little ones." },
  bridal:  { urdu: "دلہن", title: "Bridal lehengas",  intro: "Hand-finished lehengas, ghararas and maxis for the barat, walima and nikkah. Every piece can be made to your measurements." },
  formals: { urdu: "تقریب", title: "Luxury formals",   intro: "Formal suits in organza, velvet and chiffon for dinners, mehndis and family events." },
  festive: { urdu: "عید", title: "Festive edits",    intro: "Lighter, easy-to-wear outfits for Eid, dholkis and festive days." },
  kids:    { urdu: "بچے", title: "Kids collection",  intro: "Festive outfits for little ones, in sizes that actually fit. Custom sizes on request." }
};

/* ---------- helpers ---------- */
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const rupees = n => "Rs " + n.toLocaleString("en-PK");
const waLink = text => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

const WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.2.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3z"/></svg>';

/* Hide broken photos so the patterned arch shows instead */
function watchImages(root = document) {
  $$(".frame img", root).forEach(img => {
    const fail = () => img.classList.add("is-missing");
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener("error", fail);
  });
}

/* ---------- shared: page load, header, menu, bag ---------- */
document.documentElement.classList.add("js");
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const startPage = () => document.body.classList.add("is-loaded");

/* Intro: the calligraphy draws itself, then the curtain lifts (once per visit) */
const intro = $(".intro");
let introSeen = false;
try { introSeen = sessionStorage.getItem("zz-intro") === "1"; } catch (e) {}
if (intro && !introSeen && !REDUCED) {
  try { sessionStorage.setItem("zz-intro", "1"); } catch (e) {}
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    intro.classList.add("is-done");
    document.body.style.overflow = "";
    startPage();
    setTimeout(() => intro.remove(), 1100);
  }, 2500);
} else {
  intro?.remove();
  window.addEventListener("load", startPage);
  setTimeout(startPage, 900); // safety net if photos load slowly
}

/* Scroll reveals */
const io = "IntersectionObserver" in window
  ? new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { (e.target._reveal || [e.target]).forEach(x => x.classList.add("is-in")); io.unobserve(e.target); }
    }), { threshold: 0.15, rootMargin: "0px 0px -40px 0px" })
  : null;
function observeReveals(root = document) {
  $$("[data-reveal]:not(.is-in)", root).forEach(el => {
    if (!io) return el.classList.add("is-in");
    // arches are clipped while hidden, so we watch their parent instead
    const target = el.dataset.reveal === "arch" ? el.parentElement : el;
    (target._reveal = target._reveal || []).push(el);
    io.observe(target);
  });
}

/* Parallax for the outlined Urdu words */
const marks = $$("[data-speed]");
let ticking = false;
function parallax() {
  marks.forEach(m => {
    const r = m.parentElement.getBoundingClientRect();
    const offset = (r.top + r.height / 2 - innerHeight / 2) * parseFloat(m.dataset.speed);
    m.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
  });
  ticking = false;
}
if (!REDUCED && marks.length) {
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(parallax); } }, { passive: true });
  parallax();
}

const header = $(".header");
const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 10);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

const nav = $(".nav");
const scrim = $(".scrim");
function setMenu(open) {
  if (!nav) return;
  nav.classList.toggle("is-open", open);
  scrim && scrim.classList.toggle("is-open", open);
  $(".menu-toggle")?.setAttribute("aria-expanded", String(open));
}
$(".menu-toggle")?.addEventListener("click", () => setMenu(true));
$(".nav-close")?.addEventListener("click", () => setMenu(false));
scrim?.addEventListener("click", () => { setMenu(false); closeFilters(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") { setMenu(false); closeFilters(); } });

let bag = 0;
try { bag = Number(localStorage.getItem("zz-bag")) || 0; } catch (e) {}
function renderBag(bump) {
  const el = $(".bag-count");
  if (!el) return;
  el.textContent = bag;
  el.classList.toggle("has-items", bag > 0);
  if (bump) { el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump"); }
}
renderBag(false);

function toast(msg) {
  const t = $(".toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("is-shown");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => t.classList.remove("is-shown"), 2600);
}

/* ---------- product card ---------- */
function cardHTML(p, i = 0, reveal = false) {
  const msg = `Assalam o Alaikum, I'm interested in the ${p.name} (${rupees(p.price)}). Is it available?`;
  return `
    <article class="card"${reveal ? ` data-reveal style="--d:${i * 0.12}s"` : ""}>
      <a class="card__media" href="product.html?id=${p.id}">
        <div class="frame tone-${p.colour}">
          <img src="images/p-${p.id}.jpg" alt="${p.name}" loading="lazy">
        </div>
        ${p.collection === "bridal" ? '<span class="card__tag">Made to order</span>' : ""}
      </a>
      <a class="card__wa" href="${waLink(msg)}" target="_blank" rel="noopener">${WA_ICON} Ask on WhatsApp</a>
      <a href="product.html?id=${p.id}"><h3 class="card__name">${p.name}</h3></a>
      <div class="card__meta"><span class="card__price">${rupees(p.price)}</span><span class="card__type">${p.type}</span></div>
    </article>`;
}

/* ---------- HOME: new arrivals ---------- */
const featuredGrid = $("#featured");
if (featuredGrid) {
  featuredGrid.innerHTML = PRODUCTS.filter(p => p.featured).map((p, i) => cardHTML(p, i, true)).join("");
}

/* ---------- COLLECTION PAGE ---------- */
const shopGrid = $("#shop-grid");
const state = { collection: "all", colours: new Set(), prices: new Set(), sort: "featured" };

const PRICE_BANDS = {
  under20:  p => p.price < 20000,
  "20to75": p => p.price >= 20000 && p.price < 75000,
  "75to150":p => p.price >= 75000 && p.price < 150000,
  over150:  p => p.price >= 150000
};

function renderShop() {
  let list = PRODUCTS.filter(p =>
    (state.collection === "all" || p.collection === state.collection) &&
    (state.colours.size === 0 || state.colours.has(p.colour)) &&
    (state.prices.size === 0 || [...state.prices].some(b => PRICE_BANDS[b](p)))
  );
  if (state.sort === "low") list.sort((a, b) => a.price - b.price);
  if (state.sort === "high") list.sort((a, b) => b.price - a.price);

  const info = COLLECTIONS[state.collection];
  $("#collection-title").textContent = info.title;
  $("#collection-intro").textContent = info.intro;
  $("#crumb-current").textContent = info.title;
  const mark = $("#collection-urdu");
  if (mark) mark.textContent = info.urdu;
  $("#result-count").textContent = `${list.length} ${list.length === 1 ? "piece" : "pieces"}`;

  shopGrid.innerHTML = list.length
    ? list.map(p => cardHTML(p)).join("")
    : `<div class="empty" style="grid-column:1/-1">
         <h3>No pieces match these filters</h3>
         <p>Try another colour or price range, or ask us on WhatsApp. We can often make it for you.</p>
         <button class="btn btn--ghost" type="button" data-clear>Clear filters</button>
       </div>`;
  watchImages(shopGrid);
}

function closeFilters() {
  $(".filters")?.classList.remove("is-open");
  if (!nav?.classList.contains("is-open")) scrim?.classList.remove("is-open");
}

if (shopGrid) {
  const param = new URLSearchParams(location.search).get("c");
  if (param && COLLECTIONS[param]) state.collection = param;

  $$(".tab").forEach(tab => {
    tab.setAttribute("aria-pressed", String(tab.dataset.c === state.collection));
    tab.addEventListener("click", () => {
      state.collection = tab.dataset.c;
      $$(".tab").forEach(t => t.setAttribute("aria-pressed", String(t === tab)));
      history.replaceState(null, "", `?c=${state.collection}`);
      renderShop();
    });
  });

  $$(".swatch").forEach(sw => sw.addEventListener("click", () => {
    const c = sw.dataset.colour;
    state.colours.has(c) ? state.colours.delete(c) : state.colours.add(c);
    sw.setAttribute("aria-pressed", String(state.colours.has(c)));
    renderShop();
  }));

  $$("[data-price]").forEach(box => box.addEventListener("change", () => {
    box.checked ? state.prices.add(box.dataset.price) : state.prices.delete(box.dataset.price);
    renderShop();
  }));

  $("#sort").addEventListener("change", e => { state.sort = e.target.value; renderShop(); });

  document.addEventListener("click", e => {
    if (!e.target.closest("[data-clear]")) return;
    state.colours.clear(); state.prices.clear();
    $$(".swatch").forEach(s => s.setAttribute("aria-pressed", "false"));
    $$("[data-price]").forEach(b => (b.checked = false));
    renderShop();
  });

  $(".toolbar .filter-toggle")?.addEventListener("click", () => {
    $(".filters").classList.add("is-open");
    scrim?.classList.add("is-open");
  });
  $(".filters-done")?.addEventListener("click", closeFilters);

  renderShop();
}

/* ---------- PRODUCT PAGE ---------- */
const pdp = $(".pdp");
if (pdp) {
  // Show the product chosen on the collection page (product.html?id=...)
  const chosen = PRODUCTS.find(p => p.id === new URLSearchParams(location.search).get("id"));
  if (chosen && chosen.id !== "zarnigar") {
    const col = COLLECTIONS[chosen.collection];
    document.title = `${chosen.name} | Zamzama Collection`;
    $(".pdp__info h1").textContent = chosen.name;
    $("#pdp-crumb-name").textContent = chosen.name;
    $("#pdp-crumb").textContent = col.title;
    if ($("#pdp-urdu")) $("#pdp-urdu").textContent = col.urdu;
    $("#pdp-crumb").href = `collection.html?c=${chosen.collection}`;
    $(".pdp__price").textContent = rupees(chosen.price);
    $(".pdp__desc").textContent = `${chosen.type}. ${col.intro}`;
    $$(".thumb").forEach((t, i) => {
      const src = i === 0 ? `images/p-${chosen.id}.jpg` : `images/p-${chosen.id}-${i + 1}.jpg`;
      t.dataset.src = src;
      const img = $("img", t); img.src = src; img.classList.remove("is-missing");
    });
    const main = $(".gallery__main img");
    main.src = `images/p-${chosen.id}.jpg`; main.alt = chosen.name;
    $(".gallery__main .frame").className = `frame tone-${chosen.colour}`;
    $(".thumb .frame").className = `frame tone-${chosen.colour}`;
    $(".thumb").dataset.tone = `tone-${chosen.colour}`;
  }

  // Gallery
  const mainImg = $(".gallery__main img");
  const mainFrame = $(".gallery__main .frame");
  $$(".thumb").forEach(th => th.addEventListener("click", () => {
    $$(".thumb").forEach(t => t.setAttribute("aria-pressed", String(t === th)));
    mainImg.classList.remove("is-missing");
    mainImg.style.opacity = 0;
    setTimeout(() => {
      mainImg.src = th.dataset.src;
      mainFrame.className = "frame " + th.dataset.tone;
      mainImg.style.opacity = 1;
    }, 200);
  }));

  // Colour
  const colourName = $("#colour-name");
  $$(".pdp .swatch").forEach(sw => sw.addEventListener("click", () => {
    $$(".pdp .swatch").forEach(s => s.setAttribute("aria-pressed", String(s === sw)));
    colourName.textContent = sw.dataset.name;
  }));

  // Size + custom measurements
  const measure = $(".measure");
  const sizeName = $("#size-name");
  $$(".size").forEach(btn => btn.addEventListener("click", () => {
    $$(".size").forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
    sizeName.textContent = btn.dataset.size;
    const custom = btn.dataset.size === "Custom measurements";
    measure.classList.toggle("is-open", custom);
    if (custom) setTimeout(() => $("#m-bust").focus({ preventScroll: true }), 300);
  }));

  // Accordion
  $$(".acc__btn").forEach(btn => btn.addEventListener("click", () => {
    btn.setAttribute("aria-expanded", String(btn.getAttribute("aria-expanded") !== "true"));
  }));

  // Build the WhatsApp order message from everything the customer chose
  function orderMessage() {
    const name = $(".pdp__info h1").textContent.trim();
    const price = $(".pdp__price").textContent.trim();
    const lines = [
      "Assalam o Alaikum, I'd like to order:",
      `${name} (${price})`,
      `Colour: ${colourName.textContent}`,
      `Size: ${sizeName.textContent}`
    ];
    if (sizeName.textContent === "Custom measurements") {
      const m = [["Bust", "m-bust"], ["Waist", "m-waist"], ["Hips", "m-hips"], ["Shirt length", "m-length"], ["Sleeve", "m-sleeve"], ["Height", "m-height"]]
        .map(([label, id]) => { const v = $("#" + id).value.trim(); return v ? `${label}: ${v} in` : ""; })
        .filter(Boolean);
      if (m.length) lines.push("Measurements: " + m.join(", "));
    }
    const notes = $("#m-notes").value.trim();
    if (notes) lines.push(`Notes: ${notes}`);
    return lines.join("\n");
  }

  $("#order-wa").addEventListener("click", e => {
    e.preventDefault();
    window.open(waLink(orderMessage()), "_blank", "noopener");
  });

  $("#add-bag").addEventListener("click", () => {
    bag += 1;
    try { localStorage.setItem("zz-bag", bag); } catch (e) {}
    renderBag(true);
    toast("Added to your bag");
  });

  // Related products
  const related = $("#related");
  if (related) related.innerHTML = PRODUCTS.filter(p => p.collection === (chosen ? chosen.collection : "bridal") && p.id !== (chosen ? chosen.id : "zarnigar")).slice(0, 4).map((p, i) => cardHTML(p, i, true)).join("");
}

watchImages();
observeReveals();
