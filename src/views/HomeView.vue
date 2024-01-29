<template>
  <!-- <BButton @click="increment" variant="success">{{ value }}</BButton>

  <BButton variant="outline-primary">Primary</BButton> -->
  <FetchComponent />
</template>

<script setup lang="ts">
import FetchComponent from "../components/FetchComponent.vue";
import { ref } from "vue";

const value = ref(0);

function increment() {
  value.value++;
}
</script>
