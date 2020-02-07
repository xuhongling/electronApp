import React from 'react'
import { Checkbox } from 'antd'
import { connect } from 'react-redux'
import { RootState, actions } from '@/store'
import { bindActionCreators } from 'redux'
import styles from './style.less'

type Props = ReturnType<typeof bindActionCreators>
type State = {
	title: String,
	options: any[],
	values: any[]
}

// @ts-ignore: 不可达代码错误。 用装饰器简写方式
@connect(
  (state: RootState) => ({ fileData: state.chartData.chartData }),
  dispatch => ({
    ...bindActionCreators(
      {
        setFileData: (chartData: any[]) => actions.chartData.setChartData(chartData)
      },
      dispatch
    )
  })
)
export default class Header extends React.Component<Props, State> {

	constructor(props:any) {
		super(props)
		this.state = {
			title: '报文解析',
			options: ['增加Y1轴', '增加Y2轴', '增加Y3轴'],
	    values: ['增加Y1轴']
	  }
	}

	onChangeCheckbox = (checkedValues:any) => {
    console.log('radio checked', checkedValues)
  }
	
	public render() {
		return (
			<div className={styles.header}>
				<div className={styles.title}>{this.state.title}</div>
				<div className={styles.checkboxWrap}>
					<Checkbox.Group options={this.state.options} defaultValue={this.state.values} onChange={this.onChangeCheckbox}/>
				</div>
			</div>
		)
	}
}