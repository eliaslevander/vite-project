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

    <div id="opened-product-container">
      <h2 id="opened-product-title">{{ openedProduct.title }}</h2>
      <p id="opened-product-price">
        ${{ openedProduct.price }}<span id="vat"> Incl. vat</span>
      </p>
      <p id="opened-product-category">
        Category: {{ openedProduct.category.name }}
      </p>
      <FavButton elevation="0" id="fav-button" :itemId="openedProduct.id" />
      <v-btn
        flat
        rounded="0"
        @click="descriptionOpened = !descriptionOpened"
        id="description-dropdown"
      >
        Description
        <v-icon style="" v-if="!descriptionOpened" size="x-large"
          >mdi-chevron-down</v-icon
        >
        <v-icon v-else size="x-large">mdi-chevron-up</v-icon>
      </v-btn>
      <p
        id="opened-product-description"
        :style="descriptionOpened ? 'display: block' : 'display: none'"
      >
        {{ openedProduct.description }}
      </p>
      <v-btn
        id="add-button"
        rounded="0"
        flat
        density="default"
        color="black"
        block
        @click="addToCart"
        >Add to cart</v-btn
      >
    </div>
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
import { computed, ref } from "vue";
import { productsStore } from "../stores/products";
import { cartStore } from "../stores/cart";
import { useRoute } from "vue-router";
import Product from "../types/Product.ts";
import FavButton from "../components/FavButton.vue";

const store = productsStore();
const cart = cartStore();

const route = useRoute();

const openedProduct = computed<Product>(() => {
  return store.products.find((item) => item.id === Number(route.params.id))!;
});

const addToCart = () => {
  cart.addToCart(openedProduct.value);
};

const descriptionOpened = ref(false);
</script>

<style scoped>
#opened-product-container {
  padding: 16px;
}

#opened-product-title {
  font-weight: bold;
}

#opened-product-price {
  font-size: 1.5rem;
}

#vat {
  font-size: 1rem;
  color: #444;
}

#description-dropdown {
  margin-top: 8px;
  height: 36px;
  width: 100%;
  border: 1px solid #aaa;
}

#opened-product-description {
  padding: 8px;
}

#add-button {
  margin-top: 8px;
}

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

.fav-button {
  font-size: 16px;
  border: none;
  cursor: pointer;
}
</style>
