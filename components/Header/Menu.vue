<template>
  <nav class="site-nav" aria-label="Main navigation">
    <ul>
      <li v-for="(menu, index) in menus" :key="menu.path" :style="{ '--menu-delay': `${index * 55}ms` }">
        <NuxtLink :to="menu.path" :class="{ active: isActive(menu) }" :aria-current="isActive(menu) ? 'page' : undefined">
          <span class="site-nav-icon"><svg aria-hidden="true"><component :is="menu.icon" /></svg></span>
          <span>{{ menu.title }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
<script setup>
const route = useRoute();
const menus = [
  { title: 'Home', icon: 'IconHome', path: '/' },
  { title: 'Blog', icon: 'IconBlog', path: '/blog', detail: '/post/' },
  { title: 'Portfolios', icon: 'IconFolder', path: '/portfolios', detail: '/project/' },
  { title: 'About Me', icon: 'IconUser', path: '/about' },
  { title: 'Contact Me', icon: 'IconContact', path: '/contact-me' },
];
const isActive = menu => route.path === menu.path || (menu.detail && route.path.startsWith(menu.detail));
</script>
<style>
.site-nav ul { display: flex; align-items: center; gap: 16px; }
.site-nav li { animation: menu-item-enter .5s cubic-bezier(.22,.61,.36,1) both; animation-delay: var(--menu-delay, 0ms); }
.site-nav a { display: flex; align-items: center; gap: 8px; padding: 12px; border-radius: 8px; color: #ffffffb3; font-size: 1.1rem; font-weight: 500; white-space: nowrap; transition: color .2s, background .2s; }
.site-nav-icon { display: flex; align-items: center; justify-content: center; }
.site-nav svg { width: 20px; height: 20px; flex-shrink: 0; }
.site-nav a:hover, .site-nav a:focus-visible { color: #ffab60; background: #f47a080c; }
.site-nav a.active { color: #f47a08; background: #f47a0812; }
@keyframes menu-item-enter { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@media (min-width: 900px) {
  .site-nav { flex: 0 1 auto; padding: 5px; }
  .site-nav ul { gap: 2px; }
  .site-nav a { position: relative; gap: 8px; padding: 10px 12px; border-radius: 9px; font-size: 1rem; }
  .site-nav a.active { color: #ffab60; background: transparent; box-shadow: none; }
  .site-nav a.active::after { position: absolute; right: 16px; bottom: 4px; left: 16px; height: 2px; border-radius: 2px; background: #f47a08; content: ''; }
  .site-nav a:hover, .site-nav a:focus-visible { background: transparent; }
}
@media (min-width: 900px) and (max-width: 1100px) { .site-nav ul { gap: 8px; } .site-nav a { padding: 10px 8px; } .site-nav svg { display: none; } }
@media (max-width: 899px) {
  .site-nav { position: fixed; z-index: 40; inset: auto 12px calc(10px + env(safe-area-inset-bottom)); padding: 6px; border: 1px solid #ffffff17; border-radius: 18px; background: #202020eF; box-shadow: 0 8px 28px #0008, inset 0 1px #ffffff08; backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); }
  .site-nav ul { width: 100%; gap: 3px; }
  .site-nav li { flex: 1; min-width: 0; }
  .site-nav a { position: relative; width: 100%; flex-direction: column; justify-content: center; gap: 3px; min-height: 58px; padding: 4px 1px; border-radius: 13px; font-size: 11px; }
  .site-nav-icon { width: 34px; height: 30px; border-radius: 10px; transition: color .2s, background .2s, transform .2s; }
  .site-nav a.active { background: transparent; color: #ff9a38; }
  .site-nav a.active .site-nav-icon { background: #f47a081c; color: #ff9a38; transform: translateY(-1px); }
  .site-nav svg { width: 20px; height: 20px; }
  .site-nav a:active { transform: scale(.96); }
}
@media (max-width: 420px) {
  .site-nav { inset-inline: 8px; padding: 5px; }
  .site-nav ul { gap: 1px; }
  .site-nav a { gap: 3px; font-size: 10px; }
  .site-nav-icon { width: 32px; height: 28px; }
  .site-nav svg { width: 18px; height: 18px; }
}
@media (prefers-reduced-motion: reduce) { .site-nav li { animation: none; } }
</style>
