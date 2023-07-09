import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

function Home() {
    const [product, setProduct] = useState('')
    const value = useContext(UserContext)
    console.log(value)

    // console.log(product)

    // function tongQty() {
    //     let xx = 1
    //     value.getQty(xx)
    // }


    useEffect(() => {
        axios.get('http://localhost:8080/laravel8/public/api/product')
            .then(res => {
                // console.log(res)
                setProduct(res.data.data)
            })
            .catch(error => console.log(error))
    }, []);
    function hanldeCart(e) {
        const id = e.target.id;
        let objCha = {};
        let objCon = {
            qty: 1
        }
        var xx = localStorage.getItem('data')
        // console.log(xx)
        if (xx) {
            objCha = JSON.parse(xx)
            Object.keys(objCha).map(function (key, index) {
                if (id == key) {
                    objCon.qty = objCha[key] + 1;
                }
            })
        }
        objCha[id] = objCon.qty;
        var xx = JSON.stringify(objCha);
        localStorage.setItem("data", xx)

        let tongQty = 0
        Object.keys(objCha).forEach(function (item) {
            tongQty += objCha[item]
        });
        console.log(tongQty)
        value.getQty(tongQty);
    }



    // console.log(dataCart)
    // console.log(product)
    function renderProduct() {
        if (Object.keys(product).length > 0) {
            const userData = JSON.parse(localStorage["user"])
            // console.log(product)
            return Object.keys(product).map((item, i) => {
                let xx = JSON.parse(product[item].image)
                return (
                    <>
                        <div className="col-sm-4 home">
                            <div className="product-image-wrapper">
                                <div className="single-products">
                                    <div className="productinfo text-center">
                                        <img style={{ width: '242px', height: '252px' }} src={'http://localhost:8080/laravel8/public/upload/product/' + userData.Auth.id + '/' + xx[0]} alt="" />
                                        <span className="price overlay">{product[item].price}</span>
                                        <p>{product[item].name}</p>
                                        {/* to={'/product/cart'} */}
                                        <Link className="btn btn-default add-to-cart add" onClick={hanldeCart}  ><i className="fa fa-shopping-cart" src={'http://localhost:8080/laravel8/public/upload/product/' + userData.Auth.id + '/' + xx[0]} price={product[item].price} name={product[item].name} />
                                            Add to cart
                                        </Link>
                                        {/* <a href="#" id={1} className="btn btn-default add-to-cart add"><i className="fa fa-shopping-cart" />Add to cart</a> */}
                                    </div>
                                    <div className="product-overlay">
                                        <div className="overlay-content">
                                            <span onClick={hanldeCart} value="fdsfds" className="price overlay">{product[item].price}</span>
                                            <p>{product[item].name}</p>
                                            {/* to={'/product/cart'} */}
                                            <a className="btn btn-default add-to-cart add" data-toggle="modal" data-target="#myModal" onClick={hanldeCart} id={product[item].id} src={'http://localhost:8080/laravel8/public/upload/product/' + userData.Auth.id + '/' + xx[0]} gia={product[item].price} name={product[item].name} >
                                                <i className="fa fa-shopping-cart" />
                                                Add to cart
                                            </a>


                                            {/* <a href id={1} className="btn btn-default add-to-cart add" ><i className="fa fa-shopping-cart" />Add to cart</a> */}
                                        </div>
                                    </div>
                                    <img className="new" src="http://localhost:8080/laravel8/public/upload/icon/new.png" />
                                </div>
                                <div className="choose">
                                    <ul className="nav nav-pills nav-justified">
                                        <li>
                                            <Link className="fa fa-plus-square" to={'/product/detail/' + product[item].id} >
                                                Product detail
                                            </Link>
                                        </li>
                                        <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })
        }
    }
    return (
        <>
            <div className="col-sm-9 padding-right">
                <div className="features_items">{/*features_items*/}
                    <h2 className="title text-center">Features Items</h2>
                    {renderProduct()}
                    <p className="result_price" />
                </div>
            </div>
        </>
    )
} export default Home;