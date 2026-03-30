const TEMPLATES = {

  stone: {
    name: "Stone",
    apply: (golem, player) => {
      golem.ac = Math.max(golem.ac, 14 + player.pb);
      golem.damageReduction = (golem.damageReduction || 0) + player.pb;
      golem.speed -= 5;
    }
  },

  clay: {
    name: "Clay",
    apply: (golem, player) => {
      golem.regen = player.pb;
      golem.clayWeakness = true;
    }
  },

  wood: {
    name: "Wood",
    apply: (golem) => {
      golem.dex = Math.max(golem.dex, 14);
      golem.stealthProf = true;
      golem.bonusHide = true;
    }
  },

  metal: {
    name: "Metal",
    apply: (golem, player) => {
      golem.ac = Math.max(golem.ac, 16 + player.pb);
      golem.bonusDamage = (golem.bonusDamage || 0) + 2;
      golem.speed -= 5;
    }
  },

  earth: {
    name: "Earth",
    apply: (golem) => {
      golem.resistances = (golem.resistances || []).concat("acid");
      golem.earthAdvantage = true;
      golem.ignoreTerrain = true;
    }
  },

  cloth: {
    name: "Cloth",
    apply: (golem) => {
      golem.squeeze = true;
      golem.grappleAdv = true;
      golem.smother = true;
    }
  },

  bone: {
    name: "Bone",
    apply: (golem) => {
      golem.auraDebuff = true;
      golem.necroticBonus = 2;
    }
  },

  blood: {
    name: "Blood",
    apply: (golem, player) => {
      golem.squeeze = true;
      golem.grappleAdv = true;
      golem.lifeSteal = player.pb;
    }
  }

};
