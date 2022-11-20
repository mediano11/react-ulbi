import React from 'react';
import PostItem from "./PostItem";

const PostList = ({posts, title, remove}) => {
    if(!posts.length){
        return (
            <h1 style={{textAlign: "center"}}>There are no posts!</h1>
        )
    }
    return (
        <div>
            <h1 style={{textAlign:"center"}}>{title}</h1>
            {posts.map((post, i)=>
                <PostItem remove={remove} number={i+1} post={post} key={post.id}/>
            )}
        </div>
    );
};

export default PostList;