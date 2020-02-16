import React from 'react'
import echarts from 'echarts'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState, actions } from '@/store'
import yAxisCommon from './chartOption/yAxisCommon'
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
      legendData: ['邮件营销','联盟广告','视频广告']
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
  static getDerivedStateFromProps(nextProps:any) {
    const { chartData } = nextProps
    // 当传入的type发生变化的时候，更新state
    if (chartData !== null && chartData.length > 0) {
      return {
        legendData: chartData
      }
    }
    // 否则，对于state不进行任何操作
    return null
  }
  componentDidUpdate(prevProps:any, prevState:any) {
    if (this.props.chartData !== prevProps.chartData || this.props.chartColorList !== prevProps.chartColorList) {
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
        top: 16,
        textStyle: {
          color: "#c6c9cd"
        }
      },
      grid: {
      	top: 76,
        left: 150,
        right: 30,
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日'],
        axisLine: {
          lineStyle: {
            color: "#c6c9cd",
          }
        },
      },
      yAxis: yAxisCommon(this.state.legendData),
      series: [
        {
          name:'邮件营销',
          type:'line',
          stack: '总量',
          yAxisIndex:'0', //使用第一个y轴，序号从0开始
          data:[20, 32, 101, 134, 90, 230, 210],
          itemStyle: {
            color: (params:any)=> {
              let colorList = this.props.chartColorList
              return colorList[params.seriesIndex]
            }
          },
        },
        {
          name:'联盟广告',
          type:'line',
          stack: '总量',
          yAxisIndex:'1', //使用第二个y轴
          data:[220, 182, 191, 234, 290, 330, 310],
          itemStyle: {
            color: (params:any)=> {
              let colorList = this.props.chartColorList
              return colorList[params.seriesIndex]
            }
          },
        },
        {
          name:'视频广告',
          type:'line',
          stack: '总量',
          yAxisIndex:'2',
          data:[150, 232, 201, 154, 190, 330, 410],
          itemStyle: {
            color: (params:any)=> {
              let colorList = this.props.chartColorList
              return colorList[params.seriesIndex]
            }
          },
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