const INFUSIONS = {

  // ===== BASE INFUSIONS =====
  reinforced_frame: {
    name: "Reinforced Frame",
    tier: "base",
    tags: ["Tank"],
    effect: "+2 AC",
    details: "The golem gains reinforced plating, increasing its AC by 2.",

    traits: [
      "<strong>Reinforced Frame.</strong> The golem’s armor is enhanced, granting +2 AC."
    ],

    apply: (golem) => { golem.ac += 2; }
  },

  war_construct: {
    name: "War Construct",
    tier: "base",
    tags: ["DPS"],
    effect: "+2 attack bonus",
    details: "The golem is built for combat and gains a +2 bonus to attack rolls.",

    actions: [
      "<strong>Enhanced Strikes.</strong> The golem gains a +2 bonus to attack rolls."
    ],

    apply: (golem) => { golem.attackBonus = (golem.attackBonus || 0) + 2; }
  },

  dexterous_manipulators: {
    name: "Dexterous Manipulators",
    tier: "base",
    tags: ["Utility"],
    effect: "+2 DEX",
    details: "Improved fine motor control increases Dexterity by 2.",

    traits: [
      "<strong>Dexterous Manipulators.</strong> The golem gains +2 Dexterity."
    ],

    apply: (golem) => { golem.dex += 2; }
  },

  accelerated_servos: {
    name: "Accelerated Servos",
    tier: "base",
    tags: ["Utility"],
    effect: "+10 ft speed",
    details: "Enhanced servos increase movement speed by 10 ft.",

    traits: [
      "<strong>Accelerated Servos.</strong> Speed increases by 10 ft."
    ],

    apply: (golem) => { golem.speed += 10; }
  },

  reactive_plating: {
    name: "Reactive Plating",
    tier: "base",
    tags: ["Tank"],
    effect: "Retaliation damage",
    details: "Enemies that strike the golem take minor damage.",

    reactions: [
      "<strong>Reactive Plating.</strong> When struck, attackers take minor damage."
    ],

    apply: (golem) => {}
  },

  arcane_conduit: {
    name: "Arcane Conduit",
    tier: "base",
    tags: ["Utility"],
    effect: "Boosts spell synergy",
    details: "Improves magical interactions with the golem.",

    traits: [
      "<strong>Arcane Conduit.</strong> Enhances magical synergy with its creator."
    ],

    apply: (golem) => {}
  },

  anchored_frame: {
    name: "Anchored Frame",
    tier: "base",
    tags: ["Tank"],
    effect: "Resistance to forced movement",
    details: "The golem cannot easily be moved against its will.",

    traits: [
      "<strong>Anchored Frame.</strong> Resistant to forced movement."
    ],

    apply: (golem) => {}
  },

  overcharged_core: {
    name: "Overcharged Core",
    tier: "base",
    tags: ["DPS"],
    effect: "Bonus damage output",
    details: "The golem deals additional damage at the cost of stability.",

    actions: [
      "<strong>Overcharged Strike.</strong> Deals additional bonus damage."
    ],

    apply: (golem) => {}
  },

  sentinel_protocol: {
    name: "Sentinel Protocol",
    tier: "base",
    tags: ["Control"],
    effect: "Reaction-based defense",
    details: "Allows the golem to react to enemy movement.",

    reactions: [
      "<strong>Sentinel Protocol.</strong> Can make opportunity attacks when enemies move nearby."
    ],

    apply: (golem) => {}
  },

  // ===== ADVANCED INFUSIONS =====
  self_repair_matrix: {
    name: "Self-Repair Matrix",
    tier: "advanced",
    tags: ["Tank"],
    effect: "Regeneration",
    details: "The golem regains HP each round.",

    traits: [
      "<strong>Self-Repair Matrix.</strong> Regains 5 HP at the start of its turn."
    ],

    apply: (golem) => { golem.regen = 5; }
  },

  siege_engine: {
    name: "Siege Engine",
    tier: "advanced",
    tags: ["DPS"],
    effect: "Structure damage bonus",
    details: "Deals extra damage to structures and objects.",

    actions: [
      "<strong>Siege Engine.</strong> Deals double damage to objects and structures."
    ],

    apply: (golem) => {}
  },

  reflexive_countermeasures: {
    name: "Reflexive Countermeasures",
    tier: "advanced",
    tags: ["Control"],
    effect: "Counterattack reactions",
    details: "The golem can retaliate when attacked.",

    reactions: [
      "<strong>Reflexive Countermeasures.</strong> When hit, the golem can immediately retaliate."
    ],

    apply: (golem) => {}
  },

  // ===== MASTERWORK INFUSIONS =====
  cognitive_matrix: {
    name: "Cognitive Matrix",
    tier: "masterwork",
    tags: ["Utility"],
    effect: "Enhanced intelligence",
    details: "Grants advanced decision-making capabilities.",

    traits: [
      "<strong>Cognitive Matrix.</strong> Greatly enhances decision-making capabilities."
    ],

    apply: (golem) => {}
  },

  phase_shifter: {
    name: "Phase Shifter",
    tier: "masterwork",
    tags: ["Control"],
    effect: "Partial intangibility",
    details: "Allows the golem to phase through obstacles briefly.",

    traits: [
      "<strong>Phase Shifter.</strong> Can move through objects briefly."
    ],

    apply: (golem) => {}
  },

  overdrive_protocol: {
    name: "Overdrive Protocol",
    tier: "masterwork",
    tags: ["DPS"],
    effect: "Burst damage mode",
    details: "Temporarily increases attack output significantly.",

    actions: [
      "<strong>Overdrive Protocol.</strong> Temporarily increases attack output significantly."
    ],

    apply: (golem) => {}
  },

  adaptive_plating: {
    name: "Adaptive Plating",
    tier: "masterwork",
    tags: ["Tank"],
    effect: "Dynamic resistance",
    details: "Adapts to incoming damage types.",

    traits: [
      "<strong>Adaptive Plating.</strong> Adjusts resistance to incoming damage types."
    ],

    apply: (golem) => {}
  },

  replication_matrix: {
    name: "Replication Matrix",
    tier: "masterwork",
    tags: ["Utility"],
    effect: "Duplicate effects",
    details: "Can replicate certain abilities or effects.",

    traits: [
      "<strong>Replication Matrix.</strong> Can duplicate certain abilities or effects."
    ],

    apply: (golem) => {}
  },

  elemental_convergence: {
    name: "Elemental Convergence",
    tier: "masterwork",
    tags: ["DPS"],
    effect: "Elemental damage boost",
    details: "Channels elemental energy into attacks.",

    actions: [
      "<strong>Elemental Strike.</strong> Attacks deal additional elemental damage."
    ],

    apply: (golem) => {}
  },

  giant_frame: {
    name: "Giant Frame",
    tier: "masterwork",
    tags: ["Tank"],
    effect: "Increased size and strength",
    details: "The golem becomes larger and more powerful.",

    traits: [
      "<strong>Giant Frame.</strong> Gains +30 HP and +4 STR."
    ],

    apply: (golem) => {
      golem.hp += 30;
      golem.str += 4;
    }
  }

};
