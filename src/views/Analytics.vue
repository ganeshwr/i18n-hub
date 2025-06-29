<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDataStore } from '../stores/data'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const dataStore = useDataStore()
const trendChartRef = ref<HTMLCanvasElement>()
const performanceChartRef = ref<HTMLCanvasElement>()

onMounted(() => {
  if (trendChartRef.value) {
    new Chart(trendChartRef.value, {
      type: 'line',
      data: {
        labels: dataStore.analytics.translationTrends.map(item => item.month),
        datasets: [
          {
            label: 'Completed Keys',
            data: dataStore.analytics.translationTrends.map(item => item.completed),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Total Keys',
            data: dataStore.analytics.translationTrends.map(item => item.total),
            borderColor: 'rgb(107, 114, 128)',
            backgroundColor: 'rgba(107, 114, 128, 0.1)',
            tension: 0.4,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#6B7280'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(107, 114, 128, 0.1)'
            },
            ticks: {
              color: '#6B7280'
            }
          },
          x: {
            grid: {
              color: 'rgba(107, 114, 128, 0.1)'
            },
            ticks: {
              color: '#6B7280'
            }
          }
        }
      }
    })
  }

  if (performanceChartRef.value) {
    new Chart(performanceChartRef.value, {
      type: 'radar',
      data: {
        labels: dataStore.analytics.localePerformance.map(item => item.locale.toUpperCase()),
        datasets: [
          {
            label: 'Completion Rate',
            data: dataStore.analytics.localePerformance.map(item => item.completionRate),
            borderColor: 'rgb(20, 184, 166)',
            backgroundColor: 'rgba(20, 184, 166, 0.2)',
            pointBackgroundColor: 'rgb(20, 184, 166)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(20, 184, 166)'
          },
          {
            label: 'Performance Score',
            data: dataStore.analytics.localePerformance.map(item => item.performance),
            borderColor: 'rgb(249, 115, 22)',
            backgroundColor: 'rgba(249, 115, 22, 0.2)',
            pointBackgroundColor: 'rgb(249, 115, 22)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(249, 115, 22)'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#6B7280'
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(107, 114, 128, 0.1)'
            },
            angleLines: {
              color: 'rgba(107, 114, 128, 0.1)'
            },
            pointLabels: {
              color: '#6B7280'
            },
            ticks: {
              color: '#6B7280',
              backdropColor: 'transparent'
            }
          }
        }
      }
    })
  }
})
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Page Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-1">
        Comprehensive insights into your translation performance and trends
      </p>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="text-sm font-medium text-gray-600 dark:text-gray-400">Total Translation Keys</div>
        <div class="text-3xl font-bold text-gray-900 dark:text-white mt-2">2,595</div>
        <div class="text-sm text-green-600 dark:text-green-400 mt-1">+108 this month</div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="text-sm font-medium text-gray-600 dark:text-gray-400">Average Completion</div>
        <div class="text-3xl font-bold text-gray-900 dark:text-white mt-2">84%</div>
        <div class="text-sm text-green-600 dark:text-green-400 mt-1">+3% this month</div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="text-sm font-medium text-gray-600 dark:text-gray-400">Active Translators</div>
        <div class="text-3xl font-bold text-gray-900 dark:text-white mt-2">5</div>
        <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">No change</div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Reviews</div>
        <div class="text-3xl font-bold text-gray-900 dark:text-white mt-2">23</div>
        <div class="text-sm text-yellow-600 dark:text-yellow-400 mt-1">+5 this week</div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Translation Trends -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Translation Trends</h3>
        <div class="h-80">
          <canvas ref="trendChartRef"></canvas>
        </div>
      </div>

      <!-- Locale Performance -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Locale Performance</h3>
        <div class="h-80">
          <canvas ref="performanceChartRef"></canvas>
        </div>
      </div>
    </div>

    <!-- Detailed Analysis -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Top Performing Keys -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Most Used Keys</h3>
        <div class="space-y-3">
          <div v-for="(item, index) in [
            { key: 'common.buttons.save', usage: 1203 },
            { key: 'common.buttons.cancel', usage: 987 },
            { key: 'errors.validation.required', usage: 876 },
            { key: 'common.buttons.submit', usage: 743 },
            { key: 'navigation.menu.home', usage: 654 }
          ]" :key="item.key" class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-6 h-6 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center text-xs font-medium text-primary-600 dark:text-primary-400">
                {{ index + 1 }}
              </div>
              <div class="font-mono text-sm text-gray-900 dark:text-white">{{ item.key }}</div>
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">{{ item.usage.toLocaleString() }}</div>
          </div>
        </div>
      </div>

      <!-- Translation Quality -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quality Metrics</h3>
        <div class="space-y-4">
          <div>
            <div class="flex items-center justify-between text-sm mb-2">
              <span class="text-gray-600 dark:text-gray-400">Consistency Score</span>
              <span class="font-medium text-gray-900 dark:text-white">94%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div class="h-2 bg-green-500 rounded-full w-[94%]"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between text-sm mb-2">
              <span class="text-gray-600 dark:text-gray-400">Accuracy Score</span>
              <span class="font-medium text-gray-900 dark:text-white">91%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div class="h-2 bg-blue-500 rounded-full w-[91%]"></div>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between text-sm mb-2">
              <span class="text-gray-600 dark:text-gray-400">Completeness</span>
              <span class="font-medium text-gray-900 dark:text-white">87%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div class="h-2 bg-yellow-500 rounded-full w-[87%]"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Milestones -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Milestones</h3>
        <div class="space-y-4">
          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
            <div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">Spanish 95% Complete</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">2 days ago</div>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
            <div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">1000 Keys Milestone</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">1 week ago</div>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
            <div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">New Locale Added</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">2 weeks ago</div>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
            <div>
              <div class="text-sm font-medium text-gray-900 dark:text-white">French Review Complete</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">3 weeks ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>