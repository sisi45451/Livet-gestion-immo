# Livet-gestion-immo
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Livet Gestion Immo — Sous-location Professionnelle</title>
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,600&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bleu:#1a4b7c;
  --bleu-clair:#2e6fad;
  --bleu-sky:#b8d9f0;
  --bleu-pale:#e8f4fb;
  --vert:#7ab648;
  --vert-clair:#9fd06a;
  --blanc:#ffffff;
  --gris:#f4f7fb;
  --texte:#0d2a45;
  --texte-soft:#5a7a99;
}
html{scroll-behavior:smooth;}
body{font-family:'Outfit',sans-serif;background:var(--blanc);color:var(--texte);overflow-x:hidden;}

/* CURSOR */
.cursor{position:fixed;width:12px;height:12px;background:var(--vert);border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width .3s,height .3s,transform .2s;mix-blend-mode:multiply;}
.cursor-ring{position:fixed;width:40px;height:40px;border:2px solid var(--bleu);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:width .3s,height .3s;}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:500;padding:0 5%;height:80px;display:flex;align-items:center;justify-content:space-between;transition:background .4s,box-shadow .4s,height .4s;}
nav.scrolled{background:rgba(255,255,255,.97);box-shadow:0 2px 40px rgba(26,75,124,.12);height:66px;}
.nav-logo svg{height:46px;transition:height .3s;}
nav.scrolled .nav-logo svg{height:38px;}
.nav-links{display:flex;gap:2.5rem;list-style:none;}
.nav-links a{color:rgba(255,255,255,.9);font-size:.82rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;position:relative;transition:color .3s;}
nav.scrolled .nav-links a{color:var(--texte);}
.nav-links a::after{content:'';position:absolute;bottom:-4px;left:0;right:0;height:2px;background:var(--vert);transform:scaleX(0);transition:transform .3s;}
.nav-links a:hover::after{transform:scaleX(1);}
.nav-cta{background:var(--vert) !important;color:var(--blanc) !important;padding:.65rem 1.5rem;font-weight:700;border-radius:3px;box-shadow:0 4px 15px rgba(122,182,72,.35);transition:background .3s,transform .2s,box-shadow .3s !important;}
.nav-cta:hover{background:var(--vert-clair) !important;transform:translateY(-2px);box-shadow:0 8px 25px rgba(122,182,72,.5) !important;}
.nav-cta::after{display:none !important;}

/* HERO */
#hero{min-height:100vh;background:#071520;position:relative;overflow:hidden;display:flex;align-items:center;padding:0 5%;}
#heroCanvas{position:absolute;inset:0;width:100%;height:100%;z-index:0;display:block;}
.hero-overlay{position:absolute;inset:0;background:linear-gradient(105deg,rgba(7,21,32,.88) 0%,rgba(7,21,32,.6) 45%,rgba(7,21,32,.28) 100%);z-index:1;pointer-events:none;}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(184,217,240,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(184,217,240,.03) 1px,transparent 1px);background-size:60px 60px;animation:gridSlide 20s linear infinite;z-index:2;}
@keyframes gridSlide{0%{background-position:0 0;}100%{background-position:60px 60px;}}
.particles{position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:3;}
.particle{position:absolute;border-radius:50%;animation:pFloat linear infinite;opacity:0;}
@keyframes pFloat{0%{transform:translateY(100vh) scale(0);opacity:0;}10%{opacity:.6;}90%{opacity:.3;}100%{transform:translateY(-10vh) scale(1);opacity:0;}}
.blob{position:absolute;border-radius:50%;filter:blur(80px);animation:bPulse 6s ease-in-out infinite;pointer-events:none;z-index:2;}
.b1{width:500px;height:500px;background:rgba(122,182,72,.07);top:-100px;right:5%;}
.b2{width:350px;height:350px;background:rgba(46,111,173,.12);bottom:-50px;right:20%;animation-delay:-3s;}
.b3{width:280px;height:280px;background:rgba(184,217,240,.05);top:30%;left:30%;animation-delay:-1.5s;}
@keyframes bPulse{0%,100%{transform:scale(1);}50%{transform:scale(1.18) rotate(8deg);}}
.hero-house-svg{position:absolute;right:7%;top:50%;transform:translateY(-50%);width:360px;height:360px;opacity:.04;animation:hFloat 8s ease-in-out infinite;z-index:3;}
@keyframes hFloat{0%,100%{transform:translateY(-50%);}50%{transform:translateY(calc(-50% - 20px));}}
.hero-content{position:relative;z-index:5;max-width:680px;}
.hero-badge{display:inline-flex;align-items:center;gap:.6rem;background:rgba(122,182,72,.15);border:1px solid rgba(122,182,72,.3);color:var(--vert-clair);padding:.5rem 1.2rem;border-radius:50px;font-size:.72rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;margin-bottom:2rem;animation:bPop .8s cubic-bezier(0.34,1.56,0.64,1) .3s both;}
.badge-dot{width:6px;height:6px;background:var(--vert);border-radius:50%;animation:blink 1.5s ease-in-out infinite;}
@keyframes blink{0%,100%{opacity:1;}50%{opacity:.15;}}
@keyframes bPop{from{opacity:0;transform:scale(.5) translateY(12px);}to{opacity:1;transform:scale(1) translateY(0);}}
.hero-title{font-family:'Playfair Display',serif;font-size:clamp(2.8rem,5.5vw,5.2rem);font-weight:700;color:var(--blanc);line-height:1.08;margin-bottom:1rem;animation:sUp .9s cubic-bezier(0.16,1,0.3,1) .5s both;}
.hero-title .accent{color:var(--vert-clair);}
.hero-title .italic{font-style:italic;color:var(--bleu-sky);}
@keyframes sUp{from{opacity:0;transform:translateY(50px);}to{opacity:1;transform:translateY(0);}}
.hero-sub{font-size:1.1rem;font-weight:300;color:rgba(184,217,240,.8);line-height:1.8;margin-bottom:3rem;max-width:540px;animation:sUp .9s cubic-bezier(0.16,1,0.3,1) .7s both;}
.hero-sub strong{color:rgba(255,255,255,.95);}
.hero-btns{display:flex;gap:1rem;flex-wrap:wrap;animation:sUp .9s cubic-bezier(0.16,1,0.3,1) .9s both;}
.btn-main{background:var(--vert);color:var(--blanc);padding:1.1rem 2.5rem;font-weight:700;font-size:.87rem;letter-spacing:.1em;text-transform:uppercase;text-decoration:none;border-radius:3px;border:none;cursor:pointer;box-shadow:0 6px 30px rgba(122,182,72,.4);transition:all .3s;display:inline-flex;align-items:center;gap:.7rem;position:relative;overflow:hidden;}
.btn-main::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);transform:translateX(-100%);transition:transform .5s;}
.btn-main:hover::before{transform:translateX(100%);}
.btn-main:hover{transform:translateY(-3px);box-shadow:0 14px 40px rgba(122,182,72,.55);}
.btn-outline{background:transparent;color:rgba(255,255,255,.8);padding:1.1rem 2.2rem;font-weight:500;font-size:.87rem;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;border:1px solid rgba(255,255,255,.25);border-radius:3px;transition:all .3s;display:inline-flex;align-items:center;gap:.6rem;}
.btn-outline:hover{border-color:var(--bleu-sky);color:var(--bleu-sky);transform:translateY(-3px);}
.scroll-ind{position:absolute;bottom:3rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:.7rem;cursor:pointer;animation:fadeIn 1s 1.5s both;z-index:5;}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
.scroll-line{width:1px;height:55px;background:linear-gradient(var(--vert),transparent);animation:sDown 1.5s ease-in-out infinite;}
@keyframes sDown{0%{transform:scaleY(0);transform-origin:top;}50%{transform:scaleY(1);transform-origin:top;}51%{transform-origin:bottom;}100%{transform:scaleY(0);transform-origin:bottom;}}
.scroll-txt{font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.35);}

