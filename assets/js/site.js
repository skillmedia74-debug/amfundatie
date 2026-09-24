// Fundația Umanitară „Adam-Mădălin” – galerie (lightbox) și protecție de bază a imaginilor
(function () {
  var lb = document.createElement('div'); lb.className = 'lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-label', 'Fotografie');
  lb.innerHTML = '<button class="lb-x" type="button" aria-label="Închide">×</button><button class="lb-p" type="button" aria-label="Anterioara">‹</button><img alt="" draggable="false"><button class="lb-n" type="button" aria-label="Următoarea">›</button>';
  document.body.appendChild(lb);
  var img = lb.querySelector('img'), list = [], idx = 0;
  function show(i) { idx = (i + list.length) % list.length; img.src = list[idx]; lb.classList.add('on'); document.body.style.overflow = 'hidden'; }
  function hide() { lb.classList.remove('on'); img.removeAttribute('src'); document.body.style.overflow = ''; }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a.ph'); if (!a) return; e.preventDefault();
    var gal = a.closest('.gal') || document; var all = [].slice.call(gal.querySelectorAll('a.ph'));
    list = all.map(function (x) { return x.getAttribute('data-src'); }); show(all.indexOf(a));
  });
  lb.addEventListener('click', function (e) {
    if (e.target.classList.contains('lb-n')) show(idx + 1);
    else if (e.target.classList.contains('lb-p')) show(idx - 1);
    else if (e.target === lb || e.target.classList.contains('lb-x')) hide();
  });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('on')) return;
    if (e.key === 'Escape') hide(); else if (e.key === 'ArrowRight') show(idx + 1); else if (e.key === 'ArrowLeft') show(idx - 1);
  });
  // fără click dreapta / tragere pe imagini
  document.addEventListener('contextmenu', function (e) { if (e.target.closest('img, .gal, .lb, .card .img, .hero .art')) e.preventDefault(); });
  document.addEventListener('dragstart', function (e) { if (e.target.tagName === 'IMG') e.preventDefault(); });
})();
