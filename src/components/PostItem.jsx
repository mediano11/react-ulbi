import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate } from "react-router-dom";

const PostItem = (props) => {
    const {id,title, body} = props.post;
    const router = useNavigate();
    return (
        <div className="post">
            <div className="post__content">
                <strong>{id > 1000 ? props.number : id}. {title}</strong>
                <div>
                    {body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={()=>router(`/posts/${id}`)}>Open</MyButton>
                <MyButton onClick={()=>props.remove(props.post)}>Delete</MyButton>
            </div>
        </div>
    );
};

export default PostItem;