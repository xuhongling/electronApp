import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { RootState, actions } from '@/store'
import { bindActionCreators } from 'redux'
import { Popover } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import styles from './style.less'

type Props = ReturnType<typeof bindActionCreators>
type State = {
	isType: string,
	sidebarList: any[]
}

// @ts-ignore: 不可达代码错误。 用装饰器简写方式
@connect(
  (state: RootState) => ({ selectData: state.selectData.selectData }),
  dispatch => ({
    ...bindActionCreators(
      {
        setSelectData: (selectData: string) => actions.selectData.setSelectData(selectData)
      },
      dispatch
    )
  })
)
export default class Sidebar extends React.Component<Props,State> {

	constructor(props:any) {
		super(props)
		this.state = {
			isType: 'WholeCar',
			sidebarList: [
				{icon: 'iconfont icon-che', name: '整车', type: 'WholeCar', path: '/wholeCar'},
				{icon: 'iconfont icon-dianji', name: '电机', type: 'ElectricMachinery', path: '/electricMachinery'},
				{icon: 'iconfont icon-guzhang', name: '故障', type: 'Fault', path: '/fault'},
				{icon: 'iconfont icon-bianyaqi', name: '高压附件', type: 'HighVoltage', path: '/highVoltage'},
				{icon: 'iconfont icon-battery', name: '电池', type: 'Battery', path: '/battery'},
				{icon: 'iconfont icon-kongzi', name: 'RCU', type: 'RCU', path: 'RCU'},
				{icon: 'iconfont icon-yaokong', name: '手持遥控', type: 'HandheldControl', path: '/handheldControl'},
				{icon: 'iconfont icon-yibiao', name: 'EBS', type: 'EBS', path: 'EBS'},
				{icon: 'iconfont icon-xinxi', name: '惯导信息', type: 'Information', path: '/information'}
			]
		}
	}

	handleClickList = (item:any)=> {
		this.setState({isType: item.type})
		this.props.setSelectData(item.name)
	}

	public render() {
		return (
			<div className={styles.sidebar}>
				<Popover placement="bottom" content={<div className={styles.tips}>选择新数据文件</div>}>
					<Link to='/selectFile'>
						<div className={styles.addFileIcon}><PlusOutlined style={{ fontSize: '18px', color: '#a8bcff' }}/></div>
						<div className={styles.addFileTitle}>新文件</div>
					</Link>
				</Popover>
				<ul className={styles.sidebarBox}>
					{
						this.state.sidebarList.map((item,index)=>{
							return(
								<li className={classnames(styles.listItem, {[`${styles.isActive}`]: this.state.isType===item.type})} onClick={()=>this.handleClickList(item)} key={index}>
									<Popover placement="right" content={<div className={styles.tips}>{item.name}</div>}>
										<Link to={item.path}>
					            <i className={item.icon}></i>
					          </Link>
				          </Popover>
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
}