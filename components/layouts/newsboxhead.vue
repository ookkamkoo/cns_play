<template>
    <a-carousel arrows autoplay>
      <!-- ปุ่มสำหรับเปลี่ยนภาพ -->
      <template #prevArrow>
        <div class="custom-slick-arrow" style="left: 10px; z-index: 1">
          <left-circle-outlined />
        </div>
      </template>
      <template #nextArrow>
        <div class="custom-slick-arrow" style="right: 10px">
          <right-circle-outlined />
        </div>
      </template>
  
      <!-- วนซ้ำเพื่อแสดงรูปภาพใน Carousel -->
      <div v-for="(item, index) in member.news" :key="index">
        <a-image :preview="false" :src="config.public.apiServer + '/' + item.image" />
      </div>
    </a-carousel>
  </template>
  <script lang="ts" setup>
  import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
  import { memberStore } from '~/store/index';
  const member = memberStore();
  const config = useRuntimeConfig()
  </script>
  <style scoped>
  :deep(.slick-slide) {
    text-align: center;
    height: auto;
    line-height: normal;
    background: transparent;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  :deep(.slick-slide img) {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }
  
  :deep(.slick-arrow.custom-slick-arrow) {
    width: 25px;
    height: 25px;
    font-size: 25px;
    color: #fff;
    background-color: rgba(31, 45, 61, 0.11);
    transition: ease all 0.3s;
    opacity: 0.7;
    z-index: 1;
    cursor: pointer;
  }
  :deep(.slick-arrow.custom-slick-arrow:before) {
    display: none;
  }
  :deep(.slick-arrow.custom-slick-arrow:hover) {
    color: #fff;
    opacity: 1;
  }
  </style>