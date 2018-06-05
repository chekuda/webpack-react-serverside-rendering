export const SPOT_SELECTION = 'mapReducer/SPOT_SELECTION'
export const SPOT_HOVERED = 'mapReducer/SPOT_HOVERED'
export const SET_MAP_VIEW = 'mapReducer/SET_MAP_VIEW'

export const spotSelection = ({ spotSelected }) => {
  return {
    type: SPOT_SELECTION,
    payload: {
      spotSelected
    }
  }
}

export const spotHovered = ({ spotHovered }) => {
  return {
    type: SPOT_HOVERED,
    payload: {
      spotHovered
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
    case SPOT_HOVERED:
      const { spotHovered } = action.payload

      return {
        ...state,
        spotHovered
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