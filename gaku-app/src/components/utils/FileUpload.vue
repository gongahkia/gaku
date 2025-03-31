<template>
    <div class="upload-container">
      <div 
        class="upload-area" 
        :class="{ 'drag-over': isDragging }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleFileDrop"
      >
        <div class="upload-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </div>
        <h2>Upload Your Document</h2>
        <p>Drag and drop your PDF or image here</p>
        <p class="supported-formats">Supported formats: PDF, JPG, PNG</p>
        <div class="or-divider">
          <span>OR</span>
        </div>
        <input 
          type="file" 
          ref="fileInput" 
          @change="handleFileSelect" 
          accept=".pdf,.jpg,.jpeg,.png" 
          class="file-input"
        >
        <button class="browse-button" @click="triggerFileInput">Browse Files</button>
      </div>
      
      <FileInfo 
        v-if="selectedFile" 
        :file="selectedFile" 
        @remove="removeFile" 
      />
      
      <button 
        v-if="selectedFile" 
        class="process-button" 
        :disabled="isProcessing" 
        @click="processFile"
      >
        <span v-if="isProcessing">
          <LoadingSpinner />
          Processing...
        </span>
        <span v-else>Process Document</span>
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useDocumentStore } from '../../stores/documentStore';
  import LoadingSpinner from '../UI/LoadingSpinner.vue';
  import FileInfo from './FileInfo.vue';
  
  const router = useRouter();
  const documentStore = useDocumentStore();
  
  const fileInput = ref<HTMLInputElement | null>(null);
  const selectedFile = ref<File | null>(null);
  const isDragging = ref(false);
  const isProcessing = ref(false);
  
  const triggerFileInput = () => {
    fileInput.value?.click();
  };
  
  const handleFileSelect = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      selectedFile.value = input.files[0];
    }
  };
  
  const handleFileDrop = (event: DragEvent) => {
    isDragging.value = false;
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      const validTypes = [
        'application/pdf', 
        'image/jpeg', 
        'image/jpg', 
        'image/png'
      ];
      
      if (validTypes.includes(file.type)) {
        selectedFile.value = file;
      } else {
        alert('Please upload a PDF or image file.');
      }
    }
  };
  
  const removeFile = () => {
    selectedFile.value = null;
    if (fileInput.value) fileInput.value.value = '';
  };
  
  const processFile = async () => {
    if (!selectedFile.value) return;
    
    isProcessing.value = true;
    
    try {

      // In a real application, this would call your OCR service
      // For this example, we'll simulate processing with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // FUA to implement the actual OCR here
      // Simulate extracted text (in a real app, this would come from your OCR service)
      const extractedText = `This is simulated extracted text from the document ${selectedFile.value.name}. 
      In a real application, this would be the actual text content extracted from your PDF or image using OCR technology.`;
      
      documentStore.setDocumentText(extractedText);
      documentStore.setFileName(selectedFile.value.name);
      router.push('/select-level');
    } catch (error) {
      console.error('Error processing file:', error);
      alert('An error occurred while processing your file. Please try again.');
    } finally {
      isProcessing.value = false;
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .upload-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .upload-area {
    border: 2px dashed #d1d5db;
    border-radius: var(--border-radius);
    padding: 2.5rem;
    text-align: center;
    background-color: var(--card-background);
    transition: all 0.3s ease;
    
    &.drag-over {
      border-color: var(--primary-color);
      background-color: rgba(79, 70, 229, 0.05);
    }
    
    .upload-icon {
      color: var(--primary-color);
      margin-bottom: 1rem;
    }
    
    h2 {
      margin-bottom: 0.5rem;
      font-size: 1.5rem;
    }
    
    p {
      color: #6b7280;
      margin-bottom: 0.5rem;
    }
    
    .supported-formats {
      font-size: 0.875rem;
      color: #9ca3af;
    }
  }
  
  .or-divider {
    display: flex;
    align-items: center;
    margin: 1.5rem 0;
    
    &::before, &::after {
      content: "";
      flex: 1;
      border-bottom: 1px solid #e5e7eb;
    }
    
    span {
      padding: 0 1rem;
      color: #9ca3af;
      font-size: 0.875rem;
    }
  }
  
  .file-input {
    display: none;
  }
  
  .browse-button {
    background-color: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    
    &:hover {
      background-color: rgba(79, 70, 229, 0.05);
    }
  }
  
  .process-button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem;
    font-size: 1.1rem;
  }
  </style>