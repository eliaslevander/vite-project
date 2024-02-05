<template>
  <div class="card" v-if="openedProduct">
    <Swiper
      :pagination="true"
      :modules="[Pagination]"
      :loop="true"
      :clickable="true"
    >
      <SwiperSlide v-for="image in openedProduct.images" :key="image">
        <img :src="image" alt="product image" />
      </SwiperSlide>
    </Swiper>
    <h2>{{ openedProduct.title }}</h2>
    <p>Description: {{ openedProduct.description }}</p>
    <p>Price: ${{ openedProduct.price }}</p>
    <p>Category: {{ openedProduct.category.name }}</p>
    <v-btn>Add to cart</v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "OpenedProduct",
});
</script>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { computed } from "vue";
import { productsStore } from "../stores/products";
import { useRoute } from "vue-router";

const store = productsStore();

const route = useRoute();
const openedProduct = computed(() => {
  return store.products.find((item) => item.id === Number(route.params.id));
});
</script>

<style scoped>
.swiper {
  width: 100%;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
}

.swiper-pagination-bullet {
  width: 20px;
  height: 20px;
  background-color: #fff;
  opacity: 1;
}

.swiper-pagination-bullet-active {
  background-color: magenta;
}
.product-image {
  width: 90%;
}
</style>
