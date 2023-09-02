import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {  ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from '../../firebase/config';
import { useDispatch } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import ShowOnLogin, { ShowOnLogOut } from '../hiddenLinks/HiddenLinks';
import AdminOnlyRoute, { AdminOnlyLink } from '../adminOnlyRoute/AdminOnlyRoute';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Search from '../search/Search';
import {TbAlertOctagonFilled} from 'react-icons/tb'
const Header = () => {
    const [displayName,setdisplayName]=useState('')
    const navigate = useNavigate()
    const dispacth = useDispatch()
    const styles={
      position:'fixed',
      top:0,
      right:0,
      left:0,
      Zindex:50,
    }
    
    
    useEffect(()=>{

        onAuthStateChanged(auth, (user) => {
            if (user) {
              
              //const uid = user.uid;
              //console.log(user.displayName)
              setdisplayName(user.displayName)

              dispacth(SET_ACTIVE_USER({
                email:user.email,
                useName:user.displayName,
                userID:user.uid,
              }))
            } else {

                setdisplayName("")
                dispacth(REMOVE_ACTIVE_USER())


              
            }
          });

    },[dispacth,displayName])

    const logoutUser = () =>{
        const auth = getAuth();
signOut(auth).then(() => {
  toast.error("Logout Successfully..")
  navigate("/")
}).catch((error) => {
  toast.error(error.message)
});
    }



  return (
    <>
<ToastContainer />
<Navbar expand="lg" className="bg-body-tertiary fixed-top">
      <Container fluid>
        <Navbar.Brand href="/">E<span>Shop</span></Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <AdminOnlyLink>
                <Nav.Link href="/admin/home" style={{color:"black"}}>Admin</Nav.Link>
            </AdminOnlyLink>
            <Nav.Link href="/" style={{color:"black"}}>Home</Nav.Link>
            <Nav.Link href="/Contact" style={{color:"black"}}>Contact</Nav.Link>
            
            
          </Nav>

          <Nav className="me-auto my-2 my-lg-0">
          <marquee style={{color:'black'}}><TbAlertOctagonFilled style={{color:'red'}}/> welcome to the fashion world,The Great Deals Are Here
Made With Love,Fashion,Style, Premium Quality <TbAlertOctagonFilled style={{color:'red'}}/></marquee>
            
          </Nav>
          
          
          
          <Form className="d-flex">
            
            <ShowOnLogOut>
                <Link to='/login'>
                    <Button variant="success" className='me-2'>LogIn</Button>
                </Link>
            </ShowOnLogOut>
            
            
            <ShowOnLogin>
                <Nav.Link to='/orders-history'>
                    <Button variant="outline-success" className='me-2 '>MyOrders</Button>
                </Nav.Link>
            </ShowOnLogin>
            <ShowOnLogin>
                <Nav.Link to='/' onClick={logoutUser}>
                    <Button variant="danger" className='me-2'>LogOut</Button>
                </Nav.Link>
            </ShowOnLogin>
            <Link to='/Cart'>
                <Button variant="info" className='me-2'>Cart</Button>
            </Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    
    
    </>
  )
}

export default Header
