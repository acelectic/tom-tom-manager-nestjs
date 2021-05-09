import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core'
import paths from '../../constant/paths'
import { Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCurrUser } from '../../services/auth/auth-query'
import React, { useMemo } from 'react'
import Authenlize from '../commons/Authenlize'
import { Role } from '../../services/auth/auth-types'

import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import PeopleIcon from '@material-ui/icons/People'
import BarChartIcon from '@material-ui/icons/BarChart'
import LayersIcon from '@material-ui/icons/Layers'
import AssignmentIcon from '@material-ui/icons/Assignment'

interface MenuProps {
  path: string
  label: string
}
const Menu = (props: MenuProps) => {
  const history = useHistory()

  const { pathname } = history.location

  const isFocus = useMemo(() => pathname.startsWith(props.path), [
    pathname,
    props.path,
  ])
  return (
    <Box
      style={{
        opacity: isFocus ? 1 : 0.7,
        backgroundColor: isFocus ? '#6EB5FF' : undefined,
      }}
    >
      <Link
        to={props.path}
        style={{
          textDecoration: 'none',
        }}
      >
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText
            primary={props.label}
            style={{
              color: isFocus ? '#FeFEFE' : 'WindowText',
              fontWeight: 'bold',
            }}
          />
        </ListItem>
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
      <Authenlize roles={[Role.ADMIN, Role.MANAGER]} allowLocalAdmin>
        <Menu path={paths.setting()} label={t('page.setting')} />
      </Authenlize>
      <Authenlize allowLocalAdmin>
        <Menu path={paths.admin()} label={t('page.admin')} />
      </Authenlize>
    </div>
  )
}
export default SideMenu
