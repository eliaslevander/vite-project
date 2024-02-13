<template>
  <ProductComponent product-query />
  <!-- <CryptoList /> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CatalogView",
});
</script>

<script setup lang="ts">
import ProductComponent from "../components/ProductComponent.vue";
// import CryptoList from "../components/CryptoList.vue";
import { onMounted } from "vue";
import { productsStore } from "../stores/products";

const productStore = productsStore();

onMounted(() => {
  productStore.fetchData();
});
</script>
