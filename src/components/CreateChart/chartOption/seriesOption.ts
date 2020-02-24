const seriesCommon = (legendData:any[], chartData:any, chartColorList:any)=> {
	let optionDataAll:any[] = []
	for (let i = 0; i < legendData.length; i++) {
		let option = {
	    name: legendData[i],
	    type:'line',
	    yAxisIndex: i, //使用第一个y轴，序号从0开始
	    data: chartData[i],
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