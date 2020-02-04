import { createAction } from 'typesafe-actions'

export const setFileData = createAction('SET_FILEDATA', resolve =>
  (fileData: any[]) => resolve(fileData)
)