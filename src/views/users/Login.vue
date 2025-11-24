<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="title">會員登入</h2>
      <el-form :model="form" label-width="80px">
        <el-form-item label="帳號">
          <el-input v-model="form.username" placeholder="請輸入帳號" />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="請輸入密碼"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="handleLogin">登入</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/userStore'
import { useNavigation } from '@/composables/useNavigation'
import { ElMessage } from 'element-plus'

const form = ref({
  username: 'admin', // 後端預設的使用者
  password: 'password',
})

const userStore = useUserStore()
const { goHome } = useNavigation()

const handleLogin = async () => {
  try {
    const success = await userStore.login({
      username: form.value.username,
      password: form.value.password,
    })

    if (success) {
      ElMessage.success('登入成功！')
      goHome()
    }
    // 失敗的訊息會由 apiService 的攔截器統一處理
  } catch (error) {
    console.error('Login failed:', error)
    // 錯誤訊息也由攔截器處理
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}
.login-card {
  width: 400px;
  padding: 20px;
}
.title {
  text-align: center;
  margin-bottom: 24px;
}
</style>
