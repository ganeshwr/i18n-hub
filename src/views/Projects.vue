<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '../stores/data'
import { 
  PlusIcon,
  FolderIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  UsersIcon,
  CalendarIcon
} from '@heroicons/vue/24/outline'
import { formatDistanceToNow } from 'date-fns'

const dataStore = useDataStore()

const getProjectIcon = (type: string) => {
  switch (type) {
    case 'mobile': return DevicePhoneMobileIcon
    case 'desktop': return ComputerDesktopIcon
    default: return FolderIcon
  }
}

const getFrameworkColor = (framework: string) => {
  switch (framework) {
    case 'react': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-300'
    case 'vue': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
    case 'angular': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
    case 'react-native': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
    case 'flutter': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
    case 'archived': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
    case 'draft': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
  }
}
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          Manage your internationalization projects and their settings
        </p>
      </div>
      <button class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
        <PlusIcon class="w-5 h-5" />
        <span>New Project</span>
      </button>
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="project in dataStore.projects" 
        :key="project.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 card-hover cursor-pointer"
      >
        <!-- Project Header -->
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <component :is="getProjectIcon(project.type)" class="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">{{ project.name }}</h3>
              <div class="flex items-center space-x-2 mt-1">
                <span class="px-2 py-1 text-xs rounded-full font-medium" :class="getFrameworkColor(project.framework)">
                  {{ project.framework }}
                </span>
                <span class="px-2 py-1 text-xs rounded-full font-medium" :class="getStatusColor(project.status)">
                  {{ project.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress -->
        <div class="mb-4">
          <div class="flex items-center justify-between text-sm mb-2">
            <span class="text-gray-600 dark:text-gray-400">Translation Progress</span>
            <span class="font-medium text-gray-900 dark:text-white">
              {{ Math.round((project.completedKeys / project.totalKeys) * 100) }}%
            </span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              class="h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-300"
              :style="{ width: `${(project.completedKeys / project.totalKeys) * 100}%` }"
            ></div>
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {{ project.completedKeys.toLocaleString() }} / {{ project.totalKeys.toLocaleString() }} keys
          </div>
        </div>

        <!-- Locales -->
        <div class="mb-4">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Supported Locales</div>
          <div class="flex flex-wrap gap-1">
            <div 
              v-for="locale in project.locales" 
              :key="locale"
              class="w-7 h-5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs flex items-center justify-center font-mono uppercase text-gray-700 dark:text-gray-300"
            >
              {{ locale }}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center space-x-1">
            <UsersIcon class="w-4 h-4" />
            <span>{{ project.team.length }} members</span>
          </div>
          <div class="flex items-center space-x-1">
            <CalendarIcon class="w-4 h-4" />
            <span>{{ formatDistanceToNow(project.lastUpdate, { addSuffix: true }) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State (if no projects) -->
    <div v-if="dataStore.projects.length === 0" class="text-center py-12">
      <FolderIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">No projects</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Get started by creating your first internationalization project.
      </p>
      <div class="mt-6">
        <button class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto transition-colors duration-200">
          <PlusIcon class="w-5 h-5" />
          <span>New Project</span>
        </button>
      </div>
    </div>
  </div>
</template>