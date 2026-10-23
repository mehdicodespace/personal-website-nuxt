<template>
  <header class="site-header" :class="{ 'is-scrolled': isScrolled }">
    <div class="header-shell">
      <div class="header-brand"><Header-Logo /></div>
      <Header-Menu />
      <div class="header-resume"><Header-Resume /></div>
    </div>
  </header>
</template>
<script setup>
const isScrolled = ref(false);
const updateScrollState = () => { isScrolled.value = window.scrollY > 32; };

onMounted(() => {
  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });
});

onUnmounted(() => window.removeEventListener('scroll', updateScrollState));
</script>
<style scoped>
.site-header { position: sticky; top: 0; z-index: 60; padding: 1.25rem 1rem .75rem; transition: padding .3s, background .3s, border-color .3s, backdrop-filter .3s; }
.header-shell { display: flex; width: 100%; max-width: 1720px; align-items: center; gap: clamp(1rem, 2.3vw, 2.5rem); margin-inline: auto; transition: max-width .35s, border-radius .35s, background .35s, padding .35s, box-shadow .35s; }
.header-brand { flex: 0 0 auto; }
.header-brand :deep(img) { width: 68px; }
.header-resume { flex: 0 0 auto; margin-left: auto; }
.header-resume :deep(a) { width: 144px; height: 46px; border: 1px solid #ffad5a45; border-radius: 10px; box-shadow: 0 5px 18px #f47a0818; }
@media (min-width: 550px) { .site-header { padding-inline: 3rem; } }
@media (min-width: 1280px) { .site-header { padding-inline: 5rem; } }
@media (min-width: 900px) {
  .header-shell { padding: 7px 10px 7px 14px; border: 1px solid #ffffff10; border-radius: 18px; background: #17171728; box-shadow: 0 12px 34px #00000012, inset 0 1px #ffffff06; backdrop-filter: blur(3px) saturate(120%); -webkit-backdrop-filter: blur(3px) saturate(120%); }
  .site-header.is-scrolled { padding: 0; border-bottom: 1px solid #ffffff12; background: #17171768; box-shadow: 0 8px 24px #00000018; backdrop-filter: none; -webkit-backdrop-filter: none; }
  .site-header.is-scrolled .header-shell { max-width: none; padding: 7px 5rem; border: 0; border-radius: 0; background: transparent; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none; }
}
@media (min-width: 900px) and (max-width: 1100px) { .header-shell { gap: 1.1rem; } .header-brand :deep(img) { width: 58px; } .header-resume :deep(a) { width: 126px; } }
@media (max-width: 899px) {
  .header-shell { gap: 1rem; }
  .header-brand :deep(img) { width: 58px; }
  .header-resume :deep(a) { width: 128px; height: 44px; }
  .site-header.is-scrolled { padding: .25rem 0; border-bottom: 1px solid #ffffff12; background: #17171778; box-shadow: 0 8px 24px #00000018; backdrop-filter: none; -webkit-backdrop-filter: none; }
  .site-header.is-scrolled .header-shell { max-width: none; padding-inline: 1rem; }
}
@media (max-width: 420px) { .site-header { padding: 1rem .8rem .5rem; } .header-brand :deep(img) { width: 52px; } .header-resume :deep(a) { width: 112px; height: 40px; font-size: .9rem; } }
</style>
