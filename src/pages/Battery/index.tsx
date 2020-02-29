import React from 'react'
import CreateChart from 'components/CreateChart'
import ColorPickers from 'components/ColorPickers'
import monitorRule from 'static/monitorRule'
import styles from './style.less'

type Props = {}
type State = {
	ruleType: any[]
}

export default class Battery extends React.Component<Props,State> {

	constructor(props:any) {
		super(props)
		this.state = {
			ruleType: []
		}
	}

	componentDidMount() {
		let ruleTypeData:any[] = []
		for (let i = 0; i < monitorRule.length; i++) {
			if (monitorRule[i].type_name === '电池') {
				ruleTypeData.push(monitorRule[i])
			}
		}
		console.log(ruleTypeData,'电池')
		this.setState({ruleType: ruleTypeData})
	}

	public render() {
		return (
			<div className={styles.battery}>
				<CreateChart/>
				<ColorPickers/>
			</div>
		)
	}
}