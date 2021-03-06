import monitorRuleData from 'static/monitorRule'
import monitorRuleSH from 'static/monitorRuleSH'

const yAxisOption = (data:any[], chartColorList:any, SelectedData:any, chartData:any, chartSizeValue:any[])=> {
	let legendData:any[] = data
	let yAxisOptionData:any[] = []
  
  // 解析规则
  let monitorRule:any[] = []
  let rule = sessionStorage.getItem('monitorRule')
  if (rule === 'monitorRuleSH') {
    monitorRule = monitorRuleSH
  }else{
    monitorRule = monitorRuleData
  }

  // 计算Y轴显示数据，设置每个的 offset
  let offsetData = []
  for (let i = 0; i < legendData.length; i++) {
    if (JSON.stringify(SelectedData) !== "{}" && SelectedData[legendData[i]]) {
      let data = {
        title: legendData[i],
        num: i
      }
      offsetData.push(data)
    }
  }
  let offsetIndex = {}
  for (let i = 0; i < offsetData.length; i++) {
    let title = offsetData[i].title
    offsetIndex[title] = i
  }

  // 设置 Y轴 的 Option
	for (let i = 0; i < legendData.length; i++) {
    let intervalData:number = 0
    let chartDataMax = []
    let unitName:any = ''
    for (let j = 0; j < monitorRule.length; j++) {
      if (monitorRule[j].name === legendData[i]) {
        unitName = monitorRule[j].unit
      }
    }

    for (let n = 0; n < chartData.length; n++) {
      if (chartData[n].selectName === legendData[i]) {
        chartDataMax.push(chartData[n].data)
      }
    }
    intervalData = Number((Math.max(...chartDataMax) * 1.2).toFixed(2))
    if (intervalData === -Infinity || intervalData === 0) {
      intervalData = 2
    }
    if (chartSizeValue.length > 0) {
      intervalData = chartSizeValue[i][1]
    }

    if (unitName === '°') {unitName = '度'}
    if (unitName === '') {unitName = ' '}

    let option = {
      type: 'value',
      name: `${legendData[i]}     ${unitName}`,
      nameLocation: 'middle',
      triggerEvent: true,
      nameTextStyle:{
        color: chartColorList[i], 
        verticalAlign: 'bottom',
        fontSize: 12,  
        padding: [8, 8, 10, 8]
      },
      position: 'left',
      offset: i * 58,
      show: SelectedData[legendData[i]] !== false ? true : false, // 显示隐藏 图例 跟 Y轴
      axisLine: {
        lineStyle: {
          color: chartColorList[i],
        }
      },
      axisTick: {
        show: true,
      },
      splitLine :{
        lineStyle:{ 
          type:'dashed',
          color: "#ddd"
        }
      },
      min: (value:any)=> {
        if (chartSizeValue.length > 0) {
          return chartSizeValue[i][0]
        }else{

        }
      },
      max: (value:any)=> {
        if (chartSizeValue.length > 0) {
          return chartSizeValue[i][1]
        }else{
          if (value.max === -Infinity || value.max === 0) {
            return 2
          }else{
            return Number((value.max * 1.2).toFixed(2))
          }
        }
      },
      splitNumber: 10,
      interval: intervalData / 10,
      nameRotate: 90,
      axisLabel: {
        rotate: 90,
        formatter: (value:any)=> {
          if (Number.isInteger(value)) {
            return value
          }else{
            if (value > 100) {
              return parseInt(value)
            }else {
              return value.toFixed(2)
            }
          }
        }
      }
    }
    // 设置Y轴的位置间隔
    if (offsetData.length !== 0) {
      let num = 0
      if (offsetIndex[legendData[i]] !== undefined) {
        num = offsetIndex[legendData[i]]
      }
      option.offset = num * 58
    }else{
      option.offset = i * 58
    }
    yAxisOptionData.push(option)
  }
  if (data.length === 0) {
    yAxisOptionData.push({ type: 'value' })
  }
	return (
		yAxisOptionData
	)
}

export default yAxisOption