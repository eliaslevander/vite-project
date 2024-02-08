import { defineStore } from "pinia";
import Product from "../types/Product";

interface CartState {
  items: Product[];
}

export const cartStore = defineStore("cart", {
  state: (): CartState => {
    return {
      //return localStorage if it exists, otherwise return empty array
      items: JSON.parse(localStorage.getItem("items")) || [],
    };
  },
  actions: {
    saveItems() {
      //saves current state to localStorage
      localStorage.setItem("items", JSON.stringify(this.items));
    },
    addToCart(item: Product) {
      //target the item with its id
      const idToFind = item.id;
      //check if it exists in array with find
      const exists = this.items.find((item) => item.id === idToFind);
      //find the index
      const index = this.items.findIndex((item) => item.id === idToFind);
      //if not in array, push using spread operator and add quantity key with value 1
      if (!exists) {
        this.items.push({ ...item, quantity: 1 });
      } else {
        //if in array, increase quantity by one
        this.items[index].quantity++;
      }
      //push to localStorage
      this.saveItems();
    },
    removeFromCart(item: Product, method: string) {
      //Uses two methods, decrease and remove

      if (method === "decrease") {
        //target the item with its id
        const idToRemove = item.id;
        //use find to find it
        const itemToRemove = this.items.find((item) => item.id === idToRemove);
        //decrease quantity by one
        itemToRemove!.quantity--;
        //push to localStorage
      }

      if (method === "remove") {
        //target the item with its id
        const idToRemove = item.id;
        //use find to find it
        this.items = this.items.filter((item) => item.id !== idToRemove);
      }

      this.saveItems();
    },
  },

  getters: {
    countItems(): number {
      //use reduce to return and stack the value of the key quantity on every item in array
      const totalItemsInCart = this.items.reduce((acc, item) => {
        return (acc += item.quantity);
      }, 0);
      return totalItemsInCart;
    },
    getCartSum(): number {
      //use above logic but multiply with item.price
      const totalPrice = this.items.reduce((acc, item) => {
        return (acc += item.price * item.quantity);
      }, 0);
      return totalPrice;
    },
  },
});
