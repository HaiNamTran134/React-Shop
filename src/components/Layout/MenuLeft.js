function MenuLeft() {
    return (
        <div className="col-sm-3">
            <div className="left-sidebar">
                <h2>Category</h2>
                <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><a href="http://localhost:8080/laravel8/public/product/category/3">iphone</a></h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><a href="http://localhost:8080/laravel8/public/product/category/4">samsung</a></h4>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title"><a href="http://localhost:8080/laravel8/public/product/category/5">nokia</a></h4>
                        </div>
                    </div>
                </div>{/*/category-products*/}
                <div className="brands_products">{/*brands_products*/}
                    <h2>Brands</h2>
                    <div className="brands-name">
                        <ul className="nav nav-pills nav-stacked">
                            <li><a href="http://localhost:8080/laravel8/public/product/brand/3">iphone 11</a></li>
                            <li><a href="http://localhost:8080/laravel8/public/product/brand/4">iphone 14</a></li>
                            <li><a href="http://localhost:8080/laravel8/public/product/brand/5">galaxy s5</a></li>
                            <li><a href="http://localhost:8080/laravel8/public/product/brand/6">macbook air</a></li>
                        </ul>
                    </div>
                </div>{/*/brands_products*/}
                <div className="shipping text-center">{/*shipping*/}
                    <img src="http://localhost:8080/laravel8/public/frontend/images/home/shipping.jpg" alt="" />
                </div>{/*/shipping*/}
            </div>
        </div>
    )
} export default MenuLeft;