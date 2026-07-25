/*
 * YCOTW lead capture -> /api/lead -> GoHighLevel
 *
 * No secrets live in this file. It only ever talks to our own same-origin
 * /api/lead endpoint; the GHL Private Integration token and location ID are
 * read server-side from Vercel env vars (GHL_TOKEN / GHL_LOCATION_ID).
 *
 * Dependency-free vanilla JS. Loaded on every page that has a capture form.
 */
(function () {
  'use strict';

  var ENDPOINT = '/api/lead';
  var SOURCE = 'ycotw.com';
  var THANKS = 'Thanks — check your inbox.';
  var GENERIC_ERROR = 'Something went wrong. Please try again.';
  var INVALID_EMAIL = 'Please enter a valid email address.';

  // Mirrors the server-side check in /api/lead.js.
  var EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  /* ---------------------------------------------------------------------
   * Source tag, derived from the URL at runtime.
   *   /site/yacht-fuel-cost  -> yacht-fuel-cost
   *   /site/buy-hub          -> buy-hub
   *   /  or  /index          -> homepage
   * Tolerates a trailing .html so it still works before cleanUrls kicks in
   * (and when opening the files locally).
   * ------------------------------------------------------------------- */
  function deriveSource() {
    var p = (location.pathname || '/').replace(/\.html?$/i, '').replace(/\/+$/, '');
    var segs = p.split('/').filter(Boolean);
    var last = segs.length ? segs[segs.length - 1] : '';
    if (!last || last.toLowerCase() === 'index') return 'homepage';
    return last;
  }

  var PAGE_TAG = deriveSource();

  function post(payload) {
    return fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.json().catch(function () { return {}; });
    });
  }

  /* ---------------------------------------------------------------------
   * Field discovery.
   *
   * These forms have no name attributes, so everything is located by type
   * within the wrapper. One wrinkle: the homepage "Join the Community"
   * input carries no type at all (<input placeholder="Your email">), so a
   * strict input[type=email] selector misses it. Fall back to matching the
   * placeholder/id before giving up.
   * ------------------------------------------------------------------- */
  function toArray(nodes) {
    return Array.prototype.slice.call(nodes);
  }

  function findEmailInput(wrap) {
    var typed = wrap.querySelector('input[type="email"]');
    if (typed) return typed;
    var candidates = toArray(wrap.querySelectorAll('input')).filter(function (i) {
      var t = (i.getAttribute('type') || 'text').toLowerCase();
      if (t === 'tel' || t === 'hidden' || t === 'submit' || t === 'button') return false;
      return /e-?mail/i.test(i.placeholder || '') || /e-?mail/i.test(i.id || '');
    });
    return candidates[0] || null;
  }

  function fields(wrap) {
    var email = findEmailInput(wrap);
    var name = null;
    var phone = null;
    // Skip the element already claimed as the email field, so a single
    // untyped input is never counted as both email and name.
    toArray(wrap.querySelectorAll('input')).forEach(function (i) {
      if (i === email) return;
      var t = (i.getAttribute('type') || 'text').toLowerCase();
      if (t === 'tel' && !phone) phone = i;
      else if (t === 'text' && !name) name = i;
    });
    return { email: email, name: name, phone: phone };
  }

  /* ------------------------- inline messaging ------------------------- */

  function clearError(wrap) {
    var el = wrap.nextElementSibling;
    if (el && el.className === 'lead-error') el.parentNode.removeChild(el);
  }

  function showError(wrap, msg) {
    var el = wrap.nextElementSibling;
    if (!el || el.className !== 'lead-error') {
      el = document.createElement('p');
      el.className = 'lead-error';
      el.setAttribute('role', 'alert');
      // Inline styles: each page carries its own <style> block, so there is
      // no shared stylesheet to add a rule to.
      el.style.cssText = 'margin:8px 0 0;font-size:.85rem;color:#e08a8a';
      wrap.parentNode.insertBefore(el, wrap.nextSibling);
    }
    el.textContent = msg;
  }

  function succeed(wrap) {
    clearError(wrap);
    var p = document.createElement('p');
    p.className = 'lead-thanks';
    p.setAttribute('role', 'status');
    p.style.cssText = 'margin:0;font-size:1rem;font-weight:600';
    p.textContent = THANKS;
    wrap.innerHTML = '';
    wrap.appendChild(p);
  }

  /* ---------------------------- submission ---------------------------- */

  function submit(wrap, f, btn) {
    if (wrap.getAttribute('data-lead-busy')) return;
    clearError(wrap);

    var email = (f.email.value || '').trim();
    if (!EMAIL_RE.test(email)) {
      showError(wrap, INVALID_EMAIL);
      f.email.focus();
      return;
    }

    wrap.setAttribute('data-lead-busy', '1');
    var label = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending…';

    post({
      email: email,
      name: f.name ? (f.name.value || '').trim() : '',
      phone: f.phone ? (f.phone.value || '').trim() : '',
      tag: PAGE_TAG,
      source: SOURCE
    }).then(function () {
      succeed(wrap);
    }).catch(function () {
      wrap.removeAttribute('data-lead-busy');
      btn.disabled = false;
      btn.textContent = label;
      showError(wrap, GENERIC_ERROR);
    });
  }

  function bind(wrap) {
    if (wrap.getAttribute('data-lead-bound')) return;
    var f = fields(wrap);
    var btn = wrap.querySelector('button');
    if (!f.email || !btn) return;
    wrap.setAttribute('data-lead-bound', '1');

    // These buttons ship with a mockup onclick="alert('… Phase 2.')".
    // Strip it so the placeholder alert cannot fire alongside a real submit.
    toArray(wrap.querySelectorAll('button')).forEach(function (b) {
      b.removeAttribute('onclick');
      b.onclick = null;
    });

    btn.addEventListener('click', function (ev) {
      ev.preventDefault();
      submit(wrap, f, btn);
    });

    toArray(wrap.querySelectorAll('input')).forEach(function (i) {
      i.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.keyCode === 13) {
          ev.preventDefault();
          submit(wrap, f, btn);
        }
      });
    });
  }

  /* ------------------------- homepage survey -------------------------- */

  /*
   * The multi-step survey already accumulates everything we need in its own
   * surveyData object. Wrap its handlers so the existing UI flow runs
   * untouched and we post afterwards, rather than duplicating that state.
   *
   * Two posts, by design:
   *   1. surveyEmailNext() — partial capture the moment an email is given, so
   *      a visitor who abandons before the phone step is still a lead. This is
   *      the intent recorded in the existing logTap() comment.
   *   2. surveySubmit()    — the complete record, adding phone.
   * /api/lead upserts on email, so the second call updates the same GHL
   * contact rather than creating a duplicate.
   */
  function readSurveyData() {
    try {
      if (typeof surveyData !== 'undefined' && surveyData) return surveyData;
    } catch (e) { /* not defined on this page */ }
    return window.surveyData || null;
  }

  // Partial fires at most once per page load.
  var hasPostedPartial = false;

  function surveyPayload(d) {
    return {
      email: d.email,
      name: d.name || '',
      phone: d.phone || '',
      tag: d.segment || PAGE_TAG,
      source: SOURCE,
      path: Array.isArray(d.path) ? d.path.join(' > ') : ''
    };
  }

  /*
   * Wrap a global survey function: run the original first (it validates input
   * and advances the UI), then post. Any failure here is logged and swallowed
   * so the survey UI is never blocked or rolled back.
   */
  function wrapSurveyFn(fnName, shouldPost, onError) {
    if (typeof window[fnName] !== 'function') return;
    var original = window[fnName];

    window[fnName] = function () {
      var result = original.apply(this, arguments);
      try {
        var d = readSurveyData();
        // The originals bail out without setting .email when validation fails,
        // so the presence of an email is what tells us the step succeeded.
        if (d && d.email && shouldPost()) {
          post(surveyPayload(d)).catch(function () {
            console.error(onError);
          });
        }
      } catch (e) {
        console.error('[lead] ' + fnName + ' hook error', e);
      }
      return result;
    };
  }

  function hookSurvey() {
    wrapSurveyFn(
      'surveyEmailNext',
      function () {
        if (hasPostedPartial) return false;
        hasPostedPartial = true;
        return true;
      },
      '[lead] survey partial post failed'
    );

    wrapSurveyFn(
      'surveySubmit',
      function () { return true; },
      '[lead] survey post failed'
    );
  }

  /* ------------------------------ init -------------------------------- */

  function init() {
    toArray(document.querySelectorAll('.ic-form, .close-form')).forEach(bind);
    hookSurvey();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
