import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState, actions } from '@/store'
import { bindActionCreators } from 'redux'
import { Modal, Button, TreeSelect } from 'antd'
import monitorRule from 'static/monitorRule'
import styles from './style.less'

const { SHOW_PARENT } = TreeSelect

const treeData:any[] = []
let sidebarList = [
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

const SelectData3: React.FC = (props:any) => {
  const [state, setState] = useState({
    selectDataList: [],
    legendData: [],
    visible: false,
    treeValue: []
  })

  useEffect(()=>{
    console.log(monitorRule,'monitorRule')
    console.log(props.fileData, props.selectData)

    
    for (let i = 0; i < sidebarList.length; i++) {
      let childrenData = []
      for (let j = 0; j < monitorRule.length; j++) {
        if (sidebarList[i].name === monitorRule[j].type_name) {
          childrenData.push({
            ...monitorRule[j],
            title: monitorRule[j].name,
            value: monitorRule[j].name,
            key: monitorRule[j].name,
          })
        }
      }
      let treeChildrenData = {
        title: sidebarList[i].name,
        value: sidebarList[i].name,
        key: sidebarList[i].name,
        treeCheckStrictly: false,
        maxTagCount: 5,
        disableCheckbox: true,
        children: childrenData
      }
      treeData.push(treeChildrenData)
    }
    console.log(treeData,'treeData')
      
  },[])

  const showModal = ()=> {
    setState(state => ({
      ...state,
      visible: true
    }))
  }
  const handleOkModal = ()=>{
    setState(state => ({
      ...state,
      visible: false
    }))
    console.log(state.treeValue,'treeValue')
  }
  const handleCancelModal = ()=>{
    setState(state => ({
      ...state,
      visible: false
    }))
  }
  const onChangeTreeData = (value:any)=> {
    setState(state => ({
      ...state,
      treeValue: value
    }))
  }

  const onSelectTreeData = (value:any)=> {
    console.log(value)
  }

  const tProps = {
    treeData,
    value: state.treeValue,
    onChange: onChangeTreeData,
    onSelect: onSelectTreeData,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    treeDefaultExpandAll: true,
    placeholder: 'Please select',
    style: {
      width: '100%',
    },
  };

  return(
    <div className={styles.selectData}>
      <Button type="primary" onClick={showModal} style={{marginLeft: '20px'}}>选择数据栏数</Button>
        <Modal title="选择展示栏数" visible={state.visible} onOk={handleOkModal} onCancel={handleCancelModal} okText={'确定'} cancelText={'取消'}>
          <TreeSelect {...tProps} />
        </Modal>
    </div>
  )
}


const mapStateToProps = (state: RootState) => ({
  fileData: state.fileData.fileData,
  selectData: state.selectData.selectData
})

const mapDispatchToProps = (dispatch:any)=> ({
  ...bindActionCreators({
    setLegendData: (legendData: any[]) => actions.legendData.setLegendData(legendData),
    setChartData: (chartData: any[]) => actions.chartData.setChartData(chartData)
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectData3)