import { defineStore } from 'pinia';

export const useDocumentStore = defineStore('document', {
  state: () => ({
    fileName: '',
    documentText: '',
  }),
  actions: {
    setFileName(name) {
      this.fileName = name;
    },
    setDocumentText(text) {
      this.documentText = text;
    },
    clearDocument() {
      this.fileName = '';
      this.documentText = '';
    },
  },
});
