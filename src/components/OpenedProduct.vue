<template>
  <div class="product" v-if="openedProduct">
    <img :src="openedProduct.thumbnail" alt="product image" />
    <h2>Brand: {{ openedProduct.title }}</h2>
    <p>Description: {{ openedProduct.description }}</p>
    <p>Price: {{ openedProduct.price }}</p>
    <p>Category: {{ openedProduct.category }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "OpenedProduct",
});
</script>

<script setup lang="ts">
import { computed, ComputedRef } from "vue";
import { productsStore } from "../stores/products";
import { useRoute } from "vue-router";

const store = productsStore();

const route = useRoute();
console.log(typeof route.params.id);
const openedProduct: ComputedRef = computed(() => {
  return store.products.find((item) => item.id == route.params.id);
});
</script>
