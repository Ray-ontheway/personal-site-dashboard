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
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: rgb(85 86 87 / 30%);
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #3498db; /* Blue */
  border-radius: 50%;
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
