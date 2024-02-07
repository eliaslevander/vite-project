<template>
  <div id="in-cart-box">
    <h3>Cart ({{ totalItemsText }})</h3>
  </div>
  <div class="product" v-for="item in cart.items" :key="item.id">
    <div class="left-container">
      <img :src="item.images[0]" alt="product image" />
    </div>
    <div class="center-container">
      <p class="item-title">{{ item.title }}</p>
      <div>
        <span>Quantity: </span>
        <v-btn @click="decreaseItemCount(item.id)" flat icon>
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <span>1</span>
        <v-btn @click="increaseItemCount(item.id)" flat icon>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
      <p class="item-price">${{ item.price }}</p>
    </div>
    <div class="right-container">
      <v-btn flat icon>
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
      <v-btn flat icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </div>
  </div>

  <h1>Total: ${{ totalPrice }}</h1>
</template>

<script setup lang="ts">
import { cartStore } from "../stores/cart";
import { computed } from "vue";
// import { useRouter } from "vue-router";

const cart = cartStore();
// const router = useRouter();

const totalPrice = cart.getCartSum;
const totalItems = cart.countItems;

const totalItemsText = computed(() => {
  return `${totalItems} ${totalItems === 1 ? "item" : "items"}`;
});

// console.log(nonDuplicateCart.value);

const increaseItemCount = (id: number) => {};

// @click="openProduct(item.id)"

// const openProduct = (id: number) => {
//   router.push({ name: "OpenedProduct", params: { id } });
// };
</script>

<style scoped>
.product {
  border-bottom: 1px solid #000;
  display: flex;
  padding: 8px;
}

.left-container {
  height: 120px;
  width: 120px;
  display: flex;
}

.center-container {
  flex-grow: 1;
  padding: 0 8px;
}

.right-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.item-title {
  font-weight: bold;
}

.select {
  width: 100px;
}

.item-price {
}

.v-application__wrap {
  overflow: auto;
}
</style>
