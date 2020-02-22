import React from 'react'
import { connect } from 'react-redux';


const ProductForm = ({name, addProductRequest}) => {

  const [product, setProduct] = React.useState({name})

  const handleSubmit = (e) => {
    e.preventDefault()
    addProductRequest(product)
  }

  return ( 
    <form onSubmit={handleSubmit}>
      <input value={name} readOnly/>
      <input type='submit' value='Add Product' />
    </form>)

}

function mapStateToProps() {
  return {}
}

const mapDispatchedToProps = {
  addProductRequest: product => ({
    type: 'ADD_PRODUCT_REQUEST',
    product
  })
}

export default connect(mapStateToProps, mapDispatchedToProps)(ProductForm)