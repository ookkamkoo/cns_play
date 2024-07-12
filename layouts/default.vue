<template>
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
      <a-layout class="main">
        <LayoutsSidebarMenu :onClose="onClose" :open="open"/>
        <a-layout-sider class="sidebar" v-if="screens.md">
            <LayoutsSidebar/>
        </a-layout-sider>
        <a-layout style="padding: 0 0px 10px" class="main-detail">
            <LayoutsNew/>
            <slot/>
            <LayoutsFooter/>
        </a-layout>
      </a-layout>
    </a-layout>
  </template>
  <script lang="ts" setup>
    import { Grid } from 'ant-design-vue';
    const openLogin = ref<boolean>(false);
    const openRegister = ref<boolean>(false);
    const useBreakpoint = Grid.useBreakpoint;
    const open = ref<boolean>(false);
    

    const screens = useBreakpoint();

    const showDrawer = () => {
      console.log("open");
      open.value = true;
    };
    
    const onClose = () => {
      console.log("close");
      open.value = false;
    };

    const showModalLogin = () => {
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
    background: url(https://image.1million.social/image/imageList/1707499900431.jpg);
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