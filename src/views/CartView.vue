<template>
  <h1>{{ totalPrice }}</h1>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { cartStore } from "../stores/cart";
const cart = cartStore();

const totalPrice = computed(() => cart.getCartSum);
</script>
