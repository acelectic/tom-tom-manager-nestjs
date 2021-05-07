import styled from '@emotion/styled'
import { sumBy } from 'lodash'
import { useMemo } from 'react'
import { Form } from 'react-final-form'
import {
  InputField,
  MultiSelectField,
  SelectField,
} from '../../components/fields'
import { useGetResources } from '../../services/resource/resource-query'
import { useGetTemplates } from '../../services/template/template-query'
import { useCreateTransaction } from '../../services/transaction/transaction-query'
import { CreateTransactionParams } from '../../services/transaction/transaction-types'
import { useGetUsers } from '../../services/user/user-query'
import { numberWithCommas } from '../../utils/helper'

const FormLayout = styled.form`
  margin: 20px;

  > button {
    margin-top: 20px;
  }
`

interface CreateTransactionFormValues extends CreateTransactionParams {}

const TransactionForm = () => {
  const { mutate: createTransaction } = useCreateTransaction()
  const { data: users } = useGetUsers()
  const { data: resources } = useGetResources()
  const { data: templates } = useGetTemplates({
    isActive: true,
  })
  const usersOption = useMemo(() => {
    return (
      users?.map(
        ({ id, name }) => ({ value: id, label: name } as BaseOptions),
      ) || []
    )
  }, [users])

  const resourcesOption = useMemo(() => {
    return (
      resources?.map(
        ({ id, name }) => ({ value: id, label: name } as BaseOptions),
      ) || []
    )
  }, [resources])

  const templatesOption = useMemo(() => {
    return (
      templates?.map(
        ({ id, ref, resources }) =>
          ({
            value: id,
            label: `ref:${ref} | cost = ${numberWithCommas(
              sumBy(resources, 'price'),
            )}`,
          } as BaseOptions),
      ) || []
    )
  }, [templates])

  return (
    <Form<CreateTransactionFormValues>
      onSubmit={values => {
        createTransaction(values)
      }}
      initialValues={{
        userIds: [],
        resourceIds: [],
      }}
    >
      {({ handleSubmit }) => {
        return (
          <FormLayout>
            <InputField name="price" label="Price" required />
            <SelectField
              name="templateId"
              label="Template"
              options={templatesOption}
            />
            <MultiSelectField
              name="userIds"
              label="User"
              options={usersOption}
              required
            />
            <MultiSelectField
              name="resourceIds"
              label="Resource"
              options={resourcesOption}
              required
            />

            <button type="button" title="button" onClick={handleSubmit}>
              Submit
            </button>
          </FormLayout>
        )
      }}
    </Form>
  )
}

export default TransactionForm
