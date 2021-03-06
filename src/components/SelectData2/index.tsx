import React from 'react'
import { Select, Modal, Button, Radio, } from 'antd'
import { connect } from 'react-redux'
import { RootState, actions } from '@/store'
import { bindActionCreators } from 'redux'
import monitorRule from 'static/monitorRule'
import getColumnData from 'utils/getColumnData'
//import fileData from 'static/fileData'
import styles from './style.less'

const { Option } = Select

type Props = ReturnType<typeof bindActionCreators>
type State = {
  selectNumber: any[],
  selectDataList: any[],
  legendData: any[],
  selectOptionData: any[],
  selectOptionIndex: number,
  visible: boolean,
  value: number
}

// @ts-ignore: 不可达代码错误。 用装饰器简写方式
@connect(
  (state: RootState) => ({
    fileData: state.fileData.fileData,
    selectData: state.selectData.selectData
  }),
  dispatch => ({
    ...bindActionCreators(
      {
        setLegendData: (legendData: any[]) => actions.legendData.setLegendData(legendData),
        setChartData: (chartData: any[]) => actions.chartData.setChartData(chartData)
      },
      dispatch
    )
  })
)
export default class SelectData extends React.Component<Props, State> {

  constructor(props:any) {
    super(props)
    this.state = {
      selectDataList: [],
      selectOptionData: [],
      selectOptionIndex: 0,
      legendData: [],
      selectNumber: ['a0'],
      visible: false,
      value: 1,
    }
  }
  componentDidMount() {
    this.handleChangeSelectData('整车')
  }

  componentDidUpdate(prevProps:any, prevState:any) {
    // 判断是否更新了全局 eChart，典型用法（不要忘记比较 props）
    if (this.props.selectData !== prevProps.selectData) {
      let typeName:any = this.props.selectData
      this.handleChangeSelectData(typeName)
    }
  }

  // 选择框数据初始化
  handleChangeSelectData = (typeName:string)=> {
    let selectDataList =  []
    for (let i = 0; i < monitorRule.length; i++) {
      if (monitorRule[i].type_name === typeName) {
        selectDataList.push(monitorRule[i])
      }
    }
    let array:any[] = selectDataList
    let size:number = selectDataList.length / this.state.selectNumber.length
    let selectOptionData:any = this.sliceArray(array, size)
    let legendData = []
    for (let i = 0; i < selectOptionData.length; i++) {
      legendData.push(selectOptionData[i][0].name)
    }
    this.setState({selectDataList, selectOptionData, legendData})
    // 设置图表Legend数据
    this.props.setLegendData(legendData)
    // 传入三个值，当前栏目名称，选择栏数据，CSV总数据
    let fileData:any = this.props.fileData
    let chartData:any = getColumnData(typeName, legendData, fileData)
    // console.log(chartData,typeName, legendData, fileData)
    this.props.setChartData(chartData)
  }
  // 获取鼠标点击哪一个选择框
  handleFocusData = (index:number)=> {
    this.setState({ selectOptionIndex: index })
  }
  // 改变选择框事件
  handleChangeData = (value:any)=> {
    this.props.setLegendData([])
    let legendData = this.state.legendData
    let selectOptionIndex = this.state.selectOptionIndex
    legendData[selectOptionIndex] = value
    this.setState({legendData: legendData})
    // 设置图表Legend数据
    this.props.setLegendData(legendData)
    // 传入三个值，当前栏目名称，选择栏数据，CSV总数据
    let typeName:any = this.props.selectData
    let fileData:any = this.props.fileData
    let chartData:any = getColumnData(typeName, legendData, fileData)
    console.log(legendData, typeName, fileData, chartData)
    this.props.setChartData(chartData)
  }
  /*
 * 将一个数组分成几个同等长度的数组
 * array[分割的原数组]
 * size[每个子数组的长度]
 */
  sliceArray = (array:any[], size:number) => {
    let result = []
    for (let i = 0; i < Math.ceil(array.length / size); i++) {
      let start = i * size
      let end = start + size
      result.push(array.slice(start, end))
    }
    return result
  }


  showModal = ()=>{
    this.setState({ visible: true })
  }
  handleOkModal = ()=>{
    this.setState({ visible: false })
    let typeName:any = this.props.selectData
    this.handleChangeSelectData(typeName)
  }
  handleCancelModal = ()=>{
    this.setState({ visible: false })
  }

  onChangeRadio = (event:any) => {
    let typeName:any = this.props.selectData
    let selectNumber = []
    let value:number = Number(event.target.value)
    for (let i = 0; i < value; i++) {
      selectNumber.push(`a${i}`)
    }
    this.setState({ 
      selectNumber,
      value: event.target.value
    },()=>{
      this.handleChangeSelectData(typeName)
    })
  }

  public render() {
    const radioStyle = {
      display: 'block',
      height: '40px',
      lineHeight: '40px',
    }

    return (
      <div className={styles.selectData}>
        {
          this.state.legendData.length !==0 ? this.state.selectNumber.map((itemList,index)=>{
            return (
              <Select 
                showSearch
                value={this.state.legendData[index]}
                placeholder="请选择"
                optionFilterProp="children"
                onChange={this.handleChangeData}
                onFocus={()=>this.handleFocusData(index)}
                key={index}
              >
                {
                  this.state.selectOptionData.length === this.state.selectNumber.length ?
                  this.state.selectOptionData[index].map((item:any)=>{
                    return (
                      <Option value={item.name} key={item.id}>{item.name}</Option>
                    )
                  }): null
                }
              </Select>
            )
          }): null
        }
        <Button type="primary" onClick={this.showModal} style={{marginLeft: '20px'}}>选择数据栏数</Button>
        <Modal title="选择展示栏数" visible={this.state.visible} onOk={this.handleOkModal} onCancel={this.handleCancelModal} okText={'确定'} cancelText={'取消'}>
          <Radio.Group onChange={this.onChangeRadio} value={this.state.value}>
            <Radio value={1} style={radioStyle}>一栏数据</Radio>
            <Radio value={2} style={radioStyle}>二栏数据</Radio>
            <Radio value={3} style={radioStyle}>三栏数据</Radio>
            <Radio value={4} style={radioStyle}>四栏数据</Radio>
            <Radio value={5} style={radioStyle}>五栏数据</Radio>
          </Radio.Group>
        </Modal>
      </div>
    )
  }
}