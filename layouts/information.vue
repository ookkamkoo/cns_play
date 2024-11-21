<template>
    <a-modal v-model:open="member.notify" :footer="null" :class="{'login-small':!screens.md}">
      <OtherNotify/>
    </a-modal>
    <a-layout>
      <a-layout-header class="header" :class="{'small-header':!screens.md}">
        <LayoutsHeader :showDrawer="showDrawer" :showModalLogin="showModalLogin" :showModalRegister="showModalRegister"/>
      </a-layout-header>
      <a-layout class="main" :style="mainBackgroundStyle">
        <LayoutsSidebarMenu :onClose="onClose" :open="open"/>
        <a-layout-sider class="sidebar" :class="{'small-sidebar':!screens.md}" v-if="screens.md">
          <LayoutsInformationSidebar/>
        </a-layout-sider>
        <a-layout style="padding: 0 0px 10px" class="main-detail" :class="{'small-main-detail':!screens.md}">
            <div class="info-main-detail p-3">
              <slot/>
            </div>
        </a-layout>
      </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
  import { Grid } from 'ant-design-vue';  
  import type { NotificationPlacement } from 'ant-design-vue';
  import { memberStore } from '~/store/index';
  
  const useBreakpoint = Grid.useBreakpoint;
  const open = ref<boolean>(false);
  let showModalLogin: (() => void);
  let showModalRegister: (() => void);

  const screens = useBreakpoint();
  const config = useRuntimeConfig()

  const { $socket } = useNuxtApp();
  const socket = $socket as WebSocket;
  const member = memberStore();
  const mainBackgroundStyle = ref({});

  const messageContent = ref('');

  const openNotification = (placement: NotificationPlacement, amount: string) => {
      notification.success({
        message: `เเจ้งเตือนรายการ ฝาก - ถอน`,
        description: `ฝากถอนสำเร็จ ยอดเงินปัจจุบันของคุณ คือ ${amount}`,
        placement,
      });
    };

    onMounted(() => {
      // ตรวจสอบการเชื่อมต่อ WebSocket และจัดการข้อความ
      if (socket) {
        socket.onmessage = (event: MessageEvent) => {
          try {
            // แปลงข้อความ JSON ที่ได้รับเป็น object
            const data = JSON.parse(event.data);
            
            // เก็บข้อมูลข้อความใน messageContent
            messageContent.value = data;
            
            console.log("ข้อความจากเซิร์ฟเวอร์:", data);
            console.log(data.status); // เข้าถึง status จาก object ที่แปลงแล้ว
            
            if (data.status === "success") {
              // เรียก openNotification และแปลง data.data เป็นสตริงหากจำเป็น
              openNotification('bottomRight', String(data.data));
              member.memberDetail.balance = data.data
            }
          } catch (error) {
            console.error("Error parsing WebSocket message:", error);
          }
        };
      } else {
        console.warn("ไม่สามารถเชื่อมต่อ WebSocket ได้");
      }
      
      if (member.settingDefault.bgImageSw == "true") {
        var url = config.public.apiServer +'/' + member.settingDefault.bgImage
        mainBackgroundStyle.value = { backgroundImage: `url(${url})` };
      } else {
        mainBackgroundStyle.value = { backgroundColor: member.settingDefault.bgColor || 'transparent' };
      }
    });

  // ปิดการเชื่อมต่อ WebSocket เมื่อ component ถูก unmount
  // onUnmounted(() => {
  //   if (socket && socket.readyState === WebSocket.OPEN) {
  //     socket.close();
  //     console.log("WebSocket connection closed.");
  //   }
  // });

  const showDrawer = () => {
    console.log("open");
    open.value = true;
  };


  const onClose = () => {
    console.log("close");
    open.value = false;
  };
</script>
<style scoped>
  #components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
  }
  .sidebar{
    flex: 0 0 0 !important;
    max-width: 350px !important;
    min-width: 360px !important;
    width: 400px !important;
    margin: 3rem 1rem 3rem 3rem;
  }

  .sidebar,.main-detail{
  background: none !important;
  }

  .main-detail{
  color: whitesmoke  !important;
  width: calc(100%-400px) !important;
  margin: 3rem 3rem 3rem 1rem;
  }
  
  
  .small-main-detail{
    width: 100% !important;
    /* margin: 5px !important; */
    /* width: calc(100% - 400px) !important; */
  }
  .small-header{
  padding: 0 0.5rem;
  }

  .ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
  }

  .site-layout-background {
  background: #fff;
  }

  .header{
  height: 100px !important;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 999;
  }
  .main{
  /* background: url(https://image.1million.social/image/imageList/1707499900431.jpg); */
  background-repeat: repeat;
  background-attachment: fixed;
  background-position: center;
  min-height: 100vh;
  }
  .info-main{
    background-color: rgba(0, 0, 0, 0.739);
    border-radius: 10px;
    padding: 1rem;
    color: whitesmoke;
  }
  .info-main-detail{
    background-color: rgba(0, 0, 0, 0.739) !important;
    border-radius: 10px;
    padding: 1rem;
    margin: 5px !important;
  }
  .ant-table-cell, .ant-table-cell-header {
  text-align: center !important;
  }
</style>