<script>
import { mapActions, mapState } from "pinia";
import useProjectsStore from "@/stores/projects";

export default {
  props: {
    showDetailsButtom: { default: true },
    headline: { default: false },
    homePage: { default: false },
    aboutPage: { default: false },
    portfoliosPage: { default: false },
    selectedCategory: { default: 'all' },
    totalProjectsCount: { default: 0 },
    slidesPerView: {
      default: 2.5,
    },
    slideAutoPlay: {
      default: false,
    },
    currentSliderNum: {
      default: 1,
    },
    projects: {},
    breakpoints: {
      default: {
        320: {
          itemsToShow: 1,
        },

        900: {
          itemsToShow: 1.4,
        },
        1200: {
          itemsToShow: 1.8,
        },
        1300: {
          itemsToShow: 2,
        },
        1400: {
          itemsToShow: 2.2,
        },
        1600: {
          itemsToShow: 2.5,
        },
        1800: {
          itemsToShow: 3,
        },
      },
    },
  },
  data() {
    return {
      width: null,
      nextDisabled: false,
      prevDisabled: true,
    };
  },
  computed: {
    ...mapState(useProjectsStore, ["getPortfolios", "getCategories"]),
    currentSlider() {
      return this.$refs[`slider${this.currentSliderNum}`];
    },
    categoryCounts() {
      const counts = {};
      this.getCategories.forEach(category => {
        if (category === 'all') {
          counts[category] = this.getPortfolios().length;
        } else {
          counts[category] = this.getPortfolios(null, null, category).length;
        }
      });
      return counts;
    },
    projectTransitionKey() {
      const projectIds = Array.isArray(this.projects) ? this.projects.map(project => project.id).join('|') : '';
      return `${this.selectedCategory}|${projectIds}`;
    },
    settings() {
      if (process.client) {
        let width = window.innerWidth;
        let breakpoint = 1900;
        switch (true) {
          case width >= 1600 && width < 1900: {
            breakpoint = 1600;
            break;
          }
          case width >= 1400 && width < 1600: {
            breakpoint = 1400;
            break;
          }
          case width >= 1200 && width < 1400: {
            breakpoint = 1200;
            break;
          }
          case width >= 900 && width < 1200: {
            breakpoint = 900;
            break;
          }
          case width >= 320 && width < 900: {
            breakpoint = 320;
            break;
          }
        }
        return {
          itemsToShow: this.breakpoints[breakpoint]?.itemsToShow,
        };
      }
    },
  },
  methods: {
    ...mapActions(useProjectsStore, ["showGallery"]),
    prevSlide() {
      if (this.currentSlider.data.currentSlide.value !== 0)
        this.currentSlider.prev();
    },
    nextSlide() {
      if (
        this.currentSlider.data.currentSlide.value !==
        this.currentSlider.data.maxSlide.value
      )
        this.currentSlider.next();
    },
    sliderChanged() {
      let maxSlide = this.currentSlider.data.maxSlide.value;
      setTimeout(() => {
        this.prevDisabled = this.currentSlider.data.currentSlide.value === 0;
        this.nextDisabled =
          this.currentSlider.data.currentSlide.value === maxSlide;
      }, 50);
    },
    goToLink(link) {
      this.$router.push({ path: link });
    },
    onCategorySelected(category) {
      this.$emit('category-selected', category);
    },
  },
};
</script>

