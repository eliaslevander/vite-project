<template>
  <div id="top-container">
    <v-btn id="left" @click="router.go(-1)" flat :ripple="false">
      <v-icon size="40">mdi-chevron-left</v-icon>Back
    </v-btn>
    <div id="center"></div>
    <div></div>
  </div>
  <v-divider></v-divider>
  <div id="card" v-if="openedProduct">
    <Swiper
      :pagination="true"
      :modules="[Pagination]"
      :loop="true"
      :clickable="true"
      id="swiper"
    >
      <v-btn
        @click="favsStore.manageFavorite(openedProduct.id)"
        flat
        icon
        :ripple="false"
        id="fav-button"
        size="large"
      >
        <v-icon
          color="red"
          v-if="
            openedProduct.id && favsStore.favorites.includes(openedProduct.id)
          "
          size="40"
          >mdi-heart</v-icon
        >
        <v-icon v-else size="40">mdi-heart-outline</v-icon>
      </v-btn>
      <SwiperSlide v-for="image in openedProduct.images" :key="image">
        <img :src="image" :alt="openedProduct.title" />
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

      <v-dialog id="v-dialog" transition="dialog-top-transition">
        <template v-slot:activator="{ props }">
          <v-btn
            id="add-button"
            rounded="0"
            flat
            density="default"
            color="black"
            block
            v-bind="props"
            @click="addToCart"
            >Add to cart</v-btn
          >
        </template>
        <template v-slot:default="{ isActive }">
          <div id="added-to-cart-overlay">
            <div id="cart-overlay-product">
              <div id="cart-overlay-image-container">
                <img
                  id="cart-overlay-image-left"
                  :src="openedProduct.images[2]"
                  :alt="openedProduct.title"
                />
                <img
                  id="cart-overlay-image"
                  :src="openedProduct.images[0]"
                  :alt="openedProduct.title"
                />
                <img
                  id="cart-overlay-image-right"
                  :src="openedProduct.images[1]"
                  :alt="openedProduct.title"
                />
              </div>
              <h2>Added to cart <v-icon>mdi-check</v-icon></h2>
              <h3>{{ openedProduct.title }}</h3>
            </div>

            <div id="cart-overlay-button-container">
              <v-btn
                rounded="0"
                flat
                density="default"
                color="black"
                block
                @click="goToCart"
                >Go to cart<v-icon>mdi-cart</v-icon></v-btn
              >
              <v-btn
                rounded="0"
                flat
                density="default"
                block
                id="close-cart-overlay"
                @click="isActive.value = false"
                >Continue shopping</v-btn
              >
            </div>
          </div>
        </template>
      </v-dialog>

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
    </div>
  </div>
</template>

<!-- <script lang="ts">
import { defineComponent } from "vue";
import router from "../router";

export default defineComponent({
  name: "OpenedProduct",
});
</script> -->

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { computed, ref } from "vue";
import { productsStore } from "../stores/products";
import { favoriteStore } from "../stores/favorite";
import { cartStore } from "../stores/cart";
import { useRoute, useRouter } from "vue-router";
import Product from "../types/Product.ts";

const store = productsStore();
const cart = cartStore();
const favsStore = favoriteStore();

const route = useRoute();
const router = useRouter();

const descriptionOpened = ref(false);

const openedProduct = computed<Product>(() => {
  return store.products.find((item) => item.id === Number(route.params.id))!;
});

const addToCart = () => {
  cart.addToCart(openedProduct.value);
};

const goToCart = () => {
  router.push({ path: "/cart", name: "CartView" });
};
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

#fav-button {
  position: absolute;
  z-index: 1;
  top: 50px;
  right: -2px;
  font-size: 16px;
  border: none;
  border-radius: 10px 0 0 10px;
  cursor: pointer;
}

#swiper {
  position: relative;
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

#card {
  margin-top: 8px;
}

@media screen and (min-width: 900px) {
  #card {
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
}

#v-dialog {
  max-width: 400px;
}

#added-to-cart-overlay {
  background-color: #fff;
}

#cart-overlay-button-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
}

#close-cart-overlay {
  margin-top: 8px;
  border: 1px solid #aaa;
}

#cart-overlay-product {
  text-align: center;
}

#cart-overlay-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  position: relative;
  height: 200px;
}

#cart-overlay-image-container img {
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

@keyframes image-center {
  0% {
    width: 60px;
    height: 60px;
  }
  100% {
    width: 175px;
    height: 175px;
  }
}

#cart-overlay-image {
  z-index: 1;
  animation-name: image-center;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

@keyframes image-left {
  0% {
    transform: none;
    left: 120px;
    width: 60px;
    height: 60px;
  }
  100% {
    transform: rotate(-15deg);
    left: 20px;
    width: 120px;
    height: 120px;
  }
}

#cart-overlay-image-left {
  position: absolute;
  z-index: 0;
  width: 0;
  height: 0;
  animation-name: image-left;
  animation-duration: 1s;
  animation-delay: 0.5s;
  animation-fill-mode: forwards;
  transform: rotate(-15deg);
}

@keyframes image-right {
  0% {
    transform: none;
    right: 120px;
    width: 60px;
    height: 60px;
  }
  100% {
    transform: rotate(15deg);
    right: 20px;
    width: 120px;
    height: 120px;
  }
}

#cart-overlay-image-right {
  position: absolute;
  z-index: 0;
  width: 0;
  height: 0;
  animation-name: image-right;
  animation-duration: 1s;
  animation-delay: 0.5s;
  animation-fill-mode: forwards;
  transform: rotate(15deg);
}
</style>
