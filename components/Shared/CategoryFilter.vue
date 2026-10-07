<template>
  <div class="portfolio-filter">
    <div class="portfolio-filter-heading">
      <span>Browse by category</span>
      <p aria-live="polite">{{ categoryCounts[selectedCategory] || 0 }} {{ categoryCounts[selectedCategory] === 1 ? 'project' : 'projects' }}</p>
      <button v-if="selectedCategory !== 'all'" type="button" @click="$emit('category-selected', 'all')">Clear filter ×</button>
    </div>
    <Shared-GenericCategoryFilter :categories="store.getCategories" :selected-category="selectedCategory"
      :category-counts="categoryCounts" all-text="All projects" @category-selected="$emit('category-selected', $event)" />
  </div>
</template>
<script setup>
import useProjectsStore from '@/stores/projects';
defineProps({ selectedCategory: { type: String, default: 'all' }, categoryCounts: { type: Object, default: () => ({}) } });
defineEmits(['category-selected']);
const store = useProjectsStore();
</script>
<style scoped>
.portfolio-filter { padding: 18px 0 10px; border-block: 1px solid #ffffff12; }
.portfolio-filter-heading { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 10px; font-size: .85rem; color: #ffffff80; }
.portfolio-filter-heading > span { font-weight: 500; color: #ffffffb3; }
.portfolio-filter-heading p { margin-left: auto; }
.portfolio-filter-heading button { color: #f47a08; }
</style>
