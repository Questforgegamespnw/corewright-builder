const INFUSIONS = {

  // ===== BASE INFUSIONS =====
  reinforced_frame: {
    name: "Reinforced Frame",
    tier: "base",
    tags: ["Tank"],
    effect: "+2 AC",
    details: "The golem gains reinforced plating, increasing its AC by 2.",

    lore: "Originally designed for siege constructs, reinforced frames allow a golem to endure tremendous punishment on the battlefield.",
    mechanics: "+2 bonus to Armor Class. Applied after base AC calculation.",

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

    lore: "War constructs are engineered with precision targeting systems and aggressive combat routines.",
    mechanics: "+2 bonus to attack rolls. Stacks with proficiency and STR modifier.",

    actions: [
      "<strong>War Construct.</strong> This unit is optimized for combat efficiency."
    ],

    apply: (golem) => {
      golem.attackBonus = (golem.attackBonus || 0) + 2;
    }
  },

  dexterous_manipulators: {
    name: "Dexterous Manipulators",
    tier: "base",
    tags: ["Utility"],
    effect: "+2 DEX",
    details: "Improved fine motor control increases Dexterity by 2.",

    lore: "Miniaturized servos and precision joints allow delicate and complex movements.",
    mechanics: "+2 Dexterity. Increases DEX modifier and related calculations.",

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

    lore: "High-speed servo motors push the golem beyond standard mobility limits.",
    mechanics: "+10 ft to movement speed.",

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

    lore: "This plating stores kinetic energy and releases it back upon impact.",
    mechanics: "When hit by a melee attack, attacker takes 2 damage.",

    reactions: [
      "<strong>Reactive Plating.</strong> When hit, attacker takes 2 damage."
    ],

    apply: (golem) => {
      golem.reactiveDamage = 2;
    }
  },

  arcane_conduit: {
    name: "Arcane Conduit",
    tier: "base",
    tags: ["Utility"],
    effect: "Boosts spell synergy",
    details: "Improves magical interactions with the golem.",

    lore: "Arcane channels woven into the golem amplify magical resonance.",
    mechanics: "Grants bonus equal to INT modifier for spell interactions.",

    traits: [
      "<strong>Arcane Conduit.</strong> Enhances magical synergy."
    ],

    apply: (golem, player) => {
      golem.spellBonus = player.intMod;
    }
  },

  anchored_frame: {
    name: "Anchored Frame",
    tier: "base",
    tags: ["Tank"],
    effect: "Resistance to forced movement",
    details: "The golem cannot easily be moved against its will.",

    lore: "Heavy stabilizers lock the golem firmly into position.",
    mechanics: "Advantage or resistance vs forced movement effects.",

    traits: [
      "<strong>Anchored Frame.</strong> Resistant to forced movement."
    ],

    apply: (golem) => { golem.anchored = true; }
  },

  overcharged_core: {
    name: "Overcharged Core",
    tier: "base",
    tags: ["DPS"],
    effect: "Bonus damage output",
    details: "The golem deals additional damage at the cost of stability.",

    lore: "The core runs beyond safe limits, producing volatile power surges.",
    mechanics: "+2 bonus damage to all attacks.",

    actions: [
      "<strong>Overcharged Core.</strong> Attacks deal additional damage."
    ],

    apply: (golem) => {
      golem.bonusDamage = (golem.bonusDamage || 0) + 2;
    }
  },

  sentinel_protocol: {
    name: "Sentinel Protocol",
    tier: "base",
    tags: ["Control"],
    effect: "Reaction-based defense",
    details: "Allows the golem to react to enemy movement.",

    lore: "Advanced targeting protocols allow immediate response to threats.",
    mechanics: "Can make opportunity attacks when enemies move nearby.",

    reactions: [
      "<strong>Sentinel Protocol.</strong> Can react to enemy movement."
    ],

    apply: (golem) => { golem.sentinel = true; }
  },

  // ===== ADVANCED INFUSIONS =====
  self_repair_matrix: {
    name: "Self-Repair Matrix",
    tier: "advanced",
    tags: ["Tank"],
    effect: "Regeneration",
    details: "The golem regains HP each round.",

    lore: "Nanoscopic repair units continuously rebuild damaged components.",
    mechanics: "Regains 5 HP at the start of its turn.",

    traits: [
      "<strong>Self-Repair Matrix.</strong> Regains 5 HP per turn."
    ],

    apply: (golem) => { golem.regen = 5; }
  },

  siege_engine: {
    name: "Siege Engine",
    tier: "advanced",
    tags: ["DPS"],
    effect: "Structure damage bonus",
    details: "Deals extra damage to structures and objects.",

    lore: "Designed to break fortifications and siege defenses.",
    mechanics: "Deals double damage to objects and structures.",

    actions: [
      "<strong>Siege Engine.</strong> Deals double damage to objects."
    ],

    apply: (golem) => { golem.siege = true; }
  },

  reflexive_countermeasures: {
    name: "Reflexive Countermeasures",
    tier: "advanced",
    tags: ["Control"],
    effect: "Counterattack reactions",
    details: "The golem can retaliate when attacked.",

    lore: "Automated defense routines trigger instant retaliation.",
    mechanics: "When hit, the golem can immediately counterattack.",

    reactions: [
      "<strong>Reflexive Countermeasures.</strong> Immediate retaliation."
    ],

    apply: (golem) => { golem.counter = true; }
  },

  // ===== MASTERWORK INFUSIONS =====
  cognitive_matrix: {
    name: "Cognitive Matrix",
    tier: "masterwork",
    tags: ["Utility"],
    effect: "Enhanced intelligence",
    details: "Grants advanced decision-making capabilities.",

    lore: "A near-sentient processing core enables tactical reasoning.",
    mechanics: "Improves intelligence-based calculations and abilities.",

    traits: [
      "<strong>Cognitive Matrix.</strong> Enhanced intelligence."
    ],

    apply: (golem, player) => {
      golem.intelligenceBonus = player.intMod;
    }
  },

  phase_shifter: {
    name: "Phase Shifter",
    tier: "masterwork",
    tags: ["Control"],
    effect: "Partial intangibility",
    details: "Allows the golem to phase through obstacles briefly.",

    lore: "Shifting between planes allows partial intangibility.",
    mechanics: "Can move through objects for short durations.",

    traits: [
      "<strong>Phase Shifter.</strong> Can phase through objects."
    ],

    apply: (golem) => { golem.phase = true; }
  },

  overdrive_protocol: {
    name: "Overdrive Protocol",
    tier: "masterwork",
    tags: ["DPS"],
    effect: "Burst damage mode",
    details: "Temporarily increases attack output significantly.",

    lore: "Pushes the golem into a dangerous but powerful combat state.",
    mechanics: "+4 damage and +1 attack bonus.",

    actions: [
      "<strong>Overdrive Protocol.</strong> High-output combat mode."
    ],

    apply: (golem) => {
      golem.bonusDamage = (golem.bonusDamage || 0) + 4;
      golem.attackBonus += 1;
    }
  },

  adaptive_plating: {
    name: "Adaptive Plating",
    tier: "masterwork",
    tags: ["Tank"],
    effect: "Dynamic resistance",
    details: "Adapts to incoming damage types.",

    lore: "Smart materials shift composition to resist incoming threats.",
    mechanics: "Gains resistance to last damage type taken.",

    traits: [
      "<strong>Adaptive Plating.</strong> Adapts to damage types."
    ],

    apply: (golem) => { golem.adaptive = true; }
  },

  replication_matrix: {
    name: "Replication Matrix",
    tier: "masterwork",
    tags: ["Utility"],
    effect: "Duplicate effects",
    details: "Can replicate certain abilities or effects.",

    lore: "Experimental matrix allows duplication of abilities.",
    mechanics: "Can copy certain effects depending on context.",

    traits: [
      "<strong>Replication Matrix.</strong> Can duplicate effects."
    ],

    apply: (golem) => { golem.replicate = true; }
  },

  elemental_convergence: {
    name: "Elemental Convergence",
    tier: "masterwork",
    tags: ["DPS"],
    effect: "Elemental damage boost",
    details: "Channels elemental energy into attacks.",

    lore: "Harnesses raw elemental forces to enhance offensive output.",
    mechanics: "+3 bonus damage and adds elemental damage type.",

    actions: [
      "<strong>Elemental Strike.</strong> Deals elemental damage."
    ],

    apply: (golem) => {
      golem.bonusDamage = (golem.bonusDamage || 0) + 3;
      golem.damageType = "elemental";
    }
  },

  giant_frame: {
    name: "Giant Frame",
    tier: "masterwork",
    tags: ["Tank"],
    effect: "Increased size and strength",
    details: "The golem becomes larger and more powerful.",

    lore: "Massive structural expansion grants overwhelming physical power.",
    mechanics: "+30 HP and +4 STR (affects attack and damage).",

    traits: [
      "<strong>Giant Frame.</strong> Gains +30 HP and +4 STR."
    ],

    apply: (golem) => {
      golem.hp += 30;
      golem.str += 4;
    }
  }

};
