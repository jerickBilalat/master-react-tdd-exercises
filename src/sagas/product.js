import { put, call } from 'redux-saga/effects'
import 'whatwg-fetch'

function fetch(url, data) {
  return window.fetch(url, {
    body: JSON.stringify(data),
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-type': 'application/json'}
  })
}
export function* addProduct({productBody}) {
  yield put({ type: 'ADD_PRODUCT_SUBMITTING'})
  yield call(fetch, '/products', productBody)
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