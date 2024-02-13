<template>
  <!-- <ParallaxComponent /> -->
  <h2>Clothes</h2>
  <ProductComponent class="product-component" product-query="Clothes" />
  <v-divider></v-divider>
  <h2>Shoes</h2>
  <ProductComponent class="product-component" product-query="Shoes" />
  <v-divider></v-divider>
  <h2>Electronics</h2>
  <ProductComponent class="product-component" product-query="Electronics" />
  <h2>Miscellaneous</h2>
  <ProductComponent class="product-component" product-query="Miscellaneous" />
</template>

<script setup lang="ts">
import ProductComponent from "../components/ProductComponent.vue";
// import ParallaxComponent from "../components/ParallaxComponent.vue";
</script>

<style scoped>
h2 {
  margin-top: 24px;
  text-align: center;
  font-size: 2rem;
}
.product-component {
  margin: 24px 0;
}
</style>
