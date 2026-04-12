import { INFUSIONS } from "./data/infusions.js";
import { ENGINES } from "./data/engines.js";
import { TEMPLATES } from "./data/templates.js";
import { CONSTRUCT_FORMS } from "./data/constructForms.js";
import { EXAMPLE_BUILDS } from "./data/exampleBuilds.js";
import { SPECIAL_CORES } from "./data/specialCores.js";
import {
  FORM_DESCRIPTORS,
  FORM_DESCRIPTORS_SAFE,
  TEMPLATE_DESCRIPTORS,
  TEMPLATE_DESCRIPTORS_SAFE,
  ENGINE_DESCRIPTORS,
  ENGINE_DESCRIPTORS_SAFE,
  INFUSION_DESCRIPTORS,
  INFUSION_DESCRIPTORS_SAFE,
  ART_STYLES,
  ART_STYLES_SAFE
} from "./data/descriptors.js";

/* =========================================================
   HELPERS
========================================================= */

/* ---------- DOM Helpers ---------- */
function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return Array.from(document.querySelectorAll(selector));
}
/* ---------- /DOM Helpers ---------- */


/* ---------- String + HTML Helpers ---------- */
function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugifyFilename(value) {
  return String(value || "corewright-golem")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleCase(str) {
  return String(str || "")
    .split(" ")
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ""))
    .join(" ");
}
/* ---------- /String + HTML Helpers ---------- */


/* ---------- Numeric Helpers ---------- */
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

