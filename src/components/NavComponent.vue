<template>
  <nav>
    <v-toolbar id="v-toolbar" scroll-behavior="hide" flat app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        ><RouterLink id="site-title" to="/"
          >brandz.</RouterLink
        ></v-toolbar-title
      >
      <v-btn icon @click="goToFavorites">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon @click="isSearching = true">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <div id="cart-button-box">
        <v-btn icon @click="goToCart">
          <v-icon>mdi-cart</v-icon>
          <span v-if="cart.countItems" id="items-counter">{{
            cart.countItems
          }}</span>
        </v-btn>
      </div>
    </v-toolbar>

    <div
      id="search-overlay"
      :style="{ display: isSearching ? 'block' : 'none' }"
    >
      <div id="search-box-top">
        <div id="search-box">
          <v-form action="#" @submit.prevent="handleSearch">
            <v-text-field
              v-model="searchField"
              density="compact"
              placeholder="Search"
              flat
              solo
              hide-details
              prepend-inner-icon="mdi-magnify"
              type="search"
              @keydown.enter="handleSearch"
            >
            </v-text-field>
          </v-form>
        </div>
        <v-btn
          @click="
            // Close search menu
            (isSearching = false),
              // Clear search results array
              (searchResults = []),
              // Clear search field
              (searchField = '')
          "
          icon
          elevation="2"
        >
          <v-icon size="x-large">mdi-close</v-icon>
        </v-btn>
      </div>
      <v-divider></v-divider>

      <div
        v-if="searchField"
        id="search-for-text"
        @click="
          search(searchField),
            // Close search menu
            (isSearching = false),
            // Clear search results array
            (searchResults = []),
            // Clear search field
            (searchField = '')
        "
      >
        <v-icon size="x-large">mdi-magnify</v-icon>
        <p>
          Search for <strong>"{{ searchField }}"</strong>
        </p>
        <v-icon size="x-large">mdi-chevron-right</v-icon>
      </div>
      <v-divider></v-divider>

      <!-- Show this if there are no items in the search results array -->
      <!-- Hardcoded at the moment -->

      <div v-if="searchResults.length === 0">
        <p id="popular-searches">Popular searches</p>
        <v-divider></v-divider>
        <ul>
          <li
            class="popular-search"
            @click="
              search('Jeans'),
                // Close search menu
                (isSearching = false),
                // Clear search results array
                (searchResults = []),
                // Clear search field
                (searchField = '')
            "
          >
            <v-icon size="x-large">mdi-magnify</v-icon>
            <p>Jeans</p>
            <v-icon size="x-large">mdi-chevron-right</v-icon>
          </li>
          <v-divider></v-divider>
          <li
            class="popular-search"
            @click="
              search('Clothes'),
                (isSearching = false),
                (searchResults = []),
                (searchField = '')
            "
          >
            <v-icon size="x-large">mdi-magnify</v-icon>
            <p>Clothes</p>
            <v-icon size="x-large">mdi-chevron-right</v-icon>
          </li>
          <v-divider></v-divider>
          <li
            class="popular-search"
            @click="
              search('Baseball cap'),
                (isSearching = false),
                (searchResults = []),
                (searchField = '')
            "
          >
            <v-icon size="x-large">mdi-magnify</v-icon>
            <p>Baseball cap</p>
            <v-icon size="x-large">mdi-chevron-right</v-icon>
          </li>
          <v-divider></v-divider>
          <li
            class="popular-search"
            @click="
              search('Electronics'),
                (isSearching = false),
                (searchResults = []),
                (searchField = '')
            "
          >
            <v-icon size="x-large">mdi-magnify</v-icon>
            <p>Electronics</p>
            <v-icon size="x-large">mdi-chevron-right</v-icon>
          </li>
          <v-divider></v-divider>
          <li
            class="popular-search"
            @click="
              search('Hoodie'),
                (isSearching = false),
                (searchResults = []),
                (searchField = '')
            "
          >
            <v-icon size="x-large">mdi-magnify</v-icon>
            <p>Hoodie</p>
            <v-icon size="x-large">mdi-chevron-right</v-icon>
          </li>
          <v-divider></v-divider>
        </ul>
      </div>

      <v-divider></v-divider>
      <ul id="searched-items-list">
        <li
          class="searched-items-list-item"
          v-for="product in searchResults"
          :key="product.id"
          @click="
            openProduct(product.id),
              (isSearching = false),
              (searchResults = []),
              (searchField = '')
          "
        >
          <v-icon size="x-large">mdi-magnify</v-icon>
          <p>
            <strong>{{ product.title }}</strong>
          </p>
          <v-icon size="x-large">mdi-chevron-right</v-icon>
        </li>
      </ul>
    </div>
    <v-navigation-drawer
      touchless
      v-model="drawer"
      app
      :width="300"
      :border="0"
      temporary
    >
      <div id="menu-top">
        <p id="menu-text">Menu</p>
        <v-btn @click="drawer = !drawer" icon elevation="2">
          <v-icon size="x-large">mdi-close</v-icon>
        </v-btn>
      </div>
      <v-divider></v-divider>
      <nav id="navigation">
        <ul>
          <li class="navigation-link direct" @click="drawer = false">
            <RouterLink class="router-link" to="/"
              ><span>Home</span><v-icon>mdi-chevron-right</v-icon></RouterLink
            >
          </li>
          <v-divider></v-divider>
          <li class="navigation-link direct" @click="drawer = false">
            <RouterLink class="router-link" to="/about"
              ><span>About</span><v-icon>mdi-chevron-right</v-icon></RouterLink
            >
          </li>
          <v-divider></v-divider>
          <li class="navigation-link" @click="categoriesOpen = !categoriesOpen">
            <span>Categories</span>
            <v-icon v-if="!categoriesOpen">mdi-chevron-right</v-icon>
            <v-icon v-else>mdi-chevron-up</v-icon>
          </li>

          <ul id="menu-categories-list" v-if="categoriesOpen">
            <v-divider></v-divider>
            <li
              class="navigation-link"
              @click="search('Clothes'), (drawer = false)"
            >
              <span>Clothes</span><v-icon>mdi-chevron-right</v-icon>
            </li>
            <v-divider></v-divider>
            <li
              class="navigation-link"
              @click="search('Shoes'), (drawer = false)"
            >
              <span>Shoes</span><v-icon>mdi-chevron-right</v-icon>
            </li>
            <v-divider></v-divider>
            <li
              class="navigation-link"
              @click="search('Electronics'), (drawer = false)"
            >
              <span>Electronics</span><v-icon>mdi-chevron-right</v-icon>
            </li>
            <v-divider></v-divider>
            <li
              class="navigation-link"
              @click="search('Miscellaneous'), (drawer = false)"
            >
              <span>Miscellaneous</span><v-icon>mdi-chevron-right</v-icon>
            </li>
          </ul>
          <v-divider></v-divider>
          <li class="navigation-link direct" @click="drawer = false">
            <RouterLink class="router-link" to="/cart"
              ><span>Cart</span><v-icon>mdi-chevron-right</v-icon></RouterLink
            >
          </li>
          <v-divider></v-divider>
          <li class="navigation-link direct" @click="drawer = false">
            <RouterLink class="router-link" to="/favorites"
              ><span>Favorites</span
              ><v-icon>mdi-chevron-right</v-icon></RouterLink
            >
          </li>

          <v-divider></v-divider>
        </ul>
      </nav>
      <FooterComponent id="footer" />
    </v-navigation-drawer>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { productsStore } from "../stores/products";
