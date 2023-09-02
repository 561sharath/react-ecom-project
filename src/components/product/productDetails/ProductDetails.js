import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { db } from '../../../firebase/config'
import { toast } from 'react-toastify'
import {AiFillStar} from 'react-icons/ai'
import {BiSolidStarHalf} from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { ADD_To_CART } from '../../../redux/slice/cartSlice'

const ProductDetails = () => {
  const {id} =useParams()
  console.log(id)
  const [product,setProduct]=useState(null)
  const dispacth=useDispatch()

  useEffect(()=>{
    getProduct()
  },[])

  const getProduct=async()=>{
    const docRef = doc(db, "products", id);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  //console.log("Document data:", docSnap.data());
  const obj={
    id:id,
    ...docSnap.data()
  }

  setProduct(obj)
  
} else {
  // docSnap.data() will be undefined in this case
  //console.log("No such document!");
  toast.error("product not found")
}

  }

  const addToCart=(product)=>{
    dispacth(ADD_To_CART(product))
  }


  return (
    <div style={{marginTop:"60px"}}>
      <section>
        

        {product===null ?

        (
          <div style={{display:"flex",
          justifyContent:"center",
        alignItems:"center"}}>
        <img 
          
          src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif" alt="loading"/>
          </div>):
        (
      
          <>
          
    <div class = "main-wrapper">
    <div class = "container2">
      <div style={{display:"flex",justifyContent:"left",gap:"200px"}}>
      
      <div >
          <Link to="/#products" style={{fontSize:"30px"}}>&larr; back to products</Link>
        </div>
        <h1>Product Details</h1>
        </div>
    <div className="product-div">
      <div className="product-div-left">
        <div className="img-container">
          <div className='img2'><img
            src={product.imageUrl}
          />
          </div>
        </div>
      </div>
      <div className="product-div-right">
        <span className="product-name">(New) {product.name}</span>
        <span className="product-price">$ {product.price}</span>
        <div className="product-rating">
          <span>
            <AiFillStar/>
          </span>
          <span>
          <AiFillStar/>
          </span>
          <span>
          <AiFillStar/>
          </span>
          <span>
          <AiFillStar/>
          </span>
          <span>
          <BiSolidStarHalf/>
          </span>
          <span>(350 ratings)</span>
        </div>
        <p className="product-description">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae animi ad minima veritatis dolore. Architecto facere dignissimos voluptate fugit ratione molestias quis quidem exercitationem voluptas.
        </p>
        <div className="btn-groups">
          <button type="button" className="add-cart-btn" 
          onClick={()=>addToCart(product)}>
            <i className="fas fa-shopping-cart"></i>add to cart
          </button>
          <button type="button" className="buy-now-btn">
            <i className="fas fa-wallet"></i>buy now
          </button>
        </div>
      </div>
    </div>
    </div>
    </div>
          </>

        )}
        </section>
      </div>
  )
}

export default ProductDetails
