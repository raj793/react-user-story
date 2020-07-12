import { applyMiddleware, createStore, compose } from "redux"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import reducer from "./reducers"

const persistConfig = {
  key: 'root',
  storage,
}

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = createStore(persistedReducer, 
    composeEnhancers(
      applyMiddleware(
        promise, 
        logger, 
        thunk
      )
    )
  )

export const persistor = persistStore(store)