import * as authorActions from './author/actions'
import * as globalMapActions from './globalMap/actions'

export { default } from './store'

export const actions = {
	author: authorActions,
	globalMap: globalMapActions
}