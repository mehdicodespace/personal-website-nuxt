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
const updateScrollState = () => {
  if (window.innerWidth < 900) {
    isScrolled.value = false;
    return;
  }

  isScrolled.value = isScrolled.value
    ? window.scrollY > 16
    : window.scrollY > 56;
};

onMounted(() => {
  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });
  window.addEventListener('resize', updateScrollState, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScrollState);
  window.removeEventListener('resize', updateScrollState);
});
</script>
<style scoped>
.site-header { position: relative; z-index: 60; padding: 1.25rem 1rem .75rem; }
.header-shell { box-sizing: border-box; display: flex; width: 100%; max-width: 1720px; align-items: center; gap: clamp(1rem, 2.3vw, 2.5rem); margin-inline: auto; }
.header-brand { flex: 0 0 auto; }
.header-brand :deep(img) { width: 68px; }
.header-resume { flex: 0 0 auto; margin-left: auto; }
.header-resume :deep(a) { width: 144px; height: 46px; border: 1px solid #ffad5a45; border-radius: 10px; box-shadow: 0 5px 18px #f47a0818; }
@media (min-width: 550px) { .site-header { padding-inline: 3rem; } }
@media (min-width: 1280px) { .site-header { padding-inline: 5rem; } }
@media (min-width: 900px) {
  .site-header { position: sticky; top: 0; }
  .site-header { transition: padding 280ms cubic-bezier(.22,.61,.36,1), background-color 180ms ease-out, box-shadow 180ms ease-out; }
  .header-shell { border: 1px solid #ffffff10; padding: 7px 10px 7px 14px; border-radius: 18px; background: #17171728; box-shadow: 0 12px 34px #00000012, inset 0 1px #ffffff06; backdrop-filter: blur(3px) saturate(120%); -webkit-backdrop-filter: blur(3px) saturate(120%); transition: max-width 280ms cubic-bezier(.22,.61,.36,1), padding 280ms cubic-bezier(.22,.61,.36,1), border-radius 280ms cubic-bezier(.22,.61,.36,1), border-color 180ms ease-out, background-color 180ms ease-out, box-shadow 180ms ease-out; }
  .header-brand :deep(img) { transition: width 280ms cubic-bezier(.22,.61,.36,1); }
  .header-resume :deep(a) { transition: height 280ms cubic-bezier(.22,.61,.36,1), width 280ms cubic-bezier(.22,.61,.36,1), background-color 200ms ease; }
  .site-header.is-scrolled { padding-block: .45rem .3rem; padding-inline: 0; background: #171717; box-shadow: none; }
  .site-header.is-scrolled .header-shell { max-width: 100%; padding: 3px 3rem; border-color: transparent; border-radius: 0; background: transparent; box-shadow: none; backdrop-filter: none; -webkit-backdrop-filter: none; }
  .site-header.is-scrolled .header-brand :deep(img) { width: 52px; }
  .site-header.is-scrolled .header-resume :deep(a) { height: 40px; }
}
@media (min-width: 1280px) { .site-header.is-scrolled .header-shell { padding-inline: 5rem; } }
@media (min-width: 900px) and (max-width: 1100px) { .header-shell { gap: 1.1rem; } .header-brand :deep(img) { width: 58px; } .header-resume :deep(a) { width: 126px; } }
@media (max-width: 899px) {
  .header-shell { gap: 1rem; }
  .header-brand :deep(img) { width: 58px; }
  .header-resume :deep(a) { width: 128px; height: 44px; }
}
@media (max-width: 420px) { .site-header { padding: 1rem .8rem .5rem; } .header-brand :deep(img) { width: 52px; } .header-resume :deep(a) { width: 112px; height: 40px; font-size: .9rem; } }
</style>
