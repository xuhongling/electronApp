import React from 'react'
import CreateChart from 'components/CreateChart'
import ColorPickers from 'components/ColorPickers'
import styles from './style.less'

export default class ElectricMachinery extends React.Component {

	constructor(props:any) {
		super(props)
	}

	public render() {
		return (
			<div className={styles.electricMachinery}>
				<CreateChart/>
				<ColorPickers/>
			</div>
		)
	}
}