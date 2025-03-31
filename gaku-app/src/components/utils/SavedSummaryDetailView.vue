<template>
    <div class="saved-summary-detail-container">
      <div v-if="!currentSavedSummary" class="not-found">
        <p>Summary not found. Please select a summary from your saved list.</p>
        <button class="primary-button" @click="goToSavedSummaries">View Saved Summaries</button>
      </div>
      
      <template v-else>
        <div class="summary-header">
          <h2>{{ currentSavedSummary.fileName }}</h2>
          <div class="summary-meta">
            <div class="level-info">
              <span class="level-emoji">{{ currentSavedSummary.level.emoji }}</span>
              <span>{{ currentSavedSummary.level.name }}</span>
            </div>
            <div class="date-info">
              Saved on {{ formatDate(currentSavedSummary.date) }}
            </div>
          </div>
        </div>
        
        <div class="summary-content">
          {{ currentSavedSummary.summary }}
        </div>
        
        <div class="feedback-section">
          <h3>Your Feedback</h3>
          
          <div class="rating-display">
            <span>Rating:</span>
            <div class="stars">
              <svg 
                v-for="star in 5" 
                :key="star"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                :fill="star <= currentSavedSummary.rating ? 'currentColor' : 'none'"
                stroke="currentColor"
                stroke-width="1.5"
                width="20" 
                height="20"
                class="star"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </div>
          </div>
          
          <div class="tags-display" v-if="currentSavedSummary.tags && currentSavedSummary.tags.length > 0">
            <h4>What you liked:</h4>
            <div class="tags">
              <span 
                v-for="tag in currentSavedSummary.tags" 
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div class="additional-feedback" v-if="currentSavedSummary.feedback">
            <h4>Additional comments:</h4>
            <p>{{ currentSavedSummary.feedback }}</p>
          </div>
        </div>
        
        <div class="action-buttons">
          <button class="back-button" @click="goToSavedSummaries">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Saved Summaries
          </button>
          <button class="delete-button" @click="confirmDelete">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            Delete Summary
          </button>
        </div>
      </template>
      
      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="modal-overlay">
        <div class="modal">
          <h3>Delete Summary</h3>
          <p>Are you sure you want to delete this summary? This action cannot be undone.</p>
          <div class="modal-actions">
            <button class="cancel-button" @click="showDeleteModal = false">Cancel</button>
            <button class="confirm-delete-button" @click="deleteSummary">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useSummaryStore } from '../../stores/summaryStore';
  
  const router = useRouter();
  const summaryStore = useSummaryStore();
  
  const currentSavedSummary = computed(() => summaryStore.currentSavedSummary);
  const showDeleteModal = ref(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const goToSavedSummaries = () => {
    router.push('/saved-summaries');
  };
  
  const confirmDelete = () => {
    showDeleteModal.value = true;
  };
  
  const deleteSummary = () => {
    if (currentSavedSummary.value) {
      summaryStore.deleteSavedSummary(currentSavedSummary.value.id);
      showDeleteModal.value = false;
      router.push('/saved-summaries');
    }
  };
  </script>
  
  <style lang="scss" scoped>
  @use "sass:color";
  .saved-summary-detail-container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .not-found {
    text-align: center;
    padding: 3rem;
    background-color: var(--card-background);
    border-radius: var(--border-radius);
    
    p {
      margin-bottom: 1.5rem;
      color: #6b7280;
    }
  }
  
  .summary-header {
    margin-bottom: 2rem;
    
    h2 {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
    }
    
    .summary-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 1.5rem;
      color: #6b7280;
      
      .level-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
        .level-emoji {
          font-size: 1.2rem;
        }
      }
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
  
  .feedback-section {
    background-color: var(--card-background);
    border-radius: var(--border-radius);
    padding: 2rem;
    margin-bottom: 2rem;
    
    h3 {
      margin-bottom: 1.5rem;
      font-size: 1.3rem;
    }
    
    h4 {
      margin-bottom: 0.5rem;
      color: #4b5563;
    }
    
    .rating-display {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      
      .stars {
        display: flex;
        
        .star {
          color: #fbbf24;
        }
      }
    }
    
    .tags-display {
      margin-bottom: 1.5rem;
      
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        
        .tag {
          background-color: #f3f4f6;
          color: #4b5563;
          border-radius: 9999px;
          padding: 0.25rem 0.75rem;
          font-size: 0.875rem;
        }
      }
    }
    
    .additional-feedback {
      p {
        color: #4b5563;
        font-style: italic;
        background-color: #f9fafb;
        padding: 1rem;
        border-radius: var(--border-radius);
        border-left: 3px solid var(--primary-color);
      }
    }
  }
  
  .action-buttons {
    display: flex;
    justify-content: space-between;
    
    .back-button {
      background-color: transparent;
      color: var(--primary-color);
      border: 1px solid var(--primary-color);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      &:hover {
        background-color: rgba(79, 70, 229, 0.05);
      }
    }
    
    .delete-button {
      background-color: var(--error-color);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      &:hover {
        background-color: darken(#ef4444, 10%);
      }
    }
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  
  .modal {
    background-color: var(--card-background);
    border-radius: var(--border-radius);
    padding: 2rem;
    width: 90%;
    max-width: 500px;
    
    h3 {
      margin-bottom: 1rem;
      color: var(--error-color);
    }
    
    p {
      margin-bottom: 1.5rem;
    }
    
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      
      .cancel-button {
        background-color: transparent;
        color: #6b7280;
        border: 1px solid #d1d5db;
        
        &:hover {
          background-color: #f3f4f6;
        }
      }
      
      .confirm-delete-button {
        background-color: var(--error-color);
        
        &:hover {
          background-color: darken(#ef4444, 10%);
        }
      }
    }
  }
  
  .primary-button {
    background-color: var(--primary-color);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    border: none;
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
      background-color: darken(#4f46e5, 10%);
    }
  }
  </style>