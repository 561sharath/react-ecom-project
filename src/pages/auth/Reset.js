import { sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { auth } from '../../firebase/config'


const Reset = () => {

  const [email,setEmail]= useState("")
  const [isLoading,setIsLoading] = useState(false)

  const resetPassword=(e)=>{
    e.preventDefault()
    setIsLoading(true)
    
    sendPasswordResetEmail(auth,email)
    .then(()=>{

      setIsLoading(false)
      toast.success("check your email")

    })
    .catch((error) =>{
      setIsLoading(false)
      toast.error(error.message)

    })


  }
  return (
    <>
    <ToastContainer />
    {isLoading }
    <section class="vh-100" >
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image"/>
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form >
          
          <div class="form-outline mb-4">
          <label class="form-label" for="form3Example3">Email address :</label>
            <input type="email" id="form3Example3" class="form-control form-control-lg"
              placeholder="Enter a valid email address" required value={email}
              onChange={(e => setEmail(e.target.value))}/>
            
          </div>

          
          

          

          

          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="submit" class="btn btn-primary btn-lg me-2"
              >Reset</button>
            
            <p class="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="#!"
                class="link-danger"></a></p>
            
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <Link to='/Login'>
              <button type="submit" class="btn btn-success btn-lg me-2"
                >Login</button>
            </Link>
            <Link to='/Register'>
              <button type="submit" class="btn btn-success btn-lg me-2"
                >Register</button>
            </Link>
            
          </div>
          

        </form>
      </div>
    </div>
  </div>
  
</section>

    </>
  )
}

export default Reset
