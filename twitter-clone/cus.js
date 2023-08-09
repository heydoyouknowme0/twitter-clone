function waitForElement(els, func, timeout = 100) {
  const queries = els.map((el) => document.querySelector(el));
  if (queries.every((a) => a)) {
    func(queries);
  } else if (timeout > 0) {
    setTimeout(waitForElement, 300, els, func, --timeout);
  }
}
function setThemeByTime() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 6 && hour < 18) {
    lighthm();
  }
}
function lighthm() {
  document.documentElement.style.setProperty("--spice-text", "#1B1B1B");
  document.documentElement.style.setProperty("--spice-rgb-text", "27,27,27");
  document.documentElement.style.setProperty("--spice-subtext", "#6d6d6d");
  document.documentElement.style.setProperty(
    "--spice-rgb-subtext",
    "109,109,109"
  );
  document.documentElement.style.setProperty("--spice-alt-text", "#ffffff");
  document.documentElement.style.setProperty(
    "--spice-rgb-alt-text",
    "255,255,255"
  );
  document.documentElement.style.setProperty("--spice-main", "#f9f9f9");
  document.documentElement.style.setProperty("--spice-rgb-main", "249,249,249");
  document.documentElement.style.setProperty("--spice-sidebar", "#F3F3F3");
  document.documentElement.style.setProperty(
    "--spice-rgb-sidebar",
    "243,243,243"
  );
  document.documentElement.style.setProperty("--spice-player", "#F3F3F3");
  document.documentElement.style.setProperty(
    "--spice-rgb-player",
    "243,243,243"
  );
  document.documentElement.style.setProperty(
    "--spice-player-border",
    "#e4e4e4"
  );
  document.documentElement.style.setProperty(
    "--spice-rgb-player-border",
    "228,228,228"
  );
  document.documentElement.style.setProperty(
    "--spice-player-bar-shadow",
    "#a5a5a5"
  );
  document.documentElement.style.setProperty(
    "--spice-rgb-player-bar-shadow",
    "165,165,165"
  );
  document.documentElement.style.setProperty(
    "--spice-player-bar-bg",
    "#7d7d7d"
  );
  document.documentElement.style.setProperty(
    "--spice-rgb-player-bar-bg",
    "125,125,125"
  );
  document.documentElement.style.setProperty("--spice-card", "#ffffff");
  document.documentElement.style.setProperty("--spice-rgb-card", "255,255,255");
  document.documentElement.style.setProperty("--spice-shadow", "#ffffff");
  document.documentElement.style.setProperty(
    "--spice-rgb-shadow",
    "255,255,255"
  );
  document.documentElement.style.setProperty("--spice-selected-row", "#e6e6e6");
  document.documentElement.style.setProperty(
    "--spice-rgb-selected-row",
    "230,230,230"
  );
  document.documentElement.style.setProperty("--spice-button", "#006bba");
  document.documentElement.style.setProperty("--spice-rgb-button", "0,107,186");
  document.documentElement.style.setProperty(
    "--spice-button-active",
    "#006bba"
  );
  document.documentElement.style.setProperty(
    "--spice-rgb-button-active",
    "0,107,186"
  );
  document.documentElement.style.setProperty(
    "--spice-button-disabled",
    "#cccccc"
  );
  document.documentElement.style.setProperty(
    "--spice-rgb-button-disabled",
    "204,204,204"
  );
  document.documentElement.style.setProperty("--spice-tab-active", "#ffffff");
  document.documentElement.style.setProperty(
    "--spice-rgb-tab-active",
    "255,255,255"
  );
  document.documentElement.style.setProperty("--spice-notification", "#0068d1");
  document.documentElement.style.setProperty(
    "--spice-rgb-notification",
    "0,104,209"
  );
  document.documentElement.style.setProperty(
    "--spice-notification-error",
    "#c42b1c"
  );
  document.documentElement.style.setProperty(
    "--spice-rgb-notification-error",
    "196,43,28"
  );
  document.documentElement.style.setProperty(
    "--spice-notif-bubble-info",
    "#e3f2fc"
  );
  document.documentElement.style.setProperty(
    "--spice-rgb-notif-bubble-info",
    "227,242,252"
  );
  document.documentElement.style.setProperty(
    "--spice-notif-bubble-error",
    "#fde7e9"
  );
  document.documentElement.style.setProperty(
    "--spice-rgb-notif-bubble-error",
    "253,231,233"
  );
  document.documentElement.style.setProperty("--spice-misc", "#6d6d6d");
  document.documentElement.style.setProperty("--spice-rgb-misc", "109,109,109");
  document.documentElement.style.setProperty("--spice-not-selected", "#bbbbbb");
  document.documentElement.style.setProperty(
    "--spice-rgb-not-selected",
    "187,187,187"
  );
  document.documentElement.style.setProperty("--spice-accent", "#006bba");
  document.documentElement.style.setProperty("--spice-rgb-accent", "0,107,186");
  document.documentElement.style.setProperty("--spice-layer-shadow", "#bfbfbf");
  document.documentElement.style.setProperty(
    "--spice-rgb-layer-shadow",
    "191,191,191"
  );
  document.documentElement.style.setProperty("--spice-contour", "#efefef");
  document.documentElement.style.setProperty(
    "--spice-rgb-contour",
    "239,239,239"
  );
  document.documentElement.style.setProperty("--spice-dark-border", "#E5E5E5");
  document.documentElement.style.setProperty(
    "--spice-rgb-dark-border",
    "229,229,229"
  );
  document.documentElement.style.setProperty("--spice-light-border", "#E5E5E5");
  document.documentElement.style.setProperty(
    "--spice-rgb-light-border",
    "229,229,229"
  );
}
function darkthm() {
  document.documentElement.style.setProperty("--spice-text", "#ffffff");
  document.documentElement.style.setProperty("--spice-rgb-text", "255,255,255");
  document.documentElement.style.setProperty("--spice-subtext", "#909090");
  document.documentElement.style.setProperty(
    "--spice-rgb-subtext",
    "144,144,144"
  );
  document.documentElement.style.setProperty("--spice-alt-text", "#000000");
  document.documentElement.style.setProperty("--spice-rgb-alt-text", "0,0,0");
  document.documentElement.style.setProperty("--spice-main", "#121212");
  document.documentElement.style.setProperty("--spice-rgb-main", "18,18,18");
  document.documentElement.style.setProperty("--spice-sidebar", "#191919");
  document.documentElement.style.setProperty("--spice-rgb-sidebar", "25,25,25");
  document.documentElement.style.setProperty("--spice-player", "#262626");
  document.documentElement.style.setProperty("--spice-rgb-player", "38,38,38");
  document.documentElement.style.setProperty(
    "--spice-player-border",
    "#3c3c3c"
  );
  document.documentElement.style.setProperty(
    "--spice-rgb-player-border",
    "60,60,60"
  );
  document.documentElement.style.setProperty(
    "--spice-player-bar-shadow",
    "#080808"
  );
  document.documentElement.style.setProperty(
    "--spice-rgb-player-bar-shadow",
    "8,8,8"
  );
  document.documentElement.style.setProperty(
    "--spice-player-bar-bg",
    "#333333"
  );
  document.documentElement.style.setProperty(
    "--spice-rgb-player-bar-bg",
    "51,51,51"
  );
  document.documentElement.style.setProperty("--spice-card", "#1c1c1c");
  document.documentElement.style.setProperty("--spice-rgb-card", "28,28,28");
  document.documentElement.style.setProperty("--spice-shadow", "#ffffff");
  document.documentElement.style.setProperty(
    "--spice-rgb-shadow",
    "255,255,255"
  );
  document.documentElement.style.setProperty("--spice-selected-row", "#373737");
  document.documentElement.style.setProperty(
    "--spice-rgb-selected-row",
    "55,55,55"
  );
  document.documentElement.style.setProperty("--spice-button", "#00ffa1");
  document.documentElement.style.setProperty("--spice-rgb-button", "0,255,161");
  document.documentElement.style.setProperty(
    "--spice-button-active",
    "#00ffa1"
  );
  document.documentElement.style.setProperty(
    "--spice-rgb-button-active",
    "0,255,161"
  );
  document.documentElement.style.setProperty(
    "--spice-button-disabled",
    "#313131"
  );
  document.documentElement.style.setProperty(
    "--spice-rgb-button-disabled",
    "49,49,49"
  );
  document.documentElement.style.setProperty("--spice-tab-active", "#1c1c1c");
  document.documentElement.style.setProperty(
    "--spice-rgb-tab-active",
    "28,28,28"
  );
  document.documentElement.style.setProperty("--spice-notification", "#42a0fe");
  document.documentElement.style.setProperty(
    "--spice-rgb-notification",
    "66,160,254"
  );
  document.documentElement.style.setProperty(
    "--spice-notification-error",
    "#ff99a4"
  );
  document.documentElement.style.setProperty(
    "--spice-rgb-notification-error",
    "255,153,164"
  );
  document.documentElement.style.setProperty(
    "--spice-notif-bubble-info",
    "#182b3f"
  );
  document.documentElement.style.setProperty(
    "--spice-rgb-notif-bubble-info",
    "24,43,63"
  );
  document.documentElement.style.setProperty(
    "--spice-notif-bubble-error",
    "#442726"
  );
  document.documentElement.style.setProperty(
    "--spice-rgb-notif-bubble-error",
    "68,39,38"
  );
  document.documentElement.style.setProperty("--spice-misc", "#909090");
  document.documentElement.style.setProperty("--spice-rgb-misc", "144,144,144");
  document.documentElement.style.setProperty("--spice-not-selected", "#bbbbbb");
  document.documentElement.style.setProperty(
    "--spice-rgb-not-selected",
    "187,187,187"
  );
  document.documentElement.style.setProperty("--spice-accent", "#00ffa1");
  document.documentElement.style.setProperty("--spice-rgb-accent", "0,255,161");
  document.documentElement.style.setProperty("--spice-layer-shadow", "#000000");
  document.documentElement.style.setProperty(
    "--spice-rgb-layer-shadow",
    "0,0,0"
  );
  document.documentElement.style.setProperty("--spice-contour", "#3c3c3c");
  document.documentElement.style.setProperty("--spice-rgb-contour", "60,60,60");
  document.documentElement.style.setProperty("--spice-dark-border", "#171717");
  document.documentElement.style.setProperty(
    "--spice-rgb-dark-border",
    "23,23,23"
  );
  document.documentElement.style.setProperty("--spice-light-border", "#3a3a3a");
  document.documentElement.style.setProperty(
    "--spice-rgb-light-border",
    "58,58,58"
  );
}
function toggleTheme() {
  const currentTheme =
    document.documentElement.style.getPropertyValue("--spice-main");

  if (currentTheme === "#121212") {
    lighthm();
  } else {
    darkthm();
  }
}

// Call the setThemeByTime function whenever you need to change the theme.
setThemeByTime();

waitForElement([".main-topBar-container"], (queries) => {
  // Add activator on top bar
  const div = document.createElement("div");
  div.id = "main-topBar-moon-div";
  queries[0].insertBefore(
    div,
    queries[0].querySelector(".main-userWidget-box")
  );

  const button = document.createElement("button");
  button.id = "main-topBar-moon-button";
  button.classList.add("main-topBar-buddyFeed");
  button.setAttribute("title", "Light/Dark");
  button.onclick = toggleTheme;
  button.innerHTML = `<svg role="img" viewBox="0 0 16 16" height="16" width="16"><path fill="currentColor" d="M9.598 1.591a.75.75 0 01.785-.175 7 7 0 11-8.967 8.967.75.75 0 01.961-.96 5.5 5.5 0 007.046-7.046.75.75 0 01.175-.786zm1.616 1.945a7 7 0 01-7.678 7.678 5.5 5.5 0 107.678-7.678z"></path></svg>`;
  div.append(button);
});
