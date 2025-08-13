<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useSettingsStore } from '@/domain/settings/settings.store'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Message from 'primevue/message'
import type { Settings } from '@/domain/settings/settings.types'

const settingsStore = useSettingsStore()
const showSuccess = ref(false)
const showError = ref(false)

const formData = reactive<Settings>({
  apiKey: settingsStore.settings.apiKey,
  userKey: settingsStore.settings.userKey,
  pseudo: settingsStore.settings.pseudo,
})

function saveSettings() {
  try {
    settingsStore.updateSettings(formData)
    showSuccess.value = true
    showError.value = false

    // Hide success message after 3 seconds
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
  } catch {
    showError.value = true
    showSuccess.value = false

    // Hide error message after 5 seconds
    setTimeout(() => {
      showError.value = false
    }, 5000)
  }
}

function clearLocalStorage() {
  if (
    confirm(
      'Are you sure you want to clear all stored settings? This will remove all your saved preferences.',
    )
  ) {
    localStorage.removeItem('apiKey')
    localStorage.removeItem('userKey')
    localStorage.removeItem('pseudo')

    // Reload the page to reset to defaults
    window.location.reload()
  }
}
</script>

<template>
  <div class="settings-page">
    <div class="page-header">
      <h1 class="page-title">Settings</h1>
      <p class="page-description">Configure your Metamob API settings and preferences</p>
    </div>

    <div class="settings-container">
      <Card class="settings-card">
        <template #title>
          <div class="card-title">
            <i class="pi pi-cog"></i>
            <span>API Configuration</span>
          </div>
        </template>

        <template #content>
          <div class="form-group">
            <label for="apiKey" class="form-label">API Key</label>
            <InputText
              id="apiKey"
              v-model="formData.apiKey"
              type="input"
              placeholder="Enter your Metamob API key"
              class="form-input"
            />
            <small class="form-help">Your Metamob API key for authentication</small>
          </div>

          <div class="form-group">
            <label for="userKey" class="form-label">User Key</label>
            <InputText
              id="userKey"
              v-model="formData.userKey"
              type="input"
              placeholder="Enter your Metamob user key"
              class="form-input"
            />
            <small class="form-help">Your Metamob user key for editing permissions</small>
          </div>

          <div class="form-group">
            <label for="pseudo" class="form-label">Default Pseudo</label>
            <InputText
              id="pseudo"
              v-model="formData.pseudo"
              type="text"
              placeholder="Enter your default pseudo"
              class="form-input"
            />
            <small class="form-help">Your default username for Metamob</small>
          </div>
        </template>

        <template #footer>
          <div class="card-actions">
            <Button
              label="Save Settings"
              icon="pi pi-check"
              @click="saveSettings"
              class="save-button"
            />
            <Button
              label="Clear All Data"
              icon="pi pi-trash"
              severity="danger"
              @click="clearLocalStorage"
              class="clear-button"
            />
          </div>
        </template>
      </Card>

      <Card class="info-card">
        <template #title>
          <div class="card-title">
            <i class="pi pi-info-circle"></i>
            <span>Information</span>
          </div>
        </template>

        <template #content>
          <div class="info-content">
            <p><strong>API Key:</strong> Used to authenticate with the Metamob API</p>
            <p><strong>User Key:</strong> Required for editing monster data</p>
            <p><strong>Pseudo:</strong> Your default username for the application</p>
            <p><strong>Storage:</strong> Settings are saved locally in your browser</p>
          </div>
        </template>
      </Card>
    </div>

    <!-- Success Message -->
    <Message v-if="showSuccess" severity="success" :closable="false" class="message">
      Settings saved successfully!
    </Message>

    <!-- Error Message -->
    <Message v-if="showError" severity="error" :closable="false" class="message">
      An error occurred while saving settings. Please try again.
    </Message>
  </div>
</template>

<style scoped>
.settings-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-description {
  font-size: 1.1rem;
  color: #666;
  margin: 0;
}

.settings-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.settings-card,
.info-card {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.2rem;
  font-weight: 600;
}

.card-title i {
  color: #667eea;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  margin-bottom: 5px;
}

.form-help {
  color: #666;
  font-size: 0.9rem;
}

.card-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.info-content p {
  margin: 8px 0;
  color: #555;
  line-height: 1.5;
}

.info-content strong {
  color: #333;
}

.message {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 400px;
}

@media (max-width: 768px) {
  .settings-page {
    padding: 15px;
  }

  .page-title {
    font-size: 2rem;
  }

  .card-actions {
    flex-direction: column;
  }

  .message {
    right: 15px;
    left: 15px;
    max-width: none;
  }
}
</style>
