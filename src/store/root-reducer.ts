import { combineReducers } from 'redux'

import user from './user/reducer'
import fileData from './fileData/reducer'

const rootReducer = combineReducers({
	user,
	fileData
})

export default rootReducer