import { Table } from 'antd'
import AddButton from '../../components/AddButton'
import Authorize from '../../components/commons/Authorize'
import Page from '../../components/commons/Page'
import { Role } from '../../services/auth/auth-types'
import {
  useCreateResource,
  useGetResources,
} from '../../services/resource/resource-query'
import {
  CreateResourceParams,
  ResourceEntity,
} from '../../services/resource/resource-types'
import { ColumnType } from 'antd/es/table'
import { useMemo } from 'react'

const Resource = () => {
  const { data: resources } = useGetResources()
  const { mutate: createResource } = useCreateResource()

  const columns = useMemo(() => {
    const tmpColumns: ColumnType<ResourceEntity>[] = [
      {
        title: 'Ref',
        dataIndex: 'ref',
      },
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Price',
        dataIndex: 'price',
      },
    ]
    return tmpColumns
  }, [])

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
      <Table
        dataSource={resources}
        columns={columns}
        pagination={{
          size: 'small',
          pageSize: 5,
        }}
      />
    </Page>
  )
}

export default Resource
