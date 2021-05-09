import { Paper } from '@material-ui/core'
import { capitalize, isNumber } from 'lodash'
import Space from '../../../components/commons/Space'
import Text from '../../../components/commons/Text'
import { Role, UserEntity } from '../../../services/auth/auth-types'
import { numberWithCommas } from '../../../utils/helper'

interface UserDetailCardProps {
  user?: UserEntity
}
const UserDetailCard = (props: UserDetailCardProps) => {
  const { name, role, balance } = props.user || {}
  return (
    <Paper>
      <Space direction="column" spacing={6}>
        <Text>{`Name: ${name ? capitalize(name) : '-'}`}</Text>
        <Text>{`Role: ${role ? capitalize(role) : '-'}`}</Text>
        <Text>{`Balance: ${
          isNumber(balance) ? numberWithCommas(balance) : '-'
        }`}</Text>
      </Space>
    </Paper>
  )
}
export default UserDetailCard
