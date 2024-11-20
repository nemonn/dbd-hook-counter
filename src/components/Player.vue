<template>
  <div
    class="player"
    :data-stage="stage"
  >
    <div class="border">
      <BorderIcon/>
    </div>

    <div class="stage">
      <SkullIcon v-if="stage === 3"/>
      <HooksIcon v-else/>
    </div>
  </div>
</template>

<script setup lang="ts">
import BorderIcon from "../icons/BorderIcon.vue"
import HooksIcon from "../icons/HooksIcon.vue"
import SkullIcon from "../icons/SkullIcon.vue"

interface Props {
  stage: number
}

defineProps<Props>()

</script>

<style>
.player {
  height: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  position: relative;
  border-radius: 50%;
  background-color: rgba(0,0,0,0.3);
}

.player .border {
  position: absolute;
  inset: 0;
  z-index: 1;
  fill: rgba(0,0,0,0.1);
  transition: fill 0.125s;
  overflow: hidden;
}

.player .stage {
  display: flex;
  position: relative;
  z-index: 2;
}

.player .stage svg {
  height: calc(60 * var(--size) / 100);
  fill: rgba(255,255,255,0);
  transition: fill 0.125s;
  stroke: white;
  stroke-width: 52;
  stroke-opacity: 0.15;
}

.player .stage svg {
  fill: black;
}

.player[data-stage="1"] .stage svg path:nth-child(1) {
  fill: rgba(255,255,255,0.75);
}

.player[data-stage="2"] .stage svg path {
  fill: rgba(255,255,255,0.75);
}

.player[data-stage="3"] .stage svg {
  fill: rgba(255,255,255,0.75);
  height: calc(68 * var(--size) / 100);
  stroke: none;
  transform: translateX(-1%);
}

.player[data-stage="3"] .border {
  fill: rgb(240, 0, 0, 0.5);
}

/* Animations */

@keyframes stage-1-icon {
  from {
    opacity: 0.5;
    transform: scale(1.2);
  }
}

@keyframes stage-2-icon {
  from {
    opacity: 0.75;
    transform: scale(1.1);
  }
}

@keyframes stage-3-icon {
  from {
    opacity: 0.5;
    transform: scale(1.2);
  }
}

.player[data-stage="1"] .stage svg {
  animation: stage-1-icon 0.15s;
}

.player[data-stage="2"] .stage svg {
  animation: stage-2-icon 0.15s;
}

.player[data-stage="3"] .stage svg {
  animation: stage-3-icon 0.15s;
}

@keyframes stage-3-ripple {
  from {
    box-shadow: 0 0 0 0 red;
  }

  to {
    box-shadow: 0 0 20px -3px rgba(255, 0, 0, 0);
    transform: scale(1.25);
  }
}

.player[data-stage="3"]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  animation: stage-3-ripple 0.3s 0.01s backwards ease-out;
}
</style>