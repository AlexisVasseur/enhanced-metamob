import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Settings } from './settings.types'

// Load from environment variables with fallbacks
const API_KEY = import.meta.env.VITE_METAMOB_API_KEY
const EDIT_KEY = import.meta.env.VITE_METAMOB_USER_KEY
const DEFAULT_PSEUDO = import.meta.env.VITE_METAMOB_DEFAULT_PSEUDO

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<Settings>({
    apiKey: localStorage.getItem('apiKey') || API_KEY,
    userKey: localStorage.getItem('userKey') || EDIT_KEY,
    pseudo: localStorage.getItem('pseudo') || DEFAULT_PSEUDO,
  })

  function updateSettings(newSettings: Settings) {
    localStorage.setItem('apiKey', newSettings.apiKey)
    localStorage.setItem('userKey', newSettings.userKey)
    localStorage.setItem('pseudo', newSettings.pseudo)
    settings.value = newSettings
  }

  return {
    settings,
    updateSettings,
  }
})
