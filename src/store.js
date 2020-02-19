import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {takeLatest} from 'redux-saga/effects'
import { addProduct, reducer as productReducer } from './sagas/product'

function* rootSaga() {
  yield takeLatest('ADD_PRODUCT_REQUEST', addProduct)
}

export const configureStore = (storeEnhancers = []) => {
  const sagaMiddleware = createSagaMiddleware()
  
  const store = createStore(
    combineReducers({ product: productReducer}),
    compose(
      ...[applyMiddleware(sagaMiddleware), ...storeEnhancers]
    )
  )
  sagaMiddleware.run(rootSaga)

  return store
}