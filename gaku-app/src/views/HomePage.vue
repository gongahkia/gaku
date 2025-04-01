<template>
    <div class="home-page">
      <h1>Welcome to Gaku</h1>
      <p>Upload your document and have it explained in 5 complexity levels and 5 different ways.</p>
      <FileUpload />
    </div>
  </template>
  
  <script setup lang="ts">
  import FileUpload from '../components/utils/FileUpload.vue';
  </script>
  
  <style lang="scss" scoped>
  .home-page {
    text-align: center;
    
    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    
    p {
      font-size: 1.1rem;
      color: #6b7280;
      margin-bottom: 2rem;
    }
  }
  </style>