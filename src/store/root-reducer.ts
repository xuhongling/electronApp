import { combineReducers } from 'redux'

import user from './user/reducer'
import fileData from './fileData/reducer'
import legendData from './legendData/reducer'
import globalChart from './globalChart/reducer'
import chartColorList from './chartColorList/reducer'
import selectData from './selectData/reducer'
import chartData from './chartData/reducer'
import chartParams from './chartParams/reducer'

const rootReducer = combineReducers({
	user,
	fileData,
	legendData,
	globalChart,
	chartColorList,
	selectData,
	chartData,
	chartParams
})

export default rootReducer