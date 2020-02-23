import { combineReducers } from 'redux'

import user from './user/reducer'
import fileData from './fileData/reducer'
import chartData from './chartData/reducer'
import globalChart from './globalChart/reducer'
import chartColorList from './chartColorList/reducer'
import selectData from './selectData/reducer'

const rootReducer = combineReducers({
	user,
	fileData,
	chartData,
	globalChart,
	chartColorList,
	selectData
})

export default rootReducer