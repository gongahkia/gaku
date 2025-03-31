<template>
    <div class="document-preview">
      <h3>Document to Summarize</h3>
      <div class="file-details">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
        <div>
          <p class="file-name">{{ fileName }}</p>
          <p class="text-preview">{{ textPreview }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    fileName: string;
    textPreview: string;
  }>();
  </script>
  
  <style lang="scss" scoped>
  .document-preview {
    background-color: var(--card-background);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    margin-top: 2rem;
    
    h3 {
      margin-bottom: 1rem;
    }
    
    .file-details {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      
      svg {
        color: var(--primary-color);
        flex-shrink: 0;
      }
      
      .file-name {
        font-weight: 500;
        margin-bottom: 0.5rem;
      }
      
      .text-preview {
        font-size: 0.9rem;
        color: #6b7280;
      }
    }
  }
  </style>