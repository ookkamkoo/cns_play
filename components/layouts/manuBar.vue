<template>
    <a-row class="button-container">
      <a-flex :justify="'center'" class="container-side">
        <a-col span="9">
          <a-row class="container-detail">
            <!-- Deposit -->
            <a-col class="action-col" span="12">
              <NuxtLink to="/information/deposit">
                <DollarCircleOutlined class="menu-icon" />
                <div class="menu-text">ฝาก</div>
              </NuxtLink>
            </a-col>
            <!-- Withdraw -->
            <a-col class="action-col" span="12">
              <NuxtLink to="/information/withdraw">
                <DollarCircleOutlined class="menu-icon" />
                <div class="menu-text">ถอน</div>
              </NuxtLink>
            </a-col>
          </a-row>
        </a-col>
        <!-- Image -->
        <a-col class="action-col action-col-image" span="6">
            <NuxtLink to="/">
                <div class="action-col-image-set">
                    <a-image
                    :width="'100%'"
                    :preview="false"
                    :src="config.public.apiServer + '/' + member.settingDefault.imageWebsite"
                    />
                </div>
            </NuxtLink>
        </a-col>
        <a-col span="9">
          <a-row class="container-detail">
            <!-- Promotion -->
            <a-col class="action-col" span="12">
              <NuxtLink to="/information/promotion">
                <CrownOutlined class="menu-icon" />
                <div class="menu-text">โปรโมชั่น</div>
              </NuxtLink>
            </a-col>
            <!-- Contact -->
            <a-col class="action-col" span="12">
              <a :href="`https://line.me/R/ti/p/${member.settingDefault.websiteLine}?oat_content=url`" target="_blank">
                <CommentOutlined class="menu-icon" />
                <div class="menu-text">ติดต่อเรา</div>
              </a>
            </a-col>
          </a-row>
        </a-col>
      </a-flex>
    </a-row>
  </template>
  
  <script lang="ts" setup>
  import { memberStore } from '~/store/index';
  const config = useRuntimeConfig();
  const member = memberStore();
  </script>
  
  <style scoped>
  .button-container {
    text-align: center;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 999; 
  }
  
  .container-side {
    width: 100%;
  }
  
  .container-detail {
    background: linear-gradient(to right, #4c1a9d, #7d30d4);
    border-radius: 15px 15px 0 0;
    padding: 5px;
    width: 100%;
  }
  
  .action-col:hover {
    transform: scale(1.1);
    /* box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); */
  }
  
  .action-col {
    cursor: pointer;
    padding: 10px;
  }
  
  .action-col img {
    position: absolute;
    width: 200px;
  }
  
  .action-col-image {
    padding: 0;
  }
  
  .action-col-image-set {
    position: absolute;
    width: 130px;
    transform: translate(-50%, -50%);
    top: 40%;
    left: 50%;
    z-index: 1000;
  }
  
  .menu-text {
    font-size: 10px;
    color: whitesmoke;
    white-space: nowrap;
  }
  
  .menu-icon {
    font-size: 24px;
    color: #fff;
    margin-bottom: 5px;
  }
  </style>
  