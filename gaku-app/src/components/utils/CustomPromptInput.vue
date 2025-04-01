<template>
  <div class="custom-prompt-container">
    <h3>Custom Prompt</h3>
    <textarea
      v-model="customPrompt"
      placeholder="Enter your custom prompt here..."
      rows="4"
      @input="emitCustomPrompt"
    ></textarea>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['update:customPrompt']);
const customPrompt = ref('');

const emitCustomPrompt = () => {
  emit('update:customPrompt', customPrompt.value);
};
</script>

<style scoped>
.custom-prompt-container {
  margin-top: 2rem;
}

textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
}
</style>