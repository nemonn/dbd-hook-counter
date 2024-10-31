<template>
  <button
    class="close-btn"
    @click="emit('click', $event)"
  >
    <XIcon/>
  </button>
</template>

<script setup lang="ts">
import XIcon from "../icons/XIcon.vue"

interface Emits {
  (e: "click", v: MouseEvent): void
}

const emit = defineEmits<Emits>()

</script>

<style>
.close-btn {
  position: absolute;
  right: 5px;
  top: 5px;
  background-color: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  color: whitesmoke;
  transition: all 0.125s;
  border-radius: 50%;
}

.close-btn svg {
  fill: currentColor;
  width: 10px;
  position: relative;
  z-index: 1;
}

.close-btn::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 50%;
  transition: all 0.125s;
}

.close-btn:focus {
  outline: none;
}

.close-btn:hover {
  cursor: pointer;
  color: black;
}

.close-btn:hover::before {
  transform: scale(1.15);
  background: white;
  border-color: white;
}

.close-btn:active {
  color: black;
  background: white;
  border-color: white;
}

.close-btn:active::before {
  transform: scale(1.05);
  background: white;
  border-color: white;
}
</style>