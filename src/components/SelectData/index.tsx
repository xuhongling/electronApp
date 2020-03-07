import React from 'react'
import { Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
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
	selectOptionIndex: number
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
			selectNumber: ['a','b','c']
		}
	}
	componentDidMount() {
		this.handleChangeSelectData('整车')
		/*let chartData = [
      [0, 0, 1, 1, 0, 0, 0, 2, 2, 0, 0, 3, 3, 3],
      [220, 182, 191, 234, 290, 300, 310, 234, 290, 330, 310, 234, 290, 330],
      [150, 232, 201, 154, 190, 330, 410, 350, 332, 301, 354, 290, 330, 310]
    ]
    this.props.setChartData(chartData)*/
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
	  /*let chartData = [
      [2, 12, 10, 14, 20, 15, 18, 19, 17, 16, 14, 9, 12, 11],
      [220, 182, 191, 234, 290, 300, 310, 234, 290, 330, 310, 234, 290, 330],
      [150, 232, 201, 154, 190, 330, 410, 350, 332, 301, 354, 290, 330, 310],
      [120, 132, 101, 154, 190, 130, 110, 120, 132, 101, 154, 190, 130, 110],
      [140, 222, 171, 194, 150, 220, 250, 140, 222, 171, 194, 150, 220, 200]
    ]*/

	  // 传入三个值，当前栏目名称，选择栏数据，CSV总数据
	  let fileData:any = this.props.fileData
		let chartData:any = getColumnData(typeName, legendData, fileData)
		this.props.setChartData(chartData)

		console.log(chartData,'SelectData里面的chartData')
		/*let timeData = []
		for (let i = 0; i < columnData.length; i++) {
			timeData.push(columnData[i].time)
		}
		if (timeData.length > 1) {
			timeData.sort((a,b) => {
	      return a > b ? 1 : - 1
	    })
	    console.log([...new Set(timeData)],'时间排序去重')
		}*/

		/*console.log(legendData,columnData,'legendData')
		let aaa:any = []
		for (let i = 0; i < legendData.length; i++) {
			for (let j = 0; j < columnData.length; j++) {
				if (legendData[i] === columnData[j].selectName) {
					console.log(columnData[j],'12233434')
					for (let k = 0; k < timeData.length; k++) {
						if (columnData[j].time === timeData[k]) {
							aaa.push(columnData[j].data)
						}else{
							aaa.push('')
						}
					}
				}
			}
		}
		console.log(aaa,'aaaaaaaaa')*/
	}
	// 获取鼠标点击哪一个选择框
	handleFocusData = (index:number)=> {
		this.setState({ selectOptionIndex: index })
	}
	// 给选择框对应赋值
	handleChangeData = (value:any)=> {
		this.props.setLegendData([])
	  let legendData = this.state.legendData
	  let selectOptionIndex = this.state.selectOptionIndex
	  legendData[selectOptionIndex] = value
	  this.setState({legendData: legendData})
		// 设置图表Legend数据
	  this.props.setLegendData(legendData)
	}
	// 添加选择框
	handleClickAdd = ()=> {
		let typeName:any = this.props.selectData
		let selectNumber = this.state.selectNumber
		if (selectNumber.length < 5 ) {
			selectNumber.push('d')
		} else {
			return
		}
		this.handleChangeSelectData(typeName)
		this.setState({ selectNumber })
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

	public render() {
		return (
			<div className={styles.selectData}>
			  {
			  	this.state.legendData.length !==0 ? this.state.selectNumber.map((itemList,index)=>{
			  		return (
							<Select 
								showSearch
								allowClear
								value={this.state.legendData[index]}
								placeholder="请选择"
								optionFilterProp="children"
								onChange={this.handleChangeData}
								onFocus={()=>this.handleFocusData(index)}
								key={index}
							>
						    {
						    	this.state.selectOptionData.length !==0 ?
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
			  <PlusOutlined className={styles.addIcon} onClick={this.handleClickAdd}/>
			</div>
		)
	}
}