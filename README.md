# Corewright Builder

The **Corewright Builder** is a web-based interface designed to streamline the creation and management of customizable golems for Questforge games. This builder allows players to assemble golems, assign engines, apply infusions, and generate detailed stat blocks for gameplay. It supports single golems, multiple golems, and fused golem modes, providing a flexible toolkit for both players and game masters.

This repository contains the complete HTML, CSS, and JavaScript needed to run the builder locally or via GitHub Pages. All components use relative links for easy deployment and maintenance.

---

## 🚀 Version 2.0 Update

Version 2.0 introduces a **major system overhaul**, converting the builder into a fully modular, data-driven architecture.

### New Systems
- **Material Templates (NEW)**  
  Golems can now be constructed using distinct materials such as Stone, Clay, Wood, Metal, Earth, Cloth, Bone, and Blood.  
  Each template modifies stats and adds unique traits and abilities.

- **Modular Engine System (UPDATED)**  
  Engines now follow the same structure as templates and infusions, allowing scalable expansion and cleaner logic.

- **Dynamic Data Architecture**  
  All major systems now use:
  - `apply(golem, player)` for logic
  - Optional `traits`, `actions`, and `reactions`

- **Auto-Generated UI Elements**  
  - Template dropdowns populate automatically from `templates.js`
  - Infusions render dynamically from `infusions.js`
  - No HTML edits required when adding new content

### Stat Block Improvements
- Added full ability scores:
  - INT, WIS, CHA
- Improved trait and action rendering
- Unified action system (base + engine + template + infusion)

### Stability Fixes
- Fixed critical UI lock issues
- Resolved rendering failures in infusions
- Eliminated multiple silent JavaScript crashes
- Improved event handling reliability

---

## Features

- **Dynamic Assembly**: Adjust level, Intelligence modifier, engine type, and material template for your golem  
- **Infusion Management**: Select infusions categorized as Tank, DPS, Control, or Utility  
- **Material Templates**: Apply structural archetypes that modify stats and behavior  
- **Multi-Golem & Fusion Modes**: Build up to two golems and combine stats in fusion mode  
- **Real-Time Stat Block**: View a live, detailed stat block that updates as you tweak settings  
- **Export Options**: Print, save as PDF, or download as a `.txt` file  
- **Save & Share Builds**: Store builds locally or generate shareable links  

---

## Getting Started

### 1. Open the Builder
- Open `index.html` in your browser for local use  
- Or visit the live GitHub Pages link:  
  https://questforgegamespnw.github.io/corewright-builder/

---

### 2. Assemble Your Golem
- Set **Level** and **INT Modifier**  
- Choose an **Engine Type**  
- Choose a **Material Template**  
- Select **Mode**:
  - Single  
  - Multi-Golem  
  - Fusion Mode  

---

### 3. Apply Infusions
- Infusions are organized by category: Tank, DPS, Control, Utility  
- Click collapsible cards to view:
  - Effect  
  - Details  
- Use checkboxes to apply them  

---

### 4. View & Export Stat Block
- Updates in real-time  
- Options include:
  - Print / Save PDF  
  - Download `.txt`  
  - Save / Load Build  
  - Share Build  

---

### 5. Multi-Golem / Fusion Mode
- Enables second golem panel  
- Fusion mode merges stats into a single enhanced golem  

---

### 6. Deployment & Maintenance
- Uses relative paths for GitHub Pages  
- To update:
  1. Edit files  
  2. Commit and push  
  3. Site updates automatically  

---

## Quick Reference / Checklist

Use this checklist before committing or deploying:

### Navigation
- Links to Builder, Infusions, Subclass work  
- Sticky nav behaves correctly  

### Golem Assembly
- Level and INT affect stats  
- Engine applies correctly  
- Template applies correctly  
- Mode toggles properly  

### Infusions
- Render correctly as collapsibles  
- Tags display properly  
- Selection updates stat block  
- Works for both golems  

### Templates
- Dropdown populates automatically  
- Applies stat changes and traits  
- Scales properly with proficiency bonus  

### Stat Block
- Updates dynamically  
- Displays all six ability scores  
- Shows traits, actions, reactions  
- Fusion combines correctly  

### Build Management
- Save / Load works via `localStorage`  
- Share links recreate builds  

### Export / Download
- `.txt` output is correct  
- Print view is clean  

### UI
- Collapsibles function correctly  
- Layout responsive across screen sizes  

---

## File Structure
//
corewright-builder/
├─ index.html
├─ css/
│ └─ style.css
├─ js/
│ ├─ builder.js
│ ├─ infusions.js
│ ├─ templates.js # NEW (v2.0)
│ ├─ engines.js # NEW (v2.0)
└─ README.md
└─ CHANGELOG.md
//

---

## Developer Notes

### System Architecture (v2.0)

All systems follow this pattern:

```js
{
  name: "Example",
  apply: (golem, player) => {},
  traits: [],
  actions: [],
  reactions: []
}
```
This allows consistent expansion across:

-Infusions
-Templates
-Engines

---
Adding New Infusions

In js/infusions.js:
//
"newInfusion": {
  name: "New Infusion Name",
  effect: "Effect description",
  details: "Additional details",
  tags: ["Tank","Utility"],
  apply: (golem, player) => {}
}
//
---
Adding New Templates

In js/templates.js:
//
newTemplate: {
  name: "New Template",
  apply: (golem, player) => {}
}
//
---
Adding New Engines

In js/engines.js:
//
newEngine: {
  name: "New Engine",
  apply: (golem, player) => {}
}
//
---
Debugging Tips
Use browser console to inspect golem object
Check for missing commas or undefined variables
Verify relative paths after file changes
Ensure data files load before builder.js
Deployment
GitHub Pages uses relative paths
Ensure index.html is in root
Confirm JS/CSS paths before committing
