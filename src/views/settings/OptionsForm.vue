<template>
  <div class="form-container">
    <h2 class="form-title">{{ isEditMode ? '編輯選項' : '新增選項' }}</h2>
    <el-form ref="optionFormRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="分類名稱" prop="listName">
        <el-input v-model="form.listName" placeholder="例如: category" />
      </el-form-item>
      <el-form-item label="選項名稱" prop="name">
        <el-input v-model="form.name" placeholder="例如: 電子產品" />
      </el-form-item>
      <el-form-item label="選項值" prop="value">
        <el-input v-model="form.value" placeholder="例如: electronics" />
      </el-form-item>
      <el-form-item label="排序" prop="sortOrder">
        <el-input-number v-model="form.sortOrder" :min="0" />
      </el-form-item>
      <el-form-item label="是否啟用" prop="isActive">
        <el-switch v-model="form.isActive" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description" type="textarea" :rows="2" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">
          {{ isEditMode ? '更新' : '新增' }}
        </el-button>
        <el-button @click="$emit('close')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue'
import api from '@/service/api'
import { ElMessage } from 'element-plus'

const props = defineProps({
  optionData: { type: Object, default: () => ({}) },
  mode: { type: String, required: true }, // 'add' or 'edit'
})
const emit = defineEmits(['submit', 'close'])

const optionFormRef = ref(null)
const form = reactive({})
const isEditMode = computed(() => props.mode === 'edit')

// 當傳入的 optionData 改變時，更新表單內容
watch(
  () => props.optionData,
  (newData) => {
    Object.assign(form, {
      listName: '',
      name: '',
      value: '',
      sortOrder: 0,
      isActive: true,
      description: '',
      ...newData,
    })
  },
  { immediate: true, deep: true },
)

const rules = {
  listName: [{ required: true, message: '請輸入分類名稱', trigger: 'blur' }],
  name: [{ required: true, message: '請輸入選項名稱', trigger: 'blur' }],
  value: [{ required: true, message: '請輸入選項值', trigger: 'blur' }],
}

const submitForm = async () => {
  await optionFormRef.value.validate(async (valid) => {
    if (!valid) return
    try {
      if (isEditMode.value) {
        await api.updateOption(form.id, form)
        ElMessage.success('選項更新成功！')
      } else {
        await api.addOption(form)
        ElMessage.success('選項新增成功！')
      }
      emit('submit') // 通知父元件，提交成功
    } catch (error) {
      ElMessage.error(`操作失敗: ${error.message}`)
    }
  })
}
</script>
<style scoped>
.form-container {
  border: 1px solid #dcdfe6;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 24px;
}
.form-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
