import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState, actions } from '@/store'
import { bindActionCreators } from 'redux'
import { Modal, Button, TreeSelect, message } from 'antd'
import monitorRule from 'static/monitorRule'
//import computeFileData from 'utils/computeFileData'
import styles from './style.less'

const { SHOW_PARENT } = TreeSelect

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
    if (props.fileData.length > 0) {
      console.time()
      let fileData = props.fileData
      // 删选初始数据里的重复数据
      let newArr:any = {}
      let selectMonitorRule = monitorRule.reduce((item:any, next:any)=> {
        // 如果临时对象中有这个名字，什么都不做
        if (newArr[next.can_id]) {
          // code...
        }else{
          newArr[next.can_id] = true
          item.push(next)
        }
        return item
      }, [])

      let fileDataObj = {}

      for (let i = 0; i < selectMonitorRule.length; i++) {
        let can_id = selectMonitorRule[i].can_id.toString().toLowerCase()
        let fileDataArr = []
        for (let j = 0; j < fileData.length; j++) {
          if (can_id === fileData[j].CanID) {
             fileDataArr.push(fileData[j])
           }
        }
        fileDataObj[can_id] = fileDataArr
      }
      console.timeEnd()
      setTreeData(fileDataObj)
    }
  },[props.fileData])

  // 设置树的数据
  const setTreeData = (fileDataArr:any)=>{
    let treeData:any[] = []
    for (let i = 0; i < sidebarList.length; i++) {
      let childrenData = []
      for (let j = 0; j < monitorRule.length; j++) {
        
        if (sidebarList[i].name === monitorRule[j].type_name) {
          // 判断是否有数据
          let can_id = monitorRule[j].can_id.toString().toLowerCase()
          let isDisabled = true

          if (fileDataArr[can_id] !== undefined) {
            if (fileDataArr[can_id].length > 0) {
              isDisabled = false
            }else{
              isDisabled = true
            }
          }else{
            isDisabled = true
          }

          childrenData.push({
            ...monitorRule[j],
            title: monitorRule[j].name,
            value: monitorRule[j].name,
            key: monitorRule[j].name,
            disabled: isDisabled
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
    setState(state => ({
      ...state,
      treeData
    }))
  }


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
    if (value.length > 8) {
      message.warning('为了图表展示效果，建议最多勾选八组数据进行查看对比！')
      return
    }
    setState(state => ({
      ...state,
      treeValue: value
    }))

    console.log(value,'value')

    // 设置图表Legend数据
    props.setLegendData(value)
    //props.setChartData(chartData)
  }

  const onSelectTreeData = (value:any)=> {
    console.log(value)
  }

  const tProps = {
    treeData: state.treeData,
    value: state.treeValue,
    onChange: onChangeTreeData,
    onSelect: onSelectTreeData,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: '点击或者搜索输入你要展示数据',
    style: {
      width: '100%',
    },
  };

  return(
    <div className={styles.selectData}>
      <Button type="primary" onClick={showModal} style={{marginLeft: '20px'}}>选择展示数据</Button>
        <Modal title="选择展示数据" visible={state.visible} onOk={handleOkModal} onCancel={handleCancelModal} okText={'确定'} cancelText={'取消'}>
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