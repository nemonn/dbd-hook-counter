<template>
  <div class="container">
    <Player
      v-for="(stage, player) in players"
      :key="player"
      :stage
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import Player from "./components/Player.vue"

const players = reactive<{ [player: string]: number }>({
  1: 0,
  2: 0,
  3: 0,
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
  window.electron.ipcRenderer.on('cycle-stage', (event, playerId) => {
    cycleStage(playerId)
  })

  window.electron.ipcRenderer.on('reset-stages', () => {
    reset()
  })
}

</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  width: 100%;
}

.container {
  display: inline-flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 25px;
  gap: 13px;
}
</style>