import React from 'react'
import echarts from 'echarts'
import styles from './style.module.scss'

export default class HomePage extends React.Component {

	constructor(props) {
		super(props)
		this.myRefChart = React.createRef()
		this.contextMenu = React.createRef()
	}

	componentDidMount(){
		this.initChart()
	}

	initChart(){
		let myRefChart = this.myRefChart.current
		let myChart = echarts.init(myRefChart)
		let option = null
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
				left: '150',
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
				},
				{
					name:'直接访问',
					type:'line',
					stack: '总量',
					data:[320, 332, 301, 334, 390, 330, 320]
				},
				{
					name:'搜索引擎',
					type:'line',
					stack: '总量',
					data:[820, 932, 901, 934, 1290, 1330, 1320]
				}
			]
		}
		if (option && typeof option === "object") {
			myChart.setOption(option, true)
		}

		myChart.on('click', (params)=> {
			let contextMenu = this.contextMenu.current
			contextMenu.style.display = 'none'
		  console.log(params)
		  params.color = '#ff0000'
		  //option.series[2].itemStyle.color = '#ff00ff'
		  console.log(option.series[0].itemStyle.color)
		  option.series[0].itemStyle.color = '#00A4FF'
		  myChart.setOption(option,false)
		})
		myChart.on('contextmenu', (params)=> {
			params.event.event.preventDefault()
			let contextMenu = this.contextMenu.current
			contextMenu.style.left = params.event.offsetX + 'px';
    	contextMenu.style.top = params.event.offsetY + 'px';
		})
	}

	render() {
		return (
			<div className={styles.homePage}>
				<div className={styles.container} ref={this.myRefChart}></div>
				<div className={styles.contextmenu} ref={this.contextMenu}>
					<h2 className={styles.setColorTitle}>设置颜色</h2>
					<div className={styles.contextmenuContent}>
						
					</div>
				</div>
			</div>
		)
	}
}