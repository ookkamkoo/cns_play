<template>
    <a-drawer
      :placement="placement"
      :closable="false"
      :open="props.open"
      width="280"
      @close="props.onClose"
      class="sidebar-menu"
    >
        <template #title>
            <a-flex  :justify="'space-between'" :align="'center'">
                <a-image
                    :width="50"
                    :preview="false"
                    :src="config.public.apiServer + '/' +member.settingDefault.imageWebsite"
                />
                <CloseCircleOutlined  class="sidebar-menu-close" @click="props.onClose"/>
            </a-flex>
        </template>
        <div class="sidebar-profile">
            <a-flex class="sidebar-profile-detail" :align="'center'">
                <a-col :span="6">
                  <a-image
                      :width="50"
                      :preview="false"
                      class="sidbar-menu-icon"
                      :src="config.public.apiServer + '/' +member.settingDefault.imageWebsite"
                  />
                </a-col>
                <a-col :span="18">
                  <div class="name font-12">
                    {{member.memberDetail.firstname}} {{member.memberDetail.lastname}} 
                  </div>
                  <div class="username">
                    {{member.memberDetail.bank_no}}
                  </div>
                  <div class="verify">
                    <a-flex class="verify-detail">
                        <a-cal :span="6" class="verify-icon">
                          <check-circle-outlined />
                        </a-cal>
                        <a-cal :span="7" class="font-12">
                            <span v-if="member.memberDetail.bank_no != ''">ยืนยันบัญชีเเล้ว</span>
                            <span v-else="member.memberDetail.bank_no != ''">ยังไม่ได้ยืนยันบัญชี</span>
                        </a-cal>
                    </a-flex>
                  </div>
                </a-col>
            </a-flex>
        </div>
        <div class="sidebar-menu-list">
          <a-flex v-for="item in menuList">
            <NuxtLink  class="link-sidebar" @click="LogoutSystem()"  v-if="item.name == 'ออกจากระบบ'">
              <a-flex :align="'center'" class="sidebar-menu-list-detail" >
                <a-col :span="6" class="sidebar-menu-list-icon">
                  <component :is="item.icon" />
                </a-col>
                <a-col :span="18">
                  {{item.name}}
                </a-col>
              </a-flex>
            </NuxtLink>
            <a :href="`https://line.me/R/ti/p/${member.settingDefault.websiteLine}?oat_content=url`" target="_blank" class="link-sidebar"  v-else-if="item.name == 'ติดต่อเรา'">
              <a-flex :align="'center'" class="sidebar-menu-list-detail" >
                <a-col :span="6" class="sidebar-menu-list-icon">
                  <component :is="item.icon" />
                </a-col>
                <a-col :span="18">
                  {{item.name}}
                </a-col>
              </a-flex>
            </a>
            <NuxtLink to="" exact class="link-sidebar" v-else-if="item.name == 'ประกาศ'" @click="handleNotifyClick">
              <a-flex :align="'center'" class="sidebar-menu-list-detail" :class="{ 'sidebar-menu-list-detail-active': item.path === $route.path }">
                <a-col :span="6" class="sidebar-menu-list-icon">
                  <component :is="item.icon" />
                </a-col>
                <a-col :span="18">
                  {{item.name}}
                </a-col>
              </a-flex>
            </NuxtLink>
            <NuxtLink :to="item.path" exact class="link-sidebar" v-else>
              <a-flex :align="'center'" class="sidebar-menu-list-detail" :class="{ 'sidebar-menu-list-detail-active': item.path === $route.path }">
                <a-col :span="6" class="sidebar-menu-list-icon">
                  <component :is="item.icon" />
                </a-col>
                <a-col :span="18">
                  {{item.name}}
                </a-col>
              </a-flex>
            </NuxtLink>
          </a-flex>
        </div>
    </a-drawer>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue';
  import type { DrawerProps } from 'ant-design-vue';
  import { menuList } from '~/data/data';
  import { logout } from '~/auth/authToken';
  const placement = ref<DrawerProps['placement']>('left');
  import { memberStore } from '~/store/index';

  const member = memberStore();
  const config = useRuntimeConfig()
  // const open = ref<boolean>(false);
  

  const handleNotifyClick = () => {
      member.setMemberNotify(true);
  };

  const props = defineProps<{
    onClose: () => void,
    open: boolean
  }>();

    const LogoutSystem = () =>{
      logout();
      props.onClose();
    }
  </script>
  <style>
  .sidebar-menu-close{
    font-size: 1.5rem;
    color: rgb(114, 114, 114);
  }
  .sidebar-menu{
    background: linear-gradient(#2C002CFF, #100F4EFF) !important;
    color: whitesmoke;
  }
  .sidbar-menu-icon{
    background-color: whitesmoke;
    text-align: center;
    border-radius: 10px;
  }
  .sidebar-profile{
    background: linear-gradient(to bottom, #44444468 0%, #22222264 100%);
    overflow: hidden;
    position: relative;
    padding: 1rem 1rem;
  }
  .sidebar-menu .ant-drawer-body{
    padding: 0;
  }
  .verify-icon{
    margin-right: 5px;
  }
  .verify{
    color: #46ad4d;
  }
  .verify-detail{
    width: 110px;
    border: 1px solid #46ad4d;
    border-radius: 10px;
    padding: 1px 3px;
    justify-content: center;
    align-items: center;
  }
  .sidebar-profile .name{
    color: #FF9100FF;
    margin: 2px 0;
  }
  .sidebar-profile .username{
    color: whitesmoke;
    margin: 2px 0;
  }
  .sidebar-menu-list-icon{
    font-size: 24px;
    text-align: center;
  }
  .sidebar-menu-list-detail{
    cursor: pointer;
    margin: 0.2rem 0.5rem;
    padding: 0.3rem 0;
  }
  .sidebar-menu-list-detail-active{
    color: #FF9100FF;
  }
  .sidebar-menu-list-detail:hover{
    background-color: #adadad60;
    border-radius: 10px;
  }
  .sidebar-menu-close{
    cursor: pointer;
  }
  .link-sidebar{
    color: whitesmoke !important;
  }
  </style>