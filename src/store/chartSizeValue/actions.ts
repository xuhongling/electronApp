import { createAction } from 'typesafe-actions'

export const setChartSizeValue = createAction('SET_CHARTSIZEVALUE', resolve =>
  (chartSizeValue: any[]) => resolve(chartSizeValue)
)