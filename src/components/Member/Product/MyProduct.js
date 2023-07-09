import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyProduct() {
    //     user/my-product
    const [data, setData] = useState('');
    const [image, setImage] = useState('')
    useEffect(() => {
        const userData = JSON.parse(localStorage["user"])
        let accessToken = userData.token
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data',
                'Accept': 'application/json'
            }
        };
        axios.get('http://localhost:8080/laravel8/public/api/user/my-product', config)
            .then(res => {
                // console.log(res)
                setData(res.data.data)
                // setListCmt(res.data.data.comment)
            })
            .catch(error => console.log(error))
    }, []);

    const [idProduct, setIdProduct] = useState('')
    function getIdProduct(e) {
        setIdProduct(e.target.id)
        // console.log(e.target)
        if (e.target.id) {

            const userData = JSON.parse(localStorage["user"])
            let accessToken = userData.token
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            };
            axios.get('http://localhost:8080/laravel8/public/api/user/product/delete/' + e.target.id, config)
                .then(res => {
                    console.log(res)
                    setData(res.data.data)
                })
                .catch(error => console.log(error))

        }
    }
    // console.log(idProduct)


    function renderData() {
        if (Object.keys(data).length > 0) {
            // const obj = JSON.parse(data);
            const userData = JSON.parse(localStorage["user"])
            // console.log(userData.Auth.id)

            return Object.keys(data).map((item, i) => {
                // console.log(data[item].image)
                let xx = JSON.parse(data[item].image)
                // JSON.parse(data[item].image)

                return (
                    <tr>
                        <th scope="row">{data[item].id}</th>
                        <td>{data[item].name}</td>
                        <td><img style={{ width: "50px" }} src={'http://localhost:8080/laravel8/public/upload/product/' + userData.Auth.id + '/' + xx[0]}></img></td>
                        <td>{data[item].price}</td>
                        <td>
                            <Link className="sidebar-link  waves-dark sidebar-link" to={'/member/product/update/' + data[item].id} aria-expanded="false">
                                <i className="mdi mdi-eye">Edit  </i>
                            </Link>

                            <a className="sidebar-link waves-effect waves-dark sidebar-link" id={data[item].id} onClick={getIdProduct} aria-expanded="false"><i className="mdi mdi-delete" />
                                Delete
                            </a>
                        </td>
                    </tr >

                )

            });

        }
    }
    return (
        <>
            <div className="col-sm-9 padding-right">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Image</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {renderData()}
                                        </tbody>

                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
} export default MyProduct