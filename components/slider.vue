<template>
  <div ref="wrapper" class="article-carousel" :aria-busy="showSkeleton">
    <div v-show="showSkeleton" class="article-skeletons" :class="{ 'is-visible': showSkeleton }" aria-hidden="true">
      <div v-for="n in 3" :key="n" class="article-skeleton"><span></span><span></span></div>
    </div>
    <Swiper
      class="article-swiper"
      :class="{ 'is-loading': showSkeleton }"
      :inert="showSkeleton ? '' : undefined"
      :modules="modules"
      effect="coverflow"
      :grab-cursor="true"
      :centered-slides="true"
      :slides-per-view="1.4"
      :breakpoints="{ 650: { slidesPerView: 2 }, 1000: { slidesPerView: 3 } }"
      :loop="items.length >= 6"
      :initial-slide="Math.min(2, items.length - 1)"
      :coverflow-effect="{ rotate: 28, stretch: 0, depth: 130, modifier: 1, slideShadows: false }"
      :autoplay="{ delay: 5000, disableOnInteraction: true, pauseOnMouseEnter: true }"
      :speed="650"
      :pagination="{ clickable: true }"
      :resize-observer="true"
      @focusin="carousel?.autoplay.stop()"
      @swiper="onSwiper"
    >
      <SwiperSlide v-for="item in items" :key="item.id">
        <NuxtLink :to="`/post/${item.slug}`" class="article-slide-link">
          <img :src="`/imgs/blog/${item.img}`" :alt="item.title" loading="lazy" draggable="false" />
          <time class="article-date">{{ item.date }}</time>
          <div class="article-caption">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <span class="article-read">Read article <span aria-hidden="true">↗</span></span>
          </div>
        </NuxtLink>
      </SwiperSlide>
    </Swiper>
    <div class="article-controls" v-if="!showSkeleton" aria-label="Article carousel controls">
      <button type="button" aria-label="Previous article" @click="carousel?.slidePrev()">←</button>
      <span>Explore the latest writing</span>
      <button type="button" aria-label="Next article" @click="carousel?.slideNext()">→</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCoverflow, Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const props = defineProps({ items: { type: Array, required: true }, showSkeleton: Boolean });
const modules = [EffectCoverflow, Pagination, Autoplay, A11y];
const wrapper = ref(null);
let carousel;
let observer;
let visible = false;
let reduceMotion = false;

function syncCarousel() {
  if (!carousel || carousel.destroyed) return;
  carousel.update();
  if (visible && !props.showSkeleton && !reduceMotion) carousel.autoplay.start();
  else carousel.autoplay.stop();
}
function onSwiper(instance) {
  carousel = instance;
  syncCarousel();
}
watch(() => props.showSkeleton, async () => { await nextTick(); syncCarousel(); });
onMounted(() => {
  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    syncCarousel();
  }, { threshold: 0.1 });
  observer.observe(wrapper.value);
});
onBeforeUnmount(() => observer?.disconnect());
</script>

