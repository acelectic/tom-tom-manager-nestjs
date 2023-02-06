import { sumBy } from 'lodash'
import {
  Ref,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import { Form, FormSpy } from 'react-final-form'
import Text from '../../components/commons/Text'
import {
  InputField,
  MultiSelectField,
  SwitchField,
} from '../../components/fields'
import { TemplateFormCtx } from '../../constant/contexts'
import { useGetResources } from '../../services/resource/resource-query'
import { TemplateEntity } from '../../services/template/template-types'
import { Col, Modal } from 'antd'
import { FormApi } from 'final-form'

export interface ITemplateFormValues
  extends Omit<TemplateEntity, 'resources' | 'id'> {
  resourceIds: string[]
  id?: string
}

interface ITemplateFormRef {
  submit: () => void
}

interface TemplateFormProps {
  onSubmit: (values: ITemplateFormValues) => void
  elmRef?: Ref<ITemplateFormRef>
}
const TemplateForm = (props: TemplateFormProps) => {
  const { onSubmit, elmRef } = props

  const formRef = useRef<FormApi<ITemplateFormValues>>()

  const [state, setState, { reset }] = useContext(TemplateFormCtx)
  const { id, isActive = true, resourceIds } = state
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

  useImperativeHandle(
    elmRef,
    () => {
      return {
        submit: () => {
          formRef.current?.submit()
        },
      }
    },
    [],
  )

  return (
    <Form<ITemplateFormValues>
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
      {({ form }) => {
        formRef.current = form
        return (
          <Col>
            <Col>
              <InputField name="name" label="Name" />
            </Col>
            <Col>
              <InputField name="description" label="Description" />
            </Col>
            <Col>
              <FormSpy<ITemplateFormValues>>
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
            </Col>
            <Col>
              <SwitchField name="isActive" />
            </Col>
            <Col>
              <MultiSelectField
                name="resourceIds"
                label="Resource"
                options={resourcesOption}
                required
              />
            </Col>
          </Col>
        )
      }}
    </Form>
  )
}

interface ITemplateFormModalProps extends TemplateFormProps {}
const TemplateFormModal = (props: ITemplateFormModalProps) => {
  const { onSubmit } = props
  const formElmRef = useRef<ITemplateFormRef>(null)
  const [state, setState] = useContext(TemplateFormCtx)
  const { visible } = state

  const onOk = useCallback(() => {
    formElmRef.current?.submit?.()
  }, [])

  const onCancel = useCallback(() => {
    setState({ visible: false })
  }, [setState])

  return (
    <Modal open={visible} onCancel={onCancel} onOk={onOk} destroyOnClose>
      <TemplateForm onSubmit={onSubmit} elmRef={formElmRef} />
    </Modal>
  )
}

export default TemplateFormModal
