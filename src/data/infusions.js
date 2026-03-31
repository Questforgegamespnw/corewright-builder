export const INFUSIONS = [
  // ===== BASE INFUSIONS =====
  {
    id: "reinforced_frame",
    name: "Reinforced Frame",
    tier: "base",
    prerequisiteLevel: null,
    tags: ["Tank"],
    effect: "+2 AC, +level HP",
    details:
      "The golem’s frame is reinforced with denser materials, increasing both durability and armor.",

    lore:
      "Additional plating and internal supports allow the construct to absorb tremendous punishment.",

    mechanics:
      "The golem’s hit point maximum increases by your artificer level, and it gains a +2 bonus to Armor Class.",

    traits: [
      (p) =>
        `<strong>Reinforced Frame.</strong> The golem’s hit point maximum increases by ${p.level}, and it gains +2 AC.`
    ],

    apply: (golem, player) => {
      golem.hp += player.level;
      golem.maxHp = (golem.maxHp || golem.hp) + player.level;
      golem.ac += 2;
    }
  },

  {
    id: "war_construct",
    name: "War Construct",
    tier: "advanced",
    prerequisiteLevel: 9,
    tags: ["DPS"],
    effect: "2 attacks, +1d6 force per attack",
    details:
      "The golem is redesigned for sustained offensive output.",

    lore:
      "Improved targeting systems, reinforced limbs, and integrated weaponry convert the construct into a dedicated combat platform.",

    mechanics:
      "When you command the golem to take the Attack action, it can make two attacks instead of one. Each of its attacks deals an additional 1d6 force damage.",

    actions: [
      () =>
        "<strong>War Construct.</strong> When commanded to take the Attack action, the golem makes two attacks instead of one.",
      () =>
        "<strong>Force-Enhanced Strikes.</strong> Each of its attacks deals an additional 1d6 force damage."
    ],

    apply: (golem) => {
      golem.attackActionAttacks = Math.max(golem.attackActionAttacks || 1, 2);
      golem.onEveryHit = [
        ...(golem.onEveryHit || []),
        {
          damageDice: "1d6",
          damageType: "force"
        }
      ];
    }
  },

  {
    id: "dexterous_manipulators",
    name: "Dexterous Manipulators",
    tier: "base",
    prerequisiteLevel: null,
    tags: ["Utility"],
    effect: "DEX 14, weapons, object use",
    details:
      "Finely articulated appendages allow the golem to handle weapons and manipulate objects with precision.",

    lore:
      "Miniaturized servos, complex finger assemblies, and articulated joints allow humanoid-like interactions.",

    mechanics:
      "The golem’s Dexterity becomes 14 unless already higher. It gains proficiency with simple weapons, can wield weapons and manipulate objects as a humanoid would, replaces Arcane Strikes with wielded weapon attacks, and can take the Use an Object action without requiring your command.",

    traits: [
      () =>
        "<strong>Dexterous Manipulators.</strong> The golem’s Dexterity becomes 14 unless already higher.",
      () =>
        "<strong>Weapon Handling.</strong> The golem gains proficiency with simple weapons and can wield weapons and manipulate objects as a humanoid would.",
      () =>
        "<strong>Weapon Integration.</strong> The golem replaces its Arcane Strikes with wielded weapon attacks.",
      () =>
        "<strong>Autonomous Interaction.</strong> The golem can take the Use an Object action without requiring your command."
    ],

    apply: (golem) => {
      golem.dex = Math.max(golem.dex, 14);
      golem.weaponProficiencies = [
        ...new Set([...(golem.weaponProficiencies || []), "simple"])
      ];
      golem.canWieldWeapons = true;
      golem.canManipulateObjects = true;
      golem.replacesArcaneStrikesWithWeaponAttacks = true;
      golem.freeActionsNoCommand = [
        ...(golem.freeActionsNoCommand || []),
        "useObject"
      ];
    }
  },

  {
    id: "accelerated_servos",
    name: "Accelerated Servos",
    tier: "base",
    prerequisiteLevel: null,
    tags: ["Utility", "Mobility"],
    effect: "+10 ft speed, Dash/Disengage BA",
    details:
      "Enhanced joints and arcane propulsion systems improve speed and fluid movement.",

    lore:
      "Lighter materials and aggressive arcane servos allow sudden bursts of motion.",

    mechanics:
      "The golem’s movement speed increases by 10 feet. It can take the Dash or Disengage action as a bonus action without requiring your command.",

    traits: [
      () => "<strong>Accelerated Servos.</strong> The golem’s speed increases by 10 feet.",
      () =>
        "<strong>Responsive Mobility.</strong> It can take the Dash or Disengage action as a bonus action without requiring your command."
    ],

    apply: (golem) => {
      golem.speed += 10;
      golem.bonusActionsNoCommand = [
        ...(golem.bonusActionsNoCommand || []),
        "dash",
        "disengage"
      ];
    }
  },

  {
    id: "reactive_plating",
    name: "Reactive Plating",
    tier: "base",
    prerequisiteLevel: null,
    tags: ["Tank"],
    effect: "Reaction damage reduction",
    details:
      "Dynamic plating absorbs incoming force and disperses it across the frame.",

    lore:
      "Shifting armor plates and impact-dampening fields lessen incoming blows.",

    mechanics:
      "When the golem takes damage, it can use its reaction to reduce that damage by 1d10 + your proficiency bonus.",

    reactions: [
      (p) =>
        `<strong>Reactive Plating.</strong> When the golem takes damage, it can use its reaction to reduce that damage by 1d10 + ${p.pb}.`
    ],

    apply: (golem, player) => {
      golem.damageReductionReaction = {
        dice: "1d10",
        flat: player.pb
      };
    }
  },

  {
    id: "arcane_conduit",
    name: "Arcane Conduit",
    tier: "base",
    prerequisiteLevel: null,
    tags: ["Utility", "Spellcasting"],
    effect: "Deliver touch spells",
    details:
      "The golem becomes an extension of your spellcasting.",

    lore:
      "Arcane conduits woven into the construct’s frame allow magic to be channeled through it.",

    mechanics:
      "When you cast a spell with a range of touch, your golem can deliver the spell as if it had cast it, provided the golem is within 30 feet of you at the time of casting.",

    traits: [
      () =>
        "<strong>Arcane Conduit.</strong> When you cast a touch-range spell, your golem can deliver the spell as if it had cast it.",
      () =>
        "<strong>Spell Relay.</strong> The golem must be within 30 feet of you at the time of casting."
    ],

    apply: (golem) => {
      golem.canDeliverTouchSpells = true;
      golem.touchSpellRangeFromCaster = 30;
    }
  },

  {
    id: "anchored_frame",
    name: "Anchored Frame",
    tier: "base",
    prerequisiteLevel: null,
    tags: ["Tank", "Control"],
    effect: "Anti-movement stabilization",
    details:
      "The golem is stabilized against battlefield displacement and restraint.",

    lore:
      "Grounding enchantments and a low center of gravity keep the construct rooted in place.",

    mechanics:
      "The golem has advantage on saving throws against being knocked prone, pushed, or pulled. Effects that would forcibly move it move it no more than 10 feet. It has advantage on checks and saving throws made to resist grapples or restraints.",

    traits: [
      () =>
        "<strong>Anchored Frame.</strong> The golem has advantage on saves against being knocked prone, pushed, or pulled.",
      () =>
        "<strong>Stabilized Positioning.</strong> Effects that would forcibly move the golem move it no more than 10 feet.",
      () =>
        "<strong>Grounded Structure.</strong> The golem has advantage on checks and saving throws to resist grapples or restraints."
    ],

    apply: (golem) => {
      golem.saveAdvantages = [
        ...(golem.saveAdvantages || []),
        "prone",
        "push",
        "pull",
        "grapple",
        "restraint"
      ];

      golem.checkAdvantages = [
        ...(golem.checkAdvantages || []),
        "grappleResist",
        "restraintResist"
      ];

      golem.maxForcedMovement = 10;
    }
  },

  {
    id: "overcharged_core",
    name: "Overcharged Core",
    tier: "base",
    prerequisiteLevel: null,
    tags: ["DPS"],
    effect: "Once/turn +10 force, self-damage",
    details:
      "The golem channels unstable energy through its attacks.",

    lore:
      "This volatile infusion pushes the core past safe tolerances, trading durability for burst damage.",

    mechanics:
      "Once per turn, when the golem hits a creature, it deals an additional 10 force damage. Immediately after dealing this damage, the golem takes force damage equal to your proficiency bonus.",

    actions: [
      (p) =>
        `<strong>Overcharged Core.</strong> Once per turn on hit, the golem deals an additional 10 force damage, then takes ${p.pb} force damage.`
    ],

    apply: (golem, player) => {
      golem.oncePerTurnOnHit = [
        ...(golem.oncePerTurnOnHit || []),
        {
          damage: 10,
          damageType: "force",
          selfDamage: player.pb,
          selfDamageType: "force"
        }
      ];
    }
  },

  {
    id: "sentinel_protocol",
    name: "Sentinel Protocol",
    tier: "base",
    prerequisiteLevel: null,
    tags: ["Control", "Defense"],
    effect: "Reaction attack to protect allies",
    details:
      "The golem is programmed to punish enemies that attack nearby allies.",

    lore:
      "Defensive protocols prioritize allied protection and battlefield interception.",

    mechanics:
      "When a creature within 5 feet of the golem makes an attack against a target other than it, the golem can use its reaction to make one melee attack against that creature.",

    reactions: [
      () =>
        "<strong>Sentinel Protocol.</strong> When a creature within 5 feet of the golem attacks a target other than it, the golem can use its reaction to make one melee attack against that creature."
    ],

    apply: (golem) => {
      golem.reactionAttackTriggers = [
        ...(golem.reactionAttackTriggers || []),
        {
          trigger: "enemyAttacksOtherTargetWithin5ft",
          attackType: "melee"
        }
      ];
    }
  },

  // ===== ADVANCED INFUSIONS =====
  {
    id: "gravitic_core",
    name: "Gravitic Core",
    tier: "advanced",
    prerequisiteLevel: 9,
    tags: ["Control"],
    effect: "Pull or prone on failed STR save",
    details:
      "The golem manipulates localized gravitational forces around nearby foes.",

    lore:
      "Distortion fields and arcane gravity wells twist movement around the construct.",

    mechanics:
      "Once per turn, the golem can select a target within 15 feet that it can see. The target must make a Strength saving throw against your spell save DC. On a failure, you choose whether the creature is knocked prone or pulled up to 10 feet toward the golem.",

    actions: [
      () =>
        "<strong>Gravitic Core.</strong> Once per turn, the golem can force a creature within 15 feet that it can see to make a Strength saving throw.",
      () =>
        "<strong>Gravitic Collapse.</strong> On a failed save, you choose whether the target is knocked prone or pulled up to 10 feet toward the golem."
    ],

    apply: (golem) => {
      golem.oncePerTurnActiveEffects = [
        ...(golem.oncePerTurnActiveEffects || []),
        {
          range: 15,
          save: "strength",
          dc: "spellSaveDC",
          onFail: ["prone", "pull10TowardGolem"]
        }
      ];
    }
  },

  {
    id: "self_repair_matrix",
    name: "Self-Repair Matrix",
    tier: "advanced",
    prerequisiteLevel: 9,
    tags: ["Tank"],
    effect: "Start-turn regeneration",
    details:
      "Autonomous repair systems continuously restore structural integrity.",

    lore:
      "Regenerative enchantments and self-mending matrices close cracks and rebuild damaged components.",

    mechanics:
      "At the start of each of its turns, the golem regains hit points equal to your Intelligence modifier + your proficiency bonus. If it takes acid or fire damage, this regeneration is suppressed until the end of its next turn.",

    traits: [
      (p) =>
        `<strong>Self-Repair Matrix.</strong> At the start of each of its turns, the golem regains ${p.intMod} + ${p.pb} hit points.`,
      () =>
        "<strong>Suppression.</strong> If it takes acid or fire damage, this regeneration is suppressed until the end of its next turn."
    ],

    apply: (golem, player) => {
      golem.regen = player.intMod + player.pb;
      golem.regenSuppressedBy = ["acid", "fire"];
      golem.regenSuppressionDuration = "until_end_of_next_turn";
    }
  },

  {
    id: "siege_engine",
    name: "Siege Engine",
    tier: "advanced",
    prerequisiteLevel: 9,
    tags: ["DPS"],
    effect: "Object damage, +1d8 force, defensive drawback",
    details:
      "A destructive configuration specialized for shattering fortifications.",

    lore:
      "Reinforced impact assemblies and breaching enchantments turn the construct into a living battering ram.",

    mechanics:
      "The golem’s attacks deal double damage to objects and structures. When it hits a creature, it deals an additional 1d8 force damage, but attack rolls against it have advantage until the start of its next turn.",

    actions: [
      () =>
        "<strong>Siege Engine.</strong> The golem’s attacks deal double damage to objects and structures.",
      () =>
        "<strong>Breaching Strike.</strong> When it hits a creature, it deals an additional 1d8 force damage.",
      () =>
        "<strong>Overextended Defense.</strong> Attack rolls against the golem have advantage until the start of its next turn."
    ],

    apply: (golem) => {
      golem.doubleDamageVs = [
        ...(golem.doubleDamageVs || []),
        "objects",
        "structures"
      ];

      golem.onEveryHit = [
        ...(golem.onEveryHit || []),
        {
          damageDice: "1d8",
          damageType: "force"
        }
      ];

      golem.selfDebuffsOnHit = [
        ...(golem.selfDebuffsOnHit || []),
        {
          effect: "attacksAgainstHaveAdvantage",
          duration: "until_start_of_next_turn"
        }
      ];
    }
  },

  {
    id: "reflexive_countermeasures",
    name: "Reflexive Countermeasures",
    tier: "advanced",
    prerequisiteLevel: 9,
    tags: ["Control", "Defense"],
    effect: "Counterattack on miss, anti-multiattack AC rise",
    details:
      "Automated defenses retaliate against failed attacks and adapt against repeated strikes.",

    lore:
      "Pattern analysis routines let the golem punish missed attacks and harden against sustained aggression.",

    mechanics:
      "When a creature misses the golem with an attack, it can use its reaction to make one melee attack against that creature. When struck by a multiattack, its AC temporarily increases by 4 against repeated attacks from the same creature.",

    reactions: [
      () =>
        "<strong>Reflexive Countermeasures.</strong> When a creature misses the golem with an attack, it can use its reaction to make one melee attack against that creature.",
      () =>
        "<strong>Pattern Adaptation.</strong> When struck by a multiattack, the golem’s AC increases by 4 against repeated attacks from the same creature."
    ],

    apply: (golem) => {
      golem.reactionAttackTriggers = [
        ...(golem.reactionAttackTriggers || []),
        {
          trigger: "enemyMissesGolem",
          attackType: "melee"
        }
      ];

      golem.multiattackDefense = {
        acBonus: 4,
        scope: "sameCreatureRepeatedAttacks"
      };
    }
  },

  // ===== MASTERWORK INFUSIONS =====
  {
    id: "cognitive_matrix",
    name: "Cognitive Matrix",
    tier: "masterwork",
    prerequisiteLevel: 15,
    tags: ["Utility", "Defense"],
    effect: "All save proficiency, INT to checks/saves, bonus Help",
    details:
      "The golem approaches true sentience, becoming more adaptive and tactically aware.",

    lore:
      "A near-sentient mind lattice grants advanced cognition and learning capability.",

    mechanics:
      "The golem gains proficiency in all saving throws. It can add your Intelligence modifier to its ability checks and saving throws. It can take the Help action as a bonus action without requiring your command.",

    traits: [
      () =>
        "<strong>Cognitive Matrix.</strong> The golem gains proficiency in all saving throws.",
      (p) =>
        `<strong>Adaptive Intelligence.</strong> The golem adds ${p.intMod} to its ability checks and saving throws.`,
      () =>
        "<strong>Autonomous Assistance.</strong> The golem can take the Help action as a bonus action without requiring your command."
    ],

    apply: (golem, player) => {
      golem.proficientSaves = "all";
      golem.bonusToAbilityChecks = (golem.bonusToAbilityChecks || 0) + player.intMod;
      golem.bonusToSavingThrows =
        (golem.bonusToSavingThrows || 0) + player.intMod;

      golem.bonusActionsNoCommand = [
        ...(golem.bonusActionsNoCommand || []),
        "help"
      ];
    }
  },

  {
    id: "phase_shifter",
    name: "Phase Shifter",
    tier: "masterwork",
    prerequisiteLevel: 15,
    tags: ["Utility", "Mobility"],
    effect: "Bonus-action incorporeality",
    details:
      "The golem partially steps outside reality to move through matter.",

    lore:
      "Planar phase instability lets the construct slip through obstacles at terrible cost if trapped.",

    mechanics:
      "As a bonus action, without requiring your command, the golem becomes incorporeal until the start of its next turn. While incorporeal, it can move through creatures and objects as difficult terrain. If it ends its turn inside an object, it takes force damage equal to twice your proficiency bonus.",

    traits: [
      () =>
        "<strong>Phase Shifter.</strong> As a bonus action, the golem becomes incorporeal until the start of its next turn.",
      () =>
        "<strong>Unreal Passage.</strong> While incorporeal, it can move through creatures and objects as difficult terrain.",
      (p) =>
        `<strong>Phase Rejection.</strong> If it ends its turn inside an object, it takes ${p.pb * 2} force damage.`
    ],

    apply: (golem, player) => {
      golem.bonusActionsNoCommand = [
        ...(golem.bonusActionsNoCommand || []),
        "phaseShift"
      ];

      golem.phaseShift = {
        duration: "until_start_of_next_turn",
        movementThroughCreaturesAndObjects: true,
        movementMode: "difficultTerrain",
        endTurnInObjectDamage: player.pb * 2,
        endTurnInObjectDamageType: "force"
      };
    }
  },

  {
    id: "overdrive_protocol",
    name: "Overdrive Protocol",
    tier: "masterwork",
    prerequisiteLevel: 15,
    tags: ["DPS"],
    effect: "Extra attack, self-damage",
    details:
      "The golem pushes beyond safe operational limits for extreme offense.",

    lore:
      "Combat governors are disabled, allowing peak output at the expense of structural stability.",

    mechanics:
      "When you command the golem to take the Attack action, it can make one additional attack. At the end of its turn, it takes force damage equal to your proficiency bonus.",

    actions: [
      () =>
        "<strong>Overdrive Protocol.</strong> When commanded to take the Attack action, the golem makes one additional attack.",
      (p) =>
        `<strong>System Strain.</strong> At the end of its turn, the golem takes ${p.pb} force damage.`
    ],

    apply: (golem, player) => {
      golem.additionalAttackWhenCommanded = (golem.additionalAttackWhenCommanded || 0) + 1;
      golem.endOfTurnSelfDamage = [
        ...(golem.endOfTurnSelfDamage || []),
        {
          damage: player.pb,
          damageType: "force"
        }
      ];
    }
  },

  {
    id: "adaptive_plating",
    name: "Adaptive Plating",
    tier: "masterwork",
    prerequisiteLevel: 15,
    tags: ["Tank"],
    effect: "Reaction resistance by damage type",
    details:
      "The golem dynamically adapts to survive incoming threats.",

    lore:
      "Smart armor layers reconfigure instantly in response to damage patterns.",

    mechanics:
      "When the golem takes damage, it can use its reaction to gain resistance to that damage type until the end of its next turn.",

    reactions: [
      () =>
        "<strong>Adaptive Plating.</strong> When the golem takes damage, it can use its reaction to gain resistance to that damage type until the end of its next turn."
    ],

    apply: (golem) => {
      golem.adaptiveResistanceReaction = {
        duration: "until_end_of_next_turn",
        basedOnIncomingDamageType: true
      };
    }
  },

  {
    id: "replication_matrix",
    name: "Replication Matrix",
    tier: "masterwork",
    prerequisiteLevel: 15,
    tags: ["Utility"],
    effect: "Create temporary duplicate",
    details:
      "The golem briefly divides into a secondary construct.",

    lore:
      "An unstable duplication matrix produces a temporary adjacent echo of the construct.",

    mechanics:
      "As an action, the golem creates a duplicate in an adjacent space. The duplicate has hit points equal to your artificer level and uses your golem’s attack bonus. It lasts for 1 minute or until reduced to 0 hit points. Once used, this feature cannot be used again until you finish a long rest.",

    actions: [
      (p) =>
        `<strong>Replication Matrix.</strong> As an action, the golem creates a duplicate in an adjacent space with ${p.level} hit points.`,
      () =>
        "<strong>Mirrored Assault.</strong> The duplicate uses your golem’s attack bonus and lasts for 1 minute or until reduced to 0 hit points.",
      () =>
        "<strong>Limited Use.</strong> Once used, this feature cannot be used again until you finish a long rest."
    ],

    apply: (golem, player) => {
      golem.replicationMatrix = {
        duplicateHp: player.level,
        usesAttackBonus: true,
        duration: "1_minute",
        recharge: "longRest",
        spawn: "adjacentSpace"
      };
    }
  },

  {
    id: "elemental_convergence",
    name: "Elemental Convergence",
    tier: "masterwork",
    prerequisiteLevel: 15,
    tags: ["DPS", "Synergy"],
    effect: "Engine-type bonus damage and temp HP",
    details:
      "The golem’s elemental core becomes more potent and synergistic.",

    lore:
      "Its core resonates with its engine type, amplifying aligned elemental output.",

    mechanics:
      "When your golem deals damage matching its Engine Core type, it deals additional damage equal to your Intelligence modifier. If it damages multiple creatures with that type in a turn, it gains temporary hit points equal to your proficiency bonus.",

    actions: [
      (p) =>
        `<strong>Elemental Convergence.</strong> When the golem deals damage matching its Engine Core type, it deals an additional ${p.intMod} damage.`,
      (p) =>
        `<strong>Resonant Overflow.</strong> If it damages multiple creatures with that type in a turn, it gains ${p.pb} temporary hit points.`
    ],

    apply: (golem, player) => {
      golem.elementalConvergence = {
        bonusDamage: player.intMod,
        requiresMatchingEngineType: true,
        multiTargetTempHp: player.pb
      };
    }
  },

  {
    id: "colossus",
    name: "Colossus",
    tier: "masterwork",
    prerequisiteLevel: 15,
    tags: ["Tank", "Control"],
    effect: "Larger size, +PB Hardness, crushing presence",
    details:
      "The golem is rebuilt on a massive scale, becoming a true engine of destruction.",

    lore:
      "Expanded mass, reinforced leverage, and impossible density turn the construct into a siege-body that can simply endure what would shatter lesser creations.",

    mechanics:
      "Its size increases by one category, up to Huge. Its hit point maximum increases by twice your artificer level. It gains additional Hardness equal to your proficiency bonus. Its melee reach increases by 5 feet. Once per turn, when it hits a Large or smaller creature, it can force the target to make a Strength saving throw against your spell save DC or be knocked prone or pushed 10 feet. Its speed is reduced by 10 feet and it has disadvantage on Dexterity saving throws.",

    traits: [
      () =>
        "<strong>Colossus.</strong> The golem’s size increases by one category, to a maximum of Huge.",
      (p) =>
        `<strong>Massive Construction.</strong> The golem’s hit point maximum increases by ${p.level * 2}, and it gains additional Hardness equal to ${p.pb}.`,
      () =>
        "<strong>Crushing Presence.</strong> Its melee reach increases by 5 feet, and once per turn on hit it can force a Strength saving throw against your spell save DC to knock a Large or smaller target prone or push it 10 feet.",
      () =>
        "<strong>Heavy Frame.</strong> Its speed is reduced by 10 feet and it has disadvantage on Dexterity saving throws."
    ],

    apply: (golem, player) => {
      golem.size = nextSizeCategory(golem.size);
      golem.hp += player.level * 2;
      golem.maxHp = (golem.maxHp || golem.hp) + player.level * 2;
      golem.reach = (golem.reach || 5) + 5;
      golem.speed -= 10;

      golem.hardnessBonus = (golem.hardnessBonus || 0) + player.pb;

      golem.disadvantages = [
        ...(golem.disadvantages || []),
        "dexteritySavingThrows"
      ];

      golem.oncePerTurnOnHit = [
        ...(golem.oncePerTurnOnHit || []),
        {
          targetSizeMax: "Large",
          save: "strength",
          dc: "spellSaveDC",
          onFailChoice: ["prone", "push10"]
        }
      ];
    }
  }
];

function nextSizeCategory(currentSize) {
  const sizes = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"];
  const currentIndex = sizes.indexOf(currentSize || "Medium");

  if (currentIndex === -1) return "Large";
  if (sizes[currentIndex] === "Huge" || sizes[currentIndex] === "Gargantuan") {
    return currentSize;
  }

  return sizes[currentIndex + 1];
}