import { createAction } from 'typesafe-actions'

export const setShowColorPickers = createAction('SET_SHOWCOLORPICKERS', resolve =>
  (showColorPickers: boolean) => resolve(showColorPickers)
)
export const setHideColorPickers = createAction('SET_HIDECOLORPICKERS', resolve =>
  (hideColorPickers: boolean) => resolve(hideColorPickers)
)