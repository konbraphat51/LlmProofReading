<template>
  <div class="text-editor-container">
    <div class="editor-wrapper">
      <div class="editor-content">
        <span
          v-for="(segment, index) in textSegments"
          :key="index"
          :class="segment.correctionClass"
          :data-correction-id="segment.correctionId"
          @mouseenter="segment.correctionId && onCorrectionHover(segment.correctionId)"
          @mouseleave="onCorrectionLeave"
        >{{ segment.text }}</span>
      </div>
      <textarea
        v-model="localText"
        :placeholder="t.editor.placeholder"
        class="editor-input"
        @input="onTextChange"
        spellcheck="false"
      ></textarea>
      
      <!-- Hover tooltip -->
      <div
        v-if="hoveredCorrection && tooltipPosition"
        class="correction-tooltip"
        :style="tooltipPosition"
      >
        <div class="tooltip-header">
          <span class="tooltip-type" :class="hoveredCorrection.type">
            {{ hoveredCorrection.type === 'grammar' ? t.corrections.grammar : t.corrections.effectiveness }}
          </span>
        </div>
        <div class="tooltip-suggestion">{{ hoveredCorrection.suggestion }}</div>
        <div class="tooltip-reason">{{ hoveredCorrection.reason }}</div>
      </div>
    </div>
    
    <div class="editor-actions">
      <button
        @click="emit('analyze')"
        :disabled="isAnalyzing || !localText.trim()"
        class="btn btn-primary"
      >
        {{ isAnalyzing ? t.editor.analyzing : 'Analyze Text' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Correction } from '../types';

interface Props {
  text: string;
  corrections: Correction[];
  isAnalyzing: boolean;
  t: any;
  hoveredCorrectionId: string | null;
}

interface Emits {
  (e: 'update:text', value: string): void;
  (e: 'analyze'): void;
  (e: 'hover', id: string | null): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const localText = ref(props.text);
const tooltipPosition = ref<any>(null);

watch(() => props.text, (newText) => {
  localText.value = newText;
});

const onTextChange = () => {
  emit('update:text', localText.value);
};

interface TextSegment {
  text: string;
  correctionClass?: string;
  correctionId?: string;
}

const textSegments = computed(() => {
  const segments: TextSegment[] = [];
  const text = localText.value;
  let lastIndex = 0;

  // Sort corrections by start position
  const sortedCorrections = [...props.corrections].sort((a, b) => a.start - b.start);

  sortedCorrections.forEach(correction => {
    // Add text before correction
    if (correction.start > lastIndex) {
      segments.push({
        text: text.substring(lastIndex, correction.start)
      });
    }

    // Add corrected segment
    segments.push({
      text: text.substring(correction.start, correction.end),
      correctionClass: `correction correction-${correction.type}`,
      correctionId: correction.id
    });

    lastIndex = correction.end;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({
      text: text.substring(lastIndex)
    });
  }

  return segments;
});

const hoveredCorrection = computed(() => {
  if (!props.hoveredCorrectionId) return null;
  return props.corrections.find(c => c.id === props.hoveredCorrectionId) || null;
});

const onCorrectionHover = (id: string) => {
  emit('hover', id);
  
  // Calculate tooltip position
  const element = document.querySelector(`[data-correction-id="${id}"]`);
  if (element) {
    const rect = element.getBoundingClientRect();
    tooltipPosition.value = {
      top: `${rect.bottom + 10}px`,
      left: `${rect.left}px`
    };
  }
};

const onCorrectionLeave = () => {
  emit('hover', null);
  tooltipPosition.value = null;
};
</script>

<style scoped>
.text-editor-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.editor-wrapper {
  position: relative;
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  min-height: 400px;
}

.editor-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-wrap: break-word;
  pointer-events: none;
  overflow: auto;
}

.editor-content > span {
  pointer-events: auto;
}

.editor-input {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 16px;
  border: none;
  outline: none;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  resize: none;
  background: transparent;
  color: transparent;
  caret-color: black;
}

.correction {
  position: relative;
  cursor: pointer;
  border-bottom: 2px solid;
}

.correction-grammar {
  border-bottom-color: #ff6b6b;
}

.correction-effectiveness {
  border-bottom-color: #4dabf7;
}

.correction-tooltip {
  position: fixed;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 300px;
  z-index: 1000;
}

.tooltip-header {
  margin-bottom: 8px;
}

.tooltip-type {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

.tooltip-type.grammar {
  background: #ffe0e0;
  color: #ff6b6b;
}

.tooltip-type.effectiveness {
  background: #d0ebff;
  color: #4dabf7;
}

.tooltip-suggestion {
  margin-bottom: 8px;
  font-weight: 600;
  color: #2d3748;
}

.tooltip-reason {
  font-size: 14px;
  color: #718096;
}

.editor-actions {
  margin-top: 16px;
  display: flex;
  gap: 12px;
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
</style>
