// builder.js

// Show the main app
function enterApp() {
  document.getElementById('splash').style.display = 'none';
  document.getElementById('app').style.display = 'block';
}

// RENDER INFUSIONS AS CARDS
function renderInfusions(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear existing

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
        span.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
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

  // COLLAPSIBLE BEHAVIOR
  let col = container.getElementsByClassName("collapsible");
  for (let i = 0; i < col.length; i++) {
    col[i].addEventListener("click", function() {
      this.classList.toggle("active");
      let content = this.nextElementSibling;
      content.style.display = content.style.display === "block" ? "none" : "block";
    });
  }
}

// INITIAL RENDER
renderInfusions("infusions");
renderInfusions("infusions2");

// GET SELECTED INFUSIONS
function getSelectedInfusions(container="infusions") {
  return [...document.querySelectorAll(`#${container} input:checked`)].map(cb => cb.value);
}

// CREATE GOLEM OBJECT
function createGolem(levelId, intId, engineId, infusionContainer) {
  const level = parseInt(document.getElementById(levelId).value);
  const intMod = parseInt(document.getElementById(intId).value);
  const pb = Math.ceil((level - 1)/4) + 1;

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
  if (engine === "stone") golem.damageReduction = pb;
  if (engine === "aether") golem.flySpeed = golem.speed;

  getSelectedInfusions(infusionContainer).forEach(key => {
    INFUSIONS[key]?.apply(golem, { level, intMod, pb });
  });

  return golem;
}

// RENDER STAT BLOCK
function renderStatBlock(golem, name) {
  return `
    <div class="stat-section">
      <div class="stat-name">${name}</div>
      <div><strong>AC</strong> ${golem.ac} | <strong>HP</strong> ${golem.hp}</div>
      <div>STR ${golem.str} DEX ${golem.dex} CON ${golem.con}</div>
      <div>Speed ${golem.speed} ft${golem.flySpeed ? ", fly " + golem.flySpeed : ""}</div>
    </div>
  `;
}

// BUILD GOLEM(S)
function buildGolem() {
  const mode = document.getElementById("mode").value;
  const g1 = createGolem("level", "int", "engine", "infusions");

  let output = "";

  if (mode === "single") {
    output = renderStatBlock(g1, "Golem");
  }

  if (mode === "multi") {
    const g2 = createGolem("level2", "int2", "engine2", "infusions2");
    output = renderStatBlock(g1, "Golem One") + renderStatBlock(g2, "Golem Two");
  }

  if (mode === "fusion") {
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

// MODE TOGGLE
document.getElementById("mode").addEventListener("change", () => {
  const mode = document.getElementById("mode").value;
  document.getElementById("golem2").style.display = (mode === "multi" || mode === "fusion") ? "block" : "none";
  buildGolem();
});

// DEBOUNCE & AUTO BUILD
let timeout;
function triggerBuild() {
  clearTimeout(timeout);
  timeout = setTimeout(buildGolem, 100);
}
["level","int","engine","mode","level2","int2","engine2"].forEach(id => {
  document.getElementById(id).addEventListener("input", triggerBuild);
});
document.getElementById("infusions").addEventListener("change", triggerBuild);
document.getElementById("infusions2").addEventListener("change", triggerBuild);

// SAVE BUILD
function saveBuild() {
  const name = prompt("Name your build:");
  if (!name) return;
  const build = {
    level: document.getElementById("level").value,
    int: document.getElementById("int").value,
    engine: document.getElementById("engine").value,
    infusions: getSelectedInfusions()
  };
  localStorage.setItem("corewright_" + name, JSON.stringify(build));
  alert("Saved!");
}

// LOAD BUILD
function loadBuild() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith("corewright_"));
  const names = keys.map(k => k.replace("corewright_", "")).join("\n");
  const choice = prompt("Load build:\n" + names);
  if (!choice) return;
  const build = JSON.parse(localStorage.getItem("corewright_" + choice));

  document.getElementById("level").value = build.level;
  document.getElementById("int").value = build.int;
  document.getElementById("engine").value = build.engine;

  document.querySelectorAll("#infusions input").forEach(cb => cb.checked = build.infusions.includes(cb.value));
  buildGolem();
}

// SHARE BUILD
function shareBuild() {
  const build = {
    level: document.getElementById("level").value,
    int: document.getElementById("int").value,
    engine: document.getElementById("engine").value,
    infusions: getSelectedInfusions()
  };
  const encoded = btoa(JSON.stringify(build));
  const url = `${location.origin}${location.pathname}?build=${encoded}`;
  navigator.clipboard.writeText(url);
  alert("Link copied!");
}

// LOAD FROM URL
function loadFromURL() {
  const params = new URLSearchParams(location.search);
  const data = params.get("build");
  if (!data) return;
  const build = JSON.parse(atob(data));

  document.getElementById("level").value = build.level;
  document.getElementById("int").value = build.int;
  document.getElementById("engine").value = build.engine;

  document.querySelectorAll("#infusions input").forEach(cb => cb.checked = build.infusions.includes(cb.value));
  buildGolem();
}

// PRINT & TXT
function printGolem() { window.print(); }
function downloadTxt() {
  const blob = new Blob([document.getElementById("statblock").innerText], { type:'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'golem.txt';
  a.click();
}

// INIT
window.addEventListener("load", () => {
  loadFromURL();
  buildGolem();
});
