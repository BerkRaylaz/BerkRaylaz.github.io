// Shared navigation, footer, language switch and scroll animations
(function () {
  var page = document.body.getAttribute('data-page');

  var nav =
    '<div class="wrap">' +
      '<a href="index.html" class="logo">Berk<span>.</span></a>' +
      '<div class="links">' +
        '<a href="index.html" class="hide-sm' + (page === 'home' ? ' active' : '') + '"><span data-tr>Hakkımda</span><span data-en>About</span></a>' +
        '<a href="experience.html"' + (page === 'experience' ? ' class="active"' : '') + '><span data-tr>Deneyim</span><span data-en>Experience</span></a>' +
        '<a href="projects.html"' + (page === 'projects' ? ' class="active"' : '') + '><span data-tr>Projeler</span><span data-en>Projects</span></a>' +
        '<a href="cv-tr.pdf" target="_blank" rel="noopener" data-tr>CV</a>' +
        '<a href="cv-en.pdf" target="_blank" rel="noopener" data-en>CV</a>' +
        '<div class="lang"><button id="btn-tr" type="button">TR</button><button id="btn-en" type="button">EN</button></div>' +
      '</div>' +
    '</div>';
  var navEl = document.createElement('nav');
  navEl.innerHTML = nav;
  document.body.insertBefore(navEl, document.body.firstChild);

  var footer = document.createElement('footer');
  footer.textContent = '© ' + new Date().getFullYear() + ' Berk Raylaz';
  document.body.appendChild(footer);

  function setLang(l) {
    document.documentElement.lang = l;
    document.getElementById('btn-tr').classList.toggle('on', l === 'tr');
    document.getElementById('btn-en').classList.toggle('on', l === 'en');
    try { localStorage.setItem('lang', l); } catch (e) {}
  }
  document.getElementById('btn-tr').onclick = function () { setLang('tr'); };
  document.getElementById('btn-en').onclick = function () { setLang('en'); };

  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  setLang(saved || ((navigator.language || 'tr').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en'));

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.rv').forEach(function (el) { el.classList.add('in'); });
  }
})();
