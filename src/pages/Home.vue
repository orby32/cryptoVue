<template>
  <Fragment>
    <Search :items="currencies" />
    <FeaturedCoins />
    <Articles :articles="newsArticles" v-if="newsArticles" />
  </Fragment>
</template>

<script>
import Search from "../components/Search.vue";
import FeaturedCoins from "../components/FeaturedCoins/FeaturedCoins.vue";
import Articles from "../components/Articles/Articles.vue";

import { Fragment } from "vue-fragment";
export default {
  components: {
    Fragment,
    Search,
    FeaturedCoins,
    Articles,
  },
  data() {
    return {
      value: "",
    };
  },
  mounted() {
    this.$store.dispatch("fetchAllCurrencies", "crypto");
    setInterval(() => {
      this.$store.dispatch("fetchAllCurrencies", "crypto");
    }, 60000);
    this.$store.dispatch("fetchGeneralNews", "news");
  },
  computed: {
    currencies() {
      return this.$store.getters.getCurrencies;
    },

    newsArticles() {
      return this.$store.getters.getNews;
    },
  },
};
</script>
