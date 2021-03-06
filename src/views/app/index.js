import React, { Component, Suspense } from 'react'
import { Route, withRouter, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import AppLayout from '../../layout/AppLayout'

const Gogo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './gogo')
)
const Dishes = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './dishes')
)
const Analytics = React.lazy(() => import('./analytics'))

const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './blank-page')
)

class App extends Component {
  render() {
    const { match } = this.props

    console.log(match.url)
    return (
      <AppLayout>
        <div className='dashboard-wrapper'>
          <Suspense fallback={<div className='loading' />}>
            <Switch>
              <Redirect exact from={`${match.url}/`} to={`${match.url}/gogo`} />
              <Route
                path={`${match.url}/gogo`}
                render={(props) => <Gogo {...props} />}
              />
              <Route
                path={`${match.url}/dishes-menu`}
                render={(props) => <Dishes {...props} />}
              />
              <Route
                path={`${match.url}/analytic-menu'`}
                // render={(props) => <span>HI</span>}
                render={(props) => <Analytics {...props} />}
              />
              <Route
                path={`${match.url}/blank-page`}
                render={(props) => <BlankPage {...props} />}
              />
              {/* <Redirect to='/error' /> */}
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    )
  }
}
const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu
  return { containerClassnames }
}

export default withRouter(connect(mapStateToProps, {})(App))
