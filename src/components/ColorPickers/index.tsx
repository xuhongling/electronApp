import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '@/store'
import { bindActionCreators } from 'redux'
import { SketchPicker } from 'react-color'
import classnames from 'classnames'
import styles from './style.less'

type Props = ReturnType<typeof bindActionCreators>
type State = {
	isShowColorPickers: boolean,
	background: any
}

// @ts-ignore: 不可达代码错误。 用装饰器简写方式
@connect(
  (state: RootState) => ({ globalChart: state.globalChart.globalChart }),
  dispatch => ({})
)
export default class ColorPickers extends React.Component<Props,State> {

	constructor(props:any) {
		super(props)
		this.state = {
			isShowColorPickers: false,
			background: '#fff'
		}
	}
  handleChangeComplete = (color:any) => {
    this.setState({ background: color.hex });
  }

	public render() {
		return (
			<div className={classnames(styles.colorPickers, {[`${styles.showColorPickers}`]: this.state.isShowColorPickers})}>
				<SketchPicker color={this.state.background} onChangeComplete={ this.handleChangeComplete } />
			</div>
		)
	}
}