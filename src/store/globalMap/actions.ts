import { createAction } from 'typesafe-actions'

export const setGlobalMap = createAction('SET_MAP', resolve =>
  (globalMap: object) => resolve(globalMap)
)
export const setTileLayer = createAction('SET_TILELAYER', resolve =>
  (tileLayer: object) => resolve(tileLayer)
)
export const setRoadNet = createAction('SET_ROADNET', resolve =>
  (roadNet: object) => resolve(roadNet)
)
export const setSatellite = createAction('SET_SATELLITE', resolve =>
  (satellite: object) => resolve(satellite)
)
export const setSatelliteRoadNet = createAction('SET_SATELLITEROADNET', resolve =>
  (satelliteRoadNet: object) => resolve(satelliteRoadNet)
)