<template>
  <div ref="dialog" role="dialog" aria-modal="true" :aria-label="`${project.name} gallery`" tabindex="-1" @keydown.esc="hideGallery" @keydown.tab="trapFocus" @keydown.left.prevent="prevMedia" @keydown.right.prevent="nextMedia" class="project-gallery">
    <header class="gallery-toolbar">
      <div class="gallery-heading">
        <span class="gallery-count">{{ String(activeMediaIndex + 1).padStart(2, '0') }} <i>/</i> {{ String(project.media.length).padStart(2, '0') }}</span>
        <div>
          <NuxtLink :to="`/project/${project.name}`" @click.prevent="hideGallery(); $router.push({ path: `/project/${project.name}` });" class="gallery-project-link">{{ project.name }} <span aria-hidden="true">↗</span></NuxtLink>
          <p class="gallery-media-title">{{ currentMedia.title }}</p>
        </div>
      </div>
      <div class="gallery-actions">
        <a v-if="project.sourceCode" :href="project.sourceCode" target="_blank" rel="noopener noreferrer" class="gallery-external-link">
          Source code <span aria-hidden="true">↗</span>
        </a>
        <a v-if="project.liveDemo" :href="project.liveDemo" target="_blank" rel="noopener noreferrer" class="gallery-external-link gallery-live-link">
          Live demo <span aria-hidden="true">↗</span>
        </a>
        <button v-if="currentMedia.type === 'img' && currentMedia.scroll" type="button" class="gallery-action" @click="toggleImgScroll">
          <IconArrow :class="['gallery-scroll-icon', imgScrollDown ? '-rotate-90' : 'rotate-90']" />
          <span>{{ imgScrollDown ? 'Pause screenshot scroll' : 'Auto-scroll screenshot' }}</span>
        </button>
        <button v-if="currentMedia.type === 'video'" type="button" class="gallery-action" :disabled="isMediaTransitioning" @click="toggleVideo($refs.screen.$refs.video)">
          <IconPlay v-if="!videoPlaying" class="w-4 h-4" /><IconPause v-else class="w-4 h-4" />
          <span>{{ videoPlaying ? 'Pause' : 'Play' }}</span>
        </button>
        <NuxtLink :to="`/project/${project.name}`" class="gallery-project-cta" @click.prevent="openProjectPage">
          <span>View project page</span><span aria-hidden="true">↗</span>
        </NuxtLink>
        <button ref="closeButton" type="button" aria-label="Close gallery" class="gallery-close" @click="hideGallery"><IconClose class="w-5 h-5" /></button>
      </div>
    </header>

    <main class="gallery-stage" @click="closeOnStageBackdrop">
      <Transition name="gallery-media" mode="out-in" @before-leave="isMediaTransitioning = true" @after-enter="isMediaTransitioning = false" @enter-cancelled="isMediaTransitioning = false" @leave-cancelled="isMediaTransitioning = false">
        <div :key="`${project.id}:${currentMedia.src}`" class="gallery-media-frame">
          <button v-if="navigation && project.media.length > 1" type="button" aria-label="Previous project image"
            :disabled="isMediaTransitioning"
            @click="prevMedia"
            class="gallery-arrow gallery-prev"
          >
            <IconArrow class="w-6 h-6 rotate-180" />
          </button>
          <Shared-Screen
            ref="screen"
            :class="['gallery-screen-wrapper relative my-4 justify-center',
            currentMedia.mobile && currentMedia.type !== 'video' ? 'gallery-screen-wrapper--mobile' : 'gallery-screen-wrapper--desktop']"
            :media="currentMedia"
            :screen-height="currentMedia.mobile && currentMedia.type !== 'video' ? 'lg:h-160 h-[min(70dvh,600px)]': 'lg:h-160 md:h-140 sm:h-104 xs:h-[min(64dvh,520px)]'"
            :only-screen="true"
            :zoom="false"
            :scroll="imgScrollDown"
            :video-controls="true"
          />
          <button v-if="navigation && project.media.length > 1" type="button" aria-label="Next project image"
            :disabled="isMediaTransitioning"
            @click="nextMedia"
            class="gallery-arrow gallery-next"
          >
            <IconArrow class="w-6 h-6" />
          </button>
        </div>
      </Transition>
    </main>

    <nav v-if="navigation && project.media.length > 1" ref="thumbnailRail" class="gallery-thumbnails" :class="{ 'is-dragging': isDraggingThumbnails }" aria-label="Project media" @pointerdown="startThumbnailDrag" @pointermove="moveThumbnailRail" @pointerup="endThumbnailDrag" @pointercancel="endThumbnailDrag" @dragstart.prevent @click.capture="suppressDraggedThumbnailClick">
      <button v-for="(media, index) in project.media" :key="media.src" type="button" class="gallery-thumbnail" :class="{ 'is-active': index === activeMediaIndex }" :aria-label="`Show ${media.title}`" :aria-current="index === activeMediaIndex ? 'true' : undefined" @click="selectMedia(index)">
        <img v-if="media.type === 'img'" :src="media.src" :alt="''" loading="lazy" draggable="false" />
        <img v-else-if="media.poster" :src="media.poster" :alt="''" loading="lazy" draggable="false" />
        <span v-else class="gallery-video-thumb"><IconVideo class="w-6 h-6" /></span>
        <span class="gallery-thumb-index">{{ String(index + 1).padStart(2, '0') }}</span>
        <span v-if="media.type === 'video'" class="gallery-video-badge"><IconPlay class="w-3 h-3" /></span>
      </button>
    </nav>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import useProjectsStore from "@/stores/projects";
