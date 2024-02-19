import { createRouter, createWebHashHistory } from "vue-router";

import AboutView from "./views/AboutView.vue";
import HomeView from "./views/HomeView.vue";
import CartView from "./views/CartView.vue";
import SearchView from "./views/SearchView.vue";
import FavoriteView from "./views/FavoriteView.vue";
import OpenedProduct from "./components/OpenedProduct.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: AboutView,
      path: "/about",
    },
    {
      component: HomeView,
      path: "/",
    },
    {
      component: CartView,
      path: "/cart",
      name: "CartView",
    },
    {
      component: FavoriteView,
      path: "/favorites",
      name: "FavoriteView",
    },
    {
      component: SearchView,
      path: "/search/:string",
      name: "SearchView",
    },
    {
      path: "/product/:id",
      name: "OpenedProduct",
      component: OpenedProduct,
    },
  ],
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});
