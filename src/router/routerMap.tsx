import * as React from 'react'
import { hot } from 'react-hot-loader'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import HomePage from 'pages/HomePage'

const routerMap = () => (
	<Router>
		<Switch>
			<Route path="/home" component={HomePage} exact={true} />
      <Route exact path="/" render={() => <Redirect to="/home" />} />
		</Switch>
	</Router>
)

export default hot(module)(routerMap)