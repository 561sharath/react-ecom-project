import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { ADD_To_CART } from '../../../redux/slice/cartSlice'

const ProductItem = ({product}) => {
  const dispacth=useDispatch()
  const shortenText=(text,n)=>{
    if(text.length>n){
      const shortenText=text.substring(0,n).concat("...")
      return shortenText
    }
    return  text
  }

  const addToCart=(item)=>{

    dispacth(ADD_To_CART(item))

  }

  return (
    <div>
      <div className='flexbox'>

        {product.map((item,index)=>(

        <div class="product-card">

        <div class="card-header">
          <Link to={`/product-details/${item.id}`}>
        <img src={item.imageUrl} alt="image" />
          </Link>
        </div>
        <div class="card-body">
        <h4 class="product-title">{shortenText(item.name,18)} </h4>
          <p class="product-status" style={{color:"green"}}>Shipped in 3-4 days</p>
        <h3 class="product-prices">Price : ${item.price}</h3>	
        </div>
        <div class="card-footer">
        <button 
        style={{color:"black"}}
        onClick={()=>addToCart(item)}
        class="btn1 btn1-secondary">
        <icon class="bi bi-cart3"></icon>
        Add Cart
        </button>
        <button 
        
        class="btn1 btn1-primary">
        <i class="bi bi-bag"></i>
        Buy
        </button>
        </div>
        </div>

          
        ))}


        </div>
            </div>
  )
}

export default ProductItem
