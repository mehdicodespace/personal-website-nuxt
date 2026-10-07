<template>
  <div class="category-filter" role="group" :aria-label="label">
    <button v-if="overflowing" type="button" class="category-arrow" aria-label="Scroll categories left" :disabled="atStart" @click="scroll(-1)">‹</button>
    <div ref="track" class="category-track" :class="{ 'is-dragging': dragging }"
      @scroll.passive="measure" @pointerdown="startDrag" @pointermove="moveDrag"
      @pointerup="endDrag" @pointercancel="endDrag" @click.capture="suppressDraggedClick">
      <button v-for="category in categories" :key="category" type="button"
        class="category-chip" :class="{ selected: selectedCategory === category }"
        :aria-pressed="selectedCategory === category" @click="$emit('category-selected', category)">
        {{ category === 'all' ? allText : category }}
        <span>{{ categoryCounts[category] || 0 }}</span>
      </button>
    </div>
    <button v-if="overflowing" type="button" class="category-arrow" aria-label="Scroll categories right" :disabled="atEnd" @click="scroll(1)">›</button>
  </div>
</template>
<script setup>
const props = defineProps({
  categories: { type: Array, required: true },
  selectedCategory: { type: String, default: 'all' },
  categoryCounts: { type: Object, default: () => ({}) },
  allText: { type: String, default: 'All' },
  label: { type: String, default: 'Filter by category' },
  showIcons: Boolean,
});
defineEmits(['category-selected']);
const track = ref(null);
const overflowing = ref(false);
const atStart = ref(true);
const atEnd = ref(false);
const dragging = ref(false);
let observer;
let dragStartX = 0;
let dragStartScroll = 0;
let dragPointerId = null;
let dragged = false;
let suppressClick = false;
function measure() {
  const el = track.value;
  if (!el) return;
  overflowing.value = el.scrollWidth > el.parentElement.clientWidth + 1;
  atStart.value = el.scrollLeft < 2;
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
}
function scroll(direction) {
  track.value?.scrollBy({ left: direction * track.value.clientWidth * .7, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}
function startDrag(event) {
  if (!overflowing.value || event.pointerType !== 'mouse' || event.button !== 0) return;
  dragStartX = event.clientX;
  dragStartScroll = track.value.scrollLeft;
  dragPointerId = event.pointerId;
  dragged = false;
  dragging.value = false;
}
function moveDrag(event) {
  if (dragPointerId === null) return;
  const distance = event.clientX - dragStartX;
  if (!dragged && Math.abs(distance) > 4) {
    dragged = true;
    dragging.value = true;
    track.value.setPointerCapture(event.pointerId);
  }
  if (dragged) {
    event.preventDefault();
    track.value.scrollLeft = dragStartScroll - distance;
  }
}
function endDrag(event) {
  if (dragPointerId === null) return;
  if (track.value?.hasPointerCapture(event.pointerId)) track.value.releasePointerCapture(event.pointerId);
  dragPointerId = null;
  dragging.value = false;
  if (dragged) {
    suppressClick = true;
    window.setTimeout(() => { suppressClick = false; }, 0);
  }
}
function suppressDraggedClick(event) {
  if (!suppressClick) return;
  event.preventDefault();
  event.stopPropagation();
}
async function revealSelected() {
  await nextTick();
  const el = track.value;
  const selected = el?.querySelector('[aria-pressed="true"]');
  if (!selected) return;
  const left = selected.offsetLeft;
  if (left < el.scrollLeft) el.scrollLeft = left;
  else if (left + selected.offsetWidth > el.scrollLeft + el.clientWidth) el.scrollLeft = left + selected.offsetWidth - el.clientWidth;
  measure();
}
watch(() => props.selectedCategory, revealSelected);
watch(() => props.categories, async () => { await nextTick(); measure(); });
onMounted(() => {
  observer = new ResizeObserver(measure);
  observer.observe(track.value);
  revealSelected();
});
onBeforeUnmount(() => observer?.disconnect());
</script>
<style scoped>
.category-filter { display: flex; align-items: center; gap: 8px; min-width: 0; width: 100%; }
.category-track { position: relative; display: flex; align-items: center; flex: 1; gap: 8px; min-width: 0; overflow-x: auto; overflow-y: hidden; padding: 0 2px; touch-action: pan-x; overscroll-behavior-inline: contain; scrollbar-width: none; cursor: grab; }
.category-track::-webkit-scrollbar { display: none; }
.category-track.is-dragging { cursor: grabbing; user-select: none; }
.category-chip { display: inline-flex; align-items: center; gap: 9px; flex-shrink: 0; min-height: 40px; padding: 9px 13px; border: 1px solid #ffffff16; border-radius: 8px; background: #272727; color: #ffffffa8; font-size: .9rem; white-space: nowrap; transition: background .2s, color .2s, border-color .2s; }
.category-chip:hover { color: white; border-color: #ffffff45; background: #323232; }
.category-chip.selected { color: #ffb16b; border-color: #f47a0880; background: #f47a0814; }
.category-chip span { color: #ffffff65; font-size: .8rem; }
.category-chip.selected span { color: #ffb16bb3; }
.category-arrow { flex: 0 0 32px; height: 40px; border-radius: 7px; border: 1px solid #ffffff20; color: #f47a08; font-size: 1.7rem; background: #242424; }
.category-arrow:hover:not(:disabled) { background: #f47a081a; border-color: #f47a0880; }
.category-arrow:disabled { opacity: .25; cursor: default; }
</style>
