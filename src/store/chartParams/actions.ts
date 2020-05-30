import { createAction } from 'typesafe-actions'

export const setChartParams= createAction('SET_CHARTPARAMS', resolve =>
  (chartParams: object) => resolve(chartParams)
)
export const cancelChartParams= createAction('CANCEL_CHARTPARAMS', resolve =>
  (chartParams: object) => resolve(chartParams)
)