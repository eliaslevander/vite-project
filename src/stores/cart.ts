import { defineStore } from "pinia";
import Product from "../types/Product";

interface CartState {
  items: Product[];
}

export const cartStore = defineStore("cart", {
  state: (): CartState => {
    return {
      items: [],
    };
  },

  getters: {
    countItems(): number {
      return this.items.length;
    },
    getCartSum(): number {
      const totalPrice = this.items.reduce((acc, item) => {
        return (acc += item.price);
      }, 0);
      console.log(totalPrice);
      return totalPrice;
    },
  }
});
