import "./styles/App.css"
import {useEffect, useMemo, useState} from "react";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import {usePosts} from "./components/hooks/usePost";
import PostService from "./components/API/PostService";
import Loader from "./components/UI/Loader/Loader";

function App() {
  const [posts, setPosts] = useState([])

    const [filter,setFilter] = useState({sort:"", query:""})
    const [modal, setModal] = useState(false)
    const [isPostLoading, setIsPostLoading] = useState(false)
    const sortedAnSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const createPost = (newPost) =>{
        setPosts([...posts, newPost]);
        setModal(false);
    }
    const removePost = (post) => {
        setPosts(posts.filter(el=>el.id !== post.id))
    }
    async function fetchPosts() {
        setIsPostLoading(true)
        const posts = await PostService.getAll();
        setPosts(posts);
        setIsPostLoading(false)
    }
    useEffect(()=>{
        fetchPosts()
    }, [])
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
        {isPostLoading
            ? <div style={{display: "flex", justifyContent:"center", marginTop: "50px"}}><Loader/></div>
            : <PostList remove={removePost} posts={sortedAnSearchedPosts} title="JS list"/>
        }
    </div>
  );
}

export default App;
