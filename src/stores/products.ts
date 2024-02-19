import { defineStore } from "pinia";
import axios from "axios";
import Product from "../types/Product.ts";

interface ProductsState {
  products: Product[];

  loading: boolean;
}

export const productsStore = defineStore("products", {
  state: (): ProductsState => ({
    products: [],

    loading: true,
  }),

  actions: {
    async fetchData() {
      try {
        const response = await axios.get("./db.json");
        this.products = response.data;
        this.loading = false;
        console.log(this.loading);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
