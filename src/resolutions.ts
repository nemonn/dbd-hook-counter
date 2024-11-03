interface Resolutions {
  [resoltion: string]: {
    size: number
    spacing: number
    left: number
    top: number
  }
}

export const resolutions: Resolutions = {
  "2560x1440": {
    size: 73,
    spacing: 45,
    left: 19,
    top: 569
  },

  "1920x1080": {
    size: 50,
    spacing: 38,
    left: 16,
    top: 429
  },

  _default: {
    size: 50,
    spacing: 13,
    left: 25,
    top: 20
  }
}