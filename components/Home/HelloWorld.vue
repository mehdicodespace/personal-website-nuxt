<template>
  <section class="home-intro" aria-labelledby="home-intro-title">
    <div class="intro-identity">
      <p class="intro-eyebrow">HELLO WORLD</p>
      <h1 id="home-intro-title">I’m <span>Mehdi Rafiei</span></h1>
      <p class="intro-role">Senior Front-End Developer</p>
      <div><General-SocialNetworks /></div>
    </div>
    <div class="intro-summary">
      <div class="intro-summary-header">
        <span><i aria-hidden="true"></i> SENIOR FRONT-END DEVELOPER</span>
      </div>
      <svg class="intro-trace" viewBox="0 0 440 130" fill="none" aria-hidden="true">
        <path class="intro-trace-base" d="M10 100H88L126 61H190L226 100H278L326 38H372L398 13H438" />
        <path class="intro-trace-dash" d="M10 100H88L126 61H190L226 100H278L326 38H372L398 13H438" />
        <circle class="intro-trace-node" cx="88" cy="100" r="4" />
        <circle class="intro-trace-node" cx="126" cy="61" r="4" />
        <circle class="intro-trace-node" cx="190" cy="61" r="4" />
        <circle class="intro-trace-node" cx="226" cy="100" r="4" />
        <circle class="intro-trace-node" cx="278" cy="100" r="4" />
        <circle class="intro-trace-node" cx="326" cy="38" r="4" />
        <circle class="intro-trace-node" cx="372" cy="38" r="4" />
        <circle class="intro-trace-node" cx="398" cy="13" r="4" />
        <circle class="intro-trace-dot" cx="10" cy="100" r="5">
          <animateMotion dur="7s" repeatCount="indefinite" path="M0 0H78L116 -39H180L216 0H268L316 -62H362L388 -87H428" />
        </circle>
      </svg>
      <div class="intro-experience">
        <strong>8<span>+</span></strong>
        <div>
          <span class="intro-experience-label">YEARS BUILDING FOR PRODUCTION</span>
          <p>Complex products. Clear, resilient interfaces.</p>
        </div>
      </div>
      <div class="intro-domains" aria-label="Industries">
        <span>Fintech</span><i>·</i><span>Trading</span><i>·</i><span>Commerce</span><i>·</i><span>Real estate</span>
      </div>
      <div class="intro-summary-footer">
        <ul class="intro-skills" aria-label="Core technologies">
          <li v-for="skill in [{ name: 'Vue', icon: 'vue' }, { name: 'Nuxt', icon: 'nuxt' }, { name: 'React', icon: 'react' }, { name: 'Next.js', icon: 'next' }, { name: 'TypeScript', icon: 'typescript' }]" :key="skill.name" :title="skill.name">
            <img :src="`/imgs/skills/${skill.icon}.svg`" :alt="skill.name" width="22" height="22" />
          </li>
        </ul>
        <NuxtLink to="/about" class="intro-more">More about me <span aria-hidden="true">→</span></NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-intro { display: grid; width: 100%; grid-template-columns: minmax(0, 1fr); gap: 28px; padding: 2rem 2rem; }