/* STATS */
.stats-band{background:var(--bleu);display:grid;grid-template-columns:repeat(4,1fr);position:relative;overflow:hidden;}
.stats-band::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(122,182,72,.07),transparent 50%,rgba(122,182,72,.05));}
.stat-item{padding:2.5rem 2rem;text-align:center;border-right:1px solid rgba(255,255,255,.07);position:relative;z-index:1;transition:background .3s;}
.stat-item:last-child{border-right:none;}
.stat-item:hover{background:rgba(255,255,255,.04);}
.stat-emoji{font-size:1.4rem;margin-bottom:.7rem;}
.stat-num{font-family:'Playfair Display',serif;font-size:2.8rem;font-weight:700;color:var(--blanc);line-height:1;margin-bottom:.3rem;}
.stat-num .g{color:var(--vert-clair);}
.stat-lbl{font-size:.76rem;font-weight:400;color:rgba(184,217,240,.65);letter-spacing:.04em;}

/* SECTIONS */
section{padding:8rem 5%;}
.s-label{display:inline-flex;align-items:center;gap:.8rem;font-size:.68rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--vert);margin-bottom:1.2rem;}
.s-label::before{content:'';width:28px;height:2px;background:var(--vert);}
.s-title{font-family:'Playfair Display',serif;font-size:clamp(2rem,3.5vw,3.2rem);font-weight:700;line-height:1.15;color:var(--texte);margin-bottom:1.2rem;}
.s-title em{font-style:italic;color:var(--bleu-clair);}
.s-body{font-size:1rem;line-height:1.85;color:var(--texte-soft);max-width:540px;}

/* ABOUT */
#about{background:var(--gris);display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:center;}
.num-cards{display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;margin-top:2.5rem;}
.nc{background:var(--blanc);padding:2rem;border-radius:6px;border-bottom:3px solid transparent;transition:border-color .3s,transform .3s,box-shadow .3s;position:relative;overflow:hidden;}
.nc::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(122,182,72,.04),transparent);opacity:0;transition:opacity .3s;}
.nc:hover{border-color:var(--vert);transform:translateY(-4px);box-shadow:0 14px 40px rgba(26,75,124,.1);}
.nc:hover::after{opacity:1;}
.nc-big{font-family:'Playfair Display',serif;font-size:2.5rem;font-weight:700;color:var(--bleu);line-height:1;margin-bottom:.3rem;}
.nc-big .g{color:var(--vert);}
.nc-desc{font-size:.82rem;color:var(--texte-soft);line-height:1.55;}
.about-card-wrap{position:relative;}
.about-main{background:linear-gradient(145deg,var(--bleu),#0d2a45);border-radius:10px;padding:3.5rem;min-height:430px;display:flex;flex-direction:column;justify-content:flex-end;position:relative;overflow:hidden;}
.about-main::before{content:'LGI';position:absolute;top:-1rem;right:-1rem;font-family:'Playfair Display',serif;font-size:11rem;font-weight:700;color:rgba(255,255,255,.025);line-height:1;pointer-events:none;}
.about-stripe{position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--vert),var(--bleu-sky),var(--vert));background-size:200%;animation:strMove 3s linear infinite;}
@keyframes strMove{0%{background-position:0%;}100%{background-position:200%;}}
.about-quote{font-family:'Playfair Display',serif;font-size:1.7rem;color:var(--blanc);font-weight:400;font-style:italic;margin-bottom:1rem;line-height:1.35;}
.about-sub-text{font-size:.85rem;color:rgba(184,217,240,.65);line-height:1.65;}
.float-badge{position:absolute;top:1.8rem;right:-1.5rem;background:var(--vert);color:var(--blanc);padding:1.2rem 1.5rem;border-radius:8px;text-align:center;box-shadow:0 10px 40px rgba(122,182,72,.4);animation:bWiggle 4s ease-in-out infinite;}
@keyframes bWiggle{0%,100%{transform:rotate(-2deg) translateY(0);}50%{transform:rotate(2deg) translateY(-8px);}}
.fb-num{font-family:'Playfair Display',serif;font-size:2rem;font-weight:700;line-height:1;}
.fb-lbl{font-size:.66rem;font-weight:600;letter-spacing:.07em;opacity:.85;}

/* AVANTAGES */
#avantages{background:var(--blanc);}
.av-intro{display:grid;grid-template-columns:1.2fr 1fr;gap:4rem;align-items:end;margin-bottom:4rem;}
.av-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
.av-card{background:var(--gris);border-radius:10px;padding:2.5rem;position:relative;overflow:hidden;transition:transform .4s cubic-bezier(0.34,1.56,0.64,1),box-shadow .4s;cursor:default;}
.av-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--bleu),var(--vert));transform:scaleX(0);transform-origin:left;transition:transform .4s;}
.av-card:hover{transform:translateY(-10px) scale(1.01);box-shadow:0 24px 60px rgba(26,75,124,.12);}
.av-card:hover::after{transform:scaleX(1);}
.av-num{font-family:'Playfair Display',serif;font-size:5rem;font-weight:700;color:rgba(26,75,124,.055);line-height:1;position:absolute;top:.8rem;right:1.2rem;}
.av-ico{width:52px;height:52px;background:linear-gradient(135deg,var(--bleu),var(--bleu-clair));border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;box-shadow:0 6px 20px rgba(26,75,124,.22);transition:transform .3s;}
.av-card:hover .av-ico{transform:rotate(-8deg) scale(1.1);}
.av-ico svg{width:24px;height:24px;stroke:var(--blanc);fill:none;stroke-width:1.8;}
.av-title{font-size:1.05rem;font-weight:700;color:var(--texte);margin-bottom:.7rem;}
.av-desc{font-size:.85rem;color:var(--texte-soft);line-height:1.7;}

