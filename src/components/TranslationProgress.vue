<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '../stores/data'

const dataStore = useDataStore()

const progressData = computed(() => {
  return dataStore.analytics.translationTrends.map(item => ({
    ...item,
    completionRate: Math.round((item.completed / item.total) * 100)
  }))
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Translation Progress</h3>
      <div class="flex items-center space-x-4 text-sm">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-primary-500 rounded-full"></div>
          <span class="text-gray-600 dark:text-gray-400">Completed</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <span class="text-gray-600 dark:text-gray-400">Total</span>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <div v-for="item in progressData" :key="item.month" class="flex items-center justify-between">
        <div class="flex items-center space-x-4 flex-1">
          <div class="w-12 text-sm font-medium text-gray-600 dark:text-gray-400">{{ item.month }}</div>
          <div class="flex-1 flex items-center space-x-3">
            <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                class="h-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500"
                :style="{ width: `${item.completionRate}%` }"
              ></div>
            </div>
            <div class="text-sm font-medium text-gray-900 dark:text-white w-12">
              {{ item.completionRate }}%
            </div>
          </div>
        </div>
        <div class="text-sm text-gray-500 dark:text-gray-400 ml-4">
          {{ item.completed }}/{{ item.total }}
        </div>
      </div>
    </div>

    <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between text-sm">
        <span class="text-gray-600 dark:text-gray-400">Overall Progress</span>
        <div class="flex items-center space-x-2">
          <div class="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div class="h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full w-4/5"></div>
          </div>
          <span class="font-medium text-gray-900 dark:text-white">89%</span>
        </div>
      </div>
    </div>
  </div>
</template>