import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



function Index() {

    const [data, setData] = useState("");
    useEffect(() => {
        axios.get("http://localhost:8080/laravel8/public/api/blog")
            .then(res => {
                setData(res.data.blog.data)
            })
            .catch(error => console.log(error))
    }, [])

    // console.log(data)

    function renderData() {
        if (data.length > 0) {
            return data.map((value, key) => {
                // console.log(value.title)
                // console.log(Date().toString(value.created_at))
                return (
                    <div className="single-blog-post">
                        <h3>{value.title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user" /> Mac Doe</li>
                                <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                            </ul>
                            <span>
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star-half-o" />
                            </span>
                        </div>
                        <a href>
                            <img src={"http://localhost:8080/laravel8/public/upload/Blog/image/" + value.image} alt="" />
                        </a>
                        <p>{data[key].description}</p>
                        <Link className="btn btn-primary" to={"/blog/detail/" + data[key].id}>Read More</Link>
                    </div>
                )
            })
        }

    }


    return (
        <div className="col-sm-9 padding-right">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {renderData()}
                <div style={{ float: 'right', marginRight: '10px' }}>
                </div>

            </div>

        </div>
    )
} export default Index;