<style scoped>
.article-carousel { --card-height: clamp(230px, 28vw, 380px); position: relative; width: 100%; min-width: 0; max-width: 1400px; min-height: calc(var(--card-height) + 56px); margin: 0 auto; }
.article-swiper { width: 100%; min-width: 0; padding: 20px 0 36px; opacity: 1; transform: translateY(0); transition: opacity .7s ease, transform .7s ease; pointer-events: none; }
.article-swiper.is-loading { opacity: 0; transform: translateY(16px); }
.article-swiper :deep(.swiper-slide) { height: var(--card-height); overflow: hidden; border: 1px solid #ffffff12; border-radius: 14px; transition: border-color .3s, box-shadow .3s; }
.article-swiper :deep(.swiper-slide-active) { border-color: #f47a0870; box-shadow: 0 18px 42px #0007; }
.article-swiper :deep(.swiper-slide), .article-swiper :deep(.swiper-slide a) { pointer-events: auto; }
.article-swiper :deep(.swiper-slide:not(.swiper-slide-active)) .article-slide-link { opacity: .74; }
.article-swiper :deep(.swiper-slide:not(.swiper-slide-active)) img { filter: saturate(.7); }
.article-swiper :deep(.swiper-slide:hover) .article-slide-link, .article-swiper :deep(.swiper-slide:focus-within) .article-slide-link { opacity: 1; }
.article-swiper :deep(.swiper-slide:hover) img, .article-swiper :deep(.swiper-slide:focus-within) img { filter: saturate(1); transform: scale(1.045); }
.article-swiper :deep(.swiper-slide-active) .article-slide-link { box-shadow: inset 0 0 0 1px #f47a0870; }
.article-swiper :deep(.swiper-pagination-bullet) { background: #f47a08; }
.article-slide-link { display: block; position: relative; width: 100%; height: 100%; overflow: hidden; color: white; cursor: pointer; transition: opacity .25s; border-radius: inherit; background: #222; }
.article-slide-link:focus-visible { outline-offset: -3px; }
.article-slide-link img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s, filter .3s; }
.article-slide-link::after { content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none; background: linear-gradient(180deg, #0003 0%, transparent 30%, #0003 52%, #050505e8 100%); }
.article-date, .article-caption { z-index: 2; pointer-events: none; }
.article-read { display: flex; justify-content: space-between; color: #ffb26b; font-size: .85rem; font-weight: 600; margin-top: 12px; }
.article-read > span { transition: transform .2s; }
.article-slide-link:hover .article-read > span { transform: translate(2px, -2px); }
.article-controls { display: flex; justify-content: center; align-items: center; gap: 20px; margin: 2px 0 12px; }
.article-controls span { color: #ffffff70; font-size: .85rem; }
.article-controls button { width: 40px; height: 40px; border-radius: 50%; border: 1px solid #ffffff20; background: #252525; transition: border-color .2s, color .2s; }
.article-controls button:hover { border-color: #f47a08; color: #f47a08; }
.article-date { position: absolute; top: 12px; left: 12px; border-radius: 6px; background: #0009; padding: 5px 8px; font-size: .8rem; }
.article-caption { position: absolute; inset: auto 0 0; padding: 24px 18px 18px; background: transparent; }
.article-caption h3 { font-size: 1.15rem; font-weight: 650; line-height: 1.35; letter-spacing: -.01em; }
.article-caption p { margin-top: 8px; color: #ffffffb3; font-size: .9rem; line-height: 1.5; }
.article-caption h3, .article-caption p { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }
.article-skeletons { position: absolute; inset: 20px 0 36px; display: flex; gap: 20px; justify-content: center; overflow: hidden; opacity: 0; transform: translateY(-8px); transition: opacity .7s ease, transform .7s ease; pointer-events: none; }
.article-skeletons.is-visible { opacity: 1; transform: translateY(0); }
.article-skeleton { position: relative; flex: 0 0 32%; height: var(--card-height); border-radius: 14px; background: linear-gradient(100deg, #292929 25%, #3c3c3c 50%, #292929 75%); background-size: 200% 100%; animation: article-shimmer 1.3s linear infinite; }
.article-skeleton span { position: absolute; left: 18px; right: 18px; bottom: 55px; height: 22px; background: #ffffff09; border-radius: 5px; }
.article-skeleton span + span { bottom: 24px; right: 35%; height: 14px; }
.article-skeleton:not(:nth-child(2)) { transform: scale(.9); }
@keyframes article-shimmer { to { background-position: -200% 0; } }
@media (max-width: 649px) {
  .article-caption { padding: 20px 12px 12px; background: linear-gradient(180deg, transparent 0%, #050505b8 38%, #050505f2 100%); }
  .article-caption h3 { font-size: 1.1rem; line-height: 1.4; text-shadow: 0 2px 8px #000; }
  .article-caption p { display: none; }
  .article-skeleton { flex-basis: 70%; }
}
@media (prefers-reduced-motion: reduce) { .article-swiper, .article-skeletons { transition: none; } .article-skeleton { animation: none; } }
</style>
