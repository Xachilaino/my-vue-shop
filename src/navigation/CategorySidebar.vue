<template>
  <div class="sidebar-wrapper">
    <el-menu class="sidebar-menu">
      <el-menu-item index="1">
        <span>商品分類一</span>
      </el-menu-item>
      <el-menu-item index="2">
        <span>商品分類二</span>
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