/* PROCESS */
#process{background:linear-gradient(160deg,var(--bleu),#0d2a45);position:relative;overflow:hidden;}
#process .s-title{color:var(--blanc);}
#process .s-body{color:rgba(184,217,240,.65);}
.proc-bg{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Playfair Display',serif;font-size:22vw;font-weight:700;color:rgba(255,255,255,.015);white-space:nowrap;pointer-events:none;animation:bgDrift 15s ease-in-out infinite;}
@keyframes bgDrift{0%,100%{transform:translate(-50%,-50%) scale(1);}50%{transform:translate(-50%,-52%) scale(1.04);}}
.proc-wrap{margin-top:4.5rem;position:relative;}
.proc-line{position:absolute;top:35px;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(122,182,72,.45) 15%,rgba(122,182,72,.45) 85%,transparent);}
.proc-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:1rem;position:relative;z-index:1;}
.proc-step{display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 .5rem;}
.proc-dot{width:70px;height:70px;border:2px solid rgba(122,182,72,.38);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;background:rgba(255,255,255,.02);position:relative;transition:all .4s;}
.proc-dot::before{content:'';position:absolute;inset:-6px;border-radius:50%;border:1px solid rgba(122,182,72,.13);animation:ringP 2s ease-in-out infinite;}
.proc-step:nth-child(2) .proc-dot::before{animation-delay:.33s;}
.proc-step:nth-child(3) .proc-dot::before{animation-delay:.66s;}
.proc-step:nth-child(4) .proc-dot::before{animation-delay:1s;}
.proc-step:nth-child(5) .proc-dot::before{animation-delay:1.33s;}
.proc-step:nth-child(6) .proc-dot::before{animation-delay:1.66s;}
@keyframes ringP{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.25);opacity:0;}}
.proc-dot:hover{background:var(--vert);border-color:var(--vert);transform:scale(1.12);}
.proc-dot svg{width:22px;height:22px;stroke:var(--vert-clair);fill:none;stroke-width:1.8;transition:stroke .3s;}
.proc-dot:hover svg{stroke:var(--blanc);}
.proc-n{position:absolute;top:-8px;right:-8px;width:22px;height:22px;background:var(--vert);border-radius:50%;font-size:.64rem;font-weight:700;color:var(--blanc);display:flex;align-items:center;justify-content:center;}
.proc-title{font-size:.88rem;font-weight:600;color:var(--blanc);margin-bottom:.5rem;}
.proc-desc{font-size:.74rem;color:rgba(184,217,240,.5);line-height:1.6;}

/* LEGAL */
#legal{background:var(--bleu-pale);padding:5rem 5%;text-align:center;}
.legal-box{max-width:820px;margin:0 auto;background:var(--blanc);border-radius:14px;padding:3.5rem;border-left:5px solid var(--vert);box-shadow:0 4px 50px rgba(26,75,124,.07);position:relative;overflow:hidden;}
.legal-box::before{content:'⚖️';position:absolute;right:2rem;top:50%;transform:translateY(-50%);font-size:7rem;opacity:.04;pointer-events:none;}
.legal-ttl{font-family:'Playfair Display',serif;font-size:1.7rem;color:var(--bleu);margin-bottom:1rem;font-weight:700;}
.legal-txt{font-size:.95rem;color:var(--texte-soft);line-height:1.85;}
.legal-txt strong{color:var(--bleu);}

/* CONTACT */
#contact{background:var(--gris);display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:start;}
.ci-list{display:flex;flex-direction:column;gap:1.2rem;margin-top:2.5rem;}
.ci{display:flex;align-items:center;gap:1.2rem;background:var(--blanc);padding:1.3rem 1.7rem;border-radius:8px;transition:transform .3s,box-shadow .3s,border-color .3s;border-left:3px solid transparent;}
.ci:hover{transform:translateX(7px);box-shadow:0 8px 30px rgba(26,75,124,.09);border-color:var(--vert);}
.ci-ico{width:44px;height:44px;min-width:44px;background:linear-gradient(135deg,var(--bleu),var(--bleu-clair));border-radius:10px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(26,75,124,.22);}
.ci-ico svg{width:18px;height:18px;stroke:var(--blanc);fill:none;stroke-width:2;}
.ci-txt strong{display:block;font-size:.68rem;letter-spacing:.12em;text-transform:uppercase;color:var(--texte-soft);margin-bottom:.15rem;}
.ci-txt span{font-size:.9rem;font-weight:500;color:var(--texte);}
.cf{background:var(--blanc);border-radius:14px;padding:3rem;box-shadow:0 4px 50px rgba(26,75,124,.08);}
.cf-title{font-family:'Playfair Display',serif;font-size:1.5rem;color:var(--bleu);margin-bottom:2rem;font-weight:700;}
.fg2{display:flex;flex-direction:column;gap:.4rem;margin-bottom:1rem;}
.fg2 label{font-size:.69rem;letter-spacing:.12em;text-transform:uppercase;color:var(--texte-soft);font-weight:700;}
.fg2 input,.fg2 select,.fg2 textarea{background:var(--gris);border:1.5px solid transparent;border-radius:7px;padding:.9rem 1.1rem;font-family:'Outfit',sans-serif;font-size:.92rem;color:var(--texte);outline:none;transition:border-color .3s,box-shadow .3s,background .3s;-webkit-appearance:none;}
.fg2 input:focus,.fg2 select:focus,.fg2 textarea:focus{border-color:var(--bleu-clair);background:var(--blanc);box-shadow:0 0 0 4px rgba(46,111,173,.1);}
.fg2 textarea{resize:vertical;min-height:115px;}
.fg-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
.sub-btn{width:100%;background:linear-gradient(135deg,var(--bleu),var(--bleu-clair));color:var(--blanc);border:none;cursor:pointer;padding:1.1rem 2rem;font-family:'Outfit',sans-serif;font-size:.9rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border-radius:7px;box-shadow:0 6px 25px rgba(26,75,124,.28);transition:all .3s;position:relative;overflow:hidden;margin-top:.5rem;}
.sub-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent);transform:translateX(-100%);transition:transform .5s;}
.sub-btn:hover::before{transform:translateX(100%);}
.sub-btn:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(26,75,124,.38);}
.form-note{font-size:.73rem;color:var(--texte-soft);text-align:center;margin-top:1rem;line-height:1.55;}

