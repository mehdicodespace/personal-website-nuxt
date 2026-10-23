<template>
  <Title>{{ project.name }} Project | Mehdi Rafiei</Title>
  <Meta name="description" :content="seoDescription" />
  <Meta property="og:type" content="website" />
  <Meta property="og:title" :content="`${project.name} Project | Mehdi Rafiei`" />
  <Meta property="og:description" :content="seoDescription" />

  <div
    class="project-page page-content-enter relative bg-dark/70 rounded-lg flex flex-col py-8 px-4 sm:px-8 lg:px-12 xl:px-16 border border-neutral-700 mx-4 sm:mx-8 xl:mx-16 mt-24 sm:mt-30"
  >
    <NuxtLink :to="{ path: '/portfolios' }" class="project-back-link">
      <IconArrow aria-hidden="true" class="rotate-180" />
      <span>All portfolios</span>
    </NuxtLink>
    <section class="project-overview" aria-label="Project overview">
      <div class="project-overview-heading">
        <h1 class="project-title">
          <span>{{ project.name }}</span>
          <span>{{ project.title }}</span>
        </h1>
        <div class="project-labels">
          <span v-if="project.projectKind === 'independent'" class="project-origin">Independent</span>
          <span v-if="project.category === 'GitHub Projects'" class="project-github-category">
            <IconGithub aria-hidden="true" />
            GitHub Projects
          </span>
          <span v-else class="project-category">{{ project.category }}</span>
        </div>
      </div>
      <p class="project-description">{{ project.description }}</p>

      <div class="project-overview-footer">
        <div v-if="project.sourceCode || project.liveDemo" class="project-links">
          <a v-if="project.sourceCode" :href="project.sourceCode" target="_blank" rel="noopener noreferrer">
            Source code <span aria-hidden="true">↗</span>
          </a>
          <a v-if="project.liveDemo" :href="project.liveDemo" target="_blank" rel="noopener noreferrer" class="project-live-link">
            Live demo <span aria-hidden="true">↗</span>
          </a>
        </div>
        <ul class="project-skills" aria-label="Technologies used">
      <li v-for="skill in project.used" :key="skill">
        <img
          :src="`/imgs/skills/${skill}.svg`"
          alt=""
          class="w-8 h-8"
          :title="skill"
        />
      </li>
        </ul>
      </div>
    </section>
    <div
      class="w-full grid lg:grid-cols-4 sm:(grid-cols-3 grid-rows-3) xs:(grid-rows-4 grid-cols-2) gap-4 mt-8"
    >
      <Shared-Screen
        @click="showGallery(project.id)"
        class="group relative sm:(col-span-3 row-span-3) xs:(col-span-2 row-span-4) w-full"
        :media="project.media[project.mainMedia]"
        screen-height="lg:h-134 md:h-126 sm:h-100 xs:h-86"
        :only-screen="true"
        :enable-hover-effects="true"
      />
      <div
        @click="showGallery(project.id, mediaIndex + 1)"
        class="relative group row-span-1 w-full h-42 overflow-hidden rounded-xl skeleton"
        v-for="(media, mediaIndex) in otherMedia"
        :key="mediaIndex"
      >
        <!-- Skeleton background -->
        <div
          v-if="!mediaLoaded[mediaIndex]"
          class="absolute inset-0 skeleton-bg pointer-events-none"
        ></div>

        <img
          v-if="media?.type === 'img'"
          :src="media.src"
          alt=""
          :class="['w-full h-full object-cover', { 'loaded': mediaLoaded[mediaIndex] }]"
          @load="onImageLoad(mediaIndex)"
        />
        <video
          :class="['w-full h-full object-cover', { 'loaded': mediaLoaded[mediaIndex] }]"
          v-if="media?.type === 'video'"
          :src="media?.src"
          controlsList="nodownload"
          @loadeddata="onVideoLoad(mediaIndex)"
        ></video>
        <Shared-Zoom />
      </div>

      <div
        @click="showGallery(project.id, 3)"
        v-if="project.media.length - 3 > 0"
        class="bg-dark-200 sm:(row-span-1 col-span-1 h-initial) xs:(col-span-2 h-50) trans3ms rounded-lg flex items-center justify-center text-3xl cursor-pointer hover:bg-dark-900"
      >
        +{{ project.media.length - 3 }}
      </div>
    </div>

    <div v-if="!project.sourceCode" class="mt-12 text-xl text-center">
      More description of the projects will be added later
    </div>
    <transition name="fadeScale">
      <Shared-Gallery v-if="galleryVisible" :project="project" />
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import useProjectsStore from "@/stores/projects";

