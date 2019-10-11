import { createStore, combineReducers, applyMiddleware, compose } from 'redux'

import { middlewares } from '../store/store'

const getMockArticleReducer = jest.fn(
  initialState => (state = initialState, action) => {
    switch (action.type) {
      default:
        break
    }
    return state
  }
)

export const getMockStore = (initialState) => {
  const mockArticleReducer = getMockArticleReducer(initialState);
  const rootReducer = combineReducers({
    at: mockArticleReducer
  })
  const mockStore = createStore(rootReducer, applyMiddleware(...middlewares))
  return mockStore
}