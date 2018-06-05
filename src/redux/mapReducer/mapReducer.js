export const SPOT_SELECTION = 'mapReducer/SPOT_SELECTION'
export const SET_MAP_VIEW = 'mapReducer/SET_MAP_VIEW'

export const spotSelection = ({ spotSelected }) => {
  return {
    type: SPOT_SELECTION,
    payload: {
      spotSelected
    }
  }
}

export const setMapView = ({ center, zoom }) => {
  return {
    type: SET_MAP_VIEW,
    payload: {
      center,
      zoom
    }
  }
}

const reducer = (state = {}, action = {}) => {
  switch (action.type){
    case SPOT_SELECTION:
      const { spotSelected } = action.payload

      return {
        ...state,
        spotSelected
      }
    case SET_MAP_VIEW:
      const { center, zoom } = action.payload

      return {
        ...state,
        center: center || state.center,
        zoom: zoom || state.zoom
      }
    default:
      return state
  }
}

export default reducer