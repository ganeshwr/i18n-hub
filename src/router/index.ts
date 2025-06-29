import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import TranslationKeys from '../views/TranslationKeys.vue'
import Projects from '../views/Projects.vue'
import Locales from '../views/Locales.vue'
import Analytics from '../views/Analytics.vue'
import Workflow from '../views/Workflow.vue'
import Settings from '../views/Settings.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/translation-keys',
      name: 'TranslationKeys',
      component: TranslationKeys
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects
    },
    {
      path: '/locales',
      name: 'Locales',
      component: Locales
    },
    {
      path: '/analytics',
      name: 'Analytics',
      component: Analytics
    },
    {
      path: '/workflow',
      name: 'Workflow',
      component: Workflow
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    }
  ]
})

export default router