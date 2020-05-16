import React from 'react'
import SelectData2 from 'components/SelectData2'
import styles from './style.less'

type Props = {}
type State = {
	title: String
}

export default class Header extends React.Component<Props, State> {

	constructor(props:any) {
		super(props)
	}
	
	public render() {
		return (
			<div className={styles.header}>
				<div className={styles.rightWrap}>
					<SelectData2/>
				</div>
			</div>
		)
	}
}