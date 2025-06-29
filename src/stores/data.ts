import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface TranslationKey {
  id: string
  key: string
  namespace: string
  project: string
  usage: number
  lastUsed: Date
  translations: Record<string, string>
  status: 'complete' | 'partial' | 'missing' | 'needs-review'
  priority: 'critical' | 'high' | 'medium' | 'low'
  context?: string
  components: string[]
}

export interface Project {
  id: string
  name: string
  type: 'web' | 'mobile' | 'desktop'
  framework: 'react' | 'vue' | 'angular' | 'react-native' | 'flutter'
  totalKeys: number
  completedKeys: number
  locales: string[]
  lastUpdate: Date
  status: 'active' | 'archived' | 'draft'
  team: string[]
}

export interface Locale {
  code: string
  name: string
  nativeName: string
  coverage: number
  totalTranslations: number
  missingTranslations: number
  lastUpdate: Date
  translator?: string
  status: 'complete' | 'in-progress' | 'needs-review'
}

export const useDataStore = defineStore('data', () => {
  const projects = ref<Project[]>([
    {
      id: 'web-app',
      name: 'Main Web Application',
      type: 'web',
      framework: 'react',
      totalKeys: 1247,
      completedKeys: 1156,
      locales: ['en', 'es', 'fr', 'de', 'ja', 'zh'],
      lastUpdate: new Date('2024-01-15'),
      status: 'active',
      team: ['alice', 'bob', 'charlie']
    },
    {
      id: 'mobile-app',
      name: 'Mobile Application',
      type: 'mobile',
      framework: 'react-native',
      totalKeys: 892,
      completedKeys: 734,
      locales: ['en', 'es', 'fr', 'de'],
      lastUpdate: new Date('2024-01-14'),
      status: 'active',
      team: ['alice', 'david', 'eve']
    },
    {
      id: 'marketing-site',
      name: 'Marketing Website',
      type: 'web',
      framework: 'vue',
      totalKeys: 456,
      completedKeys: 445,
      locales: ['en', 'es', 'fr'],
      lastUpdate: new Date('2024-01-13'),
      status: 'active',
      team: ['frank', 'grace']
    }
  ])

  const locales = ref<Locale[]>([
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      coverage: 100,
      totalTranslations: 2595,
      missingTranslations: 0,
      lastUpdate: new Date('2024-01-15'),
      status: 'complete'
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      coverage: 94,
      totalTranslations: 2440,
      missingTranslations: 155,
      lastUpdate: new Date('2024-01-14'),
      translator: 'Maria Garcia',
      status: 'in-progress'
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      coverage: 91,
      totalTranslations: 2361,
      missingTranslations: 234,
      lastUpdate: new Date('2024-01-13'),
      translator: 'Jean Dupont',
      status: 'in-progress'
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      coverage: 87,
      totalTranslations: 2258,
      missingTranslations: 337,
      lastUpdate: new Date('2024-01-12'),
      translator: 'Hans Mueller',
      status: 'needs-review'
    },
    {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      coverage: 76,
      totalTranslations: 1972,
      missingTranslations: 623,
      lastUpdate: new Date('2024-01-10'),
      translator: 'Yuki Tanaka',
      status: 'in-progress'
    },
    {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      coverage: 68,
      totalTranslations: 1765,
      missingTranslations: 830,
      lastUpdate: new Date('2024-01-08'),
      translator: 'Li Wei',
      status: 'in-progress'
    }
  ])

  const translationKeys = ref<TranslationKey[]>([
    {
      id: '1',
      key: 'common.buttons.save',
      namespace: 'common',
      project: 'web-app',
      usage: 847,
      lastUsed: new Date('2024-01-15'),
      translations: {
        en: 'Save',
        es: 'Guardar',
        fr: 'Enregistrer',
        de: 'Speichern',
        ja: '保存',
        zh: '保存'
      },
      status: 'complete',
      priority: 'critical',
      context: 'Button text for saving forms and data',
      components: ['SaveButton', 'FormActions', 'ToolbarButton']
    },
    {
      id: '2',
      key: 'dashboard.welcome.title',
      namespace: 'dashboard',
      project: 'web-app',
      usage: 234,
      lastUsed: new Date('2024-01-14'),
      translations: {
        en: 'Welcome to your dashboard',
        es: 'Bienvenido a tu panel',
        fr: 'Bienvenue sur votre tableau de bord',
        de: 'Willkommen zu Ihrem Dashboard',
        ja: 'ダッシュボードへようこそ',
        zh: ''
      },
      status: 'partial',
      priority: 'high',
      context: 'Main dashboard welcome message',
      components: ['DashboardHeader', 'WelcomeCard']
    },
    {
      id: '3',
      key: 'errors.validation.required',
      namespace: 'errors',
      project: 'web-app',
      usage: 1203,
      lastUsed: new Date('2024-01-15'),
      translations: {
        en: 'This field is required',
        es: 'Este campo es obligatorio',
        fr: 'Ce champ est requis',
        de: '',
        ja: '',
        zh: ''
      },
      status: 'partial',
      priority: 'critical',
      context: 'Form validation error message',
      components: ['FormField', 'ValidationMessage', 'InputWrapper']
    }
  ])

  const analytics = ref({
    translationTrends: [
      { month: 'Sep', completed: 1847, total: 2234 },
      { month: 'Oct', completed: 1923, total: 2311 },
      { month: 'Nov', completed: 2034, total: 2398 },
      { month: 'Dec', completed: 2156, total: 2487 },
      { month: 'Jan', completed: 2324, total: 2595 }
    ],
    keyUsageFrequency: [
      { range: '0-10', count: 234 },
      { range: '11-50', count: 567 },
      { range: '51-100', count: 432 },
      { range: '101-500', count: 298 },
      { range: '500+', count: 124 }
    ],
    localePerformance: [
      { locale: 'en', completionRate: 100, performance: 95 },
      { locale: 'es', completionRate: 94, performance: 87 },
      { locale: 'fr', completionRate: 91, performance: 83 },
      { locale: 'de', completionRate: 87, performance: 79 },
      { locale: 'ja', completionRate: 76, performance: 72 },
      { locale: 'zh', completionRate: 68, performance: 65 }
    ]
  })

  return {
    projects,
    locales,
    translationKeys,
    analytics
  }
})