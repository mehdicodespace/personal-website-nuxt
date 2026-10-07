<template>
  <div
    class="mt-auto py-8 justify-center text-lg flex items-center gap-3 text-white/40 md:(pb-8) xs:(pb-30)"
  >
    Made with
    <svg class="relative w-6 h-6 love">
      <IconLove />
    </svg>
    By Mehdi
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@media (max-width: 899px) { .mt-auto { padding-bottom: calc(90px + env(safe-area-inset-bottom)); } }
.love {
  animation: pound 0.4s infinite alternate;
  -webkit-animation: pound 0.4s infinite alternate;
}

@-webkit-keyframes pound {
  to {
    transform: scale(1.4);
  }
}

@keyframes pound {
  to {
    transform: scale(1.4);
  }
}
</style>
