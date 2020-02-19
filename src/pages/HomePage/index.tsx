import React from 'react'
import Header from 'components/Header'
import Sidebar from 'components/Sidebar'
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
			</div>
		)
	}
}