# ⚙️ Corewright Builder

**Current Version: 3.3**

The Corewright Builder is an interactive tool for creating and customizing construct companions for the Corewright Artificer subclass.

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

## 🆕 Latest Update — Version 3.3: Corewright Capstone Expansion & Builder Integration

### 🧠 Level 17 Capstone Modes

At 17th level, Corewrights unlock **Penultimate Golemmancy**, choosing how their construct evolves:

---

#### 🔥 Corewright Fusion  
Become one with your construct.

- Merge with your golem as a powerful fused form (Corewright Fusion)
- Gain enhanced combat and spellcasting capabilities
- Use golem physical stats with player mental stats
- Limited-use transformation (1/long rest)

---

### 🧠 Awakened Core  
Grant your construct true autonomy.

- Gains independent initiative and actions
- Increased Intelligence, Wisdom, and Charisma
- Can independently perform skill-based actions (Search, Study, Influence)
- Includes a quick-reference skill display in the builder

---

### ⚙️ Dual Core Convergence  
Command multiple constructs.

- Maintain two golems simultaneously
- Each has reduced durability but increased tactical flexibility
- Ideal for battlefield control and multi-role strategies

---

## 🎨 Previous Update — Living Workshop & Builder Enhancements (v3.2)

The Corewright Builder now features:

- Fully functional example builds with one-click loading
- Animated “Living Workshop” entry screen
- Improved combat logic (Artillery rework, flexible attack stats)
- Enhanced regeneration mechanics
- Visual and UX polish across the entire builder experience

This update focused on making the builder more intuitive, immersive, and table-ready.

---

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
