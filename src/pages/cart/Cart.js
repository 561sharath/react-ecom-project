import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ADD_To_CART,  CALCULATE_SUB_TOTAL,  CALCULATE_TOTAL_QUALITY,  CLEAR_CART, DECREASE_CART, REMOVE_FROM_CART, selectCartItems, selectCartTotalAmount, selectCartTotalQuantity } from '../../redux/slice/cartSlice';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { Card } from 'react-bootstrap';

const Cart = () => {

  const cartItems=useSelector(selectCartItems)
  const cartTotalAmount=useSelector(selectCartTotalAmount)
  const cartTotalQuantity=useSelector(selectCartTotalQuantity)
  const dispacth = useDispatch()
  const incraeseCart=(cart)=>{

    dispacth(ADD_To_CART(cart))

  }

  const decraeseCart=(cart)=>{

    dispacth(DECREASE_CART(cart))

  }
  const removefromCart=(cart)=>{
    dispacth(REMOVE_FROM_CART(cart))
  }

  useEffect(()=>{
    dispacth(CALCULATE_SUB_TOTAL())
    
  },[cartItems])
  

  

  
  
  

  return (
    <div>

<section class="h-100 h-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12">
        <div class="card card-registration card-registration-2" style={{borderRadius: "15px;"}}>
          <div class="card-body p-0">
            <div class="row g-0">
              <div class="col-lg-8">
                <div class="p-5">
                  <div class="d-flex justify-content-between align-items-center mb-5">
                  <Link style={{fontSize:"20px"}}to="/#products">&larr;continue shopping</Link>
                    <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                    
                    <h6 class="mb-0 text-muted">{cartItems.length} items</h6>
                  </div>
                  <hr class="my-4"/>
                  {cartItems.map((cart,index)=>{
                    const{id,name,price,imageUrl,cartQuantity,brand}=cart
                    return (
                    <div class="row mb-4 d-flex justify-content-between align-items-center">
                    <div class="col-md-2 col-lg-2 col-xl-2">
                    <Link to={`/product-details/${id}`}>
                      <img
                        src={imageUrl}
                        class="img-fluid rounded-3" alt="Cotton T-shirt" />
                      </Link>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-3">
                      <h6 class="text-muted">{name}</h6>
                      <h6 class="text-black mb-0">{brand}</h6>
                    </div>
                    <div class="col-md-3 col-lg-3 col-xl-2 d-flex" style={{gap:"10px"}}>
                      <button class="--btn"
                        onClick={()=>decraeseCart(cart)}>
                        -
                      </button>

                      {cartQuantity}

                      <button class="--btn"
                        onClick={()=>incraeseCart(cart)}>
                        +
                      </button>
                    </div>
                    <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h6 class="mb-0">€ {price}</h6>
                    </div>
                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a href="#!" class="text-muted"><i class="fas fa-times"></i></a>
                    </div>
                    <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                      <a href="#">
                    <FaTrashAlt size={19} color="red" 
                      onClick={()=>removefromCart(cart)}/>
                      </a>
                    </div>
                  </div>

                  
                  
                    
                    )
                  })}
                 

                  <div class="pt-5">
                    <h6 class="mb-0"><a href="#!" class="text-body"><i
                          class="fas fa-long-arrow-alt-left me-2"></i></a></h6>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 bg-grey" style={{background:"lightgray"}}>
                <div class="p-5">
                  <h3 class="fw-bold mb-5 mt-2 pt-1">Summary</h3>
                  <hr class="my-4"/>

                  <div class="d-flex justify-content-between mb-4">
                    <h5 class="text-uppercase">items 3</h5>
                    <h5>€ {cartTotalAmount}.00</h5>
                  </div>

                  <h5 class="text-uppercase mb-3">Shipping</h5>

                  <div class="mb-4 pb-2">
                    <select class="select">
                      <option value="1">Standard-Delivery- €5.00</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                      <option value="4">Four</option>
                    </select>
                  </div>

                  <h5 class="text-uppercase mb-3">Give code</h5>

                  <div class="mb-5">
                    <div class="form-outline">
                      <input type="text" id="form3Examplea2" class="form-control form-control-lg" />
                      <label class="form-label" for="form3Examplea2">Enter your code</label>
                    </div>
                  </div>

                  <hr class="my-4"/>

                  <div class="d-flex justify-content-between mb-5">
                    <h5 class="text-uppercase">Total price</h5>
                    
                    <h5>€ {cartTotalAmount+5}.00</h5>
                  </div>

                  <button type="button" class="btn btn-dark btn-block btn-lg"
                    data-mdb-ripple-color="dark">CheckOut</button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    </div>
  )

}

export default Cart;
