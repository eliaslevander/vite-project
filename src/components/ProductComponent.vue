<template>
  <div id="product-container">
    <div
      class="product"
      v-for="product in store.products"
      :key="product.id"
      @click="openProduct(product.id)"
    >
      <img :src="product.thumbnail" alt="product image" />
      <h2>Brand: {{ product.title }}</h2>
      <p>Description: {{ product.description }}</p>
      <p>Price: {{ product.price }}</p>
      <p>Category: {{ product.category }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { productsStore } from "../stores/products.ts";
import { useRouter } from "vue-router";

const store = productsStore();
const router = useRouter();

const openProduct = (id: string) => {
  router.push({ name: "OpenedProduct", params: { id } });
};

onMounted(async () => {
  await store.fetchData();
});
</script>

<style scoped>
.product {
}
</style>
