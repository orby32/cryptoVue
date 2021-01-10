import Vue from "vue";
import Vuex from "vuex";
import crypto from "./modules/crypto";
import news from "./modules/news";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    crypto,
    news,
  },
});
