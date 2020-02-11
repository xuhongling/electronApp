import React from 'react'
import { connect } from 'react-redux'
import { RootState } from '@/store'
import { bindActionCreators } from 'redux'
import { SketchPicker } from 'react-color'
import classnames from 'classnames'
import styles from './style.less'

type Props = ReturnType<typeof bindActionCreators>
type State = {
	isShowColorPickers: boolean,
	background: any,
	globalChart: object | null
}

// @ts-ignore: 不可达代码错误。 用装饰器简写方式
@connect(
  (state: RootState) => ({
  	globalChart: state.globalChart.globalChart,
  	showColorPickers: state.showColorPickers.showColorPickers
  }),
  dispatch => ({})
)
export default class ColorPickers extends React.Component<Props,State> {
	colorPickers: React.RefObject<HTMLDivElement>

	constructor(props:any) {
		super(props)
		this.colorPickers = React.createRef()
		this.state = {
			isShowColorPickers: false,
			background: '#fff',
			globalChart: null
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
	  console.log(this.props.globalChart,'this.props.globalChart')
	  console.log(this.state.globalChart,'this.state.globalChart')
	  let globalChart:any = this.props.globalChart
	  globalChart.on('click', (params: { color: string })=> {
	  	console.log(params,'params')
	  	let aparams:any = params
	  	aparams.color = '#3DC150'
	  	//globalChart.setOption(aparams,false)
    })
    document.body.onclick = ()=> {
    	this.setState({isShowColorPickers: false})
    }
	  globalChart.on('contextmenu', (params:any)=> {
      params.event.event.preventDefault()
      let colorPickers:any = this.colorPickers.current
      colorPickers.style.left = params.event.offsetX + 'px'
      colorPickers.style.top = params.event.offsetY + 'px'
      this.setState({isShowColorPickers: true})
      
      var pointInPixel= [params.offsetX, params.offsetY]
      if (globalChart.containPixel('grid',pointInPixel)) {
        console.log('dasda')
      }
    })
	}

  handleChangeComplete = (color:any) => {
  	console.log(this.props.showColorPickers,'this.props.showColorPickers')
    this.setState({ background: color.hex })
  }

	public render() {
		return (
			<div className={classnames(styles.colorPickers, {[`${styles.showColorPickers}`]: this.state.isShowColorPickers})} ref={this.colorPickers}>
				<SketchPicker color={this.state.background} onChangeComplete={ this.handleChangeComplete } />
			</div>
		)
	}
}