import { AppEntity } from '../db/entities/AppEntity'

type MapKey<T> = {
  [id: string]: T
}

export const toMap = <T extends AppEntity>(list: AppEntity[]): MapKey<T> =>
  list.reduce((result, item) => {
    result[item.id] = item
    return result
  }, {})
