import {storeSpy, expectRedux} from 'expect-redux'
import { configureStore } from '../store'
import { reducer } from './product'

describe('addProduct', () => {
 
  it('sets current status to submitting', () => {
    // arrange
    const store = configureStore([ storeSpy ])
    const action = {type: 'ADD_PRODUCT_SUBMITTING'}

    // act
    store.dispatch(action)

    // assert
    return expectRedux(store)
      .toDispatchAnAction()
      .matching({
        type: 'ADD_PRODUCT_SUBMITTING'
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