import { cartStore } from "../stores/cart";
import FooterComponent from "./FooterComponent.vue";
import router from "../router";

const cart = cartStore();
const store = productsStore();

const searchField = ref<string>("");
const searchResults = ref(store.products);
const drawer = ref(false);
const isSearching = ref(false);
const categoriesOpen = ref(false);

watch(drawer, (drawerState) => {
  if (drawerState === true) {
    categoriesOpen.value = false;
  }
});

// watch for changes in the searchfield, update searchResults array upon newString

watch(searchField, (newString) => {
  // Run the logic only if the input isn't an empty string
  if (newString !== "") {
    // use .value to reach the wrapped data from the ref
    searchResults.value = store.products.filter(
      (product) =>
        // Filter either by product name OR by category name, .toLowerCase() allows user to search by lower case. T-shirt !== t-shirt => T-shirt === t-shirt
        product.title.toLowerCase().includes(newString.toLowerCase()) ||
        product.category.name.toLowerCase().includes(newString.toLowerCase())
    );
  } else {
    // If newString doesn't match any of the products/categories then show no items (empty array)
    searchResults.value = [];
  }
});

// Push to a new page with the string of searchfield as a parameter

function search(string: string) {
  router.push({ name: "SearchView", params: { string } });
}

const handleSearch = () => {
  if (searchField.value.trim() !== "") {
    router.push({
      name: "SearchView",
      params: { string: searchField.value.trim() },
    });
    isSearching.value = false;
    searchResults.value = [];
    searchField.value = "";
  }
};

