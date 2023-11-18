import { defineStore } from "pinia";

export const useShoppingStore = defineStore("shoppingCart", {
  state: () => ({
    shoppingCart: [],
  }),

  getters: {
    orderedQuantity: (state) =>
      state.shoppingCart.reduce(
        (sum, value) =>
          typeof value.quantity == "number" ? sum + value.quantity : sum,
        0
      ),
  },

  actions: {
    addItemCart(item) {
      this.shoppingCart.push(item);
    },
    deleteItemCart(item) {
      this.shoppingCart.splice(item, 1);
    },
  },
});
