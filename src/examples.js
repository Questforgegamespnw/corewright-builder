import { EXAMPLE_BUILDS } from "./data/exampleBuilds.js";

/* =========================
   Helpers
========================= */

function $(selector) {
  return document.querySelector(selector);
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function dedupe(arr) {
  return [...new Set((arr || []).filter(Boolean))];
}

/* =========================
   Filters
========================= */

function getSearchValue() {
  return normalize($("#search")?.value || "");
}

function getLevelFilterValue() {
  return $("#levelFilter")?.value || "all";
}

function getRoleFilterValue() {
  return $("#roleFilter")?.value || "all";
}

function getDifficultyFilterValue() {
  return $("#difficultyFilter")?.value || "all";
}

function matchesLevel(build, levelFilter) {
  if (levelFilter === "all") return true;
  if (levelFilter === "17") return Number(build.level) >= 17;
  return String(build.level) === String(levelFilter);
}

function matchesRole(build, roleFilter) {
  if (roleFilter === "all") return true;
  return build.role === roleFilter;
}

function matchesDifficulty(build, difficultyFilter) {
  if (difficultyFilter === "all") return true;
  return build.difficulty === difficultyFilter;
}

function matchesSearch(build, searchTerm) {
  if (!searchTerm) return true;

  const haystack = [
    build.name,
    build.role,
    build.difficulty,
    build.summary,
    build.template,
    build.form,
    build.engine,
    ...(build.tags || []),
    ...(build.infusions || [])
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(searchTerm);
}

function getFilteredBuilds() {
  const searchTerm = getSearchValue();
  const levelFilter = getLevelFilterValue();
  const roleFilter = getRoleFilterValue();
  const difficultyFilter = getDifficultyFilterValue();

  return EXAMPLE_BUILDS.filter((build) => {
    return (
      matchesSearch(build, searchTerm) &&
      matchesLevel(build, levelFilter) &&
      matchesRole(build, roleFilter) &&
      matchesDifficulty(build, difficultyFilter)
    );
  });
}

/* =========================
   Query String / Navigation
========================= */

function buildBuilderQuery(build) {
  const params = new URLSearchParams({
    mode: build.mode || "single",
    level: String(build.level ?? 10),
    intMod: String(build.intMod ?? Math.max((build.infusions || []).length, 3)),
    template: build.template || "none",
    engine: build.engine || "none",
    form: build.form || "none",
    infusions: (build.infusions || []).join(",")
  });

  return params.toString();
}

function getBuilderUrl(build) {
  return `../index.html?${buildBuilderQuery(build)}`;
}

function loadBuildInBuilder(buildId) {
  const build = EXAMPLE_BUILDS.find((b) => b.id === buildId);
  if (!build) return;

  window.location.href = getBuilderUrl(build);
}

function viewUpgrade(buildId) {
  const build = EXAMPLE_BUILDS.find((b) => b.id === buildId);
  if (!build || !build.upgradeTo) return;

  const upgrade = EXAMPLE_BUILDS.find((b) => b.id === build.upgradeTo);
  if (!upgrade) return;

  const searchInput = $("#search");
  const levelFilter = $("#levelFilter");

  if (searchInput) {
    searchInput.value = "";
  }

  if (levelFilter) {
    levelFilter.value = upgrade.level >= 17 ? "17" : String(upgrade.level);
  }

  renderExampleBuilds();

  const targetCard = document.querySelector(`[data-build-id="${upgrade.id}"]`);
  if (targetCard) {
    targetCard.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    targetCard.classList.add("selected");

    setTimeout(() => {
      targetCard.classList.remove("selected");
    }, 1200);
  }
}

/* =========================
   Rendering Helpers
========================= */

function renderBuildTags(tags = []) {
  const uniqueTags = dedupe(tags);

  return uniqueTags
    .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
    .join("");
}

function renderMetaTags(build) {
  const baseTags = [
    `Level ${build.level >= 17 ? "17+" : build.level}`,
    build.role
  ];

  const difficultyTag = `
    <span class="tag difficulty-${escapeHtml(build.difficulty)}">
      ${escapeHtml(build.difficulty)}
    </span>
  `;

  const otherTags = renderBuildTags(build.tags || []);

  return `
    ${difficultyTag}
    ${baseTags
      .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
      .join("")}
    ${otherTags}
  `;
}

/* =========================
   Rendering Cards
========================= */

function renderBuildCard(build) {
  const upgradeButton = build.upgradeTo
    ? `
      <button
        class="action-button js-upgrade-build"
        type="button"
        data-build-id="${escapeHtml(build.id)}"
      >
        View Upgrade
      </button>
    `
    : "";

  return `
    <div
      class="select-card example-build-card"
      data-build-id="${escapeHtml(build.id)}"
      style="cursor: default; margin-bottom: 12px;"
    >
      <div class="select-card-header">
        <strong>${escapeHtml(build.name)}</strong>
        <div class="card-tags">
          ${renderMetaTags(build)}
        </div>
      </div>

      <div class="select-card-body">
        <p>${escapeHtml(build.summary || "")}</p>

        <div class="card-preview">
          <p><strong>Template:</strong> ${escapeHtml(build.template || "none")}</p>
          <p><strong>Form:</strong> ${escapeHtml(build.form || "none")}</p>
          <p><strong>Engine:</strong> ${escapeHtml(build.engine || "none")}</p>
          <p>
            <strong>Infusions:</strong>
            ${
              build.infusions?.length
                ? build.infusions.map(escapeHtml).join(", ")
                : "None"
            }
          </p>
          ${
            build.upgradeFrom
              ? `<p><strong>Upgrade From:</strong> ${escapeHtml(build.upgradeFrom)}</p>`
              : ""
          }
        </div>

        <div class="button-row">
          <button
            class="action-button js-load-build"
            type="button"
            data-build-id="${escapeHtml(build.id)}"
          >
            Load in Builder
          </button>
          ${upgradeButton}
        </div>
      </div>
    </div>
  `;
}

function renderEmptyState() {
  return `
    <div class="summary-line">
      <strong>No builds found.</strong><br>
      Try changing your filters or search text.
    </div>
  `;
}

function renderResultSummary(results) {
  const container = $("#exampleBuilds");
  if (!container) return;

  const count = results.length;
  const summary = `
    <div class="summary-line" style="margin-bottom: 12px;">
      <strong>${count}</strong> build${count === 1 ? "" : "s"} shown
    </div>
  `;

  container.innerHTML =
    summary + (count ? results.map(renderBuildCard).join("") : renderEmptyState());
}

function renderExampleBuilds() {
  const results = getFilteredBuilds();
  renderResultSummary(results);
}

/* =========================
   Events
========================= */

function bindFilterEvents() {
  const search = $("#search");
  const levelFilter = $("#levelFilter");
  const roleFilter = $("#roleFilter");
  const difficultyFilter = $("#difficultyFilter");

  if (search) {
    search.addEventListener("input", renderExampleBuilds);
  }

  if (levelFilter) {
    levelFilter.addEventListener("change", renderExampleBuilds);
  }

  if (roleFilter) {
    roleFilter.addEventListener("change", renderExampleBuilds);
  }

  if (difficultyFilter) {
    difficultyFilter.addEventListener("change", renderExampleBuilds);
  }
}

function bindCardEvents() {
  document.addEventListener("click", (event) => {
    const loadBtn = event.target.closest(".js-load-build");
    if (loadBtn) {
      const buildId = loadBtn.dataset.buildId;
      loadBuildInBuilder(buildId);
      return;
    }

    const upgradeBtn = event.target.closest(".js-upgrade-build");
    if (upgradeBtn) {
      const buildId = upgradeBtn.dataset.buildId;
      viewUpgrade(buildId);
    }
  });
}

/* =========================
   Init
========================= */

function initExamplesPage() {
  bindFilterEvents();
  bindCardEvents();
  renderExampleBuilds();
}

document.addEventListener("DOMContentLoaded", initExamplesPage);