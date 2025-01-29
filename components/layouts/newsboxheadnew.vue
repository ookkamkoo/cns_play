<template>
  <a-carousel
    :arrows="true"
    :autoplay="true"
    :slides-to-show="1"
    :center-mode="true"
    :center-padding="'31%'"
    :infinite="true"
    :responsive="[
      { breakpoint: 1020, settings: { slidesToShow: 1, centerPadding: '0%' } }
    ]"
  >
    <!-- ปุ่มสำหรับเปลี่ยนภาพ -->
    <template #prevArrow>
      <div class="custom-slick-arrow" style="left: 10px;">
        <left-circle-outlined />
      </div>
    </template>
    <template #nextArrow>
      <div class="custom-slick-arrow" style="right: 10px;">
        <right-circle-outlined />
      </div>
    </template>

    <!-- วนซ้ำเพื่อแสดงรูปภาพใน Carousel -->
    <div v-for="(item, index) in member.news" :key="index" class="carousel-item">
      <a-image 
        :preview="false" 
        :src="config.public.apiServer + '/' + item.image"
        alt="carousel-image"
        class="carousel-image"
      />
    </div>
  </a-carousel>
</template>

<script lang="ts" setup>
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
import { memberStore } from '~/store/index';

const member = memberStore();
const config = useRuntimeConfig();
</script>

<style scoped>
/* สไตล์ Carousel */
:deep(.slick-slide) {
  text-align: center;
  height: auto;
  line-height: normal;
  background: transparent;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease-in-out;
}

:deep(.slick-slide.slick-center .carousel-image) {
  transform: scale(1.0); /* ซูมเล็กน้อยเมื่ออยู่ตรงกลาง */
  transition: transform 0.3s ease-in-out;
}

:deep(.slick-slide img) {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

:deep(.slick-arrow.custom-slick-arrow) {
  width: 35px;
  height: 35px;
  font-size: 25px;
  color: #fff;
  /* background-color: rgba(0, 0, 0, 0.5); */
  border-radius: 50%; /* เพิ่มความโค้ง */
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  z-index: 1;
  cursor: pointer;
}

:deep(.slick-arrow.custom-slick-arrow:hover) {
  /* background-color: rgba(0, 0, 0, 0.8); */
  color: #ffd700; /* เปลี่ยนสีตอน hover */
}

:deep(.slick-arrow.custom-slick-arrow:before) {
  display: none;
}

/* สไตล์สำหรับภาพใน Carousel */
.carousel-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px; /* เพิ่มความโค้งมนของภาพ */
}
</style>
