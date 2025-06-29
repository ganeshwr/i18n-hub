<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useDataStore } from '../stores/data'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const dataStore = useDataStore()
const chartRef = ref<HTMLCanvasElement>()
const chartInstance = ref<Chart>()

const chartData = computed(() => {
  return {
    labels: dataStore.analytics.keyUsageFrequency.map(item => item.range),
    datasets: [{
      label: 'Number of Keys',
      data: dataStore.analytics.keyUsageFrequency.map(item => item.count),
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(249, 115, 22, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)'
      ],
      borderColor: [
        'rgba(59, 130, 246, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(249, 115, 22, 1)',
        'rgba(139, 92, 246, 1)',
        'rgba(236, 72, 153, 1)'
      ],
      borderWidth: 1
    }]
  }
})

onMounted(() => {
  if (chartRef.value) {
    chartInstance.value = new Chart(chartRef.value, {
      type: 'doughnut',
      data: chartData.value,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              color: '#6B7280'
            }
          }
        }
      }
    })
  }
})
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Usage Frequency</h3>
    <div class="h-64">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>