// ZAH Workshop — keyframes and the few classes the markup uses.
// A JS string so the package needs no filesystem: it renders on a server, in a
// build step, or in a browser bundle alike. Colours come from the .zw-root
// custom properties (see theme.js).
export const baseCss = String.raw`
/* ZAH Workshop — keyframes and the few classes the markup uses.
   Colours come from the .zw-root custom properties (see theme.js). */
#zw-main::-webkit-scrollbar{width:0;height:0}
@keyframes zahTicker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes zahLogoIn{0%{opacity:0;transform:translateY(20px) scale(.95)}100%{opacity:1;transform:none}}
@keyframes zahLogoUp{0%{transform:translateY(22px) scale(.95)}100%{transform:none}}
@keyframes zahFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
@keyframes zahPulse{0%,100%{transform:scale(1);opacity:.4}50%{transform:scale(1.25);opacity:.7}}
@keyframes zahSonar{0%{transform:scale(.4);opacity:.55}100%{transform:scale(1.9);opacity:0}}
@keyframes zahOrbit{to{transform:rotate(360deg)}}
@keyframes zahQR{0%,100%{box-shadow:0 10px 34px rgb(var(--zw-ink-rgb) / .22),0 0 0 0 rgb(var(--zw-accent-rgb) / .45)}50%{box-shadow:0 10px 34px rgb(var(--zw-ink-rgb) / .22),0 0 0 13px rgb(var(--zw-accent-rgb) / 0)}}
@keyframes zahConfetti{0%{transform:translateY(-8vh) rotate(0);opacity:0}12%{opacity:1}100%{transform:translateY(112vh) rotate(640deg);opacity:.85}}
@keyframes zahBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(7px)}}
@keyframes zahBlink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes gearSpin{to{transform:rotate(360deg)}}
@keyframes gearSpinRev{to{transform:rotate(-360deg)}}
@keyframes introVeil{0%{opacity:1}100%{opacity:0}}
@keyframes introZoom{0%{transform:scale(1.11)}100%{transform:scale(1)}}
@keyframes introLogo{0%{transform:scale(.55) translateY(8px);filter:blur(16px)}100%{transform:scale(1) translateY(0);filter:blur(0)}}
@keyframes introBurst{0%{opacity:0;transform:translate(-50%,-50%) scale(.2)}28%{opacity:.8}100%{opacity:0;transform:translate(-50%,-50%) scale(2.3)}}
@keyframes introLine{0%{transform:translateY(120%)}100%{transform:translateY(0)}}
@keyframes introRise{0%{opacity:0;transform:translateY(34px)}100%{opacity:1;transform:translateY(0)}}
@keyframes introChip{0%{opacity:0;transform:translateY(26px) scale(.92)}100%{opacity:1;transform:translateY(0) scale(1)}}
@keyframes introSheen{0%{transform:translateX(-180%) skewX(-16deg);opacity:0}25%{opacity:.75}100%{transform:translateX(320%) skewX(-16deg);opacity:0}}
@keyframes introFlare{0%{transform:scaleX(0);opacity:0}45%{opacity:1}100%{transform:scaleX(1);opacity:0}}
@keyframes zahFade{0%{opacity:0}100%{opacity:1}}
@keyframes zwKenBurns{0%{transform:scale(1)}100%{transform:scale(1.14)}}
.zw-hero-img{animation:zwKenBurns 18s ease-in-out infinite alternate;transform-origin:50% 38%;will-change:transform}
.zw-hero-parallax{will-change:transform}
.zw-deck-hero{height:clamp(230px,32vh,380px)}
@media (min-width:1280px){.zw-deck-hero{height:clamp(380px,46vh,520px)}}
@media (min-width:1680px){.zw-deck-hero{height:clamp(440px,54vh,620px)}}
.zw-root *{box-sizing:border-box}
.zw-root button{transition:filter .2s ease,background .25s ease,transform .25s ease}
.zw-root button:hover{filter:brightness(.96)}
.zw-root [data-bookimg]{transition:transform .6s cubic-bezier(.16,.84,.34,1)}

/* The promotions page: cards are visible without the wire (a React host can
   re-create the markup at any time), and hover is CSS so it survives that. */
.zw-promo [data-reveal]{opacity:1}
.zw-promo [data-card]:hover{transform:translateY(-6px)}
.zw-promo [data-card]:hover [data-stripe]{transform:scaleX(1)}
.zw-promo [data-card]:hover [data-glow]{opacity:1}
.zw-promo [data-card]:hover [data-bookimg]{transform:scale(1.06)}
@media (max-width:680px){
  .zw-promo [style*="grid-template-columns:1fr 1fr"]{grid-template-columns:1fr !important}
  .zw-promo [style*="gap:24px;align-items:center"]{flex-wrap:wrap !important}
  .zw-promo [style*="gap:24px;align-items:center"] > button{flex:1 1 100% !important;width:100% !important;justify-content:center !important;margin-top:6px}
}
`;
