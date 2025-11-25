<template>
  <div class="profile-container">
    <el-card class="profile-card">
      <h2 class="title">個人資料維護</h2>

      <el-form v-if="!loading" :model="form" :rules="rules" ref="profileForm" label-width="80px">
        <el-form-item label="帳號">
          <el-input v-model="form.username" disabled />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="請輸入Email" />
        </el-form-item>
        <el-form-item label="姓名" prop="fullName">
          <el-input v-model="form.fullName" placeholder="請輸入姓名" />
        </el-form-item>
        <el-form-item label="手機" prop="phone">
          <el-input v-model="form.phone" placeholder="請輸入手機號碼" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleUpdate" style="width: 100%">更新資料</el-button>
        </el-form-item>
      </el-form>
      <el-skeleton v-else :rows="5" animated />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/service/api'
import { ElMessage } from 'element-plus'

const profileForm = ref()
const loading = ref(true)
const form = ref({
  username: '',
  email: '',
  fullName: '',
  phone: '',
})

const rules = {
  email: [
    { required: true, message: '請輸入Email', trigger: 'blur' },
    { type: 'email', message: '請輸入有效的Email格式', trigger: ['blur', 'change'] },
  ],
  fullName: [{ required: true, message: '請輸入姓名', trigger: 'blur' }],
}

onMounted(async () => {
  try {
    const response = await api.findUser() // 呼叫 API 獲取當前登入者的資料
    form.value = response.result
  } catch (error) {
    ElMessage.error('載入使用者資料失敗')
  } finally {
    loading.value = false
  }
})

const handleUpdate = async () => {
  if (!profileForm.value) return
  await profileForm.value.validate(async (valid) => {
    if (!valid) return
    try {
      await api.updateProfile(form.value)
      ElMessage.success('資料更新成功！')
    } catch (error) {
      console.error('更新失敗:', error)
    }
  })
}
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
}
.profile-card {
  width: 500px;
  padding: 20px;
}
.title {
  text-align: center;
  margin-bottom: 24px;
}
</style>
