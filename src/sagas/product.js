import { put } from 'redux-saga/effects'

export function* addProduct() {
  yield put({ type: 'ADD_PRODUCT_SUBMITTING'})
}

const defaultState = {
  product: {},
  status: undefined,
  validationErros: {},
  error: false
}

export function reducer( state = defaultState, action) {
  switch(action.type) {
    case 'ADD_PRODUCT_SUBMITTING':
      return {status: 'SUBMITTING'}
    default:
      return state
  }
}