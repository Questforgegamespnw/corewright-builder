export const TEMPLATES = [
  {
    id: "stone",
    name: "Stone",
    tag: "Tank",
    summary: "Heavy stone body with reinforced hardness.",
    description:
      "A dense stone shell built for endurance. Stone bodies shrug off punishment through raw structural resilience.",
    apply(golem, player) {
      const { pb } = player;

      golem.templateName = "Stone";
      golem.ac = Math.max(golem.ac, 14 + pb);
      golem.speed = Math.max(20, golem.speed - 5);
      golem.hardness = (golem.hardness || 0) + pb;

      golem.traits.push(
        `Stone Body. The golem's AC becomes ${Math.max(golem.ac, 14 + pb)} unless it is already higher.`
      );
      golem.traits.push(
        `Dense Frame. The golem's speed is reduced by 5 feet to a minimum of 20 feet.`
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

      golem.traits.push(
        `Malleable Reconstruction. At the start of its turn, the golem regains ${pb} hit points if it has at least 1 hit point.`
      );
      golem.traits.push(
        `Acid Disruption. If the golem takes acid damage, this regeneration doesn't function until the end of its next turn.`
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
      golem.dex = Math.max(golem.dex, 16);

      golem.skills = golem.skills || [];
      if (!golem.skills.includes("Stealth")) golem.skills.push("Stealth");

      golem.traits.push(
        `Light Frame. The golem's hit point maximum is reduced by 20.`
      );
      golem.traits.push(
        `Agile Construction. The golem's Dexterity becomes 16 unless it is already higher.`
      );
      golem.traits.push(
        `Skulking Shape. The golem gains proficiency in Stealth and can take the Hide action as a bonus action without requiring your command.`
      );
    },
  },

  {
    id: "metal",
    name: "Metal",
    tag: "Tank",
    summary: "Reinforced plated shell with greater durability.",
    description:
      "A dense metallic body built for prolonged frontline engagements.",
    apply(golem) {
      golem.templateName = "Metal";
      golem.hp += 20;
      golem.ac += 1;

      golem.traits.push(
        `Plated Chassis. The golem's hit point maximum increases by 20 and its AC increases by 1.`
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
      golem.dex = Math.max(golem.dex, 16);

      golem.traits.push(
        `Woven Frame. The golem's hit point maximum is reduced by 30.`
      );
      golem.traits.push(
        `Unfettered Motion. The golem's speed increases by 10 feet and its Dexterity becomes 16 unless it is already higher.`
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

      golem.onHitEffects = golem.onHitEffects || [];
      golem.onHitEffects.push(
        `Once on each of its turns, the golem deals an extra ${pb} damage when it hits with an attack.`
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

      golem.traits.push(
        `Viscous Form. The golem's hit point maximum is reduced by 10, and its speed increases by 5 feet.`
      );
      golem.traits.push(
        `Sanguine Flow. The golem can move through a space as narrow as 1 inch wide without squeezing, provided it ends its movement in a space it can occupy.`
      );
    },
  },
];