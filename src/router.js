import Home from "./pages/Home.vue";
import Markets from "./pages/Markets.vue";
import News from "./pages/News.vue";
import Portfolio from "./pages/Portfolio.vue";
import Watchlist from "./pages/Watchlist.vue";
import Currency from "./pages/Currency.vue";
import NotFound from "./pages/NotFound.vue";

export const routes = [
  { path: "/", component: Home },
  { path: "/markets", component: Markets },
  { path: "/currency/:id", name: "currency", component: Currency },
  { path: "/news", component: News },
  { path: "/portfolio", component: Portfolio },
  { path: "/watchlist", component: Watchlist },
  { path: "*", component: NotFound },
];
