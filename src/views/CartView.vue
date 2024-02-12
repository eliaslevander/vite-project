<template>
  <div id="in-cart-box">
    <v-btn id="in-cart-left" @click="router.go(-1)" flat :ripple="false">
      <v-icon size="40">mdi-chevron-left</v-icon>Back
    </v-btn>

    <h2 id="in-cart-center">Cart ({{ totalItems }})</h2>
    <div></div>
  </div>
  <v-divider></v-divider>

  <div class="product" v-for="item in cart.items" :key="item.id">
    <div class="left-container">
      <img
        @click="openProduct(item.id)"
        :src="item.images[0]"
        alt="product image"
      />
    </div>
    <div class="center-container">
      <div class="title-container">
        <p @click="openProduct(item.id)" class="item-title">{{ item.title }}</p>
      </div>
      <div class="quantity-container">
        <p>Quantity:</p>
        <div class="quantity-controls">
          <v-btn
            :disabled="item.quantity === 1"
            @click="cart.removeFromCart(item, 'decrease')"
            flat
            icon
            size="x-small"
          >
            <v-icon size="25">mdi-minus</v-icon>
          </v-btn>
          <span>{{ item.quantity }}</span>
          <v-btn @click="cart.addToCart(item)" flat icon size="x-small">
            <v-icon size="25">mdi-plus</v-icon>
          </v-btn>
        </div>
      </div>
      <p class="item-price">${{ item.price }}</p>
      <p class="item-price-total">${{ item.price * item.quantity }}</p>
    </div>
    <div class="right-container">
      <v-btn
        @click="cart.removeFromCart(item, 'remove'), (dialog = true)"
        flat
        icon
      >
        <v-icon>mdi-trash-can</v-icon>
      </v-btn>
      <!-- <v-btn flat icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn> -->
      <FavButton elevation="0" :itemId="item.id" />
    </div>
  </div>

  <div id="total-price-container">
    <h1>Total: ${{ totalPrice }}</h1>
  </div>

  <!-- <template>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent width="auto">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5">
            Use Google's location service?
          </v-card-title>
          <v-card-text
            >Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are
            running.</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="dialog = false"
            >
              Disagree
            </v-btn>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="dialog = false, cart.removeFromCart(item, 'remove')"
            >
              Agree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template> -->
</template>

<script setup lang="ts">
import { cartStore } from "../stores/cart";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import FavButton from "../components/FavButton.vue";

const cart = cartStore();
const router = useRouter();

const dialog = ref(false);

const totalItems = computed(() => {
  return `${cart.countItems} ${cart.countItems === 1 ? "item" : "items"}`;
});

const totalPrice = computed(() => {
  return cart.getCartSum;
});

const openProduct = (id: number) => {
  router.push({ name: "OpenedProduct", params: { id } });
};
</script>

<style scoped>
#in-cart-box {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  margin-bottom: 8px;
}

#in-cart-left {
  display: flex;
  align-items: center;
  /* margin-left: 8px; */
}
#in-cart-center {
  margin: auto;
}

.product {
  border-bottom: 1px solid #000;
  display: flex;
  padding: 8px;
}

.left-container {
  height: 130px;
  width: 130px;
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
  align-items: center;
}

.title-container {
  min-height: 48px;
}

.item-title {
  font-weight: bold;
}

.quantity-container {
  display: flex;
  align-items: center;
}

.quantity-controls {
  margin-left: 8px;
  width: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.item-price {
  color: #555;
}

.item-price-total {
  font-weight: bold;
}

.v-application__wrap {
  overflow: auto;
}
</style>
