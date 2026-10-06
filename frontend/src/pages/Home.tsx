import { Link } from "react-router-dom";

// Versión restaurada: conserva todos los colores, efectos y animaciones.
// Solo se limpiaron caracteres de pegado y se separó el código en líneas.

const css = `

@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Instrument+Serif:ital@0;1&display=swap');

:root{--ink:#101827;--cloud:#f6f8fc;--blue:#5267ff;--lilac:#b9b5ff;--line:#dfe4ef}
.syn{font-family:'DM Sans',Arial,sans-serif;color:var(--ink);background:var(--cloud);overflow:hidden}
.syn \*{box-sizing:border-box}
.syn a{color:inherit;text-decoration:none}
.syn-nav{height:76px;padding:0 clamp(22px,5vw,76px);background:rgba(250,251,253,.88);backdrop-filter:blur(16px);border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;position:relative;z-index:10}
.syn-brand{display:flex;align-items:center;gap:9px;font-weight:700;font-size:20px;letter-spacing:-1px}
.syn-mark{height:29px;width:29px;border:1.8px solid var(--ink);border-radius:8px;display:grid;place-items:center;font-family:'Instrument Serif';font-style:italic;font-size:23px;background:#fff;transform:rotate(-7deg)}
.syn-links{display:flex;gap:29px;font-size:12px;font-weight:600;color:#3b4961}
.syn-links a:hover{color:var(--blue)}
.syn-actions{display:flex;align-items:center;gap:17px;font-size:12px;font-weight:700}
.login{padding:10px 15px;border:1px solid #ccd4e2;border-radius:10px;background:#fff}
.login:hover{border-color:var(--ink)}
.dark-btn,.button{background:var(--ink);color:#fff!important;border-radius:10px;padding:11px 17px;box-shadow:0 3px 0 #080d16;transition:transform .18s,box-shadow .18s}
.dark-btn:hover,.button:hover{transform:translateY(-2px);box-shadow:0 5px 0 #080d16}
.syn-hero{min-height:725px;padding:clamp(76px,9vw,132px) 24px 0;text-align:center;position:relative;background-image:linear-gradient(rgba(184,195,215,.24) 1px,transparent 1px),linear-gradient(90deg,rgba(184,195,215,.24) 1px,transparent 1px);background-size:32px 32px;isolation:isolate}
.syn-hero:before{content:'';position:absolute;z-index:-1;inset:0;background:radial-gradient(ellipse 45% 22% at 50% 43%,rgba(122,111,255,.16),transparent 70%),radial-gradient(ellipse 19% 16% at 18% 17%,rgba(105,210,255,.13),transparent 80%)}
.pill{margin:auto;display:inline-flex;align-items:center;gap:8px;padding:7px 11px 7px 8px;border:1px solid #d8dcef;border-radius:100px;background:rgba(255,255,255,.72);font:500 10px 'DM Mono';color:#47536a}
.pill b{display:grid;place-items:center;width:19px;height:19px;border-radius:50%;background:#e5e5ff;color:var(--blue)}
.syn-hero h1{font-size:clamp(49px,6.8vw,94px);line-height:.93;letter-spacing:-.071em;max-width:970px;margin:23px auto 21px}
.gradient{background:linear-gradient(100deg,#4457eb,#9270e8 47%,#e882c4);-webkit-background-clip:text;background-clip:text;color:transparent}
.intro{max-width:635px;margin:auto;color:#536078;font-size:clamp(15px,1.5vw,18px);line-height:1.55}
.ctas{margin:28px 0 29px;display:flex;align-items:center;justify-content:center;gap:13px;font-size:13px;font-weight:700}
.button{display:inline-flex;align-items:center;gap:15px;padding:14px 18px}
.button-create{position:relative;isolation:isolate;overflow:hidden;gap:13px;padding:10px 11px 10px 21px;border:1px solid rgba(255,255,255,.16);border-radius:14px;background:linear-gradient(110deg,#111827,#202b45 64%,#3d3a70);box-shadow:0 5px 0 #090e17,0 12px 28px rgba(42,54,112,.17);transition:transform .28s cubic-bezier(.2,.8,.2,1),box-shadow .28s,background .4s}
.button-create::before{position:absolute;z-index:-1;inset:0;content:"";background:linear-gradient(110deg,transparent 15%,rgba(255,255,255,.15) 48%,transparent 80%);transform:translateX(-110%);transition:transform .65s cubic-bezier(.2,.8,.2,1)}
.button-create:hover{background:linear-gradient(110deg,#111827,#2a3556 60%,#5554a1);box-shadow:0 7px 0 #090e17,0 18px 34px rgba(64,76,151,.24);transform:translateY(-3px) scale(1.025)}
.button-create:hover::before{transform:translateX(110%)}
.button-mark{display:grid;width:30px;height:30px;place-items:center;border:1px solid rgba(255,255,255,.35);border-radius:10px;color:#fff;font-size:20px;font-weight:400;line-height:1;transition:transform .35s cubic-bezier(.2,.8,.2,1),background .3s,border-radius .3s}
.button-create:hover .button-mark{transform:rotate(90deg) scale(1.08);border-radius:50%;background:rgba(255,255,255,.13)}
.outline{border:1px solid #ccd4e2;border-radius:10px;padding:13px 18px;background:#fff}
.outline:hover{background:#f0f2f7}
.people{display:flex;align-items:center;justify-content:center;gap:11px;font-size:12px;font-weight:600}
.avatars{display:flex}
.avatars span{width:25px;height:25px;margin-left:-5px;border:2px solid var(--cloud);border-radius:50%;display:grid;place-items:center;font:500 9px 'DM Mono';color:#fff;background:linear-gradient(135deg,#4873e7,#181c56)}
.avatars span:nth-child(2){background:linear-gradient(135deg,#e19c76,#66354e)}
.avatars span:nth-child(3){background:linear-gradient(135deg,#46ab92,#144a54)}
.avatars span:nth-child(4){background:linear-gradient(135deg,#a876e7,#38214d)}
.avatars span:first-child{margin:0}
.people b{color:#3546d8}
.product-wrap{height:340px;max-width:1000px;margin:42px auto 0;perspective:1500px;position:relative}
.product-shadow{position:absolute;width:70%;height:27%;border-radius:50%;background:#8793c4;filter:blur(38px);opacity:.3;bottom:1%;left:15%}
.product{height:390px;position:relative;text-align:left;background:#0c1220;border:1px solid #263144;border-radius:17px 17px 0 0;padding:12px;transform:rotateX(7deg);transform-origin:bottom;box-shadow:0 -20px 70px rgba(80,89,255,.22),0 31px 45px rgba(34,45,81,.24);transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.product-wrap:hover .product{transform:rotateX(1deg) translateY(-8px)}
.bar{height:35px;display:flex;align-items:center;justify-content:space-between;padding:0 7px 0 3px;color:#b5c0d9;font:10px 'DM Mono'}
.dots{display:flex;gap:5px}
.dots i{height:7px;width:7px;border-radius:50%;background:#3a465f}
.dots i:nth-child(1){background:#ff6b76}
.dots i:nth-child(2){background:#f5c951}
.dots i:nth-child(3){background:#5bdb9f}
.product-inner{height:calc(100% - 35px);padding:38px 6.5%;border-radius:8px;background:radial-gradient(circle at 61% 0,#2d215e,transparent 31%),#101828;color:#f7f8fb;position:relative;overflow:hidden}
.product-inner:after{content:'';position:absolute;width:470px;height:470px;right:-210px;bottom:-280px;border-radius:50%;border:1px solid rgba(201,193,255,.25);box-shadow:0 0 0 45px rgba(180,168,255,.06),0 0 0 105px rgba(180,168,255,.04)}
.port-nav{display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,.11);padding-bottom:22px;position:relative;z-index:1}
.port-logo{font-size:17px;font-weight:700}
.port-menu{display:flex;gap:22px;font:10px 'DM Mono';color:#b6bed2}
.profile{display:grid;grid-template-columns:1.03fr .97fr;gap:7%;padding-top:36px;position:relative;z-index:1}
.overline{font:10px 'DM Mono';letter-spacing:.13em;color:#b9b5ff}
.profile h2{font-size:clamp(27px,3vw,45px);line-height:.98;letter-spacing:-.055em;margin:12px 0}
.profile p{font-size:12px;line-height:1.65;color:#b6bed2;max-width:330px}
.profile button{border:0;border-radius:7px;padding:10px 12px;background:var(--lilac);color:#15112d;font:700 10px 'DM Sans';margin-top:8px}
.project-cards{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding-top:18px}
.mini{height:155px;border:1px solid rgba(255,255,255,.13);background:linear-gradient(145deg,#654cf1,#283a9a);padding:13px;display:flex;flex-direction:column;justify-content:space-between}
.mini:last-child{background:linear-gradient(145deg,#202536,#6840ab)}
.mini small{font:9px 'DM Mono';color:#d5ceff}
.mini strong{font-size:13px}
.logos{padding:31px 24px;display:flex;justify-content:center;align-items:center;gap:clamp(23px,5vw,75px);border-bottom:1px solid var(--line);font:600 12px 'DM Mono';color:#8a95a9}
.logos span:first-child{font-family:'Instrument Serif';font-size:20px;color:#526079}
.section{max-width:1300px;margin:auto;padding:clamp(80px,11vw,150px) clamp(24px,5vw,76px)}
.section-head{display:grid;grid-template-columns:1fr .8fr;gap:13%;align-items:end;margin-bottom:50px}
.kicker{font:500 10px 'DM Mono';letter-spacing:.14em;text-transform:uppercase;color:#58647c}
.section h2{font-size:clamp(37px,5vw,66px);line-height:.96;letter-spacing:-.065em;margin:15px 0 0;max-width:650px}
.section-head p{font-size:15px;line-height:1.65;color:#5e6b80;margin:0;max-width:400px}
.features{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--line);border-left:1px solid var(--line)}
.feature{min-height:245px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:26px;background:#fafbfd;transition:.25s}
.feature:hover{background:#fff;transform:translateY(-5px);box-shadow:0 17px 30px rgba(46,59,88,.1)}
.feature:nth-child(4){grid-column:span 2;background:#111827;color:#fff}
.ico{height:38px;width:38px;border-radius:10px;background:#eceeff;color:#4d60eb;display:grid;place-items:center;font-size:19px}
.feature:nth-child(4) .ico{background:#3546d8;color:#fff}
.feature h3{font-size:20px;letter-spacing:-.8px;margin:47px 0 7px}
.feature p{font-size:12px;line-height:1.65;color:#69758a;margin:0;max-width:310px}
.feature:nth-child(4) p{color:#b6bed2}
.number{float:right;font:10px 'DM Mono';color:#8390a6}
.feature-link{display:inline-flex;gap:8px;margin-top:17px;font-size:12px;font-weight:700;color:#fff}
.showcase{max-width:none;background:#111827;color:#fff;position:relative;overflow:hidden}
.showcase:before{content:'';position:absolute;width:65vw;height:65vw;right:-25vw;top:-45vw;border-radius:50%;background:radial-gradient(circle,#705eee,transparent 67%);opacity:.5}
.showcase .section{position:relative}
.showcase .kicker{color:#c5bfff}
.showcase .section-head p{color:#b6bed2}
.board{display:grid;grid-template-columns:280px 1fr;border:1px solid rgba(255,255,255,.16);background:#171f30;box-shadow:18px 23px 0 rgba(255,255,255,.07)}
.side{padding:35px;border-right:1px solid rgba(255,255,255,.13)}
.side-avatar{width:55px;height:55px;border-radius:15px;display:grid;place-items:center;background:linear-gradient(145deg,#7372ff,#2a225d);font:italic 29px 'Instrument Serif'}
.side h3{font-size:22px;letter-spacing:-.9px;margin:21px 0 3px}
.side p{font-size:12px;line-height:1.65;color:#b6bed2}
.skills{display:flex;flex-wrap:wrap;gap:7px;margin-top:22px}
.skills span{padding:6px 8px;border:1px solid rgba(255,255,255,.17);font:9px 'DM Mono';color:#dce1ed}
.board-main{padding:35px}
.board-title{display:flex;align-items:start;justify-content:space-between}
.board-title span{font:10px 'DM Mono';letter-spacing:.12em;color:#b9b5ff}
.board-title h3{font-size:27px;letter-spacing:-1px;margin:9px 0}
.board-title small{font:10px 'DM Mono';color:#8794aa}
.board-projects{display:grid;grid-template-columns:repeat(2,1fr);gap:13px;margin-top:25px}
.board-project{height:197px;padding:18px;display:flex;flex-direction:column;justify-content:space-between;background:linear-gradient(135deg,#6570ff,#3c2c93);overflow:hidden;position:relative}
.board-project:last-child{background:linear-gradient(135deg,#2c3350,#cf5e93)}
.board-project:after{content:'';position:absolute;width:200px;height:200px;border:1px solid rgba(255,255,255,.25);border-radius:50%;right:-80px;bottom:-125px}
.board-project small{font:10px 'DM Mono';letter-spacing:.1em}
.board-project strong{font-size:18px;letter-spacing:-.6px;position:relative;z-index:1}
.final{text-align:center;padding:clamp(85px,13vw,155px) 24px;background:linear-gradient(135deg,#e9ebff,#faf3fd 55%,#e9f3ff);position:relative}
.final:before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(167,174,208,.19) 1px,transparent 1px),linear-gradient(90deg,rgba(167,174,208,.19) 1px,transparent 1px);background-size:34px 34px;mask-image:linear-gradient(90deg,transparent,black 25%,black 75%,transparent)}
.final>\*{position:relative}
.final h2{font-size:clamp(43px,6.5vw,82px);line-height:.93;letter-spacing:-.07em;max-width:810px;margin:18px auto}
.final p{font-size:15px;color:#58647c;margin:0 auto 28px;max-width:490px}
.footer{background:#0e1523;color:#fff;padding:50px clamp(24px,5vw,76px) 24px}
.footer-top{display:flex;justify-content:space-between;gap:25px}
.footer p{max-width:295px;font-size:12px;line-height:1.65;color:#aeb8ca}
.footer-links{display:flex;gap:27px;font-size:12px;color:#b6bed2}
.footer-links a:hover{color:#b9b5ff}
.foot-bottom{margin-top:42px;padding-top:21px;border-top:1px solid rgba(255,255,255,.13);display:flex;justify-content:space-between;color:#6f7c93;font:10px 'DM Mono'}
@media(max-width:820px){.syn-links{display:none}
.syn-hero{min-height:670px}
.product-wrap{height:280px}
.product{height:350px}
.product-inner{padding:26px 7%}
.section-head{grid-template-columns:1fr;gap:20px}
.features{grid-template-columns:1fr 1fr}
.feature:nth-child(4){grid-column:span 1}
.board{grid-template-columns:1fr}
.side{border-right:0;border-bottom:1px solid rgba(255,255,255,.13)}
.footer-top{display:block}
.footer-links{margin-top:25px}
}
@media(max-width:520px){.syn-nav{padding:0 18px}
.login{display:none}
.syn-hero{padding-top:60px;min-height:630px}
.syn-hero h1{font-size:47px}
.product-wrap{margin-top:36px;height:250px}
.product{height:302px;padding:7px}
.product-inner{padding:20px}
.port-menu{gap:9px;font-size:8px}
.profile{padding-top:23px;gap:4%}
.profile p{font-size:10px}
.project-cards{padding-top:6px}
.mini{height:90px;padding:8px}
.mini strong{font-size:10px}
.features,.board-projects{grid-template-columns:1fr}
.feature{min-height:200px}
.board-main,.side{padding:25px}
.footer-links{flex-wrap:wrap;gap:14px}
.foot-bottom{flex-direction:column;gap:10px}
}

.pill{display:none}
.syn-hero h1{margin-top:0}
.product{display:none}
.product-wrap{height:390px;max-width:830px;border-radius:22px;overflow:visible;background:linear-gradient(120deg,#0b1020,#181b40 55%,#2b1d55);border:1px solid rgba(190,194,255,.35);box-shadow:0 40px 70px rgba(50,57,139,.27),inset 0 1px rgba(255,255,255,.16);transform:rotateX(5deg);transition:transform .55s cubic-bezier(.2,.8,.2,1)}
.product-wrap:hover{transform:rotateX(0deg) translateY(-9px)}
.product-wrap:before{content:'';position:absolute;left:0;top:0;width:44%;height:100%;border-radius:22px 0 0 22px;background:linear-gradient(90deg,rgba(11,16,32,0) 55%,#171a39 100%),url('/syndmarq-profile.png') center 35%/cover no-repeat;filter:saturate(1.04);z-index:2;animation:portraitIn 1.2s cubic-bezier(.2,.8,.2,1) both}
.product-wrap:after{content:'URIEL CASANOVA\\\A Desarrollador de software\\\A\\\A Creo productos digitales funcionales, claros y pensados para resolver problemas reales.\\\A\\\A REACT  TYPESCRIPT  POSTGRESQL';white-space:pre-wrap;position:absolute;left:48%;top:20%;width:42%;color:#f9faff;font:500 12px/1.7 'DM Sans';z-index:3;animation:copyIn 1.1s .18s cubic-bezier(.2,.8,.2,1) both}
.product-wrap .product-shadow{display:none}
.product-wrap{background-image:radial-gradient(circle at 78% 24%,rgba(122,100,255,.65),transparent 25%),radial-gradient(circle at 82% 85%,rgba(225,116,202,.21),transparent 27%),linear-gradient(120deg,#0b1020,#181b40 55%,#2b1d55)}
.product-wrap:hover:before{filter:saturate(1.17) brightness(1.07)}
@keyframes portraitIn{from{opacity:0;transform:translateX(-22px) scale(1.04)}
to{opacity:1;transform:none}
}
@keyframes copyIn{from{opacity:0;transform:translateY(14px)}
to{opacity:1;transform:none}
}
@media(max-width:520px){.product-wrap{height:280px}
.product-wrap:before{width:48%}
.product-wrap:after{left:53%;top:14%;width:41%;font-size:9px;line-height:1.6}
}

.pill{display:none}
.syn-hero h1{margin-top:0}
.product-wrap{height:400px;max-width:850px;background:transparent!important;border:0;box-shadow:none;transform:none;overflow:visible;perspective:1100px}
.product-wrap:hover{transform:none}
.product-wrap .product,.product-wrap .product-shadow{display:none}
.product-wrap:before{content:'';position:absolute!important;left:50%!important;top:40px!important;width:245px!important;height:285px!important;border-radius:26px!important;background:linear-gradient(135deg,rgba(255,255,255,.78),rgba(255,255,255,.08) 28%,transparent 29%),linear-gradient(55deg,#221a58,#735fff 42%,#c2b8ff 48%,#5638be 60%,#171542)!important;clip-path:polygon(50% 0,100% 24%,91% 83%,50% 100%,9% 83%,0 24%)!important;transform:translateX(-50%) rotateX(60deg) rotateZ(-30deg)!important;filter:drop-shadow(0 27px 22px rgba(74,53,171,.35));animation:prismSpin 9s ease-in-out infinite!important;z-index:2}
.product-wrap:after{content:'PERFIL    PROYECTOS    QR\\\A\\\A Todo lo que importa, en un solo enlace.'!important;white-space:pre-wrap;position:absolute!important;left:50%!important;top:153px!important;width:236px!important;padding:15px 17px!important;border-radius:12px!important;color:#eff1ff!important;background:rgba(18,22,51,.78)!important;border:1px solid rgba(190,187,255,.33)!important;box-shadow:0 17px 35px rgba(44,42,105,.25)!important;backdrop-filter:blur(13px)!important;font:500 11px/1.6 'DM Mono'!important;text-align:left!important;transform:translateX(-50%) translateZ(40px)!important;z-index:4!important;animation:cardFloat 5s ease-in-out infinite!important}
.product-wrap{background:radial-gradient(circle at 50% 47%,rgba(109,92,255,.33),transparent 23%),radial-gradient(circle at 22% 50%,rgba(91,179,255,.17),transparent 23%),radial-gradient(circle at 80% 53%,rgba(235,112,194,.14),transparent 23%)!important}
.product-wrap:hover:before{animation-play-state:paused}
.product-wrap:hover:after{animation-play-state:paused}
.product-wrap .product+\*{display:none}
@keyframes prismSpin{0%,100%{transform:translateX(-50%) rotateX(60deg) rotateZ(-30deg)}
50%{transform:translateX(-50%) translateY(-15px) rotateX(62deg) rotateZ(18deg)}
}
@keyframes cardFloat{0%,100%{transform:translateX(-50%) translateY(0)}
50%{transform:translateX(-50%) translateY(-9px)}
}
@media(max-width:520px){.product-wrap{height:300px}
.product-wrap:before{width:180px!important;height:220px!important;top:22px!important}
.product-wrap:after{top:104px!important;width:200px!important;font-size:9px!important;padding:12px!important}
}

.gradient{background:none!important;-webkit-text-fill-color:var(--ink);color:var(--ink);display:inline-block;animation:headlineIn .82s .2s cubic-bezier(.22,.8,.24,1) both}
.syn-hero h1{animation:headlineIn .82s cubic-bezier(.22,.8,.24,1) both}
.intro,.ctas,.people{animation:fadeUp .8s .38s both}
@keyframes headlineIn{from{opacity:0;transform:translateY(25px);filter:blur(7px)}
to{opacity:1;transform:none;filter:none}
}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}
to{opacity:1;transform:none}
}
.product-wrap{height:420px;max-width:980px;background:transparent!important;perspective:1500px}
.product-wrap:before,.product-wrap:after{display:none!important;content:none!important}
.product-wrap .product{display:block!important;height:405px!important;background:#fff!important;border:1px solid #d7deeb!important;border-radius:18px 18px 0 0!important;padding:11px!important;transform:rotateX(6deg)!important;box-shadow:0 42px 55px rgba(31,47,83,.16),0 -8px 35px rgba(107,126,212,.08)!important;animation:windowIn 1s .15s cubic-bezier(.22,.8,.24,1) both!important}
.product-wrap:hover .product{transform:rotateX(0deg) translateY(-10px)!important}
.product-wrap .bar{height:31px!important;color:#8490a4!important}
.product-wrap .dots i{background:#d7dce6!important}
.product-wrap .dots i:nth-child(1){background:#ff7a82!important}
.product-wrap .dots i:nth-child(2){background:#ffce62!important}
.product-wrap .dots i:nth-child(3){background:#5cce99!important}
.product-wrap .product-inner{height:calc(100% - 31px)!important;background:linear-gradient(120deg,#ffffff,#f5f7fb)!important;color:#131b2c!important;padding:30px 6.5%!important;border-radius:9px!important}
.product-wrap .product-inner:after{width:440px!important;height:440px!important;right:-190px!important;bottom:-290px!important;border-color:#e0e5f2!important;box-shadow:0 0 0 45px rgba(100,115,190,.05),0 0 0 105px rgba(100,115,190,.03)!important}
.product-wrap .port-nav{border-color:#e5e9f1!important}
.product-wrap .port-logo{font-size:17px!important;color:#131b2c!important}
.product-wrap .port-menu{color:#78859b!important}
.product-wrap .overline{color:#5367e7!important}
.product-wrap .profile h2{color:#131b2c!important}
.product-wrap .profile p{color:#637087!important}
.product-wrap .profile button{background:#151e31!important;color:#fff!important;box-shadow:0 3px 0 #aeb9cf}
.product-wrap .mini{height:150px!important;background:linear-gradient(140deg,#e9edff,#bfc8ff)!important;border-color:#d9e0f0!important;color:#17214a!important;box-shadow:0 10px 22px rgba(53,71,145,.12)!important}
.product-wrap .mini:last-child{background:linear-gradient(140deg,#172033,#49597b)!important;color:#fff!important}
.product-wrap .mini small{color:#5267df!important}
.product-wrap .mini:last-child small{color:#cdd5ff!important}
@keyframes windowIn{from{opacity:0;transform:rotateX(11deg) translateY(26px)}
to{opacity:1;transform:rotateX(6deg) translateY(0)}
}
@media(max-width:520px){.product-wrap{height:285px}
.product-wrap .product{height:295px!important}
.product-wrap .product-inner{padding:18px!important}
.product-wrap .profile{padding-top:18px!important}
.product-wrap .mini{height:90px!important}
}

.product-wrap{height:410px!important;max-width:890px!important;background:radial-gradient(circle at 50% 50%,rgba(94,111,255,.19),transparent 31%),radial-gradient(circle at 50% 55%,rgba(224,116,207,.09),transparent 48%)!important;transform:none!important}
.product-wrap .product,.product-wrap .product-shadow{display:none!important}
.product-wrap:before{display:block!important;content:''!important;position:absolute!important;left:50%!important;top:18px!important;width:305px!important;height:305px!important;border-radius:22px!important;background:linear-gradient(90deg,transparent 42%,rgba(123,111,255,.45) 50%,transparent 58%),repeating-linear-gradient(90deg,#141b2b 0 13px,#fff 13px 21px,#141b2b 21px 31px,#fff 31px 40px),repeating-linear-gradient(#141b2b 0 15px,#fff 15px 25px,#141b2b 25px 35px,#fff 35px 45px)!important;background-blend-mode:screen,multiply,multiply!important;box-shadow:inset 0 0 0 14px #fff,inset 0 0 0 16px #141b2b,0 28px 55px rgba(41,50,110,.22)!important;transform:translateX(-50%) rotate(-4deg)!important;z-index:2!important;animation:qrFloat 6s ease-in-out infinite,qrScan 3.4s linear infinite!important}
.product-wrap:after{display:block!important;content:'portavia.app/u/uriel\\\A\\\A Tu portafolio, listo para compartir.'!important;white-space:pre-wrap;position:absolute!important;left:50%!important;top:284px!important;width:305px!important;padding:14px 17px!important;border-radius:11px!important;background:rgba(16,24,39,.93)!important;color:#fff!important;font:500 11px/1.6 'DM Mono'!important;text-align:center!important;transform:translateX(-50%) rotate(-1deg)!important;z-index:3!important;box-shadow:0 16px 30px rgba(32,40,93,.18)!important;animation:qrLabel 6s ease-in-out infinite!important}
.product-wrap:hover:before,.product-wrap:hover:after{animation-play-state:paused!important}
.product-wrap:hover:before{transform:translateX(-50%) rotate(0)!important}
@keyframes qrFloat{0%,100%{transform:translateX(-50%) translateY(0) rotate(-4deg)}
50%{transform:translateX(-50%) translateY(-13px) rotate(2deg)}
}
@keyframes qrLabel{0%,100%{transform:translateX(-50%) translateY(0) rotate(-1deg)}
50%{transform:translateX(-50%) translateY(-7px) rotate(1deg)}
}
@keyframes qrScan{0%,100%{background-position:0 0,0 0,0 0}
50%{background-position:305px 0,0 0,0 0}
}
@media(max-width:520px){.product-wrap{height:310px!important}
.product-wrap:before{width:218px!important;height:218px!important;top:12px!important}
.product-wrap:after{top:203px!important;width:228px!important;font-size:9px!important}
}

.product-wrap .mini{position:relative!important;overflow:hidden!important;animation:assembleCard .8s .65s cubic-bezier(.18,.89,.32,1.25) both!important}
.product-wrap .mini:last-child{animation-delay:.9s!important}
.product-wrap .mini strong{font-size:0!important}
.product-wrap .mini strong:after{content:'Tu universo\\\A profesional';white-space:pre-wrap;font-size:14px;line-height:1.15;letter-spacing:-.4px;position:absolute;left:13px;bottom:13px}
.product-wrap .mini:last-child strong:after{content:'Una URL\\\A con intención';color:#fff}
.product-wrap .mini:before{content:'';position:absolute;width:110px;height:110px;border:1px solid rgba(70,82,180,.2);border-radius:50%;right:-45px;top:-55px;transition:transform .4s}
.product-wrap:hover .mini:before{transform:scale(1.5) rotate(70deg)}
.product-wrap .profile h2{animation:revealName .9s .25s cubic-bezier(.2,.8,.2,1) both}
.product-wrap .profile p,.product-wrap .profile button{animation:revealName .8s .48s cubic-bezier(.2,.8,.2,1) both}
@keyframes assembleCard{from{opacity:0;transform:translateY(35px) rotate(4deg);filter:blur(5px)}
to{opacity:1;transform:none;filter:none}
}
@keyframes revealName{from{opacity:0;transform:translateX(-17px)}
to{opacity:1;transform:none}
}

.product-wrap{height:420px!important;max-width:980px!important;background:transparent!important;perspective:1500px}
.product-wrap:before,.product-wrap:after{display:none!important;content:none!important}
.product-wrap .product{display:block!important;height:405px!important;background:#fff!important;border:1px solid #d7deeb!important;border-radius:18px 18px 0 0!important;padding:11px!important;transform:rotateX(6deg)!important;box-shadow:0 42px 55px rgba(31,47,83,.16),0 -8px 35px rgba(107,126,212,.08)!important;animation:windowIn 1s .15s cubic-bezier(.22,.8,.24,1) both!important}
.product-wrap:hover .product{transform:rotateX(0deg) translateY(-10px)!important}
.product-wrap .bar{height:31px!important;color:#8490a4!important}
.product-wrap .product-inner{height:calc(100% - 31px)!important;background:linear-gradient(120deg,#ffffff,#f5f7fb)!important;color:#131b2c!important;padding:30px 6.5%!important;border-radius:9px!important}
.product-wrap .product-inner:after{width:440px!important;height:440px!important;right:-190px!important;bottom:-290px!important;border-color:#e0e5f2!important;box-shadow:0 0 0 45px rgba(100,115,190,.05),0 0 0 105px rgba(100,115,190,.03)!important}
.product-wrap .port-nav{border-color:#e5e9f1!important}
.product-wrap .port-logo,.product-wrap .profile h2{color:#131b2c!important}
.product-wrap .port-menu,.product-wrap .profile p{color:#637087!important}
.product-wrap .overline{color:#5367e7!important}
.product-wrap .profile button{background:#151e31!important;color:#fff!important;box-shadow:0 3px 0 #aeb9cf!important}
.product-wrap .mini{height:150px!important;background:linear-gradient(140deg,#e9edff,#bfc8ff)!important;border-color:#d9e0f0!important;color:#17214a!important;box-shadow:0 10px 22px rgba(53,71,145,.12)!important}
.product-wrap .mini:last-child{background:linear-gradient(140deg,#172033,#49597b)!important;color:#fff!important}
.product-wrap .mini small{color:#5267df!important}
.product-wrap .mini:last-child small{color:#cdd5ff!important}
@media(max-width:520px){.product-wrap{height:285px!important}
.product-wrap .product{height:295px!important}
.product-wrap .product-inner{padding:18px!important}
.product-wrap .profile{padding-top:18px!important}
.product-wrap .mini{height:90px!important}
}

.product-wrap .mini{border:0!important;border-radius:12px 2px 12px 2px!important;background:#f8f9ff!important;color:#17213a!important;box-shadow:inset 0 0 0 1px #cbd4eb,8px 9px 0 #dce2f0!important;overflow:hidden!important}
.product-wrap .mini:last-child{border-radius:2px 12px 2px 12px!important;background:#161d2c!important;color:#f8f9ff!important;box-shadow:inset 0 0 0 1px #263554,8px 9px 0 #ccd3e1!important}
.product-wrap .mini:before{width:138px!important;height:138px!important;right:-55px!important;top:-68px!important;border:1px solid #92a3e9!important;box-shadow:0 0 0 15px rgba(147,163,233,.1)!important}
.product-wrap .mini:last-child:before{border-color:#7c8fb8!important;box-shadow:0 0 0 15px rgba(125,144,185,.1)!important}
.product-wrap .mini small{font-size:0!important;color:inherit!important}
.product-wrap .mini small:after{content:'PORTAFOLIO / 01';font:500 9px 'DM Mono';letter-spacing:.08em;color:#5369cf}
.product-wrap .mini:last-child small:after{content:'ENLACE / 02';color:#aebcf1}
.product-wrap .mini strong:after{content:'Perfil que\\\A conecta'!important;font-size:15px!important;line-height:1.05!important;left:15px!important;bottom:16px!important}
.product-wrap .mini:last-child strong:after{content:'Una página\\\A para compartir'!important;color:#fff!important}
.product-wrap .mini:after{content:''!important;position:absolute!important;left:15px!important;right:15px!important;bottom:11px!important;height:2px!important;background:#6577de!important;transform:scaleX(.45)!important;transform-origin:left!important;transition:transform .35s!important}
.product-wrap .mini:last-child:after{background:#b8c4ff!important}
.product-wrap:hover .mini:after{transform:scaleX(1)!important}

.ico{position:relative!important;overflow:visible!important;font-size:0!important;background:transparent!important;color:#5367e7!important}
.ico:before,.ico:after{content:''!important;position:absolute!important;display:block!important}
.feature:nth-child(1) .ico:before{width:12px;height:12px;left:13px;top:7px;border:1.7px solid currentColor;border-radius:50%;animation:avatarBreath 3s ease-in-out infinite}
.feature:nth-child(1) .ico:after{width:21px;height:10px;left:8px;bottom:6px;border:1.7px solid currentColor;border-bottom:0;border-radius:14px 14px 0 0}
.feature:nth-child(2) .ico:before{width:14px;height:14px;left:9px;top:8px;border:1.7px solid currentColor;border-radius:3px;box-shadow:5px -5px 0 -1px #f7f8ff,5px -5px 0 0 currentColor}
.feature:nth-child(2) .ico:after{width:7px;height:2px;left:13px;top:14px;background:currentColor;box-shadow:0 4px 0 currentColor}
.feature:nth-child(3) .ico:before{width:18px;height:18px;left:9px;top:9px;border:1.7px solid currentColor;border-radius:50%;border-top-color:transparent;animation:orbit 3s linear infinite}
.feature:nth-child(3) .ico:after{width:5px;height:5px;left:17px;top:5px;border-radius:50%;background:currentColor}
.feature:nth-child(4) .ico:before{width:16px;height:16px;left:10px;top:10px;border:2px solid currentColor;border-radius:2px;box-shadow:7px -7px 0 -5px #3546d8}
.feature:nth-child(4) .ico:after{width:4px;height:4px;left:16px;top:16px;background:currentColor;box-shadow:6px 0 currentColor,0 6px currentColor;animation:qrBlink 2.5s steps(2) infinite}
.feature:nth-child(5) .ico:before{width:10px;height:10px;left:13px;top:13px;border:2px solid currentColor;border-radius:50%;box-shadow:0 0 0 5px rgba(82,103,255,.18);animation:pulse 2.2s ease-out infinite}
.feature:nth-child(5) .ico:after{width:2px;height:2px;left:18px;top:18px;border-radius:50%;background:currentColor}
.feature:hover .ico{transform:translateY(-3px)}
.feature:hover .ico:before{animation-duration:1.2s}
@keyframes avatarBreath{50%{transform:translateY(-2px)}
}
@keyframes orbit{to{transform:rotate(360deg)}
}
@keyframes qrBlink{50%{opacity:.24}
}
@keyframes pulse{70%{box-shadow:0 0 0 10px rgba(82,103,255,0)}
}
.feature .ico svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.feature:nth-child(3) .ico,.feature:nth-child(4) .ico,.feature:nth-child(5) .ico{display:grid;background:#f0edff!important;color:#6656c8!important}
.feature:nth-child(3) .ico:before,.feature:nth-child(3) .ico:after,.feature:nth-child(4) .ico:before,.feature:nth-child(4) .ico:after,.feature:nth-child(5) .ico:before,.feature:nth-child(5) .ico:after{display:none!important;content:none!important}
.feature:nth-child(4){background:linear-gradient(125deg,#eaf1ff,#edf5f5)!important;color:#17213a!important}
.feature:nth-child(4):hover{background:linear-gradient(125deg,#e4ecff,#e8f5f1)!important}
.feature:nth-child(4) .ico{background:#dfe8ff!important;color:#5068cc!important}
.feature:nth-child(4) h3{color:#17213a!important}
.feature:nth-child(4) p{color:#647187!important}
.feature:nth-child(4) .number{color:#7180a1!important}
.feature:nth-child(4) .feature-link{color:#5369c8!important}
.feature:nth-child(3) .ico svg{animation:brushTilt 3.2s ease-in-out infinite}
.feature:nth-child(5) .ico svg{animation:eyesLook 4s ease-in-out infinite}
.feature:hover .ico svg{animation-duration:1.3s}
@keyframes brushTilt{0%,100%{transform:rotate(-7deg)}50%{transform:rotate(7deg) translateY(-1px)}}
@keyframes eyesLook{0%,100%{transform:translateX(0)}35%{transform:translateX(2px)}70%{transform:translateX(-1px)}}

.showcase .section-head>div .kicker{font-size:0!important}
.showcase .section-head>div .kicker:after{content:'LISTO PARA COMPARTIR';font:500 10px 'DM Mono';letter-spacing:.14em;color:#c5bfff}
.showcase .section-head h2{font-size:0!important;max-width:760px!important}
.showcase .section-head h2:after{content:'Un enlace. Todas tus puertas abiertas.';font-size:clamp(37px,5vw,66px);line-height:.96;letter-spacing:-.065em}
.showcase .section-head p{font-size:0!important}
.showcase .section-head p:after{content:'Tu perfil se adapta a donde aparece una oportunidad: un CV, una entrevista, una red o un mensaje.';font-size:15px;line-height:1.65;color:#b6bed2}
.board{background:linear-gradient(120deg,#171f30,#111728)!important}
.side{position:relative!important;background:linear-gradient(165deg,#202b45,#141b2b)!important;overflow:hidden}
.side-avatar{font-size:0!important;border-radius:8px!important;background:repeating-linear-gradient(90deg,#cbd2ff 0 5px,transparent 5px 9px),repeating-linear-gradient(#cbd2ff 0 5px,transparent 5px 9px),#fff!important;box-shadow:0 0 0 7px rgba(190,192,255,.11)!important;animation:qrPulse 3s ease-in-out infinite}
.side h3{font-size:0!important}
.side h3:after{content:'portavia.app/u/uriel';font-size:15px;letter-spacing:-.4px}
.side p{font-size:0!important}
.side p:after{content:'Un lugar para compartir quién eres y lo que sabes hacer.';font-size:12px;line-height:1.65;color:#b6bed2}
.skills{font-size:0!important}
.skills:after{content:'LINK  QR  CONTACTO';font:9px 'DM Mono';letter-spacing:.08em;color:#cdd5ff;border:1px solid rgba(255,255,255,.17);padding:7px 8px}
.board-title>div>span{font-size:0!important}
.board-title>div>span:after{content:'IDENTIDAD EN MOVIMIENTO';font:10px 'DM Mono';letter-spacing:.12em;color:#b9b5ff}
.board-title h3{font-size:0!important}
.board-title h3:after{content:'Comparte sin explicar más';font-size:27px;letter-spacing:-1px}
.board-title small{font-size:0!important}
.board-title small:after{content:'03 FORMATOS';font:10px 'DM Mono';color:#8794aa}
.board-project{animation:shareIn .8s .2s cubic-bezier(.18,.89,.32,1.2) both!important}
.board-project:last-child{animation-delay:.42s!important;background:linear-gradient(135deg,#3c315f,#765295)!important}
.board-project small{font-size:0!important}
.board-project:first-child small:after{content:'TU CV / 01';font:10px 'DM Mono';letter-spacing:.1em}
.board-project:last-child small:after{content:'TUS REDES / 02';font:10px 'DM Mono';letter-spacing:.1em}
.board-project strong{font-size:0!important}
.board-project strong:after{white-space:pre-wrap;font-size:18px;letter-spacing:-.6px}
.board-project:first-child strong:after{content:'Una presentación\\\A lista para enviar'}
.board-project:last-child strong:after{content:'Comparte una URL\\\A que sí dice algo'}
@keyframes qrPulse{50%{transform:scale(1.06);box-shadow:0 0 0 12px rgba(190,192,255,.04)}
}
@keyframes shareIn{from{opacity:0;transform:translateY(20px) scale(.94)}
to{opacity:1;transform:none}
}

/* Sección de oportunidades: superficie clara, relato editorial y recorrido continuo. */
.syn { padding-top: 76px; }
.syn-nav {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}
.showcase {
  isolation: isolate;
  color: var(--ink) !important;
  border-top: 1px solid #dbe3f0;
  border-bottom: 1px solid #dbe3f0;
  background:
    linear-gradient(rgba(169, 182, 207, .2) 1px, transparent 1px),
    linear-gradient(90deg, rgba(169, 182, 207, .2) 1px, transparent 1px),
    linear-gradient(135deg, #eef2fa 0%, #f9fbfe 54%, #edf4ff 100%) !important;
  background-size: 34px 34px, 34px 34px, auto !important;
}
.showcase::before {
  z-index: -1;
  width: 56vw;
  height: 56vw;
  right: -20vw;
  top: -38vw;
  opacity: 1;
  background: radial-gradient(circle, rgba(99, 112, 243, .18), transparent 67%) !important;
}
.showcase .kicker,
.showcase .section-head>div .kicker { color: #596bd6 !important; font-size: 10px !important; }
.showcase .section-head>div .kicker::after,
.showcase .section-head h2::after,
.showcase .section-head p::after { content: none !important; }
.showcase .section-head h2 { max-width: 760px !important; font-size: clamp(40px, 5vw, 68px) !important; }
.showcase .section-head p { color: #5b6880 !important; font-size: 15px !important; }

.journey {
  display: grid;
  grid-template-columns: minmax(260px, .82fr) 1.18fr;
  gap: clamp(42px, 8vw, 120px);
  align-items: center;
  padding: clamp(34px, 5vw, 68px) 0;
  border-top: 1px solid #cfd9ea;
  border-bottom: 1px solid #cfd9ea;
}
.journey-intro { max-width: 360px; padding: clamp(25px, 3vw, 38px); border: 1px solid #d5def1; border-radius: 16px; background: linear-gradient(145deg, #edf2ff, #f8faff); box-shadow: 0 18px 35px rgba(49, 68, 121, .06); }
.journey-label { color: #6a78a0; font: 500 10px "DM Mono"; letter-spacing: .11em; }
.journey-intro h3 { margin: 17px 0 14px; font-size: clamp(28px, 3.2vw, 43px); line-height: .98; letter-spacing: -.06em; }
.journey-intro p { margin: 0; color: #5f6c82; font-size: 14px; line-height: 1.7; }
.journey-steps-wrap { position: relative; padding: 9px 0 38px; }
.journey-steps-wrap::before { position: absolute; z-index: 0; top: 70px; right: 3%; left: 2%; height: 180px; content: ""; opacity: .7; background: url("data:image/svg+xml,%3Csvg width='760' height='180' viewBox='0 0 760 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 28 C104 26 122 104 208 94 S 308 20 382 69 S 503 152 576 111 S 666 45 752 139' fill='none' stroke='%23545b69' stroke-width='2' stroke-linecap='round' stroke-dasharray='3 8'/%3E%3Ccircle cx='8' cy='28' r='5' fill='%23657de9'/%3E%3Ccircle cx='752' cy='139' r='5' fill='%233caa8c'/%3E%3C/svg%3E") center / 100% 100% no-repeat; pointer-events: none; }
.journey-steps { position: relative; z-index: 1; display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(16px, 2.5vw, 32px); margin: 0; padding: 0; list-style: none; }
.journey-step { position: relative; min-width: 0; animation: folder-arrive .75s cubic-bezier(.2,.85,.25,1) both; }
.journey-step:nth-child(2) { animation-delay: .13s; }.journey-step:nth-child(3) { animation-delay: .26s; }
.journey-step:nth-child(1) { --accent:#657de9; --ink:#4459c1; }.journey-step:nth-child(2) { --accent:#a76bd2; --ink:#8751af; margin-top: 60px; }.journey-step:nth-child(3) { --accent:#3caa8c; --ink:#25866e; margin-top: 116px; }
.folder-art { position: relative; height: 139px; margin: 20px 3px 42px; border: 3px solid #23262d; border-radius: 7px 17px 17px 17px; background: #f7d67f; box-shadow: 0 14px 0 rgba(35,38,45,.08), 0 21px 28px rgba(50, 66, 114, .10); isolation: isolate; transition: transform .38s cubic-bezier(.2,.8,.2,1), box-shadow .38s; }
.folder-art::before { position: absolute; z-index: -1; top: -17px; left: -3px; width: 46%; height: 25px; content: ""; border: 3px solid #23262d; border-bottom: 0; border-radius: 9px 11px 0 0; background: #f8dc92; }
.folder-art::after { position: absolute; z-index: 2; top: 30px; right: -3px; bottom: -3px; left: -3px; content: ""; border: 3px solid #23262d; border-radius: 6px 14px 15px 15px; background: linear-gradient(145deg, rgba(255,255,255,.18), transparent 48%), #f5d178; box-shadow: inset 0 1px rgba(255,255,255,.5); }
.folder-number { position: absolute; z-index: 3; bottom: 13px; left: 16px; color: rgba(35,38,45,.55); font: 700 10px "DM Mono"; letter-spacing: .1em; }
.folder-document { position: absolute; z-index: 4; top: -8px; right: 17px; width: 65px; height: 89px; padding: 32px 8px 8px; overflow: hidden; border: 3px solid #23262d; border-radius: 4px 4px 9px 9px; color: #343946; background: #f7f7fc; box-shadow: 4px 5px 0 rgba(35,38,45,.12); transform: rotate(4deg); transform-origin: center bottom; transition: width .52s cubic-bezier(.2,.8,.18,1), height .52s cubic-bezier(.2,.8,.18,1), top .52s cubic-bezier(.2,.8,.18,1), right .52s cubic-bezier(.2,.8,.18,1), transform .52s cubic-bezier(.2,.8,.18,1), box-shadow .52s; }
.folder-document::before { position: absolute; top: 14px; left: 10px; width: 31px; height: 4px; content: ""; background: #b8bfcb; box-shadow: 0 10px 0 #d3d8e0, 0 20px 0 #d3d8e0; }
.folder-photo { position: absolute; right: 8px; bottom: 8px; width: 33px; height: 39px; overflow: hidden; border: 2px solid #23262d; border-radius: 50% 50% 7px 7px; background: #dee3ee; transition: opacity .2s; }.folder-photo::before { position: absolute; z-index: 2; top: 5px; left: 9px; width: 12px; height: 12px; content: ""; border: 2px solid #23262d; border-radius: 50%; background: #ffd0bc; }.folder-photo::after { position: absolute; bottom: -4px; left: 5px; width: 20px; height: 23px; content: ""; border: 2px solid #23262d; border-radius: 50% 50% 3px 3px; background: #5e6072; }
.folder-clip { position: absolute; z-index: 6; top: -15px; right: 36px; width: 19px; height: 22px; border: 3px solid #23262d; border-radius: 4px; background: #5e6072; box-shadow: 0 -10px 0 -3px #f7d67f, 0 -13px 0 -1px #23262d; transition: transform .45s, opacity .2s; }
.folder-copy { display: grid; gap: 7px; opacity: 0; font-size: 10px; line-height: 1.35; transform: translateY(8px); transition: opacity .22s .2s, transform .32s .2s; }.folder-copy b { color: var(--ink); font-size: 12px; line-height: 1.1; }.folder-copy small { font-size: 10px; }
.journey-caption { position: relative; padding: 0 3px 0 21px; }
.journey-caption::before { position: absolute; top: -38px; left: 2px; width: 1px; height: 30px; content: ""; background: var(--accent); opacity: .58; }
.journey-caption::after { position: absolute; top: -42px; left: -1px; width: 7px; height: 7px; content: ""; border: 2px solid #f8faff; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 1px var(--accent); }
.journey-caption h4 { display: inline-block; margin: 0 0 10px; padding-bottom: 6px; border-bottom: 2px solid color-mix(in srgb, var(--accent), white 50%); color: var(--ink); font-size: 18px; letter-spacing: -.7px; }
.journey-step:hover .folder-art { box-shadow: 0 17px 0 rgba(35,38,45,.06), 0 28px 30px rgba(50,66,114,.14); transform: translateY(-7px) rotate(-.4deg); }.journey-step:hover .folder-document { top: -52px; right: 8%; width: 84%; height: 165px; padding: 49px 17px 14px; border-radius: 6px; box-shadow: 7px 9px 0 rgba(35,38,45,.13); transform: rotate(0); }.journey-step:hover .folder-document::before,.journey-step:hover .folder-photo { opacity: .16; }.journey-step:hover .folder-clip { opacity: 0; transform: translateY(-8px); }.journey-step:hover .folder-copy { opacity: 1; transform: translateY(0); }
.journey-step:hover .journey-caption h4 { color: var(--accent); }
@media(max-width:820px) { .journey { grid-template-columns: 1fr; gap: 48px; }.journey-step:nth-child(2) { margin-top: 40px; }.journey-step:nth-child(3) { margin-top: 80px; } }
@media(max-width:560px) { .journey-steps-wrap::before { display: none; }.journey-steps { grid-template-columns: 1fr; gap: 32px; }.journey-step:nth-child(2),.journey-step:nth-child(3) { margin-top: 0; }.folder-art { max-width: 260px; }.folder-document { right: 28%; }.journey-step:hover .folder-document { right: 7%; max-width: 245px; } }
@keyframes folder-arrive { from { opacity: 0; transform: translateY(24px) scale(.97); filter: blur(5px); } to { opacity: 1; transform: none; filter: none; } }
@media(prefers-reduced-motion:reduce) { .journey-step { animation: none !important; }.folder-art,.folder-document,.folder-copy { transition: none !important; } }

.how-it-works { position: relative; border-bottom: 1px solid #dce4f0; background: #f8faff; }
.how-it-works::before { position: absolute; top: 0; left: 0; width: 100%; height: 1px; content: ""; background: linear-gradient(90deg, transparent, #aebdf0, transparent); }
.how-it-works .section { padding-top: clamp(82px, 10vw, 132px); padding-bottom: clamp(82px, 10vw, 132px); }
.how-grid { display: grid; grid-template-columns: .8fr 1.2fr; gap: clamp(44px, 10vw, 150px); align-items: end; }
.how-copy .kicker { color: #5669d8; }
.how-copy h2 { max-width: 520px; margin: 15px 0 18px; font-size: clamp(40px, 5vw, 67px); line-height: .96; letter-spacing: -.066em; }
.how-copy > p { max-width: 365px; margin: 0; color: #5c6a81; font-size: 15px; line-height: 1.7; }
.how-steps { margin: 0; padding: 0; list-style: none; border-top: 1px solid #cfd9e9; }
.how-step { display: grid; grid-template-columns: 58px 1fr auto; gap: 20px; align-items: center; min-height: 108px; border-bottom: 1px solid #cfd9e9; transition: padding .25s, background .25s; }
.how-step:hover { padding-right: 16px; padding-left: 16px; background: #f0f3ff; }
.how-number { color: #5369db; font: 500 11px "DM Mono"; }
.how-step h3 { margin: 0 0 5px; font-size: 20px; letter-spacing: -.7px; }
.how-step p { max-width: 330px; margin: 0; color: #6a778b; font-size: 12px; line-height: 1.65; }
.how-check { display: grid; width: 34px; height: 34px; place-items: center; border: 1px solid #d5e8dc; border-radius: 50%; color: #3c9a70; background: #edf8f1; transition: transform .3s cubic-bezier(.2,.8,.2,1), background .3s, box-shadow .3s; }
.how-check svg { width: 19px; height: 19px; overflow: visible; }
.how-check circle { fill: none; stroke: currentColor; stroke-width: 1.5; opacity: .34; }
.how-check path { fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 18; stroke-dashoffset: 0; animation: checkDraw .7s cubic-bezier(.2,.8,.2,1) both; }
.how-step:nth-child(2) .how-check path { animation-delay: .16s; }.how-step:nth-child(3) .how-check path { animation-delay: .32s; }
.how-step:hover .how-check { background: #dff3e7; box-shadow: 0 0 0 6px rgba(73,166,119,.09); transform: rotate(-8deg) scale(1.12); }
@keyframes checkDraw { from { stroke-dashoffset: 18; } to { stroke-dashoffset: 0; } }
@media(max-width:820px) { .how-grid { grid-template-columns: 1fr; gap: 42px; } }
@media(max-width:520px) { .how-step { grid-template-columns: 43px 1fr auto; gap: 12px; padding: 20px 0; }.how-check { width: 29px; height: 29px; }.how-step:hover { padding-right: 8px; padding-left: 8px; } }
@media(prefers-reduced-motion:reduce) { .button-create,.button-mark,.how-check,.how-check path,.feature:nth-child(3) .ico svg,.feature:nth-child(5) .ico svg { animation:none!important; transition:none!important; } }

/* Responsive pass: keep every section readable from narrow phones to tablets. */
@media(max-width:700px){
  .syn,.syn *,.syn *::before,.syn *::after{box-sizing:border-box}
  .syn{width:100%;max-width:100%;min-width:0;overflow-x:clip;padding-top:66px}
  .syn-nav{height:66px;padding-inline:clamp(14px,4vw,22px)}
  .syn-brand{gap:7px;font-size:18px;white-space:nowrap}
  .syn-mark{width:26px;height:26px;font-size:21px}
  .syn-actions{gap:8px}
  .syn-actions .dark-btn{padding:9px 12px;font-size:11px;white-space:nowrap}
  .syn-hero{width:100%;min-height:0;padding:clamp(55px,12vw,78px) clamp(18px,5vw,30px) 40px}
  .syn-hero h1{max-width:12ch;margin:0 auto 18px;font-size:clamp(43px,11vw,65px);line-height:.96;letter-spacing:-.065em}
  .intro{max-width:38rem;font-size:clamp(15px,4vw,17px);line-height:1.6}
  .ctas{width:100%;margin:23px auto 24px;flex-direction:column;align-items:center;gap:12px}
  .ctas>.button,.ctas>.outline{width:min(100%,340px);min-height:52px;justify-content:center;white-space:nowrap}
  .button-create{padding:9px 12px 9px 18px}
  .people{max-width:440px;margin:0 auto;flex-wrap:wrap;row-gap:10px;font-size:11px;text-align:center}
  .product-wrap{width:100%;max-width:560px!important;height:auto!important;min-height:0;margin:32px auto 0!important;perspective:none!important;transform:none!important}
  .product-wrap:hover{transform:none!important}
  .product-wrap .product{display:block!important;width:100%;height:auto!important;min-height:0!important;padding:7px!important;border-radius:15px!important;transform:none!important;animation:none!important;box-shadow:0 22px 38px rgba(31,47,83,.14)!important}
  .product-wrap .bar{height:27px!important;padding-inline:3px;font-size:8px!important}
  .product-wrap .product-inner{height:auto!important;min-height:0!important;padding:17px 15px!important;overflow:hidden;border-radius:9px!important}
  .product-wrap .product-inner:after{width:230px!important;height:230px!important;right:-145px!important;bottom:-175px!important}
  .product-wrap .port-nav{gap:8px;padding-bottom:12px}
  .product-wrap .port-logo{font-size:14px!important;white-space:nowrap}
  .product-wrap .port-menu{gap:clamp(6px,2.5vw,13px)!important;font-size:clamp(7px,2.2vw,9px)!important;white-space:nowrap}
  .product-wrap .profile{grid-template-columns:minmax(0,1fr)!important;gap:12px!important;padding-top:18px!important}
  .product-wrap .profile h2{margin:8px 0;font-size:clamp(27px,8vw,36px)!important}
  .product-wrap .profile p{max-width:38ch;font-size:11px!important}
  .product-wrap .profile button{margin-top:4px;padding:8px 10px;font-size:9px}
  .product-wrap .project-cards{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;padding-top:5px}
  .product-wrap .mini{height:100px!important;min-width:0;padding:10px!important;box-shadow:inset 0 0 0 1px #cbd4eb,4px 5px 0 #dce2f0!important}
  .product-wrap .mini:last-child{box-shadow:inset 0 0 0 1px #263554,4px 5px 0 #ccd3e1!important}
  .product-wrap .mini small:after{font-size:7px!important}
  .product-wrap .mini strong:after{left:9px!important;bottom:10px!important;font-size:12px!important;overflow-wrap:anywhere}
  .logos{flex-wrap:wrap;justify-content:center;gap:11px 17px;padding:22px 16px;text-align:center;font-size:9px}
  .logos span:first-child{width:100%;font-size:18px}
  .section{width:100%;padding:clamp(64px,14vw,92px) clamp(19px,5vw,30px)}
  .section-head{grid-template-columns:minmax(0,1fr);gap:15px;margin-bottom:30px}
  .section-head p{font-size:14px}
  .section h2,.how-copy h2,.showcase .section-head h2{font-size:clamp(35px,9.4vw,50px)!important;line-height:.99;letter-spacing:-.06em}
  .features{grid-template-columns:minmax(0,1fr);border-left:0}
  .feature,.feature:nth-child(4){grid-column:auto;min-height:0;padding:22px;border-left:1px solid var(--line)}
  .feature h3{margin:31px 0 8px;font-size:19px}
  .feature p{font-size:13px}
  .showcase .section-head h2{max-width:15ch!important}
  .journey{grid-template-columns:minmax(0,1fr);gap:30px;padding-block:30px}
  .journey-intro{max-width:none;padding:clamp(22px,6vw,30px)}
  .journey-intro h3{font-size:clamp(29px,8.5vw,39px)}
  .journey-intro p{font-size:13px}
  .journey-steps-wrap{padding:12px 0 25px}
  .journey-steps-wrap::before{display:block;top:15px;right:auto;bottom:36px;left:13px;width:2px;height:auto;opacity:.55;background:repeating-linear-gradient(to bottom,#6c7890 0 3px,transparent 3px 9px);}
  .journey-steps{grid-template-columns:minmax(0,1fr);gap:30px;padding-left:34px}
  .journey-step:nth-child(2),.journey-step:nth-child(3){margin-top:0}
  .folder-art{width:min(100%,210px);height:118px;margin:18px 0 26px}
  .folder-document{top:19px;right:10%;width:77%;height:79px;padding:37px 9px 7px;transform:none}
  .folder-document::before{top:10px;left:8px;width:27px;height:3px;box-shadow:0 8px 0 #d3d8e0,0 16px 0 #d3d8e0}
  .folder-photo{opacity:.18}
  .folder-clip{opacity:0}
  .folder-copy{opacity:1;transform:none;gap:4px;font-size:9px;line-height:1.25}
  .folder-copy b{font-size:10px}
  .folder-copy small{font-size:9px;line-height:1.3}
  .journey-caption{padding-left:17px}
  .journey-caption::before{top:-28px;left:0;height:22px}
  .journey-caption::after{top:-32px;left:-3px}
  .journey-caption h4{font-size:17px}
  .final{padding:clamp(68px,16vw,100px) 20px}
  .final h2{max-width:13ch;font-size:clamp(39px,10vw,57px);line-height:.98}
  .final p{max-width:36ch;font-size:14px;line-height:1.6}
  .footer{padding:35px 22px 20px}
  .footer-top{display:grid;gap:22px}
  .footer p{max-width:38ch}
  .footer-links{display:flex;flex-wrap:wrap;gap:13px 20px;margin-top:0;font-size:11px}
  .foot-bottom{gap:9px;margin-top:28px;padding-top:17px;font-size:9px;line-height:1.6;overflow-wrap:anywhere}
}
@media(max-width:380px){
  .syn-actions .dark-btn{padding:8px 9px;font-size:10px}
  .syn-brand{font-size:16px}
  .syn-mark{width:24px;height:24px;font-size:19px}
  .syn-hero{padding-inline:16px}
  .syn-hero h1{font-size:clamp(39px,11vw,43px)}
  .product-wrap .product-inner{padding-inline:11px!important}
  .product-wrap .port-menu span:last-child{display:none}
  .folder-document{right:7%;width:82%;padding-inline:9px}
}
@media(min-width:701px) and (max-width:900px){
  .product-wrap{width:100%;max-width:760px!important;height:auto!important;margin:38px auto 0!important;perspective:none!important;transform:none!important}
  .product-wrap .product{width:100%;height:auto!important;transform:none!important;animation:none!important}
  .product-wrap .product-inner{height:auto!important;min-height:0!important}
  .product-wrap .profile{grid-template-columns:minmax(0,1fr) minmax(0,.9fr);gap:4%;}
  .product-wrap .project-cards{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
  .product-wrap .mini{height:clamp(105px,15vw,135px)!important;min-width:0}
  .journey-intro{max-width:none}
}
@media(hover:none) and (min-width:701px){
  .folder-art{height:130px}
  .folder-document{top:20px;right:10%;width:76%;height:calc(100% - 35px);padding:42px 11px 8px;transform:none}
  .folder-photo{opacity:.18}
  .folder-clip{opacity:0}
  .folder-copy{opacity:1;transform:none}
}

@media(max-width:700px){
  .syn main{min-width:0}
  .syn .section{padding-top:82px;padding-bottom:82px}
  .syn .section-head{gap:21px;margin-bottom:40px}
  .syn .section-head>div{min-width:0}
  .syn .kicker{font-size:9px;letter-spacing:.12em;line-height:1.6}
  .syn .section h2,.syn .how-copy h2,.syn .showcase .section-head h2{margin-top:14px;line-height:1.04;letter-spacing:-.055em}
  .syn .section-head p{max-width:42ch;line-height:1.8}
  .logos{row-gap:13px;column-gap:18px;padding:26px 18px;line-height:1.6}
  .logos b{font-size:9px;letter-spacing:.035em}
  .how-it-works .section{padding-top:82px;padding-bottom:82px}
  .how-grid{gap:35px}
  .how-copy>p{line-height:1.8}
  .how-steps{margin-top:2px}
  .how-step{grid-template-columns:34px minmax(0,1fr) 28px;gap:12px;min-height:0;padding:23px 3px}
  .how-step h3{margin-bottom:7px;font-size:18px;line-height:1.25;letter-spacing:-.45px}
  .how-step p{font-size:12px;line-height:1.75}
  .features{grid-template-columns:minmax(0,1fr);gap:14px;border:0}
  .feature,.feature:nth-child(4){grid-column:auto;min-height:0;padding:24px;border:1px solid var(--line);border-radius:15px;box-shadow:0 7px 18px rgba(46,59,88,.055)}
  .feature h3{margin:28px 0 9px;font-size:19px;line-height:1.25}
  .feature p{font-size:13px;line-height:1.75}
  .feature-link{margin-top:15px}
  .showcase .section{padding-top:82px;padding-bottom:82px}
  .showcase .section-head{margin-bottom:35px}
  .journey{gap:38px;padding-top:32px;padding-bottom:32px}
  .journey-intro{padding:25px}
  .journey-intro h3{margin:15px 0 13px;line-height:1.03}
  .journey-intro p{line-height:1.8}
  .journey-steps{gap:36px}
  .journey-step{min-width:0}
  .journey-caption{padding-top:2px}
  .journey-caption h4{margin-bottom:5px;line-height:1.3}
  .final{padding-top:82px;padding-bottom:82px}
  .final h2{line-height:1.02;margin-top:16px;margin-bottom:17px}
  .final p{margin-bottom:30px;line-height:1.8}
  .footer{padding-top:42px;padding-bottom:25px}
  .footer-top{gap:25px}
  .footer p{margin:0;line-height:1.8}
  .footer-links{gap:15px 21px;line-height:1.6}
  .foot-bottom{margin-top:33px;line-height:1.8}
}
@media(min-width:701px) and (max-width:900px){
  .syn .section{padding:88px clamp(28px,5vw,46px)}
  .syn .section-head{gap:24px;margin-bottom:40px}
  .features{gap:13px;border:0}
  .feature,.feature:nth-child(4){min-height:215px;border:1px solid var(--line);border-radius:14px}
  .feature h3{margin-top:35px;line-height:1.25}
  .how-grid{gap:38px}
  .how-steps{margin-top:0}
  .journey{gap:38px}
}

/* Mobile/touch correction: keep folder documents compact and card titles clear. */
@media(max-width:700px){
  .product-wrap .mini strong:after{bottom:20px!important;max-width:calc(100% - 18px);line-height:1.12!important}
  .journey-step:hover .folder-art{transform:none;box-shadow:0 14px 0 rgba(35,38,45,.08),0 21px 28px rgba(50,66,114,.10)}
  .journey-step:hover .folder-document{top:19px;right:7%;width:82%;height:79px;padding:37px 9px 7px;border-radius:4px 4px 9px 9px;transform:none}
  .journey-step:hover .folder-document::before,.journey-step:hover .folder-photo{opacity:.18}
  .journey-step:hover .folder-clip{opacity:0;transform:none}
  .journey-step:hover .folder-copy{opacity:1;transform:none}
}

/* Touchscreens keep the folder at rest: tapping must never trigger the desktop expansion. */
@media(hover:none){
  .journey-step:hover .folder-art{transform:none!important;box-shadow:0 14px 0 rgba(35,38,45,.08),0 21px 28px rgba(50,66,114,.10)!important}
  .journey-step:hover .folder-document{transform:none!important;box-shadow:4px 5px 0 rgba(35,38,45,.12)!important}
  .journey-step:hover .folder-document::before,.journey-step:hover .folder-photo{opacity:.18!important}
  .journey-step:hover .folder-clip{opacity:0!important;transform:none!important}
  .journey-step:hover .folder-copy{opacity:1!important;transform:none!important}
}
@media(hover:none) and (max-width:700px){
  .folder-document,.journey-step:hover .folder-document{top:19px!important;right:7%!important;width:82%!important;height:79px!important;max-height:79px!important;padding:37px 9px 7px!important;border-radius:4px 4px 9px 9px!important}
}
@media(hover:none) and (min-width:701px){
  .folder-document,.journey-step:hover .folder-document{top:20px!important;right:10%!important;width:76%!important;height:calc(100% - 35px)!important;max-height:none!important;padding:42px 11px 8px!important}
}
@media(max-width:700px){
  .login{display:inline-flex!important;align-items:center;justify-content:center;padding:8px 9px;font-size:10px;white-space:nowrap}
  .syn-actions{gap:6px}
  .syn-actions .dark-btn{padding:8px 10px;font-size:10px}
}
@media(max-width:380px){
  .syn-nav{padding-inline:12px}
  .syn-brand{font-size:15px}
  .login{padding:7px!important;font-size:9px}
  .syn-actions .dark-btn{padding:8px!important;font-size:9px}
}

/* Smaller folder composition: compact on phones, restrained on tablets and hover. */
@media(max-width:700px){
  .folder-art{width:150px!important;max-width:150px!important;height:84px!important;margin:15px 0 18px!important}
  .folder-document,.journey-step:hover .folder-document{top:10px!important;right:6%!important;width:84%!important;height:62px!important;max-height:62px!important;padding:23px 6px 4px!important;border-width:2px!important;border-radius:4px 4px 8px 8px!important}
  .folder-document::before,.journey-step:hover .folder-document::before{top:6px!important;left:6px!important;width:20px!important;height:2px!important;box-shadow:0 5px 0 #d3d8e0!important}
  .folder-copy,.journey-step:hover .folder-copy{gap:2px!important;font-size:7px!important;line-height:1.15!important}
  .folder-copy b{font-size:8px!important;line-height:1.1!important}
  .folder-copy small{font-size:7px!important;line-height:1.15!important}
  .folder-number{bottom:7px!important;left:9px!important;font-size:7px!important}
}
@media(min-width:701px) and (max-width:900px){
  .folder-art{height:104px;max-width:175px}
  .folder-document{top:16px;right:8%;width:78%;height:72px;padding:29px 8px 5px}
  .folder-copy{gap:3px;font-size:8px;line-height:1.2}
  .folder-copy b{font-size:9px}
  .folder-copy small{font-size:8px;line-height:1.2}
}
@media(min-width:901px){
  .journey-step:hover .folder-document{top:-36px;width:80%;height:128px;padding:39px 12px 10px}
  .journey-step:hover .folder-copy{gap:5px;font-size:9px;line-height:1.25}
  .journey-step:hover .folder-copy b{font-size:11px}
  .journey-step:hover .folder-copy small{font-size:9px;line-height:1.25}
}

/* Horizontal sequence; folders stay closed until hover or tap. */
.journey-steps-wrap{min-width:0}
.journey-steps-wrap::before{top:86px;right:0;left:0;height:2px;opacity:.75;background:repeating-linear-gradient(to right,#8794b4 0 5px,transparent 5px 12px)}
.journey-steps{align-items:start;gap:clamp(12px,2vw,24px)}
.journey-step:nth-child(2),.journey-step:nth-child(3){margin-top:0!important}
.journey-step{z-index:1}
.folder-art{width:min(100%,180px);height:112px;margin:20px auto 16px}
.folder-copy{opacity:0!important;transform:translateY(5px);transition:opacity .2s ease,transform .25s ease}
.folder-document{top:16px;right:8%;width:55%;height:52px;padding:19px 7px 4px;transform:rotate(2deg)}
.folder-document::before{top:7px;left:7px;width:24px;height:3px;box-shadow:0 7px 0 #d3d8e0}
.folder-summary{display:block;cursor:pointer;list-style:none;outline:none}
.folder-summary::-webkit-details-marker{display:none}
.folder-summary:focus-visible .folder-art{outline:3px solid #7184e9;outline-offset:4px}
.journey-step:hover .folder-art,.folder-details[open] .folder-art{transform:translateY(-3px);box-shadow:0 12px 0 rgba(35,38,45,.07),0 18px 24px rgba(50,66,114,.11)}
.journey-step:hover .folder-document,.folder-details[open] .folder-document{top:-5px;right:5%;width:90%;height:78px;padding:24px 8px 5px;border-radius:6px;box-shadow:5px 7px 0 rgba(35,38,45,.12);transform:rotate(0)}
.journey-step:hover .folder-copy,.folder-details[open] .folder-copy{opacity:1!important;transform:translateY(0)}
.journey-step:hover .folder-document::before,.folder-details[open] .folder-document::before,.journey-step:hover .folder-photo,.folder-details[open] .folder-photo{opacity:.13}
.journey-step:hover .folder-clip,.folder-details[open] .folder-clip{opacity:0;transform:translateY(-5px)}
@media(hover:none){
  .journey-step:hover .folder-art{transform:none!important}
  .journey-step:hover .folder-document{top:16px!important;right:8%!important;width:55%!important;height:52px!important;padding:19px 7px 4px!important;border-radius:4px 4px 8px 8px!important;transform:none!important}
  .journey-step:hover .folder-copy{opacity:0!important;transform:translateY(5px)!important}
  .journey-step:hover .folder-document::before,.journey-step:hover .folder-photo{opacity:1!important}
  .folder-details[open] .folder-art{transform:translateY(-3px)!important}
  .folder-details[open] .folder-document{top:-5px!important;right:5%!important;width:90%!important;height:78px!important;padding:24px 8px 5px!important;transform:none!important}
  .folder-details[open] .folder-copy{opacity:1!important;transform:none!important}
  .folder-details[open] .folder-document::before,.folder-details[open] .folder-photo{opacity:.13!important}
  .folder-details[open] .folder-clip{opacity:0!important}
}
@media(max-width:700px){
  .journey{gap:24px}
  .journey-steps-wrap{width:100%;overflow-x:auto;overflow-y:hidden;padding:10px 0 20px;scrollbar-width:thin;scrollbar-color:#bac5e0 transparent;overscroll-behavior-x:contain;scroll-snap-type:x mandatory}
  .journey-steps-wrap::before{display:none}
  .journey-steps{display:flex;width:max-content;gap:18px;padding:12px 10px 14px}
  .journey-steps::before{position:absolute;z-index:0;top:69px;left:0;width:100%;height:2px;content:"";background:repeating-linear-gradient(to right,#8794b4 0 5px,transparent 5px 12px);pointer-events:none}
  .journey-step{flex:0 0 150px;width:150px;scroll-snap-align:start}
  .folder-art{width:150px!important;max-width:150px!important;height:84px!important;margin:15px 0 16px!important}
  .folder-document{top:11px;right:8%;width:55%;height:42px;padding:16px 6px 3px}
  .folder-document::before{top:6px;left:6px;width:21px;height:2px;box-shadow:0 5px 0 #d3d8e0}
  .folder-copy{gap:2px;font-size:7px;line-height:1.15}
  .folder-copy b{font-size:8px;line-height:1.1}
  .folder-copy small{font-size:7px;line-height:1.15}
  .journey-step:hover .folder-document,.folder-details[open] .folder-document{top:4px;right:5%;width:90%;height:73px;padding:22px 7px 4px}
  .journey-caption{padding:0 0 0 14px}
  .journey-caption::before{top:-13px;left:5px;height:10px}
  .journey-caption::after{top:-17px;left:2px}
}
@media(hover:none) and (max-width:700px){
  .journey-step:hover .folder-document{top:11px!important;right:8%!important;width:55%!important;height:42px!important;padding:16px 6px 3px!important}
  .journey-step:hover .folder-copy{opacity:0!important}
  .folder-details[open] .folder-document{top:4px!important;right:5%!important;width:90%!important;height:73px!important;padding:22px 7px 4px!important}
  .folder-details[open] .folder-copy{opacity:1!important;transform:none!important}
}
/* Fluid breakpoints: desktop row, tablet row with room, swipeable phone row. */
@media(min-width:701px) and (max-width:900px){
  .journey{grid-template-columns:minmax(0,1fr);gap:28px}
  .journey-intro{max-width:none}
  .journey-steps{grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(10px,2vw,20px)}
  .journey-step{min-width:0}
  .folder-art{width:min(100%,175px);height:clamp(92px,13vw,108px);margin:18px auto 16px}
  .journey-step:hover .folder-document,.folder-details[open] .folder-document{height:clamp(72px,10vw,84px);padding-top:22px}
}
@media(max-width:700px){
  .syn main,.syn .section,.journey,.journey-intro,.journey-steps-wrap,.journey-step,.feature,.how-grid,.how-copy,.board,.board-main,.side{min-width:0;max-width:100%}
  .journey{grid-template-columns:minmax(0,1fr);gap:clamp(20px,6vw,30px)}
  .journey-steps-wrap{width:100%;max-width:100%;padding-inline:0}
  .journey-steps{gap:clamp(12px,4vw,18px)}
  .journey-step{flex:0 0 clamp(138px,43vw,165px);width:clamp(138px,43vw,165px)}
  .folder-art{width:100%!important;max-width:clamp(138px,43vw,165px)!important;height:clamp(78px,24vw,94px)!important;margin:14px 0 16px!important}
  .journey-steps::before{top:clamp(60px,calc(23px + 12vw),70px)}
  .folder-document{height:clamp(39px,12vw,48px);padding-top:clamp(15px,4.5vw,18px)}
  .folder-details[open] .folder-document,.journey-step:hover .folder-document{height:clamp(68px,22vw,78px);padding:clamp(20px,6vw,24px) 7px 4px}
  .folder-copy{font-size:clamp(7px,2vw,8px);line-height:1.18}
  .folder-copy b{font-size:clamp(8px,2.4vw,9px)}
  .folder-copy small{font-size:clamp(7px,2vw,8px);line-height:1.18}
}
@media(max-width:380px){
  .journey-steps{gap:12px;padding-inline:8px}
  .journey-step{flex-basis:132px;width:132px}
  .folder-art{width:132px!important;max-width:132px!important;height:76px!important}
  .journey-steps::before{top:60px}
  .folder-details[open] .folder-document,.journey-step:hover .folder-document{height:68px;padding:19px 6px 4px}
}
@media(max-width:700px){
  .folder-document{top:11px!important;right:8%!important;width:55%!important;height:clamp(38px,12vw,48px)!important;padding:clamp(15px,4.5vw,18px) 6px 3px!important}
  .journey-step:hover .folder-document,.folder-details[open] .folder-document{top:4px!important;right:5%!important;width:90%!important;height:clamp(64px,20vw,74px)!important;padding:clamp(19px,5.8vw,22px) 6px 4px!important}
}
@media(hover:none) and (max-width:700px){
  .journey-step:hover .folder-document{top:11px!important;right:8%!important;width:55%!important;height:clamp(38px,12vw,48px)!important;padding:clamp(15px,4.5vw,18px) 6px 3px!important}
  .journey-step:hover .folder-copy{opacity:0!important}
  .folder-details[open] .folder-document{top:4px!important;right:5%!important;width:90%!important;height:clamp(64px,20vw,74px)!important;padding:clamp(19px,5.8vw,22px) 6px 4px!important}
  .folder-details[open] .folder-copy{opacity:1!important;transform:none!important}
}

`;

