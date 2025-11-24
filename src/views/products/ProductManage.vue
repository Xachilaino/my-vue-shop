<template>
  <div class="container">
    <div class="header">
      <h2 class="title">商品管理</h2>
      <el-button @click="goTo('AddProduct')" type="primary"> + 新增商品 </el-button>
    </div>
    <el-table :data="products" style="width: 100%" border>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="商品名稱" />
      <el-table-column prop="category" label="分類" />
      <el-table-column prop="price" label="價格" />
      <el-table-column prop="stock" label="庫存" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="goTo('EditProduct', { id: row.id })"
            >編輯</el-button
          >
          <el-button size="small" type="danger" @click="deleteProduct(row.id)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/service/api'
import { useNavigation } from '@/composables/useNavigation'
import { ElMessage, ElMessageBox } from 'element-plus'

const products = ref([])
const { goTo } = useNavigation()

const fetchProducts = async () => {
  const response = await api.getManageProducts()
  products.value = response.result
}

onMounted(fetchProducts)

const deleteProduct = async (productId) => {
  try {
    // 彈出確認對話框
    await ElMessageBox.confirm('確定要刪除這項商品嗎？此操作會將商品狀態設為刪除。', '警告', {
      confirmButtonText: '確定刪除',
      cancelButtonText: '取消',
      type: 'warning',
    })

    // 使用者點擊確認後，呼叫刪除 API
    await api.deleteProduct(productId)
    ElMessage.success('商品刪除成功！')

    // 重新載入列表以更新畫面
    fetchProducts()
  } catch (error) {
    if (error !== 'cancel') {
      // 如果錯誤不是 'cancel' (使用者點擊取消)，則顯示錯誤訊息
      ElMessage.error('刪除失敗，請稍後再試')
      console.error('刪除商品失敗:', error)
    }
  }
}
</script>

<style scoped>
.container {
  padding: 24px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.title {
  font-size: 20px;
  font-weight: bold;
}
</style>
