<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Corewright Builder - README</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body {
  font-family: Georgia, serif;
  background: #fdf6e3;
  color: #333;
  margin: 0;
  padding: 20px;
  line-height: 1.6;
}
h1, h2, h3, h4 {
  color: #5a4a32;
}
h1 { text-align: center; }
hr { border: 1px solid #8b7355; margin: 20px 0; }
ul { margin: 10px 0 20px 30px; }
li { margin: 5px 0; }
code { background: #fffaf0; padding: 2px 6px; border-radius: 4px; }
pre { background: #fffaf0; padding: 10px; border-radius: 6px; overflow-x: auto; border: 1px solid #8b7355; }
button.collapsible {
  background-color: #8b7355;
  color: white;
  cursor: pointer;
  padding: 10px;
  width: 100%;
  text-align: left;
  border: none;
  border-radius: 6px;
  margin: 10px 0;
}
div.content {
  padding: 10px 20px;
  display: none;
  overflow: hidden;
  background-color: #fffaf0;
  border-left: 3px solid #8b7355;
  border-radius: 4px;
}
a { color: #5a4a32; text-decoration: none; }
a:hover { text-decoration: underline; }
</style>
</head>
<body>

<h1>Corewright Builder</h1>

<hr>
<h2>Overview</h2>
<p>The <strong>Corewright Builder</strong> is a web-based interface designed to streamline the creation and management of customizable golems for Questforge games. This builder allows players to:</p>
<ul>
  <li>Assemble golems</li>
  <li>Assign engines</li>
  <li>Apply infusions</li>
  <li>Generate detailed stat blocks for gameplay</li>
</ul>
<p>It supports <strong>single golems</strong>, <strong>multiple golems</strong>, and <strong>fused golem modes</strong>, providing a flexible toolkit for both players and game masters.</p>
<p>This repository contains the complete <strong>HTML, CSS, and JavaScript</strong> needed to run the builder locally or via GitHub Pages. All components use <strong>relative links</strong> for easy deployment and maintenance.</p>

<hr>
<h2>Features</h2>
<ul>
  <li><strong>Dynamic Assembly:</strong> Adjust level, Intelligence modifier, and engine type for your golem.</li>
  <li><strong>Infusion Management:</strong> Select infusions categorized as Tank, DPS, Control, or Utility.</li>
  <li><strong>Multi-Golem & Fusion Modes:</strong> Build up to two golems and combine stats in fusion mode.</li>
  <li><strong>Real-Time Stat Block:</strong> View a live, detailed stat block that updates as you tweak settings.</li>
  <li><strong>Export Options:</strong> Print, save as PDF, or download as a <code>.txt</code> file.</li>
  <li><strong>Save & Share Builds:</strong> Store builds locally or generate shareable links.</li>
</ul>

<hr>
<h2>Getting Started</h2>
<ul>
  <li><strong>Open the Builder:</strong> Open <code>index.html</code> locally, or visit <a href="https://questforgegamespnw.github.io/corewright-builder/" target="_blank">GitHub Pages</a>.</li>
  <li><strong>Assemble Your Golem:</strong>
    <ul>
      <li>Set Level and INT Modifier</li>
      <li>Choose Engine: Flame, Stone, Frost, Aether, or None</li>
      <li>Select Mode: Single, Multi-Golem, or Fusion Mode</li>
    </ul>
  </li>
  <li><strong>Apply Infusions:</strong>
    <ul>
      <li>Infusions are categorized: Tank, DPS, Control, Utility</li>
      <li>Click collapsible cards to view <strong>Effect</strong> and <strong>Details</strong></li>
      <li>Use checkboxes to select which infusions to apply</li>
    </ul>
  </li>
  <li><strong>View & Export Stat Block:</strong>
    <ul>
      <li>Real-time updates as you change settings</li>
      <li>Options: Print / Save PDF, Download <code>.txt</code>, Save / Load Build, Share Build via URL</li>
    </ul>
  </li>
  <li><strong>Multi-Golem / Fusion Mode:</strong>
    <ul>
      <li>Second golem panel appears for Multi or Fusion</li>
      <li>Fusion mode combines stats into one enhanced golem</li>
    </ul>
  </li>
  <li><strong>Deployment & Maintenance:</strong>
    <ul>
      <li>Relative links ensure smooth GitHub Pages deployment</li>
      <li>Edit <code>index.html</code>, <code>css/style.css</code>, or <code>js/</code> files, then commit & push</li>
    </ul>
  </li>
</ul>

<hr>
<h2>Quick Reference / Checklist</h2>

<button class="collapsible">Navigation</button>
<div class="content">
<ul>
  <li>Links to Builder, Infusions, and Subclass work</li>
  <li>Sticky nav bar stays visible when scrolling</li>
</ul>
</div>

<button class="collapsible">Golem Assembly</button>
<div class="content">
<ul>
  <li>Level and INT inputs correctly affect stat calculations</li>
  <li>Engine selection applies correct bonuses</li>
  <li>Mode selection toggles single, multi, and fusion correctly</li>
</ul>
</div>

<button class="collapsible">Infusions</button>
<div class="content">
<ul>
  <li>All infusions render as collapsible cards</li>
  <li>Tags (Tank, DPS, Control, Utility) display correctly</li>
  <li>Checkboxes allow selection/deselection</li>
  <li>Second golem infusions render in multi/fusion mode</li>
</ul>
</div>

<button class="collapsible">Stat Block</button>
<div class="content">
<ul>
  <li>Stat block updates dynamically with selections</li>
  <li>Fused golem combines stats correctly</li>
  <li>Print / Save PDF displays only the stat block</li>
</ul>
</div>

<button class="collapsible">Build Management</button>
<div class="content">
<ul>
  <li>Save Build stores current build in localStorage</li>
  <li>Load Build retrieves saved builds</li>
  <li>Share Build generates a valid URL that recreates the build</li>
</ul>
</div>

<button class="collapsible">Export / Download</button>
<div class="content">
<ul>
  <li>Download <code>.txt</code> outputs correct stat block</li>
  <li>Print preview hides unnecessary elements</li>
</ul>
</div>

<button class="collapsible">General UI</button>
<div class="content">
<ul>
  <li>Buttons and input fields are styled consistently</li>
  <li>Collapsible content expands and collapses correctly</li>
  <li>Responsive layout on different screen sizes</li>
</ul>
</div>

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
├─ README.html
</pre>

<hr>
<h2>Developer Notes</h2>

<button class="collapsible">Adding New Infusions</button>
<div class="content">
<pre>
"newInfusion": {
  name: "New Infusion Name",
  effect: "Effect description",
  details: "Additional details",
  tags: ["Tank","Utility"], // optional
  apply: (golem, player) => {
    // code to modify golem stats
  }
}
</pre>
<p>Save and reload the builder; the new infusion will appear automatically.</p>
</div>

<button class="collapsible">Updating Engine Effects</button>
<div class="content">
<p>All engine logic is in <code>js/builder.js</code> within the <code>createGolem()</code> function. Modify or add engine effects according to game mechanics.</p>
</div>

<button class="collapsible">Debugging Tips</button>
<div class="content">
<ul>
  <li>Use the browser console to inspect golem objects</li>
  <li>Ensure all relative links are correct after moving files</li>
  <li>Check collapsible cards after changes to <code>builder.js</code> or <code>infusions.js</code></li>
</ul>
</div>

<button class="collapsible">Deployment</button>
<div class="content">
<ul>
  <li>GitHub Pages automatically hosts relative paths</li>
  <li>Ensure <code>index.html</code> is at the root of the repository</li>
  <li>Confirm CSS and JS paths before committing</li>
</ul>
</div>

<script>
var coll = document.getElementsByClassName("collapsible");
for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
  });
}
</script>

</body>
</html>