// Push to a new page by pressing one of the listed searrchresults using product.id as a parameter

const openProduct = (id: number) => {
  router.push({ name: "OpenedProduct", params: { id } });
};

const goToFavorites = () => {
  router.push({ path: "/favorites", name: "FavoriteView" });
};

const goToCart = () => {
  router.push({ path: "/cart", name: "CartView" });
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap");

#cart-button-box {
  position: relative;
}

#items-counter {
  position: absolute;
  z-index: 1;
  top: 6px;
  right: 10px;
  font-size: 10px;
  border: none;
  background-color: red;
  color: #fff;
  border-radius: 50%;
  min-width: 16px;
  line-height: 16px;
  font-weight: bolder;
}

#site-title {
  font-family: "Playfair Display", serif;
  text-decoration: none;
  color: #000;
  font-size: 1.25rem;
}

#search-box-top {
  display: flex;
  padding: 8px;
  align-items: center;
}

#search-box {
  flex-grow: 1;
  margin-right: 8px;
}

#popular-searches {
  font-size: 1.5rem;
  padding: 8px;
}

/* Hardcoded as of now */
.popular-search {
  font-size: 1rem;
  padding: 8px;
  display: flex;
  align-items: center;
}

.popular-search p {
  flex-grow: 1;
  margin-left: 8px;
}

/* ------------------- */

#search-for-text {
  font-size: 1rem;
  padding: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

#search-for-text p {
  flex-grow: 1;
  margin-left: 8px;
}

#searched-items-list {
  height: 100vh;
  overflow: auto;
}

.searched-items-list-item {
  font-size: 1rem;
  padding: 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
}

.searched-items-list-item p {
  flex-grow: 1;
  margin-left: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#search-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 2;
}

#v-toolbar {
  background-color: white;
  border-bottom: 1px solid #ccc;
  margin-bottom: 8px;
}

#menu-top {
  display: flex;
  padding: 8px;
}

#menu-text {
  font-size: 1.5rem;
  flex-grow: 1;
  margin: auto 0 auto 8px;
}

/* #menu-categories-list {
  list-style: ;
} */

#menu-categories-list span {
  margin-left: 32px;
}

.navigation-link {
  padding: 8px;
  display: flex;
  cursor: pointer;
}

.navigation-link.direct {
  padding: 0;
}

.router-link {
  width: 100%;
  padding: 8px;
  display: flex;
}

.router-link span {
  flex-grow: 1;
}

.navigation-link span {
  flex-grow: 1;
}

.navigation-link:active {
  background-color: #eee;
}

.navigation-link a {
  color: #000;
  text-decoration: none;
}

#navigation-drawer-container {
  display: flex;
  flex-direction: column;
}

:deep() .v-navigation-drawer__content {
  display: flex;
  flex-direction: column;
}

#navigation {
  flex-grow: 1;
  overflow-y: auto;
}

/* #footer {
} */
</style>
