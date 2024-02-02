import { createRouter, createWebHashHistory } from "vue-router";

import AboutView from "./views/AboutView.vue";
import ContactView from "./views/ContactView.vue";
import HomeView from "./views/HomeView.vue";
import CatalogView from "./views/CatalogView.vue";
import SearchView from "./views/SearchView.vue"
import OpenedProduct from "./components/OpenedProduct.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: AboutView,
      path: "/about",
    },
    {
      component: ContactView,
      path: "/contact",
    },
    {
      component: HomeView,
      path: "/",
    },
    {
      component: CatalogView,
      path: "/catalog",
    },
    {
      component: SearchView,
      path: "/search/:string",
      name: "SearchView"
    },
    {
      path: "/product/:id",
      name: "OpenedProduct",
      component: OpenedProduct,
    },
  ],
});
