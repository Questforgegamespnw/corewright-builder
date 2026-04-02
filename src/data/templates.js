function getMod(score) {
  return Math.floor((score - 10) / 2);
}

export const TEMPLATES = [
  /* =========================
     Stone Template
  ========================= */
  {
    id: "stone",
    name: "Stone",
    tag: "Tank",

    summary: "Heavy stone body with reinforced hardness.",

    description:
      "A dense stone shell built for endurance. Stone bodies shrug off lesser blows through raw structural resilience.",

    apply(golem, player) {
      const { pb } = player;

      // === Identity ===
      golem.templateName = "Stone";

      // === Stats ===
      golem.ac = Math.max(golem.ac, 16);
      golem.speed = Math.max(20, golem.speed - 5);
      golem.str = Math.min((golem.str || 10) + 2, 20);
      golem.con = Math.min((golem.con || 10) + 2, 20);

      // === Derived ===
      golem.hardness = (golem.hardness || 0) + pb;

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        `Stone Body. The golem's AC becomes ${16} unless it is already higher.`,
        `Dense Frame. The golem's speed is reduced by 5 feet to a minimum of 20 feet.`,
        `Template Bias. The golem gains +2 Strength and +2 Constitution, to a maximum of 20.`
      ];
    }
  },

  /* =========================
     Clay Template
  ========================= */
  {
    id: "clay",
    name: "Clay",
    tag: "Tank",

    summary: "Self-mending body with regenerative resilience.",

    description:
      "Clay bodies repair themselves with remarkable consistency, though corrosive damage disrupts their recovery.",

    apply(golem, player) {
      const { pb } = player;

      // === Identity ===
      golem.templateName = "Clay";

      // === Stats ===
      golem.con = Math.min((golem.con || 10) + 4, 20);

      // === Regeneration ===
      golem.regen = Math.max(1, getMod(golem.con || 10) + pb);

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        `Malleable Reconstruction. At the start of its turn, the golem regains ${golem.regen} hit points if it has at least 1 hit point.`,
        `Acid Disruption. If the golem takes acid damage, this regeneration doesn't function until the end of its next turn.`,
        `Template Bias. The golem gains +4 Constitution, to a maximum of 20.`
      ];
    }
  },

  /* =========================
     Wood Template
  ========================= */
  {
    id: "wood",
    name: "Wood",
    tag: "Utility",

    summary: "Lighter body with stealth and mobility, but reduced durability.",

    description:
      "A lighter articulated frame that trades durability for agility and subtlety.",

    apply(golem) {
      // === Identity ===
      golem.templateName = "Wood";

      // === Stats ===
      golem.hp -= 20;
      golem.ac = Math.max(golem.ac, 16);
      golem.dex = Math.min((golem.dex || 10) + 2, 20);
      golem.con = Math.min((golem.con || 10) + 2, 20);

      // === Skills ===
      golem.skills = [...new Set([...(golem.skills || []), "Stealth"])];

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        `Light Frame. The golem's hit point maximum is reduced by 20.`,
        `Skulking Shape. The golem gains proficiency in Stealth and can take the Hide action as a bonus action without requiring your command.`,
        `Template Bias. The golem gains +2 Dexterity and +2 Constitution, to a maximum of 20.`
      ];
    }
  },

  /* =========================
     Metal Template
  ========================= */
  {
    id: "metal",
    name: "Metal",
    tag: "Tank",

    summary: "Reinforced plated shell with superior armor and impact reduction.",

    description:
      "A dense metallic body built for prolonged frontline engagements and brutal incoming punishment.",

    apply(golem, player) {
      const { pb } = player;

      // === Identity ===
      golem.templateName = "Metal";

      // === Stats ===
      golem.ac = Math.max(golem.ac, 18);
      golem.str = Math.min((golem.str || 10) + 4, 20);

      // === Derived ===
      golem.damageReductionAll = Math.max(golem.damageReductionAll || 0, pb);

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        `Plated Chassis. The golem's AC becomes ${18} unless it is already higher.`,
        `Impact Dampening. When the golem takes damage, reduce that damage by ${pb}.`,
        `Template Bias. The golem gains +4 Strength, to a maximum of 20.`
      ];
    }
  },

  /* =========================
     Cloth Template
  ========================= */
  {
    id: "cloth",
    name: "Cloth",
    tag: "Control",

    summary: "Very light frame with mobility and evasiveness, but fragile structure.",

    description:
      "A strange animated weave that sacrifices durability for speed and uncanny movement.",

    apply(golem) {
      // === Identity ===
      golem.templateName = "Cloth";

      // === Stats ===
      golem.hp -= 30;
      golem.speed += 10;
      golem.dex = Math.min((golem.dex || 10) + 4, 20);

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        `Woven Frame. The golem's hit point maximum is reduced by 30.`,
        `Unfettered Motion. The golem's speed increases by 10 feet.`,
        `Template Bias. The golem gains +4 Dexterity, to a maximum of 20.`
      ];
    }
  },

  /* =========================
     Bone Template
  ========================= */
  {
    id: "bone",
    name: "Bone",
    tag: "DPS",

    summary: "Jagged, aggressive frame focused on offensive pressure.",

    description:
      "A wickedly articulated structure designed to deliver sharper, deadlier blows.",

    apply(golem, player) {
      const { pb } = player;

      // === Identity ===
      golem.templateName = "Bone";

      // === Stats ===
      golem.str = Math.min((golem.str || 10) + 2, 20);
      golem.dex = Math.min((golem.dex || 10) + 2, 20);
      golem.ac = Math.max(golem.ac, 14);

      // === On-hit effects ===
      golem.onHitEffects = [
        ...(golem.onHitEffects || []),
        `Once on each of its turns, the golem deals an extra ${pb} damage when it hits with an attack.`
      ];

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        `Template Bias. The golem gains +2 Strength and +2 Dexterity, to a maximum of 20.`
      ];
    }
  },

  /* =========================
     Blood Template
  ========================= */
  {
    id: "blood",
    name: "Blood",
    tag: "Control",

    summary: "Unstable alchemical body with eerie persistence and adaptive motion.",

    description:
      "A disturbing living slurry of alchemical fluid and arcane force that behaves less like a construct and more like a stitched experiment.",

    apply(golem) {
      // === Identity ===
      golem.templateName = "Blood";

      // === Stats ===
      golem.hp -= 10;
      golem.speed += 5;
      golem.con = Math.min((golem.con || 10) + 3, 20);
      golem.dex = Math.min((golem.dex || 10) + 1, 20);
      golem.ac = Math.max(golem.ac, 13);
      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        `Viscous Form. The golem's hit point maximum is reduced by 10, and its speed increases by 5 feet.`,
        `Sanguine Flow. The golem can move through a space as narrow as 1 inch wide without squeezing, provided it ends its movement in a space it can occupy.`,
        `Template Bias. The golem gains +3 Constitution and +1 Dexterity, to a maximum of 20.`
      ];
    }
  },

  {
  id: "glass",
  name: "Glass",
  tag: "DPS",

  summary: "Fragile crystalline body that punishes attackers.",

  description:
    "A razor-edged construct of arcane glass that shatters violently under stress.",

  apply(golem, player) {
    const { pb } = player;

    golem.templateName = "Glass";

    // === Stats ===
    golem.hp -= 15;
    golem.ac -= 2;
    golem.dex = Math.min((golem.dex || 10) + 3, 20);

    // === Traits ===
    golem.traits = [
      ...(golem.traits || []),
      `Brittle Form. The golem has vulnerability to bludgeoning damage.`,
      `Shatter Response. When the golem takes damage from a creature within 5 feet, that creature takes ${pb} slashing damage.`,
      `Explosive Fracture. When the golem is reduced to 0 hit points, creatures within 10 feet take ${pb * 2} slashing damage (Dex save for half).`,
      `Template Bias. The golem gains +4 Dexterity, to a maximum of 20.`
    ];
  }
  }
];