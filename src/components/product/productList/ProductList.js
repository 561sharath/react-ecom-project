
import React,{useEffect, useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { LoadBundleTask, collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { GET_PRICE_RANGE, STORE_PRODUCTS, selectMaxPrice, selectMinPrice, selectProducts } from '../../../redux/slice/productSlice';
import { FILTER_BY_CATEGORY, FILTER_BY_PRICE, FILTER_BY_SEARCH, LOAD_PRODUCTS, SORT_BY_ALL_PRODUCTS, SORT_PRODUCTS, selectFilteredProducts } from '../../../redux/slice/filterSlice';
import Search from '../../search/Search';
import ProductItem from '../productItem/ProductItem';
import { useFetcher } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';





const ProductList = () => {
  const [category,setCategory]=useState("All")
   const [items,setitems]=useState([])
   const [ search,setSearch]=useState("")
   const [price,setPrice]=useState(150000)
  const [sort,setSort] = useState("latest")
  const [cat,setCat]=useState("All")
  const dispatch=useDispatch()
  const productdata=useSelector(selectProducts)
  const filteredProducts=useSelector(selectFilteredProducts)
  useEffect(()=>{
    const database = collection(db,'products');
    const q = query(database);
     onSnapshot(q, (snapshot) => {
      const data=snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
      }))
    
     setitems(data)
     dispatch(STORE_PRODUCTS(data))
     dispatch(LOAD_PRODUCTS(data))
     dispatch(GET_PRICE_RANGE({data}))

    
        });

},[])

const minPrice = useSelector(selectMinPrice)
  const maxPrice= useSelector(selectMaxPrice)



useEffect(()=>{
  dispatch(LOAD_PRODUCTS(items))
},[])


      const handelSearchSort=(e)=>{
        setSort(e.target.value)
        
      }
      
      

      useEffect(()=>{
        dispatch(FILTER_BY_SEARCH({items,search}))
        
      },[search])

      useEffect(()=>{
        dispatch(SORT_PRODUCTS({items,sort}))
      },[dispatch,sort])

      useEffect(()=>{
        dispatch(FILTER_BY_PRICE({items,price}))
      },[dispatch,price])



      
     

      

     
     
  return (
    
    <>

    <div className="container-box">
            
            <h1>Welcome to The EShop</h1>
            <h2>The Great Deals Are Here EveryDay</h2>
            <p>Made With Love,Fashion,Style, Premium Quality</p>
            
    </div>
    
    
    
    <b style={{marginLeft:"120px",color:"green",fontSize:"20px"}}><b>{filteredProducts.length}</b> </b>products found.
    <b style={{marginLeft:"220px"}}> Price Range :<b
    style={{color:"green"}}>{`$${price}`}</b></b>
    <div style={{display:"flex",
    gap:"160px"}}>
        <p>
        
          <Search value={search} onChange={(e)=>
          setSearch(e.target.value)}/>
        </p>
        
        <input 
        style={{padding:"20px 20px 20px 10px"}}
        type='range' value={price}  
       onChange={(e)=>setPrice(e.target.value )} min={minPrice} max={maxPrice}></input>

    
    <div>
          <label>
            <b><p style={{fontSize:"20px"}}>sort by : </p></b>
          </label>
          <select style={{padding:"10px 20px 10px 10px"}} value={sort} 
            onChange={handelSearchSort}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest-Price</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>

          </select>
      </div>
    </div>
    
            

    {items.length===0 ? (
      <p>no product found</p>
    ) : (
      
      <ProductItem product={filteredProducts} />
    )}
    

  </>
  )
}

export default ProductList
