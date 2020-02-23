import React from 'react'
import { Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { RootState, actions } from '@/store'
import { bindActionCreators } from 'redux'
import monitorRule from 'static/monitorRule'
import styles from './style.less'

const { Option, OptGroup } = Select

type Props = ReturnType<typeof bindActionCreators>
type State = {
	selectNumber: any[],
	selectData: object
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
			selectData: {
				wholeCarData: [],
				electricMachineryData: [],
				faultData: [],
				highVoltageData: [],
				batteryData: [],
				RCUData: [],
				handheldControlData: [],
				EBSData: [],
				informationData: []
			},
			selectNumber: [
				{ title: '1111' },
				{ title: '2222' },
				{ title: '3333' }
			]
		}
	}

	componentDidMount() {
		let wholeCarData =  []
		let electricMachineryData =  []
		let faultData =  []
		let highVoltageData =  []
		let batteryData =  []
		let RCUData =  []
		let handheldControlData =  []
		let EBSData =  []
		let informationData =  []
		for (var i = 0; i < monitorRule.length; i++) {
			if (monitorRule[i].type_name === '整车') {
				wholeCarData.push(monitorRule[i])
			}
			if (monitorRule[i].type_name === '电机') {
				electricMachineryData.push(monitorRule[i])
			}
			if (monitorRule[i].type_name === '故障') {
				faultData.push(monitorRule[i])
			}
			if (monitorRule[i].type_name === '高压附件') {
				highVoltageData.push(monitorRule[i])
			}
			if (monitorRule[i].type_name === '电池') {
				batteryData.push(monitorRule[i])
			}
			if (monitorRule[i].type_name === 'RCU') {
				RCUData.push(monitorRule[i])
			}
			if (monitorRule[i].type_name === '手持遥控') {
				handheldControlData.push(monitorRule[i])
			}
			if (monitorRule[i].type_name === 'EBS') {
				EBSData.push(monitorRule[i])
			}
			if (monitorRule[i].type_name === '惯导信息') {
				informationData.push(monitorRule[i])
			}
		}
		this.setState({
			selectData: {
				wholeCarData,
				electricMachineryData,
				faultData,
				highVoltageData,
				batteryData,
				RCUData,
				handheldControlData,
				EBSData,
				informationData
			}
		},()=>{
			console.log(this.state.selectData,'selectData')
		})
	}

	handleChangeData = (value:any)=> {
	  console.log(`selected ${value}`)
	}
	handleClickAdd = ()=> {
		let selectNumber = this.state.selectNumber
		if (selectNumber.length < 5 ) {
			selectNumber.push({title: '4444'})
		}
		this.setState({
			selectNumber
		})
	}


	public render() {
		return (
			<div className={styles.selectData}>
				
			  {
			  	this.state.selectNumber.map((item,index)=>{
			  		return (
							<Select showSearch allowClear placeholder="Select a person" optionFilterProp="children" onChange={this.handleChangeData} key={index}>
						    <OptGroup label="Manager">
						      <Option value="jack">{item.title}</Option>
						      <Option value="lucy">Lucy</Option>
						    </OptGroup>
						    <OptGroup label="Engineer">
						      <Option value="Yiminghe">yiminghe</Option>
						    </OptGroup>
						  </Select>
			  		)
			  	})
			  }
			  <PlusOutlined className={styles.addIcon} onClick={this.handleClickAdd}/>
			</div>
		)
	}
}