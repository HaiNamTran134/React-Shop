import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
function Rate() {
    let params = useParams();

    var yy = localStorage.getItem("user");
    if (yy) {
        yy = JSON.parse(yy)
    }


    const [tbc, setTbc] = useState('')
    let abc = Math.round(tbc)
    const [rating, setRating] = useState(abc)

    function changeRating(newRating, name) {
        if (yy) {
            setRating(newRating)
        } else {
            alert("Vui long dang nhap")
        }
    }
    // console.log(abc)

    useEffect(() => {
        axios.get('http://localhost:8080/laravel8/public/api/blog/rate/' + params.id)
            .then(res => {
                // console.log(res.data.data)
                let obj = res.data.data;
                let length = Object.keys(obj).length;
                let s = 0
                Object.keys(obj).map(function (key, index) {
                    obj[key].rate = Number(obj[key].rate);
                    s = s + obj[key].rate;
                })

                let tbcc = s / length
                setTbc(tbcc)
                // console.log(tbcc)
            })
    })


    // listRate.map((value, key) => {
    //     console.log(value)
    // })


    if (rating) {
        const userData = JSON.parse(localStorage["user"])
        // console.log(params.id)
        let url = 'http://localhost:8080/laravel8/public/api/blog/rate/' + params.id
        let accessToken = userData.token
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        const formData = new FormData();
        formData.append('user_id', userData.Auth.id);
        formData.append('blog_id', params.id);
        formData.append('rate', rating);

        axios.post(url, formData, config)
            .then(response => {
                console.log(response)
            }, [])
    }


    return (
        <>
            <div className="rating-area">
                <ul className="ratings">
                    <li className="rate-this">Rate this item:</li>
                    <StarRatings
                        rating={rating}
                        starRatedColor="blue"
                        changeRating={changeRating}
                        numberOfStars={6}
                        name='rating'
                    />
                    <li className="color">(6 votes)</li>
                </ul>
                <ul className="tag">
                    <li>TAG:</li>
                    <li><a className="color" href>Pink <span>/</span></a></li>
                    <li><a className="color" href>T-Shirt <span>/</span></a></li>
                    <li><a className="color" href>Girls</a></li>
                </ul>
            </div>
            <div className="socials-share">
                <a href><img src="http://localhost:8080/laravel8/public/upload/images/blog/socials.png" alt="" /></a>
            </div>
        </>
    );
}
export default Rate