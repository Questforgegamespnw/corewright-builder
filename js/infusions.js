const INFUSIONS = {
  // 3rd-Level Infusions
  reinforced_frame: {
    name: "Reinforced Frame",
    tags: ["Tank"],
    effect: "Golem’s hit points increase by your artificer level and gains +1 AC.",
    details: "Bonus applied when golem is created; scales automatically with level."
  },
  war_construct: {
    name: "War Construct",
    tags: ["DPS"],
    effect: "Golem can make two attacks instead of one when taking the Attack action.",
    details: "Each attack deals an additional 1d6 damage; damage type matches attack."
  },
  dexterous_manipulators: {
    name: "Dexterous Manipulators",
    tags: ["Utility"],
    effect: "Golem’s Dexterity becomes 14 and gains proficiency with simple weapons.",
    details: "Can take the Use an Object action without requiring command."
  },
  accelerated_servos: {
    name: "Accelerated Servos",
    tags: ["Utility"],
    effect: "Golem’s movement speed increases by 10 feet.",
    details: "Can take Dash or Disengage as a bonus action without command."
  },
  reactive_plating: {
    name: "Reactive Plating",
    tags: ["Tank"],
    effect: "Golem can reduce damage by 1d10 + proficiency bonus using its reaction.",
    details: "Can be used after damage is rolled but before applied."
  },
  arcane_conduit: {
    name: "Arcane Conduit",
    tags: ["Utility"],
    effect: "Golem can deliver touch-range spells you cast.",
    details: "Golem must be within 30 feet; spell originates from golem."
  },
  anchored_frame: {
    name: "Anchored Frame",
    tags: ["Tank", "Control"],
    effect: "Golem has advantage on saving throws vs being knocked prone, pushed, or pulled.",
    details: "Forced movement affecting golem is reduced to 10 feet."
  },
  overcharged_core: {
    name: "Overcharged Core",
    tags: ["DPS"],
    effect: "Once per turn, golem deals +10 force damage on hit.",
    details: "After using, golem takes force damage equal to proficiency bonus."
  },
  sentinel_protocol: {
    name: "Sentinel Protocol",
    tags: ["Control"],
    effect: "Golem can use reaction to attack creatures attacking others within 5 feet.",
    details: "Triggers after the attack is declared."
  },

  // 9th-Level Infusions
  self_repair_matrix: {
    name: "Self-Repair Matrix",
    tags: ["Tank"],
    effect: "At start of its turn, golem regains HP equal to Int modifier + proficiency bonus.",
    details: "Regeneration suppressed until end of next turn if it takes acid or fire damage."
  },
  siege_engine: {
    name: "Siege Engine",
    tags: ["DPS"],
    effect: "Golem deals double damage to objects and structures.",
    details: "Attacks deal +1d8; attack rolls against golem have advantage until next turn."
  },
  reflexive_countermeasures: {
    name: "Reflexive Countermeasures",
    tags: ["Control"],
    effect: "Golem can make a melee attack as reaction when a creature misses it.",
    details: "Triggers once per round."
  },

  // 15th-Level Infusions
  cognitive_matrix: {
    name: "Cognitive Matrix",
    tags: ["Utility"],
    effect: "Golem gains proficiency in all saving throws.",
    details: "Adds Int modifier to ability checks and saving throws; can Help as bonus action."
  },
  phase_shifter: {
    name: "Phase Shifter",
    tags: ["Utility"],
    effect: "Golem becomes incorporeal until start of next turn.",
    details: "Can move through creatures and objects as difficult terrain."
  },
  overdrive_protocol: {
    name: "Overdrive Protocol",
    tags: ["DPS"],
    effect: "Golem makes one additional attack when commanded to attack.",
    details: "At end of turn, it takes force damage equal to your proficiency bonus."
  },
  adaptive_plating: {
    name: "Adaptive Plating",
    tags: ["Tank"],
    effect: "Golem can use reaction to gain resistance to damage it takes.",
    details: "Resistance lasts until end of next turn."
  },
  replication_matrix: {
    name: "Replication Matrix",
    tags: ["Utility"],
    effect: "Golem can create a duplicate in an adjacent space as an action.",
    details: "Duplicate has hit points equal to artificer level and lasts 1 minute."
  },
  elemental_convergence: {
    name: "Elemental Convergence",
    tags: ["DPS"],
    effect: "Golem deals additional damage equal to your Int modifier when using Engine Core type.",
    details: "If damaging multiple creatures, gain temporary hit points equal to proficiency bonus."
  },
  giant_frame: {
    name: "Giant Frame",
    tags: ["Tank", "DPS"],
    effect: "Golem increases size by one category (max Huge).",
    details: "Gains HP, Strength, Con, reach; speed reduced and DEX saves at disadvantage."
  }
};
