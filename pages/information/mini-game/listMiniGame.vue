<template>
  <h3>กิจกรรมทั้งหมด</h3>
  <a-flex wrap="wrap">
      <a-col :span="12" :sm="12" :xl="6" class="promotion-item">
        <NuxtLink to="/information/mini-game/spinWheel" exact class="link-sidebar">
          <div class="image-container p-1" @click="promotionDetail(noPromotion)">
              <a-image
                  src="https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/pg-game/%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%82%E0%B8%A1%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99.webp"
                  style="border-radius: 5px;"
                  :preview="false"
              />
              <div class="overlay">
                  <p class="detail-promotion">เลือกกิจกรรม</p>
              </div>
          </div>
        </NuxtLink>
      </a-col>
  </a-flex>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { getPromotionServices,confirmPromotionServices } from "~/services/promotion";
  import type { Promotion } from "~/services/promotion";
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { createVNode } from 'vue';
  import dayjs from 'dayjs';
  import { Alert } from '~/components/alert/alertComponent';
  const config = useRuntimeConfig()

  const noPromotion: Promotion = {
      id: 0,
      name: "ไม่รับโปรโมชั่น",
      type: 1,
      bonus_type: 1,
      bonus_withdraw: 1,
      type_open: 1,
      open_data: "",
      time_open_close: 1,
      time_open: "2024-10-27T00:00:00+07:00",
      time_close: "2024-10-27T23:59:00+07:00",
      low_deposit: 0,
      limit_round: 0,
      type_deposit: 1,
      type_max_withDraw: 2,
      condition_data: { bonus: 0, amount: 0, amountMaxWithDraw: 0 },
      turn: {
          m2: 0,
          game: 0,
          keno: 0,
          step: 0,
          lotto: 0,
          poker: 0,
          casino: 0,
          eSport: 0,
          parlay: 0,
          trading: 0,
          football: 0,
          multiplePlayer: 0
      },
      image: "https://cdn-cns.sgp1.cdn.digitaloceanspaces.com/image/pg-game/%E0%B9%84%E0%B8%A1%E0%B9%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%82%E0%B8%A1%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99.webp",
      is_active: true,
      created_by: 1,
      created_at: "2024-10-27T13:17:38.006021+07:00",
      updated_by: 1,
      updated_at: "2024-10-28T00:22:01.769606+07:00"
  };
  
  const promotion = ref<Promotion[]>([]);
  const promotionMember = ref<Promotion>(noPromotion);
  const open = ref<boolean>(false);
  const detail = ref<any>();

  const showModal = () => {
      open.value = true;
  };

  const promotionDetail = (data:any) => {
      showModal()
      detail.value = data
  };
  
//   const getPromotion = async () => {
//       const data = await getPromotionServices();
//       if (data.status === 'success') {
//           promotion.value = data.data.promotions;
//           if(data.data.promotionsMember != null){
//               promotionMember.value = data.data.promotionsMember
//               console.log(promotionMember);
              
//           }else{
//               promotionMember.value = noPromotion
//           }
//       } else {
//           console.error("Failed to fetch promotions.");
//       }
//   };

//   const confirmPromotion = async (id: number,name:string) => {
//       Modal.confirm({
//           title: 'ลูกค้าต้องการเลือกโปรโมชั่นนี้ใช่ไหม?',
//           icon: createVNode(ExclamationCircleOutlined),
//           content: 'ลูกค้าต้องการเลือกโปรโมชั่น '+name,
          
//           // Make onOk async
//           async onOk() {
//               try {
//                   console.log('OK');
//                   const data = await confirmPromotionServices(id);
//                   if (data.status === 'success') {
//                       Alert("success","เเก้ไขโปรโมชั่นเรียบร้อยเเล้ว.")
//                   } else {
//                       console.error("Failed to fetch promotions.");
//                   }
//               } catch (error) {
//                   console.error("Error confirming promotion:", error);
//               }
//           },
//           onCancel() {
//               console.log('Cancel');
//           },
//           class: 'test',
//       });
//   };
  
  onMounted(() => {
    //   getPromotion();
  });
  
  definePageMeta({
      layout: 'information'
  });
</script>

<style>
  .promotion-item {
      position: relative;
  }
  
  .image-container {
      position: relative;
      display: inline-block;
  }

  .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      opacity: 0;
      border-radius: 5px;
      transition: opacity 0.3s ease;
      cursor: pointer;
  }

  .image-container:hover .overlay {
      opacity: 1;
  }

  .bright-orange {
      background-color: #ff9500;
      border-color: #ff9500;
      color: white;
  }

  .bright-orange:hover {
      background-color: #e68400 !important;
      border-color: #e68400;
  }

  .mx-1 {
      margin: 0.5rem 1rem;
  }

  .detail-promotion {
      border: 2px solid #ff9500;
      padding: 5px 10px;
      border-radius: 10px;
      font-weight: bold;
  }

  .smoky-checkbox span{
      color: whitesmoke !important;
  }

  .ant-checkbox-wrapper-checked .ant-checkbox-inner{
      border-color: whitesmoke !important;
      background: #1677ff !important;
  }

  .smoky-checkbox .ant-checkbox-inner:after{
      border-color: whitesmoke !important;
  }

  .left-spacing {
      padding-left: 20px;
  }

  .center-checkbox {
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .modal-footer {
      display: flex;
      justify-content: center;
      padding: 10px;
      margin-top: 20px;
  }
</style>
