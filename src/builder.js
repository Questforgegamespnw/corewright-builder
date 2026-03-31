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

function getAttackAbility(golem) {
  return golem.attackAbility === "dex" ? "dex" : "str";
}

function getAttackModifier(golem) {
  const ability = getAttackAbility(golem);
  return getMod(golem[ability] || 10);
}

function formatHeaderLine(label, value) {
  if (!value || (Array.isArray(value) && value.length === 0)) return "";

  if (Array.isArray(value)) {
    return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value.join(", "))}</p>`;
  }

  return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`;
}

function getPreviewText(item, player = null) {
  if (!item) return "";

  if (typeof item.preview === "function") {
    try {
      return item.preview(player || { level: 3, intMod: 3, pb: proficiencyBonus(3) }) || "";
    } catch {
      return "";
    }
  }

  if (typeof item.preview === "string") return item.preview;
  if (typeof item.summary === "string") return item.summary;
  if (typeof item.effect === "string") return item.effect;
  if (typeof item.details === "string") return item.details;
  if (typeof item.mechanics === "string") return item.mechanics;

  return "";
}

function getModeDisplayText(mode) {
  if (mode === "multi") return "Multi-Golem";
  if (mode === "fusion") return "Fusion Mode";
  return "Single Golem";
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
    damageReductionAll: 0,
    attackAbility: "str",

    selectedInfusionNames: [],
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
  return $(`#template${s}`)?.value || "none";
}

function setSelectedTemplateId(index = 1, id) {
  const s = suffix(index);
  const select = $(`#template${s}`);
  if (!select) return;
  select.value = id || "none";
}

function getSelectedEngineId(index = 1) {
  const s = suffix(index);
  return $(`#engine${s}`)?.value || "none";
}

function setSelectedEngineId(index = 1, id) {
  const s = suffix(index);
  const select = $(`#engine${s}`);
  if (!select) return;
  select.value = id || "none";
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
  return index === 2
    ? 'input[name="infusions2"]'
    : 'input[name="infusions"]';
}

