import { combineReducers } from 'redux'

import user from './user/reducer'
import fileData from './fileData/reducer'
import legendData from './legendData/reducer'
import globalChart from './globalChart/reducer'
import chartColorList from './chartColorList/reducer'
import selectData from './selectData/reducer'
import chartData from './chartData/reducer'
import chartLineWidth from './chartLineWidth/reducer'
import chartSizeValue from './chartSizeValue/reducer'
import monitorRule from './monitorRule/reducer'

const rootReducer = combineReducers({
	user,
	fileData,
	legendData,
	globalChart,
	chartColorList,
	selectData,
	chartData,
	chartLineWidth,
	chartSizeValue,
	monitorRule
})

export default rootReducer