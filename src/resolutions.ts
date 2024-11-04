interface Resolutions {
  [resolution: string]: {
    size: number
    spacing: number
    left: number
    top: number
  }
}

export const resolutions: Resolutions = {
  "3840x2160": {
    size: 108,
    spacing: 69,
    left: 30,
    top: 853
  },

  "3200x1800": {
    size: 86,
    spacing: 61,
    left: 26,
    top: 713
  },

  "3072x1728": {
    size: 86,
    spacing: 55,
    left: 24,
    top: 683
  },
  
  "2560x1440": {
    size: 73,
    spacing: 45,
    left: 19,
    top: 569
  },

  "2048x1536": {
    size: 58,
    spacing: 36,
    left: 15,
    top: 647
  },

  "2048x1080": {
    size: 50,
    spacing: 38,
    left: 16,
    top: 429
  },

  "1920x1200": {
    size: 52,
    spacing: 36,
    left: 17,
    top: 488
  },

  "1920x1080": {
    size: 50,
    spacing: 38,
    left: 16,
    top: 429
  },

  "1760x990": {
    size: 47,
    spacing: 34,
    left: 21,
    top: 392
  },

  "1680x1050": {
    size: 47,
    spacing: 30,
    left: 17,
    top: 426
  },

  "1600x1200": {
    size: 44,
    spacing: 29,
    left: 15,
    top: 507
  },

  "1600x900": {
    size: 45,
    spacing: 28,
    left: 16,
    top: 356
  },

  "1366x768": {
    size: 36,
    spacing: 27,
    left: 15,
    top: 304
  },

  "1280x1024": {
    size: 36,
    spacing: 23,
    left: 11,
    top: 436
  },

  "1280x720": {
    size: 34,
    spacing: 25,
    left: 12,
    top: 285
  },

  _default: {
    size: 50,
    spacing: 13,
    left: 25,
    top: 20
  }
}