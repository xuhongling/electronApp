import React from 'react'
import { Checkbox, Popover } from 'antd'
import { connect } from 'react-redux'
import { RootState, actions } from '@/store'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
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
		let legendData = ['邮件营销','联盟广告','视频广告']
    for (let i = 0; i < checkedValues.length; i++) {
    	if (checkedValues[i] === '增加Y1轴') {
    		legendData = ['邮件营销','联盟广告','视频广告']
    		this.props.setFileData(legendData)
    	}
    	if (checkedValues[i] === '增加Y2轴') {
    		legendData = ['联盟广告','邮件营销','视频广告']
    		this.props.setFileData(legendData)
    	}
    	if (checkedValues[i] === '增加Y3轴') {
    		legendData = ['视频广告','邮件营销','联盟广告']
    		this.props.setFileData(legendData)
    	}
    }
  }
	
	public render() {
		return (
			<div className={styles.header}>
				<Popover placement="bottom" content={<div className={styles.tips}>回到选择文件</div>}>
					<Link to='/selectFile'>
						<svg className="icon" aria-hidden="true">
					    <use href="#icon-jiexi"></use>
						</svg>
						<div className={styles.title}>{this.state.title}</div>
					</Link>
				</Popover>
				<div className={styles.checkboxWrap}>
					<Checkbox.Group options={this.state.options} defaultValue={this.state.values} onChange={this.onChangeCheckbox}/>
				</div>
			</div>
		)
	}
}