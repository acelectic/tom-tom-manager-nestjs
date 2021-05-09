import { makeStyles, Modal } from '@material-ui/core'
import { capitalize } from 'lodash'
import { useCallback } from 'react'
import { Form } from 'react-final-form'
import BaseModal from './commons/BaseModal'
import { InputField } from './fields'
export const useAppModalStyles = makeStyles({
  appModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  layout: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    background: '#FFFFFF',
    padding: '2.188rem',
    borderRadius: '1.25rem',
    '&:focus': {
      outline: 'unset',
    },
  },
  header: {
    marginBottom: '0.625rem',
    textAlign: 'left',
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  body: {
    marginBottom: '1.625rem',
    textAlign: 'center',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    '& > *:first-of-type(1)': {
      marginRight: '0.625rem',
    },
  },
})

export interface ModalCreateProps<T extends AnyObject, K extends keyof T> {
  visible: boolean
  fieldNames: K[]
  onSubmit: (values: T) => void
  closeModal: () => void
  className?: string
}
const ModalCreate = <T extends AnyObject, K extends keyof T = keyof T>(
  props: ModalCreateProps<T, K>,
) => {
  const { visible, className, fieldNames, onSubmit, closeModal } = props

  const renderField = useCallback((fieldName: K) => {
    const temp = fieldName as string
    return (
      <InputField
        key={temp}
        name={temp}
        label={capitalize(temp)}
        placeholder={capitalize(temp)}
        required={true}
      />
    )
  }, [])

  const classes = useAppModalStyles()

  return (
    <BaseModal visible={visible} closeModal={closeModal} className={className}>
      <div className={`content ${classes.layout}`}>
        <Form<T>
          initialValues={{}}
          onSubmit={async v => {
            try {
              await onSubmit(v)
              closeModal()
            } catch (error) {
              return error
            }
          }}
        >
          {({ handleSubmit, submitError }) => {
            return (
              <form>
                <h3 style={{ color: 'red' }}>{submitError}</h3>
                {fieldNames.map(renderField)}
                <button type="button" name="submit" onClick={handleSubmit}>
                  Submit
                </button>
              </form>
            )
          }}
        </Form>
      </div>
    </BaseModal>
  )
}

export default ModalCreate
