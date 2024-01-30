<template>
  <v-btn> Add to cart </v-btn>
  <v-icon icon="mdi-home" />
  <v-pagination :length="3"> </v-pagination>
  <div id="product-container">
    <div
      class="product"
      v-for="product in store.products"
      :key="product.id"
      @click="openProduct(product.id)"
    >
      <img class="product-image" :src="product.images[0]" alt="product image" />
      <h2>{{ product.title }}</h2>
      <p>Description: {{ product.description }}</p>
      <p>Price: ${{ product.price }}</p>
      <p>Category: {{ product.category.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
//import productsStore
import { productsStore } from "../stores/products.ts";
import { useRouter } from "vue-router";

// assign productsStore (as a function) to a variable
const store = productsStore();
const router = useRouter();

const openProduct = (id: number) => {
  router.push({ name: "OpenedProduct", params: { id } });
};

onMounted(async () => {
  await store.fetchData();
});
</script>

<style scoped>
.product {
  cursor: pointer;
}
.product-image {
  width: 300px;
}
</style>
