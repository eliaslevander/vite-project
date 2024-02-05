<script setup lang="ts">
import { onMounted } from "vue";
import { productsStore } from "./stores/products.ts";
import NavComponent from "./components/NavComponent.vue";

const store = productsStore();

console.log(store.loading);

onMounted(async () => {
  await store.fetchData();
});
</script>

<template>
  <v-app>
    <NavComponent />
    <RouterView />
  </v-app>
</template>

<style scoped></style>
