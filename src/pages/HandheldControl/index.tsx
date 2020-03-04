import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '@/store'
import CreateChart from 'components/CreateChart'
import ColorPickers from 'components/ColorPickers'
import getColumnData from 'utils/getColumnData'
import getMsgData from 'utils/getMsgData'
import fileData from 'static/fileData'
import styles from './style.less'

type Props = ReturnType<typeof bindActionCreators>
type State = {
	legendData: any
}

// @ts-ignore: 不可达代码错误。 用装饰器简写方式
@connect(
  (state: RootState) => ({
    fileData: state.fileData.fileData,
    legendData: state.legendData.legendData,
  }),
  dispatch => ({
    ...bindActionCreators(
      {},
      dispatch
    )
  })
)
export default class HandheldControl extends React.Component<Props,State> {

	constructor(props:any) {
		super(props)
		this.state = {
			legendData: null
		}
	}

	componentDidMount() {
		console.log('手持遥控')
	}

	static getDerivedStateFromProps(props:any, state:any) {
    const { legendData } = props
    // 当传入的type发生变化的时候，更新state
    if (legendData !== null && legendData.length > 0) {
      return {
        legendData: legendData
      }
    }
    // 否则，对于state不进行任何操作
    return null
  }
	componentDidUpdate(prevProps:any, prevState:any) {
		console.log('dadadadadas')
	  // 判断是否更新了全局 eChart，典型用法（不要忘记比较 props）
	  const { legendData } = prevProps
	  console.log(this.state.legendData, legendData)
    if (legendData.length > 2) {
      this.changeChartData()
    }
	}

	changeChartData = ()=> {
		let legendData = this.state.legendData
		// 传入三个值，当前栏目名称，选择栏数据，CSV总数据
		let columnData = getColumnData('手持遥控', legendData, fileData)
		console.log(columnData,'手持遥控columnData')
		/*let aaa = []
		for (let i = 0; i < columnData.length; i++) {
			let data = getMsgData(columnData[i])
			aaa.push(data)
		}
		console.log(aaa,'11111')*/
	}

	public render() {
		return (
			<div className={styles.handheldControl}>
				<CreateChart/>
				<ColorPickers/>
			</div>
		)
	}
}