<script setup lang="ts">
import { onMounted } from 'vue'
import { useAppStore } from './stores/app'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'

const appStore = useAppStore()

onMounted(() => {
  // Initialize theme
  if (localStorage.getItem('theme') === 'dark') {
    appStore.toggleDarkMode()
  }
})
</script>

<template>
  <div class="flex h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <Header />
      
      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <router-view />
      </main>
    </div>
  </div>
</template>