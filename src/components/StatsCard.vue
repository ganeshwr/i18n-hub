<script setup lang="ts">
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from '@heroicons/vue/24/solid'

interface Props {
  title: string
  value: string
  change: string
  trend: 'up' | 'down' | 'neutral'
}

defineProps<Props>()
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 card-hover">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-gray-600 dark:text-gray-400">{{ title }}</p>
        <p class="text-2xl font-bold text-gray-900 dark:text-white mt-1">{{ value }}</p>
      </div>
      <div 
        class="flex items-center space-x-1 text-sm"
        :class="{
          'text-green-600 dark:text-green-400': trend === 'up',
          'text-red-600 dark:text-red-400': trend === 'down',
          'text-gray-500 dark:text-gray-400': trend === 'neutral'
        }"
      >
        <ArrowUpIcon v-if="trend === 'up'" class="w-4 h-4" />
        <ArrowDownIcon v-if="trend === 'down'" class="w-4 h-4" />
        <MinusIcon v-if="trend === 'neutral'" class="w-4 h-4" />
        <span>{{ change }}</span>
      </div>
    </div>
  </div>
</template>