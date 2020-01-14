import { StateType } from 'typesafe-actions'
// import { Middleware } from 'redux';

import rootReducer from './root-reducer'
import * as userActions from './user/actions'
import * as globalMapActions from './globalMap/actions'


export { default } from './store'
export { default as rootReducer } from './root-reducer'

export const actions = {
	user: userActions,
	globalMap: globalMapActions
}
export type RootState = StateType<typeof rootReducer>
