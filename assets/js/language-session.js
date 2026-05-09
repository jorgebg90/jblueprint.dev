(function () {
  var feedback = document.getElementById("translation-feedback");
  var profileImages = document.querySelectorAll("[data-profile-image]");
  var languageSwitcher = document.querySelector("[data-language-switcher]");

  // Show translation-unavailable banner when redirected with ?translation=unavailable param.
  function showFeedbackIfNeeded() {
    if (!feedback) return;

    var url = new URL(window.location.href);
    var translationParam = url.searchParams.get("translation");
    if (translationParam !== "unavailable") return;

    var requestedLocale = url.searchParams.get("requested") || "en";
    var message = requestedLocale === "es"
      ? (feedback.dataset.messageEs || feedback.dataset.messageEn)
      : feedback.dataset.messageEn;

    feedback.textContent = message;
    feedback.hidden = false;

    // Clean the query params from the URL without reloading.
    var cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete("translation");
    cleanUrl.searchParams.delete("requested");
    cleanUrl.searchParams.delete("fallback_attempt");
    window.history.replaceState({}, "", cleanUrl.toString());
  }

  function revealImageFallback(imageElement) {
    if (!imageElement) return;

    var fallbackTargetId = imageElement.getAttribute("data-fallback-target");
    if (!fallbackTargetId) return;

    var fallbackNode = document.getElementById(fallbackTargetId);
    imageElement.classList.add("is-hidden");

    if (fallbackNode) {
      fallbackNode.hidden = false;
    }
  }

  function setupProfileImageFallbacks() {
    if (!profileImages.length) return;

    profileImages.forEach(function (imageElement) {
      imageElement.addEventListener("error", function () {
        revealImageFallback(imageElement);
      });

      if (imageElement.complete && imageElement.naturalWidth === 0) {
        revealImageFallback(imageElement);
      }
    });
  }

  // Build locale switch targets from the current URL first, then fallback to data-target values.
  function buildLocalePathFromCurrentUrl(targetLang) {
    var url = new URL(window.location.href);
    var path = url.pathname;

    // Normalize to avoid accidental double slashes while preserving root.
    path = path.replace(/\/+/g, "/");
    if (path !== "/" && path.endsWith("/")) {
      path = path.slice(0, -1);
    }

    var isSpanishPath = path === "/es" || path.indexOf("/es/") === 0;
    var basePath = isSpanishPath ? path.replace(/^\/es/, "") : path;
    if (!basePath) {
      basePath = "/";
    }

    var targetPath = targetLang === "es"
      ? (basePath === "/" ? "/es/" : "/es" + basePath)
      : basePath;

    var params = new URLSearchParams(url.search);
    params.delete("translation");
    params.delete("requested");
    params.delete("fallback_attempt");

    var query = params.toString();
    return targetPath + (query ? "?" + query : "") + url.hash;
  }

  // Fix language switcher href buttons to use current URL-aware targets.
  // This keeps navigation stable across apex/www hostnames while cert propagation finishes.
  function fixLanguageSwitcherHrefs() {
    if (!languageSwitcher) return;

    var fallbackEn = languageSwitcher.getAttribute("data-target-en") || "/";
    var fallbackEs = languageSwitcher.getAttribute("data-target-es") || "/es/";

    var targetEn = buildLocalePathFromCurrentUrl("en") || fallbackEn;
    var targetEs = buildLocalePathFromCurrentUrl("es") || fallbackEs;

    var links = languageSwitcher.querySelectorAll("a[data-language-option]");
    links.forEach(function (link) {
      var lang = link.getAttribute("data-language-option");
      if (lang === "en") {
        link.href = targetEn;
      } else if (lang === "es") {
        link.href = targetEs;
      }
    });
  }

  showFeedbackIfNeeded();
  setupProfileImageFallbacks();
  fixLanguageSwitcherHrefs();
})();

