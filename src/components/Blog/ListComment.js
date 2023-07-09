import { useState } from "react";


function ListComment(props) {
    const [idReply, setIdReply] = useState('')
    function getIdReply(e) {
        setIdReply(e.target.id)
        console.log(e)
    }

    // console.log(idReply)
    props.idReply(idReply)
    function RenderDataCmt() {
        let { arr } = props;


        if (arr.length > 0) {
            return arr.map((value, key) => {
                console.log(value.image_user)
                if (value.id_comment == 0) {
                    return (
                        <>
                            <li className="media">
                                <a className="pull-left" href="#">
                                    <img className="media-object" style={{ width: "100px" }} src={'http://localhost:8080/laravel8/public/upload/user/avatar/' + value.image_user} />
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user" />{value.name_user}</li>
                                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                    </ul>
                                    <p>{value.comment}</p>
                                    <a className="btn btn-primary getIDcmt" id={value.id} onClick={getIdReply} href="#comment"><i className="fa fa-reply" />
                                        Replay
                                    </a>
                                </div>

                            </li>

                            {
                                arr.map((value2, key2) => {
                                    if (value2.id_comment == value.id) {
                                        return (
                                            <li className="media second-media">
                                                <a className="pull-left" href="#">
                                                    <img style={{ width: "100px" }} className="media-object" src={'http://localhost:8080/laravel8/public/upload/user/avatar/' + value2.image_user} alt="" />
                                                </a>
                                                <div className="media-body">
                                                    <ul className="sinlge-post-meta">
                                                        <li><i className="fa fa-user" />{value2.name_user}</li>
                                                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                                    </ul>
                                                    <p>{value2.comment}</p>
                                                    <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
                                                </div>
                                            </li>
                                        )
                                    }

                                })
                            }

                        </>
                    )
                }
            })
        }


    }
    return (
        <>
            <div className="response-area">
                <h2>RESPONSES</h2>
                <ul className="media-list">
                    {RenderDataCmt()}
                </ul>


            </div>
        </>
    )
} export default ListComment