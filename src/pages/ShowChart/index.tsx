import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '@/store'
import { bindActionCreators } from 'redux'
import styles from './style.less'

type Props = ReturnType<typeof bindActionCreators>

// @ts-ignore: 不可达代码错误。 用装饰器简写方式
@connect(
  (state: RootState) => ({ fileData: state.fileData.fileData }),
  dispatch => ({})
)
export default class ShowChart extends React.Component<Props> {

	constructor(props:Props) {
		super(props)
	}

	componentDidMount() {
		console.log(this.props.fileData,'fileData')
	}

	public render() {
		return (
			<div className={styles.showChart}>
				kjhkh
			</div>
		)
	}
}