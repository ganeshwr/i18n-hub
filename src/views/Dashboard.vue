<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '../stores/data'
import { useAppStore } from '../stores/app'
import StatsCard from '../components/StatsCard.vue'
import TranslationProgress from '../components/TranslationProgress.vue'
import RecentActivity from '../components/RecentActivity.vue'
import KeyUsageChart from '../components/KeyUsageChart.vue'

const dataStore = useDataStore()
const appStore = useAppStore()

const currentProject = computed(() => {
  return dataStore.projects.find(p => p.id === appStore.currentProject)
})

const stats = computed(() => {
  if (!currentProject.value) return []
  
  const completionRate = Math.round((currentProject.value.completedKeys / currentProject.value.totalKeys) * 100)
  const avgLocaleCompletion = Math.round(
    dataStore.locales.reduce((sum, locale) => sum + locale.coverage, 0) / dataStore.locales.length
  )
  
  return [
    {
      title: 'Total Translation Keys',
      value: currentProject.value.totalKeys.toLocaleString(),
      change: '+12 this week',
      trend: 'up'
    },
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      change: '+5% this month',
      trend: 'up'
    },
    {
      title: 'Active Locales',
      value: currentProject.value.locales.length.toString(),
      change: 'No change',
      trend: 'neutral'
    },
    {
      title: 'Avg. Locale Completion',
      value: `${avgLocaleCompletion}%`,
      change: '+2% this week',
      trend: 'up'
    }
  ]
})
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Overview of your internationalization progress and key metrics
      </p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        v-for="stat in stats"
        :key="stat.title"
        :title="stat.title"
        :value="stat.value"
        :change="stat.change"
        :trend="stat.trend"
      />
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Translation Progress -->
      <div class="lg:col-span-2">
        <TranslationProgress />
      </div>

      <!-- Recent Activity -->
      <div>
        <RecentActivity />
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <KeyUsageChart />
      
      <!-- Locale Coverage Heatmap -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Locale Coverage</h3>
        <div class="space-y-3">
          <div v-for="locale in dataStore.locales" :key="locale.code" class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-8 h-5 rounded border border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs font-mono uppercase">
                {{ locale.code }}
              </div>
              <div>
                <div class="font-medium text-gray-900 dark:text-white">{{ locale.name }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{{ locale.nativeName }}</div>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <div class="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  class="h-2 rounded-full transition-all duration-300"
                  :class="{
                    'bg-green-500': locale.coverage >= 90,
                    'bg-yellow-500': locale.coverage >= 70 && locale.coverage < 90,
                    'bg-red-500': locale.coverage < 70
                  }"
                  :style="{ width: `${locale.coverage}%` }"
                ></div>
              </div>
              <div class="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                {{ locale.coverage }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>