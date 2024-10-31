<template>
    <div class="controls">
      <div class="controls__section">
        <label>Size</label>
        <Slider
          :model-value="props.size"
          :dot-size="14"
          :min="42"
          :max="58"
          tooltip="none"
          adsorb
          @update:modelValue="emit('update:size', $event)"
        />
      </div>

      <div class="controls__section">
        <label>Spacing</label>
        <Slider
          :model-value="props.spacing"
          :dot-size="14"
          :min="3"
          :max="65"
          tooltip="none"
          adsorb
          @update:modelValue="emit('update:spacing', $event)"
        />
      </div>

      <div class="controls__divider"/>

      <div class="controls__section">
        <label>Lock in place</label>
        <KeyCombo :keys="['ALT', 'X']"/>
      </div>

      <div class="controls__section">
        <label>Add hook</label>
        <KeyCombo :keys="['ALT', '1-4']"/>
      </div>

      <div class="controls__section">
        <label>Reset hooks</label>
        <KeyCombo :keys="['ALT', '0']"/>
      </div>
    </div>
</template>

<script setup lang="ts">
import KeyCombo from './KeyCombo.vue'
import Slider from "vue-3-slider-component"

interface Props {
  size: number
  spacing: number
  opacity: number
}

interface Emits {
  (e: "update:size", v: number): void
  (e: "update:spacing", v: number): void
  (e: "update:opacity", v: number): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

</script>

<style>
.controls {
  padding: 30px;
  width: 270px;
  user-select: none;
}

.controls__divider {
  width: 100%;
  border-top: solid 1px rgba(255,255,255,0.05);
  margin: 20px 0;
}

.controls__section {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 24px;
}

.controls__section + .controls__section {
  margin-top: 15px;
}

.controls label {
  font-size: 15px;
  line-height: 1.2;
  color: rgba(255,255,255,0.8);
}

.controls .vue-slider {
  flex-grow: 1;
  max-width: 50%;
}

.controls .vue-slider-rail {
  background-color: rgba(255,255,255, 0.25);
}

.controls .vue-slider-process {
  background-color: whitesmoke;
}

.controls .vue-slider-dot-handle {
  background-color: rgb(15, 15, 15);
  border: solid 2px white;
}

.controls .vue-slider-dot-handle-focus {
  box-shadow: none;
}
</style>