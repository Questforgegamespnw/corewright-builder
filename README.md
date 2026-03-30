<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Corewright Builder Documentation</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="./css/style.css">
<style>
  body { font-family: Georgia, serif; background: #fdf6e3; margin: 0; padding: 20px; }
  h1, h2, h3 { text-align: center; }
  hr { border: 1px solid #8b7355; margin: 20px 0; }
  ul { margin-left: 20px; }
  li { margin-bottom: 5px; }
</style>
</head>
<body>

<h1>Corewright Builder</h1>
<p>The Corewright Builder is a web-based interface designed to streamline the creation and management of customizable golems for Questforge games. This builder allows players to assemble golems, assign engines, apply infusions, and generate detailed stat blocks for gameplay. It supports single golems, multiple golems, and fused golem modes, providing a flexible toolkit for both players and game masters.</p>

<p>This repository contains the complete HTML, CSS, and JavaScript needed to run the builder locally or via GitHub Pages. All components use relative links for easy deployment and maintenance.</p>

<hr>

<h2>Features</h2>
<ul>
  <li><strong>Dynamic Assembly:</strong> Adjust level, Intelligence modifier, and engine type for your golem.</li>
  <li><strong>Infusion Management:</strong> Select infusions categorized as Tank, DPS, Control, or Utility.</li>
  <li><strong>Multi-Golem & Fusion Modes:</strong> Build up to two golems and combine stats in fusion mode.</li>
  <li><strong>Real-Time Stat Block:</strong> View a live, detailed stat block that updates as you tweak settings.</li>
  <li><strong>Export Options:</strong> Print, save as PDF, or download as a .txt file.</li>
  <li><strong>Save & Share Builds:</strong> Store builds locally or generate shareable links.</li>
</ul>

<hr>

<h2>Getting Started</h2>
<ol>
  <li><strong>Open the Builder</strong>
    <ul>
      <li>Open <code>index.html</code> in your browser for local use.</li>
      <li>Or visit the live GitHub Pages link: <a href="https://questforgegamespnw.github.io/corewright-builder/" target="_blank">https://questforgegamespnw.github.io/corewright-builder/</a></li>
    </ul>
  </li>
  <li><strong>Assemble Your Golem</strong>
    <ul>
      <li>Set Level and INT Modifier.</li>
      <li>Choose an Engine Type: Flame, Stone, Frost, Aether, or None.</li>
      <li>Select Mode: Single, Multi-Golem, or Fusion Mode.</li>
    </ul>
  </li>
  <li><strong>Apply Infusions</strong>
    <ul>
      <li>Infusions are organized by category: Tank, DPS, Control, Utility.</li>
      <li>Click collapsible cards to view each infusion’s Effect and Details.</li>
      <li>Use checkboxes to select which infusions to apply.</li>
    </ul>
  </li>
  <li><strong>View & Export Stat Block</strong>
    <ul>
      <li>The Golem Stat Block updates in real-time.</li>
      <li>Options include:
        <ul>
          <li>Print / Save PDF</li>
          <li>Download .txt</li>
          <li>Save / Load Build – local storage</li>
          <li>Share Build – generate a URL for sharing</li>
        </ul>
      </li>
    </ul>
  </li>
  <li><strong>Multi-Golem / Fusion Mode</strong>
    <ul>
      <li>Selecting Multi or Fusion mode shows the second golem panel.</li>
      <li>Fusion mode combines stats into a single, enhanced golem.</li>
    </ul>
  </li>
  <li><strong>Deployment & Maintenance</strong>
    <ul>
      <li>All files use relative links for smooth GitHub Pages deployment.</li>
      <li>Edit <code>index.html</code>, <code>css/style.css</code>, or files in <code>js/</code>.</li>
      <li>Commit changes and push to GitHub. GitHub Pages automatically updates the live site.</li>
    </ul>
  </li>
</ol>

<hr>

<h2>Quick Reference / Checklist</h2>
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

<hr>

<h2>File Structure</h2>
<pre>
corewright-builder/
├─ index.html        # Main builder interface
├─ css/
│  └─ style.css      # Global styles
├─ js/
│  ├─ builder.js     # Main functionality & event handling
│  └─ infusions.js   # Infusion definitions & render logic
├─ README.md
</pre>

<hr>

<h2>Developer Notes</h2>

<h3>Adding New Infusions</h3>
<p>Open <code>js/infusions.js</code> and add a new key/value pair to the <code>INFUSIONS</code> object:</p>
<pre>
"newInfusion": {
  name: "New Infusion Name",
  effect: "Effect description",
  details: "Additional details",
  tags: ["Tank","Utility"], // optional
  apply: (golem, player) =&gt; {
    // code to modify golem stats
  }
}
</pre>
<p>Save and reload the builder; new infusion should appear automatically.</p>

<h3>Updating Engine Effects</h3>
<p>All engine logic is in <code>js/builder.js</code> within the <code>createGolem()</code> function. Modify or add engine effects according to game mechanics.</p>

<h3>Debugging Tips</h3>
<ul>
  <li>Use the browser console to inspect golem objects.</li>
  <li>Ensure all relative links are correct, especially after moving files.</li>
  <li>Check that collapsible cards function after changes to <code>builder.js</code> or <code>infusions.js</code>.</li>
</ul>

<h3>Deployment</h3>
<ul>
  <li>GitHub Pages automatically hosts relative paths.</li>
  <li>Ensure <code>index.html</code> is at the root of the <code>corewright-builder</code> repository.</li>
  <li>Confirm CSS and JS paths before committing.</li>
</ul>

</body>
</html>