<template>
  <section class="relative flex-1" v-if="!portfoliosPage">
    <div class="flex items-center justify-between mr-10" v-if="headline">
      <h2 class="relative text-left">
        <span
          class="updown inline-block absolute -top-1 -left-2.5 w-14 h-14 bg-main-orange rounded-full"
        ></span>
        <span class="loading 2xl:text-5xl xs:text-4xl tracking">Latest</span>
        <span
          class="loading 2xl:text-4xl xs:text-2xl font-bold text-main-orange"
        >
          Projects
        </span>
      </h2>

      <nuxt-link
        :to="{ path: '/portfolios' }"
        class="flex items-center gap-1 text-lg transition duration-200 text-main-orange/80 hover:text-main-orange font-bold"
      >
        <span class="sm:block xs:(hidden)">View More Projects</span>
        <span class="sm:hidden xs:(block)">View More</span>
        <svg :class="['relative w-10 h-10 ']">
          <IconArrow />
        </svg>
      </nuxt-link>
    </div>
    <div
      :class="[
        'relative flex flex-wrap w-full',
        { 'mr-10 mt-4 mb-8': aboutPage },
        { 'sm:(my-10) xs:(mt-4 mb-6)': homePage },
      ]"
    >
      <swipeCarousel
        @slide-start="sliderChanged"
        :ref="`slider${currentSliderNum}`"
        :breakpoints="breakpoints"
        snap-align="start"
        v-bind="settings"
        class="w-full"
      >
        <swipeSlide
          v-for="project in projects"
          :key="project.id"
          class="relative border-r-20 border-transparent"
        >
          <div
            :class="[
              'flex flex-col gap-4 justify-center items-center rounded-lg py-5',
            ]"
          >
            <a
              @click.prevent="
                $router.push({ path: `/project/${project.name}` })
              "
              class="absolute z-30 w-full h-full cursor-pointer"
            >
            </a>
            <Shared-Screen
              @click="showGallery(project.id)"
              :class="[
                'relative z-50',
                { 'md:w-110 sm:w-130 w-70': aboutPage },
                { 'md:w-110 sm:w-130 xs:w-100': homePage },
              ]"
              :about-page="true"
              screen-height="sm:h-60 h-50"
              :media="project.media[project.mainMedia]"
              :enable-hover-effects="true"
            />
            <section
              class="flex flex-col gap-2 flex-wrap items-center justify-center w-full px-12"
            >
              <p
                :class="[
                  'font-medium ',
                  aboutPage ? 'text-lg sm:text-xl' : 'text-2xl',
                ]"
              >
                <span class="text-main-orange">{{ project.name }}</span>
                {{ project.title }}
              </p>
              <p class="opacity-70">{{ project.description }}</p>
            </section>
          </div>
        </swipeSlide>
      </swipeCarousel>
      <div class="flex gap-6 w-full justify-center mt-2 items-center md:mt-0">
        <button
          @click="prevSlide"
          :class="[
            ' lg:(absolute -left-6 top-1/2 transform -translate-y-1/2)  bg-dark-50 transition duration-200 rounded-full',
            prevDisabled
              ? 'bg-opacity-60 cursor-not-allowed'
              : 'bg-opacity-90 hover:bg-opacity-100',
          ]"
        >
          <svg
            :class="[
              'relative w-14 h-14 transform rotate-180',
              prevDisabled ? ' text-stone-500' : 'text-orange',
            ]"
          >
            <IconArrow />
          </svg>
        </button>

        <button
          @click="nextSlide"
          :class="[
            'lg:(absolute right-0 bg-opacity-90 top-1/2 transform -translate-y-1/2) bg-opacity-90 bg-dark-50 bg-opacity-50 transition duration-200 rounded-full',
            nextDisabled ? 'cursor-not-allowed' : 'hover:bg-opacity-100',
          ]"
        >
          <svg
            :class="[
              'relative w-14 h-14',
              nextDisabled ? 'text-stone-500' : 'text-orange',
            ]"
          >
            <IconArrow />
          </svg>
        </button>
      </div>
    </div>
  </section>
  <section class="mt-12 w-full px-8 sm:px-12 xl:px-20" v-else>
    <div class="mb-7">
      <h1 class="text-4xl font-bold">Projects <span class="text-main-orange">&amp; Portfolio</span></h1>
    </div>
    <Shared-CategoryFilter :selected-category="selectedCategory" :category-counts="categoryCounts" @category-selected="onCategorySelected" />
    <TransitionGroup :key="projectTransitionKey" name="blog-card" tag="div" class="portfolio-grid" appear>
      <Shared-ProjectCard v-for="(project, index) in projects" :key="project.id" :project="project" :style="{ '--blog-card-delay': `${Math.min(index, 5) * 55}ms` }" />
    </TransitionGroup>
  </section>
</template>
<style>
.portfolio-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px; margin-top: 28px; }
@media (min-width: 650px) { .portfolio-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1280px) { .portfolio-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.carousel__viewport {
  border-radius: 8px;
}

.blog-card-enter-active { transition: opacity .46s cubic-bezier(.22, .61, .36, 1), transform .46s cubic-bezier(.22, .61, .36, 1); transition-delay: var(--blog-card-delay, 0ms); }
.blog-card-enter-from { opacity: 0; transform: translateY(14px); }
.blog-card-move { transition: transform .4s cubic-bezier(.22, .61, .36, 1); }
.project-card.blog-card-enter-active { transition: opacity .46s cubic-bezier(.22, .61, .36, 1), transform .46s cubic-bezier(.22, .61, .36, 1); transition-delay: var(--blog-card-delay, 0ms); }
.project-card.blog-card-enter-from { opacity: 0; transform: translateY(14px); }
.project-card.blog-card-move { transition: transform .4s cubic-bezier(.22, .61, .36, 1); }
@media (prefers-reduced-motion: reduce) {
  .blog-card-enter-active, .blog-card-move, .project-card.blog-card-enter-active, .project-card.blog-card-move { transition-duration: .01ms; transition-delay: 0ms; }
}

/* Ensure single items stay in first column position */
.project-item:only-child {
  grid-column: 1;
}


/* Project item hover effects */
.project-item {
  transition: all 0.3s ease;
}

.project-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}
</style>
