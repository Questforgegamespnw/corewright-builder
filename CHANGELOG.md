# 📜 Changelog

All notable changes to the **Corewright Builder** project will be documented in this file.

This project follows a simplified version of [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and uses semantic-style versioning.

---

## [3.0.0] - Core Systems & Forms Update

A major architectural and gameplay-focused release that formalizes the builder into a more modular, scalable, and rules-consistent system.

### Added
- **Construct Forms system**
  - Added a dedicated Forms layer separate from Templates, Engines, and Infusions
  - Forms now define:
    - attack style
    - movement options
    - special actions
    - conditional combat effects
  - Initial form support includes behavior-focused constructs such as:
    - Brawler
    - Predator
    - Bulwark
    - Strider
    - Artillery
    - Climbing
    - Aquatic
    - Gliding

- **Construct Form UI integration**
  - Added clickable Form cards to the builder
  - Supports:
    - click once to select
    - click again to deselect
    - keyboard interaction
    - visual selected state with gold highlight

- **Expanded multi-golem scaffolding**
  - Wired builder support for a second golem configuration
  - Added parallel support for:
    - second level/int inputs
    - second engine
    - second template
    - second form
    - second infusion set
  - Added side-by-side secondary summary/stat output support

- **Fusion mode staging**
  - Fusion mode now preserves and displays both component builds side-by-side
  - Creates a cleaner foundation for future fused-stat synthesis

### Changed
- **Infusions data structure refactor**
  - Converted `infusions.js` from keyed object format to array-based data format
  - Preserved rich metadata fields such as:
    - `effect`
    - `details`
    - `lore`
    - `mechanics`
    - `traits`
    - `actions`
    - `reactions`
    - `apply()`
  - Improved compatibility with rendering, filtering, save/load, and future expansion

- **Builder architecture cleanup**
  - Refactored `builder.js` to align with array-style data lookups
  - Standardized helper-driven lookup flow for:
    - templates
    - engines
    - infusions
    - construct forms
  - Improved internal consistency between UI state, save state, and rendered output

- **Rules identity cleanup**
  - Clarified system role separation:
    - **Templates** = body / durability profile
    - **Engines** = elemental package / damage identity
    - **Infusions** = modular upgrades
    - **Forms** = playstyle and movement expression
  - Reduced feature overlap between system layers

- **Stone / Earth / Colossus redesign**
  - Reworked Stone template to use **Hardness** as its core durability mechanic
  - Moved mundane weapon resistance behavior to **Earth Engine**
  - Renamed **Giant Frame** to **Colossus**
  - Colossus now grants additional Hardness and reinforces siege-body identity

- **Base golem durability update**
  - Changed baseline hit points to **12 × artificer level**
  - Improved survivability at mid and high levels
  - Opened cleaner design space for templates to modify HP positively or negatively

- **Attack scaling simplification**
  - Standardized baseline Slam damage to **1d8**
  - Removed base damage die scaling by level
  - Kept offensive scaling in:
    - engines
    - infusions
    - multiattack
    - form-based combat behaviors

- **Stat block fidelity improvements**
  - Added clearer creature-style support for:
    - Damage Immunities
    - Damage Resistances
    - Condition Immunities
    - Senses
    - Languages
    - Size
    - multiple movement types
  - Added support for:
    - fly speed
    - climb speed
    - swim speed
    - max HP display when relevant
  - Improved rendering of Forms, Templates, and Engines in summary/stat output

- **Interactive card UX improvements**
  - Unified card-based interaction patterns for:
    - Engines
    - Infusions
    - Forms
  - Added gold-highlight selected states across the system
  - Infusions now support click-on / click-off card behavior without requiring direct checkbox interaction

### Fixed
- Fixed schema mismatch between builder rendering and infusion data fields
- Fixed prerequisite display and gating for infusion cards
- Fixed missing infusion text caused by `summary`/`effect` field mismatch
- Fixed form selection persistence through save/load/share state
- Fixed build share links to include form and second-golem data
- Fixed stat block size display for size-changing features like Colossus
- Fixed slot counter support for both primary and secondary golems
- Fixed hidden-input/state alignment for card-based selection systems

### Internal
- Prepared the codebase for:
  - construct form expansion
  - multi-golem completion
  - true fusion stat synthesis
  - richer builder summaries
  - cleaner documentation and contributor maintenance

---

## [2.0.0] - System Overhaul Update

### Major Features
- **Modular Template System**
  - Material Templates now use a data-driven architecture
  - Templates apply effects via `apply()` functions
  - Traits and actions dynamically scale with player stats

- **Modular Engine System**
  - Engines now follow the same structure as Templates and Infusions
  - Supports future expansion without modifying core logic

- **Dynamic Dropdown Generation**
  - Template selections auto-populate from `templates.js`
  - No manual HTML updates required when adding new templates

### Builder Improvements
- Fixed critical crash issue preventing “Enter Workshop”
- Stabilized event listener system
- Ensured live rebuilding of golem on all inputs
- Prevented duplicate dropdown entries
- Improved input parsing safety (`NaN` protection)

### Stat Block Enhancements
- Added missing ability scores:
  - INT
  - WIS
  - CHA
- Added full modifier calculations for all stats
- Improved action rendering pipeline
- Traits now display reliably

### System Architecture Changes
- Standardized shared pattern:
  - `apply(golem, player)`
  - optional `traits[]`, `actions[]`, `reactions[]`
- Separated data files from builder logic:
  - `templates.js`
  - `infusions.js`
  - `engines.js`
  - `builder.js`

### Bug Fixes
- Fixed infusions page rendering failure
- Fixed collapsible UI loop closure bug
- Fixed template logic executing outside function scope
- Fixed missing commas causing silent JS crashes
- Fixed dropdown duplication bug
- Fixed stat block partial rendering issues

### Internal Improvements
- Cleaner function separation
- Reduced cross-dependency bugs
- Improved scalability for future feature work

---

## [1.0.1] - Infusions QC Passover

### Added
- Builder page tweaks
- Infusions page corrections
- Filtering and search
- Tier grouping
- No missing infusions
- `infusions.js` became the source pull for `infusions.html`

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
- Designed for scalability across additional systems and builder features