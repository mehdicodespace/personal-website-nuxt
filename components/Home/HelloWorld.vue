<template>
  <section class="home-intro" aria-labelledby="home-intro-title">
    <div class="intro-identity">
      <p class="intro-eyebrow">HELLO WORLD</p>
      <h1 id="home-intro-title">I’m <span>Mehdi Rafiei</span></h1>
      <p class="intro-role">Senior Front-End Developer</p>
      <div><General-SocialNetworks /></div>
    </div>
    <div class="intro-summary">
      <p class="intro-experience"><strong>8+</strong> years building web applications</p>
      <p class="intro-description">I make complex web products easier to use by building responsive, high-performance interfaces that help people get things done.</p>
      <ul class="intro-skills" aria-label="Core technologies">
        <li v-for="skill in ['Vue', 'Nuxt', 'React', 'Next.js', 'TypeScript']" :key="skill">{{ skill }}</li>
      </ul>
      <NuxtLink to="/about" class="intro-more">More about me <span aria-hidden="true">→</span></NuxtLink>
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
.intro-summary { padding: 24px; border: 1px solid #ffffff12; border-radius: 16px; background: #ffffff03; }
.intro-experience { display: flex; align-items: center; gap: 14px; font-size: 1.1rem; color: #ffffffc4; }
.intro-experience strong { color: #f47a08; font-size: 3rem; line-height: 1; }
.intro-description { margin: 16px 0; max-width: 42rem; color: #ffffffa3; line-height: 1.7; }
.intro-skills { display: flex; flex-wrap: wrap; gap: 8px; }
.intro-skills li { border: 1px solid #ffffff1a; background: #ffffff05; border-radius: 6px; padding: 6px 12px; font-size: .9rem; transition: border-color .2s, background .2s; }
.intro-skills li:hover { border-color: #f47a0866; background: #f47a0810; }
.intro-more { display: inline-block; margin-top: 18px; color: #f47a08; font-weight: 500; }
.intro-more:hover { color: #ffae63; }
@media (min-width: 550px) { .home-intro { padding-inline: 3rem; } }
@media (min-width: 800px) { .home-intro { grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr); align-items: center; gap: 2rem; } }
@media (min-width: 1280px) { .home-intro { padding-inline: 5rem; } }
</style>
