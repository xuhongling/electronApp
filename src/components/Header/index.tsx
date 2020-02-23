import React from 'react'
import { Popover } from 'antd'
import { Link } from 'react-router-dom'
import SelectData from 'components/SelectData'
import styles from './style.less'

type Props = {}
type State = {
	title: String
}

export default class Header extends React.Component<Props, State> {

	constructor(props:any) {
		super(props)
		this.state = {
			title: '报文解析'
	  }
	}

	/*onChangeCheckbox = (checkedValues:any) => {
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
  }*/
	
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
				<div className={styles.rightWrap}>
					{/*<Checkbox.Group options={this.state.options} defaultValue={this.state.values} onChange={this.onChangeCheckbox}/>*/}
					<SelectData/>
				</div>
			</div>
		)
	}
}