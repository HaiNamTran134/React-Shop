import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function ProductDetail() {
    let params = useParams();
    const [product, setProduct] = useState('')
    const [img1, setImg1] = useState('')
    useEffect(() => {
        const userData = JSON.parse(localStorage["user"])
        axios.get('http://localhost:8080/laravel8/public/api/product/detail/' + params.id)
            .then(res => {
                setProduct(res.data.data)
                let xx = JSON.parse(res.data.data.image)
                setImg1('http://localhost:8080/laravel8/public/upload/product/' + userData.Auth.id + '/' + xx[0])
            })
            .catch(error => console.log(error))
    }, []);
    console.log(product)
    function clickImg(e) {
        console.log(e.target.src)
        setImg1(e.target.src)

    }
    function renderImage() {
        if (Object.keys(product).length > 0) {
            let xx = JSON.parse(product.image)
            return xx.map((value, key) => {
                // console.log(xx)
                return (
                    <>
                        <a><img width='84px' onClick={clickImg} height='auto' className="choose" src={'http://localhost:8080/laravel8/public/upload/product/' + product.id_user + "/" + xx[key]} alt="" /></a>
                        {/* <input onClick={clickImg} src={'http://localhost:8080/laravel8/public/upload/product/' + product.id_user + "/" + xx[key]}></input> */}
                    </>
                )
            })
        }
    }
    function renderProduct() {
        if (Object.keys(product).length > 0) {
            const userData = JSON.parse(localStorage["user"])
            let xx = JSON.parse(product.image)
            // console.log(JSON.parse(product.image).length)
            return (
                <>
                    <div className="product-details">
                        <div className="col-sm-5">
                            <div className="view-product">
                                {/* <img id="img_main" src={'http://localhost:8080/laravel8/public/upload/product/' + userData.Auth.id + '/' + xx[0]} alt="" /> */}
                                <img id="img_main" src={img1} alt="" />
                                <a id="img_zoom" href="http://localhost:8080/laravel8/public/upload/product/3/1678263749_untitled-4-1678181845-301-width740height555_anh_cat_3_2.jpeg" rel="prettyPhoto"><h3>ZOOM</h3></a>
                            </div>
                            <div id="similar-product" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="item active"               >
                                        {renderImage()}
                                    </div>
                                </div>

                                <a className="left item-control" href="#similar-product" data-slide="prev">
                                    <i className="fa fa-angle-left" />
                                </a>
                                <a className="right item-control" href="#similar-product" data-slide="next">
                                    <i className="fa fa-angle-right" />
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="product-information">{/*/product-information*/}
                                <h2>{product.name}</h2>
                                <p>WEB ID : {product.id}</p>
                                <span>Rating (0)  :</span>
                                <form style={{ display: 'inline-block' }} method="POST">
                                    <input type="hidden" name="_token" defaultValue="0GtIupckWCLZjQjSIzYv4oHHhnGHUQ2JfDyZwJK8" />
                                    <div className="rating">
                                        <div className="star one">
                                            <input type="hidden" defaultValue={1} />
                                        </div>
                                        <div className="star two">
                                            <input type="hidden" defaultValue={2} />
                                        </div>
                                        <div className="star three">
                                            <input type="hidden" defaultValue={3} />
                                        </div>
                                        <div className="star four">
                                            <input type="hidden" defaultValue={4} />
                                        </div>
                                        <div className="star five">
                                            <input type="hidden" defaultValue={5} />
                                        </div>
                                        <span className="value" style={{ fontWeight: 'bold', color: 'orange' }} />
                                        <input type="text" name="id_product" defaultValue={1} hidden />
                                        <input type="text" name="id_user" defaultValue={26} hidden />
                                    </div>
                                </form>
                                <p className="ajax-rated" />
                                <span>
                                    <span className="price">{product.price}</span>

                                    <button type="button" className="btn btn-fefault cart">
                                        <i className="fa fa-shopping-cart" />
                                        Add to cart
                                    </button>
                                </span>
                                <p><b>Availability:</b> In Stock</p>
                                <p><b>Condition:</b>1</p>
                                <p><b>Brand: </b>{product.id_brand}</p>
                                <p><b>Rating: </b>  <img style={{ width: '12px' }} src="http://localhost:8080/laravel8/public/upload/icon/star-rating.png" /></p>
                            </div>{/*/product-information*/}
                        </div>
                    </div>{/*/product-details*/}
                </>
            )

        }

    }

    return (
        <div className="col-sm-9 padding-right">
            <div className="col-md-12 padding-right">
                {renderProduct()}

                <div className="category-tab shop-details-tab">{/*category-tab*/}
                    <div className="col-sm-12">
                        <ul className="nav nav-tabs">
                            <li><a href="#details" data-toggle="tab">Details</a></li>
                            <li><a href="#company_profile" data-toggle="tab">Company Profile</a></li>
                            <li><a href="#tag" data-toggle="tab">Tag</a></li>
                            <li className="active"><a href="#reviews" data-toggle="tab">Reviews (0)</a></li>
                        </ul>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane fade in" id="details">
                            bản đẹp
                        </div>
                        <div className="tab-pane fade in" id="company_profile">
                            baovic
                        </div>
                        <div className="tab-pane fade active in" id="reviews">
                            <div className="col-sm-12">
                                <ul className="review_list">
                                </ul>
                            </div>
                            <div className="col-sm-12">
                                <ul>
                                    <li><a><i className="fa fa-user" />Trần Hải Nam</a></li>
                                    <li><a><i className="fa fa-clock-o" />11:09</a></li>
                                    <li><a><i className="fa fa-calendar-o" />03/06/2023</a></li>
                                </ul>
                                <p className="auth_check" />
                                <p><b>Write Your Review</b></p>
                                <form id="form_review" method="POST">
                                    <input type="hidden" name="_token" defaultValue="0GtIupckWCLZjQjSIzYv4oHHhnGHUQ2JfDyZwJK8" />							<div className="alert alert-info reply_user">
                                        <button type="button" className="close_reply" data-dismiss="alert">×</button>
                                    </div>
                                    <textarea name="review" defaultValue={""} />
                                    <input type="text" name="id_sub" id="id_sub" defaultValue hidden />
                                    <button type="submit" className="btn btn-default pull-right">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );

} export default ProductDetail;