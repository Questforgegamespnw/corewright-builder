# ⚙️ Corewright Builder

The **Corewright Builder** is a web-based system for designing modular arcane constructs (golems) for Questforge games.

It allows players and GMs to assemble fully customizable golems using a layered system of:

- **Templates** (body and durability)
- **Engines** (damage identity and elemental effects)
- **Infusions** (modular upgrades)
- **Forms** (playstyle and behavior)

The builder generates a complete, game-ready stat block and concept art prompt in real time.
---
### 🆕 Latest Update – Living Workshop & Builder Enhancements

The Corewright Builder now features:
- Fully functional example builds with one-click loading
- Animated “Living Workshop” entry screen
- Improved combat logic (Artillery rework, flexible attack stats)
- Enhanced regeneration mechanics
- Visual and UX polish across the entire builder experience

This update focuses on making the builder more intuitive, immersive, and table-ready.
---

## 🎨 Version 3.1 — Visual & Prompt System Expansion

Version 3.1 introduces a **visual generation layer** to the Corewright Builder, allowing players to instantly translate mechanical builds into concept art prompts.

---

### 🖼️ Concept Art Prompt Generator
- Automatically generates detailed, copy-ready prompts based on:
  - Construct Form
  - Material Template
  - Engine Core
  - Infusions
- Designed for use with tools like Canva and other AI image generators
- Outputs structured, readable prompt blocks for consistent results

---

### 🔄 Prompt Mode Toggle
- Switch between:
  - **Standard Prompt** → rich, cinematic language
  - **Canva-Safe Prompt** → simplified, filter-friendly wording
- Helps ensure higher success rates across different image platforms

---

### 📋 Copy Prompt Integration
- One-click copy for generated prompts
- Includes browser-safe fallback handling
- Instant visual feedback on copy success

---

### 🧩 Descriptor-Driven Prompt System
- Introduced centralized `descriptors.js`
- Prompt output now built from:
  - Form descriptors
  - Template descriptors
  - Engine descriptors
  - Infusion descriptors
- Enables easy expansion and tuning without modifying builder logic

---

### 🛡️ Safe Descriptor Layer
- Parallel “safe” descriptor set implemented
- Removes need for runtime sanitization
- Improves compatibility with stricter content filters

---

### ⚙️ System Integration
- Fully integrated into the existing builder pipeline
- Supports:
  - Single Golem
  - Multi-Golem
  - Fusion Mode (dual prompt output)

---

### 📌 Notes
- Some descriptor combinations (notably **Predator form**) may still trigger warnings in certain tools  
- Future updates will refine language for maximum compatibility

---
---

## 🚀 Version 3.0 — Core Systems & Forms Update

Version 3.0 formalizes the builder into a **clean, modular system with defined design roles**.

### 🧠 System Design Philosophy

Each layer has a clear purpose:

| System      | Role |
|------------|------|
| **Templates** | Base body, durability, structural identity |
| **Engines**   | Damage type, elemental effects, offensive identity |
| **Infusions** | Modular upgrades and enhancements |
| **Forms**     | Playstyle, movement, and combat behavior |

### ⚠️ Design Rule (Important)

Forms are intentionally constrained:

**Forms CAN:**
- Add actions
- Add movement options
- Add conditional effects

**Forms CANNOT:**
- Add AC
- Add HP
- Add resistances
- Add flat stat boosts

This prevents system overlap and keeps scaling under control.

---

## 🧩 Core Features

### 🔧 Dynamic Golem Assembly
- Set level and INT modifier
- Choose:
  - Template
  - Engine
  - Construct Form
- Apply Infusions
- View immediate stat updates

---

### 🧱 Templates (Body System)
- Define durability profile and structure
- Examples:
  - Stone (Hardness-based)
  - Clay (regeneration)
  - Wood (mobility tradeoffs)
- Scale with proficiency bonus and level

---

### 🔥 Engines (Core Identity)
- Define damage type and core effects
- Examples:
  - Flame (aura + bonus damage)
  - Storm (mobility + chain damage)
  - Earth (resistance + stability)

---

### 🧪 Infusions (Modular Upgrades)
- Categorized as:
  - Tank
  - DPS
  - Control
  - Utility
- Limited by **INT modifier capacity**
- Provide:
  - combat upgrades
  - reactions
  - triggered effects
  - utility features

---

### 🧬 Construct Forms (NEW in 3.0)
- Define how the golem *behaves* in combat
- Add:
  - special attacks
  - movement modes (climb, swim, glide, etc.)
  - conditional combat triggers

Examples:
- Brawler (multiattack pressure)
- Predator (gap closing + advantage)
- Bulwark (reaction-based defense)
- Strider (hit-and-run mobility)
- Artillery (ranged pressure)

---

### ⚔️ Multi-Golem & Fusion Modes
- Build **two independent golems**
- Each with:
  - separate templates
  - engines
  - forms
  - infusions

Fusion mode:
- Displays both builds side-by-side
- Foundation for future merged stat synthesis

---

### 📊 Real-Time Stat Block
- Fully formatted creature-style output
- Includes:
  - AC, HP, Speed
  - Ability scores + modifiers
  - Traits, Actions, Reactions
  - Damage immunities & resistances
  - Senses & languages
  - Multiple movement types (fly, climb, swim)

---

### 💾 Save, Share, Export
- Save builds locally (`localStorage`)
- Generate shareable URLs
- Export options:
  - Print / PDF
  - `.txt` download

---

## 🧑‍💻 Getting Started

### Run Locally
Open: index.html

### Live Version

https://questforgegamespnw.github.io/corewright-builder/


---

## 🧪 How to Use

### 1. Build Your Golem
- Set **Level** and **INT Mod**
- Select:
  - Engine
  - Template
  - Form

---

### 2. Add Infusions
- Click cards to toggle on/off
- Limited by INT modifier
- Locked by level where applicable

---

### 3. Choose Mode
- Single Golem
- Multi-Golem
- Fusion Mode

---

### 4. Review Output
- Stat block updates instantly
- Summary shows full configuration

---

### 5. Export or Share
- Print / Save PDF
- Download `.txt`
- Copy share link

---

## 📁 Project Structure
```
corewright-builder/
├─ index.html
├─ css/
│ └─ style.css
├─ src/
│ ├─ builder.js
│ └─ data/
│ ├─ infusions.js
│ ├─ templates.js
│ ├─ engines.js
│ └─ constructForms.js ← NEW (v3.0)
├─ README.md
├─ CHANGELOG.md
```
---

## ⚙️ Developer Notes

### Data Architecture

All systems follow a shared pattern:

#### Infusion
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

#### Template
```
{
  id: "new_template",
  name: "New Template",
  apply: (golem, player) => {}
}
```
#### Engine
```
{
  id: "new_template",
  name: "New Template",
  apply: (golem, player) => {}
}
```
#### Construct Form
```
{
  id: "new_form",
  name: "New Form",
  tags: ["Mobility"],
  apply: (golem, player) => {}
}
```
---
Debugging Tips
Use browser console to inspect golem object
Check for:
missing commas
undefined values
Confirm data files load before builder.js
Verify relative paths when deploying
---
📌 Notes & Roadmap

Planned next steps:

Fusion stat synthesis (true merged stat block)
Expanded form library
Advanced action systems
UI filtering & sorting improvements
Save/load enhancements
---
