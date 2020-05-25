import monitorRule from 'static/monitorRule'

// 获取每个列表的数据集合
const computeFileData = (fileData:any[])=>{
	if (fileData.length===0) {
		return
	}

	// 规则的数据
	let selectAllData:any[] = []
	for (let k = 0; k < monitorRule.length; k++) {
		if (monitorRule[k].can_id !== undefined) {
			selectAllData.push(monitorRule[k])
		}
	}

	// 遍历对应CSV里面的数据
	let filterColumnData:any[] = []
	for (let m = 0; m < selectAllData.length; m++) {
		let can_id = selectAllData[m].can_id.toString().toLowerCase()
		for (let n = 0; n < fileData.length; n++) {
			let fileDataCanID = fileData[n].CanID
			let fileDataMerge = {}
			if (fileDataCanID === can_id) {
				// 加入一个选择框，selectName字段，用作判断
				fileDataMerge = {...fileData[n], selectName: selectAllData[m].name}
				filterColumnData.push(fileDataMerge)
			}
		}
	}

	// 解析的数据
	let columnData:any[] = []
	for (let i = 0; i < filterColumnData.length; i++) {
		let arrData = filterColumnData[i].DataHEX.replace(/^\s+|\s+$/g,"").split(" ")
		arrData.push(...['0x'])
		let baseData = arrData.reverse().join("")
		let formatData
		for (let j = 0; j < selectAllData.length; j++) {
			let filterColumnDataCanID = filterColumnData[i].CanID
			let can_id = selectAllData[j].can_id.toString().toLowerCase()
			if (filterColumnDataCanID === can_id) {
				// debugger
				let computeBaseData = (baseData / Math.pow(2, Number(selectAllData[j].start_bit))) & (Math.pow(2, Number(selectAllData[j].bit_size)) - 1)
				formatData = computeBaseData * Number(selectAllData[j].scale) + Number(selectAllData[j].value_offset)
			}
		}
		// .substr(0,8)
		let data = {
			canId: filterColumnData[i].CanID,
			data: formatData,
			time: filterColumnData[i].TimeID,
			selectName: filterColumnData[i].selectName
		}
		columnData.push(data)
	}
	return columnData
}

export default computeFileData