import { defineStore } from "pinia";

interface FavoriteState {
  favorites: number[];
}

export const favoriteStore = defineStore("favoritesList", {
  state: (): FavoriteState => {
    return {
      favorites: JSON.parse(localStorage.getItem("favoritesList")!) || [],
    };
  },
  actions: {
    saveFavorites() {
      localStorage.setItem("favoritesList", JSON.stringify(this.favorites));
    },
    manageFavorite(id: number) {
      const idToFind = id;
      const exists = this.favorites.find((id) => id === idToFind);
      if (!exists) {
        this.favorites.push(id);
      } else {
        const idToRemove = id;
        this.favorites = this.favorites.filter((id) => id !== idToRemove);
      }
      this.saveFavorites();
    },
  },
});
