<template>
  <div id="top-container">
    <v-btn id="left" @click="router.go(-1)" flat :ripple="false">
      <v-icon size="40">mdi-chevron-left</v-icon>Back
    </v-btn>

    <h2 id="center">Your Favorites</h2>
    <div></div>
  </div>
  <v-divider></v-divider>
  <ProductComponent product-query="favorites" />
</template>

<script setup lang="ts">
import { favoriteStore } from "../stores/favorite";
import { productsStore } from "../stores/products";
import { useRouter } from "vue-router";
import ProductComponent from "../components/ProductComponent.vue";

const router = useRouter();
const favsStore = favoriteStore();
const store = productsStore();
</script>

<style scoped>
#top-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  margin-bottom: 8px;
}

#left {
  display: flex;
  align-items: center;
}

#center {
  margin: auto;
}
</style>
