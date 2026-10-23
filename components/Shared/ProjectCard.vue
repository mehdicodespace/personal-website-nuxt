<template>
  <article class="project-card" :class="{ 'content-pending': pending }" :aria-busy="pending" :inert="pending ? '' : undefined" tabindex="0" @click="openProject" @keydown.enter.prevent="openProject" @keydown.space.prevent="openProject">
    <div class="project-card-preview" data-skeleton>
      <div
        class="project-card-screen"
        role="button"
        tabindex="0"
        :aria-label="`Open ${project.name} gallery`"
        @click.stop="store.showGallery(project.id)"
        @keydown.enter.prevent="store.showGallery(project.id)"
        @keydown.space.prevent="store.showGallery(project.id)"
      >
        <Shared-Screen :media="project.media[project.mainMedia]" :enable-hover-effects="true" screen-height="" @media-ready="mediaReady = $event" />
      </div>
    </div>
    <div class="project-card-copy">
      <h3 data-skeleton><NuxtLink :to="`/project/${project.name}`">{{ project.name }}</NuxtLink></h3>
      <p class="project-card-title" data-skeleton>{{ project.title }}</p>
      <p class="project-card-description" data-skeleton>{{ project.description }}</p>
      <div class="project-card-meta" data-skeleton>
        <span v-if="project.projectKind === 'independent'" class="project-kind">Independent</span>
        <span v-if="project.category === 'GitHub Projects'" class="project-card-category github-project-category">
          <IconGithub aria-hidden="true" />
          <span>GitHub Projects</span>
        </span>
        <span v-else class="project-card-category">{{ project.category }}</span>
      </div>
      <div class="project-card-footer" data-skeleton>
        <div class="project-card-stack" aria-label="Technologies">
          <img v-for="skill in project.used.slice(0, 5)" :key="skill" :src="`/imgs/skills/${skill}.svg`" :alt="skill" :title="skill" width="20" height="20" loading="lazy" />
        </div>
        <div v-if="project.sourceCode || project.liveDemo" class="project-card-links">
          <a v-if="project.sourceCode" :href="project.sourceCode" target="_blank" rel="noopener noreferrer" @click.stop>Source <span aria-hidden="true">↗</span></a>
          <a v-if="project.liveDemo" :href="project.liveDemo" target="_blank" rel="noopener noreferrer" @click.stop>Live demo <span aria-hidden="true">↗</span></a>
        </div>
        <NuxtLink v-else :to="`/project/${project.name}`">View Project <span aria-hidden="true">→</span></NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup>
import useProjectsStore from '@/stores/projects';
const router = useRouter();
const props = defineProps({
  project: { type: Object, required: true },
  loading: Boolean,
  showSkeleton: { type: Boolean, default: true },
});
const mediaReady = ref(false);
const pending = computed(() => props.showSkeleton && (props.loading || !mediaReady.value));
const store = useProjectsStore();
function openProject(event) {
  if (event?.target?.closest('a, button, [role="button"]')) return;
  router.push(`/project/${props.project.name}`);
}
</script>

<style scoped>
.project-card { position: relative; min-width: 0; border: 1px solid #ffffff12; border-radius: 16px; background: #242424; overflow: hidden; transition: border-color .2s, transform .2s; cursor: pointer; }
.project-card:hover { border-color: #f47a0866; transform: translateY(-3px); }
.project-card:focus-visible { outline: 2px solid #f47a08; outline-offset: 4px; }
.project-card-preview { padding: 28px 36px 12px; background: linear-gradient(145deg, #30302e, #202121); }
.project-card-screen { width: 100%; cursor: zoom-in; border-radius: 12px; }
.project-card-screen:focus-visible { outline: 2px solid #f47a08; outline-offset: 8px; }
.project-card-screen :deep(.screen) { height: auto; aspect-ratio: 16 / 10; }
.project-card-screen :deep(.keys), .project-card-screen :deep(.comp) { left: -22px; width: calc(100% + 44px); }
.project-card-screen :deep(.keys) { border-left-width: 22px; border-right-width: 22px; border-bottom-width: 24px; }
.project-card-screen :deep(.board) { border-bottom-width: 13px; }
.project-card-screen :deep(.touchpad) { top: 16px; width: 35%; border-bottom-width: 6px; }
.project-card-screen :deep(.comp) { height: 9px; }
.project-card-screen :deep(.notch) { width: 30%; height: 7px; }
.project-card-copy { padding: 20px; }
.project-card-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; min-height: 20px; margin-top: 12px; }
.project-card-category { display: inline-flex; align-items: center; padding: 3px 8px; border: 1px solid #ffffff1c; border-radius: 999px; background: #ffffff08; color: #d0d0d0; font-size: .72rem; font-weight: 550; line-height: 1.25; }
.github-project-category { display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px; border: 1px solid #ffffff17; border-radius: 999px; background: #161718; color: #d5d7da; font-size: .72rem; font-weight: 550; }
.github-project-category svg { width: 13px; height: 13px; color: #e6e8eb; }
.project-kind { display: inline-flex; align-items: center; padding: 3px 7px; border: 1px solid #f47a0840; border-radius: 999px; color: #ffb16b; font-size: .68rem; font-weight: 650; letter-spacing: .025em; line-height: 1; }
.project-card h3 { font-size: 1.5rem; font-weight: 720; color: #f47a08; }
.project-card-title { margin-top: 5px; color: #ffffffdf; font-weight: 600; }
.project-card-description { margin-top: 10px; color: #ffffff99; font-size: .91rem; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 3.2em; }
.project-card-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px; margin-top: 20px; padding-top: 16px; border-top: 1px solid #ffffff0d; }
.project-card-footer a { color: #f47a08; font-size: .9rem; font-weight: 600; }
.project-card-links { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 14px; }
.project-card-links a { display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; }
.project-card-stack { display: flex; gap: 10px; align-items: center; }
.project-card-stack img { width: 20px; height: 20px; object-fit: contain; }
.project-card h3 a:hover, .project-card-footer a:hover { color: #ffae63; }
.project-card.content-pending:hover { transform: none; border-color: #ffffff12; }
.project-card.content-pending .project-card-category::after { right: 65%; }
.project-card.content-pending h3::after { right: 35%; }
@media (max-width: 549px) { .project-card-preview { padding: 20px 20px 8px; } }
@media (prefers-reduced-motion: reduce) { .project-card { transition: none; } .loading > *, .textLoading::before { animation: none; } }
</style>
