<template>
    <a-row justify="center">
      <h2>ประกาศ</h2>
    </a-row>
  
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
      <div v-for="(item, index) in dataShow" :key="index">
        
        <a-image :preview="false" :src="config.public.apiServer + '/' + item.image" />
      </div>
    </a-carousel>
  
    <a-row justify="center" class="m-2">
      <a-button type="primary" ghost @click="closeNotify">ปิดหน้าต่าง</a-button>
    </a-row>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
  import { memberStore } from '~/store/index';
  import { getNotifyServices } from '~/services/notifyServices';
  
  const member = memberStore();
  const dataShow = ref<any[]>([]);
  const config = useRuntimeConfig()
  
  // ดึงข้อมูลการแจ้งเตือน
  const getNotify = async () => {
    try {
      const response = await getNotifyServices();
      if (response.status === 'success') {
        dataShow.value = response.data.data;
        console.log('Fetched notification data:', response.data.data);
      } else {
        console.error('Failed to fetch transaction data');
      }
    } catch (error) {
      console.error('Error fetching transaction data:', error);
    }
  };
  
  // ปิดการแจ้งเตือน
  const closeNotify = () => {
    member.setMemberNotify(false);
  };
  
  onMounted(() => {
    getNotify();
  });
  </script>
  
  <style scoped>
  /* ปรับขนาดของ Carousel ให้แสดงภาพเต็ม */
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
  