import { createStore, combineReducers } from 'redux'
import { applyMiddleware } from 'redux'

import articleReducer from './reducers/article'

import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    at: articleReducer
})

const logger = store => {
    return next => {
        return action => {
            console.log('[Mid] Dispatching', action)
            const result = next(action)
            console.log('[Mid] Next State', store.getState())
            return result
        }
    }
}
export const middlewares = [logger, thunk]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store