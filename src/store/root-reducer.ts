import { combineReducers } from 'redux'

import user from './user/reducer'
import fileData from './fileData/reducer'
import chartData from './chartData/reducer'
import globalChart from './globalChart/reducer'
import chartColorList from './chartColorList/reducer'

const rootReducer = combineReducers({
	user,
	fileData,
	chartData,
	globalChart,
	chartColorList
})

export default rootReducer