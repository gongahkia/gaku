import { defineStore } from 'pinia';

export const useSummaryStore = defineStore('summary', {
  state: () => ({
    summary: '',
    level: null,
    fileName: '',
    savedSummaries: [],
    currentSavedSummary: null,
  }),
  actions: {
    setSummary(summary) {
      this.summary = summary;
    },
    setLevel(level) {
      this.level = level;
    },
    setFileName(fileName) {
      this.fileName = fileName;
    },
    clearSummary() {
      this.summary = '';
      this.level = null;
    },
    saveSummaryWithFeedback(summaryData) {
      this.savedSummaries.push(summaryData);
      // In a real app, you might want to save to localStorage or a backend
      localStorage.setItem('savedSummaries', JSON.stringify(this.savedSummaries));
    },
    setCurrentSavedSummary(summary) {
      this.currentSavedSummary = summary;
    },
    deleteSavedSummary(id) {
      this.savedSummaries = this.savedSummaries.filter(summary => summary.id !== id);
      localStorage.setItem('savedSummaries', JSON.stringify(this.savedSummaries));
      if (this.currentSavedSummary && this.currentSavedSummary.id === id) {
        this.currentSavedSummary = null;
      }
    },
    loadSavedSummaries() {
      const saved = localStorage.getItem('savedSummaries');
      if (saved) {
        this.savedSummaries = JSON.parse(saved);
      }
    }
  },
});
m