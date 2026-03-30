// builder.js

// ====== APP ENTRY ======
function enterApp() {
  document.getElementById('splash').style.display = 'none';
  document.getElementById('app').style.display = 'block';
}

// ====== INFUSIONS RENDER ======
function renderInfusions(containerId) {
  const container = document.getElementById(containerId);

  if (!container) return; // 🔥 prevents crash

  container.innerHTML = ""; // Clear previous content

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

    // Checkbox
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

  // Collapsible logic
  Array.from(container.getElementsByClassName("collapsible")).forEach(col => {
    col.addEventListener("click", function() {
      this.classList.toggle("active");
      const content = this.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
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
  const level = parseInt(document.getElementById(levelId).value);
  const intMod = parseInt(document.getElementById(intId).value);

  const player = { level, intMod, pb: Math.ceil((level - 1)/4) + 1 };

  let golem = {
    hp: 50,
    ac: 15,
    str: 14,
    con: 14,
    dex: 10,
    speed: 30,
    reach: 5
  };

  const engine = document.getElementById(engineId).value;
  if (engine === "flame") golem.bonusDamage = intMod;
  if (engine === "stone") golem.damageReduction = player.pb;
  if (engine === "aether") golem.flySpeed = golem.speed;

  getSelectedInfusions(infusionContainer)
    .forEach(key => INFUSIONS[key]?.apply(golem, player));

  return golem;
}

// ====== STAT BLOCK RENDER ======
function renderStatBlock(golem, name) {

  let traits = [];

  if (golem.reactive) {
    traits.push("<strong>Reactive Plating:</strong> Deals damage to attackers.");
  }

  if (golem.anchored) {
    traits.push("<strong>Anchored Frame:</strong> Resistant to forced movement.");
  }

  if (golem.sentinel) {
    traits.push("<strong>Sentinel Protocol:</strong> Can react to enemy movement.");
  }

  if (golem.arcaneBoost) {
    traits.push("<strong>Arcane Conduit:</strong> Enhanced magical synergy.");
  }

  if (golem.overcharged) {
    traits.push("<strong>Overcharged Core:</strong> Increased damage output.");
  }

  if (golem.regen) {
    traits.push(`<strong>Self-Repair:</strong> Regains ${golem.regen} HP per turn.`);
  }

  if (golem.phase) {
    traits.push("<strong>Phase Shifter:</strong> Can become partially intangible.");
  }

  if (golem.adaptive) {
    traits.push("<strong>Adaptive Plating:</strong> Adjusts to incoming damage types.");
  }

  if (golem.replicate) {
    traits.push("<strong>Replication Matrix:</strong> Can duplicate effects.");
  }

  if (golem.elemental) {
    traits.push("<strong>Elemental Convergence:</strong> Attacks deal elemental damage.");
  }

  let traitBlock = traits.length
    ? `<div class="stat-section"><strong>Traits</strong><br>${traits.join("<br>")}</div>`
    : "";

  return `
    <div class="stat-section">
      <div class="stat-name">${name}</div>

      <div><strong>AC</strong> ${golem.ac} | <strong>HP</strong> ${golem.hp}</div>

      <div>STR ${golem.str} DEX ${golem.dex} CON ${golem.con}</div>

      <div>
        Speed ${golem.speed} ft
        ${golem.flySpeed ? `, Fly ${golem.flySpeed} ft` : ""}
      </div>

      ${golem.damageReduction ? `<div><strong>Damage Reduction:</strong> ${golem.damageReduction}</div>` : ""}
      ${golem.bonusDamage ? `<div><strong>Bonus Damage:</strong> +${golem.bonusDamage}</div>` : ""}

      ${traitBlock}

    </div>
  `;
}

// ====== BUILD LOGIC ======
function buildGolem() {
  const mode = document.getElementById("mode").value;
  const g1 = createGolem("level", "int", "engine", "infusions");
  let output = "";

  if (mode === "single") output = renderStatBlock(g1, "Golem");
  else if (mode === "multi") {
    const g2 = createGolem("level2", "int2", "engine2", "infusions2");
    output = renderStatBlock(g1, "Golem One") + renderStatBlock(g2, "Golem Two");
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
      reach: Math.max(g1.reach, g2.reach) + 5
    };
    output = renderStatBlock(fused, "Fused Golem");
  }

  document.getElementById("statblock").innerHTML = output;
}

// ====== EVENT HANDLERS ======
function setupEventListeners() {
  // Mode toggle
  document.getElementById("mode").addEventListener("change", () => {
    const mode = document.getElementById("mode").value;
    document.getElementById("golem2").style.display =
      (mode === "multi" || mode === "fusion") ? "block" : "none";
    buildGolem();
  });
}
  // Auto update inputs
["level","int","engine"].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("input", debounce(buildGolem));
  }
});

["level2","int2","engine2"].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("input", debounce(buildGolem));
  }
});

["infusions","infusions2"].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("change", buildGolem);
  }
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

// ====== SAVE / LOAD / SHARE ======
function saveBuild() {
  const name = prompt("Name your build:");
  if (!name) return;

  const build = {
    level: level.value,
    int: int.value,
    engine: engine.value,
    infusions: getSelectedInfusions("infusions")
  };

  localStorage.setItem("corewright_"+name, JSON.stringify(build));
  alert("Saved!");
}

function loadBuild() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith("corewright_"));
  const names = keys.map(k => k.replace("corewright_", "")).join("\n");
  const choice = prompt("Load build:\n"+names);
  if (!choice) return;

  const build = JSON.parse(localStorage.getItem("corewright_"+choice));

  level.value = build.level;
  int.value = build.int;
  engine.value = build.engine;
  document.querySelectorAll("#infusions input").forEach(cb => {
    cb.checked = build.infusions.includes(cb.value);
  });

  buildGolem();
}

function shareBuild() {
  const build = {
    level: level.value,
    int: int.value,
    engine: engine.value,
    infusions: getSelectedInfusions("infusions")
  };
  const encoded = btoa(JSON.stringify(build));
  const url = `${location.origin}${location.pathname}?build=${encoded}`;
  navigator.clipboard.writeText(url);
  alert("Link copied!");
}

// ====== LOAD FROM URL ======
function loadFromURL() {
  const params = new URLSearchParams(location.search);
  const data = params.get("build");
  if (!data) return;

  const build = JSON.parse(atob(data));
  level.value = build.level;
  int.value = build.int;
  engine.value = build.engine;
  document.querySelectorAll("#infusions input").forEach(cb => {
    cb.checked = build.infusions.includes(cb.value);
  });
  buildGolem();
}

// ====== PRINT / TXT ======
function printGolem() { window.print(); }

function downloadTxt() {
  let blob = new Blob([document.getElementById("statblock").innerText], {type:'text/plain'});
  let a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'golem.txt';
  a.click();
}

// ====== INIT ======
window.addEventListener("load", () => {
  renderInfusions("infusions");
  renderInfusions("infusions2");
  setupEventListeners();
  loadFromURL();
  buildGolem();
});
