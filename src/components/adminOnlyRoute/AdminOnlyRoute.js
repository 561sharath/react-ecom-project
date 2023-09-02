import React from 'react'
import { useSelector } from 'react-redux'
import { selectEmail } from '../../redux/slice/authSlice'
import { Link } from 'react-router-dom'


const AdminOnlyRoute = ({children}) => {
    const userEmail = useSelector(selectEmail)
    console.log(userEmail)

    if (userEmail==="sharathsardar1432@gmail.com"){
        return children
    }
    
    return (
        <div>
            <h1>acess denined</h1>
            <h1>only for the admin</h1>

        
        <Link to="/">
        <button>&larr; Back To Home</button>
        </Link>
        
        </div>
        
        
    )
  
}
 export const AdminOnlyLink = ({children}) => {
    const userEmail = useSelector(selectEmail)

    if (userEmail==="sharathsardar1432@gmail.com"){
        return children
    }
    
    return null
  
}

export default AdminOnlyRoute
