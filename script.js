const dishes = [
  {
    name: "Schwarzwälder Pilzrahm mit Semmelknödel",
    price: "14,90 €",
    info: "Cremige Waldpilze in Rahmsoße mit hausgemachten Knödeln.",
    image:
      "https://images.unsplash.com/photo-1528607929212-2636ec44253e?auto=format&fit=crop&w=1200&q=80",
    allergy: ["L", "G"],
  },
  {
    name: "Forelle Müllerin Art",
    price: "18,50 €",
    info: "Frische Forelle mit Kräuterbutter, Kartoffeln und Salat.",
    image:
      "https://images.unsplash.com/photo-1559054663-e8d23213f55c?auto=format&fit=crop&w=1200&q=80",
    allergy: ["L"],
  },
  {
    name: "Wildgulasch vom Hirsch",
    price: "21,00 €",
    info: "Langsam geschmort, serviert mit Rotkohl und Spätzle.",
    image:
      "https://images.unsplash.com/photo-1529692236671-f1de65b2a7c0?auto=format&fit=crop&w=1200&q=80",
    allergy: ["G", "S"],
  },
  {
    name: "Käsespätzle mit Röstzwiebeln",
    price: "13,50 €",
    info: "Schwäbischer Klassiker mit Bergkäse und kleinem Blattsalat.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    allergy: ["G", "L"],
  },
  {
    name: "Veganes Waldkräuter-Risotto",
    price: "15,20 €",
    info: "Cremiges Risotto mit Kräutern, Zitrone und gerösteten Kernen.",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80",
    allergy: ["N"],
  },
  {
    name: "Schwarzwälder Kirschdessert",
    price: "7,20 €",
    info: "Neu interpretiert mit dunkler Schokolade und Kirschen.",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
    allergy: ["G", "L", "N"],
  },
];

const allergyCodes = ["G", "L", "N", "S"];
const activeAllergies = new Set();
const menuGrid = document.querySelector("#menuGrid");
const filterContainer = document.querySelector("#allergyFilters");

function renderFilters() {
  allergyCodes.forEach((code) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "filter-chip";
    chip.textContent = `Ohne ${code}`;
    chip.addEventListener("click", () => {
      chip.classList.toggle("active");
      if (activeAllergies.has(code)) {
        activeAllergies.delete(code);
      } else {
        activeAllergies.add(code);
      }
      renderMenu();
    });
    filterContainer.appendChild(chip);
  });
}

function renderMenu() {
  menuGrid.innerHTML = "";
  const visibleDishes = dishes.filter((dish) =>
    [...activeAllergies].every((code) => !dish.allergy.includes(code))
  );

  if (!visibleDishes.length) {
    menuGrid.innerHTML =
      '<article class="card glass">Keine Treffer mit den gewählten Filtern.</article>';
    return;
  }

  visibleDishes.forEach((dish) => {
    const item = document.createElement("article");
    item.className = "card glass menu-item";
    item.innerHTML = `
      <figure>
        <img src="${dish.image}" alt="${dish.name}" loading="lazy" />
      </figure>
      <div class="menu-item-content">
        <div class="menu-item-header">
          <h3>${dish.name}</h3>
          <strong>${dish.price}</strong>
        </div>
        <p>${dish.info}</p>
        <div class="badges">
          ${dish.allergy.map((tag) => `<span class="badge">${tag}</span>`).join("")}
        </div>
      </div>
    `;
    menuGrid.appendChild(item);
  });
}

function updateTodayState() {
  const labels = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag",
  ];
  const day = new Date().getDay();
  const state = document.querySelector("#todayState");

  if (day === 1) {
    state.textContent = `${labels[day]}: Heute ist Ruhetag.`;
    return;
  }

  const hoursMap = {
    0: "12:00 – 21:00",
    2: "17:00 – 22:00",
    3: "17:00 – 22:00",
    4: "17:00 – 22:00",
    5: "17:00 – 23:00",
    6: "12:00 – 23:00",
  };

  state.textContent = `${labels[day]}: Geöffnet von ${hoursMap[day]}.`;
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function setupMobileNav() {
  const button = document.querySelector("#menuToggle");
  const nav = document.querySelector("#siteNav");

  button.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

function setYear() {
  document.querySelector("#year").textContent = new Date().getFullYear();
}

renderFilters();
renderMenu();
updateTodayState();
setupReveal();
setupMobileNav();
setYear();
