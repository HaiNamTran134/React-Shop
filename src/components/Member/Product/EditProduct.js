import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Err from "../../Err";

function EditProduct() {
    let params = useParams();

    const [err, setErr] = useState({});
    const [image, setImage] = useState({})
    const [dataCatagory, setDataCatagory] = useState('');
    const [dataBrand, setDataBrand] = useState('');
    const [product, setProduct] = useState('');
    const [avatarCheckBox, setCheckBox] = useState('');
    const hanldeInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setProduct(state => ({ ...state, [nameInput]: value }))
    }
    // console.log(avatarCheckBox)
    function hanldeCheckBox(e) {
        const nameImage = e.target.name;
        const checked = e.target.checked;

        if (checked) {
            setCheckBox(state => [...state, nameImage]);
        }
        else {
            if (avatarCheckBox.includes(nameImage)) {
                const img = avatarCheckBox.filter(item => item !== nameImage);
                // console.log(img)
                setCheckBox(img);
            }
        }
    }
    // console.log(avatarCheckBox);

    const hanldeSelect = (e) => {
        // console.log(e.target.value)
        setProduct(state => ({ ...state, [e.target.name]: e.target.value }))
    }
    useEffect(() => {
        axios.get("http://localhost:8080/laravel8/public/api/product/detail/" + params.id)
            .then(res => {
                setImage(res.data.data.image)
                setProduct(res.data.data)
            })
            .catch(error => console.log(error))
    }, []);
    // console.log(product)
    function renderCatagory() {
        if (dataCatagory.length > 0) {
            return dataCatagory.map((value, key) => {
                return (
                    <option value={value.id} >{value.category}</option>
                )
            })
        }
    }
    function renderBrand() {
        if (dataBrand.length > 0) {
            return dataBrand.map((value, key) => {
                return (
                    <option value={value.id} >{value.brand}</option>
                )
            })
        }
    }
    function renderImage() {
        if (Object.keys(product).length > 0) {
            let xx = JSON.parse(product.image)
            return xx.map((value, key) => {
                return (
                    <>
                        <div className style={{ position: 'relative', display: 'inline-block' }}>
                            <img className="imageProduct" style={{ width: '100px', height: '100px' }} src={'http://localhost:8080/laravel8/public/upload/product/' + product.id_user + "/" + xx[key]} alt="" />
                            <input onClick={hanldeCheckBox} type="checkbox" name={value} style={{ position: 'absolute', top: '3px', right: '3px' }} />
                        </div>
                    </>
                )
            })
        }
    }
    useEffect(() => {
        axios.get("http://localhost:8080/laravel8/public/api/category-brand")
            .then(res => {
                setDataCatagory(res.data.category)
                setDataBrand(res.data.brand)
            })
            .catch(error => console.log(error))
    }, []);
    const [Status, setStatus] = useState(false);
    const selectStatus = (e) => {
        setProduct(state => ({ ...state, [e.target.name]: e.target.value }))
        if (e.target.value == 0) {
            setStatus(true);
        } else (
            setStatus(false)
        )
    }
    const [avatar, setAvatar] = useState({});
    const hanldeFile = (e) => {
        const file = e.target.files
        setAvatar(file)
    }
    const hanldeSubmit = (e) => {
        e.preventDefault();
        let errSubmit = {};
        let flag = true;

        if (product.name == "") {
            errSubmit.name = "vui long nhap name";
            flag = false;
        }
        if (product.price == "") {
            errSubmit.price = "vui long nhap price";
            flag = false;
        }
        if (product.company == "") {
            errSubmit.company = "vui long nhap company";
            flag = false;
        }
        if (product.detail == "") {
            errSubmit.detail = "vui long nhap detail";
            flag = false;
        }
        if (product.category == "") {
            errSubmit.address = "vui long chon category";
            flag = false;
        }
        if (product.brand == "") {
            errSubmit.brand = "vui long chon brand";
            flag = false;
        }
        // if (product.status == "") {
        //     errSubmit.status = "vui long chon status";
        //     flag = false;
        // }
        if (avatar == "") {
            errSubmit.address = "vui long chon anh";
            flag = false;
        } else {
            let checkImg = ['png', 'jpg', 'jpeg'];
            Object.keys(avatar).map((item, i) => {
                if (avatar.length > 3) {
                    errSubmit.avatar = "Toi da 3 hinh";
                    flag = false;
                } else {
                    // console.log(avatar.length);
                    let fileSize = avatar[item].size;
                    let fileType = avatar[item].type;
                    let splitted = fileType.split("/", [2]);
                    // console.log(splitted[1])
                    if (fileSize > 1024 * 1024) {
                        alert("anh kh vuot qua 1mb");
                        flag = false;
                    }
                    if (checkImg.includes(splitted[1])) {
                        // flag = true;
                    } else {
                        errSubmit.file = "Chon lai file anh";
                        flag = false;
                    }
                }
            });
        }
        if (!flag) {
            setErr(errSubmit);
        }
        if (flag == true) {
            setErr(errSubmit);
            const userData = JSON.parse(localStorage["user"]);
            let url = 'http://localhost:8080/laravel8/public/api/user/product/update/' + product.id
            let accessToken = userData.token
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            };
            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('category', product.category);
            formData.append('brand', product.brand);
            formData.append('company', product.company);
            formData.append('detail', product.detail);
            formData.append('status', product.status);
            formData.append('sale', product.sale);

            Object.keys(avatar).map((item, i) => {
                formData.append("file[]", avatar[item]);
                // console.log(avatar[item])
            });
            avatarCheckBox.map(function (value, key) {
                formData.append('avatarCheckBox[]', avatarCheckBox[value]);
            });
            axios.post(url, formData, config)
                .then(response => {
                    console.log(response)
                }, [])
        }

    }
    // console.log(avatar)

    return (
        <div className="col-sm-9 padding-right">
            <div className="container-fluid">
                <div className="product-details">{/*product-details*/}
                    <div className="product-information" style={{ paddingLeft: 0 }}>{/*/product-information*/}
                        <div className="contact-form">
                            <Err err={err} />
                            <h2 className="title text-center">Product Information</h2>
                            <form onSubmit={hanldeSubmit} id="main-contact-form" className="contact-form row" name="contact-form" encType="multipart/form-data" method="POST">
                                <input type="hidden" name="_token" />                            <div className="col-md-2">
                                    <label>Name</label>
                                </div>
                                <div className="form-group col-md-10">
                                    <input type="text" className="form-control" name="name" onChange={hanldeInput} value={product.name} />
                                </div>
                                <div className="col-md-2">
                                    <label>Price</label>
                                </div>
                                <div className="form-group col-md-10">
                                    <input type="text" className="form-control" name="price" onChange={hanldeInput} value={product.price} />
                                </div>

                                <div className="form-group col-md-12">
                                    <select name="category" onChange={hanldeSelect} value={product.id_category} >
                                        {renderCatagory()}
                                    </select>
                                </div>
                                <div className="form-group col-md-12">

                                    <select name="brand" onChange={hanldeSelect} value={product.id_brand} >
                                        {renderBrand()}
                                    </select>
                                </div>
                                <div className="form-group col-md-12">
                                    <select onChange={selectStatus} value={product.status} name="status">
                                        <option value={1}>New</option>
                                        <option value={0}>Sale</option>
                                    </select>
                                </div>
                                {Status ? (
                                    <div className="form-group col-md-12">
                                        <input type="text" id="sale" onChange={hanldeInput} name="sale" value={product.sale} /> %
                                    </div>
                                ) : null}
                                <div className="form-group col-md-12">
                                    <input type="file" name="image[]" onChange={hanldeFile} className="form-control" multiple />
                                </div>
                                <div className="col-sm-12">
                                    <div className="view-product">
                                        <h4>Choose image you want to delete</h4>
                                        {renderImage()}
                                    </div>
                                </div>
                                <br></br>
                                <div className="form-group col-md-12">
                                    <textarea rows="6" name="detail" id="detail" onChange={hanldeInput} className="form-control" placeholder="Detail" defaultValue={""} />
                                </div>
                                <div className="form-group col-md-10">
                                    <button style={{ marginLeft: 0, marginTop: '50px' }} type="submit" className="btn btn-default cart">Update your product</button>
                                    <a className="btn btn-default" style={{ color: '#fff', background: '#989898', display: 'inline-block', margin: '50px 0 10px 0', border: '0 none', fontSize: '15px', borderRadius: 0 }} href="http://localhost:8080/laravel8/public/product/26/list">Cancel</a>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

} export default EditProduct;