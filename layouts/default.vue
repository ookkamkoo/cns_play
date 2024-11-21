<template>
    <a-modal v-model:open="member.notify" :footer="null" :class="{'login-small':!screens.md}">
      <OtherNotify/>
    </a-modal>
    <a-modal v-model:open="openLogin" :footer="null" :class="{'login-small':!screens.md}">
      <FormLogin :closeModal="closeModalLogin"/>
    </a-modal>
    <a-modal v-model:open="openRegister" :footer="null" :class="{'login-small':!screens.md}">
      <FormRegister :closeModal="closeModalRegister"/>
    </a-modal>
    <a-layout>
      <a-layout-header class="header" :class="{'small-header':!screens.md}">
        <LayoutsHeader :showDrawer="showDrawer" :showModalLogin="showModalLogin" :showModalRegister="showModalRegister"/>
      </a-layout-header>
      <a-layout class="main" :style="mainBackgroundStyle">
        <LayoutsSidebarMenu :onClose="onClose" :open="open"/>

        <a-layout-sider class="sidebar" v-if="screens.md">
            <LayoutsSidebar/>
        </a-layout-sider>
        <a-layout class="main-detail">
            <LayoutsNew/>
            <a-row style="width: 100%;">
              <a-flex style="width: 100%;">
              <LayoutsSidebar v-if="!screens.md"/>
              <a-col span="24">
                <slot/>
              </a-col>
              </a-flex>
            </a-row>
            <LayoutsFooter/>
        </a-layout>
      </a-layout>
    </a-layout>
  </template>
  <script lang="ts" setup>
    import { Grid } from 'ant-design-vue';
    import type { NotificationPlacement } from 'ant-design-vue';
    import { memberStore } from '~/store/index';
    import { getSettingServices } from "~/services/settingServices";

    const openLogin = ref<boolean>(false);
    const openRegister = ref<boolean>(false);
    const useBreakpoint = Grid.useBreakpoint;
    const open = ref<boolean>(false);
    const screens = useBreakpoint();
    const mainBackgroundStyle = ref({});
    const config = useRuntimeConfig()

    const { $socket } = useNuxtApp();
    const socket = $socket as WebSocket;
    const member = memberStore();

    const messageContent = ref('');

    const openNotification = (placement: NotificationPlacement, amount: string) => {
      notification.success({
        message: `เเจ้งเตือนรายการ ฝาก - ถอน`,
        description: `ฝากถอนสำเร็จ ยอดเงินปัจจุบันของคุณ คือ ${amount}`,
        placement,
      });
    };
    

    onMounted(() => {
      getSetting();
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
    });


    const getSetting = async () => {
        const data = await getSettingServices();
        if (data.status === 'success') {
          member.settingDefault = data.data.setting;
          member.menuBar = data.data.menu;
          member.news = data.data.news;
          // member.menuBar = data.data.menu;
          // if(!member.login){
          //   member.setMemberNotify(true);
          // }
          console.log("bgImageSw:",member.settingDefault.bgImageSw);
          if (data.data.setting.bgImageSw == "true") {
            member.settingDefault.bgImageSw = "true"
            var url = config.public.apiServer +'/' + member.settingDefault.bgImage
            mainBackgroundStyle.value = { backgroundImage: `url(${url})` };
          } else {
            member.settingDefault.bgImageSw = "false"
            mainBackgroundStyle.value = { backgroundColor: member.settingDefault.bgColor || 'transparent' };
          }
        } else {
            console.error("Failed to fetch setting.");
        }
    };

    const showDrawer = () => {
      console.log("open");
      open.value = true;
    };
    
    const onClose = () => {
      console.log("close");
      open.value = false;
    };

    const showModalLogin = () => {
      console.log("sssssssssssssss");
      openLogin.value = true;
    };

    function closeModalLogin() {
        openLogin.value = false;
    }

    const showModalRegister = () => {
      openRegister.value = true;
    };

    function closeModalRegister() {
        openRegister.value = false;
    }

    const route = useRoute()
    if(route.query.register === 'true'){
      showModalRegister();
    }

    if(route.query.login === 'true'){
      showModalLogin();
    }
  </script>
  <style>
  #components-layout-demo-top-side-2 .logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
  }

  .sidebar,.main-detail{
    background: none !important;
  }

  .main-detail{
    color: whitesmoke  !important;
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
    background-repeat: repeat;
    background-attachment: fixed;
    background-position: center;
    width: 100%;
  }

  .ant-modal-content{
    background: linear-gradient(#4B0082FF, #663399FF);
    padding: 5px;
    border: 1px solid transparent;
    width: 500px; /* Could be more or less, depending on screen size */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transform-origin: top center;
    transition: transform 2s, opacity 2s;
    border-radius: 15px;
    margin: 0 5px;
    color: whitesmoke;
  }
  .login-size{
    width: 100% !important;
  }
  .login-small{
    margin: 0 auto;
    max-width:100vw !important;
  }
  
  </style>