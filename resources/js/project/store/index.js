import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { reducers } from './reducers'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk, logger))
)
window.store = store

export default store
