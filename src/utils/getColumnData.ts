import monitorRule from 'static/monitorRule'
import DateFormat from './DateFormat'

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
				// 加入一个选择框，selectName字段，用作判断
				let fileDataMerge = {...fileData[j], selectName: selectAllData[i].name}
				filterColumnData.push(fileDataMerge)
			}
		}
	}

	// 解析的数据
	let columnData:any[] = []
	for (let i = 0; i < filterColumnData.length; i++) {
		let arrData = filterColumnData[i].数据.replace(/^\s+|\s+$/g,"").split(" ")
		arrData.push(...['0x'])
		let baseData = arrData.reverse().join("").slice(0, -2)
		let formatData
		for (let i = 0; i < selectAllData.length; i++) {
			if (selectAllData[i].can_id === filterColumnData[i].ID号) {
				baseData = (parseInt(filterColumnData[i].data) / Math.pow(2, Number(selectAllData[i].start_bit))) & (Math.pow(2, Number(selectAllData[i].bit_size)) - 1)
				formatData = baseData * Number(selectAllData[i].scale) + Number(selectAllData[i].value_offset)
			}
		}
		
		let startTime = parseInt(filterColumnData[i].时间标识)
		let dateTime = DateFormat(startTime,'yyyy-MM-dd hh:mm:ss')
		let data = {
			canId: filterColumnData[i].ID号,
			data: formatData,
			time: dateTime.substr(11,8),
			selectName: filterColumnData[i].selectName
		}
		columnData.push(data)
	}
	return columnData
}

export default getColumnData