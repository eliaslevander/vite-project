<script setup lang="ts">
import { onMounted } from "vue";
import { productsStore } from "./stores/products";
import NavComponent from "./components/NavComponent.vue";

const productStore = productsStore();

onMounted(() => {
  productStore.fetchData();
});
</script>

<template>
  <v-app>
    <NavComponent />
    <RouterView />
  </v-app>
</template>

<style scoped></style>
