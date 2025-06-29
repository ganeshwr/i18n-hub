<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDataStore } from '../stores/data'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/vue/24/outline'

const dataStore = useDataStore()
const searchTerm = ref('')
const filterStatus = ref('all')
const filterPriority = ref('all')

const filteredKeys = computed(() => {
  let keys = dataStore.translationKeys

  if (searchTerm.value) {
    keys = keys.filter(key => 
      key.key.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      key.namespace.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  if (filterStatus.value !== 'all') {
    keys = keys.filter(key => key.status === filterStatus.value)
  }

  if (filterPriority.value !== 'all') {
    keys = keys.filter(key => key.priority === filterPriority.value)
  }

  return keys
})

const getStatusColor = (status: string) => {
  switch (status) {
    case 'complete': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
    case 'partial': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
    case 'missing': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
    case 'needs-review': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
    case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
    case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
    case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
  }
}
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Translation Keys</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          Manage and track translation keys across your projects
        </p>
      </div>
      <button class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
        <PlusIcon class="w-5 h-5" />
        <span>Add Key</span>
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Search -->
        <div class="flex-1">
          <div class="relative">
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search translation keys..."
              class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <!-- Status Filter -->
        <div>
          <select 
            v-model="filterStatus"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Status</option>
            <option value="complete">Complete</option>
            <option value="partial">Partial</option>
            <option value="missing">Missing</option>
            <option value="needs-review">Needs Review</option>
          </select>
        </div>

        <!-- Priority Filter -->
        <div>
          <select 
            v-model="filterPriority"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Priority</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Keys Table -->
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Key
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Namespace
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Priority
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Usage
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Locales
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
            <tr v-for="key in filteredKeys" :key="key.id" class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <td class="px-6 py-4">
                <div>
                  <div class="font-mono text-sm text-gray-900 dark:text-white">{{ key.key }}</div>
                  <div v-if="key.context" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {{ key.context }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md font-mono">
                  {{ key.namespace }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs rounded-full font-medium" :class="getStatusColor(key.status)">
                  {{ key.status.replace('-', ' ') }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span class="px-2 py-1 text-xs rounded-full font-medium" :class="getPriorityColor(key.priority)">
                  {{ key.priority }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 dark:text-white">{{ key.usage.toLocaleString() }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {{ key.components.length }} components
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex space-x-1">
                  <div 
                    v-for="(translation, locale) in key.translations" 
                    :key="locale"
                    class="w-6 h-4 rounded border text-xs flex items-center justify-center font-mono uppercase"
                    :class="translation ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'"
                  >
                    {{ locale }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end space-x-2">
                  <button class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <EyeIcon class="w-4 h-4" />
                  </button>
                  <button class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <PencilIcon class="w-4 h-4" />
                  </button>
                  <button class="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400">
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Results Summary -->
    <div class="text-sm text-gray-500 dark:text-gray-400">
      Showing {{ filteredKeys.length }} of {{ dataStore.translationKeys.length }} translation keys
    </div>
  </div>
</template>