import { safeGoldClient, safeGoldApiWraper } from './safe-gold-client'
import { createMethod } from './tools'

export const api = {
  safeGold: createMethod(safeGoldClient, safeGoldApiWraper),
}
