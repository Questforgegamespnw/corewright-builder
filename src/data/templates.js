export const TEMPLATES = [
  {
    id: "stone",
    name: "Stone",
    tag: "Tank",
    summary: "Heavy stone body with reinforced hardness.",
    description:
      "A dense stone shell built for endurance. Stone bodies shrug off lesser blows through raw structural resilience.",
    apply(golem, player) {
      const { pb } = player;

      golem.templateName = "Stone";
      golem.ac = Math.max(golem.ac, 16 + pb);
      golem.speed = Math.max(20, golem.speed - 5);
      golem.hardness = (golem.hardness || 0) + pb;

      golem.str = Math.min((golem.str || 10) + 2, 20);
      golem.con = Math.min((golem.con || 10) + 2, 20);

      golem.traits.push(
        `Stone Body. The golem's AC becomes ${16 + pb} unless it is already higher.`
      );
      golem.traits.push(
        `Dense Frame. The golem's speed is reduced by 5 feet to a minimum of 20 feet.`
      );
      golem.traits.push(
        `Template Bias. The golem gains +2 Strength and +2 Constitution, to a maximum of 20.`
      );
    },
  },

  {
    id: "clay",
    name: "Clay",
    tag: "Tank",
    summary: "Self-mending body with regenerative resilience.",
    description:
      "Clay bodies repair themselves with remarkable consistency, though corrosive damage disrupts their recovery.",
    apply(golem, player) {
      const { pb } = player;

      golem.templateName = "Clay";
      golem.con = Math.min((golem.con || 10) + 4, 20);

      golem.traits.push(
        `Malleable Reconstruction. At the start of its turn, the golem regains ${pb} hit points if it has at least 1 hit point.`
      );
      golem.traits.push(
        `Acid Disruption. If the golem takes acid damage, this regeneration doesn't function until the end of its next turn.`
      );
      golem.traits.push(
        `Template Bias. The golem gains +4 Constitution, to a maximum of 20.`
      );
    },
  },

  {
    id: "wood",
    name: "Wood",
    tag: "Utility",
    summary: "Lighter body with stealth and mobility, but reduced durability.",
    description:
      "A lighter articulated frame that trades durability for agility and subtlety.",
    apply(golem) {
      golem.templateName = "Wood";
      golem.hp -= 20;
      golem.dex = Math.min((golem.dex || 10) + 2, 20);
      golem.con = Math.min((golem.con || 10) + 2, 20);

      golem.skills = golem.skills || [];
      if (!golem.skills.includes("Stealth")) golem.skills.push("Stealth");

      golem.traits.push(
        `Light Frame. The golem's hit point maximum is reduced by 20.`
      );
      golem.traits.push(
        `Skulking Shape. The golem gains proficiency in Stealth and can take the Hide action as a bonus action without requiring your command.`
      );
      golem.traits.push(
        `Template Bias. The golem gains +2 Dexterity and +2 Constitution, to a maximum of 20.`
      );
    },
  },

  {
    id: "metal",
    name: "Metal",
    tag: "Tank",
    summary: "Reinforced plated shell with superior armor and impact reduction.",
    description:
      "A dense metallic body built for prolonged frontline engagements and brutal incoming punishment.",
    apply(golem, player) {
      const { pb } = player;

      golem.templateName = "Metal";
      golem.ac = Math.max(golem.ac, 18 + pb);
      golem.damageReductionAll = Math.max(golem.damageReductionAll || 0, pb);
      golem.str = Math.min((golem.str || 10) + 4, 20);

      golem.traits.push(
        `Plated Chassis. The golem's AC becomes ${18 + pb} unless it is already higher.`
      );
      golem.traits.push(
        `Impact Dampening. When the golem takes damage, reduce that damage by ${pb}.`
      );
      golem.traits.push(
        `Template Bias. The golem gains +4 Strength, to a maximum of 20.`
      );
    },
  },

  {
    id: "cloth",
    name: "Cloth",
    tag: "Control",
    summary: "Very light frame with mobility and evasiveness, but fragile structure.",
    description:
      "A strange animated weave that sacrifices durability for speed and uncanny movement.",
    apply(golem) {
      golem.templateName = "Cloth";
      golem.hp -= 30;
      golem.speed += 10;
      golem.dex = Math.min((golem.dex || 10) + 4, 20);

      golem.traits.push(
        `Woven Frame. The golem's hit point maximum is reduced by 30.`
      );
      golem.traits.push(
        `Unfettered Motion. The golem's speed increases by 10 feet.`
      );
      golem.traits.push(
        `Template Bias. The golem gains +4 Dexterity, to a maximum of 20.`
      );
    },
  },

  {
    id: "bone",
    name: "Bone",
    tag: "DPS",
    summary: "Jagged, aggressive frame focused on offensive pressure.",
    description:
      "A wickedly articulated structure designed to deliver sharper, deadlier blows.",
    apply(golem, player) {
      const { pb } = player;

      golem.templateName = "Bone";
      golem.str = Math.min((golem.str || 10) + 2, 20);
      golem.dex = Math.min((golem.dex || 10) + 2, 20);

      golem.onHitEffects = golem.onHitEffects || [];
      golem.onHitEffects.push(
        `Once on each of its turns, the golem deals an extra ${pb} damage when it hits with an attack.`
      );

      golem.traits.push(
        `Template Bias. The golem gains +2 Strength and +2 Dexterity, to a maximum of 20.`
      );
    },
  },

  {
    id: "blood",
    name: "Blood",
    tag: "Control",
    summary: "Unstable alchemical body with eerie persistence and adaptive motion.",
    description:
      "A disturbing living slurry of alchemical fluid and arcane force that behaves less like a construct and more like a stitched experiment.",
    apply(golem) {
      golem.templateName = "Blood";
      golem.hp -= 10;
      golem.speed += 5;
      golem.con = Math.min((golem.con || 10) + 3, 20);
      golem.dex = Math.min((golem.dex || 10) + 1, 20);

      golem.traits.push(
        `Viscous Form. The golem's hit point maximum is reduced by 10, and its speed increases by 5 feet.`
      );
      golem.traits.push(
        `Sanguine Flow. The golem can move through a space as narrow as 1 inch wide without squeezing, provided it ends its movement in a space it can occupy.`
      );
      golem.traits.push(
        `Template Bias. The golem gains +3 Constitution and +1 Dexterity, to a maximum of 20.`
      );
    },
  },
];