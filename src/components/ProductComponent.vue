<template>
  <div v-if="store.loading">Loading...</div>
  <div id="product-container" v-else>
    <div
      class="card"
      v-for="product in products"
      :key="product.id"
      @click="openProduct(product.id)"
    >
      <img class="product-image" :src="product.images[0]" alt="product image" />
      <div class="card-info">
        <h2 class="product-title">{{ product.title }}</h2>
        <p>Price: ${{ product.price }}</p>
        <p>Category: {{ product.category.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUpdate, onBeforeMount, ref } from "vue";
//import productsStore
import { productsStore } from "../stores/products.ts";
import { useRouter } from "vue-router";

// assign productsStore (as a function) to a variable
const store = productsStore();
const router = useRouter();

const products = ref(store.products);

onBeforeMount(() => {
  const query = props.productQuery;
  if (query !== null) {
    products.value = store.products.filter(
      (product) =>
        product.title.toLowerCase().includes(query!.toLowerCase()) ||
        product.category.name.toLowerCase().includes(query!.toLowerCase())
    );
    console.log(products.value.length);
  } else {
    products.value = [];
  }
  sendResultsLength();
});

onBeforeUpdate(() => {
  const query = props.productQuery;
  if (query !== null) {
    products.value = store.products.filter(
      (product) =>
        product.title.toLowerCase().includes(query!.toLowerCase()) ||
        product.category.name.toLowerCase().includes(query!.toLowerCase())
    );
    console.log(products.value.length);
  } else {
    products.value = [];
  }
  sendResultsLength();
});

const openProduct = (id: number) => {
  router.push({ name: "OpenedProduct", params: { id } });
};

const emit = defineEmits(["results-length"]);

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

.card:hover {
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.44) 0px 15px 12px;
  transition: 0.1s ease-in;
}

.card-info {
  padding: 8px;
}
.product-image {
  width: 100%;
}

.product-title {
  font-size: 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
