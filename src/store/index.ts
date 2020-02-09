import { StateType } from 'typesafe-actions'
// import { Middleware } from 'redux';

import rootReducer from './root-reducer'
import * as userActions from './user/actions'
import * as fileDataActions from './fileData/actions'
import * as chartDataActions from './chartData/actions'
import * as globalChartActions from './globalChart/actions'


export { default } from './store'
export { default as rootReducer } from './root-reducer'

export const actions = {
	user: userActions,
	fileData: fileDataActions,
	chartData: chartDataActions,
	globalChart: globalChartActions
}
export type RootState = StateType<typeof rootReducer>
