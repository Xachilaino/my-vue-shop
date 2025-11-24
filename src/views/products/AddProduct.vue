<template>
  <div class="max-w-2xl mx-auto ...">
    <h2 class="text-2xl font-bold mb-4">新增商品</h2>

    <el-form :model="form" label-width="100px" :rules="rules" ref="formRef">
      <el-form-item label="商品名稱" prop="name">
        <el-input v-model="form.name" placeholder="請輸入商品名稱" />
      </el-form-item>

      <el-form-item label="分類" prop="category">
        <el-select v-model="form.category" placeholder="請選擇分類">
          <el-option label="電子產品" value="電子產品" />
          <el-option label="生活用品" value="生活用品" />
          <el-option label="服飾配件" value="服飾配件" />
        </el-select>
      </el-form-item>

      <el-form-item label="價格" prop="price">
        <el-input-number v-model="form.price" :min="0" :step="100" />
      </el-form-item>

      <el-form-item label="上傳圖片" prop="imageBase64">
        <input type="file" accept="image/*" @change="handleFileChange" />
        <div v-if="imagePreview" class="mt-2">
          <img :src="imagePreview" class="h-32 rounded border" />
          <el-button type="danger" @click="removeImage" text>刪除圖片</el-button>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">新增商品</el-button>
      </el-form-item>
    </el-form>

    <ConfirmationDialog ... />
  </div>
</template>

<script setup>
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
import { useNavigation } from '@/composables/useNavigation'
import api from '@/service/api'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'

// 1. 初始化與變數定義
const formRef = ref() // 用來取得 <el-form> 的參照
const { goTo, goBack } = useNavigation() // 從 composable 取得導航函式
const imagePreview = ref(null) // 存放圖片預覽的 Base64 字串

// 2. 表單資料物件 (核心)
const form = reactive({
  name: '', // 產品名稱
  category: '', // 分類
  price: 1000, // 價格
  stock: 0, // 庫存
  description: '', // 描述
  imageBase64: '', // 圖片 (Base64 格式)
  imageType: '', // 圖片類型 (e.g., 'image/png')
})

// 3. 表單驗證規則 (核心)
const rules = {
  name: [{ required: true, message: '請輸入商品名稱', trigger: 'blur' }],
  // ... 其他欄位的驗證規則
  imageBase64: [{ required: true, message: '請上傳圖片', trigger: 'change' }],
}

// 4. 圖片處理函式 (核心)
function handleFileChange(event) {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.readAsDataURL(file) // 將圖片檔案讀取為 Base64 字串
  reader.onload = () => {
    // 讀取完成後
    const img = new Image()
    img.src = reader.result
    img.onload = () => {
      // 圖片載入完成後，進行縮圖
      const resizedImage = resizeImage(img, file.type, 200, 150)
      form.imageBase64 = resizedImage // 將縮圖後的 Base64 存入 form
      form.imageType = file.type
      imagePreview.value = resizedImage // 更新預覽畫面
    }
  }
}

// (resizeImage 函式使用 Canvas 技術來縮放圖片，這裡不贅述)

function removeImage() {
  form.imageBase64 = ''
  imagePreview.value = null
  document.querySelector('input[type="file"]').value = '' // 清空檔案選擇框
}

// 5. 表單提交函式 (核心)
function submitForm() {
  formRef.value.validate(async (valid) => {
    if (!valid) return // 如果驗證失敗，就中斷執行

    try {
      // 呼叫我們在 api.js 中封裝好的 addProduct 函式
      await api.addProduct(form)
      ElMessage.success('商品新增成功！')
      // 成功後，顯示一個確認對話框
      successDialogVisible.value = true
    } catch (error) {
      ElMessage.error('新增失敗，請稍後再試')
    }
  })
}

// ... (resetForm, back, successButtons 等輔助函式)
</script>
