import { createAction } from 'typesafe-actions'

export const setChartData = createAction('SET_CHARTDATA', resolve =>
  (chartData: any[]) => resolve(chartData)
)