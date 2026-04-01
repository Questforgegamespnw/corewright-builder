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
      "Once on each of its turns when the golem hits a creature with a Slam, it can force the target to succeed on a Strength saving throw against your spell save DC or be pushed up to 5 feet away.",

    apply(golem) {
      golem.formName = "Brawler Form";
      golem.str = Math.min((golem.str || 10) + 3, 20);
      golem.con = Math.min((golem.con || 10) + 1, 20);

      golem.traits.push(
        `Form Bias. The golem gains +3 Strength and +1 Constitution, to a maximum of 20.`
      );

      golem.actions = [
        ...(golem.actions || []),
        {
          name: "Driving Slam",
          text: "Once on each of the golem's turns when it hits a creature with Slam, that creature must succeed on a Strength saving throw against your spell save DC or be pushed up to 5 feet away."
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
      "The golem's speed increases by 10 feet. If it moves at least 20 feet straight toward a creature and then hits it with a melee attack on the same turn, the target must succeed on a Strength saving throw against your spell save DC or be knocked prone.",

    apply(golem) {
      golem.formName = "Predator Form";
      golem.speed += 10;
      golem.dex = Math.min((golem.dex || 10) + 4, 20);
      golem.attackAbilityMode = "bestOfStrDex";

      golem.traits.push(
        `Form Bias. The golem gains +4 Dexterity, to a maximum of 20.`
      );
      golem.traits.push(
        `Predatory Precision. The golem can use Strength or Dexterity, whichever is higher, for its attack and damage rolls.`
      );

      golem.actions = [
        ...(golem.actions || []),
        {
          name: "Rend",
          text: "Melee Weapon Attack: use the golem's Slam attack bonus, reach 5 ft., one prone creature. Hit: 1d8 slashing damage."
        }
      ];
    }
  },

  {
    id: "bulwark",
    name: "Bulwark Form",
    tags: ["Defense", "Control", "Melee"],
    effect: "Guarding form that protects allies and anchors space",
    details: "...",
    lore: "...",
    mechanics: "...",

    apply(golem) {
      golem.formName = "Bulwark Form";
      golem.con = Math.min((golem.con || 10) + 4, 20);

      golem.traits.push(
        `Form Bias. The golem gains +4 Constitution, to a maximum of 20.`
      );
    }
  },

  {
    id: "artillery",
    name: "Artillery Form",
    tags: ["Ranged", "Control", "Utility"],
    effect: "Ranged bombardment form with arcane projection",
    details: "...",
    lore: "...",
    mechanics: "...",

    apply(golem) {
      golem.formName = "Artillery Form";
      golem.dex = Math.min((golem.dex || 10) + 3, 20);
      golem.str = Math.min((golem.str || 10) + 1, 20);

      golem.attackAbilityMode = "bestOfStrDex";
      golem.primaryAttackMode = "ranged";

      golem.rangedAttack = {
        name: "Arcane Bolt",
        range: "60/240 ft.",
        damageDie: "1d10",
        damageType: "force"
      };

      golem.slamDamageDie = "1d6";

      golem.traits.push(
        `Form Bias. The golem gains +3 Dexterity and +1 Strength, to a maximum of 20.`
      );
      golem.traits.push(
        `Bombardment Frame. The golem can use Strength or Dexterity, whichever is higher for attacks.`
      );
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
      "The golem gains a climbing speed equal to its walking speed. While climbing on a wall or ceiling, it has advantage on checks made to resist being shoved or knocked prone. Once on each of its turns when it hits a creature while climbing, it can force that creature to succeed on a Strength saving throw against your spell save DC or be pulled 5 feet.",

    apply(golem) {
      golem.formName = "Climbing Form";
      golem.climbSpeed = golem.speed;
      golem.dex = Math.min((golem.dex || 10) + 3, 20);
      golem.con = Math.min((golem.con || 10) + 1, 20);

      golem.traits.push(
        `Form Bias. The golem gains +3 Dexterity and +1 Constitution, to a maximum of 20.`
      );
      golem.traits.push(
        `Wall Grip. While climbing on a wall or ceiling, the golem has advantage on checks made to resist being shoved or knocked prone.`
      );

      golem.actions = [
        ...(golem.actions || []),
        {
          name: "Wall Drag",
          text: "Once on each of the golem's turns when it hits a creature while climbing, that creature must succeed on a Strength saving throw against your spell save DC or be pulled 5 feet."
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
      "The golem gains a swimming speed equal to its walking speed and can operate underwater without issue. When it hits a creature while both it and the target are in water, it can reduce that creature's speed by 10 feet until the start of the golem's next turn.",

    apply(golem) {
      golem.formName = "Aquatic Form";
      golem.swimSpeed = golem.speed;
      golem.waterAdapted = true;
      golem.str = Math.min((golem.str || 10) + 2, 20);
      golem.dex = Math.min((golem.dex || 10) + 2, 20);

      golem.traits.push(
        `Form Bias. The golem gains +2 Strength and +2 Dexterity, to a maximum of 20.`
      );
      golem.traits.push(
        `Water Adaptation. The golem can function underwater without issue.`
      );

      golem.actions = [
        ...(golem.actions || []),
        {
          name: "Undertow Grip",
          text: "When the golem hits a creature while both it and the target are in water, it can reduce that creature's speed by 10 feet until the start of the golem's next turn."
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
      "The golem can glide, reducing falling danger and allowing horizontal movement while descending. If it descends at least 10 feet before hitting a creature with a melee attack on its turn, that attack deals an additional 1d6 bludgeoning damage.",

    apply(golem) {
      golem.formName = "Gliding Form";
      golem.canGlide = true;
      golem.dex = Math.min((golem.dex || 10) + 4, 20);
      golem.attackAbility = "dex";

      golem.traits.push(
        `Form Bias. The golem gains +4 Dexterity, to a maximum of 20.`
      );
      golem.traits.push(
        `Aerial Precision. The golem uses Dexterity for its attack and damage rolls.`
      );
      golem.traits.push(
        `Gliding Form. The golem can glide, reducing falling danger and allowing horizontal movement while descending.`
      );

      golem.actions = [
        ...(golem.actions || []),
        {
          name: "Diving Impact",
          text: "If the golem descends at least 10 feet before hitting a creature with a melee attack on its turn, that attack deals an additional 1d6 bludgeoning damage."
        }
      ];
    }
  }
];