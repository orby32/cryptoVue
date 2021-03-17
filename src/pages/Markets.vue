<template>
  <div class="container-lg mt-5">
    <b-form-input
      v-model="term"
      placeholder="Filter by coin name or symbol"
    ></b-form-input>
    <Table
      v-if="items"
      :tableFields="tableFields"
      :items="filteredItems"
      :currencyBased="currencyBased"
    />
    <Loader v-if="!items && showLoader" />
  </div>
</template>

<script>
import Table from "../components/Table.vue";
import Loader from "../components/UI/Loader.vue";
export default {
  name: "Markets",
  components: {
    Table,
    Loader,
  },
  data() {
    return {
      tableFields: [
        "Name",
        "Symbol",
        "Current price",
        "Market cap",
        "Total volume",
        " ", // watchlist column
      ],
      term: "",
    };
  },
  mounted() {
    if (!this.items) {
      this.$store.dispatch("fetchAllCurrencies");
    }
  },
  computed: {
    items() {
      return this.$store.getters.getCurrencies;
    },
    currencyBased() {
      return this.$store.getters.getCurrencyBased;
    },
    showLoader() {
      return !this.items ? true : false;
    },
    filteredItems() {
      return this.items.filter((item) => {
        return (
          item.id.toLowerCase().indexOf(this.term.toLowerCase()) > -1 ||
          item.symbol.toLowerCase().indexOf(this.term.toLowerCase()) > -1
        );
      });
    },
  },
};
</script>

<style>
</style>