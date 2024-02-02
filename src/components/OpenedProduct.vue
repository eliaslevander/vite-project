<template>
  <div class="card" v-if="openedProduct">
    <img
      class="product-image"
      :src="openedProduct.images[0]"
      alt="product image"
    />
    <h2>{{ openedProduct.title }}</h2>
    <p>Description: {{ openedProduct.description }}</p>
    <p>Price: ${{ openedProduct.price }}</p>
    <p>Category: {{ openedProduct.category.name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "OpenedProduct",
});
</script>

<script setup lang="ts">
import { computed } from "vue";
import { productsStore } from "../stores/products";
import { useRoute } from "vue-router";

const store = productsStore();

const route = useRoute();
const openedProduct = computed(() => {
  return store.products.find((item) => item.id === Number(route.params.id));
});
</script>

<style scoped>
.product-image {
  width: 90%;
}
</style>
