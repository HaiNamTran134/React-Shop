import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";

function Cart() {
    const [product, setProduct] = useState('')
    const value = useContext(UserContext)
    console.log(value);


    let data = localStorage.getItem('data')
    useEffect(() => {
        axios.post("http://localhost:8080/laravel8/public/api/product/cart", data)
            .then((res) => {
                // console.log(res)
                setProduct(res.data.data)
            })
            .catch(error => console.log(error))
    }, []);
    // console.log(product)
    function cart_quantity_up(e) {
        // console.log(e.target)
        const id = e.target.id
        let objCon = {
            qty: 1
        }

        let newProduct = [...product];
        Object.keys(newProduct).map((item, i) => {
            // console.log(newProduct[item])
            if (id == newProduct[item].id) {
                newProduct[item].qty = newProduct[item].qty + 1
                setProduct(newProduct)
            }
        })
        var xx = localStorage.getItem('data')
        if (xx) {
            data = JSON.parse(xx)
            Object.keys(data).map(function (key, index) {
                if (id == key) {
                    objCon.qty = data[key] + 1;
                }
            })
        }
        data[id] = objCon.qty;
        var xx = JSON.stringify(data);
        localStorage.setItem("data", xx)
        let qty = 0
        Object.keys(product).forEach(function (item) {
            qty += product[item].qty
        });
        // console.log(qty)
        value.getQty = qty
    }
    // console.log(product)
    function cart_quantity_down(e) {
        // console.log(e.target)
        const id = e.target.id
        let objCon = {
            qty: 1
        }
        let newProduct = [...product];
        Object.keys(newProduct).map((item, i) => {
            // console.log(newProduct[item])
            if (id == newProduct[item].id) {
                newProduct[item].qty = newProduct[item].qty - 1
                setProduct(newProduct)
            }
        })
        var xx = localStorage.getItem('data')
        if (xx) {
            data = JSON.parse(xx)
            Object.keys(data).map(function (key, index) {
                if (id == key) {
                    objCon.qty = data[key] - 1;
                }
            })
        }
        data[id] = objCon.qty;
        let newProduct1 = [...product];
        var xx = JSON.stringify(data);
        localStorage.setItem("data", xx)
        Object.keys(data).map(function (key, index) {
            // console.log(newProduct1)
            if (data[key] < 1) {
                delete data[key];
                var xx = JSON.stringify(data);
                localStorage.setItem("data", xx);
                console.log(data[key])
                Object.keys(newProduct).map((item, i) => {
                    let newPr = newProduct.filter(function (v) {
                        return v !== newProduct[item]
                    })
                    // console.log(newPr)
                    setProduct(newPr)
                    // // console.log(newProduct[item])
                    // if (id == newProduct[item].id) {
                    //     newProduct[item].qty = newProduct[item].qty - 1
                    //     setProduct(newProduct)
                    //     epmty 
                    // }
                })
            }
        })
        let qty = 0
        Object.keys(product).forEach(function (item) {
            qty += product[item].qty
        });
        // console.log(qty)
        value.getQty = qty;
    }

    function renderData() {
        if (Object.keys(product).length > 0) {
            const userData = JSON.parse(localStorage["user"])
            // console.log(product)
            return Object.keys(product).map((item, i) => {
                let xx = JSON.parse(product[item].image)
                // console.log(product[item])
                let sum = product[item].qty * product[item].price
                return (
                    <>
                        <tr>
                            <td className="cart_product">
                                <a href><img style={{ width: '100px', height: 'auto' }} src={'http://localhost:8080/laravel8/public/upload/product/' + userData.Auth.id + "/" + xx[i]} alt="" /></a>
                            </td>
                            <td className="cart_description">
                                <h4><a href>{product[item].name}</a></h4>
                                <p>Web ID: {product[item].id}</p>
                            </td>
                            <td className="cart_price">
                                <p>${product[item].price}</p>
                            </td>
                            <td className="cart_quantity">
                                <div className="cart_quantity_button">
                                    <a onClick={cart_quantity_up} value={product[item].qty} id={product[item].id} className="cart_quantity_up" href> + </a>
                                    <input className="cart_quantity_input" type="text" name="quantity" Value={product[item].qty} autoComplete="off" size={2} />
                                    <a onClick={cart_quantity_down} value={product[item].qty} id={product[item].id} className="cart_quantity_down" href> - </a>
                                </div>
                            </td>
                            <td className="cart_total">
                                <p className="cart_total_price">${sum}</p>
                            </td>
                            <td className="cart_delete">
                                <a className="cart_quantity_delete" href><i className="fa fa-times" /></a>
                            </td>
                        </tr>
                    </>


                )
            })
        }
    }

    function renderTotal() {
        let s = 0
        Object.keys(product).forEach(function (item) {
            s += product[item].qty * product[item].price;
        });
        // console.log(s)
        return (
            <>
                <div className="total_area">
                    <ul>
                        <li>Cart Sub Total <span>$</span></li>
                        <li>Eco Tax <span>$</span></li>
                        <li>Shipping Cost <span>Free</span></li>
                        <li>Total <span id="tongTien">${s}</span></li>
                    </ul>
                    <a className="btn btn-default update" href>Update</a>
                    <a className="btn btn-default check_out" href>Check Out</a>
                </div>

            </>
        )

    }
    return (
        <>

            <div>
                <section id="cart_items">
                    <div className="container">
                        <div className="breadcrumbs">
                            <ol className="breadcrumb">
                                <li><a href="#">Home</a></li>
                                <li className="active">Shopping Cart</li>
                            </ol>
                        </div>
                        <div className="table-responsive cart_info">
                            <table className="table table-condensed">
                                <thead>
                                    <tr className="cart_menu">
                                        <td className="image">Item</td>
                                        <td className="description" />
                                        <td className="price">Price</td>
                                        <td className="quantity">Quantity</td>
                                        <td className="total">Total</td>
                                        <td />
                                    </tr>
                                </thead>
                                <tbody>

                                    {renderData()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section> {/*/#cart_items*/}
                <section id="do_action">
                    <div className="container">
                        <div className="heading">
                            <h3>What would you like to do next?</h3>
                            <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="chose_area">
                                    <ul className="user_option">
                                        <li>
                                            <input type="checkbox" />
                                            <label>Use Coupon Code</label>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            <label>Use Gift Voucher</label>
                                        </li>
                                        <li>
                                            <input type="checkbox" />
                                            <label>Estimate Shipping &amp; Taxes</label>
                                        </li>
                                    </ul>
                                    <ul className="user_info">
                                        <li className="single_field">
                                            <label>Country:</label>
                                            <select>
                                                <option>United States</option>
                                                <option>Bangladesh</option>
                                                <option>UK</option>
                                                <option>India</option>
                                                <option>Pakistan</option>
                                                <option>Ucrane</option>
                                                <option>Canada</option>
                                                <option>Dubai</option>
                                            </select>
                                        </li>
                                        <li className="single_field">
                                            <label>Region / State:</label>
                                            <select>
                                                <option>Select</option>
                                                <option>Dhaka</option>
                                                <option>London</option>
                                                <option>Dillih</option>
                                                <option>Lahore</option>
                                                <option>Alaska</option>
                                                <option>Canada</option>
                                                <option>Dubai</option>
                                            </select>
                                        </li>
                                        <li className="single_field zip-field">
                                            <label>Zip Code:</label>
                                            <input type="text" />
                                        </li>
                                    </ul>
                                    <a className="btn btn-default update" href>Get Quotes</a>
                                    <a className="btn btn-default check_out" href>Continue</a>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                {renderTotal()}

                            </div>
                        </div>
                    </div>
                </section>{/*/#do_action*/}
            </div>
        </>




    );
} export default Cart