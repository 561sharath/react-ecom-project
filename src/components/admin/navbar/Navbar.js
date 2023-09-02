import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbarcss.css'

const Navbar = () => {
  
  const [data,setData]=useState("")


  return (
    
    <div style={{marginTop:"50px"}}>
      <div className="blue-section">
            <div className="total-left">
            <div className="cat">
                <b>Categories :</b>

            </div>
            <hr />
            <Link to="/admin/home">
            <a href="#">Home</a>
            
            </Link>
            <hr />
            <Link to='/admin/add-product/ADD'>
            <a href="#">Add-Products</a>
            </Link>
            <hr />
            <Link to='/admin/Products'>
            <a href="#">view-Products</a>
            </Link>
            <hr />
            <Link to='/admin/orders'>
            <a href="#">Orders</a>
            </Link>
            <hr />


            
            
            
          
            
            
      </div>

          </div>
          
      

        

    <div className='green-section'>
      
    </div>
        
    </div>
   
  )
}

export default Navbar
