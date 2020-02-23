import { createAction } from 'typesafe-actions'

export const setSelectData = createAction('SET_SELECTDATA', resolve =>
  (selectData: string) => resolve(selectData)
)