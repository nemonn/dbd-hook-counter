<template>
  <div
    class="container"
    :class="{'locked': ui.locked}"
    :style="`
      --size: ${ui.size}px;
      --default-size: ${DEFAULTS.size}px;
      --spacing: ${ui.spacing}px;
      --opacity: ${ui.opacity};`
    "
  >
    <div class="players">
      <Player
        v-for="(stage, player) in players"
        :key="player"
        :stage
      />
    </div>

    <template v-if="!ui.locked">
      <Controls
        v-model:size="ui.size"
        v-model:spacing="ui.spacing"
        @update:size="storage.set('size', $event)"
        @update:spacing="storage.set('spacing', $event)"
      />

      <CloseButton @click="close()"/>
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import Player from "./components/Player.vue"
import Controls from "./components/Controls.vue"
import CloseButton from "./components/CloseButton.vue"
import { useUI, storage, DEFAULTS } from "./helpers/ui"

const ui = useUI()

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

  window.electron.ipcRenderer.on("lock", (event, state) => {
    ui.locked = state
  })
}

function close () {
  if (window.electron) {
    window.electron.ipcRenderer.send("close-app")
  }
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

.locked .players {
  background-color: transparent;
}
</style>