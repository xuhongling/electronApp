import { combineReducers } from 'redux'

import user from './user/reducer'
import fileData from './fileData/reducer'
import chartData from './chartData/reducer'
import globalChart from './globalChart/reducer'
import showColorPickers from './showColorPickers/reducer'

const rootReducer = combineReducers({
	user,
	fileData,
	chartData,
	globalChart,
	showColorPickers
})

export default rootReducer