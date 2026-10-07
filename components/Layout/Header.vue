<template>
  <header class="site-header">
    <Header-Logo />
    <Header-Menu />
    <div class="header-resume"><Header-Resume /></div>
  </header>
</template>
<style scoped>
.site-header { position: relative; z-index: 60; display: flex; align-items: center; gap: 3rem; padding: 2rem 2rem 1rem; }
.header-resume { margin-left: auto; flex-shrink: 0; }
@media (min-width: 550px) { .site-header { padding-inline: 3rem; } }
@media (min-width: 1280px) { .site-header { padding-inline: 5rem; } }
@media (min-width: 901px) and (max-width: 1100px) { .site-header { gap: 2rem; } }
@media (max-width: 900px) { .site-header { gap: 1.25rem; } }
</style>
