<template>
  <h3 id="results">
    Showing {{ resultsText }} for "{{ route.params.string }}"
  </h3>
  <ProductComponent
    @results-length="valueFromChild"
    :product-query="route.params.string"
  />
</template>

<script setup lang="ts">
import ProductComponent from "../components/ProductComponent.vue";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const receivedValue = ref(0);

const valueFromChild = (value: number) => {
  receivedValue.value = value;
};

const resultsText = computed(() => {
  return `${receivedValue.value} ${
    receivedValue.value === 1 ? "result" : "results"
  }`;
});
</script>

<style scoped>
#results {
  margin-left: 8px;
}

ul {
  overflow: auto;
}

.v-application__wrap {
  overflow: auto;
}
</style>
