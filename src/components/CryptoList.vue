<template>
  <div class="crypto-container">
    <div class="card" v-for="coin in coins.coins" :key="coin.id">
      <h1>{{ coin.name }}</h1>
      <h2>${{ coin.priceUsd }}</h2>
      <h3>Rank: {{ coin.rank }}</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { currenciesStore } from "../stores/cryptocurrencies";

const coins = currenciesStore();

onMounted(async () => {
  await coins.fetchData();
});
</script>

<style scoped>
.card {
  height: 20vh;
  margin: 1em;
}
</style>
