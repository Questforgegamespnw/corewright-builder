// infusions.js

const INFUSIONS = {
  reinforced_frame: {
    name: "Reinforced Frame",
    tags: ["Tank"],
    effect: "The golem’s hit point maximum increases by your artificer level and gains +1 AC.",
    details: "Applied when the golem is created; scales automatically with level.",
    apply: function(golem, player) {
      golem.hp += player.level;
      golem.ac += 1;
    }
  },

  war_construct: {
    name: "War Construct",
    tags: ["DPS"],
    effect: "Golem can make two attacks instead of one when taking the Attack action.",
    details: "Each attack deals an additional 1d6 damage.",
    apply: function(golem, player) {
      golem.extraAttacks = (golem.extraAttacks || 0) + 1;
      golem.bonusDamage = (golem.bonusDamage || 0) + 1; // adjust with actual damage logic
    }
  },

  dexterous_manipulators: {
    name: "Dexterous Manipulators",
    tags: ["Utility"],
    effect: "Golem Dexterity becomes 14 unless higher and gains simple weapon proficiency.",
    details: "Can wield weapons and manipulate objects freely.",
    apply: function(golem, player) {
      golem.dex = Math.max(golem.dex, 14);
      golem.weaponProficiency = true;
    }
  },

  accelerated_servos: {
    name: "Accelerated Servos",
    tags: ["Utility"],
    effect: "Golem movement speed increases by 10 feet.",
    details: "Can take Dash or Disengage as a bonus action without command.",
    apply: function(golem, player) {
      golem.speed += 10;
    }
  },

  reactive_plating: {
    name: "Reactive Plating",
    tags: ["Tank"],
    effect: "When the golem takes damage, it can use its reaction to reduce it by 1d10 + proficiency bonus.",
    details: "Used after damage is rolled but before it is applied.",
    apply: function(golem, player) {
      golem.reactivePlating = player.pb; // placeholder for actual damage reduction logic
    }
  },

  arcane_conduit: {
    name: "Arcane Conduit",
    tags: ["Utility"],
    effect: "Your golem can deliver touch-range spells for you.",
    details: "Golem must be within 30 feet; spell originates from its position.",
    apply: function(golem, player) {
      golem.arcaneDelivery = true;
    }
  },

  anchored_frame: {
    name: "Anchored Frame",
    tags: ["Tank", "Control"],
    effect: "Golem has advantage on saving throws against being knocked prone, pushed, or pulled.",
    details: "Forced movement affecting the golem is capped at 10 feet.",
    apply: function(golem, player) {
      golem.anchored = true;
    }
  },

  overcharged_core: {
    name: "Overcharged Core",
    tags: ["DPS"],
    effect: "Once per turn, golem deals an additional 10 force damage on hit.",
    details: "After using this, golem takes force damage equal to your proficiency bonus.",
    apply: function(golem, player) {
      golem.overchargedCore = player.pb; // placeholder for damage logic
    }
  },

  sentinel_protocol: {
    name: "Sentinel Protocol",
    tags: ["Control"],
    effect: "When a creature attacks a target other than the golem within 5 feet, golem can use its reaction to attack.",
    details: "Triggers after the attack is declared.",
    apply: function(golem, player) {
      golem.sentinelProtocol = true;
    }
  },

  self_repair_matrix: {
    name: "Self-Repair Matrix",
    tags: ["Tank"],
    effect: "Golem regains HP at the start of its turn equal to INT modifier + proficiency bonus.",
    details: "Regeneration suppressed until end of next turn if taking acid or fire damage.",
    apply: function(golem, player) {
      golem.regeneration = player.intMod + player.pb;
    }
  },

  siege_engine: {
    name: "Siege Engine",
    tags: ["DPS"],
    effect: "Golem deals double damage to objects and structures.",
    details: "Its attacks deal 1d8 extra damage; attack rolls against it have advantage until next turn.",
    apply: function(golem, player) {
      golem.siege = true;
    }
  },

  reflexive_countermeasures: {
    name: "Reflexive Countermeasures",
    tags: ["Control"],
    effect: "When a creature misses the golem, it can use its reaction to make a melee attack.",
    details: "Can trigger once per round.",
    apply: function(golem, player) {
      golem.reflexiveCounter = true;
    }
  },

  cognitive_matrix: {
    name: "Cognitive Matrix",
    tags: ["Utility"],
    effect: "Golem gains proficiency in all saving throws.",
    details: "Adds INT modifier to ability checks/saves; can use Help action as bonus without command.",
    apply: function(golem, player) {
      golem.allSavesProficient = true;
    }
  },

  phase_shifter: {
    name: "Phase Shifter",
    tags: ["Utility"],
    effect: "As a bonus action, golem becomes incorporeal until next turn.",
    details: "Can move through creatures and objects as difficult terrain.",
    apply: function(golem, player) {
      golem.phaseShift = true;
    }
  },

  overdrive_protocol: {
    name: "Overdrive Protocol",
    tags: ["DPS"],
    effect: "When commanded to attack, golem makes one additional attack.",
    details: "At the end of its turn, it takes force damage equal to your proficiency bonus.",
    apply: function(golem, player) {
      golem.overdrive = true;
    }
  },

  adaptive_plating: {
    name: "Adaptive Plating",
    tags: ["Tank"],
    effect: "When golem takes damage, it can use its reaction to gain resistance to that damage type.",
    details: "Resistance lasts until end of its next turn.",
    apply: function(golem, player) {
      golem.adaptivePlating = true;
    }
  },

  replication_matrix: {
    name: "Replication Matrix",
    tags: ["Utility"],
    effect: "Golem creates a duplicate in an adjacent space.",
    details: "Duplicate has hit points equal to your artificer level and lasts 1 minute.",
    apply: function(golem, player) {
      golem.replication = player.level;
    }
  },

  elemental_convergence: {
    name: "Elemental Convergence",
    tags: ["DPS"],
    effect: "Golem deals extra damage equal to INT modifier when using Engine Core damage.",
    details: "If it damages multiple creatures, gains temporary hit points equal to proficiency bonus.",
    apply: function(golem, player) {
      golem.elementalConvergence = player.intMod;
    }
  },

  giant_frame: {
    name: "Giant Frame",
    tags: ["Tank", "DPS"],
    effect: "Golem size increases by one category (max Huge).",
    details: "Increases HP, STR, CON, reach, but reduced speed and disadvantage on DEX saves.",
    apply: function(golem, player) {
      golem.giant = true;
    }
  }
};
