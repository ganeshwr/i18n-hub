<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'
import {
  HomeIcon,
  KeyIcon,
  FolderIcon,
  GlobeAltIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Translation Keys', href: '/translation-keys', icon: KeyIcon },
  { name: 'Projects', href: '/projects', icon: FolderIcon },
  { name: 'Locales', href: '/locales', icon: GlobeAltIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Workflow', href: '/workflow', icon: ClipboardDocumentListIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon }
]

const isActive = (href: string) => {
  return route.path === href
}
</script>

<template>
  <div 
    class="flex flex-col transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
    :class="appStore.sidebarOpen ? 'w-64' : 'w-16'"
  >
    <!-- Logo -->
    <div class="flex items-center justify-center h-16 px-4 border-b border-gray-200 dark:border-gray-700">
      <div v-if="appStore.sidebarOpen" class="flex items-center space-x-2">
        <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
          <GlobeAltIcon class="w-5 h-5 text-white" />
        </div>
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">i18nHub</h1>
      </div>
      <div v-else class="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
        <GlobeAltIcon class="w-5 h-5 text-white" />
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-2 py-4 space-y-1">
      <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        class="group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-200"
        :class="[
          isActive(item.href)
            ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
        ]"
      >
        <component :is="item.icon" class="flex-shrink-0 w-5 h-5 mr-3" />
        <span v-if="appStore.sidebarOpen">{{ item.name }}</span>
      </router-link>
    </nav>

    <!-- Collapse Button -->
    <div class="p-2 border-t border-gray-200 dark:border-gray-700">
      <button
        @click="appStore.toggleSidebar"
        class="w-full flex items-center justify-center px-2 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
      >
        <ChevronLeftIcon v-if="appStore.sidebarOpen" class="w-5 h-5" />
        <ChevronRightIcon v-else class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>