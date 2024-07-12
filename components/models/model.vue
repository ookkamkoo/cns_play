<template>
  <transition name="modal-fade-scale">
    <div v-if="false" class="modal" @click="closeModal">
      <div class="modal-content" @click.stop :style="computedModalStyle">
        <div class="modal-header">
          <span class="close" @click="closeModal">&times;</span>
        </div>
        <div class="modal-body">
          <slot></slot> <!-- Render FormLogin or any other content passed as slot -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, computed, watch } from 'vue';

const props = defineProps<{
  openModels: boolean,
  closeModal: () => void,
  size?: 'small' | 'medium' | 'large' | string | null,
}>();

const modalSizes = {
  small: { width: '50%', height: 'auto' },
  medium: { width: '70%', height: 'auto' },
  large: { width: '90%', height: 'auto' },
};

const computedModalStyle = computed(() => {
  if (props.size && !isNaN(parseInt(props.size))) {
    return { width: `${props.size}px` };
  }
  return modalSizes[props.size as 'small' | 'medium' | 'large'] || modalSizes.medium;
});

// Watch the openModels prop to toggle body scroll
watch(() => props.openModels, (newVal) => {
  if (newVal) {
    document.body.classList.add('no-scroll');
  } else {
    document.body.classList.remove('no-scroll');
  }
});
</script>

<style>
/* Modal container */
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.511); /* Black background with opacity */
}

/* Modal content */
.modal-content {
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

.modal-header {
  padding: 5px 16px;
  color: white;
}

/* Modal body */
.modal-body {
  padding: 10px 16px;
}

/* Close button */
.close {
  color: #5e5e5e;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: rgb(195, 195, 195);
  text-decoration: none;
  cursor: pointer;
}

/* Modal fade and scale animation */
.modal-fade-scale-enter-active {
  transition: transform 1s, opacity 1s;
}

.modal-fade-scale-enter,
.modal-fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* No-scroll class */
.no-scroll, body{
  overflow: hidden !important;
}
</style>
