import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import SelectLevelPage from '../views/SelectLevelPage.vue';
import SummaryPage from '../views/SummaryPage.vue';

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;