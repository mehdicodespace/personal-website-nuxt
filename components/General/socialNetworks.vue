<template>
  <ul class="flex flex-wrap gap-3 sm:gap-4" aria-label="Social profiles">
    <li class="flex" v-for="(value, socialNetwork) in socialNetworks" :key="socialNetwork">
      <div class="circleLoading">
        <a
          :href="value.link"
          target="_blank"
          :aria-label="value.label"
          rel="noopener noreferrer"
          class="group flex rounded-full trans3ms overflow-hidden bg-dark-300 w-12 h-12 items-center shadow-md hover:(w-34) focus-visible:(w-34 outline-none ring-2 ring-main-orange)"
        >
          <span
            :class="`min-w-12 h-12 relative flex justify-center items-center rounded-full trans3ms ${value.groupHover}`"
          >
            <svg class="relative w-6 h-6" aria-hidden="true">
              <component :is="`Icon${socialNetwork.charAt(0).toUpperCase() + socialNetwork.slice(1)}`" />
            </svg>
          </span>

          <span class="ml-2 font-semibold text-sm">{{ socialNetwork }}</span>
        </a>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      socialNetworks: {
        Github: {
          label: "GitHub profile (opens in a new tab)",
          link: "https://github.com/mehdicodespace",
          groupHover: "group-hover:(bg-socials-github text-white)",
        },
        Linkedin: {
          label: "LinkedIn profile (opens in a new tab)",
          link: "https://www.linkedin.com/in/merafiee/",
          groupHover: "group-hover:(bg-socials-linkedin text-white)",
        },
        Telegram: {
          label: "Telegram profile (opens in a new tab)",
          link: "https://t.me/MehdiCodeSpace",
          groupHover: "group-hover:(bg-socials-telegram text-white)",
        },
        WhatsApp: {
          label: "Message me on WhatsApp (opens in a new tab)",
          link: "https://wa.me/905355092605?text=Hi%20Mehdi%2C%20I%20found%20your%20website%20and%20would%20like%20to%20get%20in%20touch.",
          groupHover: "group-hover:(bg-socials-whatsapp text-white)",
        },
        Instagram: {
          label: "Instagram profile (opens in a new tab)",
          link: "https://www.instagram.com/mehdicodespace",
          groupHover: "socials-instagram-gradient",
        },
      },
    };
  },
};
</script>

<style scoped>
.socials-instagram-gradient { isolation: isolate; transition: color .3s ease; }
.socials-instagram-gradient::before {
  content: "";
  position: absolute;
  z-index: 0;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(45deg, #feda75 0%, #fa7e1e 25%, #d62976 50%, #962fbf 75%, #4f5bd5 100%);
  opacity: 0;
  transition: opacity .3s ease;
}
.socials-instagram-gradient > svg { z-index: 1; }
.group:hover .socials-instagram-gradient,
.group:focus-visible .socials-instagram-gradient { color: #fff; }
.group:hover .socials-instagram-gradient::before,
.group:focus-visible .socials-instagram-gradient::before { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .socials-instagram-gradient,
  .socials-instagram-gradient::before { transition: none; }
}
</style>
