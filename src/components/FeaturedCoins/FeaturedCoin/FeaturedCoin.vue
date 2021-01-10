<template>
  <b-card :title="currency.name" class="mb-2">
    <img
      :src="currency.image"
      alt=""
      style="max-width: 20px; margin-left: 5px"
    />
    <b-card-text>
      {{ currency.current_price }}
      <p class="currency-based">{{ currencyBased }}</p>
      <div class="change" :class="{ green: isUpTrend, red: !isUpTrend }">
        <span class="percentage-change"
          >{{ currency.price_change_percentage_24h.toFixed(2) }}%</span
        >
        <span class="absolute-change">
          {{ currency.price_change_24h.toFixed(2) }}
          <span class="currency-based">{{ currencyBased }}</span>
        </span>
      </div>
    </b-card-text>
    <router-link
      tag="b-button"
      class="btn-sm"
      :to="{
        name: 'currency',
        params: { id: currency.name, currency },
      }"
      >View details</router-link
    >
  </b-card>
</template>

<script>
export default {
  props: {
    currency: {
      type: Object,
      required: true,
    },
  },
  computed: {
    currencyBased() {
      return this.$store.getters.getCurrencyBased;
    },
    isUpTrend() {
      return this.currency.price_change_percentage_24h > 0;
    },
  },
  methods: {
    onSelectCurrency(cur) {
      this.$store.commit("SET_SELECTED_CURRENCY", cur);
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 20rem;
  min-width: 170px;
}
.card-title {
  display: inline-block;
}
.card-body {
  text-align: center;
}
.currency-based {
  display: inline-block;
  text-transform: uppercase;
  margin: 0;
}
.change {
  display: flex;
  flex-flow: column;
  margin-top: 4px;
}
.percentage-change,
.absolute-change {
  display: block;
  font-weight: 500;
  font-size: 11px;
  color: inherit;
}

.change.red {
  color: #e10c32;
}
.change.green {
  color: #00a551;
}
</style>

