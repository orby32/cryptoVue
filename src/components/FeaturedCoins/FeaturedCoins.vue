<template>
  <div class="featured-container">
    <FeaturedCoin
      v-for="currency in featuredList"
      :key="currency.id"
      :currency="currency"
    />
  </div>
</template>

<script>
import FeaturedCoin from "./FeaturedCoin/FeaturedCoin.vue";
export default {
  components: {
    FeaturedCoin,
  },
  computed: {
    featuredList() {
      return this.$store.getters.getFeaturedList;
    },
  },
};
</script>

<style scoped>
.featured-container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>