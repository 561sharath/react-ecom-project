import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../firebase/config"





const Register = () => {
    const [email,setEmail]= useState("")
    const [password,setPassword] = useState("")
    const [cpassword,setCpassword] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()
    const registerUser =(e)=>{
        e.preventDefault()
        if (password!==cpassword){
            toast.error("passwords do not macth.")

        }
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {

    const user = userCredential.user;
    console.log(user)
    setIsLoading(false)
    toast.success("Registration successfull...")
    navigate("/login")
  
  })
  .catch((error) => {
    
    toast.error(error.message)
    setIsLoading(false)
  });
    }
  return (
    <>
    
    <ToastContainer />
    {isLoading}
    <section class="vh-100" >
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image"/>
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form onSubmit={registerUser}>
          
          <div class="form-outline mb-4">
          <label class="form-label" for="form3Example3">Email address :</label>
            <input type="email" id="form3Example3" class="form-control form-control-lg"
              placeholder="Enter a valid email address" required value={email}
              onChange={(e => setEmail(e.target.value))}/>
            
          </div>

          
          <div class="form-outline mb-3">
          <label class="form-label" for="form3Example4">Password :</label>
            <input type="password" id="form3Example4" class="form-control form-control-lg"
            required value={password} onChange={(e => setPassword(e.target.value))}
              placeholder="Enter password" />
            
          </div>

          <div class="form-outline mb-3">
          <label class="form-label" for="form3Example4">Confirm Password :</label>
            <input type="password" id="form3Example4" class="form-control form-control-lg"
            required value={cpassword} onChange={(e => setCpassword(e.target.value))}
              placeholder="Enter password" />
            
          </div>

          <div class="d-flex justify-content-between align-items-center">
            
            <div class="form-check mb-0">
              <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label class="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="submit" class="btn btn-primary btn-lg me-2"
              >Register</button>
            
            <p class="small fw-bold mt-2 pt-1 mb-0">Already have an account? <a href="#!"
                class="link-danger"><Link to="/Login">Login</Link></a></p>
            
          </div>

        </form>
      </div>
    </div>
  </div>
  
</section>

    </>
  )
}

export default Register
