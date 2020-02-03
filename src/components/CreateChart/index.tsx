import React from 'react'
import echarts from 'echarts'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState, actions } from '@/store'
import { Button } from 'antd'
import styles from './style.less'

type Props = ReturnType<typeof bindActionCreators>
type State = {
  option: {} | null,
  myChart: any
}

// @ts-ignore: 不可达代码错误。 用装饰器简写方式
@connect(
  (state: RootState) => ({ isAuth: state.user.isAuthenticated }),
  dispatch => ({
    ...bindActionCreators(
      {
        logIn: () => actions.user.logIn(),
        setUsername: (username: string) => actions.user.setUsername(username)
      },
      dispatch
    )
  })
)
export default class CreateChart extends React.Component<Props,State> {
  myRefChart: React.RefObject<HTMLDivElement>
  contextMenu: React.RefObject<HTMLDivElement>
  /*private myRefChart = React.createRef<HTMLDivElement>()
  private contextMenu = React.createRef<HTMLDivElement>()*/
  
  constructor(props: any) {
    super(props)
    this.myRefChart = React.createRef()
    this.contextMenu = React.createRef()
    this.state = {
      option: null,
      myChart: null
    }
  }

  componentDidMount() {
    document.oncontextmenu = (e)=> {
      return false;
    }
    setTimeout(()=>{
      this.initChart()
    },100)
  }

  initChart(){
    let myRefChart:any = this.myRefChart.current
    let myChart = echarts.init(myRefChart)
    let option:any = null
    option = {
      color: ['#FF6900','#fcb900', '#7BDCB5', '#F44336', '#03a9f4','#0693E3', '#EB144C', '#F78DA7','#9900EF'],
      title: {
        text: '折线图堆叠'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
      },
      grid: {
        left: 120,
        right: '4%',
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
        data: ['周一','周二','周三','周四','周五','周六','周日']
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
          }
        },{
          type: 'value',
          name: '联盟广告',
          position: 'left',
          offset: 70
        },{
          type: 'value',
          name: '视频广告',
          position: 'left',
          offset: 140
        }
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

    myChart.on('click', (params: { color: string; })=> {
      let contextMenu:any = this.contextMenu.current
      contextMenu.style.display = 'none'
      console.log(params)
      params.color = '#ff0000'
      //option.series[2].itemStyle.color = '#ff00ff'
      console.log(option.series[0].itemStyle.color)
      option.series[0].itemStyle.color = '#00A4FF'
      myChart.setOption(option,false)
    })
    myChart.on('contextmenu', (params:any)=> {
      params.event.event.preventDefault()
      let contextMenu:any = this.contextMenu.current
      contextMenu.style.display = 'block'
      contextMenu.style.left = params.event.offsetX + 'px'
      contextMenu.style.top = params.event.offsetY + 'px'
      
      var pointInPixel= [params.offsetX, params.offsetY]
      if (myChart.containPixel('grid',pointInPixel)) {
        console.log('dasda')
      }
    })
  }

  handleClickAddY = ()=>{
    console.log(this.state.option)
    let option:any = this.state.option
    option.yAxis = [
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
        }
      },{
        type: 'value',
        name: '联盟广告',
        position: 'left',
        offset: 70
      },{
        type: 'value',
        name: '视频广告',
        position: 'left',
        offset: 140
      },{
        type: 'value',
        name: '直接访问',
        position: 'left',
        offset: 210
      },{
        type: 'value',
        name: '搜索引擎',
        position: 'left',
        offset: 280
      }
    ]
    option.series = [
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
      },
      {
        name:'直接访问',
        type:'line',
        stack: '总量',
        yAxisIndex:'3',
        data:[320, 332, 301, 334, 390, 330, 320]
      },
      {
        name:'搜索引擎',
        type:'line',
        stack: '总量',
        yAxisIndex:'4',
        data:[820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
    option.grid.left = option.yAxis.length * 40
    console.log(this.state.myChart,option)
    let myChart:any = this.state.myChart
    myChart.setOption(option, true)
  }

  public render() {
    return (
      <div className={styles.createChart}>
        <div className={styles.controlBtn}>
          <Button onClick={this.handleClickAddY}>添加Y轴</Button>
        </div>
        <div className={styles.container} ref={this.myRefChart}></div>
        <div className={styles.contextmenu} ref={this.contextMenu}>
          <h2 className={styles.setColorTitle}>设置颜色</h2>
          <div className={styles.contextmenuContent}>
            hfhfhf
          </div>
        </div>
      </div>
    )
  }
}