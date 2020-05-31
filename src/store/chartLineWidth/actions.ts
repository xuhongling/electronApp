import { createAction } from 'typesafe-actions'

export const setChartLineWidth = createAction('SET_CHARTLINEWIDTH', resolve =>
  (chartLineWidth: number[]) => resolve(chartLineWidth)
)