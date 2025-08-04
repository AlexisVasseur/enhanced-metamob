import { defineStore } from "pinia";
import axios from "axios";
import { useSettingsStore } from "../settings/settings.store";

const BASE_URL = '/api';
export const useMetamobApiStore = defineStore('metamobApi', () => {

  const settingsStore = useSettingsStore();

  function createMetamobClient() {
    return axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'HTTP-X-APIKEY': settingsStore.settings.apiKey,
        'HTTP-X-USERKEY': settingsStore.settings.userKey,
      },
      withCredentials: false,
      timeout: 10000,
    });
  }

  return { createMetamobClient }

})