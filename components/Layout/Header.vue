<template>
  <header class="site-header">
    <div class="header-shell">
      <div class="header-brand"><Header-Logo /></div>
      <Header-Menu />
      <div class="header-resume"><Header-Resume /></div>
    </div>
  </header>
</template>
<style scoped>
.site-header { position: relative; z-index: 60; padding: 1.25rem 1rem .75rem; }
.header-shell { display: flex; width: 100%; max-width: 1720px; align-items: center; gap: clamp(1rem, 2.3vw, 2.5rem); margin-inline: auto; }
.header-brand { flex: 0 0 auto; }
.header-brand :deep(img) { width: 68px; }
.header-resume { flex: 0 0 auto; margin-left: auto; }
.header-resume :deep(a) { width: 144px; height: 46px; border: 1px solid #ffad5a45; border-radius: 10px; box-shadow: 0 5px 18px #f47a0818; }
@media (min-width: 550px) { .site-header { padding-inline: 3rem; } }
@media (min-width: 1280px) { .site-header { padding-inline: 5rem; } }
@media (min-width: 900px) {
  .header-shell { padding: 7px 10px 7px 14px; border: 1px solid #ffffff12; border-radius: 18px; background: #15151570; box-shadow: 0 12px 34px #00000018, inset 0 1px #ffffff08; backdrop-filter: blur(12px) saturate(120%); -webkit-backdrop-filter: blur(12px) saturate(120%); }
}
@media (min-width: 900px) and (max-width: 1100px) { .header-shell { gap: 1.1rem; } .header-brand :deep(img) { width: 58px; } .header-resume :deep(a) { width: 126px; } }
@media (max-width: 899px) { .header-shell { gap: 1rem; } .header-brand :deep(img) { width: 58px; } .header-resume :deep(a) { width: 128px; height: 44px; } }
@media (max-width: 420px) { .site-header { padding: 1rem .8rem .5rem; } .header-brand :deep(img) { width: 52px; } .header-resume :deep(a) { width: 112px; height: 40px; font-size: .9rem; } }
</style>
