import AddButton from '../../components/AddButton'
import BasicList from '../../components/BasicList'
import Authorize from '../../components/commons/Authorize'
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
      <Authorize roles={[Role.ADMIN, Role.MANAGER]}>
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
      </Authorize>
      <BasicList data={resources} columns={['ref', 'name', 'price']} />
    </Page>
  )
}

export default Resource
