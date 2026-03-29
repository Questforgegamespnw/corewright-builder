const INFUSIONS = {
  reinforcedFrame: {
    name: "Reinforced Frame",
    tags: ["Tank"],
    apply: (golem, player) => {
      golem.hp += player.level;
      golem.ac += 1;
    }
  },

  warConstruct: {
    name: "War Construct",
    tags: ["DPS"],
    apply: (golem) => {
      golem.multiAttack = true;
      golem.bonusDamage = (golem.bonusDamage || 0) + 3.5; // avg 1d6
    }
  },

  dexterousManipulators: {
    name: "Dexterous Manipulators",
    tags: ["Utility"],
    apply: (golem) => {
      golem.dex = Math.max(golem.dex, 14);
      golem.weaponUser = true;
    }
  },

  reactivePlating: {
    name: "Reactive Plating",
    tags: ["Tank"],
    apply: (golem, player) => {
      golem.damageReduction = `1d10 + ${player.pb}`;
    }
  },

  overchargedCore: {
    name: "Overcharged Core",
    tags: ["DPS"],
    apply: (golem, player) => {
      golem.burstDamage = 10;
      golem.selfDamage = player.pb;
    }
  },

  graviticCore: {
    name: "Gravitic Core",
    tags: ["Control"],
    apply: (golem, player) => {
      golem.controlEffect = "STR save or prone/pull";
      golem.saveDC = player.spellDC;
    }
  },

  selfRepair: {
    name: "Self-Repair Matrix",
    tags: ["Tank"],
    apply: (golem, player) => {
      golem.regen = player.intMod + player.pb;
    }
  },

  siegeEngine: {
    name: "Siege Engine",
    tags: ["DPS"],
    apply: (golem) => {
      golem.objectDamageMultiplier = 2;
      golem.bonusDamage = (golem.bonusDamage || 0) + 4.5; // avg 1d8
      golem.grantsAdvantage = true;
    }
  },

  reflexiveCounter: {
    name: "Reflexive Countermeasures",
    tags: ["Control"],
    apply: (golem) => {
      golem.reactionAttack = true;
    }
  },

  cognitiveMatrix: {
    name: "Cognitive Matrix",
    tags: ["Utility"],
    apply: (golem, player) => {
      golem.allSaveProf = true;
      golem.intBonus = player.intMod;
    }
  },

  phaseShifter: {
    name: "Phase Shifter",
    tags: ["Utility"],
    apply: (golem) => {
      golem.phasing = true;
    }
  },

  overdrive: {
    name: "Overdrive Protocol",
    tags: ["DPS"],
    apply: (golem, player) => {
      golem.extraAttack = true;
      golem.selfDamage = player.pb;
    }
  },

  adaptivePlating: {
    name: "Adaptive Plating",
    tags: ["Tank"],
    apply: (golem) => {
      golem.adaptiveResist = true;
    }
  },

  replicationMatrix: {
    name: "Replication Matrix",
    tags: ["Utility"],
    apply: (golem, player) => {
      golem.cloneHP = player.level;
    }
  },

  elementalConvergence: {
    name: "Elemental Convergence",
    tags: ["DPS"],
    apply: (golem, player) => {
      golem.elementalBonus = player.intMod;
    }
  },

  giantFrame: {
    name: "Giant Frame",
    tags: ["Tank", "DPS"],
    apply: (golem, player) => {
      golem.sizeUp = true;
      golem.hp += player.level * 2;
      golem.str += 2;
      golem.con += 2;
      golem.reach += 5;
      golem.speed -= 10;
      golem.dexSaveDisadvantage = true;
    }
  }
};
