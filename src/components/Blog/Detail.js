import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comment from "./Comment";
import ListComment from "./ListComment";
import Rate from "./Rate";

function Detail(props) {
    let params = useParams();

    const [data, setData] = useState('');
    const [listCmt, setListCmt] = useState('');
    useEffect(() => {
        axios.get('http://localhost:8080/laravel8/public/api/blog/detail/' + params.id)
            .then(res => {
                setData(res.data.data)
                setListCmt(res.data.data.comment)
            })
            .catch(error => console.log(error))
    }, [])
    // console.log(listCmt)
    function renderData() {
        if (Object.keys(data).length > 0) {
            // console.log(data)

            return (
                <div className="single-blog-post">
                    <h3>{data.title}</h3>
                    <div className="post-meta">
                        <ul>
                            <li><i className="fa fa-user" /> Mac Doe</li>
                            <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                            <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                        </ul>

                        <div id="addStar" className="star">
                            <span className="ratting-star">
                                <i className="fa fa-star checked" />
                                <input type="hidden" defaultValue={1} />
                            </span>
                            <span className="ratting-star">
                                <i className="fa fa-star" />
                                <input type="hidden" defaultValue={2} />
                            </span>
                            <span className="ratting-star">
                                <i className="fa fa-star" />
                                <input type="hidden" defaultValue={3} />
                            </span>
                            <span className="ratting-star">
                                <i className="fa fa-star" />
                                <input type="hidden" defaultValue={4} />
                            </span>
                            <span className="ratting-star">
                                <i className="fa fa-star" />
                                <input type="hidden" defaultValue={5} />
                            </span>
                        </div>
                    </div>
                    <a href>
                        <img src={"http://localhost:8080/laravel8/public/upload/Blog/image/" + data.image} alt="" />
                    </a>
                    <p>{data.content}</p>
                    <div className="pager-area">
                        <ul className="pager pull-right">
                            <li><a href="http://localhost:8080/laravel8/public/blog/single/6">Pre</a></li>
                        </ul>
                    </div>
                </div>
            )
        }

    }
    const [dataCmt, setDataCmt] = useState('');


    function getCmt(data) {
        // console.log(data)
        // setDataCmt(listCmt.concat(data))
        // console.log
        setDataCmt(data)
    }
    let abc = (listCmt.concat(dataCmt))
    // console.log(abc)

    const [idRep, setIdRep] = useState('');

    function idReply(data) {
        // console.log(idReply)
        setIdRep(data)
    }
    // console.log(idRep)

    return (

        <div className="col-sm-9 padding-right">
            <style type="text/css" dangerouslySetInnerHTML={{ __html: "\n\tdiv.star {\n\t\tfloat: right;\n\t}\n\tdiv.star  span{\n\t\tfloat: left;\n\t}\n\tdiv.star span i{\n\t\tcolor: black;\n\t}\n\t.ratings_hover  i{\n\t\tcolor: orange !important;\n\t}\n\t.ratings_over i{\n\t\tcolor: orange !important;\n\t}\n\n" }} />
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {renderData()}

            </div>
            <Rate />
            <ListComment arr={abc} idReply={idReply} />
            <Comment getCmt={getCmt} idRep={idRep} />

        </div>
    )
} export default Detail;