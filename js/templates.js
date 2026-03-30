const TEMPLATES = {

  stone: {
    name: "Stone Template",

    apply: (golem, player) => {
      golem.ac = Math.max(golem.ac, 14 + player.pb);
      golem.damageReduction = (golem.damageReduction || 0) + player.pb;
      golem.speed -= 5;
    },

    traits: [
      (player) => `Stone Body. Reduces nonmagical bludgeoning, piercing, and slashing damage by ${player.pb}.`
    ]
  },

  clay: {
    name: "Clay Template",

    apply: () => {},

    traits: [
      (player) => `Regeneration. Regains ${player.pb} HP at start of turn if above 0 HP.`,
      () => `Acid Vulnerability. Regeneration is suppressed after acid damage until end of next turn.`
    ]
  },

  wood: {
    name: "Wood Template",

    apply: (golem) => {
      golem.dex = Math.max(golem.dex, 14);
    },

    traits: [
      () => "Adaptive Frame. Gains proficiency in Stealth.",
      () => "Ambush Protocol. Can Hide as a bonus action."
    ]
  },

  metal: {
    name: "Metal Template",

    apply: (golem, player) => {
      golem.ac = Math.max(golem.ac, 16 + player.pb);
      golem.speed -= 5;
    },

    actions: [
      () => `Reinforced Strike. Deals +1d4 additional damage on hit.`
    ]
  },

  earth: {
    name: "Earth Template",

    apply: () => {},

    traits: [
      () => "Earthbound. Advantage on STR checks and saves while touching ground.",
      () => "Terrain Mastery. Ignores difficult terrain from earth/stone.",
      () => "Resistance to acid damage."
    ]
  },

  cloth: {
    name: "Cloth Template",

    apply: () => {},

    traits: [
      () => "Amorphous Form. Can move through 1-inch spaces.",
      () => "Slippery Form. Advantage vs grapple and restraint."
    ],

    actions: [
      (player) => `Smother. On hit, may grapple target (Escape DC ${8 + player.pb + player.intMod}).`
    ]
  },

  bone: {
    name: "Bone Template",

    apply: () => {},

    traits: [
      () => `Dread Aura. Creatures within 5 ft must succeed on a Wisdom save or have disadvantage on next attack.`
    ],

    actions: [
      () => `Necrotic Strike. Deals +1d4 necrotic damage once per turn.`
    ]
  },

  blood: {
    name: "Blood Template",

    apply: () => {},

    traits: [
      () => "Liquid Form. Can move through 1-inch spaces.",
      () => "Predatory Grip. Advantage on grapple checks."
    ],

    actions: [
      (player) => `Sanguine Absorption. Regains ${player.pb} HP once per turn when dealing damage.`
    ]
  }

};
