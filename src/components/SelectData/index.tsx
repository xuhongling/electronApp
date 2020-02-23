import React from 'react'
import { Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { RootState, actions } from '@/store'
import { bindActionCreators } from 'redux'
import monitorRule from 'static/monitorRule'
import styles from './style.less'

const { Option } = Select

type Props = ReturnType<typeof bindActionCreators>
type State = {
	selectNumber: any[],
	selectDataList: any[],
	selectValue: any[],
	selectOptionData: any[]
}
// @ts-ignore: 不可达代码错误。 用装饰器简写方式
@connect(
  (state: RootState) => ({ 
  	fileData: state.chartData.chartData,
  	selectData: state.selectData.selectData
  }),
  dispatch => ({
    ...bindActionCreators(
      {
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
			selectValue: [],
			selectNumber: ['a','b','c']
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
		let selectValue = []
		for (let i = 0; i < selectOptionData.length; i++) {
			selectValue.push(selectOptionData[i][0].name)
		}
		this.setState({selectDataList, selectOptionData, selectValue})
	}
	handleFocusData = (index:number)=> {
		console.log(index)
	}
	handleChangeData = (value:any, option:any)=> {
	  console.log(`selected ${value}`,option)
	}
	handleClickAdd = ()=> {
		let selectNumber = this.state.selectNumber
		if (selectNumber.length < 5 ) {
			selectNumber.push('d')
		}
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
			  	this.state.selectValue.length !==0 ? this.state.selectNumber.map((itemList,index)=>{
			  		return (
							<Select 
								showSearch
								allowClear
								value={this.state.selectValue[index]}
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