import React from 'react'
import CreateChart from 'components/CreateChart'
import ColorPickers from 'components/ColorPickers'
import styles from './style.less'

export default class Information extends React.Component {

	constructor(props:any) {
		super(props)
	}

	public render() {
		return (
			<div className={styles.information}>
				<CreateChart/>
				<ColorPickers/>
			</div>
		)
	}
}