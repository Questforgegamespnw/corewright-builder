const INFUSIONS = {

  // ===== BASE INFUSIONS =====
  reinforced_frame: {
    name: "Reinforced Frame",
    tier: "base",
    tags: ["Tank"],
    effect: "+2 AC",
    details: "The golem gains reinforced plating, increasing its AC by 2.",
    apply: (golem) => { golem.ac += 2; }
  },

  war_construct: {
    name: "War Construct",
    tier: "base",
    tags: ["DPS"],
    effect: "+2 attack bonus",
    details: "The golem is built for combat and gains a +2 bonus to attack rolls.",
    apply: (golem) => { golem.attackBonus = (golem.attackBonus || 0) + 2; }
  },

  dexterous_manipulators: {
    name: "Dexterous Manipulators",
    tier: "base",
    tags: ["Utility"],
    effect: "+2 DEX",
    details: "Improved fine motor control increases Dexterity by 2.",
    apply: (golem) => { golem.dex += 2; }
  },

  accelerated_servos: {
    name: "Accelerated Servos",
    tier: "base",
    tags: ["Utility"],
    effect: "+10 ft speed",
    details: "Enhanced servos increase movement speed by 10 ft.",
    apply: (golem) => { golem.speed += 10; }
  },

  reactive_plating: {
    name: "Reactive Plating",
    tier: "base",
    tags: ["Tank"],
    effect: Retaliation damage",
    details: "Enemies that strike the golem take minor damage.",
    apply: (golem) => { golem.reactive = true; }
  },

  arcane_conduit: {
    name: "Arcane Conduit",
    tier: "base",
    tags: ["Utility"],
    effect: Boosts spell synergy,
    details: "Improves magical interactions with the golem.",
    apply: (golem) => { golem.arcaneBoost = true; }
  },

  anchored_frame: {
    name: "Anchored Frame",
    tier: "base",
    tags: ["Tank"],
    effect: Resistance to forced movement,
    details: "The golem cannot easily be moved against its will.",
    apply: (golem) => { golem.anchored = true; }
  },

  overcharged_core: {
    name: "Overcharged Core",
    tier: "base",
    tags: ["DPS"],
    effect: Bonus damage output,
    details: "The golem deals additional damage at the cost of stability.",
    apply: (golem) => { golem.overcharged = true; }
  },

  sentinel_protocol: {
    name: "Sentinel Protocol",
    tier: "base",
    tags: ["Control"],
    effect: Reaction-based defense,
    details: "Allows the golem to react to enemy movement.",
    apply: (golem) => { golem.sentinel = true; }
  },

  // ===== ADVANCED INFUSIONS =====
  self_repair_matrix: {
    name: "Self-Repair Matrix",
    tier: "advanced",
    tags: ["Tank"],
    effect: Regeneration,
    details: "The golem regains HP each round.",
    apply: (golem) => { golem.regen = 5; }
  },

  siege_engine: {
    name: "Siege Engine",
    tier: "advanced",
    tags: ["DPS"],
    effect: Structure damage bonus,
    details: "Deals extra damage to structures and objects.",
    apply: (golem) => { golem.siege = true; }
  },

  reflexive_countermeasures: {
    name: "Reflexive Countermeasures",
    tier: "advanced",
    tags: ["Control"],
    effect: Counterattack reactions,
    details: "The golem can retaliate when attacked.",
    apply: (golem) => { golem.counter = true; }
  },

  // ===== MASTERWORK INFUSIONS =====
  cognitive_matrix: {
    name: "Cognitive Matrix",
    tier: "masterwork",
    tags: ["Utility"],
    effect: Enhanced intelligence,
    details: "Grants advanced decision-making capabilities.",
    apply: (golem) => { golem.intBoost = true; }
  },

  phase_shifter: {
    name: "Phase Shifter",
    tier: "masterwork",
    tags: ["Control"],
    effect: Partial intangibility,
    details: "Allows the golem to phase through obstacles briefly.",
    apply: (golem) => { golem.phase = true; }
  },

  overdrive_protocol: {
    name: "Overdrive Protocol",
    tier: "masterwork",
    tags: ["DPS"],
    effect: Burst damage mode,
    details: "Temporarily increases attack output significantly.",
    apply: (golem) => { golem.overdrive = true; }
  },

  adaptive_plating: {
    name: "Adaptive Plating",
    tier: "masterwork",
    tags: ["Tank"],
    effect: Dynamic resistance,
    details: "Adapts to incoming damage types.",
    apply: (golem) => { golem.adaptive = true; }
  },

  replication_matrix: {
    name: "Replication Matrix",
    tier: "masterwork",
    tags: ["Utility"],
    effect: Duplicate effects,
    details: "Can replicate certain abilities or effects.",
    apply: (golem) => { golem.replicate = true; }
  },

  elemental_convergence: {
    name: "Elemental Convergence",
    tier: "masterwork",
    tags: ["DPS"],
    effect: Elemental damage boost,
    details: "Channels elemental energy into attacks.",
    apply: (golem) => { golem.elemental = true; }
  },

  giant_frame: {
    name: "Giant Frame",
    tier: "masterwork",
    tags: ["Tank"],
    effect: Increased size and strength,
    details: "The golem becomes larger and more powerful.",
    apply: (golem) => {
      golem.hp += 30;
      golem.str += 4;
    }
  }

};
