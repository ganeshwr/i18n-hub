<script setup lang="ts">
import { ref } from 'vue'
import { 
  PlusIcon,
  UserIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline'
import { formatDistanceToNow } from 'date-fns'

const activeTab = ref('tasks')

const tasks = [
  {
    id: 1,
    title: 'Translate German error messages',
    description: 'Complete German translations for all error validation messages',
    assignee: 'Hans Mueller',
    priority: 'high',
    status: 'in-progress',
    dueDate: new Date('2024-01-20'),
    progress: 67,
    keysCount: 45,
    completedKeys: 30
  },
  {
    id: 2,
    title: 'Review Japanese dashboard translations',
    description: 'Review and approve Japanese translations for dashboard components',
    assignee: 'Yuki Tanaka',
    priority: 'medium',
    status: 'review',
    dueDate: new Date('2024-01-18'),
    progress: 100,
    keysCount: 23,
    completedKeys: 23
  },
  {
    id: 3,
    title: 'Add Chinese mobile app translations',
    description: 'Translate mobile app interface elements to Chinese',
    assignee: 'Li Wei',
    priority: 'critical',
    status: 'pending',
    dueDate: new Date('2024-01-25'),
    progress: 0,
    keysCount: 78,
    completedKeys: 0
  }
]

const reviews = [
  {
    id: 1,
    translationKey: 'dashboard.analytics.title',
    language: 'Spanish',
    originalText: 'Analytics Dashboard',
    translatedText: 'Panel de Análisis',
    translator: 'Maria Garcia',
    reviewer: 'Carlos Rodriguez',
    status: 'approved',
    submittedAt: new Date('2024-01-15T10:30:00'),
    comments: []
  },
  {
    id: 2,
    translationKey: 'errors.validation.email',
    language: 'French',
    originalText: 'Please enter a valid email address',
    translatedText: 'Veuillez saisir une adresse e-mail valide',
    translator: 'Jean Dupont',
    reviewer: null,
    status: 'pending',
    submittedAt: new Date('2024-01-15T09:15:00'),
    comments: [
      {
        author: 'Jean Dupont',
        text: 'Alternative: "Veuillez entrer une adresse e-mail valide"',
        createdAt: new Date('2024-01-15T09:20:00')
      }
    ]
  }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': 
    case 'approved': 
      return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
    case 'in-progress': 
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
    case 'review': 
    case 'pending': 
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
    case 'rejected': 
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
    default: 
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'
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
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Workflow</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          Manage translation tasks, assignments, and approval workflows
        </p>
      </div>
      <button class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200">
        <PlusIcon class="w-5 h-5" />
        <span>New Task</span>
      </button>
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200 dark:border-gray-700">
      <nav class="-mb-px flex space-x-8">
        <button
          @click="activeTab = 'tasks'"
          class="py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
          :class="activeTab === 'tasks' 
            ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'"
        >
          Translation Tasks
        </button>
        <button
          @click="activeTab = 'reviews'"
          class="py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200"
          :class="activeTab === 'reviews' 
            ? 'border-primary-500 text-primary-600 dark:text-primary-400' 
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'"
        >
          Reviews
        </button>
      </nav>
    </div>

    <!-- Tasks Tab -->
    <div v-if="activeTab === 'tasks'" class="space-y-4">
      <div v-for="task in tasks" :key="task.id" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{{ task.title }}</h3>
              <span class="px-2 py-1 text-xs rounded-full font-medium" :class="getPriorityColor(task.priority)">
                {{ task.priority }}
              </span>
              <span class="px-2 py-1 text-xs rounded-full font-medium" :class="getStatusColor(task.status)">
                {{ task.status.replace('-', ' ') }}
              </span>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-3">{{ task.description }}</p>
            
            <!-- Progress -->
            <div class="flex items-center space-x-4 mb-3">
              <div class="flex-1">
                <div class="flex items-center justify-between text-sm mb-1">
                  <span class="text-gray-600 dark:text-gray-400">Progress</span>
                  <span class="font-medium text-gray-900 dark:text-white">{{ task.progress }}%</span>
                </div>
                <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    class="h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-300"
                    :style="{ width: `${task.progress}%` }"
                  ></div>
                </div>
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ task.completedKeys }}/{{ task.keysCount }} keys
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <UserIcon class="w-4 h-4 text-gray-400" />
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ task.assignee }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <ClockIcon class="w-4 h-4 text-gray-400" />
              <span class="text-sm text-gray-600 dark:text-gray-400">
                Due {{ formatDistanceToNow(task.dueDate, { addSuffix: true }) }}
              </span>
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <button class="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Reviews Tab -->
    <div v-if="activeTab === 'reviews'" class="space-y-4">
      <div v-for="review in reviews" :key="review.id" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <code class="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {{ review.translationKey }}
              </code>
              <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded-full font-medium">
                {{ review.language }}
              </span>
              <span class="px-2 py-1 text-xs rounded-full font-medium" :class="getStatusColor(review.status)">
                {{ review.status }}
              </span>
            </div>
            
            <!-- Translation Content -->
            <div class="space-y-3 mb-4">
              <div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Original</div>
                <div class="text-sm text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  "{{ review.originalText }}"
                </div>
              </div>
              <div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Translation</div>
                <div class="text-sm text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  "{{ review.translatedText }}"
                </div>
              </div>
            </div>

            <!-- Comments -->
            <div v-if="review.comments.length > 0" class="space-y-2 mb-4">
              <div class="text-xs text-gray-500 dark:text-gray-400">Comments</div>
              <div v-for="comment in review.comments" :key="comment.createdAt.getTime()" class="flex items-start space-x-3">
                <div class="w-6 h-6 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                  <ChatBubbleLeftIcon class="w-3 h-3 text-gray-600 dark:text-gray-300" />
                </div>
                <div class="flex-1">
                  <div class="text-sm text-gray-900 dark:text-white">{{ comment.text }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {{ comment.author }} • {{ formatDistanceToNow(comment.createdAt, { addSuffix: true }) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span>Translator: {{ review.translator }}</span>
            <span v-if="review.reviewer">Reviewer: {{ review.reviewer }}</span>
            <span>{{ formatDistanceToNow(review.submittedAt, { addSuffix: true }) }}</span>
          </div>
          
          <div v-if="review.status === 'pending'" class="flex items-center space-x-2">
            <button class="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 text-sm rounded-md transition-colors duration-200">
              Reject
            </button>
            <button class="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-800 text-sm rounded-md transition-colors duration-200">
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>