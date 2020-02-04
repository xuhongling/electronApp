import * as React from 'react'
import { hot } from 'react-hot-loader'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import SelectFile from 'pages/SelectFile'
import ShowChart from 'pages/ShowChart'

const routerMap = () => (
	<Router>
		<Switch>
			<Route path="/selectFile" component={SelectFile} exact={true} />
      <Route exact path="/" render={() => <Redirect to="/selectFile" />} />
			<Route path="/showChart" component={ShowChart} />
		</Switch>
	</Router>
)

export default hot(module)(routerMap)