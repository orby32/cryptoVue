<template>
  <div class="autocomplete">
    <b-form-input
      type="search"
      v-model="search"
      @input="onChange"
      placeholder="Search by coin name or symbol"
    ></b-form-input>
    <ul v-show="isOpen" class="autocomplete-results">
      <li v-if="results.length === 0" class="autocomplete-result">
        No results
      </li>

      <router-link
        v-for="(result, i) in results"
        tag="li"
        class="autocomplete-result"
        :key="i"
        :to="{
          name: 'currency',
          params: { id: result.name, currency: result },
        }"
      >
        <img :src="result.image" style="max-width: 20px" />
        {{ result.id }}
        <span style="font-size: 11px">({{ result.symbol }})</span>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      results: [],
      isOpen: false,
      isLoading: false,
    };
  },
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  methods: {
    onChange() {
      this.isLoading = true;
      setTimeout(() => {
        if (this.search.length > 0) {
          this.isOpen = true;
          this.filterResults();
        } else {
          this.isOpen = false;
        }
      }, 1000);
      this.isLoading = false;
    },
    filterResults() {
      this.results = this.items.filter(
        (item) =>
          item.id.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
          item.symbol.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    },
  },
};
</script>

<style>
.autocomplete {
  position: relative;
  width: 100%;
  margin: 3rem auto;
}

.autocomplete-results {
  position: absolute;
  width: 100%;
  background-color: white;
  z-index: 1;
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  min-height: 36px;
  max-height: 200px;
  overflow: auto;
  text-transform: capitalize;
}

.autocomplete-result {
  padding: 0.375rem 0.75rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.autocomplete-result:hover {
  background-color: rgba(23, 162, 184, 0.4);
  font-weight: bold;
  color: white;
}
</style>