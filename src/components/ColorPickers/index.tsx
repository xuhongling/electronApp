import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '@/store'
import { bindActionCreators } from 'redux'
import styles from './style.less'

type Props = ReturnType<typeof bindActionCreators>

// @ts-ignore: 不可达代码错误。 用装饰器简写方式
@connect(
  (state: RootState) => ({ globalChart: state.globalChart.globalChart }),
  dispatch => ({})
)
export default class ColorPickers extends React.Component<Props> {

	constructor(props:any) {
		super(props)
		setTimeout(()=>{
			console.log(this.props.globalChart)
		},3000)
	}

	public render() {
		return (
			<div className={styles.colorPickers}>
				
			</div>
		)
	}
}