import { Box, Typography } from '@material-ui/core'
import paths from '../../constant/paths'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCurrUser } from '../../services/auth/auth-query'
interface MenuProps {
  path: string
  label: string
}
const Menu = (props: MenuProps) => {
  return (
    <Box>
      <Link
        to={props.path}
        style={{
          textDecoration: 'none',
        }}
      >
        <Typography style={{ color: 'WindowText', fontWeight: 'bold' }}>
          {props.label}
        </Typography>
      </Link>
    </Box>
  )
}

const SideMenu = () => {
  const { t } = useTranslation()
  const { data: user } = useCurrUser()
  return (
    <div>
      <Menu path={paths.dashboard()} label={t('page.dashboard')} />
      <Menu path={paths.users()} label={t('page.users')} />
      <Menu path={paths.resources()} label={t('page.resources')} />
      <Menu path={paths.transactions()} label={t('page.transactions')} />
      <Menu path={paths.payments()} label={t('page.payments')} />
      {process.env.REACT_APP_ADMIN_EMAIL &&
        user?.email === process.env.REACT_APP_ADMIN_EMAIL && (
          <Menu path={paths.admin()} label={t('page.admin')} />
        )}
    </div>
  )
}
export default SideMenu
