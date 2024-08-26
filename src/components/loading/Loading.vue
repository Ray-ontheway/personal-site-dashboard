<template>
  <div v-if="visible" class="loading-container">
    <div class="loading-spinner"></div>
    <span class="loading-text">Loading...</span>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'

interface Props {
  visible: boolean
}

const props = withDefaults(defineProps<Props>(), {
  visible: true,
})

const { visible } = toRefs(props)
</script>

<style scoped>
.loading-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 10px;
  background-color: rgba(85, 86, 87, 0.3);
}

.loading-spinner {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: 16px;
  color: #555;
}
</style>
