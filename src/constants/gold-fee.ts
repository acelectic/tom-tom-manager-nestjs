export const regressiveFee = {
  level1: {
    maxValue: 499,
    fix: 10,
  },
  level2: {
    maxValue: 2499,
    percent: 1,
  },
  level3: {
    maxValue: 24999,
    percent: 0.75,
  },
  level4: {
    maxValue: 99999,
    percent: 0.5,
  },
  level5: {
    maxValue: 300000,
    percent: 0.3,
  },
} as const
