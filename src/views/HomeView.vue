<template>
  <div>
    <AdCarousel :ads="adBanners" />
    <div class="main-content">
      <h1>歡迎來到我的商城</h1>
      <p>請點擊左側選單開始瀏覽商品。</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AdCarousel from './AdCarousel.vue' // 引入輪播圖元件

// 定義輪播圖的資料
const adBanners = ref([
  {
    title: '每日特價 50% OFF',
    image: '/Banner/food.jpg', // 使用絕對路徑
    link: '#',
  },
  {
    title: '最新 3C 全面上市',
    image: '/Banner/frontend.jpeg',
    link: '#',
  },
  {
    title: '旅遊季 全線優惠',
    image: '/Banner/travel.jpeg',
    link: '#',
  },
])
</script>

<style scoped>
.main-content {
  padding: 40px 20px;
  text-align: center;
}
</style>
