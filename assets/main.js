/* ══════════════════════════════════════════════
   LIVET GESTION IMMO — script commun
══════════════════════════════════════════════ */
(function(){
  'use strict';
  document.documentElement.classList.remove('no-js');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── MENU MOBILE ──
  var nav = document.querySelector('.site-nav');
  var toggle = document.querySelector('.nav-toggle');
  function closeMenu(){
    if(!nav) return;
    nav.classList.remove('nav-open');
    document.body.classList.remove('no-scroll');
    if(toggle) toggle.setAttribute('aria-expanded','false');
  }
  if(nav && toggle){
    toggle.addEventListener('click', function(){
      var open = !nav.classList.contains('nav-open');
      nav.classList.toggle('nav-open', open);
      document.body.classList.toggle('no-scroll', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav-links a').forEach(function(a){ a.addEventListener('click', closeMenu); });
    window.addEventListener('resize', function(){ if(window.innerWidth > 1100) closeMenu(); });
  }
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeMenu(); });

  // ── LIENS « ACCUEIL » : si on est déjà sur l'accueil, on remonte en douceur au lieu de recharger ──
  var onHome = /\/(index\.html)?$/.test(location.pathname);
  document.querySelectorAll('a[href="./"], a[href="/"]').forEach(function(a){
    a.addEventListener('click', function(e){
      if(!onHome) return;
      e.preventDefault();
      closeMenu();
      window.scrollTo({top:0, behavior: reduceMotion ? 'auto' : 'smooth'});
      if(location.hash) history.replaceState(null, '', location.pathname);
    });
  });

  // ── BOUTON « HAUT DE PAGE » ──
  var toTop = document.querySelector('.to-top');
  if(toTop){
    toTop.addEventListener('click', function(){ window.scrollTo({top:0, behavior: reduceMotion ? 'auto' : 'smooth'}); });
    window.addEventListener('scroll', function(){ toTop.classList.toggle('show', window.scrollY > 700); }, {passive:true});
  }

  // ── CURSEUR PERSONNALISÉ (souris uniquement) ──
  var cur = document.getElementById('cur'), ring = document.getElementById('curRing');
  if(cur && ring && window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reduceMotion){
    var mx=-50,my=-50,rx=-50,ry=-50;
    document.addEventListener('mousemove', function(e){ mx=e.clientX; my=e.clientY; cur.style.left=mx+'px'; cur.style.top=my+'px'; });
    (function loop(){ rx+=(mx-rx)*.12; ry+=(my-ry)*.12; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(loop); })();
    document.addEventListener('mouseover', function(e){
      var hot = e.target.closest && e.target.closest('a,button,.av-card,.nc,.proc-dot,.log-card');
      cur.style.transform = hot ? 'translate(-50%,-50%) scale(2.8)' : 'translate(-50%,-50%) scale(1)';
      ring.style.transform = hot ? 'translate(-50%,-50%) scale(1.6)' : 'translate(-50%,-50%) scale(1)';
    });
  }

  // ── PARTICULES DU HERO ──
  var pc = document.getElementById('pc');
  if(pc && !reduceMotion){
    var cols=['rgba(122,182,72,','rgba(184,217,240,','rgba(46,111,173,'];
    var n = window.innerWidth < 700 ? 15 : 35;
    for(var i=0;i<n;i++){
      var p=document.createElement('div'); p.className='particle';
      var s=Math.random()*6+2, col=cols[Math.floor(Math.random()*3)];
      p.style.cssText='width:'+s+'px;height:'+s+'px;left:'+Math.random()*100+'%;background:'+col+(Math.random()*.5+.3)+');animation-duration:'+(Math.random()*14+8)+'s;animation-delay:'+(Math.random()*10)+'s;';
      pc.appendChild(p);
    }
  }

  // ── VIDÉO DU HERO : pause si « réduire les animations » ──
  var vid = document.getElementById('heroVideo');
  if(vid && reduceMotion){ vid.removeAttribute('autoplay'); vid.pause(); }

  // ── APPARITION AU DÉFILEMENT ──
  window.LGI_observeReveal = function(root){
    var els = (root || document).querySelectorAll('.rev:not(.on),.rev-l:not(.on),.rev-r:not(.on)');
    if(!('IntersectionObserver' in window)){ els.forEach(function(el){ el.classList.add('on'); }); return; }
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('on'); obs.unobserve(e.target); } });
    }, {threshold:.08});
    els.forEach(function(el){ obs.observe(el); });
  };
  window.LGI_observeReveal();

  // ── COMPTEURS ──
  function runCount(el){
    var target=parseInt(el.getAttribute('data-t'),10), c=0, step=Math.max(1,Math.floor(target/55));
    if(reduceMotion){ el.textContent=target; return; }
    var iv=setInterval(function(){ c=Math.min(c+step,target); el.textContent=c; if(c>=target) clearInterval(iv); },25);
  }
  var sb = document.querySelector('.stats-band');
  if(sb && 'IntersectionObserver' in window){
    var so = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.querySelectorAll('.count').forEach(runCount); so.unobserve(e.target); } });
    }, {threshold:.3});
    so.observe(sb);
  }

  // ── FAQ (accordéon accessible) ──
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      var open = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-q[aria-expanded="true"]').forEach(function(b){
        b.setAttribute('aria-expanded','false'); b.nextElementSibling.hidden = true;
      });
      if(!open){ btn.setAttribute('aria-expanded','true'); btn.nextElementSibling.hidden = false; }
    });
  });

  // ── ENVOI DES FORMULAIRES (Formspree, sans recharger la page) ──
  window.LGI_ajaxForm = function(form, opts){
    opts = opts || {};
    var btn = form.querySelector('[type="submit"]');
    var label = btn ? btn.innerHTML : '';
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(opts.validate && !opts.validate()) return;
      if(btn){ btn.disabled = true; btn.classList.remove('ok','err'); btn.textContent = 'Envoi en cours…'; }
      fetch(form.action, {method:'POST', body:new FormData(form), headers:{'Accept':'application/json'}})
        .then(function(r){
          if(!r.ok) throw new Error('http');
          if(btn){ btn.classList.add('ok'); btn.textContent = form.getAttribute('data-ok') || 'Message envoyé !'; }
          form.reset();
          if(opts.onSuccess) opts.onSuccess();
        })
        .catch(function(){
          if(btn){ btn.classList.add('err'); btn.disabled = false; btn.textContent = 'Erreur — réessayez ou appelez-nous'; }
          setTimeout(function(){ if(btn){ btn.classList.remove('err'); btn.innerHTML = label; } }, 5000);
        });
    });
  };
  var cf = document.getElementById('contactForm');
  if(cf) window.LGI_ajaxForm(cf);

  // ── BARRE DE PROGRESSION ──
  var bar = document.getElementById('scroll-bar');
  if(bar){
    window.addEventListener('scroll', function(){
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h * 100) : 0) + '%';
    }, {passive:true});
  }

  // ── ANNÉE DU PIED DE PAGE ──
  document.querySelectorAll('.js-year').forEach(function(el){ el.textContent = new Date().getFullYear(); });
})();
