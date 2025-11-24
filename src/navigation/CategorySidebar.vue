<template>
  <div class="sidebar-wrapper">
    <el-menu class="sidebar-menu" router>
      <el-menu-item index="/products">
        <span>商品列表</span>
      </el-menu-item>

      <el-menu-item v-if="userRole === 'ADMIN'" index="/admin/products">
        <span>商品管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/store/userStore'

const userStore = useUserStore()
const userRole = computed(() => userStore.userRole)
</script>

<style scoped>
/* ... 樣式維持不變 ... */
</style>
