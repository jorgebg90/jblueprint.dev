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

  // Fix language switcher href buttons to use data-target values.
  // This corrects Polyglot's automatic href rewriting on localized pages.
  function fixLanguageSwitcherHrefs() {
    if (!languageSwitcher) return;

    var targetEn = languageSwitcher.getAttribute("data-target-en");
    var targetEs = languageSwitcher.getAttribute("data-target-es");

    if (!targetEn || !targetEs) return;

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



