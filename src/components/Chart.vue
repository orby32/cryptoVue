<template>
  <canvas id="price-chart"></canvas>
</template>

<script>
import Chart from "chart.js";
export default {
  props: {
    chartType: String,
    chartData: Object,
    chartOptions: Object,
  },

  methods: {
    chartConstructor(chartType, chartData, chartOptions) {
      const chartElement = document.querySelector("canvas");
      (Chart.defaults.global.defaultFontFamily = "Recursive"), "sans-serif";
      // eslint-disable-next-line no-unused-vars
      const chart = new Chart(chartElement, {
        type: chartType,
        data: chartData,
        options: chartOptions,
      });
    },
  },
  mounted() {
    let { chartType, chartData, chartOptions } = this;
    this.chartConstructor(chartType, chartData, chartOptions);
  },
};
</script>