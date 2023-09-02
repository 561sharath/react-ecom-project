
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Contact from './pages/contact/Contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Reset from './pages/auth/Reset';
import AdminOnlyRoute from './components/adminOnlyRoute/AdminOnlyRoute';
import Admin from './pages/admin/Admin';
import Header from './components/header/Header';
import ProductDetails from './components/product/productDetails/ProductDetails';
import Product from './components/product/Product';
import Cart from './pages/cart/Cart';
import ProductItem from './components/product/productItem/ProductItem';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/Contact' element={<Contact />}/>
        <Route path='/Login' element={<Login />}/>
        <Route path='/Register' element={<Register />}/>
        <Route path='/Reset' element={<Reset />}/>
        
        <Route path='/Product' element={<Product />}/>

        <Route path="/admin/*" element={ 
        <AdminOnlyRoute>
          <Admin/>
        </AdminOnlyRoute>
      }
      />
      
      <Route path="/product-details/:id" element={<ProductDetails/>}/>

      <Route path="/Cart" element={<Cart />}/>

      </Routes>
      
      </BrowserRouter>
      

    </div>
  );
}

export default App;
