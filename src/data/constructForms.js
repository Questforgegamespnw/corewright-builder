export const CONSTRUCT_FORMS = [
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
      "This is the default melee form. Once on each of its turns when the golem hits a creature with a Slam, it can force the target to succeed on a Strength saving throw against your spell save DC or be pushed up to 5 feet away.",

    traits: [
      () =>
        "<strong>Brawler Form.</strong> This form is optimized for direct melee engagement and straightforward battlefield control."
    ],

    actions: [
      () =>
        "<strong>Driving Slam.</strong> Once on each of the golem’s turns when it hits a creature with Slam, the target must succeed on a Strength saving throw against your spell save DC or be pushed up to 5 feet away."
    ],

    apply: (golem) => {
      golem.formName = "Brawler Form";
      golem.oncePerTurnOnHit = [
        ...(golem.oncePerTurnOnHit || []),
        {
          source: "brawler_form",
          trigger: "slamHit",
          save: "strength",
          dc: "spellSaveDC",
          onFail: ["push5"]
        }
      ];
    }
  },

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
      "The golem’s speed increases by 10 feet. If it moves at least 20 feet straight toward a creature and then hits it with a melee attack on the same turn, the target must succeed on a Strength saving throw against your spell save DC or be knocked prone. If the target is prone, the golem can immediately make a Rend attack as part of the same action sequence.",

    traits: [
      () =>
        "<strong>Predator Form.</strong> The golem’s speed increases by 10 feet.",
      () =>
        "<strong>Pounce.</strong> If the golem moves at least 20 feet straight toward a creature and then hits it with a melee attack on the same turn, that target must succeed on a Strength saving throw against your spell save DC or be knocked prone."
    ],

    actions: [
      () =>
        "<strong>Rend.</strong> Melee Weapon Attack: use the golem’s Slam attack bonus, reach 5 ft., one prone creature. Hit: 1d8 slashing damage."
    ],

    apply: (golem) => {
      golem.formName = "Predator Form";
      golem.speed += 10;

      golem.actions = [
        ...(golem.actions || []),
        {
          name: "Rend",
          text: "Melee Weapon Attack: use the golem’s Slam attack bonus, reach 5 ft., one prone creature. Hit: 1d8 slashing damage."
        }
      ];

      golem.chargeTriggers = [
        ...(golem.chargeTriggers || []),
        {
          source: "predator_form",
          distance: 20,
          trigger: "meleeHitAfterStraightMove",
          save: "strength",
          dc: "spellSaveDC",
          onFail: ["prone"],
          followupAction: "rend"
        }
      ];
    }
  },

  {
    id: "bulwark",
    name: "Bulwark Form",
    tags: ["Defense", "Control", "Melee"],
    effect: "Guarding form that protects allies and anchors space",
    details:
      "A broad defensive chassis meant to hold doorways, screen allies, and punish creatures that try to slip past it.",

    lore:
      "Towering shield-limbs, braced stance geometry, and defensive combat logic make this form ideal for bodyguard duty.",

    mechanics:
      "When a creature within 5 feet of the golem attacks a target other than it, the golem can use its reaction to impose disadvantage on that attack. In addition, the area within 5 feet of the golem counts as difficult terrain for hostile creatures while the golem is touching the ground.",

    traits: [
      () =>
        "<strong>Bulwark Form.</strong> The area within 5 feet of the golem counts as difficult terrain for hostile creatures while it is touching the ground."
    ],

    reactions: [
      () =>
        "<strong>Intercepting Guard.</strong> When a creature within 5 feet of the golem attacks a target other than it, the golem can use its reaction to impose disadvantage on that attack."
    ],

    apply: (golem) => {
      golem.formName = "Bulwark Form";

      golem.reactions = [
        ...(golem.reactions || []),
        {
          name: "Intercepting Guard",
          text: "When a creature within 5 feet of the golem attacks a target other than it, the golem can use its reaction to impose disadvantage on that attack."
        }
      ];

      golem.zoneEffects = [
        ...(golem.zoneEffects || []),
        {
          source: "bulwark_form",
          radius: 5,
          appliesTo: "hostileCreatures",
          effect: "difficultTerrain",
          condition: "whileTouchingGround"
        }
      ];
    }
  },

  {
    id: "strider",
    name: "Strider Form",
    tags: ["Mobility", "Skirmisher"],
    effect: "Skirmishing form built for rapid repositioning",
    details:
      "A long-limbed pursuit frame that excels at crossing the field, diving through openings, and disengaging from pressure.",

    lore:
      "Extended stride geometry and spring-loaded joints make this form ideal for fast-moving battlefield roles.",

    mechanics:
      "The golem’s speed increases by 10 feet. It can take the Dash or Disengage action as a bonus action without requiring your command. If it moves at least 10 feet before making a Slam attack, it does not provoke opportunity attacks from that target for the rest of the turn.",

    traits: [
      () =>
        "<strong>Strider Form.</strong> The golem’s speed increases by 10 feet.",
      () =>
        "<strong>Slip Through.</strong> If the golem moves at least 10 feet before making a Slam attack, it does not provoke opportunity attacks from that target for the rest of the turn."
    ],

    actions: [],

    apply: (golem) => {
      golem.formName = "Strider Form";
      golem.speed += 10;

      golem.bonusActionsNoCommand = [
        ...(golem.bonusActionsNoCommand || []),
        "dash",
        "disengage"
      ];

      golem.mobilityTriggers = [
        ...(golem.mobilityTriggers || []),
        {
          source: "strider_form",
          trigger: "move10ThenSlam",
          effect: "noOpportunityAttacksFromTarget",
          duration: "rest_of_turn"
        }
      ];
    }
  },

  {
    id: "artillery",
    name: "Artillery Form",
    tags: ["Ranged", "Control", "Utility"],
    effect: "Ranged bombardment form with arcane projection",
    details:
      "A precision siege frame built to fire from the back line rather than commit to direct melee.",

    lore:
      "Stabilized projection lattices and targeting vanes allow the construct to launch controlled blasts of force at range.",

    mechanics:
      "The golem gains an Arcane Bolt ranged attack. In addition, once on each of its turns when it deals damage to a creature with Arcane Bolt, it can reduce that creature’s speed by 10 feet until the start of the golem’s next turn.",

    traits: [
      () =>
        "<strong>Artillery Form.</strong> This form is optimized for ranged attacks and battlefield spacing."
    ],

    actions: [
      () =>
        "<strong>Arcane Bolt.</strong> Ranged Weapon Attack: use the golem’s Slam attack bonus, range 60/240 ft., one target. Hit: 1d8 force damage.",
      () =>
        "<strong>Suppressing Fire.</strong> Once on each of the golem’s turns when it deals damage with Arcane Bolt, it can reduce the target’s speed by 10 feet until the start of the golem’s next turn."
    ],

    apply: (golem) => {
      golem.formName = "Artillery Form";

      golem.actions = [
        ...(golem.actions || []),
        {
          name: "Arcane Bolt",
          text: "Ranged Weapon Attack: use the golem’s Slam attack bonus, range 60/240 ft., one target. Hit: 1d8 force damage."
        }
      ];

      golem.oncePerTurnOnHit = [
        ...(golem.oncePerTurnOnHit || []),
        {
          source: "artillery_form",
          trigger: "arcaneBoltHit",
          onFail: ["speedMinus10UntilStartOfNextTurn"]
        }
      ];
    }
  },

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
      "The golem gains a climbing speed equal to its walking speed. While climbing on a wall or ceiling, it has advantage on checks made to resist being shoved or knocked prone. Once on each of its turns when it hits a creature while climbing, it can force that creature to succeed on a Strength saving throw against your spell save DC or be pulled 5 feet closer to the surface beneath the golem.",

    traits: [
      () =>
        "<strong>Climbing Form.</strong> The golem gains a climbing speed equal to its walking speed.",
      () =>
        "<strong>Wall Grip.</strong> While climbing on a wall or ceiling, the golem has advantage on checks made to resist being shoved or knocked prone."
    ],

    actions: [
      () =>
        "<strong>Wall Drag.</strong> Once on each of the golem’s turns when it hits a creature while climbing, that creature must succeed on a Strength saving throw against your spell save DC or be pulled 5 feet."
    ],

    apply: (golem) => {
      golem.formName = "Climbing Form";
      golem.climbSpeed = golem.speed;

      golem.checkAdvantages = [
        ...(golem.checkAdvantages || []),
        "shoveResistWhileClimbing",
        "proneResistWhileClimbing"
      ];

      golem.oncePerTurnOnHit = [
        ...(golem.oncePerTurnOnHit || []),
        {
          source: "climbing_form",
          trigger: "hitWhileClimbing",
          save: "strength",
          dc: "spellSaveDC",
          onFail: ["pull5"]
        }
      ];
    }
  },

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
      "The golem gains a swimming speed equal to its walking speed and can operate underwater without issue. When it hits a creature while both it and the target are in water, it can reduce the target’s speed by 10 feet until the start of the golem’s next turn.",

    traits: [
      () =>
        "<strong>Aquatic Form.</strong> The golem gains a swimming speed equal to its walking speed.",
      () =>
        "<strong>Water Adaptation.</strong> The golem can function underwater without issue."
    ],

    actions: [
      () =>
        "<strong>Undertow Grip.</strong> When the golem hits a creature while both it and the target are in water, it can reduce that creature’s speed by 10 feet until the start of the golem’s next turn."
    ],

    apply: (golem) => {
      golem.formName = "Aquatic Form";
      golem.swimSpeed = golem.speed;
      golem.waterAdapted = true;

      golem.oncePerTurnOnHit = [
        ...(golem.oncePerTurnOnHit || []),
        {
          source: "aquatic_form",
          trigger: "hitWhileInWater",
          onFail: ["speedMinus10UntilStartOfNextTurn"]
        }
      ];
    }
  },

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
      "The golem can glide, reducing falling danger and allowing horizontal movement while descending. If it descends at least 10 feet before hitting a creature with a melee attack on its turn, it deals an additional 1d6 bludgeoning damage.",

    traits: [
      () =>
        "<strong>Gliding Form.</strong> The golem can glide, reducing falling danger and allowing horizontal movement while descending."
    ],

    actions: [
      () =>
        "<strong>Diving Impact.</strong> If the golem descends at least 10 feet before hitting a creature with a melee attack on its turn, that attack deals an additional 1d6 bludgeoning damage."
    ],

    apply: (golem) => {
      golem.formName = "Gliding Form";
      golem.canGlide = true;

      golem.oncePerTurnOnHit = [
        ...(golem.oncePerTurnOnHit || []),
        {
          source: "gliding_form",
          trigger: "hitAfterDescending10",
          extraDamageDice: "1d6",
          damageType: "bludgeoning"
        }
      ];
    }
  }
];