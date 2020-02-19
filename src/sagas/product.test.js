import {storeSpy, expectRedux} from 'expect-redux'
import 'whatwg-fetch'
import { configureStore } from '../store'
import { reducer } from './product'

describe('addProduct', () => {
 
  it('sets current status to submitting', () => {
    // arrange
    const store = configureStore([ storeSpy ])
    const action = {type: 'ADD_PRODUCT_REQUEST'}

    // act
    store.dispatch(action)

    // assert
    return expectRedux(store)
      .toDispatchAnAction()
      .matching({
        type: 'ADD_PRODUCT_SUBMITTING'
      })    
  })

  it('submits request to the fetch api', async () => {
    // arrange
    jest.spyOn(window, 'fetch')

    const store = configureStore([ storeSpy ])
    const productBody = { name: 'fake name' }
    const action = {type: 'ADD_PRODUCT_REQUEST', productBody}

    // act
    store.dispatch(action)

    // assert
    expect(window.fetch).toHaveBeenCalledWith('/products', {
      body: JSON.stringify(productBody),
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-type': 'application/json'}
    })
    

  })

})

describe('reducer', () => {
  it('returns the default state for undefined existing state', () => {
    // arrange and act
    const state = reducer(undefined, {})
    const defaultState = {
      product: {},
      status: undefined,
      validationErros: {},
      error: false
    }

    // assert
    expect(state).toEqual(defaultState)
  })
})

describe('ADD_PRODUCT_SUBMITTING action', () => {
  it('sets status to submitting', () => {
    // arrange and act
    const action = {type: 'ADD_PRODUCT_SUBMITTING'}
    const state = reducer(undefined, action)
    const expectedPieceOfState = {
      status: 'SUBMITTING'
    }

    // assert
    expect(state).toMatchObject(expectedPieceOfState)
  })
} )