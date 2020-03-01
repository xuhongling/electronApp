import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '@/store'
import CreateChart from 'components/CreateChart'
import ColorPickers from 'components/ColorPickers'
import monitorRule from 'static/monitorRule'
import fileData from 'static/fileData'
import styles from './style.less'

type Props = ReturnType<typeof bindActionCreators>
type State = {
	ruleType: any[]
}

// @ts-ignore: 不可达代码错误。 用装饰器简写方式
@connect(
  (state: RootState) => ({
    fileData: state.fileData.fileData
  }),
  dispatch => ({
    ...bindActionCreators(
      {},
      dispatch
    )
  })
)
export default class Battery extends React.Component<Props,State> {

	constructor(props:any) {
		super(props)
		this.state = {
			ruleType: []
		}
	}

	componentDidMount() {
		let ruleType = []
		for (let i = 0; i < monitorRule.length; i++) {
			if (monitorRule[i].type_name === '电池') {
				ruleType.push(monitorRule[i])
			}
		}
		this.setState({ruleType},()=>{
			this.initData()
		})
	}

	initData = ()=> {
		let ruleType = this.state.ruleType
		for (let i = 0; i < ruleType.length; i++) {
			for (let j = 0; j < fileData.length; j++) {
				let canId:any = fileData[j].ID号
				if (ruleType[i].can_id === canId) {
					console.log(fileData[j],'fileData[j]')
				}
			}
		}
	}

	public render() {
		return (
			<div className={styles.battery}>
				<CreateChart/>
				<ColorPickers/>
			</div>
		)
	}
}