<script setup>
import { RouterView } from 'vue-router'
import TopBar from './navigation/TopBar.vue'
import CategorySidebar from './navigation/CategorySidebar.vue'
</script>

<template>
  <header>
    <TopBar />
  </header>

  <main>
    <div class="layout">
      <CategorySidebar />

      <div class="content">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: calc(100vh - 56px); /* 減去 TopBar 的高度 */
  background-color: #f5f7fa; /* 整體背景色 */
}

.content {
  flex: 1;
  padding: 32px;
  overflow: auto;
}
</style>
