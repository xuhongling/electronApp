const seriesCommon = (legendData:any[], chartData:any, timeData:any, chartColorList:any, SelectedData:any)=> {
	let optionDataAll:any[] = []
	// let selectNameAll = []
	for (let i = 0; i < legendData.length; i++) {
		let arrayData:any = []
		arrayData = new Array(timeData.length)
		for (let j = 0; j < chartData.length; j++) {
			// 把图表数据中的名字字段加到一起，然后去重判断有没有数据，给出提示
			// selectNameAll.push(chartData[j].selectName)
			
			// 遍历数据到对应的栏目中
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

		// series 配置项
		if (SelectedData[legendData[i]] !== false) {
			let option = {
		    name: legendData[i],
		    type:'line',
		    yAxisIndex: i, //使用第一个y轴，序号从0开始
		    data: arrayData,
		    connectNulls: true, //是否连接空数据
		    lineStyle: { width: 1 },
		    itemStyle: {
		      color: (params:any)=> {
		        let colorList = chartColorList
		        return colorList[params.seriesIndex]
		      }
		    },
		  }
		  optionDataAll.push(option)
		}else{
			let option = {
		    name: legendData[i],
		    type:'line',
		    yAxisIndex: i, //使用第一个y轴，序号从0开始
		    data: [],
		    connectNulls: true, //是否连接空数据
		    lineStyle: { width: 1 },
		    itemStyle: {
		      color: (params:any)=> {
		        let colorList = chartColorList
		        return colorList[params.seriesIndex]
		      }
		    },
		  }
		  optionDataAll.push(option)
		}

		// 把图表数据中的名字字段加到一起，然后去重判断有没有数据，给出提示
		/*let deDuplicationSelectName = [...new Set(selectNameAll)]
		if (deDuplicationSelectName.includes(legendData[i])) {
			console.log('')
		}else{
			console.log(legendData[i],'1111111')
		}*/

	}


	return (
		optionDataAll
	)
}
export default seriesCommon