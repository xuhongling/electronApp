import React from 'react'
import echarts from 'echarts'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState, actions } from '@/store'
import yAxisOption from './chartOption/yAxisOption'
import seriesOption from './chartOption/seriesOption'
import styles from './style.less'

// type Props = ReturnType<typeof bindActionCreators> & {columnData: any}
type Props = ReturnType<typeof bindActionCreators>
type State = {
  option: {} | null,
  myChart: any,
  legendData: any[],
  chartData: any[]
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
      legendData: [],
      chartData: []
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
    const { legendData, chartData } = props
    // 当传入的type发生变化的时候，更新state
    if (legendData !== null && legendData.length > 0) {
      return {
        legendData: legendData,
        chartData: chartData
      }
    }
    // 否则，对于state不进行任何操作
    return null
  }
  componentDidUpdate(prevProps:any, prevState:any) {
    const { legendData, chartColorList } = prevProps
    // 判断legendData跟颜色有没有改变，有就更新图表
    if (this.props.legendData !== legendData || this.props.chartColorList !== chartColorList) {
      this.initChart()
      this.getTimeData()
    }
  }

  // 获取时间轴数据
  getTimeData = ()=> {
    let chartData:any = this.state.chartData
    let timeData:any = []
    if (typeof(chartData) === 'undefined' || chartData.length < 1) {
      return timeData
    }
    for (let i = 0; i < chartData.length; i++) {
      timeData.push(chartData[i].time)
    }
    if (timeData.length > 1) {
      // 时间排序
      timeData.sort((a,b) => {
        return a > b ? 1 : - 1
      })
    }
    return [...new Set(timeData)]
  }

  initChart = ()=> {
    let chartData = this.props.chartData
    let timeData = this.getTimeData()
    if (typeof(chartData) === 'undefined' || chartData.length < 1) {
      return
    }
    // 创建 eChart
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
        data: timeData,
        axisLine: {
          lineStyle: {
            color: "#c6c9cd",
          }
        },
      },
      yAxis: yAxisOption(this.state.legendData, this.props.chartColorList),
      series: seriesOption(this.state.legendData, chartData, timeData, this.props.chartColorList),
      dataZoom: [
        {
          type: 'inside',
          realtime: true,
          xAxisIndex: 0,
          bottom: 16,
          start: 0,
          end: 3
        }, {
          type: 'slider',
          show: true,
          realtime: true,
          xAxisIndex: 0,
          bottom: 16,
          start: 0,
          end: 3
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