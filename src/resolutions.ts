interface Resolutions {
  [resolution: string]: {
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

  "1680x1050": {
    size: 47,
    spacing: 30,
    left: 17,
    top: 426
  },

  _default: {
    size: 50,
    spacing: 13,
    left: 25,
    top: 20
  }
}