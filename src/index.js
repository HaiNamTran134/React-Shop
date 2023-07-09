import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Home from './Home';
import Blog from './components/Blog/Index';
import Detail from './components/Blog/Detail';
import Register from './components/Member/Register';
import Login from './components/Member/Login';
import Update from './components/Member/Update';
import AddProduct from './components/Member/Product/AddProduct';
import MyProduct from './components/Member/Product/MyProduct';
import EditProduct from './components/Member/Product/EditProduct';
import ProductDetail from './components/Product/ProductDetail';
import Cart from './components/Product/Cart';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <Router>
      <App>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/blog/list' element={<Blog />} />
          <Route path='/blog/detail/:id' element={<Detail />} />
          <Route path='/member-register' element={<Register />} />
          <Route path='/member-login' element={<Login />} />
          <Route path='/member/update' element={<Update />} />
          <Route path='/member/product/add' element={<AddProduct />} />
          <Route path='/member/my-product' element={<MyProduct />} />
          <Route path='/member/product/update/:id' element={<EditProduct />} />
          <Route path='/product/detail/:id' element={<ProductDetail />} />
          <Route path='/product/cart' element={<Cart />} />
        </Routes>
      </App>
    </Router>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
