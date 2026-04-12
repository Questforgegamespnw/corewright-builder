export const SPECIAL_CORES = [
  {
    id: "none",
    name: "None",
    summary: "No special core installed.",
    description: "No additional core is integrated into the construct.",
    apply() {}
  },

  {
    id: "anima_prime",
    name: "Anima Prime Engine",
    summary: "A primordial secondary core that enhances all systems.",
    description:
      "The First Core, a manifestation of pure will. This core integrates alongside the golem’s primary engine, reinforcing all aspects of its design.",

    apply(golem, player) {
      const { pb, level } = player;

      // === Core Integration ===
      golem.ac += pb;

      golem.saveBonusAll = (golem.saveBonusAll || 0) + pb;

      golem.hp += level * 2;
      golem.maxHp += level * 2;

      // === Traits ===
      golem.traits = [
        ...(golem.traits || []),

        `Anima Prime Core. The golem gains a bonus to AC and all saving throws equal to your proficiency bonus, and its hit point maximum increases by ${level * 2}.`,

        `Distributed Intelligence. When you cast a spell, you can have the spell originate from the golem’s space instead of your own.`,

        `Ultima Mode (1/Long Rest). As a bonus action, the golem enters a transcendent state for 1 minute. While active, it has resistance to all damage, gains a bonus to attack rolls equal to your proficiency bonus, and its attacks deal additional damage equal to your proficiency bonus.

At the start of each of its turns, choose one:

• Overdrive Strike. The next time the golem hits before the start of its next turn, it deals an extra 3d8 force damage.  
• Phase Shift. The golem teleports up to 30 feet before or after an attack.  
• Adaptive Shell. The golem gains temporary hit points equal to your artificer level.`
      ];
    }
  }
];