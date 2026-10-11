<template>
  <Title>About Mehdi Rafiei | Senior Front-End Developer</Title>
  <Meta name="description" content="Senior front-end developer with 8+ years building production products, plus hands-on experience with Nuxt.js and Next.js API routes, Node.js, Express, and PHP MVC." />
  <Meta property="og:title" content="About Mehdi Rafiei | Senior Front-End Developer" />
  <Meta property="og:description" content="Front-end engineering is Mehdi Rafiei’s specialty, with additional experience building API routes, Node.js/Express features, and PHP MVC applications." />

  <main class="about-page page-content-enter">
    <section class="about-hero" aria-labelledby="about-title">
      <div class="about-intro">
        <p class="about-eyebrow about-hero-eyebrow">THE PERSON BEHIND THE CODE</p>
        <h1 id="about-title">Building interfaces<br />people <span>rely on.</span></h1>
        <p class="about-lead">I’m Mehdi Rafiei, a senior front-end developer with 8+ years building production web products across fintech, crypto, e-commerce, and real estate. I specialize in Vue, Nuxt, React, and Next.js, turning complex requirements into clear, responsive interfaces.</p>
        <p class="about-subtext">I’ve also taken applications from API and database integration through deployment. That end-to-end perspective helps me build front ends that fit the product’s architecture and the way teams ship it.</p>
        <div class="about-actions">
          <NuxtLink to="/contact-me" class="about-primary">Let’s work together <span aria-hidden="true">↗</span></NuxtLink>
          <NuxtLink to="/portfolios">Explore my projects →</NuxtLink>
        </div>
      </div>
      <aside class="about-profile">
        <img src="/imgs/about/mehdi.jpg" alt="Mehdi Rafiei" width="400" height="400" />
        <div><h2>Mehdi Rafiei</h2><p>Senior Front-End Developer</p><span class="about-availability">Open to remote, hybrid &amp; relocation</span></div>
      </aside>
    </section>

    <div class="about-stats" aria-label="Career overview">
      <div><strong>8+</strong><span>Years of experience</span></div>
      <div><strong>{{ getPortfolios().length }}</strong><span>Projects in my portfolio</span></div>
      <div><strong>Vue · Nuxt · React · Next.js</strong><span>My core ecosystem</span></div>
    </div>

    <section class="about-section" aria-labelledby="toolkit-title">
      <div class="about-section-heading"><div><p class="about-eyebrow">HOW I BUILD</p><h2 id="toolkit-title">Skills &amp; technologies</h2></div><p>From the first component to production.</p></div>
      <div class="toolkit-grid">
        <article v-for="(skill, index) in skills" :key="skill.title" class="toolkit-card" :class="{ 'toolkit-card-wide': skill.wide }">
          <span class="toolkit-number">0{{ index + 1 }}</span>
          <h3>{{ skill.title }}</h3>
          <ul><li v-for="item in skillTags(skill.items)" :key="item">{{ item }}</li></ul>
        </article>
      </div>
      <aside class="backend-experience" aria-labelledby="backend-experience-title">
        <h3 id="backend-experience-title">Additional back-end experience</h3>
        <p>Nuxt.js and Next.js API routes, Node.js, Express, REST APIs, PHP MVC, and SQL databases.</p>
      </aside>
    </section>

    <section class="about-section" aria-labelledby="experience-title">
      <div class="about-section-heading"><div><p class="about-eyebrow">THE JOURNEY SO FAR</p><h2 id="experience-title">Where I’ve worked</h2></div><p>Open a role to explore the work behind it.</p></div>
      <div ref="experienceList" class="experience-list">
        <article v-for="experience in experiences" :key="experience.id" class="experience-card" :class="{ 'is-open': openExperienceId === experience.id }">
          <h3>
            <button class="experience-toggle" type="button" :aria-expanded="openExperienceId === experience.id" :aria-controls="`experience-${experience.id}`" @click="openExperienceId = openExperienceId === experience.id ? null : experience.id">
              <span class="experience-mark" aria-hidden="true">{{ experience.company.slice(0, 1) }}</span>
              <span class="experience-label"><strong>{{ experience.company }}</strong><span>{{ experience.role }}</span></span>
              <span class="experience-dates">{{ experience.startDate }} — {{ experience.endDate }}</span>
              <span class="experience-expand" aria-hidden="true">{{ openExperienceId === experience.id ? '−' : '+' }}</span>
            </button>
          </h3>
          <Transition :css="false" @enter="expandExperience" @leave="collapseExperience" @enter-cancelled="cancelExperience" @leave-cancelled="cancelExperience">
          <div v-if="openExperienceId === experience.id" :id="`experience-${experience.id}`" class="experience-panel">
          <div class="experience-body">
            <p class="experience-bio">{{ experience.bio }}</p>
            <ul class="experience-tasks"><li v-for="task in experience.tasks" :key="task">{{ task }}</li></ul>
            <template v-if="getPortfolios(null, experience.id).length">
                <Shared-ProjectCarousel title="Projects from this role" :projects="getPortfolios(null, experience.id)" />
            </template>
          </div>
          </div>
          </Transition>
        </article>
      </div>
    </section>

    <section class="about-education" aria-labelledby="education-title">
      <div><p class="about-eyebrow">FOUNDATIONS</p><h2 id="education-title">Education</h2></div>
      <article v-for="edu in educations" :key="edu.college"><p class="education-date">{{ edu.startYear }} — {{ edu.endYear }}</p><h3>{{ edu.degree }}</h3><p>{{ edu.college }}</p><ul><li v-for="subject in edu.subjects" :key="subject">{{ subject }}</li></ul></article>
    </section>
    <transition name="fadeScale"><Shared-Gallery v-if="galleryVisible" :project="getPortfolio(activeProjectID)" /></transition>
  </main>
