import { defineStore } from 'pinia'
import Storage, { CART_KEY } from '@/utils/storageUtil'

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    // 初始狀態從 sessionStorage 讀取
    cart: Storage.get(CART_KEY, []),
  }),
  getters: {
    // 計算總數量
    totalQuantity: (state) => {
      return state.cart.reduce((total, item) => total + item.quantity, 0)
    },
    // 計算總價格
    totalPrice: (state) => {
      return state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    },
  },
  actions: {
    addProduct(product) {
      const existingItem = this.cart.find((item) => item.id === product.id)
      if (existingItem) {
        // 如果商品已存在，則數量 +1
        existingItem.quantity++
      } else {
        // 否則，將新商品加入購物車，並設定數量為 1
        this.cart.push({ ...product, quantity: 1 })
      }
      // 將更新後的購物車存回 sessionStorage
      Storage.set(CART_KEY, this.cart)
    },
    removeProduct(productId) {
      this.cart = this.cart.filter((item) => item.id !== productId)
      Storage.set(CART_KEY, this.cart)
    },
  },
})
