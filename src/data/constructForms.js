export const CONSTRUCT_FORMS = [
  /* =========================
     Brawler Form
  ========================= */
  {
    id: "brawler",
    name: "Brawler Form",
    tags: ["Balanced", "Melee"],

    effect: "Baseline melee form with a driving slam",

    details:
      "A broad-shouldered combat frame built for direct impact, grappling leverage, and straightforward frontline fighting.",

    lore:
      "This is the classic workshop bruiser: reinforced limbs, low center of gravity, and enough striking mass to send creatures skidding backward.",

    mechanics:
      "The golem gains +3 Strength and +1 Constitution, to a maximum of 20. Once on each of its turns when the golem hits a creature with a Slam, it can force the target to succeed on a Strength saving throw against your spell save DC or be pushed up to 5 feet away.",

    apply(golem) {
      // === Identity ===
      golem.formName = "Brawler Form";

      // === Stats ===
      golem.str = Math.min((golem.str || 10) + 3, 20);
      golem.con = Math.min((golem.con || 10) + 1, 20);

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        "Form Bias. The golem gains +3 Strength and +1 Constitution, to a maximum of 20."
      ];

      // === Actions ===
      golem.actions = [
        ...(golem.actions || []),
        {
          name: "Driving Slam",
          text: "Once on each of the golem's turns when it hits a creature with Slam, that creature must succeed on a Strength saving throw against your spell save DC or be pushed up to 5 feet away."
        }
      ];
    }
  },

  /* =========================
     Predator Form
  ========================= */
  {
    id: "predator",
    name: "Predator Form",
    tags: ["Mobility", "DPS", "Melee"],

    effect: "Fast hunter form with pounce-and-rend pressure",

    details:
      "A low, aggressive silhouette designed to lunge, pin, and tear through isolated targets.",

    lore:
      "Bestial articulation, coiled limbs, and a predatory motion profile turn the construct into a relentless pursuer.",

    mechanics:
      "The golem's speed increases by 10 feet. It can take the Dash action as a bonus action without requiring your command. If it moves at least 20 feet straight toward a creature and then hits it with a melee attack on the same turn, the target must succeed on a Strength saving throw against your spell save DC or be knocked prone.",

    apply(golem) {
      // === Identity ===
      golem.formName = "Predator Form";

      // === Stats ===
      golem.speed += 10;
      golem.dex = Math.min((golem.dex || 10) + 4, 20);

      // === Combat mode ===
      golem.attackAbilityMode = "bestOfStrDex";

      // === Behavior ===
      golem.bonusActionsNoCommand = [
        ...(golem.bonusActionsNoCommand || []),
        "dash"
      ];

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        "Form Bias. The golem gains +4 Dexterity, to a maximum of 20.",
        "Predatory Precision. The golem can use Strength or Dexterity, whichever is higher, for its attack and damage rolls.",
        "Pursuit Instinct. The golem can take the Dash action as a bonus action without requiring your command."
      ];

      // === Actions ===
      golem.actions = [
        ...(golem.actions || []),
        {
          name: "Rend",
          text: "Melee Weapon Attack: use the golem's Slam attack bonus, reach 5 ft., one prone creature. Hit: 1d8 slashing damage."
        }
      ];
    }
  },

  /* =========================
     Bulwark Form
  ========================= */
  {
    id: "bulwark",
    name: "Bulwark Form",
    tags: ["Defense", "Control", "Melee"],

    effect: "Guarding form that protects allies and anchors space",

    details:
      "A fortified defensive frame built to hold territory, intercept enemies, and punish reckless advances.",

    lore:
      "Heavy plating, shield-like proportions, and defensive routines turn the construct into a living barricade.",

    mechanics:
      "The golem gains +4 Constitution, to a maximum of 20. When a hostile creature enters the golem's reach for the first time on a turn, the golem can make one melee attack against that creature as a reaction.",

    apply(golem) {
      // === Identity ===
      golem.formName = "Bulwark Form";

      // === Stats ===
      golem.con = Math.min((golem.con || 10) + 4, 20);

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        "Form Bias. The golem gains +4 Constitution, to a maximum of 20.",
        "Defender Frame. When a hostile creature enters the golem's reach for the first time on a turn, the golem can make one melee attack against that creature as a reaction."
      ];

      // === Reactions ===
      golem.reactionAttackTriggers = [
        ...(golem.reactionAttackTriggers || []),
        {
          trigger: "enemyEntersReach",
          attackType: "melee",
          frequency: "firstTimePerTurn"
        }
      ];
    }
  },

  /* =========================
     Artillery Form
  ========================= */
  {
    id: "artillery",
    name: "Artillery Form",
    tags: ["Ranged", "Control", "Utility"],

    effect: "Ranged bombardment form with arcane projection",

    details:
      "A precision bombardment frame built to maintain distance, project force, and punish enemies from afar.",

    lore:
      "Stabilized firing limbs, anchored recoil geometry, and arcane projection chambers turn the construct into a mobile siege battery.",

    mechanics:
      "The golem gains +3 Dexterity and +1 Strength, to a maximum of 20. Its Slam damage die becomes 1d6. It can use Strength or Dexterity, whichever is higher, for its attack and damage rolls. Its primary attack becomes Arcane Bolt. The golem can take the Disengage action as a bonus action without requiring your command.",

    apply(golem) {
      // === Identity ===
      golem.formName = "Artillery Form";

      // === Stats ===
      golem.dex = Math.min((golem.dex || 10) + 3, 20);
      golem.str = Math.min((golem.str || 10) + 1, 20);
      golem.slamDamageDie = "1d6";

      // === Combat mode ===
      golem.attackAbilityMode = "bestOfStrDex";
      golem.primaryAttackMode = "ranged";
      golem.rangedAttack = {
        name: "Arcane Bolt",
        range: "60/240 ft.",
        damageDie: "1d10",
        damageType: "force"
      };

      // === Behavior ===
      golem.bonusActionsNoCommand = [
        ...(golem.bonusActionsNoCommand || []),
        "disengage"
      ];

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        "Form Bias. The golem gains +3 Dexterity and +1 Strength, to a maximum of 20.",
        "Bombardment Frame. The golem can use Strength or Dexterity, whichever is higher for attacks and damage rolls.",
        "Repositioning Thrusters. The golem can take the Disengage action as a bonus action without requiring your command."
      ];
    }
  },

  /* =========================
     Climbing Form
  ========================= */
  {
    id: "climber",
    name: "Climbing Form",
    tags: ["Mobility", "Control"],

    effect: "Wall-scaling form with positional pressure",

    details:
      "A creature-shaped frame specialized for vertical traversal, ambush angles, and impossible positioning.",

    lore:
      "Hooked limbs, gripping pads, and spider-like articulation allow the construct to cling to surfaces and strike from above.",

    mechanics:
      "The golem gains a climbing speed equal to its walking speed. It can take the Dash action as a bonus action without requiring your command. While climbing on a wall or ceiling, it has advantage on checks made to resist being shoved or knocked prone. Once on each of its turns when it hits a creature while climbing, it can force that creature to succeed on a Strength saving throw against your spell save DC or be pulled 5 feet.",

    apply(golem) {
      // === Identity ===
      golem.formName = "Climbing Form";

      // === Stats ===
      golem.climbSpeed = golem.speed;
      golem.dex = Math.min((golem.dex || 10) + 3, 20);
      golem.con = Math.min((golem.con || 10) + 1, 20);

      // === Behavior ===
      golem.bonusActionsNoCommand = [
        ...(golem.bonusActionsNoCommand || []),
        "dash"
      ];

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        "Form Bias. The golem gains +3 Dexterity and +1 Constitution, to a maximum of 20.",
        "Wall Grip. While climbing on a wall or ceiling, the golem has advantage on checks made to resist being shoved or knocked prone.",
        "Vertical Pursuit. The golem can take the Dash action as a bonus action without requiring your command."
      ];

      // === Actions ===
      golem.actions = [
        ...(golem.actions || []),
        {
          name: "Wall Drag",
          text: "Once on each of the golem's turns when it hits a creature while climbing, that creature must succeed on a Strength saving throw against your spell save DC or be pulled 5 feet."
        }
      ];
    }
  },

  /* =========================
     Aquatic Form
  ========================= */
  {
    id: "aquatic",
    name: "Aquatic Form",
    tags: ["Mobility", "Utility", "Control"],

    effect: "Underwater pursuit form with drag-and-pin pressure",

    details:
      "An aquatic frame built for water travel, submerged combat, and harassment in difficult environments.",

    lore:
      "Fin-like appendages, sealed joints, and pressure-stable systems let the construct operate in depths that would ruin lesser creations.",

    mechanics:
      "The golem gains a swimming speed equal to its walking speed and can operate underwater without issue. It can take the Disengage action as a bonus action without requiring your command. When it hits a creature while both it and the target are in water, it can reduce that creature's speed by 10 feet until the start of the golem's next turn.",

    apply(golem) {
      // === Identity ===
      golem.formName = "Aquatic Form";

      // === Stats ===
      golem.swimSpeed = golem.speed;
      golem.str = Math.min((golem.str || 10) + 2, 20);
      golem.dex = Math.min((golem.dex || 10) + 2, 20);

      // === Special flags ===
      golem.waterAdapted = true;

      // === Behavior ===
      golem.bonusActionsNoCommand = [
        ...(golem.bonusActionsNoCommand || []),
        "disengage"
      ];

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        "Form Bias. The golem gains +2 Strength and +2 Dexterity, to a maximum of 20.",
        "Water Adaptation. The golem can function underwater without issue.",
        "Fluid Withdrawal. The golem can take the Disengage action as a bonus action without requiring your command."
      ];

      // === Actions ===
      golem.actions = [
        ...(golem.actions || []),
        {
          name: "Undertow Grip",
          text: "When the golem hits a creature while both it and the target are in water, it can reduce that creature's speed by 10 feet until the start of the golem's next turn."
        }
      ];
    }
  },

  /* =========================
     Gliding Form
  ========================= */
  {
    id: "glider",
    name: "Gliding Form",
    tags: ["Mobility", "Skirmisher"],

    effect: "Descent-and-reposition form built for aerial approach",

    details:
      "A lightweight aerial frame that uses membranes, vanes, or rigid fins to descend safely and reposition from height.",

    lore:
      "Though not truly winged flight, this form turns gravity into tactical motion and allows dramatic battlefield entry angles.",

    mechanics:
      "The golem can glide, reducing falling danger and allowing horizontal movement while descending. It can take the Dash action as a bonus action without requiring your command. If it descends at least 10 feet before hitting a creature with a melee attack on its turn, that attack deals an additional 1d6 bludgeoning damage.",

    apply(golem) {
      // === Identity ===
      golem.formName = "Gliding Form";

      // === Stats ===
      golem.dex = Math.min((golem.dex || 10) + 4, 20);

      // === Combat mode ===
      golem.attackAbility = "dex";

      // === Special flags ===
      golem.canGlide = true;

      // === Behavior ===
      golem.bonusActionsNoCommand = [
        ...(golem.bonusActionsNoCommand || []),
        "dash"
      ];

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        "Form Bias. The golem gains +4 Dexterity, to a maximum of 20.",
        "Aerial Precision. The golem uses Dexterity for its attack and damage rolls.",
        "Gliding Form. The golem can glide, reducing falling danger and allowing horizontal movement while descending.",
        "Dive Vectoring. The golem can take the Dash action as a bonus action without requiring your command."
      ];

      // === Actions ===
      golem.actions = [
        ...(golem.actions || []),
        {
          name: "Diving Impact",
          text: "If the golem descends at least 10 feet before hitting a creature with a melee attack on its turn, that attack deals an additional 1d6 bludgeoning damage."
        }
      ];
    }
  },

  {
  id: "constrictor",
  name: "Constrictor Form",
  tags: ["Control", "Melee", "Grapple"],

  effect: "Grapple-focused form built to seize and restrain targets",

  details:
    "A heavy capture frame built with crushing limbs, locking joints, and leverage-focused geometry designed to pin enemies in place.",

  lore:
    "Coiling armatures, clamp-like appendages, and brutal restraint mechanisms turn the construct into a battlefield warden that specializes in immobilizing prey.",

  mechanics:
    "The golem gains +2 Strength and +2 Constitution, to a maximum of 20. It has advantage on checks made to initiate or maintain a grapple. When the golem hits a creature with a Slam, it can immediately attempt to grapple that creature. While the golem is grappling a creature, it has advantage on attack rolls made to maintain the grapple or prevent that creature from escaping. If the golem starts its turn grappling a creature, it can force that creature to make a Strength saving throw against your spell save DC or become restrained until the grapple ends.",

  apply(golem) {
    // === Identity ===
    golem.formName = "Constrictor Form";

    // === Stats ===
    golem.str = Math.min((golem.str || 10) + 2, 20);
    golem.con = Math.min((golem.con || 10) + 2, 20);

    // === Grapple flags ===
    golem.grappleAdvantage = true;
    golem.grappleEscapeDc = "spellSaveDC";
    golem.canAutoGrappleOnHit = true;
    golem.canRestrainGrappledTargets = true;

    // === Traits ===
    golem.traits = [
      ...(golem.traits || []),
      "Form Bias. The golem gains +2 Strength and +2 Constitution, to a maximum of 20.",
      "Constriction Frame. The golem has advantage on checks made to initiate or maintain a grapple.",
      "Locking Grip. When the golem hits a creature with Slam, it can immediately attempt to grapple that creature.",
      "Crushing Hold. If the golem starts its turn grappling a creature, that creature must succeed on a Strength saving throw against your spell save DC or be restrained until the grapple ends."
    ];

    // === Actions ===
    golem.actions = [
      ...(golem.actions || []),
      {
        name: "Locking Grip",
        text: "When the golem hits a creature with Slam, it can immediately attempt to grapple that creature."
      },
      {
        name: "Crushing Hold",
        text: "If the golem starts its turn grappling a creature, that creature must succeed on a Strength saving throw against your spell save DC or be restrained until the grapple ends."
      }
    ];
  }
},
  
];