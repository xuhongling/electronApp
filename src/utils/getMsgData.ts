import monitorRule from 'static/monitorRule'
// 传入getColumnData方法获取的数据
const getMsgData = (data:any)=>{
	console.log(data,'dataMerge')
	let baseData, response;
	for (let i = 0; i < monitorRule.length; i++) {
		if (monitorRule[i].can_id === data.canId) {
			baseData = (parseInt(data.data) / Math.pow(2, Number(monitorRule[i].start_bit))) & (Math.pow(2, Number(monitorRule[i].bit_size)) - 1)
			response = baseData * Number(monitorRule[i].scale) + Number(monitorRule[i].value_offset)
		}
	}
	return response
}

export default getMsgData