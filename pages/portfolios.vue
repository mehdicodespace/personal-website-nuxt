<template>
  <Title>Front-End Projects &amp; Portfolio | Mehdi Rafiei</Title>
  <Meta name="description" content="Explore Mehdi Rafiei's front-end projects across crypto trading, fintech, e-commerce and more, built with Vue, Nuxt, React and modern web tools." />
  <Meta property="og:title" content="Front-End Projects &amp; Portfolio | Mehdi Rafiei" />
  <Meta property="og:description" content="Browse Mehdi Rafiei's front-end projects in crypto trading, fintech, e-commerce and more." />

  <div class="page-content-enter">
    <Shared-Projects
      :projects="paginatedProjects"
      :portfolios-page="true"
      :headline="true"
      :slide-auto-play="homeProjectsSwiper.autoPlay"
      :selected-category="selectedCategory"
      :total-projects-count="allProjects.length"
      @category-selected="onCategorySelected"
    />

    <!-- Pagination -->
    <div class="mt-8 px-8 sm:px-12 xl:px-20">
      <Shared-Pagination
        :current-page="currentPage"
        :total-items="filteredProjects.length"
        :items-per-page="itemsPerPage"
        @page-changed="onPageChanged"
      />
    </div>

  </div>
  <Teleport to="body">
    <transition name="fadeScale">
      <Shared-Gallery
        v-if="galleryVisible"
        :project="getPortfolio(activeProjectID)"
      />
    </transition>
  </Teleport>
</template>

<script>
import { mapState } from "pinia";
import useProjectsStore from "@/stores/projects";
export default {
  data() {
    return {
      selectedCategory: 'all',
      currentPage: 1,
      itemsPerPage: 6,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        770: {
          slidesPerView: 2,
          spaceBetween: 50,
        },

        771: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
      homeProjectsSwiper: {
        slidesPerView: 2,
        autoPlay: {
          delay: 8000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
      },
    };
  },
  computed: {
    ...mapState(useProjectsStore, [
      "getPortfolios",
      "galleryVisible",
      "activeProjectID",
      "getPortfolio",
    ]),
    allProjects() {
      return this.getPortfolios();
    },
    filteredProjects() {
      return this.getPortfolios(null, null, this.selectedCategory);
    },
    paginatedProjects() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProjects.slice(start, end);
    }
  },
  watch: {
    '$route.query': {
      handler(newQuery) {
        this.selectedCategory = newQuery.category || 'all';
        this.currentPage = parseInt(newQuery.page) || 1;
      },
      immediate: true
    }
  },
  methods: {
    onCategorySelected(category) {
      this.selectedCategory = category;
      this.currentPage = 1; // Reset to first page when category changes
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

      this.$router.replace({
        path: this.$route.path,
        query: Object.keys(query).length ? query : {}
      });
    }
  }
};
</script>
