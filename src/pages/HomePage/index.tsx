import React from 'react'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
import ChartExplanation from 'components/ChartExplanation'
import styles from './style.less'

export default class HomePage extends React.Component {

	constructor(props:any) {
		super(props)
	}

	public render() {
		return (
			<div className={styles.homePage}>
				<Header/>
				<Sidebar/>
				<div className={styles.childrenCommon}>
	        {this.props.children}
	      </div>
	      <ChartExplanation/>
			</div>
		)
	}
}