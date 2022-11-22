import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";
import {getPageCount} from "../components/utils/pages";
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/PostList";

const PostIdPage = () => {
    const params = useParams();
    const [post,setPost] = useState({})
    const [comments,setComments] = useState([])
    const [fetchPostById, isPostLoading, postError] = useFetching(async id=>{
        const response = await PostService.getById(id);
        setPost(response.data)
    })

    const [fetchComById, isComLoading, comError] = useFetching(async id=>{
        const response = await PostService.getCommentsByPostId(id);
        setComments(response.data)
    })
    useEffect(()=>{
        fetchPostById(params.id)
        fetchComById(params.id)
    }, [])
    return (
        <div>
            {postError && <h1>Post Error ({postError})</h1>}
            {isPostLoading
                ? <div style={{display: "flex", justifyContent:"center", marginTop: "50px"}}><Loader/></div>
                :
                <div>
                    <h1>{post.id}. {post.title}</h1>
                    <p>{post.body}</p>
                </div>
            }
            <h1>Comments</h1>
            {comError && <h1>Post Error ({comError})</h1>}
            {isComLoading
                ? <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}><Loader/></div>
                :
                <div>
                    {comments.map(comm =>
                        <div style={{marginTop: "20px"}} key={comm.id}>
                            <h5>{comm.email}</h5>
                            <p>{comm.body}</p>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default PostIdPage;