<template>
  <div class="register-container">
    <el-card class="register-card">
      <h2 class="title">會員註冊</h2>

      <el-form :model="form" :rules="rules" ref="registerForm" label-width="80px">
        <el-form-item label="帳號" prop="username">
          <el-input v-model="form.username" placeholder="請輸入帳號" clearable />
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="請輸入密碼"
            show-password
          />
        </el-form-item>
        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="請輸入Email" clearable />
        </el-form-item>
        <el-form-item label="姓名" prop="fullName">
          <el-input v-model="form.fullName" placeholder="請輸入姓名" clearable />
        </el-form-item>
        <el-form-item label="手機" prop="phone">
          <el-input v-model="form.phone" placeholder="請輸入手機號碼" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRegister" :loading="loading" style="width: 100%"
            >註冊</el-button
          >
        </el-form-item>
        <div class="login-link">
          <span>已有帳號？</span>
          <el-link type="primary" @click="goTo('Login')">立即登入</el-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import api from '@/service/api'
import { useNavigation } from '@/composables/useNavigation'

const { goTo } = useNavigation()
const registerForm = ref()
const loading = ref(false)

const form = ref({
  username: '',
  password: '',
  email: '',
  fullName: '',
  phone: '',
})

const rules = {
  username: [{ required: true, message: '請輸入帳號', trigger: 'blur' }],
  password: [{ required: true, message: '請輸入密碼', trigger: 'blur' }],
  email: [
    { required: true, message: '請輸入Email', trigger: 'blur' },
    { type: 'email', message: '請輸入有效的Email格式', trigger: ['blur', 'change'] },
  ],
}

const handleRegister = async () => {
  if (!registerForm.value) return
  await registerForm.value.validate(async (valid) => {
    if (!valid) return
    loading.value = true
    try {
      await api.register(form.value)
      ElMessage.success('註冊成功！請登入您的帳號')
      goTo('Login') // 註冊成功後導向登入頁
    } catch (error) {
      // 錯誤訊息由 apiService 攔截器統一處理
      console.error('註冊失敗:', error)
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
.register-card {
  width: 450px;
  padding: 20px;
}
.title {
  text-align: center;
  margin-bottom: 24px;
}
.login-link {
  text-align: center;
  margin-top: 10px;
}
</style>
