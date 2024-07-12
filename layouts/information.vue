<template>
    <a-layout>
      <a-layout-header class="header" :class="{'small-header':!screens.md}">
        <LayoutsHeader :showDrawer="showDrawer"/>
      </a-layout-header>
      <a-layout class="main">
        <LayoutsSidebarMenu :onClose="onClose" :open="open"/>
        <a-layout-sider class="sidebar" v-if="screens.md">
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
      max-width: 400px !important;
      min-width: 400px !important;
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
      margin: 1rem 1rem;
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
    }
</style>