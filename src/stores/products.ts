import { defineStore } from 'pinia'
import axios from 'axios'
import Product from '../types/Product.ts'

interface ProductsState {
  products: Product[];
}

// dummjson.com/products/
// pokeapi.co/api/v2
// https://api.openbrewerydb.org/v1/breweries/


// api.coincap.io/v2/assets/

// api-key: faa502d5-1a1b-4155-8f58-7eb8ead283b4


export const productsStore = defineStore('products', {
  state: (): ProductsState => ({
    products: []
  }),

  actions: {
    async fetchData() {
      try {
        const response = await axios.get("https://dummyjson.com/products/");

        this.products = response.data.products;
      } catch (error) {
        console.error(error)
      }
    }
  }
})









// export const productsStore = defineStore({ id: 'products', {
//   state: (): ProductsState => ({
//     products: []
//   }),
//   actions: {
//     async fetchData() {
//       try {
//         const response = await axios.get("https://fakestoreapi.com/products/");
//         this.products = response.data;
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   }
// }})

// export const productsStore = defineStore({
//   id: 'products',
//   state: (): ProductsState => ({
//     products: [],
//     fetchData: async function() {
//       try {
//         const response = await axios.get("https://fakestoreapi.com/products");
//         this.products = response.data;
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   })
// })