export default {
  props: {
    project: {
      required: true,
    },
    navigation: {
      default: true,
    },
  },
  data() {
    return { thumbnailDragStart: null, isDraggingThumbnails: false, didDragThumbnails: false, dragClickGuard: null, isMediaTransitioning: false };
  },
  computed: {
    ...mapState(useProjectsStore, [
      "activeMediaIndex",
      "imgScrollDown",
      "videoPlaying",
    ]),
    currentMedia() {
      return this.project.media[this.activeMediaIndex];
    },
  },
  methods: {
    closeOnStageBackdrop(event) {
      if (event.target instanceof Element && event.target.closest('.gallery-screen-wrapper, .gallery-arrow')) return;
      this.hideGallery();
    },
    openProjectPage() {
      const path = `/project/${this.project.name}`;
      this.hideGallery();
      this.$router.push({ path });
    },
    startThumbnailDrag(event) {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      const rail = this.$refs.thumbnailRail;
      clearTimeout(this.dragClickGuard);
      this.didDragThumbnails = false;
      this.thumbnailDragStart = { x: event.clientX, scrollLeft: rail.scrollLeft };
    },
    moveThumbnailRail(event) {
      if (!this.thumbnailDragStart) return;
      const distance = event.clientX - this.thumbnailDragStart.x;
      if (Math.abs(distance) > 4 && !this.isDraggingThumbnails) {
        this.isDraggingThumbnails = this.didDragThumbnails = true;
        this.$refs.thumbnailRail.setPointerCapture(event.pointerId);
      }
      if (this.isDraggingThumbnails) {
        event.preventDefault();
        this.$refs.thumbnailRail.scrollLeft = this.thumbnailDragStart.scrollLeft - distance;
      }
    },
    endThumbnailDrag(event) {
      if (this.thumbnailDragStart && this.$refs.thumbnailRail.hasPointerCapture(event.pointerId)) {
        this.$refs.thumbnailRail.releasePointerCapture(event.pointerId);
      }
      this.thumbnailDragStart = null;
      this.isDraggingThumbnails = false;
      if (this.didDragThumbnails) {
        this.dragClickGuard = setTimeout(() => {
          this.didDragThumbnails = false;
          this.dragClickGuard = null;
        }, 250);
      }
    },
    suppressDraggedThumbnailClick(event) {
      if (!this.didDragThumbnails) return;
      event.preventDefault();
      event.stopPropagation();
      this.didDragThumbnails = false;
      clearTimeout(this.dragClickGuard);
      this.dragClickGuard = null;
    },
    trapFocus(event) {
      const elements = this.$refs.dialog.querySelectorAll('a[href], button, video[controls]');
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    },
    ...mapActions(useProjectsStore, [
      "hideGallery",
      "nextMedia",
      "prevMedia",
      "selectMedia",
      "toggleImgScroll",
      "toggleVideo",
    ]),
  },
  mounted() {
    this.returnFocus = document.activeElement;
    this.previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    this.$refs.closeButton?.focus();
  },
  beforeUnmount() {
    document.body.style.overflow = this.previousOverflow;
    if (this.returnFocus?.isConnected) this.returnFocus.focus({ preventScroll: true });
  },
};
</script>

