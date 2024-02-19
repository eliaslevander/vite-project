<template>
  <div id="container">
    <div id="top-container">
      <v-btn id="left" @click="router.go(-1)" flat :ripple="false">
        <v-icon size="40">mdi-chevron-left</v-icon>Back
      </v-btn>

      <h2 id="center">Your Favorites</h2>
      <div></div>
    </div>
    <v-divider></v-divider>
    <ProductComponent product-query="favorites" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import ProductComponent from "../components/ProductComponent.vue";

const router = useRouter();
</script>

<style scoped>
#top-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  margin-bottom: 8px;
}

#left {
  display: flex;
  align-items: center;
}

#center {
  margin: auto;
}
</style>
