import React from 'react'
import {storeSpy, expectRedux} from 'expect-redux'
import { act } from 'react-dom/test-utils'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import 'whatwg-fetch'
import { configureStore } from '../store'
import { reducer } from './product'

// helper
const createContainerWithStore = component => {
  const store = configureStore([storeSpy])

  return act( () => {
    ReactDOM.render(
      <Provider store={store}>{component}</Provider>, 
      document.createElement('div')
    )
  })
}

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

it('calls fetch when form is submitted', async () => {
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

  it('dispatches ADD_PRODUCT_SUCCESSFUL on success', () => {
    // arrange
    const store = configureStore([ storeSpy ])

    const successResponseBody = {
      ok: true,
      status: 200,
      json: () => Promise.resolve({name: 'fake name'})
    }
    const expectedActionBody = { type: 'ADD_PRODUCT_SUCCESSFUL', product: {name: 'fake name'}}

    jest
      .spyOn(window, 'fetch')
      .mockReturnValue(successResponseBody)

    // act
    store.dispatch({
      type: 'ADD_PRODUCT_REQUEST'
    })

    // assert
    return expectRedux(store)
      .toDispatchAnAction()
      .matching(expectedActionBody);

  })

  it('dispatches ADD_PRODUCT_FAILED on non-specific error', () => {
    // arrange
    const store = configureStore([ storeSpy ])

    const faildedResponseBody = {
      ok: false,
      status: 500,
      json: () => Promise.resolve({})
    }

    jest
      .spyOn(window, 'fetch')
      .mockReturnValue(faildedResponseBody)

    // act
    store.dispatch({
      type: 'ADD_PRODUCT_REQUEST'
    })

    // assert
    const expectedActionBody = { type: 'ADD_PRODUCT_FAILED'}

    return expectRedux(store)
      .toDispatchAnAction()
      .matching(expectedActionBody);

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

    it('maintains existing state when submitting', () => {
      // arrange and act
      const action = {type: 'ADD_PRODUCT_SUBMITTING'}

      const state = reducer({a: 'any'}, action)

      // assert
      const expectedPieceOfState = {a: 'any'}
      expect(state).toMatchObject(expectedPieceOfState)
    })
  
  })


  describe('ADD_PRODUCT_FAILED action', () => {

    it('sets status to failed', () => {
      // arrange and act
      const action = {type: 'ADD_PRODUCT_FAILED'}

      const state = reducer(undefined, action)

      const expectedPieceOfState = {
        status: 'FAILED'
      }

      // assert
      expect(state).toMatchObject(expectedPieceOfState)
    
    })

    it('maintains existing state when submit failed', () => {
      // arrange and act
      const action = {type: 'ADD_PRODUCT_FAILED'}

      const state = reducer({a: 'any'}, action)

      // assert
      const expectedPieceOfState = {a: 'any'}
      expect(state).toMatchObject(expectedPieceOfState)
    })

    it('sets error to true', () => {
      // arrange and act
      const action = {type: 'ADD_PRODUCT_FAILED'}

      const state = reducer(undefined, action)

      // assert
      const expectedPieceOfState = {error: true}
      expect(state).toMatchObject(expectedPieceOfState)

    })

  })

  describe('ADD_PRODUCT_SUCCESSFUL action', () => {

    it('set status to success', () => {
      
      // arrange and act
      const action = {type: 'ADD_PRODUCT_SUCCESSFUL'}

      const state = reducer(undefined, action)

      const expectedPieceOfState = {
        status: 'SUCCESS'
      }

      // assert
      expect(state).toMatchObject(expectedPieceOfState)
    })

    it('maintains existing state when submit IS A SUCCESS', () => {
      // arrange and act
      const action = {type: 'ADD_PRODUCT_SUCCESSFUL'}

      const state = reducer({a: 'any'}, action)

      // assert
      const expectedPieceOfState = {a: 'any'}
      expect(state).toMatchObject(expectedPieceOfState)
    })

    it('sets error to FALSE', () => {
      // arrange and act
      const action = {type: 'ADD_PRODUCT_SUCCESSFUL'}

      const state = reducer(undefined, action)

      // assert
      const expectedPieceOfState = {error: false}
      expect(state).toMatchObject(expectedPieceOfState)

    })
    it('sets product to provider product', () => {
      // arrange and act
      const fakeProduct = { name: "fake product" }
      const action = {type: 'ADD_PRODUCT_SUCCESSFUL', product: fakeProduct}

      const state = reducer(undefined, action)

      const expectedPieceOfState = {
        product: fakeProduct
      }

      // assert
      expect(state).toMatchObject(expectedPieceOfState)
    })

  })

})

