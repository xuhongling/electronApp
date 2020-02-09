import { createAction } from 'typesafe-actions'

export const setGlobalChart= createAction('SET_CHART', resolve =>
  (globalChart: object) => resolve(globalChart)
)