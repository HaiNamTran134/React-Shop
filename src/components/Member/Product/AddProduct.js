import axios from "axios";
import { useEffect, useState } from "react";
import Err from "../../Err";

function AddProduct() {

    const [dataCatagory, setDataCatagory] = useState('');
    const [dataBrand, setDataBrand] = useState('');
    const [Status, setStatus] = useState(false);
    const [err, setErr] = useState({});
    const [product, setProduct] = useState({
        name: "",
        price: "",
        company: "",
        detail: "",
        category: "",
        brand: "",
        status: "",
        sale: ""
    });

    const [avatar, setAvatar] = useState({});
    const hanldeFile = (e) => {
        const file = e.target.files
        setAvatar(file)
    }
    // console.log(getfile)
    const hanldeInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setProduct(state => ({ ...state, [nameInput]: value }))
    }
    const hanldeSelect = (e) => {
        // console.log(e.target.value)
        setProduct(state => ({ ...state, [e.target.name]: e.target.value }))
    }

    function renderCatagory() {
        if (dataCatagory.length > 0) {
            return dataCatagory.map((value, key) => {
                return (
                    < option value={value.id} >{value.category}</option>
                )
            })
        }
    }
    function renderBrand() {
        if (dataBrand.length > 0) {
            return dataBrand.map((value, key) => {
                return (
                    < option value={value.id} >{value.brand}</option>
                )
            })
        }
    }

    const selectStatus = (e) => {
        // if (e.ta)
        // console.log(e.target.value)
        setProduct(state => ({ ...state, [e.target.name]: e.target.value }))
        if (e.target.value == 0) {
            setStatus(true);
        } else (
            // setProduct(state => ({ ...state, [e.target.name]: e.target.value }))
            setStatus(false)
        )
    }


    useEffect(() => {
        axios.get("http://localhost:8080/laravel8/public/api/category-brand")
            .then(res => {
                setDataCatagory(res.data.category)
                setDataBrand(res.data.brand)
            })
            .catch(error => console.log(error))
    }, []);

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
        if (product.status == "") {
            errSubmit.status = "vui long chon status";
            flag = false;
        }
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
            })
        }

        if (!flag) {
            setErr(errSubmit);
        }
        if (flag == true) {
            setErr(errSubmit);
            const userData = JSON.parse(localStorage["user"])
            let url = 'http://localhost:8080/laravel8/public/api/user/product/add'
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
                formData.append("file[]", avatar[item])
            })
            axios.post(url, formData, config)
                .then(response => {

                    console.log(response)
                    if (response.data.response == "error") {
                        alert("khong thanh cong, vui long thu lai")
                    } else {
                        let id = {
                            id: response.data.data.id,
                            name: response.data.data.name,
                            price: response.data.data.price,
                            category: response.data.data.id_category,
                            brand: response.data.data.id_brand,
                            company: response.data.data.company_profile,
                            detail: response.data.data.detail,
                            status: response.data.data.status,
                            sale: response.data.data.sale,
                            image: response.data.data.image
                        }
                        var yy = JSON.stringify(id);
                        localStorage.setItem(id.id, yy)
                    }

                }, [])
        }

    }
    console.log(avatar)
    return (

        <div className="col-sm-9 padding-right">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-header"><h3>Add Product</h3></div>
                    <br />
                    <div className="card-body">
                        <Err err={err} />
                        <form onSubmit={hanldeSubmit}>
                            <div className="form-group col-md-12">
                                <input type="text" name="name" onChange={hanldeInput} className="form-control" placeholder="Name" />
                            </div>
                            <div className="form-group col-md-12">
                                <input type="text" className="form-control" id="price" name="price" onChange={hanldeInput} placeholder="Price" />
                                {/* <input type="number" hidden id="price" name="price" /> */}
                            </div>
                            <div className="form-group col-md-12">
                                <select name="category" onChange={hanldeSelect}>
                                    <option value>Please select category</option>
                                    {renderCatagory()}
                                </select>

                            </div>
                            <div className="form-group col-md-12">
                                <select name="brand" onChange={hanldeSelect}>
                                    <option value>Please select brand</option>
                                    {renderBrand()}
                                </select>
                            </div>
                            <div className="form-group col-md-12">
                                <select onChange={selectStatus} name="status">
                                    <option value>Please select status</option>
                                    <option value={1}>New</option>
                                    <option value={0}>Sale</option>
                                </select>
                            </div>
                            {Status ? (
                                <div className="form-group col-md-12">
                                    <input type="text" id="sale" onChange={hanldeInput} name="sale" defaultValue="0" /> %
                                </div>
                            ) : null}
                            <div className="form-group col-md-12">
                                <textarea name="company" id="company_profile" onChange={hanldeInput} className="form-control" placeholder="Company profile" />
                            </div>
                            <div className="form-group col-md-12">
                                <input type="file" name="image[]" onChange={hanldeFile} className="form-control" multiple />
                            </div>

                            <div className="form-group col-md-12">
                                <textarea rows="6" name="detail" id="detail" onChange={hanldeInput} className="form-control" placeholder="Detail" defaultValue={""} />
                            </div>

                            <div className="form-group col-md-12">
                                <input type="submit" name="submit" className="btn btn-primary pull-right" defaultValue="Submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );

} export default AddProduct