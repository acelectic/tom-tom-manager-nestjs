export {}
declare global {
  interface AnyObject {
    [name: string]: any
    [name: number]: any
  }
  interface BaseUserInf extends AnyObject {
    id: number
    name: string
  }
  type BaseUsersInf = BaseUserInf[]

  interface BaseResourceInf extends AnyObject {
    id: number
    name: string
    price: number
  }
  type BaseResourcesInf = BaseUserInf[]

  type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
  }

  interface BaseOptions {
    value: any
    label: string
  }
}
