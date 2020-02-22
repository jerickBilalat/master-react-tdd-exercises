import React from 'react'
import { render as renderWithStore, fireEvent, store } from './test-utils'
import ProductForm from './ProductForm'
import { expectRedux } from 'expect-redux'

expectRedux.configure({betterErrorMessagesTimeout: 1000})

describe('ProduForm', () => {
  
  it('disptached ADD_PRODUCT_REQUEST when submitting data', async () => {
    // arrange
    const validProduct = { name: 'fake name'}
    const {getByText} = renderWithStore(<ProductForm {...validProduct} />)

    // act
    fireEvent.click(getByText('Add Product'))

    // assert
    const expectedActionBody = { type: 'ADD_PRODUCT_REQUEST', product: validProduct}

    return expectRedux(store)
      .toDispatchAnAction()
      .matching(expectedActionBody)
  })

})