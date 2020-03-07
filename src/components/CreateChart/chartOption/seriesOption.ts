const seriesCommon = (legendData:any[], chartData:any, timeData:any, chartColorList:any)=> {
	let optionDataAll:any[] = []
	
	for (let i = 0; i < legendData.length; i++) {
		let arrayData:any = new Array(timeData.length)
		for (let j = 0; j < chartData.length; j++) {
			if (legendData[i] === chartData[j].selectName) {
				for (let k = 0; k < timeData.length; k++) {
					if (chartData[j].time === timeData[k]) {
						if (chartData.length > 0) {
							arrayData[k] = chartData[j].data
						}
					}
				}
			}
		}

		console.log(arrayData,'arrayData')

		// series 配置项
		let option = {
	    name: legendData[i],
	    type:'line',
	    yAxisIndex: i, //使用第一个y轴，序号从0开始
	    data: arrayData,
	    connectNulls: true,
	    itemStyle: {
	      color: (params:any)=> {
	        let colorList = chartColorList
	        return colorList[params.seriesIndex]
	      }
	    },
	  }
	  optionDataAll.push(option)
	}
	return (
		optionDataAll
	)
}
export default seriesCommon