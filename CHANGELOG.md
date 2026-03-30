# 📜 Changelog

All notable changes to the **Corewright Builder** project will be documented in this file.

This project follows a simplified version of [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and uses semantic-style versioning.

---

##  Version 2.0 — System Overhaul Update

###  Major Features
- **Modular Template System (NEW)**
  - Material Templates (Stone, Clay, Wood, Metal, Earth, Cloth, Bone, Blood) now use a data-driven architecture
  - Templates apply effects via `apply()` functions
  - Traits and actions dynamically scale with player stats

- **Modular Engine System (NEW)**
  - Engines now follow the same structure as Templates and Infusions
  - Supports future expansion without modifying core logic

- **Dynamic Dropdown Generation**
  - Template selections auto-populate from `templates.js`
  - No manual HTML updates required when adding new templates

---

### ⚙️ Builder Improvements
- Fixed **critical crash issue** preventing “Enter Workshop”
- Stabilized **event listener system**
- Ensured **live rebuilding** of golem on all inputs
- Prevented duplicate dropdown entries
- Improved input parsing safety (`NaN` protection)

---

### 📊 Stat Block Enhancements
- Added missing ability scores:
  - INT, WIS, CHA
- Added full modifier calculations for all stats
- Improved action rendering pipeline:
  - Base attack + infusion + template + engine actions merge correctly
- Traits now display reliably

---

### 🧠 System Architecture Changes
- Standardized all systems to a shared pattern:
  - `apply(golem, player)`
  - Optional `traits[]`, `actions[]`, `reactions[]`
- Separated **data (templates.js, infusions.js, engines.js)** from logic (builder.js)

---

### 🐛 Bug Fixes
- Fixed:
  - Infusions page rendering failure
  - Collapsible UI breaking due to loop closure bug
  - Template logic executing outside function scope
  - Missing commas causing silent JS crashes
  - Dropdown duplication bug
  - Stat block partial rendering issue

---

### 🧩 Internal Improvements
- Cleaner function separation
- Reduced cross-dependency bugs
- Improved scalability for future features:
  - Golem Materials system
  - Sidebar UI
  - Save/load expansions
  - Advanced combat actions

---

### 📌 Known TODOs (Next Version)
- Golem Creation Materials integration
- Sidebar UI for infusions/templates
- Engine UI parity improvements
- Expanded action system (mechanical abilities)
- Persistence upgrades (save/share builds)

---
## [1.0.0] - Initial Release

### Added
- Corewright Builder interface
- Dynamic golem stat generation system
- Engine system:
  - Flame
  - Stone
  - Frost
  - Aether
- Infusion system with categorized tags:
  - Tank
  - DPS
  - Control
  - Utility
- Multi-golem mode
- Fusion mode (combined stat system)
- Real-time stat block rendering
- Save/Load build functionality using localStorage
- Shareable build links via encoded URL
- Export options:
  - Print / Save PDF
  - Download `.txt`
- Modular JavaScript structure:
  - `builder.js`
  - `infusions.js`
- Responsive layout and unified styling (`style.css`)
- GitHub Pages deployment with relative paths

### Notes
- Baseline release for future expansion
- Designed for scalability (additional subclasses, features, and systems)

## [1.0.1] - Infusions QC passover

### Added
-Builder page tweaks
-Infusions page corrections
-Filtering + search 
-Tier grouping 
-No missing infusions  
-infusions.js is now the source pull for infusions.html