/* FOOTER */
footer{background:#0a2035;padding:3.5rem 5%;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:2rem;}
.fl-brand{font-family:'Playfair Display',serif;font-size:1.1rem;color:var(--bleu-sky);font-weight:700;}
.fl-brand span{display:block;font-size:.68rem;color:rgba(184,217,240,.45);font-family:'Outfit',sans-serif;font-weight:400;letter-spacing:.05em;margin-top:.1rem;}
.fl-copy{font-size:.76rem;color:rgba(255,255,255,.28);text-align:center;}
.fl-links{display:flex;gap:2rem;justify-content:flex-end;}
.fl-links a{font-size:.73rem;color:rgba(255,255,255,.32);text-decoration:none;transition:color .3s;}
.fl-links a:hover{color:var(--vert-clair);}

/* REVEAL */
.rev{opacity:0;transform:translateY(40px);transition:opacity .8s cubic-bezier(0.16,1,0.3,1),transform .8s cubic-bezier(0.16,1,0.3,1);}
.rev.on{opacity:1;transform:translateY(0);}
.rev-l{opacity:0;transform:translateX(-50px);transition:opacity .8s cubic-bezier(0.16,1,0.3,1),transform .8s cubic-bezier(0.16,1,0.3,1);}
.rev-l.on{opacity:1;transform:translateX(0);}
.rev-r{opacity:0;transform:translateX(50px);transition:opacity .8s cubic-bezier(0.16,1,0.3,1),transform .8s cubic-bezier(0.16,1,0.3,1);}
.rev-r.on{opacity:1;transform:translateX(0);}
.d1{transition-delay:.1s!important;}.d2{transition-delay:.2s!important;}.d3{transition-delay:.3s!important;}
.d4{transition-delay:.4s!important;}.d5{transition-delay:.5s!important;}.d6{transition-delay:.6s!important;}

/* RESPONSIVE */
@media(max-width:1100px){
  .proc-grid{grid-template-columns:repeat(3,1fr);}
  .proc-line{display:none;}
  .av-grid{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:900px){
  nav{padding:0 1.5rem;}
  .nav-links{display:none;}
  #about,#contact{grid-template-columns:1fr;gap:3rem;padding:5rem 5%;}
  .av-intro{grid-template-columns:1fr;}
  .about-card-wrap{display:none;}
  .stats-band{grid-template-columns:repeat(2,1fr);}
  .proc-grid{grid-template-columns:repeat(2,1fr);}
  footer{grid-template-columns:1fr;text-align:center;}
  .fl-links{justify-content:center;}
  .av-grid{grid-template-columns:1fr;}
  .fg-row{grid-template-columns:1fr;}
  .hero-house-svg{display:none;}
}
</style>
</head>
<body>

<div class="cursor" id="cur"></div>
<div class="cursor-ring" id="curRing"></div>

<!-- NAV -->
<nav id="nav">
  <a class="nav-logo" href="#">
    <svg width="160" height="52" viewBox="0 0 220 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Toit -->
      <polyline points="56,16 88,4 120,16" stroke="#b8d9f0" stroke-width="3.5" stroke-linejoin="round" fill="none"/>
      <!-- L -->
      <rect x="32" y="20" width="7" height="42" fill="#b8d9f0"/>
      <rect x="32" y="55" width="20" height="7" fill="#b8d9f0"/>
      <!-- G -->
      <path d="M62 20 Q50,20 50,41 Q50,62 62,62 L74,62 L74,44 L66,44 L66,50 L68,50 L68,55 L62,55 Q57,55 57,41 Q57,27 62,27 L74,27 L74,20 Z" fill="#b8d9f0"/>
      <!-- I -->
      <rect x="82" y="20" width="7" height="42" fill="#b8d9f0"/>
      <!-- barre verte -->
      <rect x="32" y="65" width="57" height="3" fill="#7ab648"/>
      <!-- texte -->
      <text x="100" y="34" fill="rgba(184,217,240,0.9)" font-family="Outfit,sans-serif" font-size="10.5" font-weight="300" letter-spacing="1.5">LIVET</text>
      <text x="100" y="48" fill="rgba(184,217,240,0.9)" font-family="Outfit,sans-serif" font-size="10" font-weight="300" letter-spacing="1.5">GESTION</text>
      <text x="100" y="62" fill="#7ab648" font-family="Outfit,sans-serif" font-size="10" font-weight="700" letter-spacing="2">IMMO</text>
    </svg>
  </a>
  <ul class="nav-links">
    <li><a href="#about">Concept</a></li>
    <li><a href="#avantages">Avantages</a></li>
    <li><a href="#process">Étapes</a></li>
    <li><a href="#contact" class="nav-cta">Prendre rendez-vous</a></li>
  </ul>
</nav>

<!-- HERO -->
<section id="hero">
  <canvas id="heroCanvas"></canvas>
  <div class="hero-overlay"></div>
  <div class="hero-grid"></div>
  <div class="particles" id="pc"></div>
  <div class="blob b1"></div>
  <div class="blob b2"></div>
  <div class="blob b3"></div>
  <svg class="hero-house-svg" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polyline points="10,90 100,10 190,90" stroke="white" stroke-width="4" stroke-linejoin="round"/>
    <rect x="30" y="90" width="140" height="100" stroke="white" stroke-width="3.5"/>
    <rect x="80" y="140" width="40" height="50" stroke="white" stroke-width="3"/>
    <rect x="45" y="105" width="35" height="30" stroke="white" stroke-width="2.5"/>
    <rect x="120" y="105" width="35" height="30" stroke="white" stroke-width="2.5"/>
  </svg>
  <div class="hero-content">
    <div class="hero-badge"><div class="badge-dot"></div>Sous-location professionnelle</div>
    <h1 class="hero-title">
      Votre bien loué,<br>
      votre loyer <span class="accent">garanti</span><br>
      <span class="italic">chaque mois.</span>
    </h1>
    <p class="hero-sub">
      Livet Gestion Immo devient votre <strong>locataire unique et professionnel</strong>. Vous percevez un loyer fixe, garanti par contrat — quoi qu'il arrive.
    </p>
    <div class="hero-btns">
      <a href="#contact" class="btn-main">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.42 2 2 0 0 1 3.62 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg>
        Obtenir une estimation
      </a>
      <a href="#about" class="btn-outline">
        Découvrir
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </a>
    </div>
  </div>
  <div class="scroll-ind" onclick="document.getElementById('stats').scrollIntoView({behavior:'smooth'})">
    <span class="scroll-txt">Défiler</span>
    <div class="scroll-line"></div>
  </div>
</section>

<!-- STATS -->
<div class="stats-band" id="stats">
  <div class="stat-item"><div class="stat-emoji">🏦</div><div class="stat-num"><span class="count" data-t="100">0</span><span class="g">%</span></div><div class="stat-lbl">Loyers garantis par contrat</div></div>
  <div class="stat-item"><div class="stat-emoji">📋</div><div class="stat-num"><span class="count" data-t="1">0</span> <span style="font-size:1.4rem;font-weight:300">mois</span></div><div class="stat-lbl">De préavis seulement</div></div>
  <div class="stat-item"><div class="stat-emoji">🛡️</div><div class="stat-num"><span class="count" data-t="2">0</span> <span style="font-size:1.4rem;font-weight:300">contrats</span></div><div class="stat-lbl">D'assurance souscrits</div></div>
  <div class="stat-item"><div class="stat-emoji">📈</div><div class="stat-num"><span class="g">+</span><span class="count" data-t="20">0</span><span class="g">%</span></div><div class="stat-lbl">De revenus en moyenne</div></div>
</div>

<!-- ABOUT -->
<section id="about">
  <div class="rev-l">
    <p class="s-label">Notre concept</p>
    <h2 class="s-title">La sous-location <em>professionnelle</em>, c'est quoi ?</h2>
    <p class="s-body">Livet Gestion Immo signe avec vous un <strong>bail de sous-location professionnelle</strong> rédigé par un avocat. Nous devenons votre locataire unique, et en contrepartie, la loi nous autorise à proposer votre bien en location courte durée à des <strong>entreprises ou à une clientèle de tourisme haut de gamme, minutieusement sélectionnée</strong>.</p>
    <p class="s-body" style="margin-top:1rem;">Résultat : vous touchez votre loyer chaque mois, <strong>même si le logement est vide</strong>. Nous gérons absolument tout le reste.</p>
    <div class="num-cards">
      <div class="nc"><div class="nc-big"><span class="g">0 €</span></div><div class="nc-desc">Aucune charge à votre compte. Nous prenons tout en charge.</div></div>
      <div class="nc"><div class="nc-big"><span class="g">24h</span></div><div class="nc-desc">De réponse après votre première prise de contact.</div></div>
      <div class="nc"><div class="nc-big">100<span class="g">%</span></div><div class="nc-desc">Légal — encadré par un contrat d'avocat spécialisé.</div></div>
      <div class="nc"><div class="nc-big"><span class="g">∞</span></div><div class="nc-desc">Tranquillité d'esprit. Nous gérons, vous encaissez.</div></div>
    </div>
  </div>
  <div class="about-card-wrap rev-r">
    <div class="about-main">
      <div class="about-stripe"></div>
      <svg style="width:100%;height:170px;opacity:.13;margin-bottom:2.2rem" viewBox="0 0 300 170" fill="none">
        <polyline points="20,135 20,50 150,10 280,50 280,135" stroke="white" stroke-width="3"/>
        <rect x="115" y="85" width="55" height="50" stroke="white" stroke-width="2.5"/>
        <rect x="42" y="75" width="48" height="38" stroke="white" stroke-width="2"/>
        <rect x="210" y="75" width="48" height="38" stroke="white" stroke-width="2"/>
      </svg>
      <div class="about-quote">"Votre bien travaille pour vous,<br>pas l'inverse."</div>
      <div class="about-sub-text">Livet Gestion Immo — spécialiste de la sous-location professionnelle</div>
    </div>
    <div class="float-badge">
      <div class="fb-num">100%</div>
      <div class="fb-lbl">Satisfait<br>ou résiliation</div>
    </div>
  </div>
</section>

<!-- AVANTAGES -->
<section id="avantages">
  <div class="av-intro">
    <div class="rev"><p class="s-label">Ce que vous gagnez</p><h2 class="s-title">6 raisons de choisir <em>Livet Gestion Immo</em></h2></div>
    <p class="s-body rev d2">Une formule pensée pour maximiser votre rentabilité tout en vous libérant de toute contrainte de gestion.</p>
  </div>
  <div class="av-grid">
    <div class="av-card rev d1"><div class="av-num">01</div><div class="av-ico"><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg></div><div class="av-title">Loyer garanti chaque mois</div><div class="av-desc">Le montant est fixé dans le contrat. Vous êtes payé à date fixe, sans retard ni impayé — même si le logement est inoccupé.</div></div>
    <div class="av-card rev d2"><div class="av-num">02</div><div class="av-ico"><svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div><div class="av-title">Revenus optimisés</div><div class="av-desc">Notre gestion dynamique des prix sur les plateformes vous permet de percevoir en moyenne 20% de revenus supplémentaires.</div></div>
    <div class="av-card rev d3"><div class="av-num">03</div><div class="av-ico"><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div><div class="av-title">Bien entretenu en permanence</div><div class="av-desc">Nettoyages professionnels après chaque séjour, maintenance courante, surveillance : votre bien est entre de bonnes mains.</div></div>
    <div class="av-card rev d1"><div class="av-num">04</div><div class="av-ico"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div><div class="av-title">Contrat sécurisé par un avocat</div><div class="av-desc">Bail rédigé par notre avocat spécialisé. Plus souple qu'un bail classique : seulement 1 mois de préavis pour reprendre votre bien.</div></div>
    <div class="av-card rev d2"><div class="av-num">05</div><div class="av-ico"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><div class="av-title">Double couverture assurance</div><div class="av-desc">Assurance habitation classique + assurance spécifique voyageurs. Votre bien est couvert en toutes circonstances.</div></div>
    <div class="av-card rev d3"><div class="av-num">06</div><div class="av-ico"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg></div><div class="av-title">Zéro gestion pour vous</div><div class="av-desc">Voyageurs, ménage, check-in/out, incidents… Nous gérons tout de A à Z. Votre seule action : encaisser votre loyer.</div></div>
  </div>
</section>

<!-- PROCESS -->
<section id="process">
  <div class="proc-bg">PROCESS</div>
  <div class="rev" style="position:relative;z-index:1;max-width:600px;">
    <p class="s-label">Comment ça marche</p>
    <h2 class="s-title">6 étapes simples, <em>100% gagnant-gagnant</em></h2>
    <p class="s-body">De votre première prise de contact jusqu'au versement de votre premier loyer garanti.</p>
  </div>
  <div class="proc-wrap rev">
    <div class="proc-line"></div>
    <div class="proc-grid">
      <div class="proc-step"><div class="proc-dot"><span class="proc-n">1</span><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.42 2 2 0 0 1 3.62 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg></div><div class="proc-title">Prise de contact</div><div class="proc-desc">Échange sur votre bien et vos attentes</div></div>
      <div class="proc-step"><div class="proc-dot"><span class="proc-n">2</span><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div><div class="proc-title">Visite du logement</div><div class="proc-desc">Estimation du loyer garanti possible</div></div>
      <div class="proc-step"><div class="proc-dot"><span class="proc-n">3</span><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/></svg></div><div class="proc-title">Signature du bail</div><div class="proc-desc">Contrat rédigé par notre avocat</div></div>
      <div class="proc-step"><div class="proc-dot"><span class="proc-n">4</span><svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div><div class="proc-title">Préparation du logement</div><div class="proc-desc">Mise en place des équipements professionnels, shooting photo par un photographe expert et derniers préparatifs avant mise à disposition</div></div>
      <div class="proc-step"><div class="proc-dot"><span class="proc-n">5</span><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div><div class="proc-title">Mise à disposition aux voyageurs</div><div class="proc-desc">Accueil des premiers voyageurs et gestion complète des séjours</div></div>
      <div class="proc-step"><div class="proc-dot"><span class="proc-n">6</span><svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div><div class="proc-title">Loyer versé</div><div class="proc-desc">Chaque mois, à date fixe, sans exception</div></div>
    </div>
  </div>
</section>

<!-- LEGAL -->
<section id="legal">
  <div class="legal-box rev">
    <div class="legal-ttl">⚖️ Un cadre 100% légal et transparent</div>
    <p class="legal-txt">La sous-location professionnelle est <strong>encadrée par la loi française</strong>. Notre activité repose sur un contrat de bail professionnel rédigé par un avocat spécialisé en droit immobilier, qui précise le <strong>montant du loyer garanti</strong>, la durée, et les obligations de chaque partie. Ce dispositif vous offre plus de <strong>flexibilité qu'un bail classique</strong> (préavis réduit à 1 mois) tout en vous protégeant contre tout impayé. En contrepartie, la loi nous autorise à sous-louer votre bien sur de courtes durées à une clientèle touristique ou professionnelle.</p>
  </div>
</section>

<!-- CONTACT -->
<section id="contact">
  <div class="rev-l">
    <p class="s-label">Nous contacter</p>
    <h2 class="s-title">Prêt à nous <em>confier votre bien</em> ?</h2>
    <p class="s-body">Laissez-nous vos coordonnées et nous vous recontactons sous <strong>24 heures</strong> pour une estimation personnalisée de loyer garanti.</p>
    <div class="ci-list">
      <div class="ci"><div class="ci-ico"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.42 2 2 0 0 1 3.62 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/></svg></div><div class="ci-txt"><strong>Téléphone</strong><span>Lundi–Vendredi · 9h–19h</span></div></div>
      <div class="ci"><div class="ci-ico"><svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div><div class="ci-txt"><strong>Email</strong><span><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="c08ca9b6a5b4a7a5b3b4a9afaea9adadaf80a7ada1a9aceea3afad">[email&#160;protected]</a></span></div></div>
      <div class="ci"><div class="ci-ico"><svg viewBox="0 0 24 24"><circle cx="12" cy="10" r="3"/><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/></svg></div><div class="ci-txt"><strong>Zone d'intervention</strong><span>Région Côtes Ouest</span></div></div>
    </div>
  </div>
  <div class="rev-r">
    <div class="cf">
      <div class="cf-title">Demande d'estimation gratuite</div>
      <div class="fg-row">
        <div class="fg2"><label>Prénom</label><input type="text" placeholder="Jean"/></div>
        <div class="fg2"><label>Nom</label><input type="text" placeholder="Dupont"/></div>
      </div>
      <div class="fg2"><label>Email</label><input type="email" placeholder="jean@example.com"/></div>
      <div class="fg2"><label>Téléphone</label><input type="tel" placeholder="06 XX XX XX XX"/></div>
      <div class="fg2"><label>Type de bien</label><select><option value="">Sélectionnez votre type de bien</option><option>Studio</option><option>Appartement T2</option><option>Appartement T3+</option><option>Maison</option><option>Autre</option></select></div>
      <div class="fg2"><label>Ville du bien</label><input type="text" placeholder="Paris, Lyon, Bordeaux…"/></div>
      <div class="fg2"><label>Message (optionnel)</label><textarea placeholder="Décrivez votre bien et vos attentes…"></textarea></div>
      <button class="sub-btn" id="subBtn">Envoyer ma demande →</button>
      <div class="form-note">🔒 Données confidentielles — aucun partage tiers</div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="fl-brand">LIVET GESTION IMMO<span>Sous-location Professionnelle</span></div>
  <div class="fl-copy">© 2024 Livet Gestion Immo — Tous droits réservés</div>
  <div class="fl-links"><a href="#">Mentions légales</a><a href="#">Confidentialité</a><a href="#contact">Contact</a></div>
</footer>

<script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script data-cfasync="false" src="/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script><script>
// CURSOR
const cur=document.getElementById('cur'),ring=document.getElementById('curRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx+'px';cur.style.top=my+'px';});
(function loop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
document.querySelectorAll('a,button,.av-card,.nc,.proc-dot').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cur.style.transform='translate(-50%,-50%) scale(2.8)';ring.style.transform='translate(-50%,-50%) scale(1.6)';});
  el.addEventListener('mouseleave',()=>{cur.style.transform='translate(-50%,-50%) scale(1)';ring.style.transform='translate(-50%,-50%) scale(1)';});
});

// NAV
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>60));

