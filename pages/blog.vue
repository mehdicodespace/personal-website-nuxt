<template>
  <Title>Front-End Development Blog | Mehdi Rafiei</Title>
  <Meta name="description" content="Read Mehdi Rafiei's articles on front-end development, JavaScript, Vue, React, AI and practical web development techniques." />
  <Meta property="og:title" content="Front-End Development Blog | Mehdi Rafiei" />
  <Meta property="og:description" content="Articles by Mehdi Rafiei on front-end development, JavaScript, Vue, React and AI." />

  <main class="blog-page page-content-enter relative mx-auto mt-12 w-full px-8 sm:px-12 xl:px-20">
    <!-- Header -->
    <header class="blog-heading">
      <h1><span class="blog-heading-primary">Articles &amp;</span> <span class="blog-heading-accent">ideas.</span></h1>
      <div>Practical thoughts on front-end development, tools, and the web.</div>
    </header>

    <!-- Compact Filters -->
    <div class="mb-8">
      <Shared-CompactBlogFilters
        :categories="categories"
        :selected-category="selectedCategory"
        :category-counts="categoryCounts"
        :search-query="searchQuery"
        @category-selected="onCategorySelected"
        @search-changed="onSearchChanged"
      />
    </div>

    <!-- Blog Posts Grid -->
    <p class="blog-results" aria-live="polite">{{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'article' : 'articles' }}<span v-if="selectedCategory !== 'all'"> in {{ selectedCategory }}</span><span v-if="searchQuery"> matching “{{ searchQuery }}”</span></p>
    <div v-if="!filteredPosts.length" class="blog-empty"><h2>No articles found</h2><p>Try a different phrase or explore another topic.</p><button type="button" @click="resetFilters">Reset filters</button></div>
    <TransitionGroup :key="resultsTransitionKey" name="blog-card" tag="section" class="grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-8 mb-12" aria-label="Articles">
      <Shared-BlogCard
        v-for="(post, index) in paginatedPosts"
        :key="post.id"
        :post="post"
        :style="{ '--blog-card-delay': `${Math.min(index, 5) * 55}ms` }"
      />
    </TransitionGroup>

    <!-- Pagination -->
    <div class="flex justify-center">
      <Shared-Pagination
        :current-page="currentPage"
        :total-items="filteredPosts.length"
        :items-per-page="itemsPerPage"
        @page-changed="onPageChanged"
      />
    </div>
  </main>
</template>

<script>
import {mapState} from "pinia";
import usePostsStore from "@/stores/posts";

export default {
  data() {
    return {
      searchQuery: '',
      selectedCategory: 'all',
      currentPage: 1,
      itemsPerPage: 6,
    };
  },
  computed: {
    ...mapState(usePostsStore, ["getPosts", "getCategories", "getCategoryCounts"]),
    categories() {
      return this.getCategories;
    },
    categoryCounts() {
      return this.getCategoryCounts;
    },
    filteredPosts() {
      return this.getPosts(null, this.searchQuery, this.selectedCategory);
    },
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPosts.slice(start, end);
    },
    resultsTransitionKey() {
      return `${this.selectedCategory}|${this.searchQuery}|${this.currentPage}`;
    }
  },
  watch: {
    '$route.query': {
      handler(newQuery) {
        this.selectedCategory = newQuery.category || 'all';
        this.currentPage = parseInt(newQuery.page) || 1;
        this.searchQuery = newQuery.search || '';
      },
      immediate: true
    }
  },
  methods: {
    resetFilters() {
      this.selectedCategory = 'all';
      this.searchQuery = '';
      this.currentPage = 1;
      this.updateQuery();
    },
    onCategorySelected(category) {
      this.selectedCategory = category;
      this.currentPage = 1; // Reset to first page when category changes
      this.updateQuery();
    },
    onSearchChanged(query) {
      this.searchQuery = query;
      this.currentPage = 1; // Reset to first page when search changes
      this.updateQuery();
    },
    onPageChanged(page) {
      this.currentPage = page;
      this.updateQuery();
      this.scrollToTop();
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    updateQuery() {
      const query = {};
      if (this.selectedCategory !== 'all') {
        query.category = this.selectedCategory;
      }
      if (this.currentPage > 1) {
        query.page = this.currentPage.toString();
      }
      if (this.searchQuery) {
        query.search = this.searchQuery;
      }

      this.$router.replace({
        path: this.$route.path,
        query: Object.keys(query).length ? query : {}
      });
    }
  }
};
</script>
<style scoped>
.blog-heading { margin-bottom: 30px; }
.blog-heading h1 { font-size: clamp(2.5rem, 4vw, 3.5rem); font-weight: 700; letter-spacing: -.025em; }
.blog-heading .blog-heading-primary { color: #fff; }
.blog-heading .blog-heading-accent { color: #f47a08; }
.blog-heading > div { margin-top: 12px; color: #ffffff90; font-size: 1.1rem; line-height: 1.6; }
.blog-results { color: #ffffff80; font-size: .9rem; margin-bottom: 20px; }
.blog-empty { border: 1px dashed #ffffff25; text-align: center; padding: 48px 24px; border-radius: 14px; }
.blog-empty h2 { font-size: 1.5rem; font-weight: 600; }
.blog-empty p { color: #ffffff80; margin: 12px 0 20px; }
.blog-empty button { color: #f47a08; }
:deep(.blog-card-enter-active) { transition: opacity .46s cubic-bezier(.22, .61, .36, 1), transform .46s cubic-bezier(.22, .61, .36, 1); transition-delay: var(--blog-card-delay, 0ms); }
:deep(.blog-card-enter-from) { opacity: 0; transform: translateY(14px); }
:deep(.blog-card-move) { transition: transform .4s cubic-bezier(.22, .61, .36, 1); }
@media (prefers-reduced-motion: reduce) { :deep(.blog-card-enter-active), :deep(.blog-card-move) { transition-duration: .01ms; transition-delay: 0ms; } }
</style>
