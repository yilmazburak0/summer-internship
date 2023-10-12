import thunk from 'redux-thunk'
import createDebounce from 'redux-debounced'
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './rootReducer'
import { createStore, applyMiddleware, compose, legacy_createStore } from 'redux'
import notify from 'utils/notify'
import history from 'router/history'
import localforage from 'localforage'

const persistConfig = {
    key: 'root',
    storage: localforage,
    whitelist: ['auth'] // only auth will be persisted
};
const persistedReducer = persistReducer(persistConfig, rootReducer)



const errorHandler = store => next => action => {

    if (String(action.type).includes("_ERROR")) {
        const { message, code } = action.payload
        if (code === 1042) {
            history.push('/auth/login')
        }
        notify('error', message)
    }
    //console.log(action.payload);
    return next(action)
}

const middleware = [thunk, createDebounce(), errorHandler]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = legacy_createStore(persistedReducer, {}, composeEnhancers(applyMiddleware(...middleware)))
const persistor = persistStore(store)

export { store, persistor }