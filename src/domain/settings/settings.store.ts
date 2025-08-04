import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Settings } from './settings.types'

const API_KEY = '03420c-ba4a3d-3fd214-19c562-41ae9e'
const EDIT_KEY = '5a3443-b6c062-bb22f7-19a24d-e957d7'
const DEFAULT_PSEUDO = 'zoph' // Set a default pseudo if needed

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
