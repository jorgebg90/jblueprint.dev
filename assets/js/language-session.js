(function () {
  var switcher = document.querySelector("[data-language-switcher]");
  var feedback = document.getElementById("translation-feedback");
  var storageKey = "site-language";

  function getCurrentLocale() {
    if (!switcher) {
      return "en";
    }

    return switcher.dataset.currentLang || "en";
  }

  function getUrlParam(name) {
    var url = new URL(window.location.href);
    return url.searchParams.get(name);
  }

  function showFeedbackIfNeeded() {
    if (!feedback) {
      return;
    }

    var translationParam = getUrlParam("translation");
    if (translationParam !== "unavailable") {
      return;
    }

    var requestedLocale = getUrlParam("requested") || getCurrentLocale();
    var message = feedback.dataset.messageEn;
    if (requestedLocale === "es") {
      message = feedback.dataset.messageEs || message;
    }

    feedback.textContent = message;
    feedback.hidden = false;

    var cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete("translation");
    cleanUrl.searchParams.delete("requested");
    window.history.replaceState({}, "", cleanUrl.toString());
  }

  function targetFor(locale) {
    if (!switcher) {
      return null;
    }

    if (locale === "es") {
      return switcher.dataset.targetEs || null;
    }

    return switcher.dataset.targetEn || null;
  }

  function hasEquivalent(locale) {
    if (!switcher) {
      return false;
    }

    if (locale === "es") {
      return switcher.dataset.hasEquivalentEs === "true";
    }

    return switcher.dataset.hasEquivalentEn === "true";
  }

  function handleClickPersistence() {
    if (!switcher) {
      return;
    }

    switcher.addEventListener("click", function (event) {
      var target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      var locale = target.getAttribute("data-language-option");
      if (!locale) {
        return;
      }

      window.sessionStorage.setItem(storageKey, locale);
    });
  }

  function applySessionPreference() {
    if (!switcher) {
      return;
    }

    var preferred = window.sessionStorage.getItem(storageKey);
    var current = getCurrentLocale();
    if (!preferred || preferred === current) {
      return;
    }

    if (!hasEquivalent(preferred)) {
      return;
    }

    var preferredTarget = targetFor(preferred);
    if (!preferredTarget) {
      return;
    }

    window.location.replace(preferredTarget);
  }

  showFeedbackIfNeeded();
  handleClickPersistence();
  applySessionPreference();
})();

