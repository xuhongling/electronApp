import monitorRule from 'static/monitorRule'
const yAxisOption = (data:any[], chartColorList:any, SelectedData:any)=> {
	let legendData:any[] = data
	let yAxisOptionData:any[] = []
	for (let i = 0; i < legendData.length; i++) {
    let unitName:any = ''
    for (var j = 0; j < monitorRule.length; j++) {
      if (monitorRule[j].name === legendData[i]) {
        unitName = monitorRule[j].unit
      }
    }

    let option = {
      type: 'value',
      name: legendData[i],
      position: 'left',
      offset: i*50,
      show: SelectedData[legendData[i]] !== false ? true : false,
      axisLine: {
        lineStyle: {
          color: chartColorList[i],
        }
      },
      splitLine :{
        lineStyle:{ 
          type:'dashed',
          color: "#555"
        }
      },
      nameRotate: 90,
      axisLabel: {
        rotate: 90,
        formatter: (value:any)=> {
          if (unitName === '°') {
            return value + '度'
          } else {
            return `${value} ${unitName}`
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