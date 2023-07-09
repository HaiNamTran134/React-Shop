import { useState } from "react";
// import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Err from "../Err";

function Login() {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const hanldeInput = (e) => {

        const nameInput = e.target.name;
        const value = e.target.value;

        setInputs(state => ({ ...state, [nameInput]: value }))
    }

    const [err, setErr] = useState({});
    const hanldeSubmit = (e) => {
        e.preventDefault();
        let user = {};

        let errSubmit = {};
        let flag = true;
        let testEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (inputs.email == "") {
            errSubmit.email = "vui long nhap email";
            flag = false;
        } else if (testEmail.test(inputs.email)) {
            // flag = true
            setErr(errSubmit);
        } else {
            errSubmit.email = "vui long nhap dung email";
            flag = false;
        }
        if (inputs.password == "") {
            errSubmit.password = "vui long nhap pass";
            flag = false;
        } else {
            setErr(errSubmit);
        }
        if (!flag) {
            setErr(errSubmit);
        }
        if (flag == true) {
            const data = {
                email: inputs.email,
                password: inputs.password
            }
            axios.post("http://localhost:8080/laravel8/public/api/login", data)
                .then((res) => {
                    console.log(res.data.Auth)
                    if (res.data.response == "error") {
                        alert("dang nhap khong thanh cong, vui long thu lai")
                    } else {
                        user = {
                            Auth: res.data.Auth,
                            token: res.data.token
                        }
                        var xx = JSON.stringify(user);
                        localStorage.setItem("user", xx)
                        navigate('/');
                        // useEffect(() => {
                        //     axios.get("http://localhost:8080/laravel8/public/api/login")
                        //         .then(res => {
                        //             console.log(res)
                        //         })
                        //         .catch(error => console.log(error))
                        // }, [])
                    }
                })
        }
    }

    return (
        <>

            <Err err={err} />
            <div className="col-sm-9 padding-right">

                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Login Member</div>
                            <div className="card-body">
                                <br />
                                <form onSubmit={hanldeSubmit}>
                                    <input type="hidden" name="_token" defaultValue="UEnMhHc4Wi3PFdIfFOZfhNWkLhVgxlvkQkGLKTl5" />
                                    <div className="form-group row">
                                        <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                                        <div className="col-md-6">
                                            <input id="email" type="text" onChange={hanldeInput} className="form-control " name="email" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>
                                        <div className="col-md-6">
                                            <input id="password" type="password" onChange={hanldeInput} className="form-control " name="password" autoComplete="current-password" />
                                        </div>
                                    </div>


                                    <div className="form-group row mb-0">
                                        <div className="col-md-8 offset-md-4">
                                            <button type="submit" className="btn btn-primary">
                                                Login
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

} export default Login