<template>
  <Title>Mehdi Rafiei | Senior Front-End Developer</Title>
  <Meta name="description" content="Mehdi Rafiei is a senior front-end developer with 8+ years building Vue, Nuxt, React and Next.js products, plus hands-on back-end, API and deployment experience." />
  <Meta property="og:title" content="Mehdi Rafiei | Senior Front-End Developer" />
  <Meta property="og:description" content="Explore Mehdi Rafiei's front-end projects, experience and articles on Vue, Nuxt, React, Next.js and modern web development." />

  <main>
    <Home-HelloWorld class="page-content-enter" />
    <Home-FeaturedProjects class="page-content-enter page-content-enter--delayed" :projects="featuredProjects" />

    <section class="overflow-hidden pt-8" aria-labelledby="home-blog-title">
      <div class="flex flex-wrap items-end justify-between gap-4 px-8 sm:px-12 lg:px-12 xl:px-20">
        <div>
          <h2 id="home-blog-title" class="text-3xl font-bold sm:text-4xl">
            Latest <span class="text-main-orange">Articles</span>
          </h2>
          <p class="mt-2 text-white/65">Thoughts on front-end development and the web.</p>
        </div>
        <NuxtLink to="/blog" class="font-semibold text-main-orange transition hover:opacity-80">
          View All Posts →
        </NuxtLink>
      </div>
      <div class="home-carousel mt-4 w-full overflow-hidden px-0 xl:px-20">
        <Slider :items="getPosts(6)" />
      </div>
    </section>

    <Home-ServicesSection />
    <Home-ContactPreview />
  </main>

  <transition name="fadeScale">
    <Shared-Gallery v-if="galleryVisible" :project="getPortfolio(activeProjectID)" />
  </transition>
</template>

<script>
import { mapState } from "pinia";
import useProjectsStore from "@/stores/projects";
import usePostsStore from "@/stores/posts";

export default {
  computed: {
    ...mapState(useProjectsStore, ["getPortfolios", "getPortfolio", "galleryVisible", "activeProjectID"]),
    ...mapState(usePostsStore, ["getPosts"]),
    featuredProjects() {
      const featuredOrder = ["BitBank", "Sarmayex Market", "Sarmayex", "ReplyLane", "Skycast", "Metriland"];
      const projects = this.getPortfolios();
      return featuredOrder
        .map(name => projects.find(project => project.name === name))
        .filter(Boolean);
    },
  },
};
</script>
