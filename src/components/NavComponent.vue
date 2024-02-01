<template>
  <nav>
    <v-toolbar id="v-toolbar" scroll-behavior="hide" flat app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title> brandz </v-toolbar-title>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon @click="isSearching = true">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-toolbar>

    <div
      id="search-overlay"
      :style="{ display: isSearching ? 'block' : 'none' }"
    >
      <div id="search-box-top">
        <div id="search-box">
          <v-text-field
            v-model="searchField"
            density="compact"
            clearable
            placeholder="Search"
            flat
            solo
            hide-details
            prepend-inner-icon="mdi-magnify"
          >
          </v-text-field>
        </div>
        <v-btn @click="isSearching = false" icon elevation="2">
          <v-icon size="x-large">mdi-close</v-icon>
        </v-btn>
      </div>
      <v-divider></v-divider>
      <p id="popular-searches">Popular searches</p>
      <v-divider></v-divider>
      <ul>
        <li>asdf</li>
        <li>asdf</li>
        <li>asdf</li>

        <li>asdf</li>
      </ul>
    </div>

    <v-navigation-drawer v-model="drawer" app :width="300">
      <div id="menu-top">
        <p id="menu-text">Meny</p>
        <v-btn @click="drawer = !drawer" icon elevation="2">
          <v-icon size="x-large">mdi-close</v-icon>
        </v-btn>
      </div>
      <v-divider></v-divider>
      <nav>
        <ul>
          <li>
            <RouterLink to="/">Hem</RouterLink>
          </li>
          <li>
            <RouterLink to="/about">Om</RouterLink>
          </li>
          <li>
            <RouterLink to="/contact">Kontakt</RouterLink>
          </li>
          <li>
            <RouterLink to="/catalog">Katalog</RouterLink>
          </li>
        </ul>
      </nav>
    </v-navigation-drawer>
  </nav>
</template>

<script lang="ts">
export default {
  data() {
    return {
      drawer: true,
      isSearching: false,
      searchField: null,
    };
  },
};
</script>

<style scoped>
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
  font-size: 1.75rem;
  padding: 8px;
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
</style>
