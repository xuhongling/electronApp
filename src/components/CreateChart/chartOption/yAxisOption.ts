const yAxisOption = (data:any[], chartColorList:any)=> {
	let legendData:any[] = data
	let yAxisOptionData:any[] = []
  console.log(chartColorList,'chartColorList')
	for (let i = 0; i < legendData.length; i++) {
		let option = {
      type: 'value',
      //name: legendData[i],
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