// builder.js

// ====== APP ENTRY ======
function enterApp() {
  document.getElementById('splash').style.display = 'none';
  document.getElementById('app').style.display = 'block';

  renderInfusions("infusions");
  renderInfusions("infusions2");
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

    // TAGS
    if (infusion.tags) {
      infusion.tags.forEach(tag => {
        const span = document.createElement("span");
        span.className = `tag ${tag.toLowerCase()}`;
        span.textContent = tag;
        content.appendChild(span);
      });
    }

    // EFFECT
    const effect = document.createElement("p");
    effect.innerHTML = `<strong>Effect:</strong> ${infusion.effect}`;
    content.appendChild(effect);

    // DETAILS
    const details = document.createElement("p");
    details.innerHTML = `<strong>Details:</strong> ${infusion.details}`;
    content.appendChild(details);

    // CHECKBOX
    const checkboxLabel = document.createElement("label");
    checkboxLabel.style.display = "block";
    checkboxLabel.style.marginTop = "8px";

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

  // COLLAPSIBLE
  Array.from(container.getElementsByClassName("collapsible")).forEach(col => {
    col.addEventListener("click", function () {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    });
  });
}

// ====== INFUSION UTILITIES ======
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
    con: 14,
    dex: 10,
    speed: 30,
    reach: 5,

    traits: [],
    actions: [],
    reactions: []
  };

  // ENGINE EFFECTS
  const engine = engineEl.value;
  if (engine === "flame") golem.bonusDamage = intMod;
  if (engine === "stone") golem.damageReduction = player.pb;
  if (engine === "aether") golem.flySpeed = golem.speed;

  // APPLY INFUSIONS (DATA-DRIVEN)
  getSelectedInfusions(infusionContainer).forEach(key => {
    const infusion = INFUSIONS[key];
    if (!infusion) return;

    infusion.apply?.(golem, player);

    if (infusion.traits) {
      golem.traits.push(...infusion.traits);
    }

    if (infusion.actions) {
      golem.actions.push(...infusion.actions);
    }

    if (infusion.reactions) {
      golem.reactions.push(...infusion.reactions);
    }
  });

  return golem;
}

// ====== STAT BLOCK RENDER ======
function renderStatBlock(golem, name) {

  const traitBlock = golem.traits?.length
    ? `<div class="stat-section"><strong>Traits</strong><br>${golem.traits.join("<br><br>")}</div>`
    : "";

  const actionBlock = golem.actions?.length
    ? `<div class="stat-section"><strong>Actions</strong><br>${golem.actions.join("<br><br>")}</div>`
    : "";

  const reactionBlock = golem.reactions?.length
    ? `<div class="stat-section"><strong>Reactions</strong><br>${golem.reactions.join("<br><br>")}</div>`
    : "";

  return `
    <div id="statblock">

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

      ${golem.damageReduction ? `<div><strong>Damage Reduction</strong> ${golem.damageReduction}</div>` : ""}
      ${golem.bonusDamage ? `<div><strong>Bonus Damage</strong> +${golem.bonusDamage}</div>` : ""}

      ${traitBlock}
      ${actionBlock}
      ${reactionBlock}

    </div>
  `;
}

// ====== BUILD LOGIC ======
function buildGolem() {
  const modeEl = document.getElementById("mode");
  if (!modeEl) return;

  const mode = modeEl.value;
  const g1 = createGolem("level", "int", "engine", "infusions");
  let output = "";

  if (mode === "single") {
    output = renderStatBlock(g1, "Golem");
  }

  else if (mode === "multi") {
    const g2 = createGolem("level2", "int2", "engine2", "infusions2");
    output =
      renderStatBlock(g1, "Golem One") +
      renderStatBlock(g2, "Golem Two");
  }

  else if (mode === "fusion") {
    const g2 = createGolem("level2", "int2", "engine2", "infusions2");

    const fused = {
      hp: g1.hp + g2.hp,
      ac: Math.max(g1.ac, g2.ac),
      str: Math.max(g1.str, g2.str),
      dex: Math.max(g1.dex, g2.dex),
      con: Math.max(g1.con, g2.con),
      speed: Math.max(g1.speed, g2.speed),
      reach: Math.max(g1.reach, g2.reach) + 5,
      traits: [...(g1.traits || []), ...(g2.traits || [])],
      actions: [...(g1.actions || []), ...(g2.actions || [])],
      reactions: [...(g1.reactions || []), ...(g2.reactions || [])]
    };

    output = renderStatBlock(fused, "Fused Golem");
  }

  document.getElementById("statblock").innerHTML = output;
}

// ====== EVENT HANDLERS ======
function setupEventListeners() {

  const modeEl = document.getElementById("mode");
  const golem2El = document.getElementById("golem2");

  if (modeEl && golem2El) {
    modeEl.addEventListener("change", () => {
      const mode = modeEl.value;
      golem2El.style.display =
        (mode === "multi" || mode === "fusion") ? "block" : "none";
      buildGolem();
    });
  }

  ["level","int","engine"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", debounce(buildGolem));
  });

  ["level2","int2","engine2"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", debounce(buildGolem));
  });

  ["infusions","infusions2"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", buildGolem);
  });
}

// ====== DEBOUNCE ======
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
