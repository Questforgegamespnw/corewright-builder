// =========================
// builder.js
// =========================

// =========================
// ENTER APP
// =========================
function enterApp() {
  document.getElementById('splash').style.display = 'none';
  document.getElementById('app').style.display = 'block';
}

// Create a base golem object
function createGolem(levelId, intId, engineId, infusionContainer) {
  const level = parseInt(document.getElementById(levelId).value) || 1;
  const intMod = parseInt(document.getElementById(intId).value) || 0;
  const player = {
    level,
    intMod,
    pb: Math.ceil((level - 1) / 4) + 1
  };

  let golem = {
    hp: 50,
    ac: 15,
    str: 14,
    con: 14,
    dex: 10,
    speed: 30,
    reach: 5
  };

  // Apply engine effects
  const engine = document.getElementById(engineId).value;
  if (engine === 'flame') golem.bonusDamage = intMod;
  if (engine === 'stone') golem.damageReduction = player.pb;
  if (engine === 'aether') golem.flySpeed = golem.speed;

  // Apply infusions
  getSelectedInfusions(infusionContainer).forEach(key => {
    if (INFUSIONS[key]?.apply) INFUSIONS[key].apply(golem, player);
  });

  return golem;
}

// Render stat block HTML
function renderStatBlock(golem, name) {
  return `
    <div class="stat-section">
      <div class="stat-name">${name}</div>
      <div><strong>AC:</strong> ${golem.ac} | <strong>HP:</strong> ${golem.hp}</div>
      <div>STR ${golem.str} DEX ${golem.dex} CON ${golem.con}</div>
      <div>Speed ${golem.speed} ft${golem.flySpeed ? ", Fly "+golem.flySpeed : ""}</div>
    </div>
  `;
}

// Build and display the golem(s)
function buildGolem() {
  const mode = document.getElementById('mode').value;
  const g1 = createGolem('level', 'int', 'engine', 'infusions');
  let output = '';

  if (mode === 'single') {
    output = renderStatBlock(g1, 'Golem');
  }

  if (mode === 'multi') {
    const g2 = createGolem('level2', 'int2', 'engine2', 'infusions2');
    output = renderStatBlock(g1, 'Golem One') + renderStatBlock(g2, 'Golem Two');
  }

  if (mode === 'fusion') {
    const g2 = createGolem('level2', 'int2', 'engine2', 'infusions2');
    const fused = {
      hp: g1.hp + g2.hp,
      ac: Math.max(g1.ac, g2.ac),
      str: Math.max(g1.str, g2.str),
      dex: Math.max(g1.dex, g2.dex),
      con: Math.max(g1.con, g2.con),
      speed: Math.max(g1.speed, g2.speed),
      reach: Math.max(g1.reach, g2.reach) + 5
    };
    output = renderStatBlock(fused, 'Fused Golem');
  }

  document.getElementById('statblock').innerHTML = output;
}

// Mode toggle: show/hide second golem
document.getElementById('mode').addEventListener('change', () => {
  const mode = document.getElementById('mode').value;
  document.getElementById('golem2').style.display = (mode === 'multi' || mode === 'fusion') ? 'block' : 'none';
  document.getElementById('infusions2').style.display = (mode === 'multi' || mode === 'fusion') ? 'block' : 'none';
  buildGolem();
});

// Auto-update when inputs change
['level','int','level2','int2','engine','engine2','mode'].forEach(id => {
  document.getElementById(id).addEventListener('input', debounce(buildGolem, 100));
});
['infusions','infusions2'].forEach(id => {
  document.getElementById(id).addEventListener('change', buildGolem);
});

// Debounce helper
function debounce(func, wait) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

// Save/Load/Share Builds
function saveBuild() {
  const name = prompt("Name your build:");
  if (!name) return;

  const build = {
    level: level.value,
    int: int.value,
    engine: engine.value,
    level2: level2.value,
    int2: int2.value,
    engine2: engine2.value,
    mode: mode.value,
    infusions: getSelectedInfusions('infusions'),
    infusions2: getSelectedInfusions('infusions2')
  };

  localStorage.setItem("corewright_" + name, JSON.stringify(build));
  alert("Saved!");
}

function loadBuild() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith("corewright_"));
  const names = keys.map(k => k.replace("corewright_","")).join("\n");
  const choice = prompt("Load build:\n"+names);
  if (!choice) return;

  const build = JSON.parse(localStorage.getItem("corewright_" + choice));
  level.value = build.level;
  int.value = build.int;
  engine.value = build.engine;
  level2.value = build.level2;
  int2.value = build.int2;
  engine2.value = build.engine2;
  mode.value = build.mode;

  document.querySelectorAll('#infusions input').forEach(cb => { cb.checked = build.infusions.includes(cb.value); });
  document.querySelectorAll('#infusions2 input').forEach(cb => { cb.checked = build.infusions2.includes(cb.value); });

  buildGolem();
}

function shareBuild() {
  const build = {
    level: level.value,
    int: int.value,
    engine: engine.value,
    level2: level2.value,
    int2: int2.value,
    engine2: engine2.value,
    mode: mode.value,
    infusions: getSelectedInfusions('infusions'),
    infusions2: getSelectedInfusions('infusions2')
  };
  const encoded = btoa(JSON.stringify(build));
  const url = `${location.origin}${location.pathname}?build=${encoded}`;
  navigator.clipboard.writeText(url);
  alert("Link copied!");
}

// Load from URL on page load
function loadFromURL() {
  const params = new URLSearchParams(location.search);
  const data = params.get('build');
  if (!data) return;

  const build = JSON.parse(atob(data));
  level.value = build.level;
  int.value = build.int;
  engine.value = build.engine;
  level2.value = build.level2;
  int2.value = build.int2;
  engine2.value = build.engine2;
  mode.value = build.mode;

  document.querySelectorAll('#infusions input').forEach(cb => { cb.checked = build.infusions.includes(cb.value); });
  document.querySelectorAll('#infusions2 input').forEach(cb => { cb.checked = build.infusions2.includes(cb.value); });

  buildGolem();
}

// Print & TXT Export
function printGolem() { window.print(); }

function downloadTxt() {
  let blob = new Blob([document.getElementById('statblock').innerText], {type:'text/plain'});
  let a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'golem.txt';
  a.click();
}

// Initialize
window.addEventListener('load', () => {
  loadFromURL();
  buildGolem();
});
