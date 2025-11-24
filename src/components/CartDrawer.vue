<template>
  <el-drawer
    :model-value="drawerVisible"
    @update:model-value="$emit('update:drawerVisible', $event)"
    title="🛒 購物車"
    size="40%"
  >
    <div v-if="cart.length > 0">
      <el-table :data="cart" style="width: 100%">
        <el-table-column prop="name" label="商品" />
        <el-table-column label="價格">
          <template #default="scope">${{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column prop="quantity" label="數量" />
        <el-table-column label="小計">
          <template #default="scope">${{ scope.row.price * scope.row.quantity }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="danger" size="small" @click="removeItem(scope.row.id)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-empty v-else description="購物車是空的" />

    <template #footer>
      <div style="text-align: right; padding-right: 20px">
        <p style="font-size: 18px; font-weight: bold">
          總計: <span style="color: #dc2626">${{ cartStore.totalPrice }}</span>
        </p>
        <el-button type="primary" :disabled="cart.length === 0">前往結帳</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/store/cartStore'
import { ElMessage } from 'element-plus'

defineProps({
  drawerVisible: { type: Boolean, required: true },
})
defineEmits(['update:drawerVisible'])

const cartStore = useCartStore()
const cart = computed(() => cartStore.cart)

const removeItem = (productId) => {
  cartStore.removeProduct(productId)
  ElMessage.success('商品已從購物車移除')
}
</script>
