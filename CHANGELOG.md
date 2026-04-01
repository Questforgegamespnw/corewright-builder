# 📜 Changelog

All notable changes to the **Corewright Builder** project will be documented in this file.

This project follows a simplified version of [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and uses semantic-style versioning.

## [3.2.0] – Corewright UX & Combat Refinement Update

### ✨ Added
- **Example Build Integration (Fully Functional)**
  - Example builds now correctly load into the builder via query string
  - Builder prioritizes loaded examples over saved local state
  - Added **Loaded Example banner** to clearly confirm imported builds
  - Example builds now function as true onboarding tools

- **Auto-Expand on Load**
  - Builder automatically expands relevant sections (Template, Form, Engine, Infusions) when loading an example
  - Improves clarity and reduces friction for new users

- **Living Workshop Splash Screen**
  - Added animated particle and glow effects to entry screen
  - Subtle ambient motion creates a “living” magical workshop feel
  - Fully CSS-based (no performance impact)

- **Visual Background System**
  - Added hero workshop background to entry screen
  - Added parchment-style background texture across builder pages
  - Implemented overlay system to preserve readability while enhancing theme

---

### ⚔️ Changed
- **Artillery Form Rework**
  - Now functions as a **ranged-primary chassis**
  - Introduced `Arcane Bolt` as primary attack
  - Slam downgraded to `1d6` for close-quarters fallback
  - Improved identity as a backline construct

- **Attack Ability Logic Update**
  - Replaced hard Dexterity lock with:
    > “Uses Strength or Dexterity, whichever is higher”
  - Applies to relevant forms and future-proofed via `attackAbilityMode`
  - Prevents unintuitive stat locking behavior

- **Regeneration System Rebalance**
  - Regeneration now uses:
    > Constitution modifier + Proficiency Bonus
  - Applied to:
    - Clay Template
    - Self-Repair Matrix infusion
  - Introduced non-stacking behavior (uses highest value)
  - Maintains reliability without excessive scaling

---

### 🛠️ Fixed
- Fixed issue where **example builds would not load correctly** due to local save override
- Fixed multiple **syntax errors (missing commas/brackets)** in:
  - `constructForms.js`
  - `infusions.js`
- Corrected action rendering so non-melee forms behave properly
- Resolved unintended stat-lock behavior in Dexterity-based builds

---

### 🎨 UI / UX Improvements
- Improved visual hierarchy of splash screen
- Added text shadow and overlay balancing for readability
- Enhanced button styling on entry screen
- Improved clarity of builder feedback (example loading + section visibility)

---

### 💡 Notes
- This update significantly improves **first-time user experience**
- Establishes visual identity for the Corewright system
- Lays groundwork for future features:
  - Example progression system
  - Engine-reactive visuals
  - Advanced build sharing

---
## v3.1 – Visual & UX Expansion Update

### ✨ New Features

#### 🎨 Concept Art Prompt Generator
- Automatically generates detailed, copy-ready concept art prompts based on build selections
- Integrates:
  - Construct Form
  - Material Template
  - Engine Core
  - Infusions
- Outputs structured prompts for use in tools like Canva and other image generators

#### 🔄 Prompt Mode Toggle
- Added dropdown to switch between:
  - **Standard Prompt** (full creative flavor)
  - **Canva-Safe Prompt** (filtered language for higher compatibility)
- Helps reduce content filtering issues in external tools

#### 📋 Copy Prompt Button
- One-click copy functionality for generated prompts
- Includes fallback handling for browser compatibility
- Visual feedback on successful copy

---

### 🧠 System Improvements

#### 🧩 Descriptor-Based Prompt Architecture
- Introduced centralized `descriptors.js`
- Prompt generation now fully driven by:
  - Form descriptors
  - Template descriptors
  - Engine descriptors
  - Infusion descriptors
- Enables scalable expansion without modifying core logic

#### 🛡️ Safe Descriptor Layer
- Added parallel “safe” descriptor sets
- Eliminates need for runtime string sanitization
- Improves reliability across image generation platforms

#### 🔌 Builder Integration
- Prompt system integrated into main `updateBuilder()` pipeline
- Supports:
  - Single Golem
  - Multi-Golem
  - Fusion Mode (dual prompt output)

---

### 🎛️ UI / UX Enhancements

#### 🧭 Prompt Control Panel
- Added Prompt Mode selector to prompt UI
- Integrated into existing prompt card layout

#### 🎨 Prompt Card Improvements
- Improved alignment of controls and buttons
- Consistent styling with parchment UI theme

#### 📱 Responsive Behavior
- Prompt controls adapt cleanly on smaller screens

---

### 🧪 Stability & Fixes

- Fixed clipboard reliability issues for prompt copying
- Removed fragile string sanitization system
- Added safe fallback handling for missing descriptor entries
- Improved event binding (Prompt Mode updates now trigger live refresh)

---

### 📌 Known Minor Issues

- Some descriptor combinations (notably **Predator form**) may trigger content warnings in certain image tools  
  *(Planned refinement in a future language tuning pass)*
-Need to introduce either/or wording for str/dex attack options, allowing the use of whichever stat is higher. 
-Artillery form does not currently specify a ranged attack. It should. 

---

### 🚀 Planned / Upcoming

- 📚 Example Builds Compendium (click-to-load builds)
- 🎭 Additional Prompt Styles:
  - Cinematic
  - Minimal
  - Token / Portrait modes
- 🧠 Fully data-driven role and pose descriptors
- 🔗 Expanded sharing and export options

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

### Balance & Math Refinement Pass
- Updated **Stone Template**
  - AC corrected to **16 + PB**
  - retains Hardness identity
  - now grants **+2 STR / +2 CON**

- Updated **Metal Template**
  - AC corrected to **18 + PB**
  - now gains flat **Damage Reduction = PB**
  - now grants **+4 STR**

- Added formal **template stat bias** system
  - Templates now define physical stat identity more clearly
  - Supports stronger niche-building and clearer role pairing

- Added formal **construct form stat bias** system
  - Forms now contribute light-touch stat specialization
  - Preserves the rule that Forms define behavior/playstyle rather than durability layers

- Corrected **Hardness** rules text
  - Hardness no longer functions as damage subtraction
  - If qualifying nonmagical bludgeoning, piercing, or slashing damage from a single source is **equal to or less than Hardness**, the golem takes **no damage**

- Corrected attack math display
  - Slam now uses:
    - **to hit = PB + attack stat modifier**
    - **damage = 1d8 + attack stat modifier**
  - Predator and Glider forms now use **Dexterity** for attack and damage rolls

- Updated role-specialization math across Templates and Forms
  - Enables deeper niche builds and cleaner 18–20 stat endpoints through body + form pairing

- Corrected **Earth Engine** display behavior
  - mundane weapon resistances now display in **Damage Resistances**
  - redundant resistance trait text removed from the trait section

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