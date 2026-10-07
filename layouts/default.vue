<template>
  <div class="relative isolate flex flex-col min-h-screen bg-main-dark">
    <Layout-ColoredCodes />
    <Layout-Header />
    <slot />
    <Layout-Footer />
    <Shared-ScrollToTop />
  </div>
</template>

<script>
import { mapActions } from "pinia";
import useProjectsStore from "@/stores/projects";

export default {
  name: "default",
  watch: {
    "$route.fullPath"() {
      this.hideGallery();
    },
  },
  methods: {
    ...mapActions(useProjectsStore, ["hideGallery"]),
  },
};
</script>

<style></style>
