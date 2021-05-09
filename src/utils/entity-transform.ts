import { ValueTransformer } from 'typeorm'

export const transformerDecimalToNumber: ValueTransformer = {
  to: (value: number) => value,
  from: (value: string) => Number(value),
}
