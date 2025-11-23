<template>
  <header class="top-bar">
    <div class="logo">🛒 我的商城</div>
    <div class="auth"></div>
  </header>
</template>

<script setup></script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #409eff; /* Element Plus 的主色調 */
  color: #fff;
  padding: 0 20px;
  height: 56px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.auth {
  display: flex;
  align-items: center;
}
</style>
