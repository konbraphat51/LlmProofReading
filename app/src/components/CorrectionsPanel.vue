<template>
  <div class="corrections-panel">
    <h3>{{ t.corrections.title }}</h3>
    
    <div v-if="corrections.length === 0" class="no-corrections">
      {{ t.corrections.noCorrections }}
    </div>
    
    <div v-else class="corrections-list">
      <div
        v-for="correction in corrections"
        :key="correction.id"
        class="correction-card"
        :class="{ hovered: hoveredCorrectionId === correction.id }"
        @mouseenter="emit('hover', correction.id)"
        @mouseleave="emit('hover', null)"
      >
        <div class="card-header">
          <span class="card-type" :class="correction.type">
            {{ correction.type === 'grammar' ? t.corrections.grammar : t.corrections.effectiveness }}
          </span>
        </div>
        
        <div class="card-original">
          <span class="label">Original:</span>
          <span class="text">{{ correction.original }}</span>
        </div>
        
        <div class="card-suggestion">
          <span class="label">Suggestion:</span>
          <span class="text">{{ correction.suggestion }}</span>
        </div>
        
        <div class="card-reason">
          {{ correction.reason }}
        </div>
        
        <div class="card-actions">
          <button
            @click="emit('apply', correction)"
            class="btn btn-apply"
          >
            {{ t.corrections.apply }}
          </button>
          <button
            @click="emit('ignore', correction.id)"
            class="btn btn-ignore"
          >
            {{ t.corrections.ignore }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Correction } from '../types';

interface Props {
  corrections: Correction[];
  hoveredCorrectionId: string | null;
  t: any;
}

interface Emits {
  (e: 'apply', correction: Correction): void;
  (e: 'ignore', id: string): void;
  (e: 'hover', id: string | null): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();
</script>

<style scoped>
.corrections-panel {
  width: 350px;
  border-left: 1px solid #ddd;
  padding: 20px;
  background: #f8f9fa;
  overflow-y: auto;
}

h3 {
  margin: 0 0 20px 0;
  font-size: 18px;
  color: #2d3748;
}

.no-corrections {
  color: #718096;
  text-align: center;
  padding: 40px 20px;
  font-style: italic;
}

.corrections-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.correction-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s;
}

.correction-card.hovered {
  border-color: #4dabf7;
  box-shadow: 0 2px 8px rgba(77, 171, 247, 0.2);
}

.card-header {
  margin-bottom: 12px;
}

.card-type {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.card-type.grammar {
  background: #ffe0e0;
  color: #ff6b6b;
}

.card-type.effectiveness {
  background: #d0ebff;
  color: #4dabf7;
}

.card-original,
.card-suggestion {
  margin-bottom: 10px;
}

.label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #718096;
  margin-bottom: 4px;
}

.text {
  display: block;
  font-size: 14px;
  color: #2d3748;
}

.card-original .text {
  text-decoration: line-through;
  color: #718096;
}

.card-suggestion .text {
  font-weight: 600;
  color: #2d3748;
}

.card-reason {
  font-size: 13px;
  color: #718096;
  margin-bottom: 12px;
  line-height: 1.5;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.btn {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-apply {
  background: #4dabf7;
  color: white;
}

.btn-apply:hover {
  background: #339af0;
}

.btn-ignore {
  background: #e2e8f0;
  color: #718096;
}

.btn-ignore:hover {
  background: #cbd5e0;
}
</style>
