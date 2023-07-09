import { useEffect, useState } from "react";
import Err from "../Err";
import { useParams } from "react-router-dom";
import axios from "axios";

function Update() {
    const [err, setErr] = useState({});
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    })

    useEffect(() => {
        let userData = localStorage.getItem("user");
        if (userData) {
            userData = JSON.parse(userData);
            userData = userData.Auth

            setUser({
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                address: userData.address
            })
        }
    }, [])

    const hanldeInput = (e) => {
        const nameInput = e.target.name;
        const value = e.target.value;
        setUser(state => ({ ...state, [nameInput]: value }))
    }

    const [getfile, setFile] = useState("");
    const [avatar, setAvatar] = useState("");
    function hanldeFile(e) {

        const file = e.target.files
        setFile(file)
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result);
        };
        reader.readAsDataURL(file[0])

        // console.log(reader)
    }
    // console.log(inputs)
    const hanldeSubmit = (e) => {
        e.preventDefault();
        let errSubmit = {};
        let flag = true;
        if (getfile == "") {
            errSubmit.address = "vui long chon anh";
            flag = false;
        }
        if (getfile != "") {
            let fileSize = getfile[0]['size'];
            let fileType = getfile[0]['type'];
            let checkImg = ['png', 'jpg', 'jpeg'];
            let splitted = fileType.split("/", [2]);
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
        if (!flag) {
            setErr(errSubmit);
        }
        if (flag == true) {
            // console.log(avatar)
            const userData = JSON.parse(localStorage["user"])
            // console.log(userData.Auth.id)
            let url = 'http://localhost:8080/laravel8/public/api/user/update/' + userData.Auth.id
            let accessToken = userData.token
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            const formData = new FormData();
            formData.append('id', userData.Auth.id);
            formData.append('name', user.name);
            formData.append('password', user.password ? user.password : "");
            formData.append('email', user.email);
            formData.append('phone', user.phone);
            formData.append('address', user.address);
            formData.append('avatar', avatar);

            axios.post(url, formData, config)
                .then(response => {
                    console.log(response)
                    console.log(user)
                    let acc = {
                        Auth: response.data.Auth,
                        token: response.data.token
                    }
                    var xx = JSON.stringify(acc);
                    localStorage.setItem("user", xx)

                }, [])
        }


    }
    return (
        <>
            <div className="col-sm-9 padding-right">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">User Update</div>
                            <Err err={err}></Err>
                            <div className="card-body">
                                <br />
                                <form onSubmit={hanldeSubmit}>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Full Name </label>
                                        <div className="col-md-8">
                                            <input id="name" type="text" onChange={hanldeInput} value={user.name} className="form-control " name="name" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email </label>
                                        <div className="col-md-8">
                                            <input id="email" type="text" readOnly onChange={hanldeInput} value={user.email} className="form-control " name="email" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Password </label>
                                        <div className="col-md-8">
                                            <input id="password" type="password" onChange={hanldeInput} className="form-control " name="password" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Phone</label>
                                        <div className="col-md-8">
                                            <input id="phone" type="text" onChange={hanldeInput} value={user.phone} className="form-control " name="phone" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Address</label>
                                        <div className="col-md-8">
                                            <input id="address" type="text" onChange={hanldeInput} value={user.address} className="form-control " name="address" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Avatar </label>
                                        <div className="col-md-8">
                                            <input id="avatar" type="file" onChange={hanldeFile} className="form-control " name="avatar" />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
} export default Update