import axios from "axios";

const state = {
  currencies: null,
  featuredList: null,
  currencyBased: "USD",
  error: {
    show: false,
    message: "",
  },
};

const mutations = {
  SET_CURRENCIES(state, list) {
    state.currencies = list;
  },
  SET_FEATURED(state, list) {
    state.featuredList = list;
  },
  UPDATE_BASE_CURRENCY(state, cur) {
    state.currencyBased = cur;
  },
  setError(state, errorMessage) {
    state.error = {
      show: true,
      message: errorMessage,
    };
  },
  dismissError(state) {
    state.error = false;
  },
};

const actions = {
  fetchAllCurrencies({ commit }) {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${state.currencyBased}`
      )
      .then(({ data }) => {
        let currenciesList = [];
        data.map((el) => {
          let item = {
            ...el,
            selected: false,
          };
          currenciesList.push(item);
        });

        // let currenciesList = data;
        commit("SET_CURRENCIES", currenciesList);
        commit("SET_FEATURED", currenciesList.slice(0, 5));
      });
  },
};

const getters = {
  getCurrencies(state) {
    return state.currencies;
  },
  getFeaturedList(state) {
    return state.featuredList;
  },
  getCurrencyBased(state) {
    return state.currencyBased;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
