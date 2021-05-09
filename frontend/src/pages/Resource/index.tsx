import AddButton from '../../components/AddButton'
import BasicList from '../../components/BasicList'
import Authenlize from '../../components/commons/Authenlize'
import Page from '../../components/commons/Page'
import { Role } from '../../services/auth/auth-types'
import {
  useCreateResource,
  useGetResources,
} from '../../services/resource/resource-query'
import { CreateResourceParams } from '../../services/resource/resource-types'

const Resource = () => {
  const { data: resources } = useGetResources()
  const { mutate: createResource } = useCreateResource()
  return (
    <Page title="Resource">
      <Authenlize roles={[Role.ADMIN, Role.MANAGER]}>
        <AddButton
          fieldNames={['name', 'price']}
          name={'Add Resource'}
          onSubmit={v => {
            const { name, price } = v as CreateResourceParams
            createResource({
              name,
              price,
            })
          }}
        />
      </Authenlize>
      <BasicList data={resources} columns={['ref', 'name', 'price']} />
    </Page>
  )
}

export default Resource
