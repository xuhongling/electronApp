import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState, actions } from '@/store'
import { bindActionCreators } from 'redux'
import { Modal, Popover, TreeSelect, message, notification } from 'antd'
// import monitorRule from 'static/monitorRule'
import computeFileData from 'utils/computeFileData'
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
    treeValue: [],
    fileDataArr: {}
  })

  useEffect(()=>{
    if (props.fileData.length > 0) {
      console.time()
      let fileData = props.fileData
      let monitorRule = props.monitorRule
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
        if (can_id && can_id.length === 9) {
          can_id = `0x0${can_id.slice(-7)}`
        }
        let fileDataObjItem = []
        for (let j = 0; j < fileData.length; j++) {
          let CanID:string = fileData[j].CanID
          if (CanID && CanID.length === 9) {
            CanID = `0x0${CanID.slice(-7)}`
          }
          if (CanID && can_id === CanID.toLowerCase()) {
             fileDataObjItem.push(fileData[j])
           }
        }
        fileDataObj[can_id] = fileDataObjItem
      }
      console.timeEnd()
      setTreeData(fileDataObj)
      setState(state => ({
        ...state,
        fileDataArr: fileDataObj
      }))
    }
  },[props.fileData])

  // 设置树的数据
  const setTreeData = (fileDataArr:any)=>{
    let treeData:any[] = []
    let validData:any = []
    let monitorRule = props.monitorRule
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
              validData.push(monitorRule[j].name)
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
    if (validData.length < 1) {
      notification['error']({
        message: '温馨提示',
        description:
          '您传入的数据有误，没有找到可以解析的数据，请检查一下数据格式。',
      })
      return
    }
    let treeValue:any = []
    treeValue.push(validData[0])
    setState(state => ({
      ...state,
      treeData,
      treeValue
    }))
    // 初始化显示数据
    onChangeTreeData2(treeValue,fileDataArr)
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

    if (value.length === 0) {
      message.warning('为了图表展示效果，最少勾选一组数据进行查看！')
      return
    }

    let getDataCanID = []
    let monitorRule = props.monitorRule
    for (let i = 0; i < value.length; i++) {
      for (let j = 0; j < monitorRule.length; j++) {
        let can_id = monitorRule[j].can_id.toString().toLowerCase()
        if (monitorRule[j].name === value[i]) {
          getDataCanID.push(can_id)
        }
      }
    }
    getDataCanID = [...new Set(getDataCanID)]
    let fileDataArr = state.fileDataArr
    
    let fileDataAll = []
    for (let i = 0; i < getDataCanID.length; i++) {
      fileDataAll.push(...fileDataArr[getDataCanID[i]])
    }

    let chartData = computeFileData(fileDataAll)
    props.setChartData(chartData)

    // 设置图表Legend数据
    props.setLegendData(value)
  }
  const onChangeTreeData2 = (value:any, fileData:any)=> {
    if (value.length > 8) {
      message.warning('为了图表展示效果，建议最多勾选八组数据进行查看对比！')
      return
    }
    setState(state => ({
      ...state,
      treeValue: value
    }))

    if (value.length === 0) {
      message.warning('为了图表展示效果，最少勾选一组数据进行查看！')
      return
    }

    let getDataCanID = []
    let monitorRule = props.monitorRule
    for (let i = 0; i < value.length; i++) {
      for (let j = 0; j < monitorRule.length; j++) {
        let can_id = monitorRule[j].can_id.toString().toLowerCase()
        if (monitorRule[j].name === value[i]) {
          getDataCanID.push(can_id)
        }
      }
    }
    getDataCanID = [...new Set(getDataCanID)]
    let fileDataArr = fileData
    
    let fileDataAll = []
    for (let i = 0; i < getDataCanID.length; i++) {
      fileDataAll.push(...fileDataArr[getDataCanID[i]])
    }
    let chartData = computeFileData(fileDataAll)
    props.setChartData(chartData)

    // 设置图表Legend数据
    props.setLegendData(value)
  }

  const onSelectTreeData = (value:any)=> {
    console.log(value,'onSelectTreeData')
  }

  const tProps = {
    treeData: state.treeData,
    value: state.treeValue,
    onChange: onChangeTreeData,
    onSelect: onSelectTreeData,
    treeCheckable: true,
    treeDefaultExpandAll: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: '点击或者搜索输入你要展示数据',
    listHeight: 500,
    style: {
      width: '100%'
    },
  };

  return(
    <div className={styles.selectData}>
      {/*<Button type="primary" onClick={showModal} style={{marginLeft: '20px'}}>选择展示数据</Button>*/}
      <Popover placement="bottom" content={<div className={styles.tips}>勾选要展示的数据项</div>}>
        <div className={styles.button} onClick={showModal}><i className='iconfont icon-xuanze'></i><span>选择数据</span></div>
      </Popover>
      <Modal 
        width={600}
        title="选择展示数据"
        visible={state.visible}
        onOk={handleOkModal}
        onCancel={handleCancelModal}
        okText={'确定'}
        cancelText={'取消'}
        maskClosable={false}
      >
        <TreeSelect {...tProps} />
      </Modal>
    </div>
  )
}


const mapStateToProps = (state: RootState) => ({
  fileData: state.fileData.fileData,
  selectData: state.selectData.selectData,
  monitorRule: state.monitorRule.monitorRule
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