import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectProducts } from '../../../redux/slice/productSlice'


const slidebar = () => {
  
  
  
  


  return (
    
    <div style={{marginTop:"50px"}}>
      <div className="blue-section">
            
            <div className="cat">
                <b>Categories :</b>

            </div>
            <hr className='hr1'/>
            <Link to="">
            <a href="#">All</a>
            
            </Link>
            <hr className='hr1'/>
            <Link to=''>
            <a href="#">Fashion</a>
            </Link>
            <hr className='hr1'/>
            <Link to=''>
            <a href="#">Electronics</a>
            </Link>
            <hr className='hr1'/>
            <Link to=''>
            <a href="#">Mobiles</a>
            </Link>
            <hr className='hr1'/>
            <Link to=''>
            <a href="#">Laptops</a>
            </Link>
            
            <hr />
            <div className='cat'>
              <b>Brands :</b>
            </div>
            <div className='cat'>
            <select>
              <option>All</option>
              <option>HP</option>
              <option>Dell</option>
              <option>Fashion</option>
              <option>Electronics</option>
            </select>
            </div>
            <hr />
            <div className='cat'>
              <b>Price :</b>
              
            </div>
            <div className='cat'>
              <input type='range' />
            </div>




            
            
            
          
            
            
      

          </div>
          
      

        

    <div className='green-section'>
      
    </div>
        
    </div>
   
  )
}

export default slidebar
