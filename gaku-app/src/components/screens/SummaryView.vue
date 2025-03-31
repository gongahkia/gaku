<template>
    <div class="summary-container">
      <h2>Document Summary</h2>
      <div class="summary-level">
        <span class="level-emoji">{{ level.emoji }}</span>
        <span>{{ level.name }}</span>
      </div>
      <div class="summary-content">
        {{ summary }}
      </div>
      <RatingSaveSection />
      <div class="action-buttons">
        <button class="back-button" @click="goBack">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Level Selection
        </button>
        <button class="new-document-button" @click="newDocument">
          Summarize New Document
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useSummaryStore } from '../../stores/summaryStore';
import RatingSaveSection from './RatingSaveSection.vue';
  
  const router = useRouter();
  const summaryStore = useSummaryStore();
  
  const summary = computed(() => summaryStore.summary);
  const level = computed(() => summaryStore.level);
  
  const goBack = () => {
    router.push('/select-level');
  };
  
  const newDocument = () => {
    router.push('/');
  };
  </script>
  
  <style lang="scss" scoped>
  .summary-container {
    max-width: 800px;
    margin: 0 auto;
    
    h2 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }
    
    .summary-level {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      font-size: 1.2rem;
      
      .level-emoji {
        font-size: 1.5rem;
      }
    }
    
    .summary-content {
      background-color: var(--card-background);
      border-radius: var(--border-radius);
      padding: 2rem;
      margin-bottom: 2rem;
      white-space: pre-wrap;
      line-height: 1.6;
    }
    
    .action-buttons {
      display: flex;
      justify-content: space-between;
      
      .back-button, .new-document-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      
      .back-button {
        background-color: transparent;
        color: var(--primary-color);
        border: 1px solid var(--primary-color);
        
        &:hover {
          background-color: rgba(79, 70, 229, 0.05);
        }
      }
    }
  }
  </style>