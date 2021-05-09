import { Grid, makeStyles } from '@material-ui/core'
import { sumBy } from 'lodash'
import { useCallback, useContext, useMemo } from 'react'
import { Form, FormSpy } from 'react-final-form'
import BaseModal from '../../components/commons/BaseModal'
import Text from '../../components/commons/Text'
import { MultiSelectField, SwitchField } from '../../components/fields'
import { TemplateFormCtx } from '../../constant/contexts'
import { useGetResources } from '../../services/resource/resource-query'
import { TemplateEntity } from '../../services/template/template-types'

const useStyles = makeStyles({
  modalLayout: {
    minWidth: '40%',
  },
  formLayout: {
    minHeight: '400px',
    minWidth: '100%%',
    '& > .field-wrapper > *': {
      width: '100%',
    },
  },
})

export interface TemplateFormValues
  extends Omit<TemplateEntity, 'resources' | 'id'> {
  resourceIds: string[]
  id?: string
}

interface TemplateFormProps {
  onSubmit: (values: TemplateFormValues) => void
}
const TemplateForm = (props: TemplateFormProps) => {
  const { onSubmit } = props

  const classes = useStyles()

  const [state, setState, { reset }] = useContext(TemplateFormCtx)
  const { id, visible, isActive = true, resourceIds } = state
  const { data: resources } = useGetResources()

  const handleClose = useCallback(() => {
    reset()
  }, [reset])

  const resourcesOption = useMemo(() => {
    return (
      resources?.map(
        ({ id, name, price }) =>
          ({ value: id, label: `${name}: ${price}` } as BaseOptions),
      ) || []
    )
  }, [resources])

  return (
    <BaseModal
      visible={visible}
      closeModal={handleClose}
      className={classes.modalLayout}
    >
      <Form<TemplateFormValues>
        onSubmit={(values, form) => {
          onSubmit(values)
          form.reset()
          handleClose()
        }}
        initialValues={{
          id,
          isActive,
          resourceIds,
        }}
      >
        {({ handleSubmit }) => {
          return (
            <Grid container direction="column" className={classes.formLayout}>
              <FormSpy<TemplateFormValues>>
                {({ values }) => {
                  const { resourceIds } = values
                  const selectedResources = resources?.filter(({ id }) =>
                    resourceIds.includes(id),
                  )
                  const cost = sumBy(selectedResources, ({ price }) =>
                    Number(price),
                  )
                  return <Text>{`Total cost: ${cost}`}</Text>
                }}
              </FormSpy>
              <SwitchField name="isActive" />
              <MultiSelectField
                name="resourceIds"
                label="Resource"
                options={resourcesOption}
                required
              />

              <button type="button" title="button" onClick={handleSubmit}>
                Submit
              </button>
            </Grid>
          )
        }}
      </Form>
    </BaseModal>
  )
}

export default TemplateForm
