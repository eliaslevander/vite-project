<script setup lang="ts">
import { onMounted } from "vue";
import { productsStore } from "./stores/products";
import { currenciesStore } from "./stores/cryptocurrencies";
const productStore = productsStore();
const currencyStore = currenciesStore();

onMounted(() => {
  productStore.fetchData();
  currencyStore.fetchData();
});
</script>

<template>
  <nav>
    <ul>
      <li>
        <RouterLink to="/">Hem</RouterLink>
      </li>
      <li>
        <RouterLink to="/about">Om</RouterLink>
      </li>
      <li>
        <RouterLink to="/contact">Kontakt</RouterLink>
      </li>
      <li>
        <RouterLink to="/catalog">Katalog</RouterLink>
      </li>
    </ul>
  </nav>
  <RouterView />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
