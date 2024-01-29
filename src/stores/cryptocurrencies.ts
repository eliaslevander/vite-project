import { defineStore } from 'pinia'
import axios from 'axios'
import Crypto from '../types/Crypto.ts'

interface CryptoState {
  coins: Crypto[];
}

export const currenciesStore = defineStore('coins', {
  state: (): CryptoState => ({
    coins: []
  }),
  actions: {
    async fetchData() {
      try {
        const response = await axios.get("https://api.coincap.io/v2/assets/");
        this.coins = response.data.data;
      } catch (error) {
        console.error(error)
      }
    }
  }
})
