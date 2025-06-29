<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '../stores/app'
import {
  CogIcon,
  BellIcon,
  KeyIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  DocumentArrowUpIcon,
  DocumentArrowDownIcon
} from '@heroicons/vue/24/outline'

const appStore = useAppStore()
const activeSection = ref('general')

const sections = [
  { id: 'general', name: 'General', icon: CogIcon },
  { id: 'notifications', name: 'Notifications', icon: BellIcon },
  { id: 'api', name: 'API Keys', icon: KeyIcon },
  { id: 'team', name: 'Team', icon: UserGroupIcon },
  { id: 'locales', name: 'Locale Settings', icon: GlobeAltIcon },
  { id: 'security', name: 'Security', icon: ShieldCheckIcon },
  { id: 'import-export', name: 'Import/Export', icon: DocumentArrowUpIcon }
]

const notifications = ref({
  emailUpdates: true,
  translationComplete: true,
  reviewRequired: false,
  weeklyReport: true,
  criticalIssues: true
})

const apiKeys = ref([
  { id: 1, name: 'Production API', key: 'pk_prod_***************', lastUsed: new Date('2024-01-15'), status: 'active' },
  { id: 2, name: 'Development API', key: 'pk_dev_***************', lastUsed: new Date('2024-01-14'), status: 'active' },
  { id: 3, name: 'CI/CD Pipeline', key: 'pk_ci_***************', lastUsed: new Date('2024-01-10'), status: 'inactive' }
])

const teamMembers = ref([
  { id: 1, name: 'Alice Johnson', email: 'alice@company.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Bob Smith', email: 'bob@company.com', role: 'Translator', status: 'active' },
  { id: 3, name: 'Maria Garcia', email: 'maria@company.com', role: 'Translator', status: 'active' },
  { id: 4, name: 'Jean Dupont', email: 'jean@company.com', role: 'Reviewer', status: 'pending' }
])
</script>

<template>
  <div class="p-6">
    <div class="flex gap-6">
      <!-- Sidebar -->
      <div class="w-64 flex-shrink-0">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Settings</h2>
          <nav class="space-y-1">
            <button
              v-for="section in sections"
              :key="section.id"
              @click="activeSection = section.id"
              class="w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
              :class="activeSection === section.id 
                ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'"
            >
              <component :is="section.icon" class="w-5 h-5" />
              <span>{{ section.name }}</span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 space-y-6">
        <!-- General Settings -->
        <div v-if="activeSection === 'general'" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">General Settings</h3>
          
          <div class="space-y-6">
            <!-- Theme -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Appearance</label>
              <div class="flex items-center space-x-4">
                <button
                  @click="!appStore.isDarkMode && appStore.toggleDarkMode()"
                  class="flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200"
                  :class="!appStore.isDarkMode 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' 
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'"
                >
                  <span>Light</span>
                </button>
                <button
                  @click="appStore.isDarkMode && appStore.toggleDarkMode()"
                  class="flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors duration-200"
                  :class="appStore.isDarkMode 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' 
                    : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'"
                >
                  <span>Dark</span>
                </button>
              </div>
            </div>

            <!-- Language -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interface Language</label>
              <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>

            <!-- Timezone -->
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Timezone</label>
              <select class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option>UTC-08:00 (Pacific Time)</option>
                <option>UTC-05:00 (Eastern Time)</option>
                <option>UTC+00:00 (GMT)</option>
                <option>UTC+01:00 (Central European Time)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div v-if="activeSection === 'notifications'" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Notification Preferences</h3>
          
          <div class="space-y-4">
            <div v-for="(value, key) in notifications" :key="key" class="flex items-center justify-between py-3">
              <div>
                <div class="text-sm font-medium text-gray-900 dark:text-white capitalize">
                  {{ key.replace(/([A-Z])/g, ' $1').trim() }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-400">
                  Receive notifications for {{ key.replace(/([A-Z])/g, ' $1').toLowerCase().trim() }}
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  v-model="notifications[key]"
                  type="checkbox"
                  class="sr-only peer"
                >
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>

        <!-- API Keys -->
        <div v-if="activeSection === 'api'" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">API Keys</h3>
            <button class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
              Generate New Key
            </button>
          </div>
          
          <div class="space-y-4">
            <div v-for="apiKey in apiKeys" :key="apiKey.id" class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div>
                <div class="font-medium text-gray-900 dark:text-white">{{ apiKey.name }}</div>
                <div class="text-sm font-mono text-gray-500 dark:text-gray-400">{{ apiKey.key }}</div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Last used {{ apiKey.lastUsed.toLocaleDateString() }}
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <span 
                  class="px-2 py-1 text-xs rounded-full font-medium"
                  :class="apiKey.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300'"
                >
                  {{ apiKey.status }}
                </span>
                <button class="text-red-600 hover:text-red-700 text-sm">Revoke</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Team Management -->
        <div v-if="activeSection === 'team'" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Team Members</h3>
            <button class="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm transition-colors duration-200">
              Invite Member
            </button>
          </div>
          
          <div class="space-y-4">
            <div v-for="member in teamMembers" :key="member.id" class="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
              <div class="flex items-center space-x-4">
                <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                  <span class="text-white font-medium text-sm">{{ member.name.split(' ').map(n => n[0]).join('') }}</span>
                </div>
                <div>
                  <div class="font-medium text-gray-900 dark:text-white">{{ member.name }}</div>
                  <div class="text-sm text-gray-500 dark:text-gray-400">{{ member.email }}</div>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded-full font-medium">
                  {{ member.role }}
                </span>
                <span 
                  class="px-2 py-1 text-xs rounded-full font-medium"
                  :class="member.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' 
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'"
                >
                  {{ member.status }}
                </span>
                <button class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 text-sm">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Import/Export -->
        <div v-if="activeSection === 'import-export'" class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Import/Export</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Import -->
            <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
              <div class="flex items-center space-x-3 mb-4">
                <DocumentArrowUpIcon class="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">Import Translations</h4>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Import translations from various file formats including JSON, CSV, and YAML.
              </p>
              <div class="space-y-3">
                <button class="w-full bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-lg text-sm hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200">
                  Upload JSON File
                </button>
                <button class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                  Upload CSV File
                </button>
                <button class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                  Upload YAML File
                </button>
              </div>
            </div>

            <!-- Export -->
            <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-6">
              <div class="flex items-center space-x-3 mb-4">
                <DocumentArrowDownIcon class="w-6 h-6 text-secondary-600 dark:text-secondary-400" />
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">Export Translations</h4>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Export your translations in various formats for use in your applications.
              </p>
              <div class="space-y-3">
                <button class="w-full bg-secondary-50 dark:bg-secondary-900/20 border border-secondary-200 dark:border-secondary-800 text-secondary-700 dark:text-secondary-300 px-4 py-2 rounded-lg text-sm hover:bg-secondary-100 dark:hover:bg-secondary-900/30 transition-colors duration-200">
                  Export as JSON
                </button>
                <button class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                  Export as CSV
                </button>
                <button class="w-full bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                  Export as YAML
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>