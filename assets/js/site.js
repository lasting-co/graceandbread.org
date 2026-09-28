(function () {
  var root = document.documentElement;

  // ---------------------------------------------------------- header height
  // The header sits over the top of each page; pages pad themselves by its height.
  var header = document.querySelector(".site-header");
  function setHeaderHeight() { if (header) root.style.setProperty("--header-h", header.offsetHeight + "px"); }
  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);
  window.addEventListener("load", setHeaderHeight);

  // ------------------------------------------------------------ mobile menu
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("mobile-menu");
  if (toggle && menu) {
    var closeBtn = menu.querySelector(".menu-close");
    var open = function () { menu.hidden = false; toggle.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden"; closeBtn.focus(); };
    var close = function () { menu.hidden = true; toggle.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; toggle.focus(); };
    toggle.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) close(); });
  }

  // ------------------------------------------------------------ footer year
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // ------------------------------------ About: gradient follows the cursor
  var grad = document.querySelector("[data-follow-gradient]");
  var still = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (grad && !still) {
    grad.addEventListener("pointermove", function (e) {
      var r = grad.getBoundingClientRect();
      grad.style.setProperty("--gx", ((e.clientX - r.left) / r.width) * 100 + "%");
      grad.style.setProperty("--gy", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  }

  function busy(btn, on, label) {
    btn.disabled = on;
    btn.textContent = on ? "Submitting…" : label;
  }
  function plain(s) { return String(s || "").replace(/<[^>]*>/g, "").replace(/^\d+\s*-\s*/, "").trim(); }

  // ------------------------------------ Get Involved form → info@showgrace.org
  // Posts to FormSubmit, which emails the submission. Without JavaScript the
  // browser posts normally and lands on /thank-you/.
  document.querySelectorAll("form[data-formsubmit]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      if (!window.fetch) return;
      e.preventDefault();
      var btn = form.querySelector("button[type=submit]"), label = btn.textContent;
      var status = form.querySelector(".form__status"), done = form.parentNode.querySelector(".form__done");
      busy(btn, true); status.textContent = ""; status.removeAttribute("data-state");
      var data = {}; new FormData(form).forEach(function (v, k) { data[k] = v; });
      fetch(form.action.replace("formsubmit.co/", "formsubmit.co/ajax/"), {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data)
      })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
        .then(function (res) {
          if (!res.ok || String(res.body.success) !== "true") throw new Error("failed");
          form.hidden = true; done.hidden = false; done.focus();
        })
        .catch(function () {
          busy(btn, false, label);
          status.setAttribute("data-state", "error");
          status.textContent = "That didn’t go through. Try again, or email info@showgrace.org.";
        });
    });
  });

  // ------------------------------------------ Newsletter → Mailchimp audience
  // Uses Mailchimp's JSONP endpoint so people stay on the page. If that fails,
  // the form posts to Mailchimp's own signup page instead.
  document.querySelectorAll("form[data-mailchimp]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector("button[type=submit]"), label = btn.textContent;
      var status = form.querySelector(".form__status"), done = form.parentNode.querySelector(".form__done");
      busy(btn, true); status.textContent = ""; status.removeAttribute("data-state");

      var cb = "gbMailchimp" + Date.now();
      var params = new URLSearchParams(new FormData(form)); params.set("c", cb);
      var script = document.createElement("script");
      var timer = setTimeout(function () { finish(null); }, 10000);
      function finish(data) {
        clearTimeout(timer); delete window[cb]; script.remove();
        if (!data) { busy(btn, false, label); form.submit(); return; }   // fall back to Mailchimp's page
        if (data.result === "success") {
          form.hidden = true; done.hidden = false;
          done.querySelector("small").textContent = plain(data.msg);
          done.focus();
        } else {
          busy(btn, false, label);
          status.setAttribute("data-state", "error");
          status.textContent = plain(data.msg) || "That didn’t go through. Please try again.";
        }
      }
      window[cb] = finish;
      script.onerror = function () { finish(null); };
      script.src = form.action.replace("/subscribe/post?", "/subscribe/post-json?") + "&" + params.toString();
      document.body.appendChild(script);
    });
  });
})();
