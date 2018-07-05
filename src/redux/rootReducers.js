import { combineReducers } from 'redux'

import map from './reducers/map'
import spots from './reducers/spots'

const rootReducers = combineReducers({
  map,
  spots
})

export default rootReducers
