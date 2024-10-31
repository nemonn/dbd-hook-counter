import { reactive } from "vue"

export const defaults = {
  size: 50,
  spacing: 13,
  opacity: 30,
  locked: false
}

function set (key: string, value: number) {
  localStorage.setItem(key, String(value))
}

function get (key: string): number | null {
  const value = localStorage.getItem(key)
  if (!value) return null

  const number = parseFloat(value)
  if (isNaN(number)) return null

  return number
}

export function useUI () {
  return reactive({
    size: get("size") || defaults.size,
    spacing: get("spacing") || defaults.spacing,
    opacity: defaults.opacity,
    locked: defaults.locked
  })
}

export const storage = {
  set,
  get
}