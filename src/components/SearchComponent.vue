<template>
  <h1>Showing results for "{{ route.params.string }}"</h1>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { productsStore } from "../stores/products";

import { useRoute } from "vue-router";
const route = useRoute();

const store = productsStore();
const searchResults = ref(store.products);
</script>
