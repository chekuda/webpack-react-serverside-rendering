import { createStore } from 'redux'

import rootReducers from '../rootReducers'

const configureStore = (initState, isDev) => {
  const thirdPartyEnhances =
    isDev === 'isDev'
    ? undefined // If redux-thunk is needed, use applyMiddleware
    : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  return createStore(
    rootReducers,
    initState,
    thirdPartyEnhances
  )
}

export default configureStore