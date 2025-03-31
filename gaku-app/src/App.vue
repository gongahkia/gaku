<template>
  <div class="app-container">
    <AppHeader />
    <main>
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from './components/UI/AppHeader.vue';
import AppFooter from './components/UI/AppFooter.vue';
</script>

<style lang="scss">
:root {
  --primary-color: #4f46e5;
  --secondary-color: #818cf8;
  --accent-color: #c7d2fe;
  --text-color: #1f2937;
  --background-color: #f9fafb;
  --card-background: #ffffff;
  --success-color: #10b981;
  --error-color: #ef4444;
  --border-radius: 8px;
  --box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  line-height: 1.6;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

button {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: darken(#4f46e5, 10%);
  }
  
  &:disabled {
    background-color: #a5a5a5;
    cursor: not-allowed;
  }
}
</style>