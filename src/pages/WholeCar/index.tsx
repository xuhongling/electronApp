import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState, actions } from '@/store'
import CreateChart from 'components/CreateChart'
import ColorPickers from 'components/ColorPickers'
import fileData from 'static/fileData'
import monitorRule from 'static/monitorRule'
import styles from './style.less'

type Props = ReturnType<typeof bindActionCreators>
type State = {}
// @ts-ignore: 不可达代码错误。 用装饰器简写方式
@connect(
  (state: RootState) => ({
    fileData: state.fileData.fileData,
    legendData: state.legendData.legendData,
  }),
  dispatch => ({
    ...bindActionCreators(
      {
        setGlobalChart: (globalChart: object) => actions.globalChart.setGlobalChart(globalChart)
      },
      dispatch
    )
  })
)
export default class WholeCar extends React.Component<Props,State> {

	constructor(props:any) {
		super(props)
	}

	componentDidMount() {
		for (let i = 0; i < fileData.length; i++) {
			let canId:any = fileData[i].ID号
			for (let j = 0; j < monitorRule.length; j++) {
				let can_id:any =monitorRule[j].can_id
				if (can_id === canId) {
					//console.log(monitorRule[j].name,'sss')
					if (monitorRule[j].name==='1桥转角') {
						console.log(parseInt(fileData[i].时间标识),'111')
					}
				}
			}
		}
	}

	public render() {
		return (
			<div className={styles.wholeCar}>
				<CreateChart/>
				<ColorPickers/>
			</div>
		)
	}
}