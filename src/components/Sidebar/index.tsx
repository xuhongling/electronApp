import React from 'react'
import styles from './style.less'

export default class Sidebar extends React.Component {

	constructor(props:any) {
		super(props)
	}
	/*
	*电机 ElectricMachinery
	*高压附件  HighVoltage
	*故障  Fault
	*整车  WholeCar
	RCU
	*电池  Battery
	手持遥控  HandheldControl
	*EBS
	*惯导信息  Information
	 */

	public render() {
		return (
			<ul className={styles.sidebar}>
				<li className={styles.listItem}><i className="iconfont icon-che"></i><span>整车</span></li>
				<li className={styles.listItem}><i className="iconfont icon-dianji"></i><span>电机</span></li>
				<li className={styles.listItem}><i className="iconfont icon-guzhang"></i><span>故障</span></li>
				<li className={styles.listItem}><i className="iconfont icon-bianyaqi"></i><span>高压附件</span></li>
				<li className={styles.listItem}><i className="iconfont icon-battery"></i><span>电池</span></li>
				<li className={styles.listItem}><i className="iconfont icon-kongzi"></i><span>RCU</span></li>
				<li className={styles.listItem}><i className="iconfont icon-yaokong"></i><span>手持遥控</span></li>
				<li className={styles.listItem}><i className="iconfont icon-yibiao"></i><span>EBS</span></li>
				<li className={styles.listItem}><i className="iconfont icon-xinxi"></i><span>惯导信息</span></li>
			</ul>
		)
	}
}