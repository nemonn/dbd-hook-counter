<template>
  <div
    class="container"
    :style="`--size: ${ui.size}px; --spacing: ${ui.spacing}px; --opacity: ${ui.opacity};`"
  >
    <div class="players">
      <Player
        v-for="(stage, player) in players"
        :key="player"
        :stage
      />
    </div>

    <Controls
      v-model:size="ui.size"
      v-model:spacing="ui.spacing"
      v-model:opacity="ui.opacity"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import Player from "./components/Player.vue"
import Controls from "./components/Controls.vue"

const DEFAULT_UI = {
  size: 50,
  spacing: 13,
  opacity: 30
}

const ui = reactive({ ...DEFAULT_UI })

const players = reactive<{ [player: string]: number }>({
  1: 3,
  2: 2,
  3: 1,
  4: 0
})

function cycleStage (player: string) {
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
  window.electron.ipcRenderer.on("cycle-stage", (event, playerId) => {
    cycleStage(playerId)
  })

  window.electron.ipcRenderer.on("reset-stages", () => {
    reset()
  })
}

</script>

<style>
@import url(./main.css);

.container {
  position: relative;
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: stretch;
  --border-radius: 4px;
}

.players {
  display: inline-flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px 25px;
  gap: var(--spacing);
  background-color: rgba(20, 20, 20, 0.9);
  border-top-left-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
}

.controls {
  background-color: rgba(15, 15, 15, 0.9);
  border-top-right-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
}
</style>