import { useContext, useCallback } from 'react'
import { AppSnackbarProps } from '../components/AppSnackbar'
import { AppCtx } from '../constant/contexts'

type UseSnackbarProps = Partial<Omit<AppSnackbarProps, 'visible'>>
export const useSnackbar = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_state, setState] = useContext(AppCtx)
  const openSnackbar = useCallback(
    (props: UseSnackbarProps) => {
      setState({
        appSnackbar: {
          visible: true,
          ...props,
        },
      })
    },
    [setState],
  )

  const snackbar = useCallback(
    (props: Pick<UseSnackbarProps, 'message' | 'type'>) => {
      const { message, type = 'info' } = props
      openSnackbar({
        message,
        type,
      })
    },
    [openSnackbar],
  )

  return { snackbar }
}
