<script setup lang="ts">
import { computed } from 'vue';
import { useAppState } from './composables/useAppState';
import { translations } from './i18n';
import TextEditor from './components/TextEditor.vue';
import CorrectionsPanel from './components/CorrectionsPanel.vue';
import MacroPanel from './components/MacroPanel.vue';
import SettingsModal from './components/SettingsModal.vue';

const {
  text,
  corrections,
  chatHistory,
  settings,
  isAnalyzing,
  isChatting,
  showSettings,
  hoveredCorrection,
  saveSettings,
  analyzeMicroCorrections,
  getMacroReview,
  clearChatHistory,
  applyCorrection,
  ignoreCorrection
} = useAppState();

const t = computed(() => translations[settings.uiLanguage]);

const handleSaveSettings = (newSettings: any) => {
  Object.assign(settings, newSettings);
  saveSettings();
};
</script>

<template>
  <div class="app">
    <header class="app-header">
      <h1>{{ t.title }}</h1>
      <button @click="showSettings = true" class="btn-settings">
        ⚙️ {{ t.settings.title }}
      </button>
    </header>
    
    <div class="app-content">
      <MacroPanel
        :chat-history="chatHistory"
        :is-chatting="isChatting"
        :has-text="!!text.trim()"
        :t="t"
        @send="getMacroReview"
        @clear="clearChatHistory"
      />
      
      <TextEditor
        :text="text"
        :corrections="corrections"
        :is-analyzing="isAnalyzing"
        :hovered-correction-id="hoveredCorrection"
        :t="t"
        @update:text="(val) => text = val"
        @analyze="analyzeMicroCorrections"
        @hover="(id) => hoveredCorrection = id"
      />
      
      <CorrectionsPanel
        :corrections="corrections"
        :hovered-correction-id="hoveredCorrection"
        :t="t"
        @apply="applyCorrection"
        @ignore="ignoreCorrection"
        @hover="(id) => hoveredCorrection = id"
      />
    </div>
    
    <SettingsModal
      :show="showSettings"
      :settings="settings"
      :t="t"
      @close="showSettings = false"
      @save="handleSaveSettings"
    />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f8f9fa;
}

.app-header {
  background: white;
  padding: 16px 24px;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

h1 {
  margin: 0;
  font-size: 24px;
  color: #2d3748;
  font-weight: 700;
}

.btn-settings {
  padding: 8px 16px;
  background: #4dabf7;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-settings:hover {
  background: #339af0;
}

.app-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}
</style>
