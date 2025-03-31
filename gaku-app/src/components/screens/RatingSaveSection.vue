<template>
    <div class="rating-save-section">
      <div class="rating-container">
        <h3>How helpful was this summary?</h3>
        <div class="star-rating">
          <button 
            v-for="star in 5" 
            :key="star" 
            class="star-button"
            :class="{ 'active': star <= rating }"
            @click="setRating(star)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="feedback-section" v-if="rating > 0">
        <h3>What did you like about this summary?</h3>
        <div class="feedback-tags">
          <button 
            v-for="tag in feedbackTags" 
            :key="tag.id"
            class="tag-button"
            :class="{ 'selected': selectedTags.includes(tag.id) }"
            @click="toggleTag(tag.id)"
          >
            {{ tag.label }}
          </button>
        </div>
        
        <div class="additional-feedback">
          <label for="feedback-text">Additional comments (optional):</label>
          <textarea 
            id="feedback-text" 
            v-model="additionalFeedback" 
            rows="3" 
            placeholder="Tell us more about what you liked or how we can improve..."
          ></textarea>
        </div>
      </div>
      
      <div class="save-section">
        <button 
          class="save-button" 
          :disabled="isSaving || rating === 0"
          @click="saveSummary"
        >
          <span v-if="isSaving">
            <LoadingSpinner />
            Saving...
          </span>
          <span v-else>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Save Summary
          </span>
        </button>
      </div>
      
      <div v-if="savedSuccessfully" class="success-message">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>Summary saved successfully! You can access it in your saved summaries.</span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import LoadingSpinner from '../UI/LoadingSpinner.vue';
  import { useSummaryStore } from '../../stores/summaryStore';
  
  const summaryStore = useSummaryStore();
  
  const rating = ref(0);
  const selectedTags = ref<number[]>([]);
  const additionalFeedback = ref('');
  const isSaving = ref(false);
  const savedSuccessfully = ref(false);
  
  const feedbackTags = [
    { id: 1, label: 'Clear' },
    { id: 2, label: 'Concise' },
    { id: 3, label: 'Informative' },
    { id: 4, label: 'Well-structured' },
    { id: 5, label: 'Easy to understand' },
    { id: 6, label: 'Appropriate level' },
    { id: 7, label: 'Accurate' },
    { id: 8, label: 'Helpful' }
  ];
  
  const setRating = (value: number) => {
    rating.value = value;
  };
  
  const toggleTag = (tagId: number) => {
    if (selectedTags.value.includes(tagId)) {
      selectedTags.value = selectedTags.value.filter(id => id !== tagId);
    } else {
      selectedTags.value.push(tagId);
    }
  };
  
  const saveSummary = async () => {
    if (rating.value === 0) return;
    
    isSaving.value = true;
    
    try {
      // Get selected tag labels
      const tagLabels = selectedTags.value.map(tagId => {
        const tag = feedbackTags.find(t => t.id === tagId);
        return tag ? tag.label : '';
      }).filter(Boolean);
      
      // In a real app, this would call your backend API to save the summary
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating API call
      
      // Save to store
      summaryStore.saveSummaryWithFeedback({
        id: Date.now().toString(),
        summary: summaryStore.summary,
        level: summaryStore.level,
        fileName: summaryStore.fileName,
        date: new Date().toISOString(),
        rating: rating.value,
        tags: tagLabels,
        feedback: additionalFeedback.value
      });
      
      savedSuccessfully.value = true;
      
      // Reset form after successful save
      setTimeout(() => {
        savedSuccessfully.value = false;
      }, 5000);
    } catch (error) {
      console.error('Error saving summary:', error);
      alert('An error occurred while saving the summary. Please try again.');
    } finally {
      isSaving.value = false;
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .rating-save-section {
    background-color: var(--card-background);
    border-radius: var(--border-radius);
    padding: 2rem;
    margin-top: 2rem;
    
    h3 {
      margin-bottom: 1rem;
      font-size: 1.2rem;
    }
  }
  
  .star-rating {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    
    .star-button {
      background: none;
      border: none;
      color: #d1d5db;
      cursor: pointer;
      padding: 0;
      transition: color 0.2s;
      
      &:hover {
        color: #fbbf24;
      }
      
      &.active {
        color: #fbbf24;
      }
    }
  }
  
  .feedback-section {
    margin-bottom: 1.5rem;
  }
  
  .feedback-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    
    .tag-button {
      background-color: #f3f4f6;
      color: #4b5563;
      border: 1px solid #e5e7eb;
      border-radius: 9999px;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        background-color: #e5e7eb;
      }
      
      &.selected {
        background-color: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }
    }
  }
  
  .additional-feedback {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    label {
      font-size: 0.9rem;
      color: #4b5563;
    }
    
    textarea {
      border: 1px solid #e5e7eb;
      border-radius: var(--border-radius);
      padding: 0.75rem;
      font-family: inherit;
      resize: vertical;
      
      &:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2);
      }
    }
  }
  
  .save-section {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
    
    .save-button {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: var(--success-color);
      
      &:hover {
        background-color: darken(#10b981, 10%);
      }
    }
  }
  
  .success-message {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: 1.5rem;
    padding: 1rem;
    background-color: rgba(16, 185, 129, 0.1);
    border-radius: var(--border-radius);
    color: var(--success-color);
    
    svg {
      flex-shrink: 0;
    }
  }
  </style>