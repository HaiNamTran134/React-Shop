import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Comment(props) {
    let params = useParams();

    // let { idRep } = props;
    // console.log(props.idRep)

    var yy = localStorage.getItem("user");
    if (yy) {
        yy = JSON.parse(yy)
    }
    const [textarea, setTextarea] = useState('')

    const hanldeTextarea = (e) => {
        const target = e.target.value;

        if (yy) {
            setTextarea(target)
        } else {
            alert("Vui long dang nhap")
        }
    }

    const [getCmt, setGetCmt] = useState('')

    const hanldeSubmit = (e) => {
        e.preventDefault();


        if (textarea) {
            const userData = JSON.parse(localStorage["user"])
            let url = 'http://localhost:8080/laravel8/public/api/blog/comment/' + params.id
            let accessToken = userData.token
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            const formData = new FormData();
            formData.append('id_blog', params.id);
            formData.append('id_user', userData.Auth.id);
            formData.append('id_comment', props.idRep ? props.idRep : 0);
            formData.append('comment', textarea);
            formData.append('image_user', userData.Auth.avatar);
            formData.append('name_user', userData.Auth.name);

            axios.post(url, formData, config)
                .then(response => {
                    console.log(response)
                    // let getCmt

                    // setGetCmt(response.data.data)
                    props.getCmt(response.data.data)
                }, [])
        } else {
            alert("vui long nhap binh luan")
        }
    }
    // props.getCmt(getCmt)
    // console.log(getCmt)
    return (
        <>

            <div className="replay-box">
                <div className="row">
                    <div>
                        <h2>Leave a replay</h2>
                        <form onSubmit={hanldeSubmit}>
                            <div className="blank-arrow">
                                <label>Your Comment</label>
                            </div>
                            <span>*</span>
                            <textarea id="comment" name="comment" onChange={hanldeTextarea} rows={11} defaultValue={""} />
                            <input type="hidden" id="id_comment" name="id_comment" defaultValue={0} />
                            <button id="submit_form" type="submit" className=" btn btn-primary">post comment</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
} export default Comment