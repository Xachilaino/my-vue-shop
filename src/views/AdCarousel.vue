<template>
  <el-carousel height="400px" indicator-position="outside">
    <el-carousel-item v-for="(ad, index) in ads" :key="index">
      <a :href="ad.link" class="ad-link">
        <img :src="ad.image" :alt="ad.title" class="ad-image" />
        <h3 class="ad-title">{{ ad.title }}</h3>
      </a>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
defineProps({
  ads: {
    type: Array,
    required: true,
    default: () => [],
  },
})
</script>

<style scoped>
.ad-link {
  display: block;
  width: 100%;
  height: 100%;
  position: relative; /* 為了標題定位 */
}

.ad-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 讓圖片填滿容器且不變形 */
}

.ad-title {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 15px;
  border-radius: 4px;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
