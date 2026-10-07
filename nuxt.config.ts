// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  ssr: "server",
  target: "static",
  experimental: {
    payloadExtraction: false,
  },
          app: {
            head: {
              title: "Mehdi Rafiei | Senior Front-End Developer",
              meta: [
                {
                  name: "description",
                  content:
                    "Mehdi Rafiei is a senior front-end developer with 8+ years building Vue, Nuxt, React and Next.js products, plus hands-on back-end, API and deployment experience.",
                },
              ],
              link: [],
            },
          },
  css: ["@/assets/css/main.css"],
  modules: ["@pinia/nuxt", "@unocss/nuxt", "vue3-carousel-nuxt", "nuxt-svgo"],
  carousel: {
    prefix: "swipe",
  },
  svgo: {
    autoImportPath: "~/public/imgs/icons/",
    defaultImport: "component",
    componentPrefix: "Icon",
  },
});
