import React from 'react'
import styles from './style.less'

export default class HighVoltage extends React.Component {

	constructor(props:any) {
		super(props)
	}

	public render() {
		return (
			<div className={styles.highVoltage}>
				HighVoltage
			</div>
		)
	}
}