import React from 'react'
import styles from './style.less'

export default class WholeCar extends React.Component {

	constructor(props:any) {
		super(props)
	}

	public render() {
		return (
			<div className={styles.wholeCar}>
				WholeCar
			</div>
		)
	}
}