<template>
  <div class="loading textLoading loading-text">
    <slot />
  </div>
</template>

<style scoped>
.loading-text { display: table; max-width: 100%; border-radius: 6px; }
.loading-text + .loading-text { margin-top: .45rem; }
</style>