export default {
  data() {
    return {
      mediaLoaded: [],
      skeletonMinTime: 500, // Minimum time to show skeleton (500ms)
    };
  },
  computed: {
    ...mapState(useProjectsStore, [
      "getPortfolio",
      "portfolios",
      "galleryVisible",
    ]),
    seoDescription() {
      const description = `${this.project.name}: ${this.project.description}`
        .replace(/\s+/g, " ")
        .trim();
      return description.length <= 155
        ? description
        : `${description.slice(0, 152).replace(/\s+\S*$/, "").trimEnd()}...`;
    },
    otherMedia() {
      return this.project.media
        .filter((media, index) => {
          return index !== this.project.mainMedia;
        })
        .splice(0, 2);
    },
    project() {
      let projectName = this.$route.params.project;
      let project = this.getPortfolio(null, projectName);
      if (!project) {
        throw createError({
          statusCode: 404,
          message: `${projectName} Project not found`,
          fatal: true,
        });
      }
      return project;
    },
  },
  mounted() {
    // Initialize mediaLoaded state for all media items
    this.mediaLoaded = new Array(this.otherMedia.length).fill(false);

    // Record when skeleton loading started
    this.skeletonStartTime = Date.now();

    // Fallback for SSR: ensure all images become visible after a timeout
    this.$nextTick(() => {
      setTimeout(() => {
        this.otherMedia.forEach((_, index) => {
          if (!this.mediaLoaded[index]) {
            this.mediaLoaded[index] = true;
          }
        });
      }, 3000); // 3 second fallback for SSR cases
    });
  },
  methods: {
    ...mapActions(useProjectsStore, ["showGallery"]),
    onImageLoad(mediaIndex) {
      // Image loaded successfully - ensure minimum skeleton time
      const elapsed = Date.now() - this.skeletonStartTime;
      const remainingTime = Math.max(0, this.skeletonMinTime - elapsed);

      setTimeout(() => {
        this.mediaLoaded[mediaIndex] = true;
      }, remainingTime);
    },
    onVideoLoad(mediaIndex) {
      // Video loaded successfully - ensure minimum skeleton time
      const elapsed = Date.now() - this.skeletonStartTime;
      const remainingTime = Math.max(0, this.skeletonMinTime - elapsed);

      setTimeout(() => {
        this.mediaLoaded[mediaIndex] = true;
      }, remainingTime);
    },
  },
};
</script>

<style scoped>
.project-back-link { position: absolute; top: -42px; left: 12px; display: inline-flex; align-items: center; gap: 7px; min-height: 32px; padding: 0 11px; border: 1px solid #ffffff18; border-radius: 999px; background: #202020e8; color: #ffad62; font-size: .84rem; font-weight: 650; line-height: 1; transition: border-color .2s, color .2s, background .2s, transform .2s; }
.project-back-link:hover { transform: translateX(-2px); border-color: #f47a0866; background: #29231e; color: #ffc084; }
.project-back-link :deep(svg) { width: 16px; height: 16px; }
.project-overview { width: 100%; margin: 8px 0 4px; padding: 20px 22px; border: 1px solid #ffffff16; border-radius: 14px; background: linear-gradient(110deg, #ffffff05, #f47a0808); text-align: left; }
.project-overview-heading { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px 18px; }
.project-title { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 11px; margin: 0; font-size: clamp(1.5rem, 2.2vw, 2rem); font-weight: 700; line-height: 1.2; }
.project-title span:first-child { color: #f47a08; }
.project-title span:last-child { color: #f3f4f6; }
.project-labels { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.project-origin, .project-category, .project-github-category { display: inline-flex; align-items: center; min-height: 30px; padding: 4px 10px; border: 1px solid #ffffff1d; border-radius: 999px; font-size: .78rem; font-weight: 600; line-height: 1; white-space: nowrap; }
.project-origin { border-color: #f47a0855; background: #f47a0814; color: #ffb16b; }
.project-category { background: #f47a0814; color: #ffb16b; }
.project-github-category { gap: 6px; background: #171819; color: #e3e5e8; }
.project-github-category svg { width: 15px; height: 15px; color: #f4f4f5; }
.project-description { max-width: 1100px; margin: 12px 0 0; color: #ffffffd9; font-size: 1rem; line-height: 1.55; }
.project-overview-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px 20px; margin-top: 15px; }
.project-links { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.project-links a { display: inline-flex; align-items: center; gap: 7px; min-height: 38px; padding: 0 13px; border: 1px solid #ffffff26; border-radius: 8px; color: #f3f3f3; font-size: .88rem; font-weight: 600; transition: border-color .2s, color .2s, background .2s; }
.project-links a:hover { border-color: #f47a0880; color: #ffb16b; background: #f47a0812; }
.project-links .project-live-link { border-color: #f47a0870; color: #ffb16b; }
.project-links .project-live-link:hover { background: #f47a0824; }
.project-skills { display: flex; flex-wrap: wrap; align-items: center; gap: 11px; margin: 0; padding: 0; list-style: none; }
.project-skills img { display: block; width: 25px; height: 25px; object-fit: contain; }
@media (max-width: 640px) {
  .project-back-link { top: -40px; left: 8px; min-height: 30px; padding-inline: 9px; font-size: .8rem; }
  .project-overview { padding: 16px; }
  .project-overview-heading { align-items: flex-start; }
  .project-title { font-size: 1.45rem; }
  .project-description { font-size: .94rem; }
  .project-overview-footer { align-items: flex-start; }
  .project-skills { gap: 10px; }
}
@media (prefers-reduced-motion: reduce) { .project-links a { transition: none; } }
.gallery {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  background: #333;
  transition: background-position var(--transitionSpeed) linear;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 100% auto;
  border-radius: 0.5rem;
}

/* Grid item loading states */
.grid img,
.grid video {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.grid img.loaded,
.grid video.loaded {
  opacity: 1;
}

/* Skeleton background effect */
.skeleton-bg {
  background: linear-gradient(90deg, #343334 25%, #4a4a4a 50%, #343334 75%);
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
  z-index: 0;
  pointer-events: none;
}

/* Ensure media content appears above skeleton */
.group img,
.group video {
  position: relative;
  z-index: 1;
}

/* Ensure zoom component is always on top */
.group > div:last-child {
  position: absolute;
  z-index: 10;
}

/* Skeleton shimmer animation */
@keyframes skeleton-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
