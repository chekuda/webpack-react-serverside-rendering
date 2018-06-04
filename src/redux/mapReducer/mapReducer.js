export const SPOT_SELECTION = 'mapReducer/SPOT_SELECTION'

export const spotSelection = ({ spotSelected }) => {
  return {
    type: SPOT_SELECTION,
    payload: {
      spotSelected
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
    default:
      return state
  }
}

export default reducer