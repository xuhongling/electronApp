import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState, actions } from '@/store'
import { SketchPicker } from 'react-color'
import classnames from 'classnames'
import styles from './style.less'

type Props = ReturnType<typeof bindActionCreators>
type State = {
	isShowColorPickers: boolean,
	background: any,
	globalChart: object | null,
	seriesIndex: number
}

// @ts-ignore: 不可达代码错误。 用装饰器简写方式
@connect(
  (state: RootState) => ({
  	globalChart: state.globalChart.globalChart,
  	chartColorList: state.chartColorList.chartColorList
  }),
  dispatch => ({
    ...bindActionCreators(
      {
        setChartColorList: (chartColor: string[]) => actions.chartColorList.setChartColorList(chartColor)
      },
      dispatch
    )
  })
)
export default class ColorPickers extends React.Component<Props,State> {
	colorPickers: React.RefObject<HTMLDivElement>

	constructor(props:any) {
		super(props)
		this.colorPickers = React.createRef()
		this.state = {
			isShowColorPickers: false,
			background: '#fff',
			globalChart: null,
			seriesIndex: 0
		}
	}

	static getDerivedStateFromProps(nextProps:any) {
	  const { globalChart } = nextProps
	  if (globalChart !== null) {
	    return {
	      globalChart
	    }
	  }
	  return null
	}
	componentDidUpdate(prevProps:any, prevState:any) {
	  // 判断是否更新了全局 eChart，典型用法（不要忘记比较 props）
	  if (this.props.globalChart !== prevProps.globalChart) {
	    this.handleGlobalChart()
	  }
	}

	handleGlobalChart = ()=>{
	  let globalChart:any = this.props.globalChart
	  globalChart.on('contextmenu', (params:any)=> {
      params.event.event.preventDefault()
      this.setState({
      	isShowColorPickers: true,
      	seriesIndex: params.seriesIndex
      })
      
      let pointInPixel= [params.offsetX, params.offsetY]
      if (globalChart.containPixel('grid',pointInPixel)) {
        console.log('dasda')
      }
    })
	}
	handleClose = ()=> {
		this.setState({isShowColorPickers: false})
	}
	handleChangeColor = (color:any)=> {
		this.setState({ background: color.hex })
		let chartColor = ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42']
		chartColor[this.state.seriesIndex] = `${color.hex}`
		this.props.setChartColorList(chartColor)
	}

	public render() {
		return (
			<div className={classnames(styles.colorPickers, {[`${styles.showColorPickers}`]: this.state.isShowColorPickers})} ref={this.colorPickers}>
				<div className={styles.cover} onClick={ this.handleClose }/>
				<SketchPicker color={this.state.background} onChange={ this.handleChangeColor }/>
			</div>
		)
	}
}