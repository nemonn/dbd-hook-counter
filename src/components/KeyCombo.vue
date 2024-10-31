<template>
  <div class="key-combo">
    <Key
      v-for="(key, index) in props.keys"
      :key="index"
    >{{ key }}</Key>
  </div>
</template>

<script setup lang="ts">
import Key from './Key.vue'

interface Props {
  keys: string[]
}

const props = defineProps<Props>()

</script>

<style>
.key-combo {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
}

.key-combo .key + .key {
  position: relative;
  margin-left: 7px;
}
</style>