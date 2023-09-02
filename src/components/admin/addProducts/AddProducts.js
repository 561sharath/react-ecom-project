import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React from 'react'
import { useState } from 'react'
import { db, storage } from '../../../firebase/config'
import { toast } from 'react-toastify'
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore'
import { ToastHeader } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../loader/Loader'
import { useSelector } from 'react-redux'
import { selectProducts } from '../../../redux/slice/productSlice'

const categories =[
  {id:1,name:"Laptop"},
  {id:2,name:"Electronics"},
  {id:3,name:"Fashion"},
  {id:4,name:"Phone"},
]

const initialState={
  name:"",
        
        price:0,
        category:"",
        brand:"",
        desc:"",
        imageUrl:"",
}

const divstyle={
  marginTop:'70px'
}

const centerdiv={
  display:'flex',
  justifyContent:'center',
  alignItemsCenter:'center',
  textDecoration:'underline',
  color:'green',
  
  
}

const AddProducts = () => {
  const {id}=useParams()
  console.log(id)
  const products=useSelector(selectProducts)
  console.log(products)
    const productEdit=products.find((item)=>item.id===id)
    console.log(productEdit)
    const [product,setProduct] = useState(()=>{
      const newState=detectForm(id,
        {...initialState},
        productEdit
        )
        return newState
    })

    const [isLoading,setIsLoading]= useState(false)
    
    

    const navigate=useNavigate()

    function detectForm(id,f1,f2){

      if (id==="ADD"){
        return f1
      }
      
      return f2
      

    }

    const handeleInputChange=(e)=>{
      const {name,value}= e.target
      setProduct({...product,[name]:value})
    };
    const handeleImageChange=(e)=>{
      const file = e.target.files[0]

      const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);


      uploadTask.on('state_changed', 
  (snapshot) => {
    
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
    
  }, 
  (error) => {
    toast.error(error.message)
  }, 
  () => {
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setProduct({...product,imageUrl:downloadURL})
      toast.success("image uploaded successfully")
    });
  }
);

    }

    const addProducts=(e)=>{
      e.preventDefault()
      //console.log(product);
      setIsLoading(true)

      try{
        const docRef =  addDoc(collection(db, "products"), {
          name:product.name,
          price:Number(product.price),
        category:product.category,
        brand:product.brand,
        desc:product.desc,
        imageUrl:product.imageUrl,
        createdAt:Timestamp.now().toDate()
        });

        setIsLoading(false)
        setProduct({...initialState})
        toast.success("product added sucessfully")
        navigate("/admin/products")
      }
      catch(error){
        setIsLoading(false)
        toast.error(error.message)

      }
    }

    const editProducts=(e)=>{
      e.preventDefault()
      setIsLoading(true)

      if (product.imageUrl!== productEdit.imageUrl){

        const storageRef = ref(storage, productEdit.imageUrl);
        deleteObject(storageRef)

      }

      try{

          setDoc(doc(db, "products", id), {

            name:product.name,
            price:Number(product.price),
            category:product.category,
            brand:product.brand,
            desc:product.desc,
            imageUrl:product.imageUrl,
            createdAt:productEdit.createdAt,
            editedAt:Timestamp.now().toDate()


          });

          setIsLoading(false)
          toast.success("product edited sucessfully")
          navigate("/admin/products")
        



      }
      catch(error){
        setIsLoading(false)
        toast.error(error.message)
      }

    }
    
  return (
    <div style={divstyle}>
    {isLoading && <Loader/>}
    <div>
    <h2 style={centerdiv}>{detectForm(id,"Add New Product :","Edit Product :")}</h2>
    <form onSubmit={detectForm(id,addProducts,editProducts)}>
            <div >
            <div class="row mb-3">
              <div class="col">
                <div class="form-outline">
                    <label className="form-label" for="form6Example1">Product Name :</label>
                  <input type="text" id="form6Example1" placeholder="Product Name"
                  name="name" value={product.name} onChange={(e)=> handeleInputChange(e)}  class="form-control" />
                  
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                    <label class="form-label" for="form6Example2">product Image :</label>
                  <input type="file"  accept='image/*' id="form6Example2" 
                   name="image" onChange={(e) => handeleImageChange(e)} class="form-control" />
                  
                </div>
              </div>
            </div>
          
            
            <div class="row mb-3">
                <div class="col">
                  <div class="form-outline">
                      <label class="form-label" for="form6Example1">ImageUrl :</label>
                    <input type="text" name="imageUrl" value={product.imageUrl} id="form6Example1" class="form-control" disabled/>
                    
                  </div>
                </div>
                <div class="col">
                  <div class="form-outline">
                      <label class="form-label" for="form6Example2">product Price :</label>
                    <input type="number"  name='price' placeholder="product price" 
                    value={product.price} onChange={(e) => handeleInputChange(e)} id="form6Example2" class="form-control" />
                    
                  </div>
                </div>
              </div>
          
            
            <div class="row mb-3">
                <div class="col">
                  <div class="form-outline">
                      <label class="form-label" for="form6Example1">Product Categories :</label>
                    <select required >
                        <option disabled>--Choose product Category</option>
                        {categories.map((cat)=>{
                          return (
                            <option key={cat.id} value={cat.name}>
                              {cat.name}
                            </option>
                          )
                        })}

                    </select>
                    
                  </div>
                </div>
                <div class="col">
                  <div class="form-outline">
                      <label class="form-label" for="form6Example2">Product Company/Brand :</label>
                    <input type="text" name='brand'  placeholder="Product Company/Brand" 
                    value={product.brand} onChange={(e) => handeleInputChange(e)} id="form6Example2" class="form-control" />
                    
                  </div>
                </div>
            </div>
            
            <div class="form-outline d-flex justify-content-center mb-4">
                <label class="form-label" for="form6Example7">Product Description :</label>
              <textarea class="form-control" id="form6Example7" rows="4" 
              name='desc' value={product.desc} onChange={(e)=>handeleInputChange(e)} required placeholder='description'></textarea>
              
            </div>
          
            
            <div class="form-check d-flex justify-content-center mb-4">
                
              <input class="form-check-input me-2" type="checkbox" value="" id="form6Example8" checked />
              <label class="form-check-label" for="form6Example8"> Create an account? </label>
            </div>
          
            
            <button  type="submit" class="btn btn-success btn-block mb-4">
              {detectForm(id,"Save Product","Edit Product")}
            </button>
            </div>
          </form>
        
    </div>
    </div>
  )
}

export default AddProducts
