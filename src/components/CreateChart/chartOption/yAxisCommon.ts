const axisCommon = (data:any[])=> {
	let legendData:any[] = data
	let legendDataAll:any[] = []
	for (let i = 0; i < legendData.length; i++) {
		let option = {
      type: 'value',
      name: legendData[i],
      position: 'left',
      offset: i*70,
      axisLine: {
        lineStyle: {
          color: "#c6c9cd",
        }
      },
      splitLine :{
      	lineStyle:{ 
      		type:'dashed',
      		color: "#777"
      	}
      } 
    }
		legendDataAll.push(option)
	}
	return (
		legendDataAll
	)
}

export default axisCommon 