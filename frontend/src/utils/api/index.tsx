import { tomtomClient, tomtomApiWraper } from './tom-tom-client'

import { createMethod } from './tools'

export const api = {
  tomtom: createMethod(tomtomClient, tomtomApiWraper),
}
