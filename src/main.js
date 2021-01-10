import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { routes } from "./router";
import axios from "axios";
import store from "./store/index";
import "./sass/main.scss";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.config.productionTip = false;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      store.commit("setError", error.response.data);
    }
  }
);

Vue.filter("formatNumber", (value) => {
  return new Intl.NumberFormat().format(value);
});

Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  routes,
});

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
