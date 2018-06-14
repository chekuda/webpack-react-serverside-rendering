import { createStore } from 'redux'

import rootReducers from '../rootReducers'

const configureStore = (initState) => {
  const thirdPartyEnhances =
    process.env.NODE_ENV !== 'production' && process.browser
      ? window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      : undefined // If redux-thunk is needed, use applyMiddleware

  return createStore(
    rootReducers,
    initState,
    thirdPartyEnhances
  )
}

export default configureStore