<template>
  <h2>News</h2>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("fetchGeneralNews", "news");
  },
};
</script>

<style>
</style>