/**
 * utm-tracker.js — Blue Grid Media
 * Captures UTM parameters, referrer, and landing page on first load.
 * Stores in sessionStorage so values persist across page navigation
 * within the same tab session, then auto-fills hidden form fields.
 */
(function () {
  try {
    var params  = new URLSearchParams(window.location.search);
    var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

    // --- UTM params: overwrite storage only if they're present in the current URL ---
    // This handles direct ad landings (UTM in URL) without wiping a prior session's UTMs
    // if the user navigates to a page that has no UTMs in the URL.
    var hasUtm = utmKeys.some(function (k) { return !!params.get(k); });
    if (hasUtm) {
      utmKeys.forEach(function (k) {
        var val = params.get(k);
        if (val) sessionStorage.setItem(k, val);
        else sessionStorage.removeItem(k);
      });
    }

    // --- Referrer: capture once per session (the source site, e.g. google.com) ---
    if (!sessionStorage.getItem('referrer')) {
      sessionStorage.setItem('referrer', document.referrer || '(direct)');
    }

    // --- Landing page: capture once per session (the first URL the visitor hit) ---
    if (!sessionStorage.getItem('landing_page')) {
      // Strip any fragment (#) — keep path + query so UTMs are visible
      var lp = window.location.origin + window.location.pathname + window.location.search;
      sessionStorage.setItem('landing_page', lp);
    }

    // --- Auto-fill hidden form fields on this page (if any) ---
    // Runs immediately and also on DOMContentLoaded in case the form
    // hasn't rendered yet (e.g. modal forms injected by JS).
    var allKeys = utmKeys.concat(['referrer', 'landing_page']);

    function fillUtmFields() {
      allKeys.forEach(function (k) {
        var els = document.querySelectorAll('input[name="' + k + '"]');
        els.forEach(function (el) {
          el.value = sessionStorage.getItem(k) || '';
        });
      });
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fillUtmFields);
    } else {
      fillUtmFields();
    }

  } catch (e) {
    // Fail silently — never break the page
  }
})();
