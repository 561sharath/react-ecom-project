import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import {auth} from "../../firebase/config"
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsGoogle} from 'react-icons/bs'
const Login = () => {
    const [email,setEmail]= useState("")
    const [password,setPassword] = useState("")
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()
    const divStyle = {
      marginTop: '70px'
    };
    

    const loginUser=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
    setIsLoading(false)
    toast.success("Login Successfully...")
    
    // ...
    navigate("/")
  })
  .catch((error) => {
    setIsLoading(false)
    toast.error(error.message)
  });
    }
  const provider = new GoogleAuthProvider();
  const signInWithGoogle =() =>{

    signInWithPopup(auth, provider)
  .then((result) => {
    
    const user = result.user;
    toast.success("Login Successfully..")
    navigate("/")
  }).catch((error) => {

    toast.error(error.message)
    
    
  });



  }
  return (
    <div style={divStyle}>
    <ToastContainer />
    {isLoading}
    <div >
    <section class="vh-100" >
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image"/>
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form onSubmit={loginUser}>
          <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p class="lead fw-normal mb-0 me-3">Sign in with :</p>
            <button type="submit" class="btn btn-primary btn-floating mx-1"
            onClick={signInWithGoogle}>
              <BsGoogle />
            </button>

            
          </div>

          <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          
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

          <div class="d-flex justify-content-between align-items-center">
            
            <div class="form-check mb-0">
              <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label class="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            <Link to='/Reset'>
            <a href="#!" class="link-primary ">Forgot password?</a>
            </Link>
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="submit" class="btn btn-primary btn-lg me-2"
              >Login</button>
            
            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                class="link-danger"><Link to="/Register">Register</Link></a></p>
            
          </div>

        </form>
      </div>
    </div>
  </div>
  
</section>
</div>

    
  
    </div>
  )
}

export default Login
