import axios from "axios";
const state = {
  generalNews: [],
  coinNews: [],
  error: {
    show: false,
    message: "",
  },
};

const mutations = {
  setArticles(state, news) {
    state.generalNews = news;
  },
  setArticlesByCoin(state, newsByCoin) {
    state.coinNews = newsByCoin;
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
  fetchGeneralNews({ commit }) {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=crypto&apiKey=be26f4682fa14d968026cde2d5637193"
      )
      .then(({ data }) => {
        let { articles } = data;
        // filter articles with image and author
        let filteredArticles = articles.filter(
          (a) => a.urlToImage !== null && a.author !== null
        );

        commit("setArticles", filteredArticles);
      });
  },
  fetchNewsByCoin({ commit }, coinId) {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${coinId}&apiKey=be26f4682fa14d968026cde2d5637193`
      )
      .then(({ data }) => {
        let { articles } = data;
        commit("setArticlesByCoin", articles);
      });
  },
};

const getters = {
  getNews(state) {
    return state.generalNews;
  },
  getNewsByCoin(state) {
    return state.coinNews;
  },
  getErrorState(state) {
    return state.error;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
