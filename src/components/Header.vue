<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/">CryptoVue</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link
          v-for="link in links"
          :key="link.id"
          :to="link.path"
          tag="b-nav-item"
          >{{ link.label }}</router-link
        >
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" right>
        <CurrencySwitcher
          :options="options"
          @updateSelection="updateCurrency"
        />
        <router-link to="/auth" tag="b-nav-item">Login / Sign up</router-link>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import CurrencySwitcher from "./CurrencySwitcher.vue";

export default {
  components: {
    CurrencySwitcher,
  },
  data() {
    return {
      links: [
        { id: 0, label: "Markets", path: "/markets" },
        // { id: 1, label: "News", path: "/news" },
        { id: 2, label: "Watchlist", path: "/watchlist" },
        { id: 3, label: "Portfolio", path: "/portfolio" },
      ],
      options: ["USD", "EUR", "JPY"],
    };
  },
  methods: {
    updateCurrency(cur) {
      this.$store.commit("UPDATE_BASE_CURRENCY", cur);
      this.$store.dispatch("fetchAllCurrencies");
    },
  },
};
</script>

<style scoped>
.navbar-nav {
  align-items: center;
}
.nav-item {
  white-space: nowrap;
}
</style>