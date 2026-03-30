export const TEMPLATES = {

  stone: {
    name: "Stone Template",

    apply: (golem, player) => {
      golem.ac = Math.max(golem.ac, 14 + player.pb);
      golem.damageReduction = (golem.damageReduction || 0) + player.pb;
      golem.speed -= 5;
    },

    traits: [
      (p) => `Stone Body. Reduces nonmagical B/P/S damage by ${p.pb}.`
    ]
  },

  clay: {
    name: "Clay Template",

    traits: [
      (p) => `Regeneration. Regains ${p.pb} HP at start of turn if above 0 HP.`,
      () => `Acid Suppression. Regeneration stops until end of next turn after acid damage.`
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
      () => "Reinforced Strike. Deals +1d4 additional damage on hit."
    ]
  },

  earth: {
    name: "Earth Template",

    traits: [
      () => "Earthbound. Advantage on STR checks and saves while grounded.",
      () => "Terrain Mastery. Ignores earth/stone difficult terrain.",
      () => "Resistance to acid damage."
    ]
  },

  cloth: {
    name: "Cloth Template",

    traits: [
      () => "Amorphous Form. Can move through 1-inch spaces.",
      () => "Slippery Form. Advantage vs grapple/restraint."
    ],

    actions: [
      (p) => `Smother. On hit, may grapple (Escape DC ${8 + p.pb + p.intMod}).`
    ]
  },

  bone: {
    name: "Bone Template",

    traits: [
      () => "Dread Aura. Creatures within 5 ft suffer disadvantage on next attack on failed WIS save."
    ],

    actions: [
      () => "Necrotic Strike. Deals +1d4 necrotic damage once per turn."
    ]
  },

  blood: {
    name: "Blood Template",

    traits: [
      () => "Liquid Form. Can move through 1-inch spaces.",
      () => "Predatory Grip. Advantage on grapple checks."
    ],

    actions: [
      (p) => `Sanguine Absorption. Regains ${p.pb} HP once per turn when dealing damage.`
    ]
  }

};
