<script setup lang="ts">
import { onMounted } from "vue";
import { productsStore } from "./stores/products.ts";
import NavComponent from "./components/NavComponent.vue";
import FooterComponent from "./components/FooterComponent.vue";

const store = productsStore();

console.log(store.loading);

onMounted(async () => {
  await store.fetchData();
});
</script>

<template>
  <v-app id="app">
    <NavComponent id="nav" />
    <RouterView id="router-view" />
    <FooterComponent id="footer" />
  </v-app>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

#router-view {
  flex-grow: 1;
}
</style>
