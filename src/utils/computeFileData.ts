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
		if (can_id && can_id.length === 9) {
			can_id = `0x0${can_id.slice(-7)}`
		}
		for (let n = 0; n < fileData.length; n++) {
			let fileDataCanID = fileData[n].CanID.toString().toLowerCase()
			if (fileDataCanID && fileDataCanID.length === 9) {
				fileDataCanID = `0x0${fileDataCanID.slice(-7)}`
			}
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
			// let filterColumnDataCanID = filterColumnData[i].CanID
			// let can_id = selectAllData[j].can_id.toString().toLowerCase()
			let selectName = filterColumnData[i].selectName
			let name = selectAllData[j].name

			if (selectName === name) {
				let start_bit = selectAllData[j].start_bit
				let bit_size = selectAllData[j].bit_size
				// invertmode=1的情况
				if (selectAllData[j].convert_mode === "1") {
					let high_val:any = baseData.substr(0,10)
					let low_val:any = `0x${baseData.substr(-8,8)}`
					let high_part = 0
					let low_part = 0
					let computeBaseData

					if (Number(start_bit) + Number(bit_size) <= 32) {
						if (bit_size === 32) {
							computeBaseData = (low_val >>> start_bit)
						} else {
							computeBaseData = (low_val >>> start_bit) & ((1 << bit_size) - 1)
						}
					} else if (Number(start_bit) + Number(bit_size) > 32 && Number(start_bit) < 32) {
						low_part = (low_val >>> start_bit) & ((1 << (32 - start_bit)) - 1)
						high_part = high_val & ((1 << (Number(start_bit) + Number(bit_size) - 32)) - 1)
						computeBaseData = (high_part << (32 - start_bit)) | low_part
					} else {
						if (bit_size >= 32) {
							computeBaseData = (high_val >>> (start_bit - 32))
						} else {
							computeBaseData = (high_val >>> (start_bit - 32)) & ((1 << bit_size) - 1)
						}
					}
					formatData = computeBaseData * Number(selectAllData[j].scale) + Number(selectAllData[j].value_offset)
				}

				// invertmode=2的情况
				if (selectAllData[j].convert_mode === "2") {
					let high_val:any = '0x' + baseData.substr(-2,2) + baseData.substr(-4,2) + baseData.substr(-6,2) + baseData.substr(-8,2)
					let low_val:any = '0x' + baseData.substr(8,2) + baseData.substr(6,2) + baseData.substr(4,2) + baseData.substr(2,2)
					let high_part = 0
					let low_part = 0
					let computeBaseData

					if (Number(start_bit) + Number(bit_size) <= 32) {
						if (bit_size === 32) {
							computeBaseData = (high_val >>> (32 - start_bit - bit_size))
						} else {
							computeBaseData = (high_val >>> (32 - start_bit - bit_size)) & ((1 << bit_size) - 1)
						}
					} else if (Number(start_bit) + Number(bit_size) > 32 && Number(start_bit) < 32) {
						low_part = (low_val >>> (64 - start_bit - bit_size))
						high_part = high_val & ((1 << (64 - start_bit - bit_size)) - 1)
						computeBaseData = (high_part << (Number(start_bit) + Number(bit_size) - 32)) | low_part
					} else {
						if (bit_size >= 32) {
							computeBaseData = (low_val >>> (64 - start_bit - bit_size))
						} else {
							computeBaseData = (low_val >>> (64 - start_bit - bit_size)) & ((1 << bit_size) - 1)
						}
					}
					formatData = computeBaseData * Number(selectAllData[j].scale) + Number(selectAllData[j].value_offset)
				}

				/*let high_val:any = baseData.substr(0,10)
				let low_val:any = `0x${baseData.substr(-8,8)}`
				let high_part = 0
				let low_part = 0
				let computeBaseData
				if (start_bit + bit_size <= 32) {
					computeBaseData = (low_val / Math.pow(2, Number(start_bit))) & (Math.pow(2, Number(bit_size)) - 1)
				} else if (Number(start_bit) + Number(bit_size) > 32 && start_bit < 32) {
					low_part = (low_val * Math.pow(2, Number(start_bit))) & (Math.pow(2, Number(32 - start_bit)) - 1)
					high_part = high_val & (Math.pow(2, Number(start_bit + bit_size - 32)) - 1)
					computeBaseData = (high_part / Math.pow(2, Number(32 - start_bit)) ) | low_part
				} else {
					computeBaseData = (high_val * Math.pow(2, Number(start_bit - 32))) & (Math.pow(2, Number(bit_size)) - 1)
				}

				//let computeBaseData = (baseData / Math.pow(2, Number(selectAllData[j].start_bit))) & (Math.pow(2, Number(selectAllData[j].bit_size)) - 1)
				formatData = computeBaseData * Number(selectAllData[j].scale) + Number(selectAllData[j].value_offset)*/
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

export default computeFileData