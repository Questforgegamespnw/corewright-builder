const ENGINES = {

  flame: {
    name: "Flame Engine",

    apply: (golem, player) => {
      golem.bonusDamage = (golem.bonusDamage || 0) + player.intMod;
    },

    traits: [
      () => "Flame Core. Attacks deal additional fire damage equal to INT modifier."
    ]
  },

  stone: {
    name: "Stone Engine",

    apply: (golem, player) => {
      golem.damageReduction = (golem.damageReduction || 0) + player.pb;
    },

    traits: [
      (player) => `Reinforced Core. Reduces incoming damage by ${player.pb}.`
    ]
  },

  frost: {
    name: "Frost Engine",

    apply: () => {},

    traits: [
      () => "Cryo Core. Movement speed of struck enemies reduced (flavor, expand later)."
    ]
  },

  aether: {
    name: "Aether Engine",

    apply: (golem) => {
      golem.flySpeed = golem.speed;
    },

    traits: [
      () => "Aether Core. Gains a flying speed equal to walking speed."
    ]
  }

};
