import { reactive } from "vue"

export const SIZE_OPTIONS = [36, 42, 50]
export const MAX_SPACING = 38
export const DEFAULTS = {
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
    size: get("size") || DEFAULTS.size,
    spacing: get("spacing") || DEFAULTS.spacing,
    opacity: DEFAULTS.opacity,
    locked: DEFAULTS.locked
  })
}

export const storage = {
  set,
  get
}