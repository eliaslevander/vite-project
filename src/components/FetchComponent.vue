<template>
  <!-- <li v-for="city in cities" :key="city.id">
    {{ city.name }} | {{ city.population }}
  </li> -->
  <div>{{ data }}</div>
  <BButton variant="success" @click="fetch">Get cities</BButton>
</template>

<!-- <script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

interface City {
  id: string;
  name: string;
  population: number;
}

export default defineComponent({
  data() {
    return {
      cities: [] as City[],
    };
  },
  //mounted() {
  //   try {
  //     const response = await axios.get("https://avancera.app/cities");
  //     this.cities = response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // },
  // mounted() {
  //   this.fetchData();
  // },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get("https://avancera.app/cities");
        this.cities = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
</script> -->

<style></style>

<script lang="ts">
import { useFetch } from "../useFetch.ts";
import { ref } from "vue";
export default {
  setup() {
    const url = "https://avancera.app/cities";
    const cities = ref(null);
    const { response, error, data, loading, fetch } = useFetch(url);
    console.log(loading);
    return { response, error, data, loading, cities, fetch };
  },
};
</script>
