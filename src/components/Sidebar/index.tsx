import React from 'react'
import classnames from 'classnames'
import styles from './style.less'

type Props = {}
type State = {
	isType: string,
	sidebarList: any[]
}

export default class Sidebar extends React.Component<Props,State> {

	constructor(props:any) {
		super(props)
		this.state = {
			isType: 'WholeCar',
			sidebarList: [
				{icon: 'iconfont icon-che', name: '整车', type: 'WholeCar'},
				{icon: 'iconfont icon-dianji', name: '电机', type: 'ElectricMachinery'},
				{icon: 'iconfont icon-guzhang', name: '故障', type: 'Fault'},
				{icon: 'iconfont icon-bianyaqi', name: '高压附件', type: 'HighVoltage'},
				{icon: 'iconfont icon-battery', name: '电池', type: 'Battery'},
				{icon: 'iconfont icon-kongzi', name: 'RCU', type: 'RCU'},
				{icon: 'iconfont icon-yaokong', name: '手持遥控', type: 'HandheldControl'},
				{icon: 'iconfont icon-yibiao', name: 'EBS', type: 'EBS'},
				{icon: 'iconfont icon-xinxi', name: '惯导信息', type: 'Information'}
			]
		}
	}

	handleClickList = (item:any)=> {
		this.setState({isType: item.type})
	}

	public render() {
		return (
			<ul className={styles.sidebar}>
				{
					this.state.sidebarList.map((item,index)=>{
						return(
							<li className={classnames(styles.listItem, {[`${styles.isActive}`]: this.state.isType===item.type})} onClick={()=>this.handleClickList(item)} key={index}>
								<i className={item.icon}></i><span>{item.name}</span>
							</li>
						)
					})
				}
			</ul>
		)
	}
}