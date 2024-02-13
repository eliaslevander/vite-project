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
    <NavComponent />
    <RouterView />
  </v-app>
  <FooterComponent />
</template>

<style scoped></style>
