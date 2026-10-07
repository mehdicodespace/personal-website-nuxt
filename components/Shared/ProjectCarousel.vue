<template>
  <div class="role-project-carousel">
    <div class="role-project-heading">
      <h4 v-if="title">{{ title }}</h4>
      <div v-if="hasOverflow" class="role-project-controls">
      <span>{{ activeIndex + 1 }} / {{ projects.length }}</span>
      <button type="button" aria-label="Previous project" :disabled="atStart" @click="carousel?.slidePrev()">←</button>
      <button type="button" aria-label="Next project" :disabled="atEnd" @click="carousel?.slideNext()">→</button>
      </div>
    </div>
    <Swiper :modules="[A11y, Keyboard]" :slides-per-view="1" :space-between="20"
      :breakpoints="{ 768: { slidesPerView: 1.6 }, 1100: { slidesPerView: 2 } }"
      :keyboard="{ enabled: true, onlyInViewport: true }" :speed="350" :watch-overflow="true"
      @swiper="onSwiper" @slide-change="sync" @resize="sync" @lock="sync" @unlock="sync">
      <SwiperSlide v-for="project in projects" :key="project.id"><Shared-ProjectCard :project="project" /></SwiperSlide>
    </Swiper>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { A11y, Keyboard } from 'swiper/modules';
import 'swiper/css';
defineProps({ projects: { type: Array, required: true }, title: { type: String, default: '' } });
let carousel;
const activeIndex = ref(0);
const atStart = ref(true);
const atEnd = ref(false);
const hasOverflow = ref(false);
function sync(instance = carousel) {
  if (!instance) return;
  activeIndex.value = instance.activeIndex;
  atStart.value = instance.isBeginning;
  hasOverflow.value = !instance.isLocked;
  atEnd.value = instance.isEnd;
}
function onSwiper(instance) { carousel = instance; sync(instance); }
</script>
<style scoped>
.role-project-carousel { min-width: 0; }
.role-project-heading { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 12px; }
.role-project-heading h4 { min-width: 0; }
.role-project-controls { display: flex; justify-content: end; align-items: center; gap: 8px; flex-shrink: 0; }
.role-project-controls span { color: #ffffff70; font-size: .85rem; margin-right: 8px; }
.role-project-controls button { border: 1px solid #ffffff25; width: 38px; height: 38px; border-radius: 50%; color: #f47a08; }
.role-project-controls button:hover:not(:disabled) { background: #f47a0815; border-color: #f47a08; }
.role-project-controls button:disabled { opacity: .25; cursor: default; }
.role-project-carousel :deep(.swiper-slide) { height: auto; padding-top: 4px; }
.role-project-carousel :deep(.project-card) { height: 100%; }
</style>
