import styled from '@emotion/styled'
import { useMemo } from 'react'
import { Form } from 'react-final-form'
import { InputField, MultiSelectField } from '../../components/fields'
import { useGetResources } from '../../services/resource/resource-query'
import { useCreateTransaction } from '../../services/transaction/transaction-query'
import { CreateTransactionParams } from '../../services/transaction/transaction-types'
import { useGetUsers } from '../../services/user/user-query'

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

  return (
    <Form<CreateTransactionFormValues>
      onSubmit={(values) => {
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
