import monitorRule from 'static/monitorRule'
// 获取每个列表的数据集合
const getColumnData = (ruleTypeName:string, legendData:any[], fileData:any[])=>{
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
	for (let i = 0; i < selectAllData.length; i++) {
		for (let j = 0; j < fileData.length; j++) {
			let canId:any = fileData[j].ID号
			if (selectAllData[i].can_id === canId) { 
				filterColumnData.push(fileData[j])
			}
		}
	}
	
	// 解析的数据
	let columnData:any[] = []
	for (let i = 0; i < filterColumnData.length; i++) {
		let arrData = filterColumnData[i].数据.replace(/^\s+|\s+$/g,"").split(" ")
		arrData.push(...['0x'])
		let data = {
			canId: filterColumnData[i].ID号,
			data: arrData.reverse().join("").slice(0, -2),
			time: filterColumnData[i].时间标识
		}
		columnData.push(data)
	}
	return columnData
}

export default getColumnData