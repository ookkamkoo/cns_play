
  <template>
    <a-modal v-model:open="member.notify" :footer="null" :class="{'login-small':!screens.md}">
      <OtherNotify/>
    </a-modal>
    <a-modal v-model:open="member.showLogin" :footer="null" :class="{'login-small':!screens.md}">
      <FormLogin :closeModal="closeModalLogin"/>
    </a-modal>
    <a-modal v-model:open="openRegister" :footer="null" :class="{'login-small':!screens.md}">
      <FormRegister :closeModal="closeModalRegister"/>
    </a-modal>
    <a-layout class="page-layout">
      <!-- Header -->
      <a-layout-header class="header" :class="{'small-header': !screens.md}">
        <LayoutsHeader :showDrawer="showDrawer" :showModalLogin="showModalLogin" :showModalRegister="showModalRegister" />
      </a-layout-header>
  
      <!-- Main Content -->
      <a-layout class="main" :style="mainBackgroundStyle">
        <LayoutsSidebarMenu :onClose="onClose" :open="open" />
  
        <!-- Sidebar -->
        <a-layout-sider class="sidebar" v-if="screens.md">
          <LayoutsSidebar />
        </a-layout-sider>
  
        <!-- Main Details -->
        <a-layout class="main-detail">
          <LayoutsNew />
          <a-row style="width: 100%;" :style="{ minHeight: 'calc(100vh - 380px)' }">
            <a-flex style="width: 100%;">
              <LayoutsSidebar v-if="!screens.md" :class="{ 'disabled-sidebar': $route.path === '/' }" />
              <slot />
            </a-flex>
          </a-row>
                <!-- Footer -->
        <a-layout-footer class="footer" >
          <LayoutsFooter />
        </a-layout-footer>
        </a-layout>
      </a-layout>
        <LayoutsManuBar v-if="!screens.md"/>
    </a-layout>
  </template>
  
  <script lang="ts" setup>
  import { Grid } from 'ant-design-vue';
  import { ref, onMounted } from 'vue';
  import { memberStore } from '~/store/index';
  import { getSettingServices } from '~/services/settingServices';
  
  const useBreakpoint = Grid.useBreakpoint;
  const screens = useBreakpoint();
  const mainBackgroundStyle = ref({});
  const open = ref<boolean>(false);
  const openRegister = ref<boolean>(false);
  const member = memberStore();
  const config = useRuntimeConfig();
  
  const showDrawer = () => {
    open.value = true;
  };
  
  const onClose = () => {
    open.value = false;
  };
  
  const showModalLogin = () => {
    member.setShowLogin(true);
  };
  
  const closeModalLogin = () => {
    member.setShowLogin(false);
  };
  
  const showModalRegister = () => {
    openRegister.value = true;
  };
  
  const closeModalRegister = () => {
    openRegister.value = false;
  };
  
  const getSetting = async () => {
    const data = await getSettingServices();
    if (data.status === 'success') {
      member.settingDefault = data.data.setting;
      member.menuBar = data.data.menu;
      member.news = data.data.news;
  
      if (data.data.setting.bgImageSw === 'true') {
        const url = `${config.public.apiServer}/${member.settingDefault.bgImage}`;
        mainBackgroundStyle.value = { backgroundImage: `url(${url})` };
        console.log(mainBackgroundStyle.value);
      } else {
        mainBackgroundStyle.value = { backgroundColor: member.settingDefault.bgColor || 'transparent' };
        console.log(mainBackgroundStyle.value);
      }
    } else {
      console.error('Failed to fetch settings.');
    }
  };
  
  onMounted(() => {
    getSetting();
  });
  </script>
  
  <style scoped>
  .page-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* ครอบคลุมทั้งหน้าจอ */
  }
  
  .main {
    flex: 1; /* ใช้พื้นที่ว่างที่เหลือทั้งหมด */
    display: flex;
  }
  
  .footer {
    flex-shrink: 0;
    background-color: #f5f5f5;
    padding: 0 !important;
    text-align: center;
    color: whitesmoke;
  }
  
  .header {
    height: 100px !important;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 999;
  }
  
  .main-detail {
    color: whitesmoke !important;
  }
  
  .sidebar,
  .main-detail {
    background: none !important;
  }
  
  .disabled-sidebar {
    display: none;
  }

  </style>

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

.models-dark .ant-modal-content{
    background: #303030f2 !important;
}

.login-size{
  width: 100% !important;
}
.login-small{
  margin: 0 auto;
  max-width:100vw !important;
}
.disabled-sidebar{
  display: none;
}

</style>
  