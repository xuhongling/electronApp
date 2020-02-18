import React from 'react'
import styles from './style.less'

export default class EBS extends React.Component {

	constructor(props:any) {
		super(props)
	}

	public render() {
		return (
			<div className={styles.homePage}></div>
		)
	}
}