# Corewright Builder

The Corewright Builder is a web-based interface designed to streamline the creation and management of customizable golems for Questforge games. This builder allows players to:

Assemble golems
Assign engines
Apply infusions
Generate detailed stat blocks for gameplay

It supports single golems, multiple golems, and fused golem modes, providing a flexible toolkit for both players and game masters.

This repository contains the complete HTML, CSS, and JavaScript needed to run the builder locally or via GitHub Pages. All components use relative links for easy deployment and maintenance.
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Features

Dynamic Assembly: Adjust level, Intelligence modifier, and engine type for your golem.

Infusion Management: Select infusions categorized as Tank, DPS, Control, or Utility.

Multi-Golem & Fusion Modes: Build up to two golems and combine stats in fusion mode.

Real-Time Stat Block: View a live, detailed stat block that updates as you tweak settings.

Export Options: Print, save as PDF, or download as a .txt file.

Save & Share Builds: Store builds locally or generate shareable links.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Getting Started
1. Open the Builder
Open index.html in your browser for local use.
Or visit the live GitHub Pages link: https://questforgegamespnw.github.io/corewright-builder/

2. Assemble Your Golem
Set Level and INT Modifier.
Choose an Engine Type: Flame, Stone, Frost, Aether, or None.
Select Mode: Single, Multi-Golem, or Fusion Mode.

3. Apply Infusions
Infusions are organized by category: Tank, DPS, Control, Utility.
Click collapsible cards to view each infusion’s Effect and Details.
Use checkboxes to select which infusions to apply.

4. View & Export Stat Block
The Golem Stat Block updates in real-time.
Options include:
Print / Save PDF
Download .txt
Save / Load Build – local storage
Share Build – generate a URL for sharing

5. Multi-Golem / Fusion Mode
Selecting Multi or Fusion mode shows the second golem panel.
Fusion mode combines stats into a single, enhanced golem.

6. Deployment & Maintenance
All files use relative links for smooth GitHub Pages deployment.
To update:
Edit index.html, css/style.css, or files in js/.
Commit changes and push to GitHub.
GitHub Pages automatically updates the live site.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
<h2>Quick Reference / Checklist</h2>
<p>Use this checklist to ensure the builder is functioning properly before committing changes or deploying updates:</p>

<ul>
  <li><strong>Navigation</strong>
    <ul>
      <li>Links to Builder, Infusions, and Subclass work.</li>
      <li>Sticky nav bar stays visible when scrolling.</li>
    </ul>
  </li>

  <li><strong>Golem Assembly</strong>
    <ul>
      <li>Level and INT inputs correctly affect stat calculations.</li>
      <li>Engine selection applies correct bonuses.</li>
      <li>Mode selection toggles single, multi, and fusion correctly.</li>
    </ul>
  </li>

  <li><strong>Infusions</strong>
    <ul>
      <li>All infusions render as collapsible cards.</li>
      <li>Tags (Tank, DPS, Control, Utility) display correctly.</li>
      <li>Checkboxes allow selection and deselection.</li>
      <li>Second golem infusions render in multi/fusion mode.</li>
    </ul>
  </li>

  <li><strong>Stat Block</strong>
    <ul>
      <li>Stat block updates dynamically with selections.</li>
      <li>Fused golem combines stats correctly.</li>
      <li>Print/Save PDF displays only the stat block.</li>
    </ul>
  </li>

  <li><strong>Build Management</strong>
    <ul>
      <li>Save Build stores current build in localStorage.</li>
      <li>Load Build retrieves saved builds.</li>
      <li>Share Build generates a valid URL that recreates the build.</li>
    </ul>
  </li>

  <li><strong>Export / Download</strong>
    <ul>
      <li>Download .txt outputs correct stat block.</li>
      <li>Print preview hides unnecessary elements.</li>
    </ul>
  </li>

  <li><strong>General UI</strong>
    <ul>
      <li>Buttons and input fields are styled consistently.</li>
      <li>Collapsible content expands and collapses correctly.</li>
      <li>Responsive layout on different screen sizes.</li>
    </ul>
  </li>
</ul>
--------------------------------------------------------------------------------------------------------------
## File Structure

corewright-builder/
├─ index.html        # Main builder interface
├─ css/
│  └─ style.css      # Global styles
├─ js/
│  ├─ builder.js     # Main functionality & event handling
│  └─ infusions.js   # Infusion definitions & render logic
├─ README.md


------------------------------------------------------------------------------------------------------------
## Developer Notes
Adding New Infusions
Open js/infusions.js.

Add a new key/value pair to the INFUSIONS object:

"newInfusion": {
  name: "New Infusion Name",
  effect: "Effect description",
  details: "Additional details",
  tags: ["Tank","Utility"], // optional
  apply: (golem, player) => {
    // code to modify golem stats
  }
}
Save and reload the builder; new infusion should appear automatically.

Updating Engine Effects
All engine logic is in js/builder.js within the createGolem() function.
Modify or add engine effects according to game mechanics.


Debugging Tips
Use the browser console to inspect golem objects.
Ensure all relative links are correct, especially after moving files.
Check that collapsible cards function after changes to builder.js or infusions.js.

Deployment
GitHub Pages automatically hosts relative paths.
Ensure index.html is at the root of the corewright-builder repository.
Confirm CSS and JS paths before committing.
 Buttons and input fields are styled consistently.
 Collapsible content expands and collapses correctly.
 Responsive layout on different screen sizes.
