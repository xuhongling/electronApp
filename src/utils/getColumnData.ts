import monitorRule from 'static/monitorRule'
// import DateFormat from './DateFormat'

// 获取每个列表的数据集合
const getColumnData = (ruleTypeName:string, legendData:any[], fileData:any[])=>{
	if (legendData===null || legendData.length===0 || fileData.length===0) {
		return
	}

	let ruleTypeData:any[] = []
	for (let i = 0; i < monitorRule.length; i++) {
		if (monitorRule[i].type_name === ruleTypeName) {
			ruleTypeData.push(monitorRule[i])
		}
	}

	// 选择框对应的数据
	let selectAllData:any[] = []
	for (let i = 0; i < legendData.length; i++) {
		for (let j = 0; j < ruleTypeData.length; j++) {
			if (ruleTypeData[j].name === legendData[i]) {
				selectAllData.push(ruleTypeData[j])
			}
		}
	}
	
	// 遍历对应CSV里面的数据
	let filterColumnData:any[] = []
	for (let i = 0; i < fileData.length; i++) {
		for (let j = 0; j < selectAllData.length; j++) {
			let fileDataCanID = fileData[i].CanID.toString().toLowerCase()
			let selectAllDataCanId = selectAllData[j].can_id.toString().toLowerCase()
			if (fileDataCanID && fileDataCanID.length === 9) {
				fileDataCanID = `0x0${fileDataCanID.slice(-7)}`
			}
			if (selectAllDataCanId && selectAllDataCanId.length === 9) {
				selectAllDataCanId = `0x0${selectAllDataCanId.slice(-7)}`
			}
			if (fileDataCanID === selectAllDataCanId) {
				// 加入一个选择框，selectName字段，用作判断
				let fileDataMerge = {...fileData[i], selectName: selectAllData[j].name}
				filterColumnData.push(fileDataMerge)
			}
		}
	}

	// 解析的数据
	let columnData:any[] = []
	console.log(filterColumnData,'filterColumnData1111111')
	for (let i = 0; i < filterColumnData.length; i++) {
		
	console.log(filterColumnData,'filterColumnData')
	for (let i = 0; i < filterColumnData.length; i++) {
		let arrData
		// 另一种数据 判断下
		if (filterColumnData[i].Data0) {
			let object = filterColumnData[i]
			let Data0, Data1, Data2, Data3, Data4, Data5, Data6, Data7;
			for (let item in object) {
				if (item.indexOf('Data0') !== -1) {
			  	Data0 = object[item].length === 2 ? object[item]: `0${object[item]}`
			  }
			  if (item.indexOf('Data1') !== -1) {
			  	Data1 = object[item].length === 2 ? object[item]: `0${object[item]}`
			  }
			  if (item.indexOf('Data2') !== -1) {
			  	Data2 = object[item].length === 2 ? object[item]: `0${object[item]}`
			  }
			  if (item.indexOf('Data3') !== -1) {
			  	Data3 = object[item].length === 2 ? object[item]: `0${object[item]}`
			  }
			  if (item.indexOf('Data4') !== -1) {
			  	Data4 = object[item].length === 2 ? object[item]: `0${object[item]}`
			  }
			  if (item.indexOf('Data5') !== -1) {
			  	Data5 = object[item].length === 2 ? object[item]: `0${object[item]}`
			  }
			  if (item.indexOf('Data6') !== -1) {
			  	Data6 = object[item].length === 2 ? object[item]: `0${object[item]}`
			  }
			  if (item.indexOf('Data7') !== -1) {
			  	let Data7Str = object[item].replace(/\s+/g,"")
			  	Data7 = Data7Str.length === 2 ? Data7Str: `0${Data7Str}`
			  }
			}
			let DataHEX = `${Data0} ${Data1} ${Data2} ${Data3} ${Data4} ${Data5} ${Data6} ${Data7}`
			arrData = DataHEX.replace(/^\s+|\s+$/g,"").split(" ")
		}else{
			arrData = filterColumnData[i].DataHEX.replace(/^\s+|\s+$/g,"").split(" ")
		}
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
			time: filterColumnData[i].TimeID.substr(0,8),
			selectName: filterColumnData[i].selectName
		}
		columnData.push(data)
	}
	return columnData
}

export default getColumnData