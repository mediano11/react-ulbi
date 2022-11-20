import "./styles/App.css"
import PostItem from "./components/PostItem";
import {useMemo, useState} from "react";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import MySelect from "./components/UI/select/MySelect";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";

function App() {
  const [posts, setPosts] = useState([
    {id:1, title: "ааа", body: "бб"},
    {id:2, title: "бб", body: "вв"},
    {id:3, title: "гг", body: "гг"},
    {id:4, title: "дд", body: "аа"}
  ])

    const [filter,setFilter] = useState({sort:"", query:""})

  const sortedPosts = useMemo(()=>{
      if(filter.sort){
          return [...posts].sort((a,b)=>a[filter.sort].localeCompare(b[filter.sort]))
      }
      return posts
  }, [filter.sort, posts]);
  const sortedAnSearchedPosts = useMemo(()=>{
      return sortedPosts.filter(post=> post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts])


    const createPost = (newPost) =>{
        setPosts([...posts, newPost]);
        setModal(false);
    }
    const removePost = (post) => {
        setPosts(posts.filter(el=>el.id !== post.id))
    }
    const [modal, setModal] = useState(false)
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
        <PostList remove={removePost} posts={sortedAnSearchedPosts} title="JS list"/>
    </div>
  );
}

export default App;
