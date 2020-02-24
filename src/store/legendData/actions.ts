import { createAction } from 'typesafe-actions'

export const setLegendData = createAction('SET_LEGENDDATA', resolve =>
  (legendData: any[]) => resolve(legendData)
)