import { StateType } from 'typesafe-actions'
// import { Middleware } from 'redux';

import rootReducer from './root-reducer'
import * as userActions from './user/actions'
import * as fileDataActions from './fileData/actions'
import * as legendDataActions from './legendData/actions'
import * as globalChartActions from './globalChart/actions'
import * as chartColorList from './chartColorList/actions'
import * as selectData from './selectData/actions'
import * as chartData from './chartData/actions'
import * as chartLineWidth from './chartLineWidth/actions'

export { default } from './store'
export { default as rootReducer } from './root-reducer'

export const actions = {
	user: userActions,
	fileData: fileDataActions,
	legendData: legendDataActions,
	globalChart: globalChartActions,
	chartColorList: chartColorList,
	selectData: selectData,
	chartData: chartData,
	chartLineWidth: chartLineWidth
}
export type RootState = StateType<typeof rootReducer>
