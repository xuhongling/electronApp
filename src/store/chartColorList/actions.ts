import { createAction } from 'typesafe-actions'

export const setChartColorList = createAction('SET_CHARTCOLORLIST', resolve =>
  (chartColorList: string[]) => resolve(chartColorList)
)