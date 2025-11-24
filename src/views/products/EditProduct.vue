<template>
  <div class="max-w-2xl mx-auto ...">
    <h2 class="text-2xl font-bold mb-4">編輯商品</h2>

    <el-form :model="form" label-width="100px" :rules="rules" ref="formRef">
      <el-form-item label="分類" prop="category">
        <el-select v-model="form.category" placeholder="請選擇分類">
          <el-option
            v-for="(ca, index) in category"
            :key="index"
            :label="ca.label"
            :value="ca.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">更新商品</el-button>
        <el-button @click="cancelEdit" type="success">取消變更</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { useNavigation } from '@/composables/useNavigation'
import api from '@/service/api'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref, inject } from 'vue' // 引入 onMounted 和 inject
import { useRoute } from 'vue-router' // 引入 useRoute

// 1. 獲取路由資訊
const route = useRoute() // 取得當前路由的物件
const { goTo } = useNavigation()
const productId = ref(null) // 用來存放從網址列解析出來的商品 ID

const formRef = ref()
const imagePreview = ref(null)

// 表單資料物件，初始為空
const form = reactive({
  name: '',
  category: '',
  price: 0,
  // ... 其他欄位
})

// ... (rules, resizeImage, handleFileChange, removeImage 等函式與 AddProduct 相同) ...

// 2. 生命週期鉤子 onMounted (核心)
onMounted(async () => {
  // 從路由參數中取得 id
  productId.value = route.params?.id

  if (productId.value) {
    try {
      // 透過 inject 獲取全域提供的選項資料
      const allOptions = inject('allOptions')
      // 過濾出 "order_status" 和 "category" 的選項
      states.value = filterOptions(allOptions, 'order_status')
      category.value = filterOptions(allOptions, 'category')

      // 根據 ID 呼叫 API，獲取該商品的詳細資料
      const res = await api.getProductById(productId.value)
      if (res.code === '0000') {
        const product = res.result
        // 將 API 回傳的資料，填入 form 物件中，畫面會自動更新
        Object.assign(form, product)
        // 同時設定圖片預覽
        imagePreview.value = product.imageBase64
      }
    } catch (error) {
      ElMessage.error('載入商品資料失敗')
    }
  }
})

// 3. 表單提交函式 (核心)
function submitForm() {
  formRef.value.validate(async (valid) => {
    if (!valid) return
    try {
      // 呼叫更新 API，需要傳入商品 ID 和表單資料
      await api.updateProduct(productId.value, form)
      ElMessage.success('商品更新成功！')
      // 更新成功後，導航回商品管理列表
      goTo('ProductList')
    } catch (error) {
      ElMessage.error('更新失敗，請稍後再試')
    }
  })
}
</script>
