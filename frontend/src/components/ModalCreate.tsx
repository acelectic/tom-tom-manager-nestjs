import { makeStyles, Modal } from '@material-ui/core'
import { capitalize } from 'lodash'
import { useCallback } from 'react'
import { Form } from 'react-final-form'
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

export interface ModalCreateProps {
  visible: boolean
  fieldNames: string[]
  onSubmit: (values: AnyObject) => void
  closeModal: () => void
  className?: string
}
const ModalCreate = (props: ModalCreateProps) => {
  const { visible, className, fieldNames, onSubmit, closeModal } = props

  const renderField = useCallback((fieldName: string) => {
    return (
      <InputField
        key={fieldName}
        name={fieldName}
        label={capitalize(fieldName)}
        placeholder={capitalize(fieldName)}
        required={true}
      />
    )
  }, [])

  const classes = useAppModalStyles()

  return (
    <Modal
      open={visible}
      className={`${classes.appModal} ${className}`}
      aria-labelledby="app-modal-title"
      aria-describedby="app-modal-description"
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
      onBackdropClick={closeModal}
    >
      <div className={`content ${classes.layout}`}>
        <Form
          initialValues={{}}
          onSubmit={async (v) => {
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
    </Modal>
  )
}

export default ModalCreate
