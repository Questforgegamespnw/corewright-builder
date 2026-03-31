// ====== IMPORT DATA ======
import { INFUSIONS } from "./data/infusions.js";
import { ENGINES } from "./data/engines.js";
import { TEMPLATES } from "./data/templates.js";

// ====== APP ENTRY ======
function enterApp() {
  document.getElementById("splash").style.display = "none";
  document.getElementById("app").style.display = "block";

  renderEngines("engines", "engine", "Engine");
  renderEngines("engines2", "engine2", "Second Golem Engine");

  renderInfusions("infusions");
  renderInfusions("infusions2");

  renderTemplates("template");
  renderTemplates("template2");

  setupEventListeners();
  buildGolem();
}

// expose to HTML
window.enterApp = enterApp;

// ====== ENGINE RENDER ======
function renderEngines(containerId, inputId, title = "Engine") {
  const container = document.getElementById(containerId);
  const hiddenInput = document.getElementById(inputId);

  if (!container || !hiddenInput) return;

  container.innerHTML = `<h2>${title}</h2>`;

  // "None" option
  const noneCard = document.createElement("div");
  noneCard.className = "card engine-card selected";
  noneCard.dataset.value = "none";

  const noneButton = document.createElement("button");
  noneButton.className = "collapsible active";
  noneButton.textContent = "No Engine";

  const noneContent = document.createElement("div");
  noneContent.className = "content";
  noneContent.style.display = "block";
  noneContent.innerHTML = `<p><strong>Effect:</strong> No engine selected.</p>`;

  noneCard.appendChild(noneButton);
  noneCard.appendChild(noneContent);
  container.appendChild(noneCard);

  Object.entries(ENGINES).forEach(([key, engine]) => {
    const card = document.createElement("div");
    card.className = "card engine-card";
    card.dataset.value = key;

    const button = document.createElement("button");
    button.className = "collapsible";
    button.textContent = engine.name;

    const content = document.createElement("div");
    content.className = "content";

    if (engine.traits?.length) {
      engine.traits.forEach((fn) => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>Trait:</strong> ${fn({ pb: 4, intMod: 4 })}`;
        content.appendChild(p);
      });
    } else {
      const p = document.createElement("p");
      p.innerHTML = `<strong>Effect:</strong> No passive trait text listed.`;
      content.appendChild(p);
    }

    card.appendChild(button);
    card.appendChild(content);
    container.appendChild(card);
  });

  Array.from(container.getElementsByClassName("collapsible")).forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.parentElement;
      const selectedValue = card.dataset.value;

      Array.from(container.getElementsByClassName("engine-card")).forEach((engineCard) => {
        engineCard.classList.remove("selected");

        const btn = engineCard.querySelector(".collapsible");
        const content = engineCard.querySelector(".content");

        if (btn) btn.classList.remove("active");
        if (content) content.style.display = "none";
      });

      card.classList.add("selected");
      this.classList.add("active");

      const content = this.nextElementSibling;
      if (content) content.style.display = "block";

      hiddenInput.value = selectedValue;
      buildGolem();
    });
  });
}

// ====== INFUSIONS RENDER ======
function renderInfusions(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "<h2>Infusions</h2>";

  Object.entries(INFUSIONS).forEach(([key, infusion]) => {
    const card = document.createElement("div");
    card.className = "card";

    const button = document.createElement("button");
    button.className = "collapsible";
    button.textContent = infusion.name;

    const content = document.createElement("div");
    content.className = "content";

    if (infusion.tags) {
      infusion.tags.forEach((tag) => {
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

  Array.from(container.getElementsByClassName("collapsible")).forEach((col) => {
    col.addEventListener("click", function () {
      const content = this.nextElementSibling;
      this.classList.toggle("active");
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  });
}

// ====== TEMPLATE DROPDOWN ======
function renderTemplates(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;

  select.innerHTML = `<option value="none">None</option>`;

  Object.entries(TEMPLATES).forEach(([key, template]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = template.name;
    select.appendChild(option);
  });
}

// ====== INFUSION UTIL ======
function getSelectedInfusions(containerId) {
  return [...document.querySelectorAll(`#${containerId} input:checked`)].map((cb) => cb.value);
}

// ====== CREATE GOLEM ======
function createGolem(levelId, intId, engineId, infusionContainer) {
  const levelEl = document.getElementById(levelId);
  const intEl = document.getElementById(intId);
  const engineEl = document.getElementById(engineId);

  if (!levelEl || !intEl || !engineEl) return {};

  const level = parseInt(levelEl.value) || 1;
  const intMod = parseInt(intEl.value) || 0;

  const player = {
    level,
    intMod,
    pb: Math.ceil((level - 1) / 4) + 1
  };

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
        golem.traits.push(...template.traits.map((fn) => fn(player)));
      }

      if (template.actions) {
        golem.actions.push(...template.actions.map((fn) => fn(player)));
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
        golem.traits.push(...engine.traits.map((fn) => fn(player)));
      }

      if (engine.actions) {
        golem.actions.push(...engine.actions.map((fn) => fn(player)));
      }
    }
  }

  // ===== INFUSIONS =====
  getSelectedInfusions(infusionContainer).forEach((key) => {
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
  golem.intModFinal = Math.floor((golem.int - 10) / 2);
  golem.wisMod = Math.floor((golem.wis - 10) / 2);
  golem.chaMod = Math.floor((golem.cha - 10) / 2);

  if (player.level <= 4) golem.damageDice = "1d8";
  else if (player.level <= 10) golem.damageDice = "1d10";
  else if (player.level <= 16) golem.damageDice = "1d12";
  else golem.damageDice = "2d12";

  golem.attackBonus = player.pb + golem.strMod;

  return golem;
}

// ====== STAT BLOCK ======
function renderStatBlock(golem, name) {
  const traitBlock = golem.traits?.length
    ? `<div class="stat-section"><strong>Traits</strong><br>${golem.traits.join("<br><br>")}</div>`
    : "";

  let baseAttack = `
<strong>Slam.</strong> Melee Weapon Attack: +${golem.attackBonus} to hit,
reach ${golem.reach} ft., one target.
Hit: ${golem.damageDice} + ${golem.strMod} bludgeoning damage
${golem.bonusDamage ? `+ ${golem.bonusDamage} fire damage` : ""}.
`;

  let allActions = [baseAttack];

  if (golem.actions?.length) {
    allActions.push(...golem.actions);
  }

  const actionBlock = `
<div class="stat-section">
<strong>Actions</strong><br>
${allActions.join("<br><br>")}
</div>
`;

  return `
    <div>
      <div class="stat-header">
        <div class="stat-name">${name}</div>
      </div>

      <div><strong>Armor Class</strong> ${golem.ac}</div>
      <div><strong>Hit Points</strong> ${golem.hp}</div>

      <div class="stat-section">
        <strong>Speed</strong> ${golem.speed} ft
        ${golem.flySpeed ? `, fly ${golem.flySpeed} ft` : ""}
      </div>

      <div class="stat-section">
        <strong>STR</strong> ${golem.str}
        &nbsp; <strong>DEX</strong> ${golem.dex}
        &nbsp; <strong>CON</strong> ${golem.con}
      </div>

      <div class="stat-section">
        <strong>INT</strong> ${golem.int}
        &nbsp; <strong>WIS</strong> ${golem.wis}
        &nbsp; <strong>CHA</strong> ${golem.cha}
      </div>

      ${golem.damageReduction ? `<div><strong>Damage Reduction</strong> ${golem.damageReduction}</div>` : ""}
      ${golem.bonusDamage ? `<div><strong>Bonus Damage</strong> +${golem.bonusDamage}</div>` : ""}

      ${traitBlock}
      ${actionBlock}
    </div>
  `;
}

// ====== BUILD ======
function buildGolem() {
  const g1 = createGolem("level", "int", "engine", "infusions");
  document.getElementById("statblock").innerHTML = renderStatBlock(g1, "Golem");
}

// ====== EVENTS ======
function setupEventListeners() {
  ["level", "int", "template", "level2", "int2", "template2"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", debounce(buildGolem));
  });

  ["infusions", "infusions2"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", buildGolem);
  });
}

// ====== DEBOUNCE ======
function debounce(fn, delay = 100) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
  };
}
