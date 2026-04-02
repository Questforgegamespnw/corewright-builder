# ⚙️ Corewright Builder

**Current Version: 3.5**

The Corewright Builder is an interactive tool for creating and customizing construct companions for the Corewright Artificer subclass.

---

### Quick Start
Jump straight into the builder and create your construct in seconds:

👉 https://questforgegamespnw.github.io/corewright-builder/

---

## 🔥 Key Features

- Dynamic construct creation with:
  - Templates
  - Construct Forms
  - Infusions
  - Engine Cores
- Real-time stat block generation (5e-style)
- Save, load, and share builds
- Print and export support
- Real-time concept art prompt generation for use with AI image tools

---

## 🆕 Latest Update — Version 3.5: System Alignment & UX Refinement

Version 3.5 focuses on **bringing all Corewright systems into full alignment** while improving usability and player-facing clarity.

### Highlights:
- Fully synchronized:
  - subclass page
  - infusions compendium
  - example builds
  - builder data
- Refined infusion wording and mechanics for consistency
- Expanded and clarified example builds with stronger archetype identities
- Reworked Example Builds page layout:
  - centered search
  - grouped filters (Level, Role, Difficulty)
  - improved visual hierarchy
- Removed unnecessary UI elements (e.g. build count display)
- Added Homebrewery-ready subclass document with:
  - example stat block
  - QR-linked builder and website access

---

### Why This Matters
This update makes Corewright significantly easier to:
- understand at a glance
- explore through examples
- use at the table or in play
- share as a polished standalone system

---

### What’s Next (3.6+)
- Guided onboarding / tutorial builds
- Expanded infusion interactions and scaling
- Additional example build archetypes
- Visual enhancements (fusion UI, token generation)

---

## 🆕 Previous Update — Version 3.4: Stability & Structure Pass

Version 3.4 focuses on **codebase consistency, readability, and long-term maintainability**.

### Highlights:
- Fully standardized data architecture across:
  - Templates
  - Forms
  - Engines
  - Infusions
- Unified apply-function patterns and stat mutation logic
- Cleaned and organized CSS structure
- Improved example build routing and builder integration
- Eliminated edge-case errors and inconsistent behaviors

---

### Why This Matters
This release establishes a **stable foundation** for future development, making it significantly easier to:
- add new systems and mechanics
- expand infusion and engine interactions
- maintain balance and clarity across the builder

---

### What’s Next (3.5+)
- System refinement and balance tuning
- Expanded infusion scaling mechanics
- Enhanced stat block clarity and combat readability
- Visual upgrades (fusion UI, token generation, etc.)


## 🎨 Previous Major Update — Version 3.1: Visual & Prompt System Expansion

Version 3.1 introduced the **concept art prompt system**, allowing builds to generate copy-ready prompts for tools like Canva and other AI image generators.

### Highlights:
- Descriptor-driven prompt system
- Standard vs Canva-safe prompt modes
- One-click copy functionality
- Modular descriptor architecture

---

## 📜 Full Change History

For detailed version history and technical updates, see:  
👉 **CHANGELOG.md**

---

## 🧩 Core Systems Overview

| System        | Role |
|--------------|------|
| **Templates** | Body, durability, structure, and stats |
| **Engines**   | Damage type and core effects |
| **Infusions** | Modular upgrades |
| **Forms**     | Combat behavior, movement, and stats |

---

## 🧑‍💻 Getting Started

### Run Locally  
Open: `index.html`

### Live Version  
https://questforgegamespnw.github.io/corewright-builder/

---

## 🧪 How to Use

### 1. Build Your Golem
- Set **Level** and **INT Mod**
- Choose Template, Engine, and Form

### 2. Add Infusions
- Limited by INT modifier
- Click to toggle

### 3. Select Mode
- Single Golem
- Awakened Core (17+)
- Multi-Golem (17+)
- Fusion Mode (17+)

### 4. Review Output
- Stat block updates instantly

### 5. Export
- Print / PDF
- `.txt`
- Shareable link

---

## 📁 Project Structure

```
corewright-builder/
├─ index.html
├─ css/
│ └─ style.css
├─ examples/
│ └─ index.html
├─ images/
│ └─ (store all images here)
├─ src/
│ ├─ builder.js
│ ├─ examples.js
│ └─ data/
│ ├─ descriptors.js
│ ├─ infusions.js
│ ├─ templates.js
│ ├─ engines.js
│ ├─ exampleBuilds.js
│ └─ constructForms.js
├─ README.md
├─ CHANGELOG.md
├─ LICENSE
```

---

## ⚙️ Developer Notes

- Modular data-driven architecture  
- Systems use `apply()` pattern for scaling  
- Designed for extensibility and future expansion  
```
/*
STANDARD OBJECT FORMAT:

{
  id: "",
  name: "",
  tags: [],

  effect: "",
  details: "",
  lore: "",
  mechanics: "",

  traits: [],
  actions: [],
  reactions: [],

  apply(golem, player) {}
}
*/
```
---

## 🧠 Data Architecture

All systems follow a shared pattern:

### Infusion
```
{
  id: "unique_id",
  name: "Display Name",
  tags: [],
  apply: (golem, player) => {},
  traits: [],
  actions: [],
  reactions: []
}
```
This enables consistent scaling and modular expansion.

### Template
```
{
  id: "new_template",
  name: "New Template",
  apply: (golem, player) => {}
}
```
### Engine
```
{
  id: "new_template",
  name: "New Template",
  apply: (golem, player) => {}
}
```
### Construct Form
```
{
  id: "new_form",
  name: "New Form",
  tags: ["Mobility"],
  apply: (golem, player) => {}
}
```

---

## 🛠️ Debugging Tips

- Use the browser console to inspect the golem object  
- Check for:
  - missing commas
  - undefined values  
- Confirm data files load before `builder.js`  
- Verify relative paths when deploying  

---

## 🔮 Notes & Roadmap

- Some descriptor combinations (notably **Predator form**) may still trigger warnings in certain image tools  
- Engine-based visual effects and color variants  
- Expanded background and environmental visuals  
- Example golem artwork library  
- Continued UX and presentation polish  

---
