import { defineStore } from "pinia";
import axios from "axios";
import Product from "../types/Product.ts";

interface ProductsState {
  products: Product[];
}

export const productsStore = defineStore("products", {
  state: (): ProductsState => ({
    products: [],
  }),

  actions: {
    async fetchData() {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/products"
        );
        this.products = response.data;
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
