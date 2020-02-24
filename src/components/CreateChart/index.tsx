import React from 'react'
import echarts from 'echarts'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState, actions } from '@/store'
import yAxisOption from './chartOption/yAxisOption'
import seriesOption from './chartOption/seriesOption'
import styles from './style.less'

type Props = ReturnType<typeof bindActionCreators>
type State = {
  option: {} | null,
  myChart: any,
  legendData: any[]
}

// @ts-ignore: 不可达代码错误。 用装饰器简写方式
@connect(
  (state: RootState) => ({ 
    legendData: state.legendData.legendData,
    chartData: state.chartData.chartData,
    chartColorList: state.chartColorList.chartColorList
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
export default class CreateChart extends React.Component<Props,State> {
	myRefChart: React.RefObject<HTMLDivElement>

  constructor(props:any) {
    super(props)
    this.myRefChart = React.createRef()
    this.state = {
      option: null,
      myChart: null,
      legendData: []
    }
  }

  componentDidMount() {
  	document.oncontextmenu = (e)=> {
      return false;
    }
    setTimeout(()=>{
      this.initChart()
      window.onresize = ()=>{
        this.state.myChart.resize()
      }
    },100)
  }
  static getDerivedStateFromProps(props:any, state:any) {
    console.log(props,state,'props state')
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
    const { legendData, chartColorList, chartData } = prevProps
    console.log(chartData,'chartData11')
    // 判断legendData跟颜色有没有改变，有就更新图表
    if (this.props.legendData !== legendData || this.props.chartColorList !== chartColorList) {
      this.initChart()
    }
  }

  initChart(){
		let myRefChart:any = this.myRefChart.current
    let myChart = echarts.init(myRefChart)
    // 全把 eChart 对象放到store全局，方便访问
    this.props.setGlobalChart(myChart)
    let option:any = null
    option = {
      color: this.props.chartColorList,
      tooltip: {
        trigger: 'axis' 
      },
      legend: {
        data: this.state.legendData,
        top: 18,
        textStyle: {
          color: "#c6c9cd"
        }
      },
      grid: {
      	top: 64,
        left: this.state.legendData.length*30,
        right: 40,
        bottom: 55,
        containLabel: true
      },
      toolbox: {
        show: true,
        feature: {
          magicType: {show: true, type: ['stack', 'tiled']},
          saveAsImage: {show: true}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['19:11:00','19:11:05','19:11:10','19:11:15','19:11:20','19:11:25','19:11:30','19:11:35','19:11:40','19:11:45','19:11:50','19:11:55','19:11:60','19:12:05'],
        axisLine: {
          lineStyle: {
            color: "#c6c9cd",
          }
        },
      },
      yAxis: yAxisOption(this.state.legendData, this.props.chartColorList),
      series: seriesOption(this.state.legendData, this.props.chartData, this.props.chartColorList),
      dataZoom: [
        {
          type: 'inside',
          realtime: true,
          xAxisIndex: 0,
          bottom: 16,
          start: 0,
          end: 100
        }, {
          type: 'slider',
          show: true,
          realtime: true,
          xAxisIndex: 0,
          bottom: 16,
          start: 0,
          end: 100
        }
      ]
    }
    this.setState({option,myChart})
    if (option && typeof option === "object") {
      myChart.setOption(option, true)
    }
  }

  public render() {
    return (
      <div className={styles.createChart}>
        <div className={styles.container} ref={this.myRefChart}></div>
      </div>
    )
  }
}