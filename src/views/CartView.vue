<template>
  <div class="product" v-for="item in cart.items">
    <img :src="item.images[0]" alt="product image" />
    <h3>{{ item.title }}</h3>
    <h4>{{ item.price }}</h4>
  </div>

  <h1>Total: ${{ totalPrice }}</h1>
</template>

<script setup lang="ts">
import { cartStore } from "../stores/cart";

const cart = cartStore();

const totalPrice = cart.getCartSum;
</script>

<style scoped>
.product img {
  width: 100px;
}

.v-application__wrap {
  overflow: auto;
}
</style>
