<template>
  <div
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
import { reactive } from "vue"
import Player from "./components/Player.vue"
import { getUi } from "./ui"

const ui = reactive(getUi())

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

function reset () {
  for (const player in players) {
    players[player] = 0
  }
}

if (window.electron) {
  window.electron.ipcRenderer.on("add-stage", (event, playerId) => {
    addStage(playerId)
  })

  window.electron.ipcRenderer.on("reset-stages", () => {
    reset()
  })
}

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