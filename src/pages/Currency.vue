<template>
  <div class="container-lg mt-4 mb-4" v-if="cur">
    <header class="currency-header">
      <img :src="cur.image" style="max-width: 3rem" />
      <h1>
        {{ cur.name }}
        <span>{{ cur.current_price }} {{ getCurrencyBased }}</span>
      </h1>
    </header>

    <ul class="currency-details-list">
      <li class="currency-details-list-item">
        All times high: {{ cur.ath | formatNumber }} {{ getCurrencyBased }}
        <span style="font-size: 11px">({{ formattedDate }})</span>
      </li>
      <li class="currency-details-list-item">
        Change from ATH:
        {{ cur.ath_change_percentage.toFixed(2) | formatNumber }}%
      </li>
      <li class="currency-details-list-item">
        24h high: {{ cur.high_24h.toFixed(2) | formatNumber }}
        {{ getCurrencyBased }}
      </li>
      <li class="currency-details-list-item">
        24h low: {{ cur.low_24h.toFixed(2) | formatNumber }}
        {{ getCurrencyBased }}
      </li>
      <li class="currency-details-list-item">
        Market cap: {{ cur.market_cap | formatNumber }}
        {{ getCurrencyBased }} (#{{ cur.market_cap_rank }})
      </li>
    </ul>

    <aside class="chart-container" style="max-width: 70%">
      <Chart
        v-if="loaded"
        chartType="line"
        :chartData="chartData"
        :chartOptions="chartOptions"
      />
    </aside>
    <Loader v-if="!loaded" />
    <Articles :articles="getNewsByCoin" />
  </div>
</template>

<script>
import Chart from "../components/Chart.vue";
import Loader from "../components/UI/Loader.vue";
import Articles from "../components/Articles/Articles.vue";
import axios from "axios";

export default {
  name: "Currency",
  components: {
    Chart,
    Articles,
    Loader,
  },
  data() {
    return {
      loaded: false,
      chartData: {
        labels: null,
        datasets: [
          {
            label: "Price",
            data: null,
            backgroundColor: "rgba(241, 225, 197, 0.4)",
            borderColor: "#ffc764",
            lineTension: 0,
            pointBackgroundColor: "#ffc764",
            fill: false,
          },
        ],
      },
      chartOptions: {
        scales: {
          xAxes: [
            {
              stacked: true,
              gridLines: { display: false },
            },
          ],
          yAxes: [
            {
              ticks: {
                callback: (value) => {
                  let symbol = "$";

                  if (this.getCurrencyBased === "EUR") {
                    symbol = "€";
                  }
                  if (this.getCurrencyBased === "JPY") {
                    symbol = "¥";
                  }

                  return value + symbol;
                },
              },
            },
          ],
        },
        maintainAspectRatio: true,
        legend: {
          display: false,
        },

        animation: {
          duration: 2000,
          easing: "easeInOutQuart",
        },
      },
    };
  },

  computed: {
    cur() {
      // get the currency object from the route params
      return this.$route.params.currency;
    },
    getCurrencyBased() {
      return this.$store.getters.getCurrencyBased;
    },
    getNewsByCoin() {
      return this.$store.getters.getNewsByCoin;
    },
    formattedDate() {
      const date = this.cur.ath_date.slice(0, 10);
      const year = date.substring(0, 4);
      const month = date.substring(5, 7);
      const day = date.substring(8, 10);
      return day + "/" + month + "/" + year;
    },
  },
  methods: {
    getCurrencyDetails(currencyBase) {
      this.loaded = false;
      let pricesArray = [];
      let hoursArray = [];

      if (this.cur) {
        axios
          .get(
            `https://api.coingecko.com/api/v3/coins/${this.cur.id}/market_chart?vs_currency=${currencyBase}&interval=hourly&days=2`
          )
          .then((res) => {
            let prices = res.data.prices;

            // prepare the data in 2 seperate arrays
            for (let item of prices) {
              pricesArray.push(item[1].toFixed(4));
              let date = new Date(item[0]);
              let hour = date.getHours() + ":00";
              hoursArray.push(hour);
            }

            // consume the data in chart
            this.chartData.datasets[0].data = pricesArray;
            this.chartData.labels = hoursArray;

            // data loading ended
            this.loaded = true;
          })
          .catch(() => {
            this.loaded = true;
          });
      } else {
        this.$router.replace("/");
      }
    },
  },
  mounted() {
    this.getCurrencyDetails(this.getCurrencyBased);
    this.$store.dispatch("fetchNewsByCoin", this.cur.id);
  },
  watch: {
    // when pick another currency from switcher, call again with new value
    getCurrencyBased: function (newValue) {
      this.getCurrencyDetails(newValue);
    },
  },
};
</script>

<style scoped>
.currency-header {
  display: flex;
  align-items: center;
}
.currency-header img {
  margin-right: 10px;
}
.currency-header span {
  font-size: 18px;
}
.currency-details-list {
  margin: 1rem 0;
}
.currency-details-list-item:not(:last-of-type) {
  margin-bottom: 8px;
}
</style>