const TEMPLATES = {

  stone: {
    name: "Stone Template",
    apply: (golem, player) => {
      golem.ac = Math.max(golem.ac, 14 + player.pb);
      golem.damageReduction = (golem.damageReduction || 0) + player.pb;
      golem.speed -= 5;

      golem.traits.push(
        `Stone Body. Reduces nonmagical bludgeoning, piercing, and slashing damage by ${player.pb}.`
      );
    }
  },

  clay: {
    name: "Clay Template",
    apply: (golem, player) => {
      golem.traits.push(
        `Regeneration. Regains ${player.pb} HP at start of turn if above 0 HP.`,
        `Acid Vulnerability. This regeneration is suppressed after taking acid damage until end of next turn.`
      );
    }
  },

  wood: {
    name: "Wood Template",
    apply: (golem, player) => {
      golem.dex = Math.max(golem.dex, 14);

      golem.traits.push(
        "Adaptive Frame. Gains proficiency in Stealth.",
        "Ambush Protocol. Can Hide as a bonus action."
      );
    }
  },

  metal: {
    name: "Metal Template",
    apply: (golem, player) => {
      golem.ac = Math.max(golem.ac, 16 + player.pb);
      golem.speed -= 5;

      golem.actions.push(
        `Reinforced Strike. Deals +1d4 additional damage on hit.`
      );
    }
  },

  earth: {
    name: "Earth Template",
    apply: (golem, player) => {
      golem.traits.push(
        "Earthbound. Advantage on STR checks and saves while touching ground.",
        "Terrain Mastery. Ignores difficult terrain from earth/stone.",
        "Resistance to acid damage."
      );
    }
  },

  cloth: {
    name: "Cloth Template",
    apply: (golem, player) => {
      golem.traits.push(
        "Amorphous Form. Can move through 1-inch spaces.",
        "Slippery Form. Advantage vs grapple and restraint."
      );

      golem.actions.push(
        `Smother. On hit, may grapple target (Escape DC ${8 + player.pb + player.intMod}).`
      );
    }
  },

  bone: {
    name: "Bone Template",
    apply: (golem, player) => {
      golem.actions.push(
        `Necrotic Strike. Deals +1d4 necrotic damage once per turn.`
      );

      golem.traits.push(
        `Dread Aura. Creatures within 5 ft must succeed on a Wisdom save or have disadvantage on next attack.`
      );
    }
  },

  blood: {
    name: "Blood Template",
    apply: (golem, player) => {
      golem.traits.push(
        "Liquid Form. Can move through 1-inch spaces.",
        "Predatory Grip. Advantage on grapple checks."
      );

      golem.actions.push(
        `Sanguine Absorption. Regains ${player.pb} HP once per turn when dealing damage.`
      );
    }
  }

};
