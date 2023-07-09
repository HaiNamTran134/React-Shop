import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";


function Head() {
    const value = useContext(UserContext)
    console.log(value)

    var yy = localStorage.getItem("user");
    if (yy) {
        yy = JSON.parse(yy)
    }
    const navigate = useNavigate();

    function renderLogin() {
        if (yy) {
            return (
                <>
                    <li className="nav-item">
                        <a className="nav-link" onClick={logout} id="cart" ><i className="fa fa-shopping-cart" />Logout</a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/member/update"><i className="fa fa-lock" />Account</Link>
                    </li>
                </>


            )
        } else {
            return (
                <li className="nav-item" >
                    <Link className="nav-link" to="/member-login"><i className="fa fa-lock" />Login</Link>
                </li>
            )
        }
    }

    function logout() {
        localStorage.clear()
        navigate('/member-login')
    }

    // function account() {
    //     localStorage.clear()
    //     navigate('/member-login')
    // }

    return (
        <header id="header">{/*header*/}
            <div className="header_top">{/*header_top*/}
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="contactinfo">
                                <ul className="nav nav-pills">
                                    <li><a href="#"><i className="fa fa-phone" /> +2 95 01 88 821</a></li>
                                    <li><a href="#"><i className="fa fa-envelope" /> info@domain.com</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="social-icons pull-right">
                                <ul className="nav navbar-nav">
                                    <li><a href="#"><i className="fa fa-facebook" /></a></li>
                                    <li><a href="#"><i className="fa fa-twitter" /></a></li>
                                    <li><a href="#"><i className="fa fa-linkedin" /></a></li>
                                    <li><a href="#"><i className="fa fa-dribbble" /></a></li>
                                    <li><a href="#"><i className="fa fa-google-plus" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>{/*/header_top*/}
            <div className="header-middle">{/*header-middle*/}
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 clearfix">
                            <div className="logo pull-left">
                                <a href="http://localhost:8080/laravel8/public"><img src="http://localhost:8080/laravel8/public/frontend/images/home/logo.png" alt="" /></a>
                            </div>

                        </div>
                        <div className="col-md-8 clearfix">
                            <div className="shop-menu clearfix pull-right">
                                <ul className="nav navbar-nav">

                                    <li>
                                        <Link to='/product/cart'><i className="fa fa-shopping-cart" /><span className="badge badge-warning count-cart" id="lblCartCount" /> Cart ({value.soLuong})</Link>
                                        {/* <a href="http://localhost:8080/laravel8/public/yourCart"><i className="fa fa-shopping-cart" /><span className="badge badge-warning count-cart" id="lblCartCount" /> Cart</a> */}
                                    </li>
                                    {renderLogin()}

                                    <li className="nav-item">
                                        <Link className="nav-link" to="/member-register"><i className="fa fa-user" />Register</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>{/*/header-middle*/}
            <div className="header-bottom">{/*header-bottom*/}
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                    <span className="icon-bar" />
                                </button>
                            </div>
                            <div className="mainmenu pull-left">
                                <ul className="nav navbar-nav collapse navbar-collapse">
                                    <li><Link to="/" className="active">Home</Link></li>
                                    <li className="dropdown"><a href="/">Shop<i className="fa fa-angle-down" /></a>
                                    </li>
                                    <li className="dropdown"> <Link to="/blog/list">Blog<i className="fa fa-angle-down" ></i></Link>
                                    </li>
                                    <li><a href="contact-us.html">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="search_box pull-right">
                                <form style={{ position: 'relative' }} action="http://localhost:8080/laravel8/public/search" method="GET">
                                    <input type="hidden" name="_token" defaultValue="QYn8oTzT8PG44DXucpfAlyzpY7g4AmdOi4UeB19t" />							<input type="text" name="search_content" placeholder="Search" />
                                    <button type="submit" className="btn btn-default search">Search
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>{/*/header-bottom*/}
        </header>
    );

}
export default Head