import { createAction } from 'typesafe-actions'

export const setMonitorRule = createAction('SET_MONITORRULE', resolve =>
  (monitorRule: any[]) => resolve(monitorRule)
)