import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState, actions } from '@/store'
import { bindActionCreators } from 'redux'
import SelectData2 from 'components/SelectData2'
import styles from './style.less'

const sidebarList:any[] = [
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

const Header = (selectData:any) => {
	const [state, setState] = useState({
    titleName: '',
    titleIcon: ''
  })

	useEffect(()=>{
		let titleIcon = ''
		for (let i = 0; i < sidebarList.length; i++) {
			
			if (selectData.selectData === sidebarList[i].name) {
				titleIcon = sidebarList[i].icon
			}
		}
		setState(state => ({
      ...state,
      titleName: selectData.selectData,
      titleIcon
    }))
	},[selectData])

  return (
    <div className={styles.header}>
			<h2 className={styles.title}>
				<i className={state.titleIcon}></i>
				<span>{state.titleName}报文解析</span>
			</h2>
			<div className={styles.rightWrap}>
				<SelectData2/>
			</div>
		</div>
  )
}

const mapStateToProps = (state: RootState) => ({
  selectData: state.selectData.selectData
})

const mapDispatchToProps = (dispatch:any)=> ({
  ...bindActionCreators({
    setSelectData: (selectData: string) => actions.selectData.setSelectData(selectData)
  },dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
