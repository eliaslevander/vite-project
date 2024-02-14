<template>
  <v-btn
    @click="favsStore.manageFavorite(props.itemId!)"
    flat
    icon
    :ripple="false"
    class="fav-button"
    size="small"
  >
    <v-icon
      color="red"
      v-if="props.itemId && favsStore.favorites.includes(props.itemId)"
      size="25"
      >mdi-heart</v-icon
    >
    <v-icon v-else size="25">mdi-heart-outline</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { favoriteStore } from "../stores/favorite.ts";

const favsStore = favoriteStore();

const props = defineProps({
  itemId: Number,
});
</script>

<style scoped>
.fav-button {
  -webkit-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.75);
}
</style>
