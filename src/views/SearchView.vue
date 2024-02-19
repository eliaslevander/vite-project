<template>
  <div id="container">
    <div id="top-container">
      <div id="left">
        <v-btn @click="router.go(-1)" flat :ripple="false">
          <v-icon size="40">mdi-chevron-left</v-icon>Back
        </v-btn>
      </div>
      <h3 id="results">
        Showing {{ resultsText }} for "{{ route.params.string }}"
      </h3>
      <div></div>
    </div>
    <v-divider></v-divider>
    <h3 id="results"></h3>
    <ProductComponent
      @results-length="valueFromChild"
      :product-query="route.params.string"
    />
  </div>
</template>

<script setup lang="ts">
import ProductComponent from "../components/ProductComponent.vue";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
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
#top-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  margin-bottom: 8px;
}

#left {
  display: flex;
  align-items: center;
}

#results {
  text-align: center;
}

ul {
  overflow: auto;
}

.v-application__wrap {
  overflow: auto;
}
</style>