<style scoped>
.project-gallery { position: fixed; inset: 0; z-index: 90; display: grid; grid-template-rows: auto minmax(0, 1fr) auto; overflow: hidden; color: #fff; background: radial-gradient(ellipse at 50% 43%, #242321 0%, #151515 66%, #101010 100%); }
.gallery-toolbar { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 18px clamp(18px, 4vw, 56px); border-bottom: 1px solid #ffffff12; background: #171717; }
.gallery-heading { display: flex; align-items: center; gap: 16px; min-width: 0; }
.gallery-count { flex: 0 0 auto; color: #f47a08; font-size: 1rem; font-variant-numeric: tabular-nums; font-weight: 700; letter-spacing: .06em; }
.gallery-count i { margin-inline: 4px; color: #ffffff50; font-style: normal; }
.gallery-heading > div { min-width: 0; }
.gallery-project-link { display: inline-flex; gap: 7px; align-items: center; color: #fff; font-size: 1.3rem; font-weight: 650; transition: color .2s; }
.gallery-project-link:hover { color: #f47a08; }
.gallery-project-link span { color: #f47a08; font-size: .85rem; }
.gallery-media-title { max-width: min(58vw, 720px); overflow: hidden; color: #ffffffa3; font-size: .98rem; text-overflow: ellipsis; white-space: nowrap; }
.gallery-actions { display: flex; flex-wrap: wrap; align-items: center; justify-content: flex-end; gap: 8px; }
.gallery-external-link { display: inline-flex; align-items: center; justify-content: center; gap: 6px; height: 42px; padding: 0 12px; border: 1px solid #ffffff20; border-radius: 10px; color: #ffffffd9; font-size: .9rem; font-weight: 600; white-space: nowrap; transition: border-color .2s, background .2s, color .2s; }
.gallery-external-link:hover { border-color: #ffffff55; background: #ffffff0c; color: #fff; }
.gallery-live-link { border-color: #f47a0870; background: #f47a0814; color: #ffb16b; }
.gallery-live-link:hover { border-color: #f47a08; background: #f47a0824; color: #ffbf80; }
.gallery-action, .gallery-close, .gallery-project-cta { display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 42px; padding: 0 14px; border: 1px solid #ffffff20; border-radius: 10px; background: #ffffff0a; color: #ffffffd9; transition: border-color .2s, background .2s, color .2s; }
.gallery-action:hover, .gallery-close:hover, .gallery-project-cta:hover { border-color: #f47a0880; background: #f47a081c; color: #ffae63; }
.gallery-action:disabled, .gallery-arrow:disabled { opacity: .55; cursor: wait; }
.gallery-project-cta { border-color: #f47a0870; background: #f47a0814; color: #ffae63; font-weight: 650; white-space: nowrap; }
.gallery-project-cta span:last-child { font-size: 1rem; }
.gallery-scroll-icon { width: 20px; height: 20px; }
.gallery-close { width: 42px; padding: 0; color: #ffffffad; }
.gallery-stage { position: relative; display: flex; min-height: 0; align-items: center; justify-content: center; padding: 22px 6vw; cursor: pointer; }
.gallery-stage :deep(.screen) { max-height: calc(100dvh - 230px); cursor: default; }
.gallery-media-frame { display: grid; width: 100%; min-width: 0; grid-template-columns: clamp(38px, 4vw, 60px) minmax(0, 1fr) clamp(38px, 4vw, 60px); align-items: center; justify-items: center; gap: clamp(8px, 2vw, 28px); }
.gallery-screen-wrapper { width: 100%; min-width: 0; }
.gallery-screen-wrapper--mobile { width: min(100%, 400px); }
.gallery-screen-wrapper--desktop { width: min(100%, 1120px); }
.gallery-media-enter-active, .gallery-media-leave-active { transition: opacity .34s ease, transform .42s cubic-bezier(.2, .8, .2, 1); will-change: opacity, transform; }
.gallery-media-enter-from { opacity: 0; transform: translate3d(0, 16px, 0) scale(.985); }
.gallery-media-leave-to { opacity: 0; transform: translate3d(0, -8px, 0) scale(.99); }
.gallery-arrow { position: relative; z-index: 1; display: grid; width: 54px; height: 54px; place-items: center; border: 1px solid #ffffff28; border-radius: 50%; background: #171717e8; color: #fff; cursor: pointer; transition: border-color .2s, color .2s, background .2s; }
.gallery-arrow:hover { border-color: #f47a08; background: #24211e; color: #f47a08; }
.gallery-thumbnails { display: flex; align-items: center; gap: 10px; overflow-x: auto; padding: 12px clamp(18px, 4vw, 56px) max(14px, env(safe-area-inset-bottom)); border-top: 1px solid #ffffff12; background: #171717d9; scrollbar-width: thin; scrollbar-color: #f47a0860 transparent; cursor: grab; touch-action: pan-x; user-select: none; -webkit-user-select: none; }
.gallery-thumbnails.is-dragging { cursor: grabbing; user-select: none; }
.gallery-thumbnail { position: relative; flex: 0 0 auto; width: 96px; height: 58px; overflow: hidden; border: 1px solid #ffffff20; border-radius: 8px; background: #282828; cursor: pointer; opacity: .62; transition: opacity .2s, border-color .2s, transform .2s; }
.gallery-thumbnail:hover { opacity: .9; transform: translateY(-2px); }
.gallery-thumbnail.is-active { border-color: #f47a08; box-shadow: 0 0 0 1px #f47a08; opacity: 1; }
.gallery-thumbnail > img { width: 100%; height: 100%; object-fit: cover; pointer-events: none; user-select: none; -webkit-user-drag: none; }
.gallery-video-thumb { display: grid; width: 100%; height: 100%; place-items: center; color: #f47a08; }
.gallery-thumb-index { position: absolute; bottom: 3px; left: 5px; padding: 1px 4px; border-radius: 3px; background: #000a; color: white; font-size: .65rem; }
.gallery-video-badge { position: absolute; top: 5px; right: 5px; display: grid; width: 20px; height: 20px; place-items: center; border-radius: 50%; background: #000b; color: #fff; }
@media (max-width: 640px) {
  .gallery-toolbar { align-items: flex-start; gap: 9px; padding: 12px 58px 12px 14px; flex-wrap: wrap; }
  .gallery-heading { gap: 9px; width: 100%; }
  .gallery-count { font-size: .92rem; }
  .gallery-project-link { font-size: 1.05rem; }
  .gallery-media-title { max-width: calc(100vw - 110px); font-size: .86rem; }
  .gallery-actions { width: 100%; gap: 6px; flex-wrap: wrap; }
  .gallery-action, .gallery-project-cta, .gallery-external-link { height: 38px; padding: 0 10px; font-size: .76rem; }
  .gallery-close { position: absolute; top: 12px; right: 14px; width: 40px; height: 40px; }
  .gallery-stage { padding: 6px 10px; }
  .gallery-stage :deep(.screen) { max-height: calc(100dvh - 188px); }
  .gallery-media-frame { grid-template-columns: 34px minmax(0, 1fr) 34px; gap: 6px; }
  .gallery-arrow { width: 34px; height: 34px; }
  .gallery-arrow :deep(svg) { width: 20px; height: 20px; }
  .gallery-thumbnails { gap: 8px; padding: 10px 12px max(12px, env(safe-area-inset-bottom)); }
  .gallery-thumbnail { width: 80px; height: 50px; }
}
@media (min-width: 641px) { .gallery-arrow :deep(svg) { width: 32px; height: 32px; } }
@media (prefers-reduced-motion: reduce) { .gallery-action, .gallery-project-cta, .gallery-external-link, .gallery-close, .gallery-arrow, .gallery-thumbnail { transition: none; } .gallery-media-enter-active, .gallery-media-leave-active { transition-duration: .01ms; will-change: auto; } }
</style>
