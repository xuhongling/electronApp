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
      /*show: SelectedData[legendData[i]] !== false ? true : false,*/
      show: true,
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
          color: "#bbb"
        }
      },
      min: (value:any)=> {
         if (value.min === Infinity) {
           return 0
         }else{
           return value.min
         }
      },
      max: (value:any)=> {
         if (value.max === -Infinity) {
           return 100
         }else{
           return value.max + 10
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