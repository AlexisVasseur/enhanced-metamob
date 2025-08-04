import { defineStore } from "pinia";
import { ref } from "vue";
import type { Settings } from "./settings.types";


const API_KEY = ""
const EDIT_KEY = ""
const DEFAULT_PSEUDO = "zoph"; // Set a default pseudo if needed

export const useSettingsStore = defineStore('settings', () => {

  const settings = ref<Settings>({
    apiKey: localStorage.getItem('apiKey') || API_KEY,
    userKey: localStorage.getItem('userKey') || EDIT_KEY,
    pseudo: localStorage.getItem('pseudo') || DEFAULT_PSEUDO
  });

  function updateSettings(newSettings: Settings) {
    localStorage.setItem('apiKey', newSettings.apiKey);
    localStorage.setItem('userKey', newSettings.userKey);
    localStorage.setItem('pseudo', newSettings.pseudo);
    settings.value = newSettings;
  }

  return {
    settings,
    updateSettings
  };

})