<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '../stores/app'
import { useDataStore } from '../stores/data'
import {
  SunIcon,
  MoonIcon,
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon
} from '@heroicons/vue/24/outline'

const appStore = useAppStore()
const dataStore = useDataStore()

const currentProject = computed(() => {
  return dataStore.projects.find(p => p.id === appStore.currentProject)
})

const toggleTheme = () => {
  appStore.toggleDarkMode()
  localStorage.setItem('theme', appStore.isDarkMode ? 'dark' : 'light')
}
</script>

<template>
  <header class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Project Selector -->
      <div class="flex items-center space-x-4">
        <div class="relative">
          <select 
            v-model="appStore.currentProject"
            class="appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option v-for="project in dataStore.projects" :key="project.id" :value="project.id">
              {{ project.name }}
            </option>
          </select>
          <ChevronDownIcon class="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        </div>
        
        <div v-if="currentProject" class="text-sm text-gray-500 dark:text-gray-400">
          {{ currentProject.completedKeys }}/{{ currentProject.totalKeys }} keys completed
        </div>
      </div>

      <!-- Header Actions -->
      <div class="flex items-center space-x-4">
        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
        >
          <SunIcon v-if="appStore.isDarkMode" class="w-5 h-5" />
          <MoonIcon v-else class="w-5 h-5" />
        </button>

        <!-- Notifications -->
        <button class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative">
          <BellIcon class="w-5 h-5" />
          <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>

        <!-- User Menu -->
        <div class="flex items-center space-x-2">
          <UserCircleIcon class="w-8 h-8 text-gray-500 dark:text-gray-400" />
          <div class="text-sm">
            <div class="font-medium text-gray-900 dark:text-white">Alice Johnson</div>
            <div class="text-gray-500 dark:text-gray-400">Translation Manager</div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>