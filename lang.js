// Shows one language: ?lang=hr in the URL, then the last choice, then the browser language, then English.
(function () {
  var langs = ["en", "hr", "de"];
  var param = new URLSearchParams(location.search).get("lang");
  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  var browser = (navigator.language || "en").slice(0, 2).toLowerCase();
  if (browser === "sr" || browser === "bs") browser = "hr";
  var lang = [param, saved, browser].filter(function (l) { return langs.indexOf(l) >= 0; })[0] || "en";

  function show(l) {
    document.documentElement.lang = l;
    document.querySelectorAll("main section").forEach(function (s) { s.hidden = s.lang !== l; });
    document.querySelectorAll(".langs button").forEach(function (b) { b.classList.toggle("active", b.dataset.lang === l); });
    // keep the language when moving between the two pages
    document.querySelectorAll("section a[href$='.html']").forEach(function (a) { a.href = a.getAttribute("href").split("?")[0] + "?lang=" + l; });
  }
  document.querySelectorAll(".langs button").forEach(function (b) {
    b.addEventListener("click", function () {
      try { localStorage.setItem("lang", b.dataset.lang); } catch (e) {}
      show(b.dataset.lang);
    });
  });
  show(lang);
})();
