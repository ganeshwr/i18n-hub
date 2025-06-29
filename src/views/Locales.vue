<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '../stores/data'
import { formatDistanceToNow } from 'date-fns'
import { 
  PlusIcon,
  UserIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

const dataStore = useDataStore()

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'complete': return CheckCircleIcon
    case 'in-progress': return ClockIcon
    case 'needs-review': return ExclamationTriangleIcon
    default: return ClockIcon
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'complete': return 'text-green-600 dark:text-green-400'
    case 'in-progress': return 'text-blue-600 dark:text-blue-400'
    case 'needs-review': return 'text-yellow-600 dark:text-yellow-400'
    default: return 'text-gray-600 dark:text-gray-400'
  }
}

const getCoverageColor = (coverage: number) => {
  if (coverage >= 95) return 'bg-green-500'
  if (coverage >= 80) return 'bg-yellow-500'
  return 'bg-red-500'
}
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Locales</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          Manage translation locales and track completion progress
        </p>
      </div>
      <button class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
        <PlusIcon class="w-5 h-5" />
        <span>Add Locale</span>
      </button>
    </div>

    <!-- Overview Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <CheckCircleIcon class="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div class="ml-4">
            <div class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ dataStore.locales.filter(l => l.status === 'complete').length }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Complete</div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <ClockIcon class="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div class="ml-4">
            <div class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ dataStore.locales.filter(l => l.status === 'in-progress').length }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
              <ExclamationTriangleIcon class="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
          <div class="ml-4">
            <div class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ dataStore.locales.filter(l => l.status === 'needs-review').length }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Needs Review</div>
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
              <UserIcon class="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          <div class="ml-4">
            <div class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ new Set(dataStore.locales.filter(l => l.translator).map(l => l.translator)).size }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Translators</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Locales Table -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Language
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Coverage
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Progress
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Translator
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Last Update
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
            <tr v-for="locale in dataStore.locales" :key="locale.code" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-6 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs flex items-center justify-center font-mono uppercase text-gray-700 dark:text-gray-300">
                    {{ locale.code }}
                  </div>
                  <div>
                    <div class="font-medium text-gray-900 dark:text-white">{{ locale.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">{{ locale.nativeName }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <div class="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      class="h-2 rounded-full transition-all duration-300"
                      :class="getCoverageColor(locale.coverage)"
                      :style="{ width: `${locale.coverage}%` }"
                    ></div>
                  </div>
                  <div class="text-sm font-medium text-gray-900 dark:text-white">
                    {{ locale.coverage }}%
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ locale.totalTranslations.toLocaleString() }} / {{ (locale.totalTranslations + locale.missingTranslations).toLocaleString() }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {{ locale.missingTranslations }} missing
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center space-x-2">
                  <component :is="getStatusIcon(locale.status)" class="w-4 h-4" :class="getStatusColor(locale.status)" />
                  <span class="text-sm text-gray-900 dark:text-white capitalize">
                    {{ locale.status.replace('-', ' ') }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div v-if="locale.translator" class="flex items-center space-x-2">
                  <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <UserIcon class="w-4 h-4 text-white" />
                  </div>
                  <div class="text-sm text-gray-900 dark:text-white">{{ locale.translator }}</div>
                </div>
                <div v-else class="text-sm text-gray-500 dark:text-gray-400">Unassigned</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ formatDistanceToNow(locale.lastUpdate, { addSuffix: true }) }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>