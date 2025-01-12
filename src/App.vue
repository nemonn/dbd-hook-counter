<template>
  <div
    v-if="ui"
    class="container"
    :style="`
      --width: ${ui.width}px;
      --height: ${ui.height}px;
      --size: ${ui.size}px;
      --spacing: ${ui.spacing}px;
      --left: ${ui.left}px;
      --bottom: ${ui.bottom}px;
    `"
  >
    <div class="players">
      <Player
        v-for="(stage, player) in players"
        :key="player"
        :stage
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import Player from "./components/Player.vue"
import { buildUi, UI } from "./helpers/ui"
import on from "./helpers/on"

const ui = ref<UI | undefined>()

const players = reactive<{ [player: string]: number }>({
  1: 0,
  2: 0,
  3: 0,
  4: 0
})

function addStage (player: string) {
  let stage = players[player] + 1
  if (stage > 3) stage = 0
  players[player] = stage
}

function removeStage (player: string) {
  const stage = Math.max(players[player] - 1, 0)
  players[player] = stage
}

function reset () {
  for (const player in players) {
    players[player] = 0
  }
}

async function createUi () {
  const uiState = await buildUi()
  ui.value = uiState
  return uiState
}

createUi()

on("addStage", addStage)
on("removeStage", removeStage)
on("resetStages", reset)
on("scaleChange", createUi)

</script>

<style>
@import url(./main.css);

.container {
  width: var(--width);
  height: var(--height);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.players {
  position: absolute;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: var(--spacing);
  left: var(--left);
  bottom: var(--bottom);
}
</style>