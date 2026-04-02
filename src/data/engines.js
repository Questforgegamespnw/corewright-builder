export const ENGINES = [
  /* =========================
     No Engine
  ========================= */
  {
    id: "none",
    name: "None",
    damageType: "None",
    role: "Neutral",

    summary: "No engine core installed.",

    description:
      "A baseline golem with no specialized elemental engine.",

    apply() {}
  },

  /* =========================
     Flame Engine
  ========================= */
  {
    id: "flame",
    name: "Flame Engine",
    damageType: "Fire",
    role: "DPS",

    summary: "Burning aura and explosive offensive output.",

    description:
      "A blazing core that radiates heat, ignites the battlefield, and adds fire to its strikes.",

    apply(golem, player) {
      const { pb } = player;

      // === Resistances ===
      golem.damageResistances = [
        ...new Set([...(golem.damageResistances || []), "fire"])
      ];

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        `Flame Engine. The golem has resistance to fire damage.`,
        `Burning Aura. A creature that starts its turn within 5 feet of the golem takes ${pb} fire damage.`,
        `Illumination. The golem sheds bright light in a 20-foot radius and dim light for an additional 20 feet.`,
        `Kindle. The golem can ignite unattended flammable objects that aren't being worn or carried.`
      ];

      // === On-hit effects ===
      golem.onHitEffects = [
        ...(golem.onHitEffects || []),
        `Once on each of its turns, the golem deals an extra 1d8 fire damage when it hits with an attack.`
      ];
    }
  },

  /* =========================
     Frost Engine
  ========================= */
  {
    id: "frost",
    name: "Frost Engine",
    damageType: "Cold",
    role: "Control",

    summary: "Freezing strikes that slow enemy movement.",

    description:
      "A cold core that dampens motion and punishes enemies that try to advance.",

    apply(golem) {
      // === Resistances ===
      golem.damageResistances = [
        ...new Set([...(golem.damageResistances || []), "cold"])
      ];

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        `Frost Engine. The golem has resistance to cold damage.`
      ];

      // === On-hit effects ===
      golem.onHitEffects = [
        ...(golem.onHitEffects || []),
        `Once on each of its turns, the golem deals an extra 1d8 cold damage when it hits with an attack, and the target's speed is reduced by 10 feet until the start of the golem's next turn.`
      ];
    }
  },

  /* =========================
     Storm Engine
  ========================= */
  {
    id: "storm",
    name: "Storm Engine",
    damageType: "Lightning/Thunder",
    role: "Mobility",

    summary: "Fast-moving core that arcs damage between enemies.",

    description:
      "A volatile engine of lightning and thunder that drives speed and battlefield pressure.",

    apply(golem, player) {
      const { pb } = player;

      // === Resistances ===
      golem.damageResistances = [
        ...new Set([
          ...(golem.damageResistances || []),
          "lightning",
          "thunder"
        ])
      ];

      // === Stats ===
      golem.speed += 10;

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        `Storm Engine. The golem has resistance to lightning and thunder damage.`,
        `Charged Motion. The golem's speed increases by 10 feet.`,
        `Surging Advance. The golem can take the Dash action as a bonus action without requiring your command.`
      ];

      // === On-hit effects ===
      golem.onHitEffects = [
        ...(golem.onHitEffects || []),
        `Once on each of its turns, the golem deals an extra 1d8 lightning damage when it hits with an attack. That energy can arc to up to ${pb} other creatures of your choice within 10 feet of the original target, dealing ${pb} lightning damage to each.`
      ];
    }
  },

  /* =========================
     Aether Engine
  ========================= */
  {
    id: "aether",
    name: "Aether Engine",
    damageType: "Force",
    role: "Utility",

    summary: "Hovering, agile engine with force-infused strikes.",

    description:
      "An arcane lift core that grants aerial mobility and refined force projection.",

    apply(golem) {
      // === Resistances ===
      golem.damageResistances = [
        ...new Set([...(golem.damageResistances || []), "force"])
      ];

      // === Movement ===
      golem.flySpeed = golem.speed;

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        `Aether Engine. The golem has resistance to force damage.`,
        `Levitation Matrix. The golem gains a flying speed equal to its walking speed.`
      ];

      // === On-hit effects ===
      golem.onHitEffects = [
        ...(golem.onHitEffects || []),
        `Once on each of its turns, the golem deals an extra 1d8 force damage when it hits with an attack.`
      ];
    }
  },

  /* =========================
     Earth Engine
  ========================= */
  {
    id: "earth",
    name: "Earth Engine",
    damageType: "Earth",
    role: "Tank",

    summary: "Grounded engine that grants mundane durability and crushing stability.",

    description:
      "A dense, earthen core that reinforces structure and grants resistance against mundane weapon damage.",

    apply(golem) {
      const mundaneTypes = [
        "nonmagical bludgeoning",
        "nonmagical piercing",
        "nonmagical slashing"
      ];

      // === Resistances ===
      golem.damageResistances = [
        ...new Set([...(golem.damageResistances || []), ...mundaneTypes])
      ];

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),
        `Earth Engine. The golem has resistance to nonmagical bludgeoning, piercing, and slashing damage.`
      ];

      // === On-hit effects ===
      golem.onHitEffects = [
        ...(golem.onHitEffects || []),
        `Once on each of its turns, the golem deals an extra 1d8 bludgeoning damage when it hits with an attack.`
      ];
    }
  }
];