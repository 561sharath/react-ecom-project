import { collection, onSnapshot, query } from 'firebase/firestore'
import React,{useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../../firebase/config'
import { GET_PRICE_RANGE, STORE_PRODUCTS, selectProducts } from '../../redux/slice/productSlice'
import { useDispatch, useSelector } from 'react-redux'
import './Productcss.css'
import Slidebar from './slidebar/slidebar';
import ProductList from './productList/ProductList';
import ProductFilter from './productFilter/ProductFilter';

const Product = () => {
   const [items,setitems]=useState([])
  const dispatch=useDispatch()
  const productdata=useSelector(selectProducts)
  
  useEffect(()=>{
    const database = collection(db,'products');
    const q = query(database);
     onSnapshot(q, (snapshot) => {
      const data=snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
      }))
    
     setitems(data)
     dispatch(STORE_PRODUCTS({productdata:data,}))
     
     
     

    
  });

},[])
  return (
    
    <>
    
    <ProductFilter />
    <ProductList products={items}/>
    
   
    
  </>
  )
}

export default Product
