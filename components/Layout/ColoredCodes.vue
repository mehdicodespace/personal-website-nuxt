<template>
  <div aria-hidden="true" class="code-background">
    <div v-for="column in 8" :key="column" class="code-column">
      <div class="code-track" :style="{ '--duration': `${12 + column * 1.7}s`, '--delay': `${column * -3.5}s` }">
        <div v-for="copy in 2" :key="copy" class="code-copy">
          <p v-for="line in 3" :key="line" v-html="coloredCodes[(column * 3 + line) % coloredCodes.length]"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      elements: `
        <header class="flex items-center">
          <img src="logo.png" class="w-18" alt="Mehdi Rafiei Persoanl Website Logo" />
          <Item><nuxt-link href="/">Home</nuxt-link></Item>
          <Item><nuxt-link href="/about">About</nuxt-link></Item>
          <Item><nuxt-link href="/works"> Portfolio</nuxt-link></Item>
          <Item><nuxt-link href="/contact_me"> Contact</nuxt-link></Item>

          <a href="/Mehdi-Rafiei-Resume.pdf" title="Download Mehdi Rafiei Resume (PDF)"> Resume </a>

          <themeswitch class="moon">Dark/Light</themeswitch>
          <langswitch class="en">en/fa</langswitch>
        </header>

        <initilizecontent class="content">Hello World - I'm Mehdi Rafiei</initilizecontent>

        <myname is="Mehdi Rafiei" />

        <jobtitle is="Senior Front-End Developer" />

        <portfolios are="ready" number="8" />

        <experience years="more than 8" />

        <birthdate year="1998" month="july" day="11" />

        <skills :list="['NUXT', 'Vue', 'React', 'Next', 'Javascript','Responsive Design', 'i18n', 'TypeScript]" />

        <contactDetails :list="['contact@mehdispace.com', 'linkedin.com/in/merafiee', 'github.com/mehdicodecom']" />
        `,
    };
  },
  computed: {
    coloredCodes() {
      //Convert Each line of elements into one array item and clear whitespaces and empty lines
      const elementArray = this.elements
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "");

      //Separate each part of elements with Regex based on uses and give specific color
      elementArray.forEach((html, index) => {
        elementArray[index] = this.colorizeHTML(html);
      });
      return elementArray;
    },
  },
  methods: {
    colorizeHTML(html) {
      //Regex to separate each part of an HTML Element into different parts (Tag Names, Attribute Names, Signs)
      const regex =
        /(\b(\w+)\s*(?=\=))|((?<=\<)([a-z]{1,20})(?=\>)*|(?<=\<\/)([a-z]{1,20})(?=\>)*)|(<\/|>|<|\/>|="|")/g;
      html = html.replace(regex, (match, g1, g2, g3) => {
        if (g1 || g2)
          return `<span class="text-main-orange">${g1 || g2}</span>`;
        if (g3) return `<span class="text-main-green">${g3}</span>`;
        switch (match) {
          case "</": {
            return `<span class="text-main-cyan">&lt;/</span>`;
          }
          case "/>": {
            return `<span class="text-main-cyan">/&gt;</span>`;
          }
          case ">": {
            return `<span class="text-main-cyan">&gt;</span>`;
          }
          case "<": {
            return `<span class="text-main-cyan">&lt;</span>`;
          }
          case `="`: {
            return `<span class="text-main-cyan">&equals;"</span>`;
          }
          case `"`: {
            return `<span class="text-main-cyan">"</span>`;
          }
        }
      });
      return html;
    },
  },
};
</script>

<style scoped>
.code-background { position: fixed; inset: 0; z-index: -1; pointer-events: none; user-select: none; display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); overflow: hidden; opacity: .15; }
.code-column { min-width: 0; overflow: hidden; }
.code-track { animation: code-drift var(--duration) linear var(--delay) infinite; will-change: transform; }
.code-copy { height: 110vh; display: flex; flex-direction: column; justify-content: space-around; align-items: center; }
.code-copy p { writing-mode: vertical-rl; white-space: nowrap; max-height: 32vh; overflow: hidden; font: 13px/1.5 Consolas, monospace; color: #91a3ad; }
@keyframes code-drift { from { transform: translateY(-50%); } to { transform: translateY(0); } }
@media (max-width: 767px) { .code-background { grid-template-columns: repeat(4, minmax(0, 1fr)); opacity: .11; } .code-column:nth-child(n + 5) { display: none; } .code-copy p { font-size: 11px; } }
@media (prefers-reduced-motion: reduce) { .code-track { animation: none; } }
</style>
