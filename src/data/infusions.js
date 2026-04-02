export const INFUSIONS = [
  /* =========================
     BASE INFUSIONS
  ========================= */
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

    apply(golem, player) {
      golem.hp += player.level;
      golem.maxHp = (golem.maxHp || golem.hp) + player.level;
      golem.ac += 2;
    }
  },

  {
    id: "dexterous_manipulators",
    name: "Dexterous Manipulators",
    tier: "base",
    prerequisiteLevel: null,
    tags: ["Utility"],

    effect: "DEX becomes 14, weapons, object use",

    details:
      "Finely articulated appendages allow the golem to handle weapons and manipulate objects with precision.",

    lore:
      "Miniaturized servos, complex finger assemblies, and articulated joints allow humanoid-like interactions.",

    mechanics:
      "The golem’s Dexterity becomes 14. It gains proficiency with simple weapons, can wield weapons and manipulate objects as a humanoid would, replaces Arcane Strikes with wielded weapon attacks, and can take the Use an Object action without requiring your command.",

    traits: [
      () =>
        "<strong>Dexterous Manipulators.</strong> The golem’s Dexterity becomes 14.",
      () =>
        "<strong>Weapon Handling.</strong> The golem gains proficiency with simple weapons and can wield weapons and manipulate objects as a humanoid would.",
      () =>
        "<strong>Weapon Integration.</strong> The golem replaces its Arcane Strikes with wielded weapon attacks.",
      () =>
        "<strong>Autonomous Interaction.</strong> The golem can take the Use an Object action without requiring your command."
    ],

    apply(golem) {
      golem.dex = 14;
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

    effect: "+15 ft speed",

    details:
      "Enhanced joints and arcane propulsion systems dramatically improve speed and fluid movement.",

    lore:
      "Lighter materials and aggressive arcane servos allow sudden bursts of motion and sustained rapid repositioning.",

    mechanics:
      "The golem’s movement speed increases by 15 feet.",

    traits: [
      () =>
        "<strong>Accelerated Servos.</strong> The golem’s speed increases by 15 feet."
    ],

    apply(golem) {
      golem.speed += 15;
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

    apply(golem, player) {
      golem.damageReductionReaction = {
        dice: "1d10",
        flat: player.pb
      };
    }
  },

  {
    id: "adaptive_plating",
    name: "Adaptive Plating",
    tier: "base",
    prerequisiteLevel: null,
    tags: ["Tank"],

    effect: "Gain resistance to the last damage type taken",

    details:
      "The golem dynamically adapts to survive incoming threats.",

    lore:
      "Smart armor layers reconfigure instantly in response to damage patterns, hardening against the most recent threat.",

    mechanics:
      "When the golem takes damage, it gains resistance to that damage type until the end of its next turn.",

    traits: [
      () =>
        "<strong>Adaptive Plating.</strong> When the golem takes damage, it gains resistance to that damage type until the end of its next turn."
    ],

    apply(golem) {
      golem.adaptiveResistance = {
        duration: "until_end_of_next_turn",
        basedOnIncomingDamageType: true
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

    apply(golem) {
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

    apply(golem) {
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

    apply(golem, player) {
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

    apply(golem) {
      golem.reactionAttackTriggers = [
        ...(golem.reactionAttackTriggers || []),
        {
          trigger: "enemyAttacksOtherTargetWithin5ft",
          attackType: "melee"
        }
      ];
    }
  },

  /* =========================
     ADVANCED INFUSIONS
  ========================= */
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

    apply(golem) {
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

    apply(golem) {
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
      "At the start of each of its turns, the golem regains hit points equal to its Constitution modifier + your proficiency bonus. If it takes acid or fire damage, this regeneration is suppressed until the end of its next turn.",

    traits: [
      (p) =>
        `<strong>Self-Repair Matrix.</strong> At the start of each of its turns, the golem regains hit points equal to its Constitution modifier + ${p.pb}.`,
      () =>
        "<strong>Suppression.</strong> If it takes acid or fire damage, this regeneration is suppressed until the end of its next turn."
    ],

    apply(golem, player) {
      const conMod = Math.floor(((golem.con || 10) - 10) / 2);

      golem.regen = Math.max(
        golem.regen || 0,
        Math.max(1, conMod + player.pb)
      );

      golem.regenSuppressedBy = [
        ...new Set([...(golem.regenSuppressedBy || []), "acid", "fire"])
      ];

      golem.regenSuppressionDuration = "until_end_of_next_turn";
    }
  },

  {
    id: "siege_engine",
    name: "Siege Engine",
    tier: "advanced",
    prerequisiteLevel: 9,
    tags: ["Utility", "Control"],

    effect: "Structure damage, ignores Hardness, defensive exposure",

    details:
      "A destructive configuration specialized for reducing fortifications, barriers, and battlefield structures to rubble.",

    lore:
      "Reinforced impact assemblies and breaching enchantments turn the construct into a living battering ram built to obliterate terrain in its path.",

    mechanics:
      "The golem’s attacks deal double damage to objects and structures. Its attacks ignore Hardness values of objects and structures. Attack rolls against the golem have advantage until the start of its next turn.",

    actions: [
      () =>
        "<strong>Siege Engine.</strong> The golem’s attacks deal double damage to objects and structures.",
      () =>
        "<strong>Breaching Force.</strong> The golem’s attacks ignore Hardness values of objects and structures.",
      () =>
        "<strong>Overextended Defense.</strong> Attack rolls against the golem have advantage until the start of its next turn."
    ],

    apply(golem) {
      golem.doubleDamageVs = [
        ...(golem.doubleDamageVs || []),
        "objects",
        "structures"
      ];

      golem.ignoresHardnessVs = [
        ...(golem.ignoresHardnessVs || []),
        "objects",
        "structures"
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

    effect: "Counterattack on miss",

    details:
      "Automated defenses retaliate against failed attacks with immediate force.",

    lore:
      "Pattern analysis routines let the golem instantly exploit openings left by clumsy or misjudged attacks.",

    mechanics:
      "When a creature misses the golem with an attack, it can use its reaction to make one melee attack against that creature.",

    reactions: [
      () =>
        "<strong>Reflexive Countermeasures.</strong> When a creature misses the golem with an attack, it can use its reaction to make one melee attack against that creature."
    ],

    apply(golem) {
      golem.reactionAttackTriggers = [
        ...(golem.reactionAttackTriggers || []),
        {
          trigger: "enemyMissesGolem",
          attackType: "melee"
        }
      ];
    }
  },

  {
    id: "predictive_guard_matrix",
    name: "Predictive Guard Matrix",
    tier: "advanced",
    prerequisiteLevel: 9,
    tags: ["Tank", "Defense"],

    effect: "AC rises against repeated attacks from the same creature",

    details:
      "Defensive forecasting routines help the golem adapt mid-assault against sustained attack sequences.",

    lore:
      "Threat-pattern analysis lets the construct anticipate follow-up strikes and shift its defenses into the correct position before impact lands.",

    mechanics:
      "When a creature hits the golem with an attack, the golem’s AC increases by 4 against subsequent attacks made by that same creature until the start of the golem’s next turn.",

    traits: [
      () =>
        "<strong>Predictive Guard Matrix.</strong> When a creature hits the golem with an attack, the golem’s AC increases by 4 against subsequent attacks made by that same creature until the start of the golem’s next turn."
    ],

    apply(golem) {
      golem.multiattackDefense = {
        acBonus: 4,
        scope: "sameCreatureRepeatedAttacks",
        duration: "until_start_of_next_turn"
      };
    }
  },

  {
    id: "sundering_strikes",
    name: "Sundering Strikes",
    tier: "advanced",
    prerequisiteLevel: 9,
    tags: ["DPS", "Control"],

    effect: "Slam/ranged hits reduce AC by PB, max once per creature",

    details:
      "Precision impact routines weaken enemy defenses and expose structural flaws.",

    lore:
      "Each blow is guided to stress points, cracked plating, weak joints, and unstable seams that leave the target easier to damage.",

    mechanics:
      "When the golem hits a creature with a Slam or ranged attack, that creature’s AC is reduced by your proficiency bonus until the start of the golem’s next turn. A creature can be affected by this feature only once at a time.",

    actions: [
      (p) =>
        `<strong>Sundering Strikes.</strong> When the golem hits a creature with a Slam or ranged attack, that creature’s AC is reduced by ${p.pb} until the start of the golem’s next turn. A creature can be affected by this feature only once at a time.`
    ],

    apply(golem, player) {
      golem.oncePerCreatureOnHit = [
        ...(golem.oncePerCreatureOnHit || []),
        {
          attackTypes: ["slam", "ranged"],
          effect: "reduceAC",
          amount: player.pb,
          duration: "until_start_of_next_turn",
          maxInstancesPerCreature: 1
        }
      ];
    }
  },

  {
    id: "adamantine_plating",
    name: "Adamantine Plating",
    tier: "advanced",
    prerequisiteLevel: 9,
    tags: ["Tank", "Defense"],

    effect: "Critical hits against the golem become normal hits",

    details:
      "The golem is armored with impossibly resilient plating that negates catastrophic structural failures.",

    lore:
      "Adamantine reinforcement prevents weak-point collapses and turns lethal critical impacts into ordinary blows.",

    mechanics:
      "Critical hits against the golem become normal hits.",

    traits: [
      () =>
        "<strong>Adamantine Plating.</strong> Critical hits against the golem become normal hits."
    ],

    apply(golem) {
      golem.critImmunity = true;
    }
  },

  /* =========================
     MASTERWORK INFUSIONS
  ========================= */
  {
    id: "cognitive_matrix",
    name: "Cognitive Matrix",
    tier: "masterwork",
    prerequisiteLevel: 15,
    tags: ["Utility", "Defense"],

    effect: "Mental stats become 10, all save proficiency, INT to checks/saves, bonus Help",

    details:
      "The golem approaches true sentience, becoming more adaptive and tactically aware.",

    lore:
      "A near-sentient mind lattice grants advanced cognition and learning capability without fully awakening the construct into independent personhood.",

    mechanics:
      "The golem’s Intelligence, Wisdom, and Charisma become 10 unless already higher. It gains proficiency in all saving throws. It can add your Intelligence modifier to its ability checks and saving throws. It can take the Help action as a bonus action without requiring your command.",

    traits: [
      () =>
        "<strong>Cognitive Matrix.</strong> The golem’s Intelligence, Wisdom, and Charisma become 10 unless already higher.",
      () =>
        "<strong>Cognitive Matrix.</strong> The golem gains proficiency in all saving throws.",
      (p) =>
        `<strong>Adaptive Intelligence.</strong> The golem adds ${p.intMod} to its ability checks and saving throws.`,
      () =>
        "<strong>Autonomous Assistance.</strong> The golem can take the Help action as a bonus action without requiring your command."
    ],

    apply(golem, player) {
      golem.int = Math.max(golem.int || 0, 10);
      golem.wis = Math.max(golem.wis || 0, 10);
      golem.cha = Math.max(golem.cha || 0, 10);

      golem.proficientSaves = "all";
      golem.bonusToAbilityChecks =
        (golem.bonusToAbilityChecks || 0) + player.intMod;
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

    effect: "Bonus-action incorporeality and advantaged first strike",

    details:
      "The golem partially steps outside reality to move through matter and strike from impossible angles.",

    lore:
      "Planar phase instability lets the construct slip through obstacles at terrible cost if trapped, while briefly desynchronizing it from normal defenses.",

    mechanics:
      "As a bonus action, without requiring your command, the golem becomes incorporeal until the start of its next turn. While incorporeal, it can move through creatures and objects as difficult terrain. The first attack it makes before the start of its next turn has advantage. If it ends its turn inside an object, it is shunted to the nearest unoccupied space and takes force damage equal to twice your proficiency bonus.",

    traits: [
      () =>
        "<strong>Phase Shifter.</strong> As a bonus action, the golem becomes incorporeal until the start of its next turn.",
      () =>
        "<strong>Unreal Passage.</strong> While incorporeal, it can move through creatures and objects as difficult terrain.",
      () =>
        "<strong>Phase Ambush.</strong> The first attack the golem makes before the start of its next turn has advantage.",
      (p) =>
        `<strong>Phase Rejection.</strong> If the golem ends its turn inside an object, it is moved to the nearest unoccupied space and takes ${p.pb * 2} force damage.`
    ],

    apply(golem, player) {
      golem.bonusActionsNoCommand = [
        ...(golem.bonusActionsNoCommand || []),
        "phaseShift"
      ];

      golem.phaseShift = {
        duration: "until_start_of_next_turn",
        movementThroughCreaturesAndObjects: true,
        movementMode: "difficultTerrain",
        firstAttackAdvantage: true,
        endTurnInObjectDamage: player.pb * 2,
        endTurnInObjectDamageType: "force",
        ejectToNearestUnoccupiedSpace: true
      };
    }
  },

  {
    id: "overdrive_protocol",
    name: "Overdrive Protocol",
    tier: "masterwork",
    prerequisiteLevel: 15,
    tags: ["DPS"],

    effect: "Advantage on attacks, vulnerability window, self-damage",

    details:
      "The golem pushes beyond safe operational limits, sacrificing defense for overwhelming offensive pressure.",

    lore:
      "Combat governors are disabled, allowing peak output at the expense of structural stability.",

    mechanics:
      "When commanded to take the Attack action, the golem can enter Overdrive until the start of its next turn. While in Overdrive, it has advantage on attack rolls, but attack rolls against it also have advantage. At the end of its turn, it takes force damage equal to your proficiency bonus.",

    actions: [
      () =>
        "<strong>Overdrive Protocol.</strong> When commanded to take the Attack action, the golem can enter Overdrive, gaining advantage on attack rolls until the start of its next turn.",
      () =>
        "<strong>System Instability.</strong> While Overdrive is active, attack rolls against the golem have advantage.",
      (p) =>
        `<strong>System Strain.</strong> At the end of its turn, the golem takes ${p.pb} force damage.`
    ],

    apply(golem, player) {
      golem.overdrive = {
        grantsAdvantage: true,
        grantsAdvantageAgainstSelf: true,
        duration: "until_start_of_next_turn"
      };

      golem.endOfTurnSelfDamage = [
        ...(golem.endOfTurnSelfDamage || []),
        {
          damage: player.pb,
          damageType: "force",
          source: "overdrive"
        }
      ];
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

    apply(golem, player) {
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
    tags: ["DPS"],

    effect: "Upgrades engine damage scaling",

    details:
      "The golem’s elemental core intensifies and reaches higher destructive thresholds as its power grows.",

    lore:
      "Its core enters a resonant state, allowing its native elemental output to ascend beyond standard limits.",

    mechanics:
      "The extra damage granted by your Engine Core improves as you reach higher levels: 1d8 at 15th level, 1d10 at 17th level, and 1d12 at 20th level.",

    actions: [
      () =>
        "<strong>Elemental Convergence.</strong> The extra damage from your Engine Core improves to 1d10 at 17th level and 1d12 at 20th level."
    ],

    apply(golem) {
      golem.upgradedEngineScaling = true;
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

    apply(golem, player) {
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