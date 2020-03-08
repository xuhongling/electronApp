import monitorRule from 'static/monitorRule'
const yAxisOption = (data:any[], chartColorList:any)=> {
	let legendData:any[] = data
	let yAxisOptionData:any[] = []
	for (let i = 0; i < legendData.length; i++) {
    let unitName:any = ''
    for (var j = 0; j < monitorRule.length; j++) {
      if (monitorRule[j].name === legendData[i]) {
        unitName = monitorRule[j].unit
      }
    }
    if (unitName === '°') {
      unitName = '度'
    }else{
      unitName = ''
    }

		let option = {
      type: 'value',
      name: unitName,
      position: 'left',
      offset: i*60,
      axisLine: {
        lineStyle: {
          color: "#c6c9cd",
          //color: chartColorList[i],
        }
      },
      splitLine :{
      	lineStyle:{ 
      		type:'dashed',
      		color: "#777"
      	}
      } 
    }
		yAxisOptionData.push(option)
	}
	return (
		yAxisOptionData
	)
}

export default yAxisOption 