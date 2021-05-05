import deepmerge from 'deepmerge'
import { isEqual, isNumber } from 'lodash'
import {
  Context,
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'

export const createCtx = <T extends object>(initValue: T) => {
  return createContext<
    [T, (value: DeepPartial<T>) => void, { reset: () => void; initialValue: T }]
  >([
    initValue,
    (value: DeepPartial<T>) => {},
    {
      reset: () => {},
      initialValue: initValue,
    },
  ])
}

const overwriteMerge = (
  destinationArray: any,
  sourceArray: any,
  options: any,
) => sourceArray

export const withCtx = <T extends AnyObject = AnyObject>(
  Context: Context<any>,
) => (Component: React.ElementType) => (props: T) => {
  const initalState = useMemo(() => {
    return (Context as any)._currentValue[0] || {}
  }, [])
  const [state, setState] = useState(initalState)
  const ref = useRef(state)
  const customSetState = useCallback((v: any) => {
    const newState = deepmerge(ref.current, v, { arrayMerge: overwriteMerge })
    if (!isEqual(newState, ref.current)) {
      ref.current = newState
      setState(newState)
    }
  }, [])
  const reset = useCallback(() => {
    if (!isEqual(initalState, ref.current)) {
      ref.current = initalState
      setState(initalState)
    }
  }, [initalState])

  return (
    <Context.Provider
      value={[state, customSetState, { reset, initialValue: initalState }]}
    >
      <Component {...props} />
    </Context.Provider>
  )
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const numberWithCommas = (
  value: number,
  digit: number | undefined = undefined,
) => {
  return isNumber(value)
    ? value.toLocaleString(undefined, {
        minimumFractionDigits: digit,
        maximumFractionDigits: digit,
      })
    : value
}
