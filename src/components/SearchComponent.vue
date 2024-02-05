<template>
  <h1>Showing results for "{{ route.params.string }}"</h1>
  <ProductComponent :product-query="route.params.string" />
</template>

<script setup lang="ts">
import ProductComponent from "./ProductComponent.vue";

import { useRoute } from "vue-router";
const route = useRoute();
</script>