function formatSigned(value) {
  const n = Number(value) || 0;
  return n >= 0 ? `+${n}` : `${n}`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function proficiencyBonus(level) {
  return Math.ceil(level / 4) + 1;
}

function suffix(n) {
  return n === 2 ? "2" : "";
}
/* ---------- /Numeric Helpers ---------- */


/* ---------- Array + Object Helpers ---------- */
function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

function arraysEqualAsSets(a = [], b = []) {
  if (a.length !== b.length) return false;

  const aSorted = [...a].sort();
  const bSorted = [...b].sort();

  return aSorted.every((value, index) => value === bSorted[index]);
}
/* ---------- /Array + Object Helpers ---------- */


/* ---------- Export Helpers ---------- */
function formatExportModifier(score) {
  const mod = getMod(score || 10);
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

function formatExportList(value, fallback = "None") {
  if (!value) return fallback;

  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : fallback;
  }

  return String(value).trim() ? String(value) : fallback;
}

function exportSection(title, items = []) {
  const normalized = (items || []).filter(Boolean);
  const lines = [title, "-".repeat(title.length)];

  if (!normalized.length) {
    lines.push("None.");
  } else {
    for (const item of normalized) {
      lines.push(item);
    }
  }

  lines.push("");
  return lines;
}
/* ---------- /Export Helpers ---------- */


/* ---------- Stat Block Export ---------- */
function buildSingleStatBlockExport(title, golem, player, meta = {}) {
  const lines = [];
  const buildName = ($("#saveName")?.value || "").trim();
  const speedText = buildSpeedText(golem);

  const actions = buildActionsList(golem, player)
    .map((action) => formatActionLine(action))
    .filter(Boolean);

  const reactions = buildReactionsList(golem)
    .map((reaction) => formatActionLine(reaction))
    .filter(Boolean);

  const groupedTraits = renderGroupedTraitText(golem.traits || []);

  lines.push(title);
  lines.push("=".repeat(title.length));
  lines.push("");

  if (buildName) lines.push(`Build Name: ${buildName}`);
  if (meta.modeLabel) lines.push(`Mode: ${meta.modeLabel}`);
  if (player.level !== undefined) lines.push(`Level: ${player.level}`);

  if (player.intMod !== undefined) {
    lines.push(`INT Mod: ${player.intMod >= 0 ? `+${player.intMod}` : player.intMod}`);
  }

  if (player.pb !== undefined) {
    lines.push(`Proficiency Bonus: +${player.pb}`);
  }

  lines.push(`Template: ${meta.templateName || "None"}`);
  lines.push(`Construct Form: ${meta.formName || "None"}`);
  lines.push(`Engine Core: ${meta.engineName || "None"}`);
  lines.push(`Special Core: ${meta.specialCoreName || "None"}`);
  lines.push(`Infusions: ${formatExportList(golem.selectedInfusionNames || [])}`);
  lines.push("");

  lines.push("CONSTRUCT STAT BLOCK");
  lines.push("--------------------");
  lines.push(`Armor Class: ${golem.ac}`);
  lines.push(
    `Hit Points: ${golem.hp}` +
      (golem.maxHp && golem.maxHp !== golem.hp ? ` (maximum ${golem.maxHp})` : "") +
      (golem.fusedTempHp ? ` + ${golem.fusedTempHp} temporary hit points` : "")
  );
  lines.push(`Speed: ${speedText}`);
  lines.push("");

  lines.push(`STR ${golem.str} (${formatExportModifier(golem.str)})`);
  lines.push(`DEX ${golem.dex} (${formatExportModifier(golem.dex)})`);
  lines.push(`CON ${golem.con} (${formatExportModifier(golem.con)})`);
  lines.push(`INT ${golem.int} (${formatExportModifier(golem.int)})`);
  lines.push(`WIS ${golem.wis} (${formatExportModifier(golem.wis)})`);
  lines.push(`CHA ${golem.cha} (${formatExportModifier(golem.cha)})`);
  lines.push("");

  lines.push(`Skills: ${formatExportList(golem.skills, "—")}`);
  lines.push(`Damage Immunities: ${formatExportList(golem.damageImmunities, "—")}`);
  lines.push(`Damage Resistances: ${formatExportList(golem.damageResistances, "—")}`);
  lines.push(`Condition Immunities: ${formatExportList(golem.conditionImmunities, "—")}`);
  lines.push(`Senses: ${formatExportList(golem.senses, "—")}`);
  lines.push(`Languages: ${formatExportList(golem.languages, "—")}`);
  lines.push("");

  lines.push("Traits");
  lines.push("------");
  lines.push(groupedTraits || "None.");
  lines.push("");

  lines.push(...exportSection("Actions", actions));
  lines.push(...exportSection("Reactions", reactions));

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function getStatBlockExportText() {
  const state = getBuildState();
  const mode = state.mode || "single";

  const player1 = createPlayer(1);
  const golem1 = createGolem(
  player1,
  state.template,
  state.engine,
  state.form,
  state.infusions || [],
  state.specialCore
);

  const template1 = getTemplateById(state.template);
  const form1 = getConstructFormById(state.form);
  const engine1 = getEngineById(state.engine);

  let displayGolem1 = golem1;
  let modeLabel = "Single Golem";

  if (mode === "fusion") {
    displayGolem1 = createFusionGolem(player1, golem1);
    modeLabel = "Fusion Mode";
  } else if (mode === "multi") {
    modeLabel = "Multi-Golem";
  } else if (mode === "awakened") {
    displayGolem1 = applyAwakenedCoreBenefits(player1, golem1);
    modeLabel = "Awakened Core";
  }

  const blocks = [
    buildSingleStatBlockExport(
      mode === "multi" ? "PRIMARY GOLEM" : "ARCANE GOLEM",
      displayGolem1,
      player1,
      {
        modeLabel,
        templateName: template1?.name || "None",
        formName: form1?.name || "None",
        engineName: engine1?.name || "None",
        specialCoreName: golem1.specialCoreName || "None"
      }
    )
  ];

  if (mode === "multi") {
    const player2 = createPlayer(2);
    const golem2 = createGolem(
      player2,
      state.template2,
      state.engine2,
      state.form2,
      state.infusions2 || [],
     "none"
);

    const template2 = getTemplateById(state.template2);
    const form2 = getConstructFormById(state.form2);
    const engine2 = getEngineById(state.engine2);

    blocks.push(
      buildSingleStatBlockExport(
        "SECOND GOLEM",
        golem2,
        player2,
        {
           modeLabel,
          templateName: template2?.name || "None",
          formName: form2?.name || "None",
          engineName: engine2?.name || "None",
          specialCoreName: "None"
        }
      )
    );
  }

  const result = blocks.join("\n\n");

  if (!result.trim()) {
    const statBlock1 = $("#statBlockOutput");
    return (statBlock1?.innerText || "").trim();
  }

  return result;
}
/* ---------- /Stat Block Export ---------- */


/* ---------- Combat Helpers ---------- */
function getAttackAbility(golem) {
  if (golem.attackAbilityMode === "bestOfStrDex") {
    const strMod = getMod(golem.str || 10);
    const dexMod = getMod(golem.dex || 10);
    return dexMod > strMod ? "dex" : "str";
  }

  return golem.attackAbility === "dex" ? "dex" : "str";
}

function getAttackModifier(golem) {
  const ability = getAttackAbility(golem);
  return getMod(golem[ability] || 10);
}
/* ---------- /Combat Helpers ---------- */


/* ---------- Render Micro Helpers ---------- */
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
  if (mode === "awakened") return "Awakened Core";
  if (mode === "multi") return "Multi-Golem";
  if (mode === "fusion") return "Fusion Mode";
  return "Single Golem";
}

function getPromptMode() {
  return $("#promptModeSelect")?.value || "standard";
}
/* ---------- /Render Micro Helpers ---------- */


/* ---------- Trait + Action Normalization ---------- */
function normalizeTraitEntry(entry, fallbackCategory = "Core Traits") {
  if (!entry) return null;

  if (typeof entry === "string") {
    return {
      category: fallbackCategory,
      text: entry
    };
  }

  if (typeof entry === "object" && entry.text) {
    return {
      category: entry.category || fallbackCategory,
      text: entry.text
    };
  }

  return null;
}

function pushTrait(target, category, text) {
  if (!target || !text) return;
  if (!target.traits) target.traits = [];

  target.traits.push({
    category: category || "Core Traits",
    text
  });
}

function normalizeActionEntry(action) {
  if (!action) return null;

  if (typeof action === "string") {
    return {
      name: "Action",
      text: action,
      isPreformatted: true
    };
  }

  if (typeof action === "object") {
    return {
      name: action.name || "Action",
      text: action.text || "",
      attackType: action.attackType || "",
      toHit: action.toHit ?? "",
      reach: action.reach || "",
      range: action.range || "",
      target: action.target || "one target",
      hit: action.hit || "",
      damageType: action.damageType || "",
      tag: action.tag || "",
      isPreformatted: !!action.isPreformatted
    };
  }

  return null;
}

function formatActionLine(action) {
  const a = normalizeActionEntry(action);
  if (!a) return "";

  if (a.isPreformatted && a.text) {
    return `**${a.name}.** ${a.text}`;
  }

  const parts = [];

  if (a.attackType) {
    parts.push(`*${a.attackType}:*`);
  }

  if (a.toHit !== "" && a.toHit !== null && a.toHit !== undefined) {
    const hitText = typeof a.toHit === "number" ? formatSigned(a.toHit) : a.toHit;
    parts.push(`${hitText} to hit,`);
  }

  if (a.reach) {
    parts.push(`reach ${a.reach},`);
  } else if (a.range) {
    parts.push(`range ${a.range},`);
  }

  if (a.target) {
    parts.push(`${a.target}.`);
  }

  let line = `**${a.name}.** ${parts.join(" ").replace(/\s+/g, " ").trim()}`;

  if (a.hit) {
    line += ` *Hit:* ${a.hit}`;
  }

  if (a.tag) {
    line += ` (${a.tag})`;
  }

  return line.trim();
}

function formatActionLineHtml(action) {
  const a = normalizeActionEntry(action);
  if (!a) return "";
  if (!a.name && !a.text) return "";
  if (a.isPreformatted && a.text) {
    return `<strong>${escapeHtml(a.name)}.</strong> ${escapeHtml(a.text)}`;
  }

  const parts = [];

  if (a.attackType) {
    parts.push(`<em>${escapeHtml(a.attackType)}:</em>`);
  }

  if (a.toHit !== "" && a.toHit !== null && a.toHit !== undefined) {
    const hitText = typeof a.toHit === "number" ? formatSigned(a.toHit) : a.toHit;
    parts.push(`${escapeHtml(hitText)} to hit,`);
  }

  if (a.reach) {
    parts.push(`reach ${escapeHtml(a.reach)},`);
  } else if (a.range) {
    parts.push(`range ${escapeHtml(a.range)},`);
  }

  if (a.target) {
    parts.push(`${escapeHtml(a.target)}.`);
  }

  let line = `<strong>${escapeHtml(a.name)}.</strong> ${parts.join(" ").replace(/\s+/g, " ").trim()}`;

  if (a.hit) {
    line += ` <em>Hit:</em> ${escapeHtml(a.hit)}`;
  }

  if (a.tag) {
    line += ` (${escapeHtml(a.tag)})`;
  }

  return line.trim();
}

function groupTraits(traits) {
  const grouped = {
    "Core Traits": [],
    "Engine Traits": [],
    "Template Traits": [],
    "Infusion Traits": [],
    "Special Traits": []
  };

  ensureArray(traits).forEach((entry) => {
    const normalized = normalizeTraitEntry(entry);
    if (!normalized) return;

    const category = grouped[normalized.category]
      ? normalized.category
      : "Core Traits";

    grouped[category].push(normalized.text);
  });

  return grouped;
}

function renderGroupedTraitText(traits) {
  const grouped = groupTraits(traits);
  const order = [
    "Core Traits",
    "Engine Traits",
    "Template Traits",
    "Infusion Traits",
    "Special Traits"
  ];

  return order
    .filter((section) => grouped[section].length)
    .map((section) => {
      const lines = grouped[section].map((text) => `• ${text}`).join("\n");
      return `${section}\n${lines}`;
    })
    .join("\n\n");
}
/* ---------- /Trait + Action Normalization ---------- */


/* =========================================================
   CONCEPT ART PROMPT SYSTEM
========================================================= */

function buildPromptRoleText({ formId, templateId, engineId, infusionIds = [] }) {
  const tags = [];

  if (formId === "brawler") tags.push("powerful frontline construct");
  if (formId === "predator") tags.push("fast, agile pursuit construct");
  if (formId === "bulwark") tags.push("immovable defensive guardian");
  if (formId === "strider") tags.push("swift skirmisher");
  if (formId === "artillery") tags.push("ranged support platform");
  if (formId === "climber") tags.push("vertical traversal specialist");
  if (formId === "aquatic") tags.push("water-adapted pursuit construct");
  if (formId === "glider") tags.push("aerial mobility construct");

  if (templateId === "stone") tags.push("heavy and enduring");
  if (templateId === "clay") tags.push("self-mending");
  if (templateId === "wood") tags.push("agile and hand-crafted");
  if (templateId === "metal") tags.push("heavily armored");
  if (templateId === "cloth") tags.push("light and uncanny");
  if (templateId === "bone") tags.push("sharp-featured and striking");
  if (templateId === "blood") tags.push("mysterious and alchemical");

  if (engineId === "flame") tags.push("radiating heat and fire");
  if (engineId === "frost") tags.push("cold and suppressive");
  if (engineId === "storm") tags.push("charged with speed and lightning");
  if (engineId === "aether") tags.push("arcane and levitating");
  if (engineId === "earth") tags.push("grounded and powerful");

  if (infusionIds.includes("war_construct")) tags.push("built for sustained action");
  if (infusionIds.includes("reinforced_frame")) tags.push("visibly reinforced");
  if (infusionIds.includes("accelerated_servos")) tags.push("built for sudden speed");
  if (infusionIds.includes("overcharged_core")) tags.push("brightly energized");
  if (infusionIds.includes("cognitive_matrix")) tags.push("eerily intelligent");
  if (infusionIds.includes("colossus")) tags.push("monumental in scale");

  return tags.length ? tags.join(", ") : "arcane, hand-crafted, and battle-ready";
}

function buildPromptPoseText({ formId, engineId }) {
  if (formId === "predator") return "in a low, agile motion pose";
  if (formId === "bulwark") return "braced in a defensive guard stance";
  if (formId === "strider") return "in a fast-moving skirmisher stride";
  if (formId === "artillery") return "locked into a ranged casting stance";
  if (formId === "climber") return "clinging to a wall or descending from above";
  if (formId === "aquatic") return "moving through water with smooth control";
  if (formId === "glider") return "gliding downward in a controlled descent";
  if (engineId === "storm") return "surging forward with crackling momentum";
  if (engineId === "flame") return "standing amid heat shimmer and ember glow";
  return "standing in a ready stance";
}

function generateConceptArtPrompt({
  formId,
  templateId,
  engineId,
  infusionIds = [],
  style = "sheet"
}) {
  const mode = getPromptMode();
  const isSafe = mode === "safe";

  const formMap = isSafe ? FORM_DESCRIPTORS_SAFE : FORM_DESCRIPTORS;
  const templateMap = isSafe ? TEMPLATE_DESCRIPTORS_SAFE : TEMPLATE_DESCRIPTORS;
  const engineMap = isSafe ? ENGINE_DESCRIPTORS_SAFE : ENGINE_DESCRIPTORS;
  const infusionMap = isSafe ? INFUSION_DESCRIPTORS_SAFE : INFUSION_DESCRIPTORS;
  const styleMap = isSafe ? ART_STYLES_SAFE : ART_STYLES;

  const formText =
    formMap[formId] ||
    "artificer-built magical construct with a clear silhouette";

  const templateText =
    templateMap[templateId] ||
    "crafted arcane chassis with readable material detail";

  const engineText =
    engineMap[engineId] ||
    "faint magical energy housed in its core";

  const infusionText = infusionIds
    .map((id) => infusionMap[id])
    .filter(Boolean)
    .join(", ");

  const roleText = buildPromptRoleText({ formId, templateId, engineId, infusionIds });
  const poseText = buildPromptPoseText({ formId, engineId });
  const styleText = styleMap[style] || styleMap.sheet;

  return [
    "Fantasy construct concept art, a magically animated artificer-built golem, full-body illustration, clear readable silhouette.",
    "",
    `Base form: ${formText}.`,
    `Material chassis: ${templateText}.`,
    `Engine core: ${engineText}.`,
    `Visible upgrades: ${infusionText || "minimal external upgrades, clean chassis lines, and restrained magical detailing"}.`,
    "",
    `The construct should look hand-crafted but arcane, with believable joints, reinforced plating, engraved runes, magical core housing, and elegant mechanical anatomy. Emphasize ${roleText}. Pose it ${poseText}.`,
    "",
    styleText
  ].join("\n");
}

function renderConceptArtPrompt(primary, secondary, mode) {
  const output = $("#conceptArtPromptOutput");
  if (!output) return;

  let text = generateConceptArtPrompt(primary);

  if ((mode === "multi" || mode === "fusion") && secondary) {
    text += `\n\n--- SECOND GOLEM ---\n\n`;
    text += generateConceptArtPrompt(secondary);
  }

  output.value = text;
}

async function copyConceptArtPrompt() {
  const output = $("#conceptArtPromptOutput");
  const button = $("#copyConceptArtPromptBtn");
  if (!output) return;

  const text = output.value || "";
  if (!text.trim()) return;

  let copied = false;

  try {
    await navigator.clipboard.writeText(text);
    copied = true;
  } catch {
    try {
      output.removeAttribute("readonly");
      output.focus();
      output.select();
      output.setSelectionRange(0, text.length);
      copied = document.execCommand("copy");
      output.setAttribute("readonly", "readonly");
    } catch {
      output.setAttribute("readonly", "readonly");
      copied = false;
    }
  }

  if (button) {
    const originalText = button.textContent;
    button.textContent = copied ? "Copied!" : "Press Ctrl+C";

    setTimeout(() => {
      button.textContent = originalText;
    }, 1400);
  }
}

/* =========================================================
   DATA LOOKUP
========================================================= */

function getTemplateById(id) {
  return TEMPLATES.find((t) => t.id === id) || null;
}

function getEngineById(id) {
  return ENGINES.find((e) => e.id === id) || null;
}

function getSpecialCoreById(id) {
  return SPECIAL_CORES.find((sc) => sc.id === id) || null;
}

function getInfusionById(id) {
  return INFUSIONS.find((i) => i.id === id) || null;
}

function getConstructFormById(id) {
  return CONSTRUCT_FORMS.find((f) => f.id === id) || null;
}

function getExampleBuildById(id) {
  return EXAMPLE_BUILDS.find((b) => b.id === id) || null;
}

/* =========================================================
   BASE PLAYER + GOLEM
========================================================= */

function createPlayer(index = 1) {
  const s = suffix(index);
  const levelEl = $(`#level${s}`);
  const intModEl = $(`#intMod${s}`);

  const level = clamp(parseInt(levelEl?.value || "3", 10) || 3, 1, 20);
  const intMod = clamp(parseInt(intModEl?.value || "3", 10) || 0, -5, 10);

  return {
    level,
    intMod,
    pb: proficiencyBonus(level)
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
    specialCoreName: "None",
    formName: "None",
    
    hardness: 0,
    hardnessBonus: 0,
    damageReductionAll: 0,
    attackAbility: "str",

    selectedInfusionNames: []
  };
}

/* =========================================================
   SELECTION STATE
========================================================= */

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

function getSelectedSpecialCoreId() {
  return $("#specialCore")?.value || "none";
}

function setSelectedSpecialCoreId(id) {
  const select = $("#specialCore");
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
  return index === 2 ? 'input[name="infusions2"]' : 'input[name="infusions"]';
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
function enforceSpecialCoreRestrictions() {
  const player = createPlayer(1);
  const selected = getSelectedSpecialCoreId();

  if (player.level < 15 && selected !== "none") {
    setSelectedSpecialCoreId("none");
  }
}

function enforceCapstoneModeRestrictions() {
  const level = createPlayer(1).level;
  const modeSelect = $("#mode");
  const modeLockNote = $("#modeLockNote");

  if (!modeSelect) return;

  const awakenedOption = modeSelect.querySelector('option[value="awakened"]');
  const multiOption = modeSelect.querySelector('option[value="multi"]');
  const fusionOption = modeSelect.querySelector('option[value="fusion"]');

  const capstoneUnlocked = level >= 17;

  if (awakenedOption) awakenedOption.disabled = !capstoneUnlocked;
  if (multiOption) multiOption.disabled = !capstoneUnlocked;
  if (fusionOption) fusionOption.disabled = !capstoneUnlocked;

  if (
    !capstoneUnlocked &&
    (
      modeSelect.value === "awakened" ||
      modeSelect.value === "multi" ||
      modeSelect.value === "fusion"
    )
  ) {
    modeSelect.value = "single";
  }

  if (modeLockNote) {
    modeLockNote.style.display = capstoneUnlocked ? "none" : "block";
  }
}

/* =========================================================
   GOLEM CONSTRUCTION
========================================================= */

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
  selectedInfusionIds = [],
  selectedSpecialCoreId = "none"
)

{
  const golem = createBaseGolem(player);

  const template = getTemplateById(selectedTemplateId);
  const engine = getEngineById(selectedEngineId);
  const specialCore = getSpecialCoreById(selectedSpecialCoreId);
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

  if (specialCore && selectedSpecialCoreId !== "none") {
  specialCore.apply(golem, player);
  golem.specialCoreName = specialCore.name;
}

  for (const infusion of infusions) {
    infusion.apply(golem, player);
  }

  golem.selectedInfusionNames = infusions.map((i) => i.name);

  const totalHardness = (golem.hardness || 0) + (golem.hardnessBonus || 0);
  if (totalHardness > 0) {
    pushTrait(
      golem,
      "Core Traits",
      `Hardness ${totalHardness}. If the golem takes nonmagical bludgeoning, piercing, or slashing damage from a single source and that damage is equal to or less than ${totalHardness}, it takes no damage instead.`
    );
  }

  if ((golem.damageReductionAll || 0) > 0) {
    pushTrait(
      golem,
      "Core Traits",
      `Damage Reduction. Reduce all incoming damage by ${golem.damageReductionAll}.`
    );
  }

  golem.traits = ensureArray(golem.traits)
    .map((trait) => normalizeTraitEntry(trait, "Core Traits"))
    .filter(Boolean);

  golem.actions = ensureArray(golem.actions)
    .map((action) => normalizeActionEntry(action))
    .filter(Boolean);

  golem.reactions = ensureArray(golem.reactions)
    .map((reaction) => normalizeActionEntry(reaction))
    .filter(Boolean);

  return finalizeDerivedData(golem);
}

function createFusionGolem(player, golem) {
  const fusion = JSON.parse(JSON.stringify(golem));
  const intBonus = player.intMod;

  fusion.attackAbilityMode = "bestOfStrDex";
  fusion.canDeliverTouchSpells = true;
  fusion.fusedTempHp = player.level;
  fusion.fusionState = true;

  fusion.traits = ensureArray(fusion.traits)
    .map((trait) => normalizeTraitEntry(trait, "Core Traits"))
    .filter(Boolean);

  pushTrait(
    fusion,
    "Special Traits",
    "Corewright Fusion. The artificer and construct are merged into a single fused form for up to 1 minute. The fused form acts on the artificer's turn and doesn't require commands to take actions."
  );
  pushTrait(
    fusion,
    "Special Traits",
    `Arcane Co-Pilot. Once on each of its turns, the fused form can add ${intBonus >= 0 ? `+${intBonus}` : intBonus} to the damage of one attack it makes.`
  );
  pushTrait(
    fusion,
    "Special Traits",
    `Overclocked Conduit Frame. The fused form gains a +2 bonus to spell attack rolls and to its spell save DC. In addition, once on each of its turns when it casts a spell that deals damage, it can add ${intBonus >= 0 ? `+${intBonus}` : intBonus} to one damage roll of that spell.`
  );
  pushTrait(
    fusion,
    "Special Traits",
    "Integrated Combat Matrix. The fused form can use Strength or Dexterity, whichever is higher, for the attack and damage rolls of its weapon attacks."
  );
  pushTrait(
    fusion,
    "Special Traits",
    "Spell Conduit. When you cast a spell with a range of touch, the fused form can deliver the spell as if it were the caster."
  );
  pushTrait(
    fusion,
    "Special Traits",
    `Unified Vitality. When the fusion begins, the fused form gains ${player.level} temporary hit points.`
  );
  pushTrait(
    fusion,
    "Special Traits",
    "If the fused form is reduced to 0 hit points, the fusion ends and the construct's body is destroyed, though its core remains intact. The artificer is separated and cannot reconstruct the golem until finishing a long rest."
  );
  pushTrait(
    fusion,
    "Special Traits",
    "The artificer can end the fusion early (no action required). If the construct still has hit points when the fusion ends, it remains active and functions as normal."
  );

  return fusion;
}

function applyAwakenedCoreBenefits(player, golem) {
  const awakened = JSON.parse(JSON.stringify(golem));

  awakened.int = Math.max(awakened.int || 0, 16);
  awakened.wis = Math.max(awakened.wis || 0, 14);
  awakened.cha = Math.max(awakened.cha || 0, 14);

  awakened.awakenedSkills = [
    "Investigation",
    "Perception",
    "Insight",
    "Persuasion",
    "Intimidation"
  ];

  awakened.traits = ensureArray(awakened.traits)
    .map((trait) => normalizeTraitEntry(trait, "Core Traits"))
    .filter(Boolean);

  pushTrait(
    awakened,
    "Special Traits",
    "Awakened Cognition. The construct's Intelligence score becomes 16, its Wisdom score becomes 14, and its Charisma score becomes 14, unless a score is already higher."
  );
  pushTrait(
    awakened,
    "Special Traits",
    "Autonomous Reasoning. The awakened construct can independently take skill-based actions, including Search, Study, and Influence, as the situation requires."
  );
  pushTrait(
    awakened,
    "Special Traits",
    "Awakened Skills. The construct is proficient in Investigation, Perception, Insight, Persuasion, and Intimidation."
  );

  return awakened;
}

/* =========================================================
   ATTACK + STAT BLOCK
========================================================= */

function buildSlamAction(golem, player) {
  const attackAbility = getAttackAbility(golem);
  const attackMod = getAttackModifier(golem);
  const attackBonus = player.pb + attackMod;
  const damageDie = golem.slamDamageDie || "1d8";

  let hitText = `${damageDie} ${attackMod >= 0 ? "+" : "-"} ${Math.abs(attackMod)} bludgeoning damage`
    .replace(/\s+/g, " ")
    .trim();

  if (golem.onHitEffects.length) {
    hitText += ` ${golem.onHitEffects.join(" ")}`;
  }

  if (golem.attackAbilityMode === "bestOfStrDex") {
    hitText += ` This attack uses Strength or Dexterity, whichever is higher, for its attack and damage rolls.`;
  } else if (attackAbility === "dex") {
    hitText += ` This attack uses Dexterity for its attack and damage rolls.`;
  }

  return {
    name: "Slam",
    attackType: "Melee Weapon Attack",
    toHit: attackBonus,
    reach: `${golem.reach} ft.`,
    target: "one target",
    hit: hitText
  };
}

function buildRangedAttackAction(golem, player) {
  const attackAbility = getAttackAbility(golem);
  const attackMod = getAttackModifier(golem);
  const attackBonus = player.pb + attackMod;

  const attackName = golem.rangedAttack?.name || "Arcane Bolt";
  const range = golem.rangedAttack?.range || "60/240 ft.";
  const damageDie = golem.rangedAttack?.damageDie || "1d10";
  const damageType = golem.rangedAttack?.damageType || "force";

  let hitText = `${damageDie} ${attackMod >= 0 ? "+" : "-"} ${Math.abs(attackMod)} ${damageType} damage`
    .replace(/\s+/g, " ")
    .trim();

  if (golem.onHitEffects.length) {
    hitText += ` ${golem.onHitEffects.join(" ")}`;
  }

  if (golem.attackAbilityMode === "bestOfStrDex") {
    hitText += ` This attack uses Strength or Dexterity, whichever is higher, for its attack and damage rolls.`;
  } else if (attackAbility === "dex") {
    hitText += ` This attack uses Dexterity for its attack and damage rolls.`;
  }

  return {
    name: attackName,
    attackType: "Ranged Weapon Attack",
    toHit: attackBonus,
    range,
    target: "one target",
    hit: hitText
  };
}

function buildActionsList(golem, player) {
  const actions = [];

  if (golem.multiattack && golem.multiattackText) {
    actions.push({
      name: "Multiattack",
      text: golem.multiattackText,
      isPreformatted: true
    });
  }

  if (golem.primaryAttackMode === "ranged") {
    actions.push(buildRangedAttackAction(golem, player));
    actions.push(buildSlamAction(golem, player));
  } else {
    actions.push(buildSlamAction(golem, player));
  }

  for (const action of golem.actions || []) {
    actions.push(action);
  }

  return actions.filter(Boolean);
}

function buildReactionsList(golem) {
  return ensureArray(golem.reactions).filter(Boolean);
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

  const awakenedSkillsText = (golem.awakenedSkills || []).length
    ? golem.awakenedSkills
        .map((skill) => {
          const skillKey = skill.toLowerCase();

          let abilityMod = 0;
          if (skillKey === "investigation") {
            abilityMod = getMod(golem.int || 10);
          } else if (skillKey === "perception" || skillKey === "insight") {
            abilityMod = getMod(golem.wis || 10);
          } else if (skillKey === "persuasion" || skillKey === "intimidation") {
            abilityMod = getMod(golem.cha || 10);
          }

          const total = abilityMod + player.pb;
          const signed = total >= 0 ? `+${total}` : `${total}`;
          return `${skill} ${signed}`;
        })
        .join(", ")
    : "";

  const groupedTraits = groupTraits(golem.traits || []);
  const traitOrder = [
    "Core Traits",
    "Engine Traits",
    "Template Traits",
    "Infusion Traits",
    "Special Traits"
  ];

  const traitsHtml =
    traitOrder
      .filter((section) => groupedTraits[section]?.length)
      .map((section) => {
        const entries = groupedTraits[section]
          .map((text) => `<p>• ${escapeHtml(text)}</p>`)
          .join("");

        return `
          <div class="trait-group">
            <h5>${escapeHtml(section)}</h5>
            ${entries}
          </div>
        `;
      })
      .join("") || `<p>—</p>`;

    const actions = buildActionsList(golem, player);
  const actionsHtml = actions.length
    ? actions.map((a) => `<p>${formatActionLineHtml(a)}</p>`).join("")
    : `<p>—</p>`;

  const reactions = buildReactionsList(golem);
  const reactionsHtml = reactions.length
    ? reactions.map((r) => `<p>${formatActionLineHtml(r)}</p>`).join("")
    : `<p>—</p>`;

  const headerSection = `
    ${formatHeaderLine("Template", golem.templateName !== "None" ? golem.templateName : null)}
    ${formatHeaderLine("Construct Form", golem.formName !== "None" ? golem.formName : null)}
    ${formatHeaderLine("Infusions", golem.selectedInfusionNames)}
    ${formatHeaderLine("Engine Core", golem.engineName !== "None" ? golem.engineName : null)}
    ${formatHeaderLine("Special Core", golem.specialCoreName !== "None" ? golem.specialCoreName : null)}
  `;

  return `
    <div class="stat-block">
      <div class="stat-block-header">
        <div class="creature-name">${escapeHtml(title)}</div>
        <div class="creature-meta"><em>${creatureSize} construct</em></div>
        ${golem.fusionState ? `<div class="fusion-tag"><em>Fused Form</em></div>` : ""}
        ${headerSection}
      </div>

      <hr>

      <p><strong>Armor Class</strong> ${golem.ac}</p>
      <p><strong>Hit Points</strong> ${golem.hp}${golem.maxHp && golem.maxHp !== golem.hp ? ` (maximum ${golem.maxHp})` : ""}${golem.fusedTempHp ? ` + ${golem.fusedTempHp} temporary hit points` : ""}</p>
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
      ${awakenedSkillsText ? `<p><strong>Awakened Skills</strong> ${escapeHtml(awakenedSkillsText)}</p>` : ""}

      <hr>

      <div class="trait-block">
        <h4>Traits</h4>
        ${traitsHtml}
      </div>

      <div class="action-block">
        <h4>Actions</h4>
        ${actionsHtml}
      </div>

      ${reactions.length ? `
        <div class="reaction-block">
          <h4>Reactions</h4>
          ${reactionsHtml}
        </div>
      ` : ""}
    </div>
  `;
}

/* =========================================================
   SUMMARY HELPERS
========================================================= */

function renderSelectionSummaryBlock(player, templateId, engineId, specialCoreId, formId, infusionIds, title) {
  const template = getTemplateById(templateId);
  const engine = getEngineById(engineId);
  const specialCore = getSpecialCoreById(specialCoreId);
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
      <br><strong>Special Core:</strong> ${escapeHtml(specialCore?.name || "None")}
    </div>
  `;
}

function findMatchingExampleBuild() {
  const state = getBuildState();

  return (
    EXAMPLE_BUILDS.find((build) => {
      return (
        (build.mode || "single") === state.mode &&
        Number(build.level) === Number(state.level) &&
        Number(build.intMod) === Number(state.intMod) &&
        (build.template || "none") === state.template &&
        (build.engine || "none") === state.engine &&
        (build.form || "none") === state.form &&
        arraysEqualAsSets(build.infusions || [], state.infusions || [])
      );
    }) || null
  );
}

function renderLoadedExampleBanner() {
  const match = findMatchingExampleBuild();
  if (!match) return "";

  const upgradeName = match.upgradeTo
    ? getExampleBuildById(match.upgradeTo)?.name || match.upgradeTo
    : null;

  const upgradeText = upgradeName
    ? `<br><strong>Upgrade Path:</strong> ${escapeHtml(upgradeName)}`
    : "";

  return `
    <div class="summary-line loaded-example-banner">
      <strong>Loaded Example:</strong> ${escapeHtml(match.name)}<br>
      <strong>Role:</strong> ${escapeHtml(match.role)}<br>
      <strong>Difficulty:</strong> ${escapeHtml(match.difficulty)}${upgradeText}
    </div>
  `;
}

/* =========================================================
   SAVE / LOAD / SHARE STATE
========================================================= */

function getBuildState() {
  const player1 = createPlayer(1);
  const player2 = createPlayer(2);

  return {
    mode: getMode(),

    level: player1.level,
    intMod: player1.intMod,
    template: getSelectedTemplateId(1),
    engine: getSelectedEngineId(1),
    specialCore: getSelectedSpecialCoreId(),
    form: getSelectedFormId(1),
    infusions: getSelectedInfusionIds(player1, 1),

    level2: player2.level,
    intMod2: player2.intMod,
    template2: getSelectedTemplateId(2),
    engine2: getSelectedEngineId(2),
    form2: getSelectedFormId(2),
    infusions2: getSelectedInfusionIds(player2, 2)
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

  if ($("#specialCore") && typeof state.specialCore !== "undefined") {
  $("#specialCore").value = state.specialCore;
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

function updateShareLink() {
  const shareVisibleEl = $("#shareLinkVisible");
  const shareMainEl = $("#shareLinkMain");
  if (!shareVisibleEl && !shareMainEl) return;

  const state = getBuildState();
  const params = new URLSearchParams({
    mode: state.mode,

    level: String(state.level),
    intMod: String(state.intMod),
    template: state.template,
    engine: state.engine,
    specialCore: state.specialCore,
    form: state.form,
    infusions: state.infusions.join(","),

    level2: String(state.level2),
    intMod2: String(state.intMod2),
    template2: state.template2,
    engine2: state.engine2,
    form2: state.form2,
    infusions2: state.infusions2.join(",")
  });

  const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

  if (shareVisibleEl) shareVisibleEl.value = url;
  if (shareMainEl) shareMainEl.value = url;
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
    specialCore: params.get("specialCore") || undefined,
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
      .filter(Boolean)
  };

  applyBuildState(state);
}

/* =========================================================
   PERSISTENCE
========================================================= */

const WORKING_BUILD_KEY = "corewright-build";
const NAMED_BUILDS_KEY = "corewright-named-builds";

let lastAutoGeneratedSaveName = "";

function saveBuild() {
  localStorage.setItem(WORKING_BUILD_KEY, JSON.stringify(getBuildState()));
}

function loadBuild() {
  const raw = localStorage.getItem(WORKING_BUILD_KEY);
  if (!raw) return;

  try {
    const state = JSON.parse(raw);
    applyBuildState(state);
  } catch (err) {
    console.error("Failed to load saved build:", err);
  }
}

function getNamedBuilds() {
  try {
    return JSON.parse(localStorage.getItem(NAMED_BUILDS_KEY)) || [];
  } catch (err) {
    console.error("Failed to read named builds:", err);
    return [];
  }
}

function setNamedBuilds(builds) {
  localStorage.setItem(NAMED_BUILDS_KEY, JSON.stringify(builds));
}

function normalizeBuildName(name) {
  return String(name || "").trim();
}

function buildSuggestedSaveName() {
  const mode = getMode();

  const template1 = getTemplateById(getSelectedTemplateId(1))?.name || "No Template";
  const form1 = getConstructFormById(getSelectedFormId(1))?.name || "No Form";
  const engine1 = getEngineById(getSelectedEngineId(1))?.name || "No Engine";

  const primaryLabel = `${template1} ${form1}`.replace(/\s+/g, " ").trim();

  if (mode === "single") {
    return `${primaryLabel} - ${engine1}`;
  }

  const template2 = getTemplateById(getSelectedTemplateId(2))?.name || "No Template";
  const form2 = getConstructFormById(getSelectedFormId(2))?.name || "No Form";

  const secondaryLabel = `${template2} ${form2}`.replace(/\s+/g, " ").trim();

  if (mode === "fusion") {
    return `Fusion: ${primaryLabel} + ${secondaryLabel}`;
  }

  return `Dual Build: ${primaryLabel} + ${secondaryLabel}`;
}

function maybeAutoFillSaveName(force = false) {
  const input = $("#saveName");
  if (!input) return;

  const suggestion = buildSuggestedSaveName();
  const current = normalizeBuildName(input.value);

  const shouldReplace =
    force ||
    current === "" ||
    current === lastAutoGeneratedSaveName;

  if (shouldReplace) {
    input.value = suggestion;
    lastAutoGeneratedSaveName = suggestion;
  }
}

function refreshNamedBuildsDropdown() {
  const select = $("#savedBuildsSelect");
  if (!select) return;

  const currentValue = select.value;
  const builds = getNamedBuilds();

  select.innerHTML = `<option value="">-- Select Saved Build --</option>`;

  for (const build of builds) {
    const option = document.createElement("option");
    option.value = build.name;
    option.textContent = build.name;
    select.appendChild(option);
  }

  if (builds.some((b) => b.name === currentValue)) {
    select.value = currentValue;
  }
}

function saveNamedBuild() {
  const input = $("#saveName");
  if (!input) return;

  maybeAutoFillSaveName();

  const name = normalizeBuildName(input.value);
  if (!name) {
    alert("Please enter a build name.");
    return;
  }

  const builds = getNamedBuilds();
  const state = getBuildState();

  const record = {
    name,
    updatedAt: new Date().toISOString(),
    state
  };

  const existingIndex = builds.findIndex(
    (b) => b.name.toLowerCase() === name.toLowerCase()
  );

  if (existingIndex >= 0) {
    builds[existingIndex] = record;
  } else {
    builds.push(record);
  }

  builds.sort((a, b) => a.name.localeCompare(b.name));

  setNamedBuilds(builds);
  refreshNamedBuildsDropdown();

  const select = $("#savedBuildsSelect");
  if (select) select.value = name;

  lastAutoGeneratedSaveName = name;
  saveBuild();
  alert(`Saved build "${name}".`);
}

function loadNamedBuild() {
  const select = $("#savedBuildsSelect");
  if (!select || !select.value) {
    alert("Please select a saved build to load.");
    return;
  }

  const builds = getNamedBuilds();
  const selected = builds.find((b) => b.name === select.value);

  if (!selected) {
    alert("That saved build could not be found.");
    refreshNamedBuildsDropdown();
    return;
  }

  applyBuildState(selected.state);

  const input = $("#saveName");
  if (input) input.value = selected.name;

  lastAutoGeneratedSaveName = selected.name;
  updateBuilder();
  saveBuild();
}

function deleteNamedBuild() {
  const select = $("#savedBuildsSelect");
  if (!select || !select.value) {
    alert("Please select a saved build to delete.");
    return;
  }

  const name = select.value;
  const confirmed = confirm(`Delete saved build "${name}"?`);
  if (!confirmed) return;

  const builds = getNamedBuilds().filter((b) => b.name !== name);
  setNamedBuilds(builds);
  refreshNamedBuildsDropdown();

  const input = $("#saveName");
  if (input && input.value === name) {
    input.value = "";
  }

  if (lastAutoGeneratedSaveName === name) {
    lastAutoGeneratedSaveName = "";
  }

  maybeAutoFillSaveName(true);
}
/* =========================================================
   RENDER PIPELINE
========================================================= */

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
    ...TEMPLATES.filter((t) => t.id !== "none")
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
    ...CONSTRUCT_FORMS.filter((f) => f.id !== "none")
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
      engine.role ? `<span class="tag">${escapeHtml(engine.role)}</span>` : ""
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
    ${!enginesUnlocked ? `<div class="section-note">Engine Cores unlock at level 15. Until then, only None is available.</div>` : ""}
    ${cards}
  `;
}

function renderSpecialCoreCards() {
  const container = $("#specialCores");
  if (!container) return;

  const player = createPlayer(1);
  const selectedId = getSelectedSpecialCoreId();
  const unlocked = player.level >= 15;

  const cards = SPECIAL_CORES.map((core) => {
    const isNone = core.id === "none";
    const selectable = isNone || unlocked;
    const checked = core.id === selectedId ? "checked" : "";
    const selectedClass = core.id === selectedId ? "selected" : "";
    const lockedClass = selectable ? "" : "locked";

    const tags = [
      core.role ? `<span class="tag">${escapeHtml(core.role)}</span>` : "",
      core.rarity ? `<span class="tag">${escapeHtml(core.rarity)}</span>` : "",
      core.category ? `<span class="tag">${escapeHtml(core.category)}</span>` : ""
    ].join("");

    const preview = getPreviewText(core, player);

    return `
      <label class="select-card special-core-card ${selectedClass} ${lockedClass}">
        <input
          type="radio"
          name="specialCoreCard"
          value="${escapeHtml(core.id)}"
          ${checked}
          ${!selectable ? "disabled" : ""}
        >
        <div class="select-card-header">
          <strong>${escapeHtml(core.name)}</strong>
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
    ${!unlocked ? `<div class="section-note">Special Cores unlock at level 15. Until then, only None is available.</div>` : ""}
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
    { key: "masterwork", label: "Masterwork Infusions" }
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
  const showSecond = mode === "multi";

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
  const selectedSpecialCoreId = index === 1 ? getSelectedSpecialCoreId() : "none";
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

  if (index === 1) {
  $all(`#specialCores input[type="radio"]`).forEach((input) => {
    input.checked = input.value === selectedSpecialCoreId;
    input.closest(".special-core-card")?.classList.toggle("selected", input.checked);
  });
}

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

function setAssemblyExpanded(targetId, expanded = true) {
  const content = document.getElementById(targetId);
  if (!content) return;

  const button = document.querySelector(`.assembly-toggle[data-target="${targetId}"]`);
  const icon = button?.querySelector(".toggle-icon");

  if (expanded) {
    content.classList.remove("is-collapsed");
    if (icon) icon.textContent = "−";
  } else {
    content.classList.add("is-collapsed");
    if (icon) icon.textContent = "+";
  }
}

function autoExpandSelectedSections(index = 1) {
  const s = suffix(index);
  const templateId = getSelectedTemplateId(index);
  const formId = getSelectedFormId(index);
  const engineId = getSelectedEngineId(index);
  const specialCoreId = index === 1 ? getSelectedSpecialCoreId() : "none";
  const infusions = getSelectedInfusionIds(createPlayer(index), index);

  if (templateId !== "none") setAssemblyExpanded(`templates${s}-section`, true);
  if (formId !== "none") setAssemblyExpanded(`constructforms${s}-section`, true);
  if (engineId !== "none") setAssemblyExpanded(`engines${s}-section`, true);
  if (index === 1 && specialCoreId !== "none") {
  setAssemblyExpanded("specialcores-section", true);
}
  if (infusions.length > 0) setAssemblyExpanded(`infusions${s}-section`, true);
}

function autoExpandLoadedExample() {
  if (!findMatchingExampleBuild()) return;

  autoExpandSelectedSections(1);
  autoExpandSelectedSections(2);
}

/* =========================================================
   OUTPUT RENDERING
========================================================= */

function populateAllCompatibilitySelects() {
  populateCompatibilitySelect("template", TEMPLATES, true);
  populateCompatibilitySelect("constructForm", CONSTRUCT_FORMS, true);
  populateCompatibilitySelect("engine", ENGINES, false);
  populateCompatibilitySelect("specialCore", SPECIAL_CORES, true);
  populateCompatibilitySelect("template2", TEMPLATES, true);
  populateCompatibilitySelect("constructForm2", CONSTRUCT_FORMS, true);
  populateCompatibilitySelect("engine2", ENGINES, false);
}

function renderSelectionPanels(index = 1) {
  normalizeInfusionsForCapacity(index);
enforceEngineRestrictions(index);

if (index === 1) {
  enforceSpecialCoreRestrictions();
  enforceCapstoneModeRestrictions();
}

renderTemplateCards(index);
renderConstructFormOptions(index);
renderInfusionOptions(index);
renderEngineCards(index);

if (index === 1) {
  renderSpecialCoreCards();
}

syncSelectedCardsFromHiddenInputs(index);
}

function renderPrimaryOutputs(mode) {
  const player1 = createPlayer(1);
  const templateId1 = getSelectedTemplateId(1);
  const engineId1 = getSelectedEngineId(1);
  const specialCoreId1 = getSelectedSpecialCoreId();
  const formId1 = getSelectedFormId(1);
  const infusionIds1 = getSelectedInfusionIds(player1, 1);

  updateInfusionCapacityDisplay(Math.max(0, player1.intMod), infusionIds1.length, 1);

  const golem1 = createGolem(
  player1,
  templateId1,
  engineId1,
  formId1,
  infusionIds1,
  specialCoreId1
);

  let displayGolem = golem1;
  if (mode === "fusion") {
    displayGolem = createFusionGolem(player1, golem1);
  } else if (mode === "awakened") {
    displayGolem = applyAwakenedCoreBenefits(player1, golem1);
  }

  const statBlock1 = $("#statBlockOutput") || $("#statBlock");
  if (statBlock1) {
    const banner = renderLoadedExampleBanner();

    const output = renderStatBlock(
      displayGolem,
      player1,
      mode === "single"
        ? "Arcane Golem"
        : mode === "awakened"
          ? "Awakened Construct"
          : mode === "fusion"
            ? "Corewright Fusion Form"
            : "Primary Golem"
    );

    statBlock1.innerHTML = `
      ${banner}
      ${output}
    `;
  }

  const summary1 = $("#selectionSummary");
  if (summary1) {
    const specialSummary =
      mode === "fusion"
        ? `
          <div class="summary-line">
            <strong>Fusion Mode Active</strong><br>
            You are merged with your construct for up to 1 minute. The fused form uses the construct's physical chassis while acting under your direct control.
          </div>
        `
        : mode === "awakened"
          ? `
            <div class="summary-line">
              <strong>Awakened Core Active</strong><br>
              Your construct acts with awakened reason and independent purpose, gaining elevated mental ability scores and awakened skills.
            </div>
          `
          : "";

    summary1.innerHTML =
      renderLoadedExampleBanner() +
      specialSummary +
      renderSelectionSummaryBlock(
        player1,
        templateId1,
        engineId1,
        specialCoreId1,
        formId1,
        infusionIds1,
        mode === "single"
          ? "Golem Summary"
          : mode === "awakened"
            ? "Awakened Construct"
            : mode === "fusion"
              ? "Fusion Chassis"
              : "Primary Golem"
      );
  }

  return { player1, templateId1, engineId1, formId1, infusionIds1 };
}

function renderSecondaryOutputs(mode) {
  const secondarySummary = $("#secondarySummary");
  const secondaryStatBlock = $("#secondaryStatBlock");

  if (mode !== "multi") {
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

  const golem2 = createGolem(
  player2,
  templateId2,
  engineId2,
  formId2,
  infusionIds2,
  "none"
);

  if (secondarySummary) {
    secondarySummary.innerHTML = renderSelectionSummaryBlock(
  player2,
  templateId2,
  engineId2,
  "none",
  formId2,
  infusionIds2,
  "Second Golem"
);
  }

  if (secondaryStatBlock) {
    secondaryStatBlock.innerHTML = renderStatBlock(
      golem2,
      player2,
      "Second Golem"
    );
  }

  return { player2, templateId2, engineId2, formId2, infusionIds2 };
}

function appendFusionSummaryNote(mode) {
  if (mode !== "fusion") return;
}

function updateBuilder() {
  const mode = getMode();

  updateModeUI();
  renderSelectionPanels(1);
  renderSelectionPanels(2);

  const primary = renderPrimaryOutputs(mode);
  const secondary = renderSecondaryOutputs(mode);

  appendFusionSummaryNote(mode);

  renderConceptArtPrompt(
    {
      formId: primary.formId1,
      templateId: primary.templateId1,
      engineId: primary.engineId1,
      infusionIds: primary.infusionIds1
    },
    secondary
      ? {
          formId: secondary.formId2,
          templateId: secondary.templateId2,
          engineId: secondary.engineId2,
          infusionIds: secondary.infusionIds2
        }
      : null,
    mode
  );

  updateShareLink();
  saveBuild();
  maybeAutoFillSaveName();

  const statBlockOutput = $("#statBlockOutput");
  if (statBlockOutput) {
    statBlockOutput.classList.remove("updated-flash");
    void statBlockOutput.offsetWidth;
    statBlockOutput.classList.add("updated-flash");
  }
}

/* =========================================================
   EVENTS
========================================================= */

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

  if (target.closest("#specialCores")) {
   setSelectedSpecialCoreId(target.value);
   updateBuilder();
   return true;
  }

  return false;
}

function bindEvents() {
  document.addEventListener("change", (event) => {
    const target = event.target;

    if (
      target.matches(
        '#templates input[type="radio"], #templates2 input[type="radio"], #constructForms input[type="radio"], #constructForms2 input[type="radio"], #engines input[type="radio"], #engines2 input[type="radio"], #specialCores input[type="radio"]'
      )
    ) {
      if (handleCardRadioChange(target)) return;
    }

    if (
      target.matches("#mode") ||
      target.matches("#level") ||
      target.matches("#intMod") ||
      target.matches("#template") ||
      target.matches("#constructForm") ||
      target.matches("#engine") ||
      target.matches("#specialCore") ||
      target.matches("#level2") ||
      target.matches("#intMod2") ||
      target.matches("#template2") ||
      target.matches("#constructForm2") ||
      target.matches("#engine2") ||
      target.matches("#promptModeSelect") ||
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
      saveNamedBuild();
      updateBuilder();
    });
  }

  const loadBtn = $("#loadBuildBtn");
  if (loadBtn) {
    loadBtn.addEventListener("click", () => {
      loadNamedBuild();
    });
  }

  const deleteBtn = $("#deleteBuildBtn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      deleteNamedBuild();
      updateBuilder();
    });
  }

  const saveNameInput = $("#saveName");
  if (saveNameInput) {
    saveNameInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        saveNamedBuild();
        updateBuilder();
      }
    });
  }

  const printBtn = $("#printBuild");
  if (printBtn) {
    printBtn.addEventListener("click", () => window.print());
  }

  const copyStatBlockBtn = $("#copyStatBlockBtn");
  if (copyStatBlockBtn) {
    copyStatBlockBtn.addEventListener("click", async () => {
      const text = getStatBlockExportText();
      if (!text) return;

      try {
        await navigator.clipboard.writeText(text);
        const originalText = copyStatBlockBtn.textContent;
        copyStatBlockBtn.textContent = "Copied!";

        setTimeout(() => {
          copyStatBlockBtn.textContent = originalText;
        }, 1200);
      } catch {
        const temp = document.createElement("textarea");
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        temp.remove();

        const originalText = copyStatBlockBtn.textContent;
        copyStatBlockBtn.textContent = "Copied!";

        setTimeout(() => {
          copyStatBlockBtn.textContent = originalText;
        }, 1200);
      }
    });
  }

  const copyPromptBtn = $("#copyConceptArtPromptBtn");
  if (copyPromptBtn) {
    copyPromptBtn.addEventListener("click", () => {
      copyConceptArtPrompt();
    });
  }

  const copyBtn = $("#copyShareLink");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const shareEl = $("#shareLinkVisible") || $("#shareLinkMain");
      if (!shareEl || !shareEl.value) return;

      let copied = false;

      try {
        await navigator.clipboard.writeText(shareEl.value);
        copied = true;
      } catch {
        const temp = document.createElement("textarea");
        temp.value = shareEl.value;
        document.body.appendChild(temp);
        temp.select();
        copied = document.execCommand("copy");
        temp.remove();
      }

      const originalText = copyBtn.textContent;
      copyBtn.textContent = copied ? "Link Copied!" : "Press Ctrl+C";

      setTimeout(() => {
        copyBtn.textContent = originalText;
      }, 1400);
    });
  }

  const downloadBtn = $("#downloadTxt");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const text = getStatBlockExportText();
      if (!text) return;

      const buildName = ($("#saveName")?.value || "").trim();
      const mode = getMode();
      const filenameBase =
        buildName ||
        (mode === "multi"
          ? "dual-core-build"
          : mode === "fusion"
            ? "fusion-build"
            : "corewright-golem");

      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${slugifyFilename(filenameBase)}-stat-block.txt`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      URL.revokeObjectURL(url);
    });
  }
}

/* =========================================================
   INIT
========================================================= */

function hasBuildQueryString() {
  return [...new URLSearchParams(window.location.search).keys()].length > 0;
}

function initBuilder() {
  populateAllCompatibilitySelects();

  loadBuild();
  if (hasBuildQueryString()) {
    loadFromQueryString();
  }

  populateAllCompatibilitySelects();
  setupAssemblyToggles();
  updateModeUI();
  refreshNamedBuildsDropdown();
  bindEvents();

  updateBuilder();

  if (hasBuildQueryString()) {
    setTimeout(() => {
      autoExpandLoadedExample();
    }, 0);
  }
}

document.addEventListener("DOMContentLoaded", initBuilder);