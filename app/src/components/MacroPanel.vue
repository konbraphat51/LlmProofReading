<template>
  <div class="macro-panel">
    <div class="panel-header">
      <h3>{{ t.macro.title }}</h3>
      <button
        v-if="chatHistory.length > 0"
        @click="emit('clear')"
        class="btn btn-clear"
      >
        {{ t.macro.clear }}
      </button>
    </div>
    
    <div class="chat-container" ref="chatContainerRef">
      <div v-if="chatHistory.length === 0" class="empty-state">
        <button
          @click="startReview"
          :disabled="isChatting || !hasText"
          class="btn btn-primary btn-start"
        >
          {{ t.macro.button }}
        </button>
      </div>
      
      <div v-else class="chat-messages">
        <div
          v-for="message in chatHistory"
          :key="message.id"
          class="chat-message"
          :class="message.role"
        >
          <div class="message-content">{{ message.content }}</div>
        </div>
        
        <div v-if="isChatting" class="chat-message assistant">
          <div class="message-content typing">{{ t.macro.thinking }}</div>
        </div>
      </div>
    </div>
    
    <div v-if="chatHistory.length > 0" class="chat-input">
      <input
        v-model="userMessage"
        @keyup.enter="sendMessage"
        :placeholder="t.macro.placeholder"
        :disabled="isChatting"
        type="text"
        class="input"
      />
      <button
        @click="sendMessage"
        :disabled="isChatting || !userMessage.trim()"
        class="btn btn-send"
      >
        {{ t.macro.send }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import type { ChatMessage } from '../types';

interface Props {
  chatHistory: ChatMessage[];
  isChatting: boolean;
  hasText: boolean;
  t: any;
}

interface Emits {
  (e: 'send', message: string): void;
  (e: 'clear'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const userMessage = ref('');
const chatContainerRef = ref<HTMLElement | null>(null);

const startReview = () => {
  emit('send', 'Please provide a comprehensive review of this document.');
};

const sendMessage = () => {
  if (!userMessage.value.trim() || props.isChatting) return;
  
  emit('send', userMessage.value);
  userMessage.value = '';
};

// Auto-scroll to bottom when new messages arrive
watch(() => props.chatHistory.length, async () => {
  await nextTick();
  if (chatContainerRef.value) {
    chatContainerRef.value.scrollTop = chatContainerRef.value.scrollHeight;
  }
});
</script>

<style scoped>
.macro-panel {
  width: 400px;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
}

.panel-header {
  padding: 20px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  margin: 0;
  font-size: 18px;
  color: #2d3748;
}

.chat-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.btn-start {
  padding: 12px 24px;
  font-size: 16px;
}

.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chat-message {
  display: flex;
  max-width: 80%;
}

.chat-message.user {
  align-self: flex-end;
}

.chat-message.assistant {
  align-self: flex-start;
}

.message-content {
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.5;
  font-size: 14px;
}

.chat-message.user .message-content {
  background: #4dabf7;
  color: white;
}

.chat-message.assistant .message-content {
  background: white;
  color: #2d3748;
  border: 1px solid #e2e8f0;
}

.message-content.typing {
  font-style: italic;
  color: #718096;
}

.chat-input {
  padding: 20px;
  border-top: 1px solid #ddd;
  display: flex;
  gap: 12px;
  background: white;
}

.input {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
}

.input:focus {
  border-color: #4dabf7;
}

.btn {
  padding: 10px 20px;
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

.btn-primary:hover:not(:disabled) {
  background: #339af0;
}

.btn-primary:disabled {
  background: #a5d8ff;
  cursor: not-allowed;
}

.btn-send {
  background: #4dabf7;
  color: white;
}

.btn-send:hover:not(:disabled) {
  background: #339af0;
}

.btn-send:disabled {
  background: #a5d8ff;
  cursor: not-allowed;
}

.btn-clear {
  padding: 6px 12px;
  background: #e2e8f0;
  color: #718096;
  font-size: 13px;
}

.btn-clear:hover {
  background: #cbd5e0;
}
</style>