</template>
<script>
import {mapState} from "pinia";
import useProjectsStore from "@/stores/projects";
import { gsap } from 'gsap';


export default {
  data() {
    return {
      openExperienceId: null,
      skills: [
        {
          "title": "Languages",
          "items": "HTML5, CSS3, JavaScript (ES6+), TypeScript"
        },
        {
          "title": "Frameworks & Libraries",
          "items": "Vue.js (Nuxt, Vuetify, Pinia, Vuex, PrimeVue), React.js (Next.js, Redux), SCSS, Tailwind CSS, UnoCSS, Bootstrap, jQuery, Lodash"
        },
        {
          "title": "Testing",
          "items": "Vitest, Cypress, Jest"
        },
        {
          "title": "Tools",
          "items": "Git, GitHub, GitLab, Jira, Figma, Emmet, ESLint, Prettier, NPM, Yarn, Docker, PM2"
        },
        {
          "title": "Engineering & Performance",
          "items": "Responsive Web Design, RESTful API Integration, UI/UX Implementation, Technical SEO, Core Web Vitals, Cross-Browser Compatibility, Progressive Web Apps (PWA), Internationalization (i18n), WebSockets, Server-Sent Events (SSE), Front-End Architecture, Performance Optimization",
          "wide": true
        }
      ],
      experiences: [
        {
          "id": 7,
          "company": "BitBank Company",
          "role": "Senior Front-End Developer",
          "bio": "BitBank is a multi-language cryptocurrency exchange platform.",
          "startDate": "Feb 2025",
          "endDate": "Jan 2026",
          "duration": "1 yr",
          "tasks": [
            "Created a modular JavaScript support widget with automated builds and iframe integration, deployed across Next.js and Vue projects including BitBank3.com.",
            "Implemented multi-language support for BitBank’s cryptocurrency exchange platform.",
            "Delivered Sim Pay as a PWA for financial transactions (Paya, Card-to-Card, Satna, Pol) and payment link generation.",
            "Packaged Nuxt.js projects as Android APKs via Capacitor and Android Studio for cross-platform deployment.",
            "Built Sim Card services with customizable card design and geolocation-based delivery.",
            "Implemented KYC with video verification and face detection for secure onboarding.",
            "Optimized the landing page (Next.js) with SEO enhancements including sitemap, canonical URLs, and structural improvements.",
            "Developed Sim Pay admin panel with Excel/PDF export and interactive statistical charts for data analysis.",
            "Enhanced the main multi-language landing page with high-quality animations and interactive elements to improve engagement."
          ],
          "showDetails": false
        },
        {
          "id": 6,
          "company": "Sarmayex",
          "role": "Senior Front-End Developer",
          "bio": "Sarmayex is one of the top trading platforms in Iran with more than 1.5 million users.",
          "startDate": "Jun 2024",
          "endDate": "Feb 2025",
          "duration": "9 mos",
          "tasks": [
            "Developed major features, including pre-market tools, a lending system, an interactive prize wheel, demo trading, and a Telegram mini-app game — contributing to growth beyond 1M users.",
            "Resolved TradingView chart-loading issues, corrected transaction calculations, and improved responsive layouts to strengthen reliability and usability.",
            "Implemented request caching and Server-Sent Events (SSE) for real-time market data, reducing server load and improving responsiveness.",
            "Built an update log system to communicate new features and improvements with each version release."
          ],
          "showDetails": false
        },
        {
          "id": 4,
          "company": "Mega",
          "role": "Senior Front-End Developer",
          "bio": "Mega is one of the biggest car sales platforms & an consulting company for e-commerce services.",
          "startDate": "Sep 2023",
          "endDate": "Jun 2024",
          "duration": "10 mos",
          "tasks": [
            "Delivered the company’s official website using Nuxt 3, implementing advanced animations and smooth page transitions.",
            "Engineered a reusable multi-carousel component without external dependencies, enabling flexibility across multiple application areas.",
            "Automated the export of multiple API-driven PDFs into a single ZIP file using JSZip.",
            "Designed a custom admin panel with PrimeVue for internal product management.",
            "Conducted workshops for the front-end team on Unit, Integration, Snapshot, and E2E testing.",
            "Improved maintainability by refactoring components, removing redundancies, and optimizing architecture."
          ],
          "showDetails": false
        },
        {
          "id": 1,
          "company": "Ayandeh Bank",
          "role": "Front-End Developer",
          "bio": "Worked Hybrid with Ayandeh Bank. Using Jira for agile & GitLab for CI/CD.",
          "startDate": "Aug 2021",
          "endDate": "Jul 2023",
          "duration": "2 yrs",
          "tasks": [
            "Collaborated in a hybrid Agile environment using Jira and GitLab for streamlined workflows.",
            "Led front-end development for FinnoTex, an advanced trading platform supporting spot, limit, and OTC trading.",
            "Engineered the front-end for FinnoBot, a subscription-based bot trading platform integrated with Binance, KuCoin, and others, enabling asset allocation, analysis, and automated orders.",
            "Enhanced security with encrypted API communications and 2FA, reducing security incidents by 30%.",
            "Implemented real-time notifications via WebSocket, increasing user engagement by 20%."
          ],
          "showDetails": false
        },
        {
          "id": 3,
          "company": "Cactus ICT Center",
          "role": "Full-Stack Web Developer",
          "bio": "Cactus ICT center is a web development company.",
          "startDate": "Jul 2019",
          "endDate": "Jun 2021",
          "duration": "2 yrs",
          "tasks": [
            "Optimized responsive websites for cross-device and cross-browser compatibility, increasing mobile engagement by 30%.",
            "Applied performance optimization techniques, improving load speeds by 25% and boosting SEO rankings.",
            "Developed a guest ordering feature that converted guest accounts to registered accounts, increasing registrations by 35%.",
            "Created a customizable online ordering system, increasing online orders by 25% and user satisfaction by 15%."
          ],
          "showDetails": false
        },
        {
          "id": 2,
          "company": "Freelance projects",
          "role": "Full-Stack Web Developer",
          "bio": "Worked on multiple projects during freelancing & free time",
          "startDate": "Jul 2017",
          "endDate": "Present",
          "duration": "9 yrs",
          "tasks": [
            "Built responsive layouts for websites and web applications across desktop and mobile devices.",
            "Built PHP back ends using MVC architecture to organize application logic and improve maintainability.",
            "Developed Namichap’s online ordering system with configurable product and order options."
          ],
          "showDetails": false
        }
      ],
      educations: [
        {
          college: "AmirKabir High School",
          degree: "Diploma in Computer Science",
          subjects: [
            "Computer Networks",
            "Operating Systems",
            "Web Design",
            "C++",
          ],
          startYear: "2014",
          endYear: "2018",
        },
      ],
    };
  },
  computed: {
    ...mapState(useProjectsStore, [
      "getPortfolios",
      "galleryVisible",
      "activeProjectID",
      "getPortfolio",
    ]),
  },
  methods: {
    expandExperience(el, done) {
      gsap.killTweensOf(el);
      const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : .4;
      gsap.fromTo(el, { height: 0, opacity: 0, overflow: 'hidden' }, {
        height: 'auto', opacity: 1, duration, ease: 'power2.out',
        onComplete: () => { gsap.set(el, { clearProps: 'height,opacity,overflow' }); done(); },
      });
    },
    collapseExperience(el, done) {
      gsap.killTweensOf(el);
      const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : .3;
      gsap.to(el, { height: 0, opacity: 0, overflow: 'hidden', duration, ease: 'power2.inOut', onComplete: done });
    },
    cancelExperience(el) { gsap.killTweensOf(el); },
    skillTags(items) {
      return items.split(/,\s*(?![^()]*\))/);
    },
  },
  beforeUnmount() {
    this.$refs.experienceList?.querySelectorAll('.experience-panel').forEach(el => gsap.killTweensOf(el));
  },
};
</script>
<style scoped>
.about-page { padding: 3rem 2rem; }
.about-hero { display: grid; grid-template-columns: minmax(0, 1fr) 300px; gap: 5rem; align-items: center; }
.about-eyebrow { color: #00dc82; font-size: .8rem; font-weight: 600; letter-spacing: .14em; margin-bottom: 14px; }
.about-intro h1 { font-size: clamp(2.7rem, 4vw, 4.5rem); font-weight: 750; line-height: 1.12; letter-spacing: -.03em; }
.about-intro h1 span { color: #f47a08; }
.about-lead { margin-top: 24px; font-size: 1.3rem; line-height: 1.7; max-width: 50rem; color: #ffffffdc; }
.about-subtext { margin-top: 14px; max-width: 50rem; color: #ffffff91; line-height: 1.8; }
.about-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 22px; margin-top: 26px; font-weight: 600; }
.about-actions > a { color: #f47a08; }
.about-actions > a { padding: 13px 16px; border-radius: 8px; transition: background .2s, color .2s, transform .2s; }
.about-actions > a:hover { background: #f47a0812; color: #ffb373; transform: translateY(-2px); }
.about-actions > .about-primary:hover { background: #e46c04; color: white; }
.about-actions > .about-primary { color: white; background: #c75c00; padding: 13px 20px; border-radius: 8px; }
.about-profile { overflow: hidden; border: 1px solid #ffffff15; border-radius: 20px; background: #262626; transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease; }
.about-profile:hover { transform: translateY(-5px); border-color: #f47a0870; box-shadow: 0 18px 42px #0006; }
.about-profile > img { display: block; width: 100%; aspect-ratio: 1 / 1; object-fit: cover; object-position: center 30%; transition: transform .45s ease, filter .3s ease; }
.about-profile:hover > img { transform: scale(1.04); filter: saturate(1.08); }
.about-profile > div { padding: 20px; }
.about-profile h2 { font-size: 1.5rem; font-weight: 650; }
.about-profile p { margin: 6px 0 14px; color: #ffffff8c; }
.about-availability { color: #76d5ac; font-size: .8rem; line-height: 1.5; }
.about-availability::before { content: ''; display: inline-block; width: 7px; height: 7px; margin-right: 7px; border-radius: 50%; background: #00dc82; box-shadow: 0 0 0 3px #00dc8214; }
.about-stats { display: grid; grid-template-columns: 1fr 1fr 1.4fr; gap: 24px; margin: 40px 0 0; border-block: 1px solid #ffffff14; padding: 28px 0; }
.about-stats > div { display: flex; flex-direction: column; gap: 8px; }
.about-stats strong { font-size: 2rem; font-weight: 650; }
.about-stats span { font-size: .95rem; color: #ffffff80; }
.about-section { margin-top: 64px; }
.about-section-heading { display: flex; justify-content: space-between; align-items: end; gap: 20px; margin-bottom: 26px; }
.about-section h2, .about-education h2 { font-size: 2.3rem; font-weight: 650; }
.about-section-heading > p { color: #ffffff80; }
.toolkit-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.toolkit-card-wide { grid-column: 1 / -1; }
.backend-experience { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ffffff14; }
.backend-experience h3 { font-size: 1rem; font-weight: 600; color: #ffffffc4; }
.backend-experience p { margin-top: 8px; color: #ffffff99; line-height: 1.7; }
.toolkit-card { position: relative; padding: 24px; background: #262626; border: 1px solid #ffffff12; border-radius: 14px; transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease, background .25s ease; }
.toolkit-card:hover { transform: translateY(-4px); border-color: #f47a0860; background: #292725; box-shadow: 0 14px 32px #0005; }
.toolkit-card h3 { font-size: 1.25rem; margin-bottom: 18px; font-weight: 600; }
.toolkit-number { float: right; font-size: .85rem; color: #f47a0880; }
.toolkit-card ul, .about-education ul { display: flex; flex-wrap: wrap; gap: 8px; }
.toolkit-card li { padding: 6px 10px; border-radius: 6px; background: #ffffff05; border: 1px solid #ffffff0d; color: #ffffffad; font-size: .9rem; line-height: 1.5; }
.toolkit-card li { transition: color .2s, border-color .2s, background .2s, transform .2s; }
.toolkit-card li:hover { color: #ffba7c; border-color: #f47a0860; background: #f47a0810; transform: translateY(-2px); }
.experience-list { display: grid; gap: 12px; }
.experience-card { border: 1px solid #ffffff14; border-radius: 14px; background: #232323; overflow: hidden; }
.experience-card.is-open { border-color: #f47a0850; }
.experience-toggle { width: 100%; display: flex; align-items: center; gap: 20px; padding: 24px; text-align: left; }
.experience-toggle:hover { background: #ffffff03; }
.experience-toggle:focus-visible { outline: 2px solid #f47a08; outline-offset: -3px; }
.experience-mark { display: grid; place-items: center; width: 48px; height: 48px; flex-shrink: 0; border-radius: 10px; color: #f47a08; background: #f47a0810; font-size: 1.6rem; font-weight: 600; }
.experience-label { display: flex; flex-direction: column; gap: 6px; }
.experience-label strong { font-size: 1.25rem; font-weight: 600; }
.experience-label > span { color: #ffffff80; font-size: .95rem; }
.experience-dates { margin-left: auto; color: #ffffff80; font-size: .9rem; }
.experience-expand { font-size: 1.6rem; color: #f47a08; }
.experience-body { padding: 0 24px 28px; }
.experience-bio { color: #ffffffbc; border-top: 1px solid #ffffff10; padding-top: 20px; line-height: 1.6; }
.experience-tasks { list-style: disc; padding-left: 20px; margin: 18px 0; color: #ffffff99; }
.experience-tasks li { padding-left: 4px; margin-bottom: 12px; line-height: 1.75; }
.experience-body h4 { font-weight: 600; margin: 26px 0 18px; }
.experience-projects { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.about-education { display: grid; grid-template-columns: 1fr 2fr; gap: 28px; margin-top: 64px; padding-top: 32px; border-top: 1px solid #ffffff14; }
.about-education h3 { font-size: 1.35rem; font-weight: 600; margin: 8px 0; }
.about-education article > p { color: #ffffff80; }
.about-education ul { margin-top: 18px; color: #ffffffa3; font-size: .9rem; gap: 10px 20px; }
@media (min-width: 550px) { .about-page { padding-inline: 3rem; } }
@media (min-width: 1280px) { .about-page { padding-inline: 5rem; } }
@media (max-width: 900px) { .about-hero { grid-template-columns: minmax(0, 1fr) 230px; gap: 2rem; } }
@media (max-width: 767px) { .about-hero { grid-template-columns: minmax(0, 1fr); } .about-profile { order: -1; display: flex; align-items: center; } .about-profile > img { width: 130px; height: 160px; flex-shrink: 0; } .about-stats { gap: 16px; } .about-stats strong { font-size: 1.45rem; } .about-section-heading { align-items: start; flex-direction: column; gap: 8px; } .experience-toggle { flex-wrap: wrap; gap: 12px; padding: 18px; } .experience-label { flex: 1; } .experience-dates { margin-left: 60px; order: 2; width: 100%; } .about-education { grid-template-columns: 1fr; } }
@media (max-width: 767px) { .about-hero-eyebrow { display: none; } }
@media (max-width: 549px) { .toolkit-grid, .experience-projects { grid-template-columns: minmax(0, 1fr); } .about-stats { grid-template-columns: 1fr 1fr; } .about-stats > div:last-child { grid-column: 1 / -1; } .about-profile > img { width: 100px; height: 145px; } .about-profile > div { padding: 14px; } .about-profile h2 { font-size: 1.25rem; } .experience-body { padding-inline: 16px; } }
@media (prefers-reduced-motion: reduce) { .about-profile, .about-profile > img, .toolkit-card { transition: none; } .toolkit-card:hover { transform: none; } }
</style>
