<template>
  <div v-if="store.loading"><v-progress-circular></v-progress-circular></div>
  <div id="product-container" v-else>
    <div class="card" v-for="product in products" :key="product.id">
      <div class="image-container">
        <img
          class="product-image"
          :src="product.images[0]"
          alt="product image"
          @click="openProduct(product.id)"
        />
        <div class="button-backside"></div>

        <!-- <FavButton class="fav-button" :itemId="product.id" /> -->
        <v-btn
          @click="favsStore.manageFavorite(product.id)"
          flat
          icon
          :ripple="false"
          class="fav-button"
          size="small"
        >
          <v-icon
            color="red"
            v-if="product.id && favsStore.favorites.includes(product.id)"
            size="25"
            >mdi-heart</v-icon
          >
          <v-icon v-else size="25">mdi-heart-outline</v-icon>
        </v-btn>
      </div>

      <div class="card-info" @click="openProduct(product.id)">
        <h2 class="product-title">{{ product.title }}</h2>
        <p class="product-price">${{ product.price }}</p>
        <p class="product-category">Category: {{ product.category.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUpdate, onBeforeMount, ref } from "vue";
//import productsStore
import { productsStore } from "../stores/products.ts";
import { favoriteStore } from "../stores/favorite";
import { useRouter } from "vue-router";
// import FavButton from "../components/FavButton.vue";

// assign productsStore (as a function) to a variable
const store = productsStore();
const favsStore = favoriteStore();
const router = useRouter();

const products = ref(store.products);
const favList = ref(favsStore.favorites);

onBeforeMount(() => {
  // products.value = [];
  const query = props.productQuery;
  if (query === "favorites") {
    console.log("favorites mount");
    products.value = store.products.filter(({ id }) =>
      favList.value.includes(id)
    );
  } else if (query !== null) {
    products.value = store.products.filter(
      (product) =>
        product.title.toLowerCase().includes(query!.toLowerCase()) ||
        product.category.name.toLowerCase().includes(query!.toLowerCase())
    );
  } else if (query === "any") {
    products.value = products.value;
  } else {
    products.value = [];
  }
  sendResultsLength();
});

onBeforeUpdate(() => {
  // products.value = [];
  const query = props.productQuery;
  if (query === "favorites") {
    console.log("favorites update");
    products.value = store.products.filter(({ id }) =>
      favList.value.includes(id)
    );
  } else if (query !== null) {
    products.value = store.products.filter(
      (product) =>
        product.title.toLowerCase().includes(query!.toLowerCase()) ||
        product.category.name.toLowerCase().includes(query!.toLowerCase())
    );
  } else if (query === "any") {
    products.value = products.value;
  } else {
    products.value = [];
  }
  sendResultsLength();
});

// const getFavorites = () => {
//   products.value = store.products.filter(({ id }) =>
//     favList.value.includes(id)
//   );
// };

const openProduct = (id: number) => {
  router.push({ name: "OpenedProduct", params: { id } });
};

const emit = defineEmits(["results-length", ""]);

const sendResultsLength = () => {
  emit("results-length", products.value.length);
};

const props = defineProps({
  productQuery: String,
});
</script>

<style scoped>
#product-container {
  /* width: 100%; */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  gap: 8px;
  padding: 8px;
}

.card {
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
}

/* .card:hover {
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.44) 0px 15px 12px;
  transition: 0.1s ease-in;
} */

.card-info {
  padding: 8px;
}

.image-container {
  width: 100%;
  position: relative;
}

.fav-button {
  position: absolute;
  z-index: 1;
  top: 30px;
  right: -2px;
  font-size: 16px;
  border: none;
  border-radius: 10px 0 0 10px;
  cursor: pointer;
}
.product-image {
  width: 100%;
  height: auto;
  display: block;
}

.product-title {
  font-size: 0.75rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.product-price {
  font-size: 1rem;
  font-weight: bold;
}

.product-category {
  font-size: 0.75rem;
}
</style>
