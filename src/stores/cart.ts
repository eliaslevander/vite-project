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
  actions: {
    addToCart(item: Product) {
      // console.log(item.id)
      const idToFind = item.id
      const exists = this.items.find((item) => item.id === idToFind)
      if (!exists || this.items.length === 0) {
        this.items.push({...item, quantity: 1})
      } else {
        // ??????
        console.log("in cart")
      }

      // console.log(this.items)
    }
  },

  getters: {
    countItems(): number {
      return this.items.length;
    },
    getCartSum(): number {
      const totalPrice = this.items.reduce((acc, item) => {
        return (acc += item.price);
      }, 0);
      return totalPrice;
    },
  }
});
