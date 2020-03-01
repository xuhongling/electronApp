import monitorRule from 'static/monitorRule'
// 获取每个列表的数据集合
const getColumnData = (ruleTypeName:string, fileData:any[])=>{
	let ruleTypeData:any[] = []
	for (let i = 0; i < monitorRule.length; i++) {
		if (monitorRule[i].type_name === ruleTypeName) {
			ruleTypeData.push(monitorRule[i])
		}
	}

	let filterColumnData:any[] = []
	for (let i = 0; i < ruleTypeData.length; i++) {
		for (let j = 0; j < fileData.length; j++) {
			let canId:any = fileData[j].ID号
			if (ruleTypeData[i].can_id === canId) { 
				filterColumnData.push(fileData[j])
			}
		}
	}

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