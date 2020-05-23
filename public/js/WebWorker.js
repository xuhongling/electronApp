self.addEventListener('message', function (event) {
	
	//主线程传递两个 monitorRule，fileData 数据
	let monitorRule = event.data.monitorRule
	let fileData = event.data.fileData

	// 获取每个列表的数据集合
	// 规则的数据
	let selectAllData = []
	for (let k = 0; k < monitorRule.length; k++) {
		if (monitorRule[k].can_id !== undefined) {
			selectAllData.push(monitorRule[k])
		}
	}

	// 遍历对应CSV里面的数据
	let filterColumnData = []
	for (let m = 0; m < selectAllData.length; m++) {
		let selectAllDataCanId = selectAllData[m].can_id.toString().toLowerCase()
		for (let n = 0; n < fileData.length; n++) {
			let fileDataCanID = fileData[n].CanID
			let fileDataMerge = {}
			if (fileDataCanID === selectAllDataCanId) {
				// 加入一个选择框，selectName字段，用作判断
				fileDataMerge = {...fileData[n], selectName: selectAllData[m].name}
				filterColumnData.push(fileDataMerge)
			}
		}
	}

	// 解析的数据
	let columnData = []
	for (let i = 0; i < filterColumnData.length; i++) {
		let arrData = filterColumnData[i].DataHEX.replace(/^\s+|\s+$/g,"").split(" ")
		arrData.push(...['0x'])
		let baseData = arrData.reverse().join("")
		let formatData
		for (let j = 0; j < selectAllData.length; j++) {
			let filterColumnDataCanID = filterColumnData[i].CanID
			let selectAllDataCanId = selectAllData[j].can_id.toString().toLowerCase()
			if (filterColumnDataCanID === selectAllDataCanId) {
				// debugger
				let computeBaseData = (baseData / Math.pow(2, Number(selectAllData[j].start_bit))) & (Math.pow(2, Number(selectAllData[j].bit_size)) - 1)
				formatData = computeBaseData * Number(selectAllData[j].scale) + Number(selectAllData[j].value_offset)
			}
		}

		let data = {
			canId: filterColumnData[i].CanID,
			data: formatData,
			time: filterColumnData[i].TimeID,
			selectName: filterColumnData[i].selectName
		}
		columnData.push(data)
	}

	// 计算完向主线程发送数据
  self.postMessage(columnData)
}, false)