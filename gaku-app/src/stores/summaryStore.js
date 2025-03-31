import { defineStore } from 'pinia';

export const useSummaryStore = defineStore('summary', {
  state: () => ({
    summary: '',
    level: null,
  }),
  actions: {
    setSummary(summary) {
      this.summary = summary;
    },
    setLevel(level) {
      this.level = level;
    },
    clearSummary() {
      this.summary = '';
      this.level = null;
    },
  },
});