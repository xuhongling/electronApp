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
  myChart: any,
  legendData: any[],
  chartData: any[],
  chartColorList: any[],
  chartOption: any
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
      myChart: null,
      legendData: [],
      chartData: [],
      chartColorList: [],
      chartOption: null
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
    const { legendData, chartData, chartColorList } = props
    // 当传入的type发生变化的时候，更新state
    if (typeof(legendData) !== 'undefined' && legendData.length > 0) {
      return {
        legendData: legendData,
        chartData: chartData,
        chartColorList: chartColorList
      }
    }
    // 否则，对于state不进行任何操作
    return null
  }

  componentDidUpdate(prevProps:any, prevState:any) {
    const { chartColorList } = prevProps
    // 判断legendData跟颜色有没有改变，有就更新图表
    if (this.state.myChart !== null || this.props.chartColorList !== chartColorList) {
      let option = this.setChartOption()
      if (option && typeof option === "object") {
        this.state.myChart.setOption(option, true)
      }
    }
  }

  // 获取时间轴数据
  getTimeData = ()=> {
    let chartData:any = this.state.chartData
    let legendDataArr = this.state.legendData
    let timeData:any = []
    if (typeof(chartData) === 'undefined' || chartData.length < 1) {
      return timeData
    }
    for (let j = 0; j < legendDataArr.length; j++) {
      for (let i = 0; i < chartData.length; i++) {
        if (legendDataArr[j] === chartData[i].selectName) {
          timeData.push(chartData[i].time)
        }
      }
    }
    if (timeData.length > 1) {
      // 时间排序
      timeData.sort((a:any, b:any) => {
        return a > b ? 1 : - 1
      })
    }
    return [...new Set(timeData)]
  }

  // 初始化图表
  initChart = ()=> {
    // 创建 eChart
		let myRefChart:any = this.myRefChart.current
    let myChart = echarts.init(myRefChart)
    // 全把 eChart 对象放到store全局，方便访问
    this.props.setGlobalChart(myChart)
    this.setState({myChart},()=>{
      let option = this.setChartOption()
      if (option && typeof option === "object") {
        this.state.myChart.setOption(option, true)
      }
    })

    /* 选中图例 */
    myChart.on("legendselectchanged", (params:any)=> {
      // 得到当前的图例显示隐藏状态分别有哪些
      console.log(params,'1111111')
      let SelectedData = params.selected
      let option = this.setChartOption(SelectedData)
      if (option && typeof option === "object") {
        myChart.setOption(option, true)
      }
    })
  }
  // 图表配置
  setChartOption = ( SelectedData = {} )=>{
    let chartData = this.state.chartData
    let timeData = this.getTimeData()
    if (typeof(chartData) === 'undefined') {
      return
    }

    if (timeData.length === 0) {
      timeData = ["00:00:00", "00:00:01", "00:00:02", "00:00:03", "00:00:04", "00:00:05", "00:00:06", "00:00:07", "00:00:08", "00:00:09", "00:00:10", "00:00:11", "00:00:12", "00:00:13", "00:00:14", "00:00:15", "00:00:16", "00:00:17", "00:00:18", "00:00:20", "00:00:20", "00:00:21", "00:00:22", "00:00:23", "00:00:24", "00:00:25", "00:00:26", "00:00:27", "00:00:28", "00:00:29", "00:00:30", "00:00:31", "00:00:32", "00:00:33", "00:00:34", "00:00:35", "00:00:36", "00:00:37", "00:00:38", "00:00:39", "00:00:40", "00:00:41", "00:00:42", "00:00:43", "00:00:44", "00:00:45", "00:00:46", "00:00:47", "00:00:48", "00:00:49", "00:00:50", "00:00:51", "00:00:52", "00:00:53", "00:00:54", "00:00:55", "00:00:56", "00:00:57", "00:00:58", "00:00:59","00:01:00", "00:01:01", "00:01:02", "00:01:03", "00:01:04", "00:01:05", "00:01:06", "00:01:07", "00:01:08", "00:01:09", "00:01:10", "00:01:11", "00:01:12", "00:01:13", "00:01:14", "00:01:15", "00:01:16", "00:01:17", "00:01:18", "00:01:20", "00:01:20", "00:01:21", "00:01:22", "00:01:23", "00:01:24", "00:01:25", "00:01:26", "00:01:27", "00:01:28", "00:01:29", "00:01:30", "00:01:31", "00:01:32", "00:01:33", "00:01:34", "00:01:35", "00:01:36", "00:01:37", "00:01:38", "00:01:39", "00:01:40", "00:01:41", "00:01:42", "00:01:43", "00:01:44", "00:01:45", "00:01:46", "00:01:47", "00:01:48", "00:01:49", "00:01:50", "00:01:51", "00:01:52", "00:01:53", "00:01:54", "00:01:55", "00:01:56", "00:01:57", "00:01:58", "00:01:59","00:02:00", "00:02:01", "00:02:02", "00:02:03", "00:02:04", "00:02:05", "00:02:06", "00:02:07", "00:02:08", "00:02:09", "00:02:10", "00:02:11", "00:02:12", "00:02:13", "00:02:14", "00:02:15", "00:02:16", "00:02:17", "00:02:18", "00:02:20", "00:02:20", "00:02:21", "00:02:22", "00:02:23", "00:02:24", "00:02:25", "00:02:26", "00:02:27", "00:02:28", "00:02:29", "00:02:30", "00:02:31", "00:02:32", "00:02:33", "00:02:34", "00:02:35", "00:02:36", "00:02:37", "00:02:38", "00:02:39", "00:02:40", "00:02:41", "00:02:42", "00:02:43", "00:02:44", "00:02:45", "00:02:46", "00:02:47", "00:02:48", "00:02:49", "00:02:50", "00:02:51", "00:02:52", "00:02:53", "00:02:54", "00:02:55", "00:02:56", "00:02:57", "00:02:58", "00:02:59"]
    }

    let legendData = ()=>{
      let legendDataArr = this.state.legendData
      let legendDataOption = []
      for (let i = 0; i < legendDataArr.length; i++) {
        let legendOption = {
          name: legendDataArr[i],
          textStyle:{
            color: this.state.chartColorList[i]
          }
        }
        legendDataOption.push(legendOption)
      }
      return legendDataOption
    }

    let option:any = null
    option = {
      color: this.state.chartColorList,
      tooltip: {
        trigger: 'axis' 
      },
      legend: {
        data: legendData(),
        top: 16,
        selected: SelectedData,
      },
      grid: {
        top: 60,
        left: this.state.legendData.length * 40,
        right: 30,
        bottom: 40,
        containLabel: true
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          saveAsImage: {show: true}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: timeData,
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: "#111",
          }
        },
      },
      yAxis: yAxisOption(this.state.legendData, this.state.chartColorList, SelectedData, chartData),
      series: seriesOption(this.state.legendData, chartData, timeData, this.state.chartColorList, SelectedData),
      dataZoom: [
        {
          type: 'inside',
          realtime: true,
          xAxisIndex: 0,
          bottom: 16,
          start: 0,
          end: 100,
          height: 14
        }, {
          type: 'slider',
          show: true,
          realtime: true,
          xAxisIndex: 0,
          bottom: 16,
          start: 0,
          end: 100,
          height: 14
        }
      ]
    }
    return option
  }

  public render() {
    return (
      <div className={styles.createChart}>
        <div className={styles.container} ref={this.myRefChart}></div>
      </div>
    )
  }
}