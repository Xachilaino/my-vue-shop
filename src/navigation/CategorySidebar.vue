<template>
  <div class="sidebar-wrapper">
    <el-menu class="sidebar-menu" router>
      <el-menu-item index="/products">
        <span>商品列表</span>
      </el-menu-item>

      <el-sub-menu v-if="userRole === 'ADMIN'" index="/admin">
        <template #title><span>後台管理</span></template>
        <el-menu-item index="/admin/products">商品管理</el-menu-item>
        <el-menu-item index="/admin/settings/options">選項管理</el-menu-item>
      </el-sub-menu>
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