function getSelectedInfusionIds(player, index = 1) {
  const checked = $all(getInfusionInputSelector(index)).filter((el) => el.checked);

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

function setSelectedInfusions(index = 1, ids = []) {
  const allowed = new Set(ids);
  $all(getInfusionInputSelector(index)).forEach((box) => {
    box.checked = allowed.has(box.value);
  });
}

function toggleInfusionSelection(id, index = 1) {
  const player = createPlayer(index);
  const infusion = getInfusionById(id);
  if (!infusion) return;

  if (infusion.prerequisiteLevel && player.level < infusion.prerequisiteLevel) {
    return;
  }

  const boxes = $all(getInfusionInputSelector(index));
  const box = boxes.find((el) => el.value === id);
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

function normalizeInfusionsForCapacity(index = 1) {
  const player = createPlayer(index);
  const capacity = Math.max(0, player.intMod);
  const selected = getSelectedInfusionIds(player, index);
  const trimmed = selected.slice(0, capacity);
  setSelectedInfusions(index, trimmed);
}

function enforceEngineRestrictions(index = 1) {
  const player = createPlayer(index);
  const selected = getSelectedEngineId(index);

  if (player.level < 15 && selected !== "none") {
    setSelectedEngineId(index, "none");
  }
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

  if (template && selectedTemplateId !== "none") {
    template.apply(golem, player);
    golem.templateName = template.name;
  }

  if (form && selectedFormId !== "none") {
    form.apply(golem, player);
    golem.formName = form.name;
  }

  if (engine && selectedEngineId !== "none") {
    engine.apply(golem, player);
    golem.engineName = engine.name;
  }

  for (const infusion of infusions) {
    infusion.apply(golem, player);
  }

  golem.selectedInfusionNames = infusions.map((i) => i.name);

  const totalHardness = (golem.hardness || 0) + (golem.hardnessBonus || 0);
  if (totalHardness > 0) {
    golem.traits.push(
      `Hardness ${totalHardness}. If the golem takes nonmagical bludgeoning, piercing, or slashing damage from a single source and that damage is equal to or less than ${totalHardness}, it takes no damage instead.`
    );
  }

  if ((golem.damageReductionAll || 0) > 0) {
    golem.traits.push(
      `Damage Reduction. Reduce all incoming damage by ${golem.damageReductionAll}.`
    );
  }

  return finalizeDerivedData(golem);
}

/* =========================
   Attack / Stat Block
========================= */

function buildSlamText(golem, player) {
  const attackAbility = getAttackAbility(golem);
  const attackMod = getAttackModifier(golem);
  const attackBonus = player.pb + attackMod;

  let text = `Slam. Melee Weapon Attack: +${attackBonus} to hit, reach ${golem.reach} ft., one target. Hit: 1d8 ${attackMod >= 0 ? "+" : "-"}${Math.abs(attackMod)} bludgeoning damage.`;

  if (golem.onHitEffects.length) {
    text += ` ${golem.onHitEffects.join(" ")}`;
  }

  if (attackAbility === "dex") {
    text += ` This attack uses Dexterity for its attack and damage rolls.`;
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

  const headerSection = `
    ${formatHeaderLine("Template", golem.templateName !== "None" ? golem.templateName : null)}
    ${formatHeaderLine("Construct Form", golem.formName !== "None" ? golem.formName : null)}
    ${formatHeaderLine("Infusions", golem.selectedInfusionNames)}
    ${formatHeaderLine("Engine Core", golem.engineName !== "None" ? golem.engineName : null)}
  `;

  return `
    <div class="stat-block">
      <div class="stat-block-header">
        <div class="creature-name">${escapeHtml(title)}</div>
        <div class="creature-meta"><em>${creatureSize} construct</em></div>
        ${headerSection}
      </div>

      <hr>

      <p><strong>Armor Class</strong> ${golem.ac}</p>
      <p><strong>Hit Points</strong> ${golem.hp}${golem.maxHp && golem.maxHp !== golem.hp ? ` (maximum ${golem.maxHp})` : ""}</p>
      <p><strong>Speed</strong> ${escapeHtml(speedText)}</p>

      <hr>

      <div class="ability-grid">
        <div class="ability-box"><strong>STR</strong>${golem.str} (${strMod})</div>
        <div class="ability-box"><strong>DEX</strong>${golem.dex} (${dexMod})</div>
        <div class="ability-box"><strong>CON</strong>${golem.con} (${conMod})</div>
        <div class="ability-box"><strong>INT</strong>${golem.int} (${intMod})</div>
        <div class="ability-box"><strong>WIS</strong>${golem.wis} (${wisMod})</div>
        <div class="ability-box"><strong>CHA</strong>${golem.cha} (${chaMod})</div>
      </div>

      <hr>

      <p><strong>Skills</strong> ${escapeHtml(skillsText)}</p>
      <p><strong>Damage Immunities</strong> ${escapeHtml(dmgImmText)}</p>
      <p><strong>Damage Resistances</strong> ${escapeHtml(dmgResText)}</p>
      <p><strong>Condition Immunities</strong> ${escapeHtml(condImmText)}</p>
      <p><strong>Senses</strong> ${escapeHtml(sensesText)}</p>
      <p><strong>Languages</strong> ${escapeHtml(languagesText)}</p>

      <hr>

      <div class="trait-block">
        <h4>Traits</h4>
        ${traitsHtml}
      </div>

      <div class="action-block">
        <h4>Actions</h4>
        ${actionsHtml}
      </div>

      <div class="reaction-block">
        <h4>Reactions</h4>
        ${reactionsHtml}
      </div>
    </div>
  `;
}

function renderSelectionSummaryBlock(player, templateId, engineId, formId, infusionIds, title) {
  const template = getTemplateById(templateId);
  const engine = getEngineById(engineId);
  const form = getConstructFormById(formId);
  const infusions = infusionIds.map(getInfusionById).filter(Boolean);

  return `
    <div class="summary-line">
      <strong>${escapeHtml(title)}</strong><br>
      Level ${player.level} | INT Mod ${player.intMod}<br>
      <strong>Template:</strong> ${escapeHtml(template?.name || "None")}<br>
      <strong>Construct Form:</strong> ${escapeHtml(form?.name || "None")}<br>
      <strong>Infusions:</strong> ${
        infusions.length ? infusions.map((i) => escapeHtml(i.name)).join(", ") : "None"
      }<br>
      <strong>Engine Core:</strong> ${escapeHtml(engine?.name || "None")}
    </div>
  `;
}

/* =========================
   UI Rendering
========================= */

function populateCompatibilitySelect(selectId, items, includeNone = true) {
  const select = $(`#${selectId}`);
  if (!select) return;

  const currentValue = select.value || "none";

  const options = [];
  if (includeNone) {
    options.push(`<option value="none">None</option>`);
  }

  for (const item of items) {
    if (includeNone && item.id === "none") continue;
    options.push(`<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}</option>`);
  }

  select.innerHTML = options.join("");

  const hasMatch = [...select.options].some((opt) => opt.value === currentValue);
  select.value = hasMatch ? currentValue : "none";
}

function renderTemplateCards(index = 1) {
  const s = suffix(index);
  const container = $(`#templates${s}`);
  if (!container) return;

  const player = createPlayer(index);
  const selectedId = getSelectedTemplateId(index);
  const radioName = index === 2 ? "templateCard2" : "templateCard";

  const allTemplates = [
    { id: "none", name: "None", tags: ["Base"], summary: "No material template applied." },
    ...TEMPLATES.filter((t) => t.id !== "none"),
  ];

  container.innerHTML = allTemplates
    .map((template) => {
      const checked = template.id === selectedId ? "checked" : "";
      const selectedClass = template.id === selectedId ? "selected" : "";
      const tags = (template.tags || [])
        .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
        .join("");

      const preview = getPreviewText(template, player);

      return `
        <label class="select-card template-card ${selectedClass}">
          <input type="radio" name="${radioName}" value="${escapeHtml(template.id)}" ${checked}>
          <div class="select-card-header">
            <strong>${escapeHtml(template.name)}</strong>
            <div class="card-tags">${tags}</div>
          </div>
          <div class="select-card-body">
            ${preview ? `<p>${escapeHtml(preview)}</p>` : ""}
          </div>
        </label>
      `;
    })
    .join("");
}

function renderConstructFormOptions(index = 1) {
  const s = suffix(index);
  const container = $(`#constructForms${s}`);
  if (!container) return;

  const player = createPlayer(index);
  const selectedId = getSelectedFormId(index);
  const radioName = index === 2 ? "constructFormCard2" : "constructFormCard";

  const forms = [
    { id: "none", name: "None", tags: ["Base"], summary: "No specialized construct form applied." },
    ...CONSTRUCT_FORMS.filter((f) => f.id !== "none"),
  ];

  container.innerHTML = forms
    .map((form) => {
      const checked = form.id === selectedId ? "checked" : "";
      const selectedClass = form.id === selectedId ? "selected" : "";
      const tags = (form.tags || [])
        .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
        .join("");

      const bodyText = getPreviewText(form, player);

      return `
        <label class="select-card form-card ${selectedClass}">
          <input type="radio" name="${radioName}" value="${escapeHtml(form.id)}" ${checked}>
          <div class="select-card-header">
            <strong>${escapeHtml(form.name)}</strong>
            <div class="card-tags">${tags}</div>
          </div>
          <div class="select-card-body">
            ${bodyText ? `<p>${escapeHtml(bodyText)}</p>` : ""}
          </div>
        </label>
      `;
    })
    .join("");
}

function renderEngineCards(index = 1) {
  const s = suffix(index);
  const container = $(`#engines${s}`);
  if (!container) return;

  const player = createPlayer(index);
  const selectedId = getSelectedEngineId(index);
  const radioName = index === 2 ? "engineCard2" : "engineCard";
  const enginesUnlocked = player.level >= 15;

  const cards = ENGINES.map((engine) => {
    const isNone = engine.id === "none";
    const selectable = isNone || enginesUnlocked;
    const checked = engine.id === selectedId ? "checked" : "";
    const selectedClass = engine.id === selectedId ? "selected" : "";
    const lockedClass = selectable ? "" : "locked";

    const tags = [
      engine.damageType ? `<span class="tag">${escapeHtml(engine.damageType)}</span>` : "",
      engine.role ? `<span class="tag">${escapeHtml(engine.role)}</span>` : "",
    ].join("");

    const preview = getPreviewText(engine, player);

    return `
      <label class="select-card engine-card ${selectedClass} ${lockedClass}">
        <input
          type="radio"
          name="${radioName}"
          value="${escapeHtml(engine.id)}"
          ${checked}
          ${!selectable ? "disabled" : ""}
        >
        <div class="select-card-header">
          <strong>${escapeHtml(engine.name)}</strong>
          <div class="card-tags">
            ${tags}
            ${!selectable ? `<span class="lock-note">Unlocks at 15</span>` : ""}
          </div>
        </div>
        <div class="select-card-body">
          ${preview ? `<p>${escapeHtml(preview)}</p>` : ""}
        </div>
      </label>
    `;
  }).join("");

  container.innerHTML = `
    ${!enginesUnlocked ? `<div class="section-note">Engine Cores unlock at level 17. Until then, only None is available.</div>` : ""}
    ${cards}
  `;
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

          const bodyText = getPreviewText(infusion, player);

          const prereq = infusion.prerequisiteLevel
            ? `<p class="prereq"><strong>Prerequisite:</strong> ${infusion.prerequisiteLevel}th level</p>`
            : "";

          return `
            <label
              class="select-card infusion-card ${selectedClass} ${lockedClass}"
              data-infusion-index="${index}"
              tabindex="0"
              role="button"
              aria-pressed="${checked ? "true" : "false"}"
            >
              <input
                type="checkbox"
                name="${checkboxName}"
                value="${escapeHtml(infusion.id)}"
                ${checked ? "checked" : ""}
                ${disabledAttr}
              >
              <div class="select-card-header">
                <strong>${escapeHtml(infusion.name)}</strong>
                <div class="card-tags">${tags}</div>
              </div>
              <div class="select-card-body">
                ${bodyText ? `<p>${escapeHtml(bodyText)}</p>` : ""}
                ${prereq}
              </div>
            </label>
          `;
        })
        .join("");

      return `
        <section class="infusion-group">
          <h3 class="infusion-group-title">${escapeHtml(label)}</h3>
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

  const slotCounter =
    $(`#infusionSlotCounter${s}`) ||
    $(`#infusionSlots${s}`) ||
    (index === 1 ? $("#infusionSlotCounter") : null);

  if (slotCounter) {
    slotCounter.textContent = `Infusion Slots: ${used} / ${capacity}`;
  }

  const player = createPlayer(index);
  const boxes = $all(getInfusionInputSelector(index));
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

function updateModeUI() {
  const mode = getMode();
  const showSecond = mode === "multi" || mode === "fusion";

  const golem2 = $("#golem2");
  const secondarySummary = $("#secondarySummary");
  const secondaryStatBlock = $("#secondaryStatBlock");
  const modeDisplay = $("#mode-display");

  if (golem2) {
    golem2.style.display = showSecond ? "block" : "none";
  }

  if (secondarySummary) {
    secondarySummary.style.display = showSecond ? "block" : "none";
  }

  if (secondaryStatBlock) {
    secondaryStatBlock.style.display = showSecond ? "block" : "none";
  }

  if (modeDisplay) {
    modeDisplay.value = getModeDisplayText(mode);
  }
}

function syncSelectedCardsFromHiddenInputs(index = 1) {
  const selectedTemplateId = getSelectedTemplateId(index);
  const selectedFormId = getSelectedFormId(index);
  const selectedEngineId = getSelectedEngineId(index);
  const selectedInfusions = new Set(getSelectedInfusionIds(createPlayer(index), index));

  const s = suffix(index);

  $all(`#templates${s} input[type="radio"]`).forEach((input) => {
    input.checked = input.value === selectedTemplateId;
    input.closest(".template-card")?.classList.toggle("selected", input.checked);
  });

  $all(`#constructForms${s} input[type="radio"]`).forEach((input) => {
    input.checked = input.value === selectedFormId;
    input.closest(".form-card")?.classList.toggle("selected", input.checked);
  });

  $all(`#engines${s} input[type="radio"]`).forEach((input) => {
    input.checked = input.value === selectedEngineId;
    input.closest(".engine-card")?.classList.toggle("selected", input.checked);
  });

  $all(`#infusions${s} input[type="checkbox"]`).forEach((input) => {
    input.checked = selectedInfusions.has(input.value);
    const card = input.closest(".infusion-card");
    if (card) {
      card.classList.toggle("selected", input.checked);
      card.setAttribute("aria-pressed", input.checked ? "true" : "false");
    }
  });
}

function setupAssemblyToggles() {
  $all(".assembly-toggle").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";

    const targetId = button.dataset.target;
    const content = targetId ? document.getElementById(targetId) : null;
    const icon = button.querySelector(".toggle-icon");

    if (!content) return;

    button.addEventListener("click", () => {
      content.classList.toggle("is-collapsed");
      const collapsed = content.classList.contains("is-collapsed");
      if (icon) icon.textContent = collapsed ? "+" : "−";
    });
  });
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

  if ($("#engine") && typeof state.engine !== "undefined") {
    $("#engine").value = state.engine;
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

  if ($("#engine2") && typeof state.engine2 !== "undefined") {
    $("#engine2").value = state.engine2;
  }

  setSelectedInfusions(1, state.infusions || []);
  setSelectedInfusions(2, state.infusions2 || []);
}

/* =========================
   Persistence
========================= */

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
   Render pipeline
========================= */

function populateAllCompatibilitySelects() {
  populateCompatibilitySelect("template", TEMPLATES, true);
  populateCompatibilitySelect("constructForm", CONSTRUCT_FORMS, true);
  populateCompatibilitySelect("engine", ENGINES, false);

  populateCompatibilitySelect("template2", TEMPLATES, true);
  populateCompatibilitySelect("constructForm2", CONSTRUCT_FORMS, true);
  populateCompatibilitySelect("engine2", ENGINES, false);
}

function renderSelectionPanels(index = 1) {
  normalizeInfusionsForCapacity(index);
  enforceEngineRestrictions(index);

  renderTemplateCards(index);
  renderConstructFormOptions(index);
  renderInfusionOptions(index);
  renderEngineCards(index);
  syncSelectedCardsFromHiddenInputs(index);
}

function renderPrimaryOutputs(mode) {
  const player1 = createPlayer(1);
  const templateId1 = getSelectedTemplateId(1);
  const engineId1 = getSelectedEngineId(1);
  const formId1 = getSelectedFormId(1);
  const infusionIds1 = getSelectedInfusionIds(player1, 1);

  updateInfusionCapacityDisplay(Math.max(0, player1.intMod), infusionIds1.length, 1);

  const golem1 = createGolem(player1, templateId1, engineId1, formId1, infusionIds1);

  const statBlock1 = $("#statBlockOutput") || $("#statBlock");
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

  return { player1, templateId1, engineId1, formId1, infusionIds1 };
}

function renderSecondaryOutputs(mode) {
  const secondarySummary = $("#secondarySummary");
  const secondaryStatBlock = $("#secondaryStatBlock");

  if (mode !== "multi" && mode !== "fusion") {
    if (secondarySummary) secondarySummary.innerHTML = "";
    if (secondaryStatBlock) secondaryStatBlock.innerHTML = "";
    return null;
  }

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

  return { player2, templateId2, engineId2, formId2, infusionIds2 };
}

function appendFusionSummaryNote(mode) {
  if (mode !== "fusion") return;

  const summary1 = $("#selectionSummary");
  if (!summary1) return;

  summary1.innerHTML += `
    <div class="summary-line">
      <strong>Fusion Mode</strong><br>
      Status: Fusion mode is active.<br>
      This currently preserves both component builds side-by-side so you can compare and stage a future fused stat block cleanly.
    </div>
  `;
}

function updateBuilder() {
  const mode = getMode();

  updateModeUI();
  renderSelectionPanels(1);
  renderSelectionPanels(2);
  renderPrimaryOutputs(mode);
  renderSecondaryOutputs(mode);
  appendFusionSummaryNote(mode);
  updateShareLink();
  saveBuild();
}

/* =========================
   Events
========================= */

function handleCardRadioChange(target) {
  if (target.closest("#templates2")) {
    setSelectedTemplateId(2, target.value);
    updateBuilder();
    return true;
  }

  if (target.closest("#templates")) {
    setSelectedTemplateId(1, target.value);
    updateBuilder();
    return true;
  }

  if (target.closest("#constructForms2")) {
    setSelectedFormId(2, target.value);
    updateBuilder();
    return true;
  }

  if (target.closest("#constructForms")) {
    setSelectedFormId(1, target.value);
    updateBuilder();
    return true;
  }

  if (target.closest("#engines2")) {
    setSelectedEngineId(2, target.value);
    updateBuilder();
    return true;
  }

  if (target.closest("#engines")) {
    setSelectedEngineId(1, target.value);
    updateBuilder();
    return true;
  }

  return false;
}

function bindEvents() {
  document.addEventListener("change", (event) => {
    const target = event.target;

    if (target.matches('#templates input[type="radio"], #templates2 input[type="radio"], #constructForms input[type="radio"], #constructForms2 input[type="radio"], #engines input[type="radio"], #engines2 input[type="radio"]')) {
      if (handleCardRadioChange(target)) return;
    }

    if (
      target.matches("#mode") ||
      target.matches("#level") ||
      target.matches("#intMod") ||
      target.matches("#template") ||
      target.matches("#constructForm") ||
      target.matches("#engine") ||
      target.matches("#level2") ||
      target.matches("#intMod2") ||
      target.matches("#template2") ||
      target.matches("#constructForm2") ||
      target.matches("#engine2") ||
      target.matches('input[name="infusions"]') ||
      target.matches('input[name="infusions2"]')
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
    const infusionCard = event.target.closest(".infusion-card");
    if (!infusionCard) return;

    const checkbox = infusionCard.querySelector('input[type="checkbox"]');
    if (!checkbox) return;

    const index = Number(infusionCard.dataset.infusionIndex || "1");

    event.preventDefault();
    toggleInfusionSelection(checkbox.value, index);
    updateBuilder();
  });

  document.addEventListener("keydown", (event) => {
    const infusionCard = event.target.closest(".infusion-card");
    if (!infusionCard) return;
    if (event.key !== "Enter" && event.key !== " ") return;

    const checkbox = infusionCard.querySelector('input[type="checkbox"]');
    if (!checkbox) return;

    const index = Number(infusionCard.dataset.infusionIndex || "1");

    event.preventDefault();
    toggleInfusionSelection(checkbox.value, index);
    updateBuilder();
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
      const statBlock = $("#statBlockOutput") || $("#statBlock");
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
  populateAllCompatibilitySelects();
  loadFromQueryString();
  loadBuild();
  populateAllCompatibilitySelects();
  setupAssemblyToggles();
  updateModeUI();
  bindEvents();
  updateBuilder();
}

document.addEventListener("DOMContentLoaded", initBuilder);