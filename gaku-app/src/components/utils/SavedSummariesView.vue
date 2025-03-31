<template>
    <div class="saved-summaries-container">
      <h2>Your Saved Summaries</h2>
      
      <div v-if="savedSummaries.length === 0" class="empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
          <polyline points="17 21 17 13 7 13 7 21"></polyline>
          <polyline points="7 3 7 8 15 8"></polyline>
        </svg>
        <p>You haven't saved any summaries yet.</p>
        <button class="primary-button" @click="goToHome">Summarize a Document</button>
      </div>
      
      <div v-else class="summaries-list">
        <div 
          v-for="summary in savedSummaries" 
          :key="summary.id"
          class="summary-card"
        >
          <div class="summary-header">
            <div class="file-info">
              <h3>{{ summary.fileName }}</h3>
              <div class="level-info">
                <span class="level-emoji">{{ summary.level.emoji }}</span>
                <span>{{ summary.level.name }}</span>
              </div>
            </div>
            <div class="summary-date">
              {{ formatDate(summary.date) }}
            </div>
          </div>
          
          <div class="summary-content">
            {{ truncateSummary(summary.summary) }}
          </div>
          
          <div class="summary-footer">
            <div class="rating-display">
              <span>Rating:</span>
              <div class="stars">
                <svg 
                  v-for="star in 5" 
                  :key="star"
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  :fill="star <= summary.rating ? 'currentColor' : 'none'"
                  stroke="currentColor"
                  stroke-width="1.5"
                  width="16" 
                  height="16"
                  class="star"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
              </div>
            </div>
            
            <div class="tags-display" v-if="summary.tags && summary.tags.length > 0">
              <span 
                v-for="tag in summary.tags" 
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
            
            <button class="view-button" @click="viewSummary(summary)">
              View Full Summary
            </button>
          </div>
        </div>
      </div>
      
      <div class="action-buttons">
        <button class="back-button" @click="goToHome">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useSummaryStore } from '../../stores/summaryStore';
  
  const router = useRouter();
  const summaryStore = useSummaryStore();
  
  const savedSummaries = computed(() => summaryStore.savedSummaries);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const truncateSummary = (text: string, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  const viewSummary = (summary: any) => {
    summaryStore.setCurrentSavedSummary(summary);
    router.push('/saved-summary');
  };
  
  const goToHome = () => {
    router.push('/');
  };
  </script>
  
  <style lang="scss" scoped>
  @use "sass:color";
  .saved-summaries-container {
    max-width: 800px;
    margin: 0 auto;
    
    h2 {
      font-size: 1.8rem;
      margin-bottom: 2rem;
    }
  }
  
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    background-color: var(--card-background);
    border-radius: var(--border-radius);
    text-align: center;
    
    svg {
      color: #9ca3af;
      margin-bottom: 1.5rem;
    }
    
    p {
      color: #6b7280;
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
    }
  }
  
  .summaries-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .summary-card {
    background-color: var(--card-background);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    box-shadow: var(--box-shadow);
    
    .summary-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 1rem;
      
      .file-info {
        h3 {
          margin-bottom: 0.5rem;
        }
        
        .level-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6b7280;
          font-size: 0.9rem;
          
          .level-emoji {
            font-size: 1.1rem;
          }
        }
      }
      
      .summary-date {
        color: #6b7280;
        font-size: 0.875rem;
      }
    }
    
    .summary-content {
      margin-bottom: 1.5rem;
      line-height: 1.6;
      color: #4b5563;
    }
    
    .summary-footer {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      
      .rating-display {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #6b7280;
        font-size: 0.875rem;
        
        .stars {
          display: flex;
          
          .star {
            color: #fbbf24;
          }
        }
      }
      
      .tags-display {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        
        .tag {
          background-color: #f3f4f6;
          color: #4b5563;
          border-radius: 9999px;
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
        }
      }
      
      .view-button {
        background-color: transparent;
        color: var(--primary-color);
        border: 1px solid var(--primary-color);
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        
        &:hover {
          background-color: rgba(79, 70, 229, 0.05);
        }
      }
    }
  }
  
  .action-buttons {
    margin-top: 2rem;
    
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
  }
  </style>