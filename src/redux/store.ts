import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/rootReducer'
import { sagaWatcher } from './saga/saga'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const saga = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//@ts-ignore
const preloadedState = localStorage.getItem('userData__floorTestTask') === null ? {} : JSON.parse(localStorage.getItem('userData__floorTestTask'))

export const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(saga))
)

saga.run(sagaWatcher)