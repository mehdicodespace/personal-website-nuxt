<template>
  <section class="featured-section" aria-labelledby="featured-projects-title">
    <div class="featured-heading">
      <div>
        <h2 id="featured-projects-title">Featured <span>Projects</span></h2>
        <p>A selection of products and websites I’ve built.</p>
      </div>
      <NuxtLink to="/portfolios" class="featured-more">View More Projects <span aria-hidden="true">→</span></NuxtLink>
    </div>
    <TransitionGroup name="home-project" tag="div" class="featured-grid">
      <Shared-ProjectCard
        v-for="(project, index) in projects"
        :key="project.id"
        :project="project"
        :show-skeleton="false"
        :style="{ '--project-delay': `${Math.min(index, 5) * 55}ms` }"
      />
    </TransitionGroup>
    <div class="featured-archive">
      <div class="featured-archive-copy">
        <p>More to explore</p>
        <span>Browse the full portfolio, including independent builds and product work.</span>
      </div>
      <NuxtLink to="/portfolios" class="featured-archive-link">Explore all projects <span aria-hidden="true">→</span></NuxtLink>
    </div>
  </section>
</template>
<script setup>
defineProps({ projects: { type: Array, required: true } });
</script>
<style scoped>
.featured-section { padding: 2rem 2rem 3rem; }
.featured-heading { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 16px; margin-bottom: 28px; }
.featured-heading h2 { font-size: 2.25rem; font-weight: 700; }
.featured-heading h2 span { color: #f47a08; }
.featured-heading p { margin-top: 8px; color: #ffffff99; }
.featured-more { color: #f47a08; font-weight: 600; transition: color .2s, transform .2s; }
.featured-more:hover { color: #ffb373; }
.featured-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px; }
.featured-archive { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-top: 28px; padding: 20px 22px; border: 1px solid #ffffff12; border-radius: 12px; background: linear-gradient(105deg, #ffffff06, #f47a0808); }
.featured-archive-copy { display: grid; gap: 4px; }
.featured-archive-copy p { color: #f3f3f3; font-size: 1rem; font-weight: 650; }
.featured-archive-copy span { color: #ffffff99; font-size: .9rem; }
.featured-archive-link { display: inline-flex; flex: 0 0 auto; align-items: center; gap: 9px; min-height: 42px; padding: 0 15px; border: 1px solid #f47a0870; border-radius: 8px; color: #ff9b3d; font-weight: 650; transition: background .2s, border-color .2s, color .2s; }
.featured-archive-link:hover { border-color: #f47a08; background: #f47a0818; color: #ffb16b; }
.featured-archive-link span { font-size: 1.1rem; transition: transform .2s; }
.featured-archive-link:hover span { transform: translateX(3px); }
.featured-grid :deep(.home-project-enter-active) { transition: opacity .62s cubic-bezier(.22,.61,.36,1), transform .62s cubic-bezier(.22,.61,.36,1); transition-delay: var(--project-delay, 0ms); }
.featured-grid :deep(.home-project-enter-from) { opacity: 0; transform: translateY(16px); }
.featured-grid :deep(.home-project-move) { transition: transform .4s cubic-bezier(.22,.61,.36,1); }
@media (min-width: 550px) { .featured-section { padding-inline: 3rem; } .featured-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (min-width: 1280px) { .featured-section { padding-inline: 5rem; } .featured-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
@media (max-width: 549px) { .featured-archive { align-items: stretch; flex-direction: column; gap: 14px; padding: 18px; } .featured-archive-link { justify-content: center; } }
@media (prefers-reduced-motion: reduce) {
  .featured-grid :deep(.home-project-enter-active), .featured-grid :deep(.home-project-move) { transition: none; }
  .featured-grid :deep(.home-project-enter-from) { opacity: 1; transform: none; }
  .featured-archive-link, .featured-archive-link span { transition: none; }
}
</style>
