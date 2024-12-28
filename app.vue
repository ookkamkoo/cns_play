<template>
  <div :class="['overlay-layout', { hidden: !isOverlayVisible }]">
    <a-spin size="large">
      <template #indicator>
        <div class="custom-spinner" style="font-size: 24px;"></div>
        <span>Loading...</span>
      </template>
    </a-spin>
  </div>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const isOverlayVisible = ref(true); // ควบคุมสถานะการแสดงผลของ overlay

const hideOverlay = () => {
  isOverlayVisible.value = false; // ซ่อน overlay
};

onMounted(() => {
  const hideLoader = () => {
    setTimeout(() => {
      hideOverlay()
    }, 200); // Delay of 200ms after load
  };

  if (document.readyState === 'complete') {
    // If the document is already fully loaded
    hideLoader();
  } else {
    // If the document is not yet fully loaded, listen for the load event
    window.addEventListener('load', hideLoader);
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
  position: fixed; /* ใช้ fixed เพื่อให้ overlay อยู่ด้านบนเสมอ */
  top: 0;
  left: 0;
  z-index: 9999;
  background: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1; /* เริ่มต้นเป็น 100% */
  transition: opacity 0.5s ease-in-out; /* เพิ่มเอฟเฟกต์ fade out */
}

.overlay-layout.hidden {
  opacity: 0; /* ซ่อนด้วยการลด opacity */
  pointer-events: none; /* ป้องกันการคลิก */
}

.overlay-layout.hidden {
  opacity: 0; /* ซ่อนด้วยการลด opacity */
  pointer-events: none; /* ป้องกันการคลิก */
}

</style>