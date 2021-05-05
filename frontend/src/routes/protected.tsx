import { Switch, Route, Redirect } from 'react-router-dom'
import Layout from '../components/layout'
import paths from '../constant/paths'
import Admin from '../pages/Admin'
import Dashboard from '../pages/Dashboard'
import Payment from '../pages/Payment'
import Resource from '../pages/Resource'
import Transaction from '../pages/Transaction'
import Users from '../pages/User'
import { useCurrUser } from '../services/auth/auth-query'

export const ProtectedRoute = () => {
  const { data: user } = useCurrUser()
  return (
    <Layout>
      <Switch>
        <Redirect exact from="/" to={paths.dashboard()} />
        <Route path={paths.dashboard()} component={Dashboard} />
        <Route path={paths.users()} component={Users} />
        <Route path={paths.resources()} component={Resource} />
        <Route path={paths.transactions()} component={Transaction} />
        <Route path={paths.payments()} component={Payment} />
        {process.env.REACT_APP_ADMIN_EMAIL &&
          user?.email === process.env.REACT_APP_ADMIN_EMAIL && (
            <Route path={paths.admin()} component={Admin} />
          )}
        <Redirect to={paths.notFound()} />
      </Switch>
    </Layout>
  )
}
