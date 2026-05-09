(function () {
  var switcher = document.querySelector("[data-language-switcher]");
  var feedback = document.getElementById("translation-feedback");

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
    window.history.replaceState({}, "", cleanUrl.toString());
  }

  showFeedbackIfNeeded();
})();

