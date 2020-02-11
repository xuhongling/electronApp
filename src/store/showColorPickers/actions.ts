import { createAction } from 'typesafe-actions'

export const setShowColorPickers = createAction('SET_SHOWCOLORPICKERS', resolve =>
  (showColorPickers: boolean) => resolve(showColorPickers)
)