Main GITHUB link for the tool: https://questforgegamespnw.github.io/corewright-builder/ 

Corewright Builder GitHub Pages Checklist
1. Repository & Branch
 Repository name: corewright-builder
 Branch used for GitHub Pages: usually main
 GitHub Pages settings: Source = main / root or /docs if used
2. File & Folder Structure
 index.html at root of the repository (or build.index.html if renamed, with correct GitHub Pages configuration)
 js/ folder contains builder.js and infusions.js
 css/ folder contains style.css

 All <link> and <script> references use relative paths:

<link rel="stylesheet" href="./css/style.css">
<script src="./js/infusions.js"></script>
<script src="./js/builder.js"></script>
 All other HTML pages reference each other with relative paths (e.g., ./infusions/ and ./corewright/)
3. HTML & JS
 index.html opens correctly in a browser locally
 Navigation bar links go to correct relative pages
 Buttons (Print, Save, Load, Share) work locally
 Infusions render correctly via renderInfusions() in builder.js
 Collapsible sections expand/collapse without errors
4. CSS
 style.css loads correctly, and all styles (cards, collapsibles, nav bar, stat block) appear as intended
 Splash page gradient renders correctly
 Print CSS works: only the stat block prints, buttons hidden
5. Deployment & Testing on GitHub Pages
 Push all changes to main (or Pages branch)
 Wait a few seconds for GitHub Pages to deploy
 Visit: https://questforgegamespnw.github.io/corewright-builder/
 Confirm:
Navigation links open correct pages
JS interactivity works (infusions, build buttons)
CSS styling applied
Print functionality works via browser preview
6. Optional Checks
 Clear cache / hard refresh to test updates
 Test multi-golem & fusion modes
 Test sharing builds via URL (?build=...)
 Check mobile responsiveness (resize browser or use device toolbar)