const Feature = ({ n, icon, title, text, dark }
: { n: string; icon: string; title: string; text: string; dark?: boolean }
) => <article className="feature">
<span className="number">{n}
</span>
<span className="ico" aria-hidden="true">{icon === "brush" ? <svg viewBox="0 0 24 24"><path d="m14.5 5.5 4 4L9 19H5v-4L14.5 5.5Z"/><path d="m12.5 7.5 4 4M4 20c1.7-1.5 3.4-1.6 5-1"/></svg> : icon === "share" ? <svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.5-4.4M8.2 13.2l7.5 4.4"/></svg> : icon === "eyes" ? <svg viewBox="0 0 24 24"><path d="M2.5 12s3.2-5 9.5-5 9.5 5 9.5 5-3.2 5-9.5 5-9.5-5-9.5-5Z"/><circle cx="12" cy="12" r="2.5"/><path d="M4.5 7.8 3 6.5M19.5 7.8 21 6.5"/></svg> : icon}
</span>
<h3>{title}
</h3>
<p>{text}
</p>{dark && <Link to="/register" className="feature-link">Crear el mío</Link>}
</article>;

export default function Home() {

  const year = new Date().getFullYear();

  return <div className="syn">
<style>{css}
</style>

    <header className="syn-nav">
<a href="#inicio" className="syn-brand">
<span className="syn-mark">P</span>Portavia</a>
<nav className="syn-links">
<a href="#como-funciona">Cómo funciona</a>
<a href="#beneficios">Beneficios</a>
<a href="#oportunidades">Oportunidades</a>
<a href="#contacto">Hazlo tuyo</a>
</nav>
<div className="syn-actions">
<Link className="login" to="/login">Iniciar sesión</Link>
<Link className="dark-btn" to="/register">Crear portafolio</Link>
</div>
</header>

    <main>
<section id="inicio" className="syn-hero">
<div className="pill">
<b>✦</b>IDENTIDAD PROFESIONAL, EN UN LUGAR</div>
<h1>Tu trabajo merece<br />
<span className="gradient">ser encontrado.</span>
</h1>
<p className="intro">Construye un portafolio que concentre quién eres, qué haces y todo lo que has creado. Una sola URL, hecha para abrir oportunidades.</p>
<div className="ctas">
<Link className="button button-create" to="/register"><span>Crear mi portafolio</span><span className="button-mark" aria-hidden="true">+</span></Link>
<a className="outline" href="#oportunidades">Ver cómo funciona</a>
</div>
<div className="people">
<div className="avatars">
<span>AM</span>
<span>JL</span>
<span>DA</span>
<span>RS</span>
</div>
<span>Una página para <b>mostrar trabajo real.</b>
</span>
</div>
<div className="product-wrap">
<div className="product-shadow" />
<div className="product">
<div className="bar">
<div className="dots">
<i />
<i />
<i />
</div>
<span>portavia.app/u/uriel</span>
<span>•••</span>
</div>
<div className="product-inner">
<nav className="port-nav">
<strong className="port-logo">Portavia</strong>
<div className="port-menu">
<span>Inicio</span>
<span>Proyectos</span>
<span>Contacto</span>
</div>
</nav>
<div className="profile">
<div>
<span className="overline">DESARROLLADOR DE SOFTWARE</span>
<h2>Uriel<br />Casanova</h2>
<p>Creo productos digitales funcionales y claros, pensados para resolver problemas reales.</p>
<button>Ver proyectos</button>
</div>
<div className="project-cards">
<article className="mini">
<small>WEB / 01</small>
<strong>Centralizados<br />de enlaces</strong>
</article>
<article className="mini">
<small>APP / 02</small>
<strong>Gestión<br />personal</strong>
</article>
</div>
</div>
</div>
</div>
</div>
</section>

    <div className="logos">
<span>Hecho para quienes crean</span>
<b>ESTUDIANTES</b>
<b>FREELANCERS</b>
<b>PROFESIONALES</b>
<b>EMPRENDEDORES</b>
</div>

    <section id="como-funciona" className="how-it-works">
<div className="section">
<div className="how-grid">
<div className="how-copy">
<span className="kicker">CÓMO FUNCIONA</span>
<h2>Tu portafolio no tiene que ser complicado.</h2>
<p>Portavia parte de lo que ya tienes y te ayuda a convertirlo en una presencia profesional, clara y lista para compartir.</p>
</div>
<ol className="how-steps">
<li className="how-step"><span className="how-number">01</span><div><h3>Crea tu espacio</h3><p>Elige tu username y empieza con tu experiencia, habilidades y forma de contacto.</p></div><span className="how-check" aria-label="Completado"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m7.5 12.2 3 3 6-6.4"/></svg></span></li>
<li className="how-step"><span className="how-number">02</span><div><h3>Cuenta lo que has hecho</h3><p>Agrega proyectos con contexto, imágenes y enlaces que expliquen tu trabajo.</p></div><span className="how-check" aria-label="Completado"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m7.5 12.2 3 3 6-6.4"/></svg></span></li>
<li className="how-step"><span className="how-number">03</span><div><h3>Llévalo contigo</h3><p>Comparte una URL o QR cuando surja una entrevista, colaboración u oportunidad.</p></div><span className="how-check" aria-label="Completado"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m7.5 12.2 3 3 6-6.4"/></svg></span></li>
</ol>
</div>
</div>
</section>

    <section id="beneficios" className="section">
<div className="section-head">
<div>
<span className="kicker">Todo donde debe estar</span>
<h2>Menos enlaces perdidos. Más presencia.</h2>
</div>
<p>Tu portafolio no debería sentirse como una tarea. Portavia te da una base cuidada para que lo importante sea contar tu historia.</p>
</div>
<div className="features">
<Feature n="01" icon="▦" title="Tu perfil, con intención" text="Presenta tu experiencia, especialidad y forma de contacto sin perder tu esencia."/>
<Feature n="02" icon="✦" title="Proyectos que se ven bien" text="Organiza tu trabajo con imagen, descripción, categorías y enlaces."/>
<Feature n="03" icon="brush" title="Hazlo parte de ti" text="Elige un tema visual que acompañe tu estilo profesional."/>
<Feature n="04" icon="share" title="Comparte sin explicar más" text="Una URL limpia y un QR listo para tu CV, una entrevista o una oportunidad." dark/>
<Feature n="05" icon="eyes" title="Mira lo que despierta interés" text="Conoce las visitas que llegan a tu perfil y a tus proyectos."/>
</div>
</section>

    <section id="oportunidades" className="showcase">
<div className="section">
<div className="section-head">
<div>
<span className="kicker">DE TU PERFIL A LA OPORTUNIDAD</span>
<h2>Un enlace que deja claro quién eres y hacia dónde vas.</h2>
</div>
<p>Portavia convierte lo que ya haces en una presencia lista para acompañarte: desde tu CV hasta ese mensaje que puede abrir una conversación.</p>
</div>
<div className="journey">
<div className="journey-intro">
<span className="journey-label">PORTAVIA / PRESENCIA PROFESIONAL</span>
<h3>Tu trabajo no tiene que explicarse desde cero cada vez.</h3>
<p>Reúne proyectos, experiencia y una forma simple de contacto en una página que se siente tuya. Sin archivos sueltos, capturas ni enlaces que se pierden.</p>
</div>
<div className="journey-steps-wrap">
<ol className="journey-steps">
<li className="journey-step"><details className="folder-details"><summary className="folder-summary" aria-label="Abrir carpeta 01: Lo construyes"><div className="folder-art"><span className="folder-number">01</span><div className="folder-document"><span className="folder-photo" aria-hidden="true" /><div className="folder-copy"><b>Tu historia, en orden.</b><small>Proyectos, experiencia y lo que quieres mostrar.</small></div></div><span className="folder-clip" aria-hidden="true" /></div><div className="journey-caption"><h4>Lo construyes</h4></div></summary></details></li>
<li className="journey-step"><details className="folder-details"><summary className="folder-summary" aria-label="Abrir carpeta 02: Lo compartes"><div className="folder-art"><span className="folder-number">02</span><div className="folder-document"><span className="folder-photo" aria-hidden="true" /><div className="folder-copy"><b>Listo para circular.</b><small>Una misma presencia para tu CV, QR, redes y mensajes.</small></div></div><span className="folder-clip" aria-hidden="true" /></div><div className="journey-caption"><h4>Lo compartes</h4></div></summary></details></li>
<li className="journey-step"><details className="folder-details"><summary className="folder-summary" aria-label="Abrir carpeta 03: Conectas"><div className="folder-art"><span className="folder-number">03</span><div className="folder-document"><span className="folder-photo" aria-hidden="true" /><div className="folder-copy"><b>Deja una puerta abierta.</b><small>Tu trabajo se entiende y saben cómo encontrarte.</small></div></div><span className="folder-clip" aria-hidden="true" /></div><div className="journey-caption"><h4>Conectas</h4></div></summary></details></li>
</ol>
</div>
</div>
</div>
</section>

    <section id="contacto" className="final">
<span className="kicker">Empieza con lo que ya tienes</span>
<h2>Tu siguiente oportunidad puede empezar con un enlace.</h2>
<p>Construye una presencia profesional que puedas compartir con confianza.</p>
<Link className="button button-create" to="/register"><span>Crear mi portafolio</span><span className="button-mark" aria-hidden="true">+</span></Link>
</section>
</main>

    <footer className="footer">
<div className="footer-top">
<div>
<p>Una plataforma para crear, organizar y compartir tu identidad profesional digital.</p>
</div>
<div className="footer-links">
<a href="#como-funciona">Cómo funciona</a>
<a href="#beneficios">Beneficios</a>
<Link to="/login">Iniciar sesión</Link>
<Link to="/register">Crear cuenta</Link>
</div>
</div>
<div className="foot-bottom">
<span>{year} Todos los derechos reservados.</span>
<span>Hecho para mostrar trabajo real.</span>
</div>
</footer>

  </div>;

}
