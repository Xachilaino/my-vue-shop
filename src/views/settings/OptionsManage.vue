<template>
  <div class="container">
    <div class="header">
      <h2 class="title">選項管理</h2>
      <el-button @click="openForm('add')" type="primary">+ 新增項目</el-button>
    </div>

    <OptionsForm
      v-if="showForm"
      :mode="formMode"
      :option-data="selectedOption"
      @submit="handleFormSubmit"
      @close="closeForm"
    />

    <el-table :data="options" style="width: 100%" border>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="listName" label="分類名稱" sortable />
      <el-table-column prop="key" label="選項名稱" />
      <el-table-column prop="value" label="選項值" />
      <el-table-column prop="sortOrder" label="排序" sortable />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="openForm('edit', row)">編輯</el-button>
          <el-button size="small" type="danger" @click="deleteOption(row.id)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/service/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import OptionsForm from './OptionsForm.vue'

const options = ref([])
const showForm = ref(false)
const formMode = ref('add') // 'add' or 'edit'
const selectedOption = ref({})

const fetchOptions = async () => {
  try {
    const response = await api.getOptions()
    options.value = response.result
  } catch (error) {
    ElMessage.error('載入選項失敗')
  }
}

onMounted(fetchOptions)

const openForm = (mode, option = {}) => {
  formMode.value = mode
  // 注意：後端回傳的 name 叫做 'key'，表單需要的是 'name'
  selectedOption.value = { ...option, name: option.key }
  showForm.value = true
}

const closeForm = () => {
  showForm.value = false
}

const handleFormSubmit = () => {
  closeForm()
  fetchOptions() // 重新載入列表
}

const deleteOption = async (id) => {
  try {
    await ElMessageBox.confirm('確定要刪除這個選項嗎？', '警告', { type: 'warning' })
    await api.deleteOption(id)
    ElMessage.success('刪除成功！')
    fetchOptions() // 重新載入列表
  } catch (error) {
    if (error !== 'cancel') ElMessage.error('刪除失敗')
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
