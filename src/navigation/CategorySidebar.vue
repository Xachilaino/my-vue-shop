<template>
  <div class="sidebar-wrapper">
    <el-menu class="sidebar-menu" router>
      <el-menu-item index="/products">
        <span>商品列表</span>
      </el-menu-item>
      <el-menu-item index="/another-page">
        <span>另一個分類</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup></script>

<style scoped>
.sidebar-wrapper {
  width: 240px;
  min-height: 100vh;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
}

.sidebar-menu {
  height: 100%;
  border-right: none;
}
</style>
