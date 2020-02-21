import * as React from 'react'
import { hot } from 'react-hot-loader'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import SelectFile from 'pages/SelectFile'
import ShowChart from 'pages/ShowChart'

import HomePage from 'pages/HomePage'
import ElectricMachinery from 'pages/ElectricMachinery'
import HighVoltage from 'pages/HighVoltage'
import Fault from 'pages/Fault'
import WholeCar from 'pages/WholeCar'
import RCU from 'pages/RCU'
import Battery from 'pages/Battery'
import HandheldControl from 'pages/HandheldControl'
import EBS from 'pages/EBS'
import Information from 'pages/Information'

const routerMap = () => (
	<Router>
		<Switch>
			<Route path="/selectFile" component={SelectFile} exact={true} />
      <Route exact path="/" render={() => <Redirect to="/selectFile" />} />
			<Route path="/showChart" component={ShowChart} />
			<Route path="/" render={()=>
				<HomePage>
					<Switch>
						<Route path="/electricMachinery" component={ElectricMachinery} />
						<Route path="/highVoltage" component={HighVoltage} />
						<Route path="/fault" component={Fault} />
						<Route path="/wholeCar" component={WholeCar} />
						<Route path="/RCU" component={RCU} />
						<Route path="/battery" component={Battery} />
						<Route path="/handheldControl" component={HandheldControl} />
						<Route path="/EBS" component={EBS} />
						<Route path="/information" component={Information} />
					</Switch>
				</HomePage>
			} />
		</Switch>
	</Router>
)

export default hot(module)(routerMap)