import monitorRule from 'static/monitorRule'
const yAxisOption = (data:any[], chartColorList:any, SelectedData:any, chartData:any)=> {
	let legendData:any[] = data
	let yAxisOptionData:any[] = []

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
    if (unitName === '°') {unitName = '度'}
    let option = {
      type: 'value',
      name: `${legendData[i]}    ${unitName}`,
      nameLocation: 'middle',
      nameTextStyle:{
        color: chartColorList[i], 
        verticalAlign: 'bottom',
        fontSize: 12,  
        padding: [8, 8, 10, 8],
        /*backgroundColor: chartColorList[i] + '20',
        borderRadius: 4,*/
      },
      position: 'left',
      offset: i*58,
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
      /*min: (value:any)=> {
        if (value.min === Infinity) {
          return 0
        }else{
          return value.min
        }
      },*/
      max: (value:any)=> {
        if (value.max === -Infinity || value.max === 0) {
          return 2
        }else{
          return Number((value.max * 1.2).toFixed(2))
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