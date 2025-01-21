<template>
  <div>
    <!-- Overlay Loader -->
    <transition name="fade" @after-leave="onOverlayHidden">
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
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isOverlayVisible = ref(true); // ควบคุมการแสดง Overlay

const hideOverlay = () => {
  isOverlayVisible.value = false; // ซ่อน overlay
};

const onOverlayHidden = () => {
  console.log('Overlay hidden'); // Callback เมื่อ overlay ถูกซ่อน
};

onMounted(() => {
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
body {
  margin: 0;
  padding: 0;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