// PARTICLES
const pc=document.getElementById('pc');
const cols=['rgba(122,182,72,','rgba(184,217,240,','rgba(46,111,173,'];
for(let i=0;i<45;i++){
  const p=document.createElement('div');p.className='particle';
  const s=Math.random()*6+2,c=cols[Math.floor(Math.random()*3)];
  p.style.cssText=`width:${s}px;height:${s}px;left:${Math.random()*100}%;background:${c}${Math.random()*.5+.3});animation-duration:${Math.random()*14+8}s;animation-delay:${Math.random()*10}s;`;
  pc.appendChild(p);
}

// REVEAL
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');obs.unobserve(e.target);}}),{threshold:.08});
document.querySelectorAll('.rev,.rev-l,.rev-r').forEach(el=>obs.observe(el));

// COUNTERS
function count(el){
  const t=parseInt(el.dataset.t);let c=0;
  const s=Math.max(1,Math.floor(t/55));
  const iv=setInterval(()=>{c=Math.min(c+s,t);el.textContent=c;if(c>=t)clearInterval(iv);},25);
}
new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){e.target.querySelectorAll('.count').forEach(count);}
}),{threshold:.3}).observe(document.querySelector('.stats-band'));

// SUBMIT
document.getElementById('subBtn').addEventListener('click',function(){
  this.textContent='✅ Envoyé ! Nous vous recontactons sous 24h.';
  this.style.background='var(--vert)';
  this.style.boxShadow='0 6px 25px rgba(122,182,72,.4)';
});

