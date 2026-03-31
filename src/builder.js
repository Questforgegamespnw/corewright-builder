import { INFUSIONS } from "./data/infusions.js";
import { ENGINES } from "./data/engines.js";
import { TEMPLATES } from "./data/templates.js";
import { CONSTRUCT_FORMS } from "./data/constructForms.js";

/* =========================
   Helpers
========================= */

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function dedupe(arr) {
  return [...new Set((arr || []).filter(Boolean))];
}

function getMod(score) {
  return Math.floor((score - 10) / 2);
}

function formatMod(score) {
  const mod = getMod(score);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

function proficiencyBonus(level) {
  return Math.ceil(level / 4) + 1;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function suffix(n) {
  return n === 2 ? "2" : "";
}

/* =========================
   Data lookup
========================= */

function getTemplateById(id) {
  return TEMPLATES.find((t) => t.id === id) || null;
}

function getEngineById(id) {
  return ENGINES.find((e) => e.id === id) || null;
}

function getInfusionById(id) {
  return INFUSIONS.find((i) => i.id === id) || null;
}

function getConstructFormById(id) {
  return CONSTRUCT_FORMS.find((f) => f.id === id) || null;
}

/* =========================
   Base player + golem
========================= */

function createPlayer(index = 1) {
  const s = suffix(index);
  const levelEl = $(`#level${s}`);
  const intModEl = $(`#intMod${s}`);

  const level = clamp(parseInt(levelEl?.value || "3", 10) || 3, 1, 20);
  const intMod = clamp(parseInt(intModEl?.value || "3", 10) || 0, -5, 10);

  return {
    level,
    intMod,
    pb: proficiencyBonus(level),
  };
}

function createBaseGolem(player) {
  const baseHp = 12 * player.level;

  return {
    hp: baseHp,
    maxHp: baseHp,
    ac: 15,
    speed: 30,
    flySpeed: 0,
    climbSpeed: 0,
    swimSpeed: 0,
    size: "Medium",

    str: 14,
    dex: 10,
    con: 14,
    int: 6,
    wis: 10,
    cha: 5,

    reach: 5,

    skills: [],
    damageImmunities: ["poison"],
    damageResistances: [],
    conditionImmunities: ["charmed", "exhaustion", "poisoned"],
    senses: ["darkvision 60 ft.", "passive Perception 10"],
    languages: ["understands the languages of its creator but can't speak"],

    traits: [],
    actions: [],
    reactions: [],
    onHitEffects: [],

    multiattack: false,
    multiattackText: "",

    templateName: "None",
    engineName: "None",
    formName: "None",

    hardness: 0,
    hardnessBonus: 0,
  };
}

/* =========================
   Selection state
========================= */

function getMode() {
  return $("#mode")?.value || "single";
}

function getSelectedTemplateId(index = 1) {
  const s = suffix(index);
  return $(`#template${s}`)?.value || "stone";
}

function getSelectedEngineId(index = 1) {
  const s = suffix(index);

  const checkedCard = $(`#engines${s} input[type="radio"]:checked`);
  if (checkedCard) return checkedCard.value;

  const checkedGeneric = $(`input[name="engine${s || ""}"]:checked`);
  if (checkedGeneric) return checkedGeneric.value;

  const select = $(`#engine${s}`);
  if (select) return select.value;

  return "none";
}

function getSelectedFormId(index = 1) {
  const s = suffix(index);
  return $(`#constructForm${s}`)?.value || "none";
}

function setSelectedFormId(index = 1, id) {
  const s = suffix(index);
  const input = $(`#constructForm${s}`);
  if (!input) return;
  input.value = id || "none";
}

function getInfusionInputSelector(index = 1) {
  const s = suffix(index);
  if (index === 2) {
    return 'input[name="infusions2"]:checked, input.infusion-checkbox-2:checked';
  }
  return 'input[name="infusions"]:checked, input.infusion-checkbox:checked';
}

function getInfusionAllSelector(index = 1) {
  if (index === 2) {
    return 'input[name="infusions2"], input.infusion-checkbox-2';
  }
  return 'input[name="infusions"], input.infusion-checkbox';
}

function getSelectedInfusionIds(player, index = 1) {
  const checked = $all(getInfusionInputSelector(index));

  const ids = checked
    .map((el) => el.value)
    .filter((id) => {
      const infusion = getInfusionById(id);
      if (!infusion) return false;
      if (infusion.prerequisiteLevel && player.level < infusion.prerequisiteLevel) {
        return false;
      }
      return true;
    });

  const capacity = Math.max(0, player.intMod);
  return ids.slice(0, capacity);
}

function toggleInfusionSelection(id, index = 1) {
  const player = createPlayer(index);
  const infusion = getInfusionById(id);
  if (!infusion) return;

  if (infusion.prerequisiteLevel && player.level < infusion.prerequisiteLevel) {
    return;
  }

  const checkboxClass = index === 2 ? ".infusion-checkbox-2" : ".infusion-checkbox";
  const nameAttr = index === 2 ? "infusions2" : "infusions";

  const box = $(
    `input[name="${nameAttr}"][value="${CSS.escape(id)}"], ${checkboxClass}[value="${CSS.escape(id)}"]`
  );
  if (!box) return;

  if (box.checked) {
    box.checked = false;
    return;
  }

  const selectedIds = getSelectedInfusionIds(player, index);
  const capacity = Math.max(0, player.intMod);

  if (selectedIds.length >= capacity) {
    return;
  }

  box.checked = true;
}

/* =========================
   Golem construction
========================= */

function finalizeDerivedData(golem) {
  golem.skills = dedupe(golem.skills);
  golem.damageImmunities = dedupe(golem.damageImmunities);
  golem.damageResistances = dedupe(golem.damageResistances);
  golem.conditionImmunities = dedupe(golem.conditionImmunities);
  golem.senses = dedupe(golem.senses);
  golem.languages = dedupe(golem.languages);

  golem.hp = Math.max(1, golem.hp);
  golem.maxHp = Math.max(golem.hp, golem.maxHp || golem.hp);
  golem.ac = Math.max(1, golem.ac);
  golem.speed = Math.max(0, golem.speed);
  golem.flySpeed = Math.max(0, golem.flySpeed);
  golem.climbSpeed = Math.max(0, golem.climbSpeed || 0);
  golem.swimSpeed = Math.max(0, golem.swimSpeed || 0);
  golem.reach = Math.max(5, golem.reach || 5);

  return golem;
}

function createGolem(
  player,
  selectedTemplateId,
  selectedEngineId,
  selectedFormId,
  selectedInfusionIds = []
) {
  const golem = createBaseGolem(player);

  const template = getTemplateById(selectedTemplateId);
  const engine = getEngineById(selectedEngineId);
  const form = getConstructFormById(selectedFormId);
  const infusions = selectedInfusionIds.map(getInfusionById).filter(Boolean);

  if (template) {
    template.apply(golem, player);
    golem.templateName = template.name;
  }

  if (engine) {
    engine.apply(golem, player);
    golem.engineName = engine.name;
  }

  if (form && selectedFormId !== "none") {
    form.apply(golem, player);
    golem.formName = form.name;
  }

  for (const infusion of infusions) {
    infusion.apply(golem, player);
  }

  const totalHardness = (golem.hardness || 0) + (golem.hardnessBonus || 0);
  if (totalHardness > 0) {
    golem.traits.push(
      `Hardness. Reduce nonmagical bludgeoning, piercing, and slashing damage the golem takes by ${totalHardness}.`
    );
  }

  return finalizeDerivedData(golem);
}

/* =========================
   Attack / Stat Block
========================= */

function buildSlamText(golem, player) {
  const attackBonus = player.pb + getMod(golem.str);
  const damageBonus = getMod(golem.str);

  let text = `Slam. Melee Weapon Attack: +${attackBonus} to hit, reach ${golem.reach} ft., one target. Hit: 1d8 ${damageBonus >= 0 ? "+" : "-"}${Math.abs(damageBonus)} bludgeoning damage.`;

  if (golem.onHitEffects.length) {
    text += ` ${golem.onHitEffects.join(" ")}`;
  }

  return text;
}

function buildActionsList(golem, player) {
  const actions = [];

  if (golem.multiattack && golem.multiattackText) {
    actions.push(`Multiattack. ${golem.multiattackText}`);
  }

  actions.push(buildSlamText(golem, player));

  for (const action of golem.actions || []) {
    if (typeof action === "string") {
      actions.push(action);
    } else if (action?.name && action?.text) {
      actions.push(`${action.name}. ${action.text}`);
    }
  }

  return actions;
}

function buildReactionsList(golem) {
  return (golem.reactions || [])
    .map((reaction) => {
      if (typeof reaction === "string") return reaction;
      if (reaction?.name && reaction?.text) return `${reaction.name}. ${reaction.text}`;
      return "";
    })
    .filter(Boolean);
}

function buildSpeedText(golem) {
  const parts = [`${golem.speed} ft.`];

  if (golem.flySpeed) parts.push(`fly ${golem.flySpeed} ft.`);
  if (golem.climbSpeed) parts.push(`climb ${golem.climbSpeed} ft.`);
  if (golem.swimSpeed) parts.push(`swim ${golem.swimSpeed} ft.`);

  return parts.join(", ");
}

function renderStatBlock(golem, player, title = "Arcane Golem") {
  const strMod = formatMod(golem.str);
  const dexMod = formatMod(golem.dex);
  const conMod = formatMod(golem.con);
  const intMod = formatMod(golem.int);
  const wisMod = formatMod(golem.wis);
  const chaMod = formatMod(golem.cha);

  const speedText = buildSpeedText(golem);

  const creatureSize = escapeHtml(golem.size || "Medium");
  const skillsText = golem.skills.length ? golem.skills.join(", ") : "—";
  const dmgImmText = golem.damageImmunities.length ? golem.damageImmunities.join(", ") : "—";
  const dmgResText = golem.damageResistances.length ? golem.damageResistances.join(", ") : "—";
  const condImmText = golem.conditionImmunities.length ? golem.conditionImmunities.join(", ") : "—";
  const sensesText = golem.senses.length ? golem.senses.join(", ") : "—";
  const languagesText = golem.languages.length ? golem.languages.join(", ") : "—";

  const traitsHtml = (golem.traits || []).length
    ? golem.traits.map((t) => `<p>${escapeHtml(t)}</p>`).join("")
    : `<p>—</p>`;

  const actions = buildActionsList(golem, player);
  const actionsHtml = actions.length
    ? actions.map((a) => `<p>${escapeHtml(a)}</p>`).join("")
    : `<p>—</p>`;

  const reactions = buildReactionsList(golem);
  const reactionsHtml = reactions.length
    ? reactions.map((r) => `<p>${escapeHtml(r)}</p>`).join("")
    : `<p>—</p>`;

  return `
    <div class="stat-block">
      <div class="stat-block-header">
        <h2>${escapeHtml(title)}</h2>
        <p><em>${creatureSize} construct</em></p>
        <p><strong>Template:</strong> ${escapeHtml(golem.templateName)} &nbsp;|&nbsp; <strong>Engine:</strong> ${escapeHtml(golem.engineName)} &nbsp;|&nbsp; <strong>Form:</strong> ${escapeHtml(golem.formName)}</p>
      </div>

      <hr>

      <p><strong>Armor Class</strong> ${golem.ac}</p>
      <p><strong>Hit Points</strong> ${golem.hp}${golem.maxHp && golem.maxHp !== golem.hp ? ` (maximum ${golem.maxHp})` : ""}</p>
      <p><strong>Speed</strong> ${escapeHtml(speedText)}</p>

      <hr>

      <table class="ability-table">
        <thead>
          <tr>
            <th>STR</th>
            <th>DEX</th>
            <th>CON</th>
            <th>INT</th>
            <th>WIS</th>
            <th>CHA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${golem.str} (${strMod})</td>
            <td>${golem.dex} (${dexMod})</td>
            <td>${golem.con} (${conMod})</td>
            <td>${golem.int} (${intMod})</td>
            <td>${golem.wis} (${wisMod})</td>
            <td>${golem.cha} (${chaMod})</td>
          </tr>
        </tbody>
      </table>

      <hr>

      <p><strong>Skills</strong> ${escapeHtml(skillsText)}</p>
      <p><strong>Damage Immunities</strong> ${escapeHtml(dmgImmText)}</p>
      <p><strong>Damage Resistances</strong> ${escapeHtml(dmgResText)}</p>
      <p><strong>Condition Immunities</strong> ${escapeHtml(condImmText)}</p>
      <p><strong>Senses</strong> ${escapeHtml(sensesText)}</p>
      <p><strong>Languages</strong> ${escapeHtml(languagesText)}</p>

      <hr>

      <h3>Traits</h3>
      ${traitsHtml}

      <h3>Actions</h3>
      ${actionsHtml}

      <h3>Reactions</h3>
      ${reactionsHtml}
    </div>
  `;
}

function renderSelectionSummaryBlock(player, templateId, engineId, formId, infusionIds, title) {
  const template = getTemplateById(templateId);
  const engine = getEngineById(engineId);
  const form = getConstructFormById(formId);
  const infusions = infusionIds.map(getInfusionById).filter(Boolean);

  return `
    <div class="selection-summary-card">
      <h3>${escapeHtml(title)}</h3>
      <p><strong>Level:</strong> ${player.level}</p>
      <p><strong>INT Mod:</strong> ${player.intMod}</p>
      <p><strong>Template:</strong> ${escapeHtml(template?.name || "None")}</p>
      <p><strong>Engine:</strong> ${escapeHtml(engine?.name || "None")}</p>
      <p><strong>Form:</strong> ${escapeHtml(form?.name || "None")}</p>
      <p><strong>Infusions:</strong> ${
        infusions.length ? infusions.map((i) => escapeHtml(i.name)).join(", ") : "None"
      }</p>
    </div>
  `;
}

/* =========================
   UI Rendering
========================= */

function renderTemplateOptions(index = 1) {
  const s = suffix(index);
  const select = $(`#template${s}`);
  if (!select) return;

  const current = select.value || "none";

  select.innerHTML = TEMPLATES.map((template) => {
    const selected = template.id === current ? "selected" : "";
    return `<option value="${escapeHtml(template.id)}" ${selected}>${escapeHtml(template.name)}</option>`;
  }).join("");
}

function renderConstructFormOptions(index = 1) {
  const s = suffix(index);
  const container = $(`#constructForms${s}`);
  if (!container) return;

  const selectedId = getSelectedFormId(index);

  container.innerHTML = CONSTRUCT_FORMS.map((form) => {
    const selectedClass = form.id === selectedId ? "selected" : "";
    const tags = (form.tags || [])
      .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
      .join("");

    const bodyText = form.effect || form.details || form.mechanics || "";

    return `
      <div
        class="form-card ${selectedClass}"
        data-form-id="${escapeHtml(form.id)}"
        data-form-index="${index}"
        tabindex="0"
        role="button"
        aria-pressed="${form.id === selectedId ? "true" : "false"}"
      >
        <div class="form-card-inner">
          <div class="form-card-header">
            <strong>${escapeHtml(form.name)}</strong>
          </div>
          <div class="form-card-tags">${tags}</div>
          <p>${escapeHtml(bodyText)}</p>
        </div>
      </div>
    `;
  }).join("");
}

function renderEngineCards(index = 1) {
  const s = suffix(index);
  const container = $(`#engines${s}`);
  if (!container) return;

  const selectedId = getSelectedEngineId(index);
  const radioName = index === 2 ? "engine2" : "engine";

  container.innerHTML = ENGINES.map((engine) => {
    const checked = engine.id === selectedId ? "checked" : "";
    const selectedClass = engine.id === selectedId ? "selected" : "";
    const damageType = engine.damageType ? `<span class="tag">${escapeHtml(engine.damageType)}</span>` : "";
    const role = engine.role ? `<span class="tag">${escapeHtml(engine.role)}</span>` : "";

    return `
      <label class="engine-card ${selectedClass}">
        <input type="radio" name="${radioName}" value="${escapeHtml(engine.id)}" ${checked}>
        <div class="engine-card-inner">
          <div class="engine-card-header">
            <strong>${escapeHtml(engine.name)}</strong>
          </div>
          <div class="engine-card-tags">
            ${damageType}
            ${role}
          </div>
          <p>${escapeHtml(engine.summary || "")}</p>
        </div>
      </label>
    `;
  }).join("");
}

function renderInfusionOptions(index = 1) {
  const s = suffix(index);
  const container = $(`#infusions${s}`);
  if (!container) return;

  const player = createPlayer(index);
  const selectedIds = getSelectedInfusionIds(player, index);
  const capacity = Math.max(0, player.intMod);

  const tiers = [
    { key: "base", label: "Base Infusions" },
    { key: "advanced", label: "Advanced Infusions" },
    { key: "masterwork", label: "Masterwork Infusions" },
  ];

  const checkboxName = index === 2 ? "infusions2" : "infusions";
  const checkboxClass = index === 2 ? "infusion-checkbox-2" : "infusion-checkbox";

  container.innerHTML = tiers
    .map(({ key, label }) => {
      const items = INFUSIONS.filter((inf) => inf.tier === key);
      if (!items.length) return "";

      const cards = items
        .map((infusion) => {
          const checked = selectedIds.includes(infusion.id);
          const selectedClass = checked ? "selected" : "";

          const meetsLevel =
            !infusion.prerequisiteLevel || player.level >= infusion.prerequisiteLevel;

          const disabledAttr = !meetsLevel && !checked ? "disabled" : "";
          const lockedClass = !meetsLevel ? "locked" : "";

          const tags = (infusion.tags || [])
            .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
            .join("");

          const bodyText = infusion.effect || infusion.details || infusion.mechanics || "";

          const prereq = infusion.prerequisiteLevel
            ? `<p class="prereq"><strong>Prerequisite:</strong> ${infusion.prerequisiteLevel}th level</p>`
            : "";

          return `
            <label
              class="infusion-card ${selectedClass} ${lockedClass}"
              data-infusion-index="${index}"
              tabindex="0"
              role="button"
              aria-pressed="${checked ? "true" : "false"}"
            >
              <input
                class="${checkboxClass}"
                type="checkbox"
                name="${checkboxName}"
                value="${escapeHtml(infusion.id)}"
                ${checked ? "checked" : ""}
                ${disabledAttr}
              >
              <div class="infusion-card-inner">
                <div class="infusion-card-header">
                  <strong>${escapeHtml(infusion.name)}</strong>
                </div>
                <div class="infusion-card-tags">${tags}</div>
                <p>${escapeHtml(bodyText)}</p>
                ${prereq}
              </div>
            </label>
          `;
        })
        .join("");

      return `
        <section class="infusion-tier">
          <h3>${escapeHtml(label)}</h3>
          <div class="infusion-grid">
            ${cards}
          </div>
        </section>
      `;
    })
    .join("");

  updateInfusionCapacityDisplay(capacity, selectedIds.length, index);
}

function updateInfusionCapacityDisplay(capacity, used, index = 1) {
  const s = suffix(index);
  const slotCounter = $(`#infusionSlots${s}`);
  if (slotCounter) {
    slotCounter.textContent = `Infusion Slots: ${used} / ${capacity}`;
  }

  const player = createPlayer(index);
  const boxes = $all(getInfusionAllSelector(index));
  const checkedCount = boxes.filter((b) => b.checked).length;

  boxes.forEach((box) => {
    const infusion = getInfusionById(box.value);
    const lockedByLevel =
      infusion?.prerequisiteLevel && player.level < infusion.prerequisiteLevel;

    if (lockedByLevel) {
      box.disabled = true;
      return;
    }

    if (!box.checked) {
      box.disabled = checkedCount >= capacity;
    } else {
      box.disabled = false;
    }
  });
}

function updateCardSelectedStates() {
  $all(".engine-card").forEach((card) => {
    const input = card.querySelector('input[type="radio"]');
    card.classList.toggle("selected", !!input?.checked);
  });

  $all(".infusion-card").forEach((card) => {
    const input = card.querySelector('input[type="checkbox"]');
    const isSelected = !!input?.checked;
    card.classList.toggle("selected", isSelected);
    card.setAttribute("aria-pressed", isSelected ? "true" : "false");
  });

  $all(".form-card").forEach((card) => {
    const index = Number(card.dataset.formIndex || "1");
    const selectedFormId = getSelectedFormId(index);
    const isSelected = card.dataset.formId === selectedFormId;
    card.classList.toggle("selected", isSelected);
    card.setAttribute("aria-pressed", isSelected ? "true" : "false");
  });
}

function updateModeUI() {
  const mode = getMode();
  const golem2 = $("#golem2");
  const secondarySummary = $("#secondarySummary");
  const secondaryStatBlock = $("#secondaryStatBlock");

  const showSecond = mode === "multi" || mode === "fusion";

  if (golem2) {
    golem2.style.display = showSecond ? "block" : "none";
  }

  if (secondarySummary) {
    secondarySummary.style.display = showSecond ? "block" : "none";
  }

  if (secondaryStatBlock) {
    secondaryStatBlock.style.display = showSecond ? "block" : "none";
  }
}

/* =========================
   Save / Load / Share
========================= */

function getBuildState() {
  const player1 = createPlayer(1);
  const player2 = createPlayer(2);

  return {
    mode: getMode(),

    level: player1.level,
    intMod: player1.intMod,
    template: getSelectedTemplateId(1),
    engine: getSelectedEngineId(1),
    form: getSelectedFormId(1),
    infusions: getSelectedInfusionIds(player1, 1),

    level2: player2.level,
    intMod2: player2.intMod,
    template2: getSelectedTemplateId(2),
    engine2: getSelectedEngineId(2),
    form2: getSelectedFormId(2),
    infusions2: getSelectedInfusionIds(player2, 2),
  };
}

function applyBuildState(state) {
  if (!state) return;

  if ($("#mode") && typeof state.mode !== "undefined") {
    $("#mode").value = state.mode;
  }

  if ($("#level") && typeof state.level !== "undefined") {
    $("#level").value = state.level;
  }

  if ($("#intMod") && typeof state.intMod !== "undefined") {
    $("#intMod").value = state.intMod;
  }

  if ($("#template") && typeof state.template !== "undefined") {
    $("#template").value = state.template;
  }

  if ($("#constructForm") && typeof state.form !== "undefined") {
    setSelectedFormId(1, state.form);
  }

  if ($("#level2") && typeof state.level2 !== "undefined") {
    $("#level2").value = state.level2;
  }

  if ($("#intMod2") && typeof state.intMod2 !== "undefined") {
    $("#intMod2").value = state.intMod2;
  }

  if ($("#template2") && typeof state.template2 !== "undefined") {
    $("#template2").value = state.template2;
  }

  if ($("#constructForm2") && typeof state.form2 !== "undefined") {
    setSelectedFormId(2, state.form2);
  }

  const engineValue1 = state.engine || "none";
  const engineRadio1 = $(`input[name="engine"][value="${CSS.escape(engineValue1)}"]`);
  if (engineRadio1) {
    engineRadio1.checked = true;
  } else if ($("#engine")) {
    $("#engine").value = engineValue1;
  }

  const engineValue2 = state.engine2 || "none";
  const engineRadio2 = $(`input[name="engine2"][value="${CSS.escape(engineValue2)}"]`);
  if (engineRadio2) {
    engineRadio2.checked = true;
  } else if ($("#engine2")) {
    $("#engine2").value = engineValue2;
  }

  const infusionSet1 = new Set(state.infusions || []);
  $all('input[name="infusions"], input.infusion-checkbox').forEach((box) => {
    box.checked = infusionSet1.has(box.value);
  });

  const infusionSet2 = new Set(state.infusions2 || []);
  $all('input[name="infusions2"], input.infusion-checkbox-2').forEach((box) => {
    box.checked = infusionSet2.has(box.value);
  });
}

function saveBuild() {
  localStorage.setItem("corewright-build", JSON.stringify(getBuildState()));
}

function loadBuild() {
  const raw = localStorage.getItem("corewright-build");
  if (!raw) return;

  try {
    const state = JSON.parse(raw);
    applyBuildState(state);
  } catch (err) {
    console.error("Failed to load saved build:", err);
  }
}

function updateShareLink() {
  const shareEl = $("#shareLink");
  if (!shareEl) return;

  const state = getBuildState();
  const params = new URLSearchParams({
    mode: state.mode,

    level: String(state.level),
    intMod: String(state.intMod),
    template: state.template,
    engine: state.engine,
    form: state.form,
    infusions: state.infusions.join(","),

    level2: String(state.level2),
    intMod2: String(state.intMod2),
    template2: state.template2,
    engine2: state.engine2,
    form2: state.form2,
    infusions2: state.infusions2.join(","),
  });

  const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  shareEl.value = url;
}

function loadFromQueryString() {
  const params = new URLSearchParams(window.location.search);
  if (![...params.keys()].length) return;

  const state = {
    mode: params.get("mode") || undefined,

    level: params.get("level") || undefined,
    intMod: params.get("intMod") || undefined,
    template: params.get("template") || undefined,
    engine: params.get("engine") || undefined,
    form: params.get("form") || undefined,
    infusions: (params.get("infusions") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),

    level2: params.get("level2") || undefined,
    intMod2: params.get("intMod2") || undefined,
    template2: params.get("template2") || undefined,
    engine2: params.get("engine2") || undefined,
    form2: params.get("form2") || undefined,
    infusions2: (params.get("infusions2") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
  };

  applyBuildState(state);
}

/* =========================
   Main update cycle
========================= */

function updateBuilder() {
  const mode = getMode();
  updateModeUI();

  const player1 = createPlayer(1);
  const templateId1 = getSelectedTemplateId(1);
  const engineId1 = getSelectedEngineId(1);
  const formId1 = getSelectedFormId(1);
  const infusionIds1 = getSelectedInfusionIds(player1, 1);

  updateInfusionCapacityDisplay(Math.max(0, player1.intMod), infusionIds1.length, 1);

  const golem1 = createGolem(player1, templateId1, engineId1, formId1, infusionIds1);

  const statBlock1 = $("#statBlock");
  if (statBlock1) {
    statBlock1.innerHTML = renderStatBlock(
      golem1,
      player1,
      mode === "single" ? "Arcane Golem" : "Primary Golem"
    );
  }

  const summary1 = $("#selectionSummary");
  if (summary1) {
    summary1.innerHTML = renderSelectionSummaryBlock(
      player1,
      templateId1,
      engineId1,
      formId1,
      infusionIds1,
      mode === "single" ? "Golem Summary" : "Primary Golem"
    );
  }

  const secondarySummary = $("#secondarySummary");
  const secondaryStatBlock = $("#secondaryStatBlock");

  if (mode === "multi" || mode === "fusion") {
    const player2 = createPlayer(2);
    const templateId2 = getSelectedTemplateId(2);
    const engineId2 = getSelectedEngineId(2);
    const formId2 = getSelectedFormId(2);
    const infusionIds2 = getSelectedInfusionIds(player2, 2);

    updateInfusionCapacityDisplay(Math.max(0, player2.intMod), infusionIds2.length, 2);

    const golem2 = createGolem(player2, templateId2, engineId2, formId2, infusionIds2);

    if (secondarySummary) {
      secondarySummary.innerHTML = renderSelectionSummaryBlock(
        player2,
        templateId2,
        engineId2,
        formId2,
        infusionIds2,
        mode === "fusion" ? "Fusion Component B" : "Second Golem"
      );
    }

    if (secondaryStatBlock) {
      secondaryStatBlock.innerHTML = renderStatBlock(
        golem2,
        player2,
        mode === "fusion" ? "Fusion Component B" : "Second Golem"
      );
    }

    if (mode === "fusion" && summary1) {
      summary1.innerHTML += `
        <div class="selection-summary-card">
          <h3>Fusion Mode</h3>
          <p><strong>Status:</strong> Fusion mode is active.</p>
          <p>This currently preserves both component builds side-by-side so you can compare and stage a future fused stat block cleanly.</p>
        </div>
      `;
    }
  } else {
    if (secondarySummary) secondarySummary.innerHTML = "";
    if (secondaryStatBlock) secondaryStatBlock.innerHTML = "";
  }

  updateCardSelectedStates();
  updateShareLink();
  saveBuild();
}

/* =========================
   Events
========================= */

function bindEvents() {
  document.addEventListener("change", (event) => {
    const target = event.target;

    if (
      target.matches("#mode") ||
      target.matches("#level") ||
      target.matches("#intMod") ||
      target.matches("#template") ||
      target.matches("#level2") ||
      target.matches("#intMod2") ||
      target.matches("#template2") ||
      target.matches('input[name="engine"]') ||
      target.matches('input[name="engine2"]') ||
      target.matches("#engine") ||
      target.matches("#engine2") ||
      target.matches('input[name="infusions"]') ||
      target.matches('input[name="infusions2"]') ||
      target.matches(".infusion-checkbox") ||
      target.matches(".infusion-checkbox-2")
    ) {
      updateBuilder();
    }
  });

  document.addEventListener("input", (event) => {
    const target = event.target;

    if (
      target.matches("#level") ||
      target.matches("#intMod") ||
      target.matches("#level2") ||
      target.matches("#intMod2")
    ) {
      updateBuilder();
    }
  });

  document.addEventListener("click", (event) => {
    const formCard = event.target.closest(".form-card");
    if (formCard) {
      const clickedId = formCard.dataset.formId;
      const index = Number(formCard.dataset.formIndex || "1");
      const currentId = getSelectedFormId(index);

      if (clickedId === currentId) {
        setSelectedFormId(index, "none");
      } else {
        setSelectedFormId(index, clickedId);
      }

      renderConstructFormOptions(index);
      updateBuilder();
      return;
    }

    const infusionCard = event.target.closest(".infusion-card");
    if (infusionCard) {
      const checkbox = infusionCard.querySelector('input[type="checkbox"]');
      if (!checkbox) return;

      const index = Number(infusionCard.dataset.infusionIndex || "1");

      event.preventDefault();
      toggleInfusionSelection(checkbox.value, index);
      renderInfusionOptions(index);
      updateBuilder();
    }
  });

  document.addEventListener("keydown", (event) => {
    const formCard = event.target.closest(".form-card");
    if (formCard) {
      if (event.key !== "Enter" && event.key !== " ") return;

      event.preventDefault();

      const clickedId = formCard.dataset.formId;
      const index = Number(formCard.dataset.formIndex || "1");
      const currentId = getSelectedFormId(index);

      if (clickedId === currentId) {
        setSelectedFormId(index, "none");
      } else {
        setSelectedFormId(index, clickedId);
      }

      renderConstructFormOptions(index);
      updateBuilder();
      return;
    }

    const infusionCard = event.target.closest(".infusion-card");
    if (infusionCard) {
      if (event.key !== "Enter" && event.key !== " ") return;

      const checkbox = infusionCard.querySelector('input[type="checkbox"]');
      if (!checkbox) return;

      const index = Number(infusionCard.dataset.infusionIndex || "1");

      event.preventDefault();
      toggleInfusionSelection(checkbox.value, index);
      renderInfusionOptions(index);
      updateBuilder();
    }
  });

  const saveBtn = $("#saveBuild");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      saveBuild();
      updateBuilder();
    });
  }

  const loadBtn = $("#loadBuildBtn");
  if (loadBtn) {
    loadBtn.addEventListener("click", () => {
      loadBuild();
      renderTemplateOptions(1);
      renderTemplateOptions(2);
      renderConstructFormOptions(1);
      renderConstructFormOptions(2);
      renderEngineCards(1);
      renderEngineCards(2);
      renderInfusionOptions(1);
      renderInfusionOptions(2);
      updateBuilder();
    });
  }

  const printBtn = $("#printBuild");
  if (printBtn) {
    printBtn.addEventListener("click", () => window.print());
  }

  const copyBtn = $("#copyShareLink");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const shareEl = $("#shareLink");
      if (!shareEl) return;
      shareEl.select();
      shareEl.setSelectionRange(0, shareEl.value.length);

      try {
        await navigator.clipboard.writeText(shareEl.value);
      } catch {
        document.execCommand("copy");
      }
    });
  }

  const downloadBtn = $("#downloadTxt");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const statBlock = $("#statBlock");
      const statBlock2 = $("#secondaryStatBlock");
      if (!statBlock) return;

      let text = statBlock.innerText || statBlock.textContent || "";

      if (statBlock2 && statBlock2.innerText.trim()) {
        text += "\n\n" + (statBlock2.innerText || statBlock2.textContent || "");
      }

      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "corewright-golem.txt";
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    });
  }
}

/* =========================
   Init
========================= */

function initBuilder() {
  renderTemplateOptions(1);
  renderTemplateOptions(2);

  renderConstructFormOptions(1);
  renderConstructFormOptions(2);

  renderEngineCards(1);
  renderEngineCards(2);

  renderInfusionOptions(1);
  renderInfusionOptions(2);

  loadFromQueryString();
  loadBuild();

  renderTemplateOptions(1);
  renderTemplateOptions(2);

  renderConstructFormOptions(1);
  renderConstructFormOptions(2);

  renderEngineCards(1);
  renderEngineCards(2);

  renderInfusionOptions(1);
  renderInfusionOptions(2);

  updateModeUI();
  bindEvents();
  updateBuilder();
}

document.addEventListener("DOMContentLoaded", initBuilder);