.intro-identity { min-width: 0; }
.intro-eyebrow { color: #00dc82; font-size: .9rem; font-weight: 600; letter-spacing: .15em; }
.home-intro h1 { margin-top: 10px; font-size: clamp(2rem, 3.8vw, 3.7rem); font-weight: 750; line-height: 1.2; }
.home-intro h1 span { color: #f47a08; }
.intro-role { color: #ffffffb3; margin: 12px 0 6px; font-size: 1.5rem; }
.intro-summary { position: relative; overflow: hidden; padding: clamp(20px, 2.4vw, 30px); border: 1px solid #ffffff15; border-radius: 18px; background: radial-gradient(ellipse at 94% 4%, #f47a0817, transparent 38%), linear-gradient(145deg, #ffffff07, #ffffff02); }
.intro-summary::after { position: absolute; right: -74px; bottom: -112px; width: 250px; height: 250px; border: 1px solid #f47a081c; border-radius: 50%; box-shadow: 0 0 0 26px #f47a0806, 0 0 0 54px #f47a0804; content: ''; pointer-events: none; transform-origin: center; animation: intro-orbit-pulse 8s ease-in-out infinite; }
.intro-summary > *:not(.intro-trace) { position: relative; z-index: 1; }
.intro-trace { position: absolute; z-index: 0; top: 38%; right: 1%; width: 43%; height: auto; overflow: visible; opacity: .56; pointer-events: none; }
.intro-trace-base { stroke: #f47a0840; stroke-width: 8; stroke-linecap: round; stroke-linejoin: round; }
.intro-trace-dash { stroke: #ff9b42; stroke-width: 1.5; stroke-dasharray: 10 8; stroke-linecap: round; stroke-linejoin: round; opacity: .72; }
.intro-trace-node { fill: #171717; stroke: #ff8b28; stroke-width: 2; }
.intro-trace-dot { fill: #ffd5a6; filter: drop-shadow(0 0 5px #ff8b28); }
.intro-summary-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; color: #ffffff80; font-size: .68rem; font-weight: 700; letter-spacing: .13em; }
.intro-summary-header > span:first-child { display: inline-flex; align-items: center; gap: 8px; color: #ff9b42; }
.intro-summary-header i { width: 7px; height: 7px; border-radius: 50%; background: #ff8b28; box-shadow: 0 0 12px #ff8b2890; }
.intro-experience { display: flex; align-items: center; gap: clamp(16px, 2vw, 26px); margin-top: 20px; color: #ffffffc4; }
.intro-experience > strong { flex: 0 0 auto; color: #f47a08; font-size: clamp(4.25rem, 7vw, 5.8rem); font-weight: 750; letter-spacing: -.07em; line-height: .88; }
.intro-experience > strong span { color: #ffac61; font-size: .56em; vertical-align: top; }
.intro-experience-label { color: #ffffff85; font-size: .7rem; font-weight: 700; letter-spacing: .12em; }
.intro-experience p { margin-top: 7px; color: #f4f4f4; font-size: clamp(.95rem, 1.3vw, 1.12rem); font-weight: 600; line-height: 1.35; }
.intro-domains { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 18px; color: #ffffff9c; font-size: .8rem; }
.intro-domains i { color: #f47a08; font-style: normal; }
.intro-summary-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px; margin-top: 20px; padding-top: 17px; border-top: 1px solid #ffffff12; }
.intro-skills { display: flex; flex-wrap: wrap; gap: 8px; }
.intro-skills li { display: grid; width: 38px; height: 38px; place-items: center; border: 1px solid #ffffff18; border-radius: 10px; background: #111214a6; transition: border-color .2s, transform .2s, background .2s; }
.intro-skills li:hover { transform: translateY(-2px); border-color: #f47a0870; background: #f47a0810; }
.intro-skills img { width: 22px; height: 22px; object-fit: contain; }
.intro-more { position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 8px; color: #ff9b42; font-weight: 650; transition: color .2s, gap .2s; }
.intro-more:hover { gap: 12px; color: #ffbd80; }
@media (min-width: 550px) { .home-intro { padding-inline: 3rem; } }
@media (min-width: 800px) { .home-intro { grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr); align-items: center; gap: 2rem; } }
@media (min-width: 1280px) { .home-intro { padding-inline: 5rem; } }
@media (max-width: 799px) { .intro-trace { top: 48%; right: -5%; width: 72%; opacity: .3; } }
@media (max-width: 420px) { .intro-summary-header { font-size: .58rem; letter-spacing: .09em; } .intro-domains { gap: 6px; font-size: .74rem; } .intro-skills { gap: 6px; } .intro-skills li { width: 34px; height: 34px; } .intro-skills img { width: 19px; height: 19px; } }
@keyframes intro-orbit-pulse { 0%, 100% { opacity: .48; transform: scale(.96); } 50% { opacity: .9; transform: scale(1.035); } }
@media (prefers-reduced-motion: reduce) { .intro-summary::after { animation: none; } .intro-trace-dot animateMotion { display: none; } .intro-skills li, .intro-more { transition: none; } }
</style>
