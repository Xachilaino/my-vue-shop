<template>
  <div class="product-list-container">
    <div class="product-list-header">
      <h2 class="header-title">商品列表</h2>
      <el-button @click="drawerVisible = true" type="primary" plain>
        🛒 購物車 ({{ cartStore.totalQuantity }})
      </el-button>
    </div>

    <el-row v-if="isLoading" :gutter="20">
      <el-col v-for="i in 4" :key="i" :span="6">
        <el-skeleton style="width: 100%" animated>
          <template #template>
            <el-skeleton-item variant="image" style="width: 100%; height: 160px" />
            <div style="padding: 14px">
              <el-skeleton-item variant="p" style="width: 50%" />
              <div style="display: flex; align-items: center; justify-items: space-between">
                <el-skeleton-item variant="text" style="margin-right: 16px" />
                <el-skeleton-item variant="text" style="width: 30%" />
              </div>
            </div>
          </template>
        </el-skeleton>
      </el-col>
    </el-row>

    <el-row v-else :gutter="20">
      <el-col
        v-for="product in products"
        :key="product.id"
        :span="6"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        class="product-col"
      >
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <div class="card-image-wrapper">
            <img :src="product.imageBase64" alt="product image" class="card-image" />
          </div>
          <div class="card-body">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-category">{{ product.category }}</p>
            <div class="card-footer">
              <p class="product-price">$ {{ product.price }}</p>
              <el-button type="primary" size="small" @click="addToCart(product)">
                加入購物車
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <CartDrawer v-model:drawerVisible="drawerVisible" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/service/api'
import CartDrawer from '@/components/CartDrawer.vue' // 引入 CartDrawer
import { useCartStore } from '@/store/cartStore' // 引入 cartStore
import { ElMessage } from 'element-plus'

const products = ref([])
const isLoading = ref(true)
const drawerVisible = ref(false) // 控制抽屜顯示/隱藏的狀態
const cartStore = useCartStore() // 取得 cartStore 實例

const addToCart = (product) => {
  cartStore.addProduct(product) // 呼叫 store 的 action
  ElMessage.success(`${product.name} 已加入購物車`)
  drawerVisible.value = true // 加入後自動打開購物車
}

onMounted(async () => {
  try {
    const response = await api.getProducts()
    products.value = response.result
  } catch (error) {
    console.error('載入商品失敗:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
/* ... (樣式部分維持不變) ... */
.product-list-container {
  padding: 24px;
}
.product-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.header-title {
  font-size: 24px;
  font-weight: bold;
}
.product-col {
  margin-bottom: 24px;
}
.card-image-wrapper {
  width: 100%;
  height: 160px;
  overflow: hidden;
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.el-card:hover .card-image {
  transform: scale(1.05);
}
.card-body {
  padding: 16px;
}
.product-name {
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.product-category {
  font-size: 12px;
  color: #6b7280;
  margin: 4px 0;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}
.product-price {
  color: #dc2626;
  font-size: 18px;
  font-weight: 600;
}
</style>
