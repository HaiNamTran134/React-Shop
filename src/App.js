import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/Layout/Footer';
import Head from './components/Layout/Head';
import MenuLeft from './components/Layout/MenuLeft';
import MenuAcc from './components/Member/MenuAcc';
import { UserContext } from './UserContext';
import Home from './Home';



function App(props) {
  let params1 = useLocation();
  let themes = 123;
  const [soLuong, setSoLuong] = useState(0)

  function getQty(data) {
    console.log(data)
    setSoLuong(data)
  }
  // console.log(params1)
  console.log(soLuong)

  function renderMenuleft() {
    if (params1['pathname'].includes("member") || params1['pathname'].includes("member/product")) {
      return (
        <MenuAcc />
      )
    }
    if (params1['pathname'].includes("product/cart")) {
      return (
        <>
        </>
      )
    }
    else {
      return (
        <MenuLeft />
      )
    }
  }
  return (
    <UserContext.Provider value={{
      themes: themes,
      getQty: getQty,
      soLuong: soLuong
    }}>

      <Head />
      <section>
        <div className='container'>
          <div className='row'>
            {renderMenuleft()}
            {props.children}
          </div>
        </div>
      </section>
      <Footer />
    </UserContext.Provider >

  );
}

export default App;
