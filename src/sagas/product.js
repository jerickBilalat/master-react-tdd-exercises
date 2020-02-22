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

  const response = yield call(fetch, '/products', productBody)

  if(!response.ok) {
    yield put({ type: 'ADD_PRODUCT_FAILED' })
  }

  const result = yield call([response, 'json'])

    yield put({
      type: 'ADD_PRODUCT_SUCCESSFUL',
      product: result
    })
  
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
      return {...state, status: 'SUBMITTING'}
    case 'ADD_PRODUCT_FAILED':
      return {...state, status: 'FAILED', error: true}
    case 'ADD_PRODUCT_SUCCESSFUL':
      return {...state, status: 'SUCCESS', error: false, product: {...action.product}}
    default:
      return state
  }
}