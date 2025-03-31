import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import SelectLevelPage from '../views/SelectLevelPage.vue';
import SummaryPage from '../views/SummaryPage.vue';
import SavedSummariesPage from '../views/SavedSummariesPage.vue';
import SavedSummaryDetailPage from '../views/SavedSummaryDetailPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/select-level',
    name: 'SelectLevel',
    component: SelectLevelPage,
  },
  {
    path: '/summary',
    name: 'Summary',
    component: SummaryPage,
  },
  {
    path: '/saved-summaries',
    name: 'SavedSummaries',
    component: SavedSummariesPage,
  },
  {
    path: '/saved-summary',
    name: 'SavedSummaryDetail',
    component: SavedSummaryDetailPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;