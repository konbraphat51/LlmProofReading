<template>
  <div class="settings-modal" v-if="show" @click.self="emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>{{ t.settings.title }}</h2>
        <button @click="emit('close')" class="btn-close">&times;</button>
      </div>
      
      <div class="modal-body">
        <div class="form-group">
          <label>{{ t.settings.apiKey }}</label>
          <input
            v-model="localSettings.apiKey"
            type="password"
            :placeholder="t.settings.apiKeyPlaceholder"
            class="input"
          />
        </div>
        
        <div class="form-group">
          <label>{{ t.settings.model }}</label>
          <select v-model="localSettings.model" class="input">
            <option value="gpt-4o">GPT-4o</option>
            <option value="gpt-4o-mini">GPT-4o Mini</option>
            <option value="gpt-4-turbo">GPT-4 Turbo</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>{{ t.settings.documentPurpose }}</label>
          <textarea
            v-model="localSettings.documentPurpose"
            :placeholder="t.settings.documentPurposePlaceholder"
            class="input textarea"
            rows="3"
          ></textarea>
        </div>
        
        <div class="form-group">
          <label>{{ t.settings.correctionPolicy }}</label>
          <textarea
            v-model="localSettings.correctionPolicy"
            :placeholder="t.settings.correctionPolicyPlaceholder"
            class="input textarea"
            rows="3"
          ></textarea>
        </div>
        
        <div class="form-group">
          <label>{{ t.settings.uiLanguage }}</label>
          <select v-model="localSettings.uiLanguage" class="input">
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </div>
      </div>
      
      <div class="modal-footer">
        <button @click="saveSettings" class="btn btn-primary">
          {{ t.settings.save }}
        </button>
      </div>
      
      <div v-if="showSaved" class="saved-message">
        {{ t.settings.saved }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Settings } from '../types';

interface Props {
  show: boolean;
  settings: Settings;
  t: any;
}

interface Emits {
  (e: 'close'): void;
  (e: 'save', settings: Settings): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const localSettings = ref<Settings>({ ...props.settings });
const showSaved = ref(false);

watch(() => props.settings, (newSettings) => {
  localSettings.value = { ...newSettings };
}, { deep: true });

const saveSettings = () => {
  emit('save', { ...localSettings.value });
  showSaved.value = true;
  setTimeout(() => {
    showSaved.value = false;
  }, 2000);
};
</script>

<style scoped>
.settings-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-header {
  padding: 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  margin: 0;
  font-size: 24px;
  color: #2d3748;
}

.btn-close {
  background: none;
  border: none;
  font-size: 32px;
  color: #718096;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.btn-close:hover {
  background: #e2e8f0;
}

.modal-body {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2d3748;
  font-size: 14px;
}

.input {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  font-family: inherit;
}

.input:focus {
  border-color: #4dabf7;
}

.textarea {
  resize: vertical;
  min-height: 60px;
}

.modal-footer {
  padding: 24px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
}

.btn {
  padding: 10px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background: #4dabf7;
  color: white;
}

.btn-primary:hover {
  background: #339af0;
}

.saved-message {
  position: absolute;
  bottom: 90px;
  left: 50%;
  transform: translateX(-50%);
  background: #51cf66;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 600;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>
