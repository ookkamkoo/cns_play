<template>
  <div v-if="member.settingDefault.serverStatus == 'true'">
    <!-- Overlay Loader -->
    <transition name="overlay" @after-leave="onOverlayHidden">
      <div v-if="isOverlayVisible" class="overlay-layout">
        <a-spin size="large">
          <template #indicator>
            <div class="custom-spinner" style="font-size: 24px;"></div>
            <span>Loading...</span>
          </template>
        </a-spin>
      </div>
    </transition>

    <!-- Main Content -->
    <NuxtLayout>
      <transition
        name="page"
        mode="out-in"
        appear
        @before-enter="() => console.log('Page Before Enter')"
        @enter="() => console.log('Page Entering')"
        @after-enter="() => console.log('Page After Enter')"
        @before-leave="() => console.log('Page Before Leave')"
        @leave="() => console.log('Page Leaving')"
        @after-leave="() => console.log('Page After Leave')"
      >
        <div :key="$route.fullPath" style="width: 100%;">
          <NuxtPage />
        </div>
      </transition>
  </NuxtLayout>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { memberStore } from '~/store/index';
// import { getSettingServices } from '~/services/settingServices';

const member = memberStore();

const currentPage = ref(1);

const togglePage = () => {
  currentPage.value = currentPage.value === 1 ? 2 : 1;
  console.log("sssssss");
  
};

const isOverlayVisible = ref(true); // ควบคุมการแสดง Overlay

const hideOverlay = () => {
  isOverlayVisible.value = false; // ซ่อน overlay
};

const onOverlayHidden = () => {
  console.log('Overlay hidden'); // Callback เมื่อ overlay ถูกซ่อน
};

onMounted(() => {
  // getSetting();
  const hideLoader = () => {
    setTimeout(hideOverlay, 200); // เพิ่ม delay 200ms
  };

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.onload = hideLoader; // ใช้ window.onload แทน addEventListener
  }
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;600&display=swap');
body {
  margin: 0;
  padding: 0;
  font-family: 'Prompt', sans-serif !important;
}

* {
  font-family: 'Prompt', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1 {
  font-family: 'Prompt', sans-serif !important;
  font-weight: 600;
}

p {
  font-family: 'Prompt', sans-serif !important;
  font-weight: 400;
}

body::-webkit-scrollbar {
  display: none;
}

.overlay-layout {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.overlay-enter-from {
  opacity: 0;
}

.overlay-leave-to {
  opacity: 0;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px); 
}

.page-leave-to {
  opacity: 0;
  /* transform: translateY(20px); */
}
</style>
