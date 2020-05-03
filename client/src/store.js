import {createStore, applyMiddleware, compose} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const middleware = [thunk]
const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
  
)

export default store