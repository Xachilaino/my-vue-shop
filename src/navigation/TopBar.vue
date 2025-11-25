<template>
  <header class="top-bar">
    <div class="logo" @click="goHome" style="cursor: pointer">🛒 我的商城</div>
    <div class="auth">
      <el-button v-if="!isLoggedIn" type="primary" @click="goTo('Login')">登入</el-button>

      <div v-else class="user-menu">
        <span>👤 {{ username }}</span>
        <el-dropdown>
          <el-button type="primary" circle>
            <el-icon><User /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goTo('Profile')">個人資料</el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout">登出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/store/userStore'
import { useNavigation } from '@/composables/useNavigation'
import { User } from '@element-plus/icons-vue'

const userStore = useUserStore()
const { goHome, goTo } = useNavigation()

const isLoggedIn = computed(() => userStore.isLoggedIn)
const username = computed(() => userStore.username) // 從 store 獲取 username

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
