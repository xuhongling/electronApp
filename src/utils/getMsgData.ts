import monitorRule from 'static/monitorRule'
// 传入getColumnData方法获取的数据
const getMsgData = (data:any)=>{
	let baseData, response;
	let ruleData:any = monitorRule
	for (let i = 0; i < ruleData.length; i++) {
		if (ruleData[i].can_id === data.canId) {
			baseData = (parseInt(data.data) / Math.pow(2, Number(ruleData[i].start_bit))) & (Math.pow(2, Number(ruleData[i].bit_size)) - 1)
			response = baseData * Number(ruleData[i].scale) + Number(ruleData[i].value_offset)
		}
	}
	return response
}

export default getMsgData