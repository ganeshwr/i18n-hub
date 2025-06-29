<script setup lang="ts">
import { computed } from 'vue'
import { formatDistanceToNow } from 'date-fns'
import { 
  PlusIcon, 
  PencilIcon, 
  CheckIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/vue/24/outline'

const activities = [
  {
    id: 1,
    type: 'added',
    user: 'Alice Johnson',
    action: 'added new translation key',
    target: 'common.buttons.export',
    time: new Date('2024-01-15T10:30:00'),
    icon: PlusIcon,
    color: 'text-green-600 dark:text-green-400'
  },
  {
    id: 2,
    type: 'updated',
    user: 'Bob Smith',
    action: 'updated translation',
    target: 'dashboard.welcome.title',
    time: new Date('2024-01-15T09:15:00'),
    icon: PencilIcon,
    color: 'text-blue-600 dark:text-blue-400'
  },
  {
    id: 3,
    type: 'approved',
    user: 'Maria Garcia',
    action: 'approved Spanish translations',
    target: '12 keys',
    time: new Date('2024-01-15T08:45:00'),
    icon: CheckIcon,
    color: 'text-green-600 dark:text-green-400'
  },
  {
    id: 4,
    type: 'review',
    user: 'System',
    action: 'flagged for review',
    target: 'errors.validation.email',
    time: new Date('2024-01-14T16:20:00'),
    icon: ExclamationTriangleIcon,
    color: 'text-yellow-600 dark:text-yellow-400'
  },
  {
    id: 5,
    type: 'updated',
    user: 'Charlie Brown',
    action: 'updated French translations',
    target: 'navigation.menu.settings',
    time: new Date('2024-01-14T14:10:00'),
    icon: PencilIcon,
    color: 'text-blue-600 dark:text-blue-400'
  }
]
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
    
    <div class="space-y-4">
      <div v-for="activity in activities" :key="activity.id" class="flex items-start space-x-3">
        <div class="flex-shrink-0">
          <div class="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <component :is="activity.icon" class="w-4 h-4" :class="activity.color" />
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-sm text-gray-900 dark:text-white">
            <span class="font-medium">{{ activity.user }}</span>
            {{ activity.action }}
            <code class="mx-1 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">
              {{ activity.target }}
            </code>
          </div>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {{ formatDistanceToNow(activity.time, { addSuffix: true }) }}
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <button class="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
        View all activity →
      </button>
    </div>
  </div>
</template>