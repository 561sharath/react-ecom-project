import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { db } from '../../../firebase/config'
import { Link } from 'react-router-dom'

const ViewProducts = () => {
  const margintop={
    marginTop:'80px',
  }
  const dispatch=useDispatch()
  
  const[items,setitems]=useState([])
  const deleteitem=async (id,imageUrl)=>{
    await deleteDoc(doc(db,'products',id))

  }
  useEffect(()=>{
    const database = collection(db,'products');
    const q = query(database);
     onSnapshot(q, (snapshot) => {
      const data=snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data(),
      }))
    
     setitems(data)
    
  });

},[])
console.log(items)
  return (
    <div>

<div className='flex flex-col items-center p-4'>
  <div className="bg-blue-500 w-full py-2 mb-4 text-center font-semibold text-white rounded-t-lg shadow-md">
    Products List
  </div>
  <div className='w-full overflow-x-auto'>
    <table className='w-full border border-collapse'>
      <thead>
        <tr className='bg-gray-200'>
          <th className='px-4 py-2'>Name</th>
          <th className='px-4 py-2'>Image</th>
          <th className='px-4 py-2'>Price</th>
          <th className='px-4 py-2'>Category</th>
          <th className='px-4 py-2'>Brand</th>
          <th className='px-4 py-2'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((product, index) => (
          <tr key={product.id} className='transition-all hover:bg-gray-100'>
            <td className='px-4 py-2'>{product.name}</td>
            <td className='px-4 py-2'>
              <img
                src={product.imageUrl}
                width={100}
                alt={product.name}
                className='max-h-24 object-cover rounded'
              />
            </td>
            <td className='px-4 py-2'>${product.price}</td>
            <td className='px-4 py-2'>{product.category}</td>
            <td className='px-4 py-2'>{product.brand}</td>
            <td className='px-4 py-2 flex gap-2'>
              <p className='cursor-pointer text-red-500 hover:text-red-700 transition-colors' onClick={() => deleteitem(product.id, product.imageUrl)}>del</p>
              <Link to={`/admin/add-product/${product.id}`} className='text-blue-500 hover:text-blue-700 transition-colors'>edit</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
      
    </div>
  )
}

export default ViewProducts
