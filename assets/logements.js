/* ══════════════════════════════════════════════
   LOGEMENTS — cartes, fiche détaillée, demande de réservation
   (les données sont dans logements-data.js)
══════════════════════════════════════════════ */
(function(){
  'use strict';
  if(typeof LOGEMENTS === 'undefined') return;

  var FORM_ACTION = 'https://formspree.io/f/xbdzolzv';
  var TEL = '06 98 20 33 40', TEL_LINK = 'tel:+33698203340';

  var I = {
    pin:'<svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    star:'<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    prev:'<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>',
    next:'<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>',
    close:'<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    check:'<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
    users:'<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    bed:'<svg viewBox="0 0 24 24"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/></svg>',
    area:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>'
  };

  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function img(p, sizes, eager){
    return '<img src="images/'+p.f+'-800.webp" srcset="images/'+p.f+'-800.webp 800w, images/'+p.f+'.webp 1600w" sizes="'+sizes+'" alt="'+esc(p.alt)+'" loading="'+(eager?'eager':'lazy')+'" decoding="async" width="800" height="600">';
  }
  function plural(n, s){ return n + ' ' + s + (n > 1 ? 's' : ''); }
  function facts(l){
    var f = [];
    if(l.surface) f.push('<span>'+I.area+l.surface+' m²</span>');
    if(l.voyageurs) f.push('<span>'+I.users+plural(l.voyageurs,'voyageur')+'</span>');
    if(l.chambres) f.push('<span>'+I.bed+plural(l.chambres,'chambre')+'</span>');
    if(l.lits) f.push('<span>'+I.bed+plural(l.lits,'lit')+'</span>');
    return f.join('');
  }
  function find(id){ for(var i=0;i<LOGEMENTS.length;i++) if(LOGEMENTS[i].id === id) return LOGEMENTS[i]; return null; }

  // ── CARROUSEL ──
  // max : nombre de photos affichées (les cartes en montrent 8, la fiche toutes)
  function carouselHTML(l, sizes, eagerFirst, max){
    var photos = max ? l.photos.slice(0, max) : l.photos;
    var slides = photos.map(function(p, i){
      return '<div class="car-slide" data-i="'+i+'">'+img(p, sizes, eagerFirst && i === 0)+'</div>';
    }).join('');
    // au-delà de 8 photos, un compteur « 1 / 22 » remplace les points
    var indic = photos.length > 8
      ? '<span class="car-count" aria-hidden="true">1 / '+photos.length+'</span>'
      : '<div class="car-dots" aria-hidden="true">'+photos.map(function(_, i){ return '<span class="car-dot'+(i===0?' actif':'')+'"></span>'; }).join('')+'</div>';
    return '<div class="carousel" data-id="'+l.id+'">'
      + '<div class="car-track" tabindex="0" aria-label="Photos — '+esc(l.nom)+'">'+slides+'</div>'
      + '<button type="button" class="car-btn car-prev" aria-label="Photo précédente">'+I.prev+'</button>'
      + '<button type="button" class="car-btn car-next" aria-label="Photo suivante">'+I.next+'</button>'
      + indic
      + '</div>';
  }
  function initCarousel(car, onSlideClick){
    var track = car.querySelector('.car-track');
    var dots = car.querySelectorAll('.car-dot');
    var count = car.querySelector('.car-count');
    var n = track.children.length, ticking = false;
    function idx(){ return Math.round(track.scrollLeft / Math.max(1, track.clientWidth)); }
    function go(i){ i = (i + n) % n; track.scrollTo({left: i * track.clientWidth, behavior: 'smooth'}); }
    car.querySelector('.car-prev').addEventListener('click', function(e){ e.stopPropagation(); go(idx() - 1); });
    car.querySelector('.car-next').addEventListener('click', function(e){ e.stopPropagation(); go(idx() + 1); });
    track.addEventListener('keydown', function(e){
      if(e.key === 'ArrowRight'){ e.preventDefault(); go(idx() + 1); }
      if(e.key === 'ArrowLeft'){ e.preventDefault(); go(idx() - 1); }
    });
    track.addEventListener('scroll', function(){
      if(ticking) return; ticking = true;
      requestAnimationFrame(function(){
        var k = idx();
        for(var d=0; d<dots.length; d++) dots[d].classList.toggle('actif', d === k);
        if(count) count.textContent = (k + 1) + ' / ' + n;
        ticking = false;
      });
    }, {passive:true});
    if(onSlideClick){
      track.addEventListener('click', function(e){
        var s = e.target.closest('.car-slide'); if(s) onSlideClick(parseInt(s.getAttribute('data-i'), 10));
      });
    }
  }

  // ── CARTES ──
  function cardHTML(l, mode, k){
    var badge = l.note ? '<span class="log-badge">'+I.star+esc(l.note)+(l.avis ? ' · '+l.avis+' avis' : '')+'</span>' : '';
    var actions = mode === 'teaser'
      ? '<a class="btn-sm ghost" href="logements.html#'+l.id+'">Découvrir</a>'
      : '<button type="button" class="btn-sm ghost js-open" data-id="'+l.id+'">Voir le logement</button>'
        + '<button type="button" class="btn-sm primary js-resa" data-id="'+l.id+'">Réserver</button>';
    return '<article class="log-card rev d'+((k%3)+1)+'" id="card-'+l.id+'">'
      + '<div style="position:relative">'+carouselHTML(l, '(max-width:640px) 100vw, 440px', k === 0, 8)
      + badge + '<span class="log-type">'+esc(l.type)+'</span></div>'
      + '<div class="log-body">'
      +   '<div class="log-head"><h3 class="log-nom">'+esc(l.nom)+'</h3></div>'
      +   '<div class="log-loc">'+I.pin+'<strong>'+esc(l.ville)+'</strong>&nbsp;· '+esc(l.quartier)+'</div>'
      +   (l.accroche ? '<div class="log-accroche">'+esc(l.accroche)+'</div>' : '')
      +   '<div class="log-facts">'+facts(l)+'</div>'
      +   '<div class="log-equip">'+l.equipements.slice(0,5).map(function(e){ return '<span>'+esc(e)+'</span>'; }).join('')+'</div>'
      +   '<div class="log-foot">'
      +     '<div class="log-price"><small>À partir de</small><strong>'+l.prix+' €</strong><span> / nuit</span></div>'
      +     '<div class="log-actions">'+actions+'</div>'
      +   '</div>'
      + '</div></article>';
  }

  function renderGrid(container, mode){
    container.innerHTML = LOGEMENTS.map(function(l, k){ return cardHTML(l, mode, k); }).join('');
    container.querySelectorAll('.carousel').forEach(function(car){
      var id = car.getAttribute('data-id');
      initCarousel(car, mode === 'teaser'
        ? function(){ location.href = 'logements.html#' + id; }
        : function(){ openFiche(id); });
    });
    container.querySelectorAll('.js-open').forEach(function(b){ b.addEventListener('click', function(){ openFiche(b.getAttribute('data-id')); }); });
    container.querySelectorAll('.js-resa').forEach(function(b){ b.addEventListener('click', function(){ openFiche(b.getAttribute('data-id'), true); }); });
    if(window.LGI_observeReveal) window.LGI_observeReveal(container);
  }

  // ── EN-TÊTE PAGE LOGEMENTS : chiffres calculés ──
  function renderStats(){
    var el = document.getElementById('pl-stats'); if(!el) return;
    // moyenne pondérée par le nombre d'avis (comme Airbnb)
    var notes = LOGEMENTS.filter(function(l){ return l.note && l.avis; });
    var avis = notes.reduce(function(s, l){ return s + l.avis; }, 0);
    var html = '<span class="pl-stat">'+I.area+'<strong>'+LOGEMENTS.length+'</strong> '+(LOGEMENTS.length > 1 ? 'logements' : 'logement')+'</span>';
    // affichée seulement si TOUS les logements ont une note (sinon la moyenne serait trompeuse)
    if(avis && notes.length === LOGEMENTS.length){
      var moy = notes.reduce(function(s, l){ return s + parseFloat(String(l.note).replace(',', '.')) * l.avis; }, 0) / avis;
      html += '<span class="pl-stat">'+I.star.replace('<svg','<svg style="fill:#FF385C;stroke:none"')+'<strong>'+moy.toFixed(1).replace('.', ',')+'</strong> de moyenne · '+avis+' avis</span>';
    }
    var villes = LOGEMENTS.map(function(l){ return l.ville; }).filter(function(v, i, a){ return a.indexOf(v) === i; });
    html += '<span class="pl-stat">'+I.pin+esc(villes.join(' · '))+'</span>';
    el.innerHTML = html;
  }

  // ── FICHE LOGEMENT ──
  var fiche = document.getElementById('fiche');
  var lastFocus = null, current = null;

  function todayISO(offset){ var d = new Date(); d.setDate(d.getDate() + (offset||0)); return d.toISOString().slice(0,10); }

  function resaHTML(l){
    if(l.widget){
      return '<div class="resa" id="resa"><div class="resa-price"><strong>'+l.prix+' €</strong><span>/ nuit, à partir de</span></div>'
        + '<div class="resa-widget"><iframe src="'+esc(l.widget)+'" title="Réservation — '+esc(l.nom)+'" loading="lazy"></iframe></div></div>';
    }
    var opts = ''; var max = l.voyageurs || 6;
    for(var v=1; v<=max; v++) opts += '<option value="'+v+'"'+(v===2?' selected':'')+'>'+plural(v,'voyageur')+'</option>';
    return '<div class="resa" id="resa">'
      + '<div class="resa-price"><strong>'+l.prix+' €</strong><span>/ nuit, à partir de</span></div>'
      + '<p class="resa-sub">Réservez en direct : nous confirmons la disponibilité et le tarif sous 24 h.</p>'
      + '<form id="resaForm" action="'+FORM_ACTION+'" method="POST" data-ok="Demande envoyée ! Réponse sous 24 h.">'
      +   '<input type="hidden" name="_subject" value="Demande de réservation — '+esc(l.nom)+'">'
      +   '<input type="hidden" name="type_demande" value="Réservation voyageur">'
      +   '<input type="hidden" name="logement" value="'+esc(l.nom)+'">'
      +   '<input type="hidden" name="estimation" id="resaEstimField" value="">'
      +   '<input type="text" name="_gotcha" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">'
      +   '<div class="resa-dates">'
      +     '<div class="fg2"><label for="rArr">Arrivée</label><input id="rArr" type="date" name="arrivee" min="'+todayISO()+'" required></div>'
      +     '<div class="fg2"><label for="rDep">Départ</label><input id="rDep" type="date" name="depart" min="'+todayISO(1)+'" required></div>'
      +   '</div>'
      +   '<p class="resa-err" id="resaErr">La date de départ doit être après la date d’arrivée.</p>'
      +   '<div class="fg2"><label for="rVoy">Voyageurs</label><select id="rVoy" name="voyageurs">'+opts+'</select></div>'
      +   '<div class="resa-estim" id="resaEstim"></div>'
      +   '<div class="resa-dates">'
      +     '<div class="fg2"><label for="rPre">Prénom</label><input id="rPre" type="text" name="prenom" autocomplete="given-name" required></div>'
      +     '<div class="fg2"><label for="rNom">Nom</label><input id="rNom" type="text" name="nom" autocomplete="family-name" required></div>'
      +   '</div>'
      +   '<div class="fg2"><label for="rMail">Email</label><input id="rMail" type="email" name="email" autocomplete="email" required></div>'
      +   '<div class="fg2"><label for="rTel">Téléphone</label><input id="rTel" type="tel" name="telephone" autocomplete="tel" required></div>'
      +   '<div class="fg2"><label for="rMsg">Message (optionnel)</label><textarea id="rMsg" name="message" placeholder="Motif du séjour, heure d’arrivée, questions…"></textarea></div>'
      +   '<button class="sub-btn" type="submit">Demander à réserver</button>'
      +   '<p class="form-note">Aucun paiement à cette étape. Vos données servent uniquement à traiter votre demande — <a href="confidentialite.html">confidentialité</a>.</p>'
      + '</form>'
      + '<ul class="resa-trust">'
      +   '<li>'+I.check+'Réponse sous 24 h</li>'
      +   '<li>'+I.check+'Sans frais de service de plateforme</li>'
      +   '<li>'+I.check+'Une question ? <a href="'+TEL_LINK+'" style="color:var(--bleu-clair);font-weight:600">'+TEL+'</a></li>'
      + '</ul>'
      + (l.airbnb ? '<div class="resa-alt">Vous préférez Airbnb ? <a href="'+esc(l.airbnb)+'" target="_blank" rel="noopener">Voir l’annonce</a></div>' : '')
      + '</div>';
  }

  function galleryHTML(l){
    var p = l.photos, html = '';
    for(var i=0; i<Math.min(5, p.length); i++){
      var more = (i === 4 && p.length > 5) ? '<span class="gal-more">+'+(p.length-5)+' photos</span>' : '';
      html += '<button type="button" data-i="'+i+'" aria-label="Agrandir : '+esc(p[i].alt)+'">'+img(p[i], i===0 ? '(max-width:1100px) 60vw, 700px' : '300px', i===0)+more+'</button>';
    }
    // grille 1 grande + 4 petites ; si moins de 5 photos, on adapte
    var cols = p.length >= 5 ? '' : (p.length >= 3 ? ' style="grid-template-columns:2fr 1fr"' : ' style="grid-template-columns:1fr;grid-template-rows:1fr"');
    return '<div class="gal"'+cols+'>'+html+'</div>';
  }

  function mapHTML(l){
    if(!l.gps) return '';
    var la = l.gps[0], lo = l.gps[1], d = 0.009;
    var bbox = (lo-d*1.6)+','+(la-d)+','+(lo+d*1.6)+','+(la+d);
    return '<h3>Où se situe le logement</h3>'
      + '<div class="fiche-map"><iframe loading="lazy" title="Carte du quartier" src="https://www.openstreetmap.org/export/embed.html?bbox='+bbox+'&layer=mapnik"></iframe></div>'
      + '<p class="fiche-map-note">Emplacement approximatif — l’adresse exacte vous est communiquée à la réservation.</p>';
  }

  function ficheHTML(l){
    var keys = (l.surface ? '<div class="fkey"><strong>'+l.surface+' m²</strong><span>Surface</span></div>' : '')
      + '<div class="fkey"><strong>'+esc(l.type)+'</strong><span>Type</span></div>'
      + (l.voyageurs ? '<div class="fkey"><strong>'+l.voyageurs+'</strong><span>Voyageurs max</span></div>' : '')
      + (l.chambres ? '<div class="fkey"><strong>'+l.chambres+'</strong><span>'+(l.chambres>1?'Chambres':'Chambre')+'</span></div>' : '')
      + (l.lits ? '<div class="fkey"><strong>'+l.lits+'</strong><span>'+(l.lits>1?'Lits':'Lit double')+'</span></div>' : '')
      + (l.note ? '<div class="fkey"><strong>'+esc(l.note)+' ★</strong><span>'+(l.avis||0)+' avis</span></div>' : '');
    return '<div class="fiche-backdrop" data-close></div>'
      + '<div class="fiche-box" role="dialog" aria-modal="true" aria-labelledby="ficheTitle">'
      +   '<div class="fiche-top"><span class="fiche-top-title">'+esc(l.nom)+'</span><button type="button" class="fiche-close" data-close aria-label="Fermer">'+I.close+'</button></div>'
      +   '<div class="fiche-scroll">'
      +     galleryHTML(l)
      +     '<div class="gal-mobile">'+carouselHTML(l, '100vw', true)+'</div>'
      +     '<div class="fiche-grid">'
      +       '<div>'
      +         '<h2 class="fiche-h1" id="ficheTitle">'+esc(l.nom)+'</h2>'
      +         '<div class="fiche-meta"><span>'+I.pin+esc(l.quartier)+', '+esc(l.ville)+'</span>'+(l.accroche ? '<span>'+esc(l.accroche)+'</span>' : '')+(l.horaires ? '<span>'+esc(l.horaires)+'</span>' : '')+'</div>'
      +         '<div class="fiche-keys">'+keys+'</div>'
      +         '<div class="fiche-desc">'+l.description.map(function(t){ return '<p>'+esc(t)+'</p>'; }).join('')+'</div>'
      +         '<h3>Ce que propose ce logement</h3>'
      +         '<ul class="fiche-equip">'+l.equipements.map(function(e){ return '<li>'+I.check+esc(e)+'</li>'; }).join('')+'</ul>'
      +         '<h3>Les + de la réservation en direct</h3>'
      +         '<ul class="fiche-equip"><li>'+I.check+'Réservation en direct, sans frais de plateforme</li><li>'+I.check+'Arrivée autonome (boîte à clé sécurisée)</li><li>'+I.check+'Linge de lit fourni</li><li>'+I.check+'Hôte réactif, réponse sous 24 h</li></ul>'
      +         mapHTML(l)
      +       '</div>'
      +       '<aside>'+resaHTML(l)+'</aside>'
      +     '</div>'
      +   '</div>'
      +   '<div class="fiche-bar"><div class="log-price"><small>À partir de</small><strong>'+l.prix+' €</strong><span> / nuit</span></div><button type="button" class="btn-sm primary js-goresa">Demander à réserver</button></div>'
      + '</div>';
  }

  function scrollToResa(){
    var r = fiche.querySelector('#resa'), sc = fiche.querySelector('.fiche-scroll');
    if(r && sc) sc.scrollTo({top: r.getBoundingClientRect().top - sc.getBoundingClientRect().top + sc.scrollTop - 12, behavior:'smooth'});
    var first = fiche.querySelector('#rArr'); if(first) setTimeout(function(){ first.focus({preventScroll:true}); }, 450);
  }

  function setupResaForm(l){
    var form = fiche.querySelector('#resaForm'); if(!form) return;
    var arr = form.querySelector('#rArr'), dep = form.querySelector('#rDep');
    var err = fiche.querySelector('#resaErr'), est = fiche.querySelector('#resaEstim'), estField = fiche.querySelector('#resaEstimField');
    function nights(){
      if(!arr.value || !dep.value) return null;
      return Math.round((new Date(dep.value) - new Date(arr.value)) / 864e5);
    }
    function update(){
      if(arr.value){
        var m = new Date(arr.value); m.setDate(m.getDate() + 1);
        dep.min = m.toISOString().slice(0,10);
      }
      var n = nights();
      err.classList.toggle('show', n !== null && n <= 0);
      if(n && n > 0){
        var total = n * l.prix;
        est.innerHTML = '<div class="row"><span>'+l.prix+' € × '+plural(n,'nuit')+'</span><span>'+total+' €</span></div>'
          + '<div class="row"><span>Estimation</span><span>à partir de '+total+' €</span></div>'
          + '<small>Tarif indicatif. Le prix exact (selon la saison, le ménage et la taxe de séjour) vous est confirmé avec la disponibilité.</small>';
        est.classList.add('show');
        estField.value = plural(n,'nuit') + ' — à partir de ' + total + ' €';
      } else { est.classList.remove('show'); estField.value = ''; }
    }
    arr.addEventListener('change', update); dep.addEventListener('change', update);
    window.LGI_ajaxForm(form, {
      validate: function(){ var n = nights(); if(n === null || n <= 0){ err.classList.add('show'); dep.focus(); return false; } return true; },
      onSuccess: function(){ est.classList.remove('show'); }
    });
  }

  function openFiche(id, toResa, fromHistory){
    var l = find(id); if(!l || !fiche) return;
    current = id;
    lastFocus = document.activeElement;
    fiche.innerHTML = ficheHTML(l);
    fiche.classList.add('open');
    document.body.classList.add('no-scroll');
    fiche.querySelectorAll('[data-close]').forEach(function(b){ b.addEventListener('click', function(){ closeFiche(); }); });
    fiche.querySelectorAll('.gal button').forEach(function(b){ b.addEventListener('click', function(){ openLightbox(l, parseInt(b.getAttribute('data-i'),10)); }); });
    var mc = fiche.querySelector('.gal-mobile .carousel'); if(mc) initCarousel(mc, function(i){ openLightbox(l, i); });
    var gr = fiche.querySelector('.js-goresa'); if(gr) gr.addEventListener('click', scrollToResa);
    setupResaForm(l);
    if(!fromHistory && location.hash !== '#' + id) history.pushState({fiche:id}, '', '#' + id);
    document.title = l.nom + ' — Livet Gestion Immo';
    fiche.querySelector('.fiche-close').focus({preventScroll:true});
    if(toResa) setTimeout(scrollToResa, 120);
  }
  function closeFiche(fromHistory){
    if(!fiche || !fiche.classList.contains('open')) return;
    fiche.classList.remove('open');
    fiche.innerHTML = '';
    document.body.classList.remove('no-scroll');
    document.title = DEFAULT_TITLE;
    current = null;
    if(!fromHistory && location.hash) history.pushState({}, '', location.pathname + location.search);
    if(lastFocus && lastFocus.focus) lastFocus.focus({preventScroll:true});
  }
  var DEFAULT_TITLE = document.title;

  // ── VISIONNEUSE ──
  var lb = document.getElementById('lightbox'), lbIdx = 0, lbLog = null;
  function lbShow(){
    var p = lbLog.photos[lbIdx];
    lb.querySelector('img').src = 'images/' + p.f + '.webp';
    lb.querySelector('img').alt = p.alt;
    lb.querySelector('.lb-cap').textContent = p.alt + ' — ' + (lbIdx+1) + ' / ' + lbLog.photos.length;
  }
  function openLightbox(l, i){ if(!lb) return; lbLog = l; lbIdx = i || 0; lbShow(); lb.classList.add('open'); lb.querySelector('.lb-close').focus(); }
  function closeLightbox(){ if(lb) lb.classList.remove('open'); }
  function lbMove(d){ lbIdx = (lbIdx + d + lbLog.photos.length) % lbLog.photos.length; lbShow(); }
  if(lb){
    lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
    lb.querySelector('.lb-prev').addEventListener('click', function(){ lbMove(-1); });
    lb.querySelector('.lb-next').addEventListener('click', function(){ lbMove(1); });
    lb.addEventListener('click', function(e){ if(e.target === lb) closeLightbox(); });
    var tx = null;
    lb.addEventListener('touchstart', function(e){ tx = e.touches[0].clientX; }, {passive:true});
    lb.addEventListener('touchend', function(e){ if(tx === null) return; var dx = e.changedTouches[0].clientX - tx; if(Math.abs(dx) > 40) lbMove(dx < 0 ? 1 : -1); tx = null; });
  }

  document.addEventListener('keydown', function(e){
    if(lb && lb.classList.contains('open')){
      if(e.key === 'Escape') closeLightbox();
      if(e.key === 'ArrowRight') lbMove(1);
      if(e.key === 'ArrowLeft') lbMove(-1);
      return;
    }
    if(e.key === 'Escape') closeFiche();
  });

  // ── LIENS DIRECTS (logements.html#id) + bouton retour du navigateur ──
  function syncHash(){
    var id = location.hash.slice(1);
    if(id && find(id)){ if(current !== id) openFiche(id, false, true); }
    else closeFiche(true);
  }
  window.addEventListener('popstate', syncHash);

  // ── DÉMARRAGE ──
  var grid = document.getElementById('log-grid');
  if(grid){ renderGrid(grid, 'full'); renderStats(); syncHash(); }
  var teaser = document.getElementById('teaser-grid');
  if(teaser) renderGrid(teaser, 'teaser');
})();