// ══════════════════════════════════════
// HERO CANVAS — Appartement vue mer
// ══════════════════════════════════════
(function(){
  const canvas=document.getElementById('heroCanvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  let W,H,T=0;
  function resize(){W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;}
  resize();
  window.addEventListener('resize',resize);
  function lerp(a,b,t){return a+(b-a)*t;}
  function smooth(t){return t<.5?2*t*t:-1+(4-2*t)*t;}
  function getCam(T){
    const ph=(T%40)/40;
    let px,py,z;
    if(ph<.25){const p=ph/.25;px=lerp(0,.06,smooth(p));py=lerp(0,-.02,smooth(p));z=lerp(1,1.04,smooth(p));}
    else if(ph<.5){const p=(ph-.25)/.25;px=lerp(.06,-.05,smooth(p));py=lerp(-.02,.05,smooth(p));z=lerp(1.04,1.08,smooth(p));}
    else if(ph<.75){const p=(ph-.5)/.25;px=lerp(-.05,.03,smooth(p));py=lerp(.05,.02,smooth(p));z=lerp(1.08,1.12,smooth(p));}
    else{const p=(ph-.75)/.25;px=lerp(.03,0,smooth(p));py=lerp(.02,0,smooth(p));z=lerp(1.12,1,smooth(p));}
    return{px,py,z};
  }
  function getSun(T){
    const ph=(T%40)/40;
    return{
      x:.72-.06*ph, y:.3+.06*Math.sin(ph*Math.PI),
      r:Math.round(lerp(255,220,Math.sin(ph*Math.PI))),
      g:Math.round(lerp(185,80,ph)),
      b:Math.round(lerp(50,30,ph))
    };
  }
  function draw(T){
    const cam=getCam(T), sun=getSun(T);
    const sx=sun.x*W, sy=sun.y*H;
    ctx.save();
    ctx.translate(W/2,H/2);ctx.scale(cam.z,cam.z);ctx.translate(-W/2+cam.px*W,-H/2+cam.py*H);

    // CIEL
    const sk=ctx.createLinearGradient(0,0,0,H*.65);
    sk.addColorStop(0,`rgb(8,18,38)`);
    sk.addColorStop(.35,`rgb(${sun.r-50},${sun.g},${sun.b+25})`);
    sk.addColorStop(.65,`rgb(${sun.r},${sun.g+15},${sun.b})`);
    sk.addColorStop(1,`rgb(${sun.r+5},${Math.round(sun.g*.5)},15)`);
    ctx.fillStyle=sk;ctx.fillRect(0,0,W,H*.65);

    // HALO + SOLEIL
    const halo=ctx.createRadialGradient(sx,sy,0,sx,sy,W*.5);
    halo.addColorStop(0,`rgba(${sun.r},${sun.g+50},${sun.b},.8)`);
    halo.addColorStop(.15,`rgba(${sun.r},${sun.g},0,.4)`);
    halo.addColorStop(.4,`rgba(${sun.r},${Math.round(sun.g*.4)},0,.15)`);
    halo.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=halo;ctx.fillRect(0,0,W,H);
    ctx.beginPath();ctx.arc(sx,sy,W*.04,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,${sun.g+70},${sun.b+40},1)`;ctx.fill();
    ctx.beginPath();ctx.arc(sx,sy,W*.058,0,Math.PI*2);
    ctx.fillStyle=`rgba(${sun.r},${sun.g+20},0,.28)`;ctx.fill();

    // MER
    const seaY=H*.59;
    const sea=ctx.createLinearGradient(0,seaY,0,H*.73);
    sea.addColorStop(0,`rgb(${sun.r-35},${Math.round(sun.g*.65)+15},70)`);
    sea.addColorStop(.5,'rgb(12,55,105)');sea.addColorStop(1,'rgb(5,22,50)');
    ctx.fillStyle=sea;ctx.fillRect(0,seaY,W,H*.73-seaY);
    const refl=ctx.createLinearGradient(sx-W*.2,seaY,sx+W*.2,seaY);
    refl.addColorStop(0,'rgba(0,0,0,0)');refl.addColorStop(.5,`rgba(${sun.r},${sun.g+25},0,.68)`);refl.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=refl;ctx.fillRect(sx-W*.2,seaY,W*.4,H*.11);
    for(let i=0;i<8;i++){
      ctx.beginPath();ctx.strokeStyle=`rgba(255,${sun.g+40},100,${.07-i*.007})`;ctx.lineWidth=1.5;
      const wy=seaY+(i*.013+.004)*H,wo=(T*20+i*50)%W;
      for(let x=0;x<=W;x+=4){const wx=(x+wo)%W,y=wy+Math.sin((x/W)*Math.PI*6+T*1.3+i)*3;x===0?ctx.moveTo(wx,y):ctx.lineTo(wx,y);}
      ctx.stroke();
    }
    // CÔTE
    ctx.beginPath();
    [[0,seaY+2],[W*.07,seaY-16],[W*.16,seaY-7],[W*.24,seaY-26],[W*.33,seaY-11],[W*.42,seaY-23],[W*.52,seaY-5],[W*.63,seaY-33],[W*.73,seaY-17],[W*.84,seaY-9],[W*.93,seaY-22],[W,seaY-4],[W,seaY+30]].forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
    ctx.closePath();ctx.fillStyle=`rgba(${Math.round(sun.r*.28)},${Math.round(sun.g*.16)},25,.82)`;ctx.fill();

    // PLAFOND
    const ch=H*.085;
    ctx.fillStyle='rgb(218,208,192)';ctx.fillRect(0,0,W,ch);
    for(let i=0;i<3;i++){
      const spx=W*(.2+i*.3);
      const sp=ctx.createRadialGradient(spx,ch*.6,0,spx,ch*.6,W*.12);
      sp.addColorStop(0,`rgba(${sun.r},${sun.g+80},${sun.b+80},.22)`);sp.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sp;ctx.fillRect(0,0,W,ch*2.5);
      ctx.beginPath();ctx.arc(spx,ch*.5,7,0,Math.PI*2);ctx.fillStyle='rgb(242,236,224)';ctx.fill();
    }

    // MUR GAUCHE
    const wg=ctx.createLinearGradient(0,0,W*.22,0);
    wg.addColorStop(0,'rgba(182,175,162,1)');wg.addColorStop(1,'rgba(210,202,188,0)');
    ctx.fillStyle=wg;ctx.fillRect(0,ch,W*.22,H*.92-ch);

    // SOL PARQUET
    const fy=H*.72;
    const fl=ctx.createLinearGradient(0,fy,0,H);
    fl.addColorStop(0,'rgb(138,98,58)');fl.addColorStop(.4,'rgb(118,80,43)');fl.addColorStop(1,'rgb(88,58,28)');
    ctx.fillStyle=fl;ctx.fillRect(0,fy,W,H-fy);
    for(let i=0;i<14;i++){ctx.beginPath();ctx.strokeStyle='rgba(75,48,18,.22)';ctx.lineWidth=1;ctx.moveTo(0,fy+(i*(H-fy)/14));ctx.lineTo(W,fy+(i*(H-fy)/14));ctx.stroke();}
    const fr=ctx.createLinearGradient(W*.42,fy,W*.95,fy+(H-fy)*.55);
    fr.addColorStop(0,`rgba(${sun.r},${sun.g+20},0,.16)`);fr.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=fr;ctx.fillRect(W*.38,fy,W*.62,H-fy);

    // BAIE VITRÉE
    const wx=W*.38,ww=W*.58,wt=ch*1.1,wb=fy;
    ctx.fillStyle='rgba(158,146,128,1)';
    ctx.fillRect(wx-5,wt-4,ww+10,7);ctx.fillRect(wx-5,wb-4,ww+10,7);
    ctx.fillRect(wx-5,wt,7,wb-wt);ctx.fillRect(wx+ww-2,wt,7,wb-wt);
    for(let i=1;i<3;i++)ctx.fillRect(wx+ww*(i/3)-3,wt,5,wb-wt);
    ctx.fillRect(wx,wt+(wb-wt)*.48,ww,5);

    // VUE FENÊTRE
    ctx.save();ctx.beginPath();ctx.rect(wx,wt,ww,wb-wt);ctx.clip();
    const wsk=ctx.createLinearGradient(0,wt,0,wb);
    wsk.addColorStop(0,'rgb(12,22,45)');wsk.addColorStop(.38,`rgb(${sun.r-22},${sun.g+8},${sun.b+12})`);
    wsk.addColorStop(.65,`rgb(${sun.r},${sun.g},${sun.b})`);wsk.addColorStop(1,'rgb(10,48,98)');
    ctx.fillStyle=wsk;ctx.fillRect(wx,wt,ww,wb-wt);
    const wh=ctx.createRadialGradient(sx,wt+(wb-wt)*.36,0,sx,wt+(wb-wt)*.36,ww*.7);
    wh.addColorStop(0,`rgba(${sun.r},${sun.g+55},${sun.b},.68)`);wh.addColorStop(.28,`rgba(${sun.r},${sun.g},0,.28)`);wh.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=wh;ctx.fillRect(wx,wt,ww,wb-wt);
    ctx.beginPath();ctx.arc(sx,wt+(wb-wt)*.36,ww*.044,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,${sun.g+70},${sun.b+40},1)`;ctx.fill();
    const wsy=wt+(wb-wt)*.63;
    const wsea=ctx.createLinearGradient(0,wsy,0,wb);
    wsea.addColorStop(0,`rgb(${sun.r-38},${Math.round(sun.g*.65)+8},55)`);wsea.addColorStop(1,'rgb(5,22,52)');
    ctx.fillStyle=wsea;ctx.fillRect(wx,wsy,ww,wb-wsy);
    const wr=ctx.createLinearGradient(sx-ww*.22,wsy,sx+ww*.22,wsy);
    wr.addColorStop(0,'rgba(0,0,0,0)');wr.addColorStop(.5,`rgba(${sun.r},${sun.g+28},0,.62)`);wr.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=wr;ctx.fillRect(wx,wsy,ww,(wb-wsy)*.78);
    ctx.beginPath();[[wx,wsy+2],[wx+ww*.1,wsy-11],[wx+ww*.22,wsy-5],[wx+ww*.35,wsy-19],[wx+ww*.52,wsy-7],[wx+ww*.68,wsy-27],[wx+ww*.82,wsy-13],[wx+ww,wsy-4],[wx+ww,wsy+18]].forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));
    ctx.closePath();ctx.fillStyle=`rgba(${Math.round(sun.r*.22)},${Math.round(sun.g*.12)},18,.78)`;ctx.fill();
    for(let i=0;i<5;i++){ctx.beginPath();ctx.strokeStyle=`rgba(255,${sun.g+45},80,${.09-i*.015})`;ctx.lineWidth=1;const wy2=wsy+(i*(wb-wsy)/7)+4;for(let x=wx;x<=wx+ww;x+=3){const y=wy2+Math.sin((x/ww)*Math.PI*5+T*1.5+i*1.1)*2;x===wx?ctx.moveTo(x,y):ctx.lineTo(x,y);}ctx.stroke();}
    ctx.restore();

    // REFLET FENÊTRE SOL
    ctx.save();ctx.globalAlpha=.16;ctx.transform(1,0,-.28,.14,wx*.28,fy);
    ctx.beginPath();const tw=ww*1.4;
    ctx.moveTo(0,0);ctx.lineTo(tw,0);ctx.lineTo(tw*.82,H-fy);ctx.lineTo(tw*.18,H-fy);ctx.closePath();
    const tg=ctx.createLinearGradient(0,0,0,H-fy);tg.addColorStop(0,`rgba(${sun.r},${sun.g+25},0,.85)`);tg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=tg;ctx.fill();ctx.restore();

    // CANAPÉ
    const scx=W*.02,scy=fy-H*.18,scw=W*.29,sch=H*.18;
    const sg=ctx.createLinearGradient(scx,scy,scx,scy+sch);sg.addColorStop(0,'rgb(68,63,78)');sg.addColorStop(1,'rgb(44,41,53)');
    ctx.fillStyle=sg;ctx.beginPath();if(ctx.roundRect)ctx.roundRect(scx,scy+sch*.35,scw,sch*.65,8);else ctx.rect(scx,scy+sch*.35,scw,sch*.65);ctx.fill();
    ctx.fillStyle='rgb(78,73,88)';ctx.beginPath();if(ctx.roundRect)ctx.roundRect(scx,scy,scw,sch*.44,[8,8,0,0]);else ctx.rect(scx,scy,scw,sch*.44);ctx.fill();
    for(let i=0;i<3;i++){ctx.fillStyle=`rgba(${92+i*7},${87+i*5},${102+i*3},1)`;ctx.beginPath();const cx2=scx+scw*.08+i*(scw*.3);if(ctx.roundRect)ctx.roundRect(cx2,scy+sch*.05,scw*.25,sch*.33,5);else ctx.rect(cx2,scy+sch*.05,scw*.25,sch*.33);ctx.fill();}
    ctx.fillStyle='rgb(158,138,108)';[[scx+scw*.07,scy+sch*.9],[scx+scw*.93,scy+sch*.9]].forEach(([px,py])=>ctx.fillRect(px-3,py,6,sch*.11));

    // TABLE BASSE
    const tx=scx+scw*.1,ty2=fy-H*.07,tw2=scw*.68,th=H*.04;
    ctx.fillStyle='rgb(118,88,52)';ctx.beginPath();if(ctx.roundRect)ctx.roundRect(tx,ty2,tw2,th*.28,3);else ctx.rect(tx,ty2,tw2,th*.28);ctx.fill();
    ctx.fillStyle='rgb(88,63,36)';ctx.fillRect(tx+tw2*.1,ty2+th*.28,tw2*.8,th*.48);

    // LAMPE
    const lx=W*.315,ly=fy-H*.32;
    ctx.fillStyle='rgb(178,158,118)';ctx.fillRect(lx-2,ly+H*.22,4,H*.1);
    ctx.beginPath();ctx.moveTo(lx-20,ly+H*.22);ctx.lineTo(lx+20,ly+H*.22);ctx.lineTo(lx+13,ly);ctx.lineTo(lx-13,ly);ctx.closePath();ctx.fillStyle='rgba(238,218,178,.9)';ctx.fill();
    const lg=ctx.createRadialGradient(lx,ly+H*.06,0,lx,ly+H*.06,H*.23);
    lg.addColorStop(0,`rgba(${sun.r},${sun.g+65},${sun.b+28},.22)`);lg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=lg;ctx.fillRect(lx-H*.23,ly-H*.04,H*.46,H*.28);

    // TABLEAU MUR
    const ax=W*.04,ay=H*.22,aw=W*.115,ah=H*.18;
    ctx.fillStyle='rgb(48,43,53)';ctx.fillRect(ax-3,ay-3,aw+6,ah+6);
    const ag=ctx.createLinearGradient(ax,ay,ax,ay+ah);
    ag.addColorStop(0,`rgb(${sun.r-22},${Math.round(sun.g*.45)},18)`);ag.addColorStop(.5,`rgb(${sun.r},${sun.g+18},0)`);ag.addColorStop(1,'rgb(10,38,78)');
    ctx.fillStyle=ag;ctx.fillRect(ax,ay,aw,ah);
    ctx.beginPath();ctx.arc(ax+aw*.62,ay+ah*.42,aw*.21,0,Math.PI*2);ctx.fillStyle=`rgba(255,${sun.g+75},${sun.b+35},.88)`;ctx.fill();
    ctx.fillStyle='rgba(5,28,68,1)';ctx.fillRect(ax,ay+ah*.64,aw,ah*.36);

    // PLANTE
    const plx=W*.33,ply=fy-H*.18;
    ctx.fillStyle='rgb(158,118,78)';ctx.beginPath();ctx.moveTo(plx-17,ply+H*.18);ctx.lineTo(plx+17,ply+H*.18);ctx.lineTo(plx+13,ply+H*.08);ctx.lineTo(plx-13,ply+H*.08);ctx.closePath();ctx.fill();
    for(let i=0;i<7;i++){
      const ang=-Math.PI/2+(i-3)*.3+Math.sin(T*.28+i)*.04,len=H*(.11+i%3*.022);
      ctx.beginPath();ctx.strokeStyle=`rgba(${38+i*4},${98+i*7},${38+i*3},.88)`;ctx.lineWidth=2;
      ctx.moveTo(plx,ply+H*.08);
      const ex2=plx+Math.cos(ang)*len,ey2=ply+H*.08+Math.sin(ang)*len;
      ctx.quadraticCurveTo(plx+Math.cos(ang)*len*.5+Math.cos(ang+Math.PI/2)*18,ply+H*.08+Math.sin(ang)*len*.5+Math.sin(ang+Math.PI/2)*18,ex2,ey2);ctx.stroke();
      ctx.beginPath();ctx.ellipse(ex2,ey2,19,8,ang+Math.PI/2,0,Math.PI*2);ctx.fillStyle=`rgba(${48+i*4},${108+i*7},${48+i*2},.82)`;ctx.fill();
    }

    ctx.restore();

    // VIGNETTE
    const vg=ctx.createRadialGradient(W/2,H/2,H*.28,W/2,H/2,H*.88);
    vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,8,.48)');
    ctx.fillStyle=vg;ctx.fillRect(0,0,W,H);
  }

  let last2=0;
  function loop(ts){const dt=(ts-last2)/1e3;last2=ts;T+=dt;draw(T);requestAnimationFrame(loop);}
  requestAnimationFrame(loop);
})();
</script>
</body>
</html>
