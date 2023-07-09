import { useState } from "react"
import Err from "../Err";
import axios from "axios";
import Login from "./Login";

function Register(Posts) {

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    })
    const hanldeInput = (e) => {

        const nameInput = e.target.name;
        const value = e.target.value;


        setInputs(state => ({ ...state, [nameInput]: value }))
    }

    const [err, setErr] = useState({});

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

        console.log(reader)
    }

    const [level, setLevel] = useState({})
    const hanldeSelect = (e) => {
        setLevel(e.target.value)
    }


    const hanldeSubmit = (e) => {
        e.preventDefault();
        let errSubmit = {};
        let flag = true;
        let testEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (inputs.name == "") {
            errSubmit.name = "vui long nhap ten";
            flag = false;
        }
        if (inputs.email == "") {
            errSubmit.email = "vui long nhap email";
            flag = false;
        } else if (testEmail.test(inputs.email)) {
            // flag = true
            // flag = false;
        } else {
            errSubmit.email = "vui long nhap dung email";
            flag = false;
        }
        if (inputs.password == "") {
            errSubmit.password = "vui long nhap pass";
            flag = false;
        }
        if (inputs.phone == "") {
            errSubmit.phone = "vui long nhap sdt";
            flag = false;
        }
        if (inputs.address == "") {
            errSubmit.address = "vui long nhap dia chi";
            flag = false;
        }
        // if (getfile == "") {
        //     errSubmit.address = "vui long chon anh";
        //     flag = false;
        // }
        if (getfile != "") {
            // flag = true
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

            const data = {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
                phone: inputs.phone,
                address: inputs.address,
                avatar: avatar,
                level: level
            }
            axios.post("http://localhost:8080/laravel8/public/api/register", data)
                .then((res) => {
                    console.log(res)
                })
        }

        // console.log(obj)
    }

    return (
        <>
            <Err err={err}></Err>

            <div className="col-sm-9 padding-right">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Register Member</div>
                            <div className="card-body">
                                <br />
                                <form onSubmit={hanldeSubmit} enctype="multipart/form-data">
                                    <input type="hidden" name="_token" defaultValue="UEnMhHc4Wi3PFdIfFOZfhNWkLhVgxlvkQkGLKTl5" />
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Full Name (*)</label>
                                        <div className="col-md-8">
                                            <input id="name" type="text" onChange={hanldeInput} className="form-control " name="name" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Email (*)</label>
                                        <div className="col-md-8">
                                            <input id="email" type="text" onChange={hanldeInput} className="form-control " name="email" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Password (*)</label>
                                        <div className="col-md-8">
                                            <input id="password" type="password" onChange={hanldeInput} className="form-control " name="password" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Phone</label>
                                        <div className="col-md-8">
                                            <input id="phone" type="text" onChange={hanldeInput} className="form-control " name="phone" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Address</label>
                                        <div className="col-md-8">
                                            <input id="address" type="text" onChange={hanldeInput} className="form-control " name="address" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Avatar (*)</label>
                                        <div className="col-md-8">
                                            <input id="avatar" type="file" onChange={hanldeFile} className="form-control " name="avatar" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">Lever (*)</label>
                                        <div className="col-md-8">
                                            <select name="level" className="form-control form-control-line" value={level} onChange={hanldeSelect}>
                                                <option value></option>
                                                <option value={0}>0</option>
                                                <option value={1}>                                                    1
                                                </option>
                                                {/* <option value={2}>
                                                    japan
                                                </option>
                                                <option value={3}>
                                                    china
                                                </option> */}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Register
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

} export default Register