import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isDarkMode = ref(false)
  const sidebarOpen = ref(true)
  const currentProject = ref('web-app')
  
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    if (isDarkMode.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
  
  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }
  
  const setCurrentProject = (projectId: string) => {
    currentProject.value = projectId
  }
  
  return {
    isDarkMode,
    sidebarOpen,
    currentProject,
    toggleDarkMode,
    toggleSidebar,
    setCurrentProject
  }
})