import { Switch, Route, Redirect } from 'react-router-dom'
import Authenlize from '../components/commons/Authenlize'
import Layout from '../components/layout'
import paths from '../constant/paths'
import Admin from '../pages/Admin'
import Dashboard from '../pages/Dashboard'
import Payment from '../pages/Payment'
import Resource from '../pages/Resource'
import Setting from '../pages/Setting'
import Transaction from '../pages/Transaction'
import Users from '../pages/User'
import UserDetial from '../pages/User/UserDetial'
import { useCurrUser } from '../services/auth/auth-query'

export const ProtectedRoute = () => {
  const { data: user } = useCurrUser()
  return (
    <Layout>
      <Switch>
        <Redirect exact from="/" to={paths.dashboard()} />
        <Route path={paths.dashboard()} component={Dashboard} />
        <Route path={paths.userDetail()} component={UserDetial} />
        <Route path={paths.users()} component={Users} />
        <Route path={paths.resources()} component={Resource} />
        <Route path={paths.transactions()} component={Transaction} />
        <Route path={paths.payments()} component={Payment} />
        <Route path={paths.setting()} component={Setting} />
        <Authenlize allowLocalAdmin>
          <Route path={paths.admin()} component={Admin} />
        </Authenlize>
        <Redirect to={paths.notFound()} />
      </Switch>
    </Layout>
  )
}
