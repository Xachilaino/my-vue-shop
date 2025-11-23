<template>
  <header class="top-bar">
    <div class="logo" @click="goHome" style="cursor: pointer">🛒 我的商城</div>
    <div class="auth">
      <el-button v-if="!isLoggedIn" type="primary" @click="goLogin">登入</el-button>

      <div v-else class="user-menu">
        <span>👤 {{ user.username }}</span>
        <el-button type="danger" plain @click="handleLogout">登出</el-button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useNavigation } from '@/composables/useNavigation' // 引入 useNavigation

const userStore = useUserStore()
const { goHome, goLogin } = useNavigation() // 使用 useNavigation

const isLoggedIn = computed(() => userStore.isLoggedIn)
const user = computed(() => userStore.user)

const handleLogout = () => {
  userStore.logout()
  goHome()
}
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #409eff;
  color: #fff;
  padding: 0 20px;
  height: 56px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 16px; /* 增加間距 */
}
</style>
