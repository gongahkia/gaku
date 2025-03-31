<template>
    <div 
      class="level-card"
      :class="{ 'selected': isSelected }"
      @click="$emit('select')"
    >
      <div class="level-icon">{{ level.emoji }}</div>
      <h3>{{ level.name }}</h3>
      <p>{{ level.description }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    level: {
      id: number;
      name: string;
      emoji: string;
      description: string;
    };
    isSelected: boolean;
  }>();
  
  defineEmits<{
    (e: 'select'): void;
  }>();
  </script>
  
  <style lang="scss" scoped>
  .level-card {
    background-color: var(--card-background);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--box-shadow);
    }
    
    &.selected {
      border-color: var(--primary-color);
      background-color: rgba(79, 70, 229, 0.05);
    }
    
    .level-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    
    h3 {
      margin-bottom: 0.5rem;
    }
    
    p {
      font-size: 0.9rem;
      color: #6b7280;
    }
  }
  </style>