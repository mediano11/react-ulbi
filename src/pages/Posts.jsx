import "../styles/App.css"
import {useEffect, useMemo, useState} from "react";
import PostList from "../components/PostList";
import MyButton from "../components/UI/button/MyButton";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import {usePosts} from "../hooks/usePost";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount} from "../components/utils/pages";
import Pagination from "../components/UI/pagination/Pagination";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter,setFilter] = useState({sort:"", query:""});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [fetchPosts, isPostLoading, postError] = useFetching(async(limit,page)=>{
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = response.headers["x-total-count"]
        setTotalPages(getPageCount(totalCount, limit))
    })
    const sortedAnSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const createPost = (newPost) =>{
        setPosts([...posts, newPost]);
        setModal(false);
    }
    const removePost = (post) => {
        setPosts(posts.filter(el=>el.id !== post.id))
    }
    useEffect(()=>{
        fetchPosts(limit,page)
    }, [page,limit])
    const changePage = (page) => {
        setPage(page)
    }
    return (
        <div className="App">
            <MyButton style={{marginTop:"15px"}}onClick={()=>setModal(true)}>
                Create element
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: "15px 0"}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError && <h1>Post Error ({postError})</h1>}
            {isPostLoading
                ? <div style={{display: "flex", justifyContent:"center", marginTop: "50px"}}><Loader/></div>
                : <PostList remove={removePost} posts={sortedAnSearchedPosts} title="JS list"/>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}/>
        </div>
    );
}

export default Posts;
