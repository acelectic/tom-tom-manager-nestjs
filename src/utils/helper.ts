import { isNumber } from 'class-validator'
import fs from 'fs'
import { floor, ceil } from 'lodash'
import { regressiveFee } from '../constants/gold-fee'
var pjJson = require('../../package.json')
export const appVersion = pjJson.version

export const GOLD_WEIGHT_PER_GOLD_BAHT = 15.244 as const

export const makeDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdir(dir, { recursive: true }, err => {
      if (err) return Promise.reject(err)
    })
  }
  return Promise.resolve(true)
}

export const calculateFee = (amount: number) => {
  // calculate fee 1% from amount and minimum 10 baht
  return Math.max(10, (amount * 1) / 100)
}

export const roundDownOnly = (value: number, digit = 0) => {
  return isNumber(Number(value)) ? floor(Number(value), digit) : 0
}

export const roundUpOnly = (value: number, digit = 0) => {
  return isNumber(Number(value)) ? ceil(Number(value), digit) : 0
}

export const debugLog = (v: string | Record<string, unknown>) => {
  const hignlightLog = '-'.repeat(20)
  console.log(` `.repeat(20))
  console.log(`${hignlightLog} DEBUG ${hignlightLog}`)
  console.log(v)
  console.log(`${hignlightLog} DEBUG ${hignlightLog}`)
  console.log(` `.repeat(20))
}

export const goldWeightToGoldBaht = (goldWeight: number) => {
  return goldWeight / GOLD_WEIGHT_PER_GOLD_BAHT
}

export const goldBahtToGoldWeight = (goldBaht: number) => {
  return goldBaht * GOLD_WEIGHT_PER_GOLD_BAHT
}
