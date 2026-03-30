// ====== APP ENTRY ======
function enterApp() {
  document.getElementById('splash').style.display = 'none';
  document.getElementById('app').style.display = 'block';

  renderInfusions("infusions");
  renderInfusions("infusions2");

  renderTemplates("template");
  renderTemplates("template2");

  buildGolem();
}

// ====== INFUSIONS RENDER ======
function renderInfusions(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  Object.entries(INFUSIONS).forEach(([key, infusion]) => {
    const card = document.createElement("div");
    card.className = "card";

    const button = document.createElement("button");
    button.className = "collapsible";
    button.textContent = infusion.name;

    const content = document.createElement("div");
    content.className = "content";

    if (infusion.tags) {
      infusion.tags.forEach(tag => {
        const span = document.createElement("span");
        span.className = `tag ${tag.toLowerCase()}`;
        span.textContent = tag;
        content.appendChild(span);
      });
    }

    const effect = document.createElement("p");
    effect.innerHTML = `<strong>Effect:</strong> ${infusion.effect}`;
    content.appendChild(effect);

    const details = document.createElement("p");
    details.innerHTML = `<strong>Details:</strong> ${infusion.details}`;
    content.appendChild(details);

    const checkboxLabel = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = key;

    checkboxLabel.appendChild(checkbox);
    checkboxLabel.appendChild(document.createTextNode(" Select"));
    content.appendChild(checkboxLabel);

    card.appendChild(button);
    card.appendChild(content);
    container.appendChild(card);
  });

  Array.from(container.getElementsByClassName("collapsible")).forEach(col => {
    col.addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    });
  });
}

// ====== TEMPLATE DROPDOWN ======
function renderTemplates(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;

  Object.entries(TEMPLATES).forEach(([key, template]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = template.name;
    select.appendChild(option);
  });
}

// ====== INFUSION UTIL ======
function getSelectedInfusions(containerId) {
  return [...document.querySelectorAll(`#${containerId} input:checked`)]
    .map(cb => cb.value);
}

// ====== CREATE GOLEM ======
function createGolem(levelId, intId, engineId, infusionContainer) {

  const levelEl = document.getElementById(levelId);
  const intEl = document.getElementById(intId);
  const engineEl = document.getElementById(engineId);

  if (!levelEl || !intEl || !engineEl) return {};

  const level = parseInt(levelEl.value);
  const intMod = parseInt(intEl.value);

  const player = { level, intMod, pb: Math.ceil((level - 1)/4) + 1 };

  let golem = {
    hp: 50,
    ac: 15,

    str: 14,
    dex: 10,
    con: 14,

    int: 6,
    wis: 10,
    cha: 5,

    speed: 30,
    reach: 5,

    traits: [],
    actions: [],
    reactions: []
  };

  // ===== TEMPLATE SYSTEM =====
  const templateId = engineId.replace("engine", "template");
  const templateEl = document.getElementById(templateId);

  if (templateEl && templateEl.value !== "none") {
    const template = TEMPLATES[templateEl.value];

    if (template) {
      template.apply?.(golem, player);

      if (template.traits) {
        golem.traits.push(...template.traits.map(fn => fn(player)));
      }

      if (template.actions) {
        golem.actions.push(...template.actions.map(fn => fn(player)));
      }
    }
  }

  // ===== ENGINE SYSTEM =====
  const engineKey = engineEl.value;

  if (engineKey && engineKey !== "none") {
    const engine = ENGINES[engineKey];

    if (engine) {
      engine.apply?.(golem, player);

      if (engine.traits) {
        golem.traits.push(...engine.traits.map(fn => fn(player)));
      }

      if (engine.actions) {
        golem.actions.push(...engine.actions.map(fn => fn(player)));
      }
    }
  }

  // ===== INFUSIONS =====
  getSelectedInfusions(infusionContainer).forEach(key => {
    const infusion = INFUSIONS[key];
    if (!infusion) return;

    infusion.apply?.(golem, player);

    if (infusion.traits) golem.traits.push(...infusion.traits);
    if (infusion.actions) golem.actions.push(...infusion.actions);
    if (infusion.reactions) golem.reactions.push(...infusion.reactions);
  });

  // ===== STATS =====
  golem.strMod = Math.floor((golem.str - 10) / 2);
  golem.dexMod = Math.floor((golem.dex - 10) / 2);
  golem.conMod = Math.floor((golem.con - 10) / 2);
  golem.intMod = Math.floor((golem.int - 10) / 2);
  golem.wisMod = Math.floor((golem.wis - 10) / 2);
  golem.chaMod = Math.floor((golem.cha - 10) / 2);

  if (player.level <= 4) golem.damageDice = "1d8";
  else if (player.level <= 10) golem.damageDice = "1d10";
  else if (player.level <= 16) golem.damageDice = "1d12";
  else golem.damageDice = "2d12";

  golem.attackBonus = player.pb + golem.strMod;

  return golem;
}

// ====== BUILD ======
function buildGolem() {
  const modeEl = document.getElementById("mode");
  if (!modeEl) return;

  const mode = modeEl.value;
  const g1 = createGolem("level", "int", "engine", "infusions");

  let output = renderStatBlock(g1, "Golem");

  document.getElementById("statblock").innerHTML = output;
}

// ====== EVENTS ======
function setupEventListeners() {
  ["level","int","engine","template","level2","int2","engine2","template2"]
    .forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("input", debounce(buildGolem));
    });

  ["infusions","infusions2"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", buildGolem);
  });
}

function debounce(fn, delay = 100) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}

// ====== INIT ======
window.addEventListener("load", () => {
  setupEventListeners();
});
