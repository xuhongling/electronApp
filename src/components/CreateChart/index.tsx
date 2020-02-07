import React from 'react'
import echarts from 'echarts'
import yAxisCommon from './yAxisCommon'
import styles from './style.less'

type Props = {}
type State = {
  option: {} | null,
  myChart: any
}

export default class CreateChart extends React.Component<Props,State> {
	myRefChart: React.RefObject<HTMLDivElement>

  constructor(props:any) {
    super(props)
    this.myRefChart = React.createRef()
    this.state = {
      option: null,
      myChart: null
    }
  }

  componentDidMount() {
  	yAxisCommon()
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

  initChart(){
		let myRefChart:any = this.myRefChart.current
    let myChart = echarts.init(myRefChart)
    let option:any = null
    option = {
      color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42'],
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data:['邮件营销','联盟广告','视频广告'],
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
      yAxis: [
        {
          type: 'value',
          name: '邮件营销',
          position: 'left',
          itemStyle: {
            normal:{
              color:'#2C9AFB'
            },
            emphasis:{
              color:'#9EE734'
            }
          },
          axisLine: {
            lineStyle: {
              color: "#c6c9cd",
            }
          },
          splitLine :{ lineStyle:{ type:'dashed',color: "#777" } } 
        },{
          type: 'value',
          name: '联盟广告',
          position: 'left',
          offset: 70,
          axisLine: {
            lineStyle: {
              color: "#c6c9cd",
            }
          },
          splitLine :{ lineStyle:{ type:'dashed',color: "#777" } } 
        },{
          type: 'value',
          name: '视频广告',
          position: 'left',
          offset: 140,
          axisLine: {
            lineStyle: {
              color: "#c6c9cd",
            }
          },
          splitLine :{ lineStyle:{ type:'dashed',color: "#777" } } 
        },
      ],
      series: [
        {
          name:'邮件营销',
          type:'line',
          stack: '总量',
          yAxisIndex:'0', //使用第一个y轴，序号从0开始
          data:[120, 132, 101, 134, 90, 230, 210],
          itemStyle: {
            color: "red",
          },
        },
        {
          name:'联盟广告',
          type:'line',
          stack: '总量',
          yAxisIndex:'1', //使用第二个y轴
          data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
          name:'视频广告',
          type:'line',
          stack: '总量',
          yAxisIndex:'2',
          data:[150, 232, 201, 154, 190, 330, 410]
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