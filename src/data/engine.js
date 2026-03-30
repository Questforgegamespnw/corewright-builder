export const ENGINES = {

  flame: {
    name: "Flame Engine",

    apply: (golem, player) => {
      golem.bonusDamage = player.intMod;
    },

    traits: [
      () => "Flame Core. Attacks deal additional fire damage."
    ]
  },

  stone: {
    name: "Stone Engine",

    apply: (golem, player) => {
      golem.damageReduction = (golem.damageReduction || 0) + player.pb;
    },

    traits: [
      (p) => `Reinforced Core. Reduces damage by ${p.pb}.`
    ]
  },

  frost: {
    name: "Frost Engine",

    traits: [
      () => "Freezing Aura. Creatures hit have reduced speed."
    ]
  },

  aether: {
    name: "Aether Engine",

    apply: (golem) => {
      golem.flySpeed = golem.speed;
    },

    traits: [
      () => "Aether Lift. Gains a flying speed."
    ]
  }

};
