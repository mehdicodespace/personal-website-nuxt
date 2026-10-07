<template>
  <div class="blog-filters">
    <div class="blog-filter-heading">
      <div><span class="filter-label">FIND YOUR NEXT READ</span><p>Search an idea or explore a topic.</p></div>
      <div class="blog-search">
        <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-width="1.7" d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
        <input :value="searchQuery" type="search" aria-label="Search articles" placeholder="Search articles…" @input="$emit('search-changed', $event.target.value)" />
        <button v-if="searchQuery" type="button" aria-label="Clear search" @click="$emit('search-changed', '')">×</button>
      </div>
    </div>
    <Shared-GenericCategoryFilter :categories="categories" :selected-category="selectedCategory"
      :category-counts="categoryCounts" all-text="All articles" label="Filter articles by topic" @category-selected="$emit('category-selected', $event)" />
  </div>
</template>
<script setup>
defineProps({
  categories: { type: Array, required: true },
  selectedCategory: { type: String, default: 'all' },
  categoryCounts: { type: Object, default: () => ({}) },
  searchQuery: { type: String, default: '' },
});
defineEmits(['category-selected', 'search-changed']);
</script>
<style scoped>
.blog-filters { padding: 20px; border: 1px solid #ffffff14; border-radius: 14px; background: #232323; }
.blog-filter-heading { display: flex; justify-content: space-between; align-items: center; gap: 20px; margin-bottom: 16px; }
.filter-label { font-size: .75rem; letter-spacing: .12em; color: #f47a08; font-weight: 600; }
.blog-filter-heading p { margin-top: 7px; color: #ffffff80; font-size: .9rem; }
.blog-search { display: flex; align-items: center; gap: 10px; width: min(42%, 400px); padding: 0 12px; border: 1px solid #ffffff25; border-radius: 8px; background: #1c1c1c; }
.blog-search:focus-within { border-color: #f47a08; box-shadow: 0 0 0 2px #f47a081a; }
.blog-search > svg { width: 18px; height: 18px; flex-shrink: 0; color: #ffffff60; }
.blog-search input { min-width: 0; width: 100%; height: 44px; outline: none; color: white; background: transparent; font-size: 14px; }
.blog-search input::-webkit-search-cancel-button { display: none; }
.blog-search button { font-size: 20px; color: #ffffff80; }
@media (max-width: 649px) { .blog-filters { padding: 14px; } .blog-filter-heading { flex-direction: column; align-items: start; gap: 14px; } .blog-search { width: 100%; } }
</style>
