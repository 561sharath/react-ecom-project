import React from 'react'
import Navbar from '../../components/admin/navbar/Navbar'
import { Route, Routes } from 'react-router-dom'

import ViewProducts from '../../components/admin/viewProducts/ViewProducts'
import AddProducts from '../../components/admin/addProducts/AddProducts'
import Orders from '../../components/admin/orders/Orders'
import Home from '../../components/admin/home/Home'

const Admin = () => {
  return (
    <div>
        <Navbar />
        
        <Routes>
            <Route path='Home' element={<Home />}/>
            <Route path='Products' element={<ViewProducts />}/>
            <Route path='add-product/:id' element={<AddProducts />}/>
            <Route path='orders' element={<Orders />}/>

        </Routes>


      
    </div>
  )
}

export default Admin
