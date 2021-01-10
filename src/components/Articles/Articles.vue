<template>
  <div class="articles-group">
    <Article
      v-for="(article, index) in articles"
      :key="index"
      :article="article"
    />
    <div v-if="error.visible">{{ error.message }}</div>
  </div>
</template>


<script>
import Article from "./Article.vue";

export default {
  props: {
    articles: {
      type: Array,
      required: true,
    },
  },
  components: {
    Article,
  },
  computed: {
    error() {
      return this.$store.getters.getErrorState;
    },
  },
};
</script>

<style>
.articles-group {
  column-count: 4;
  column-gap: 1.6rem;
  margin: 3rem 0;
}
</style>
