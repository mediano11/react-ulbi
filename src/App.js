import "./styles/App.css"
import PostItem from "./components/PostItem";
import {useState} from "react";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";

function App() {
  const [posts, setPosts] = useState([
    {id:1, title: "JavaScript", body: "Description1"},
    {id:2, title: "JavaScript", body: "Description2"},
    {id:3, title: "JavaScript", body: "Description3"},
    {id:4, title: "JavaScript", body: "Description4"}
  ])
  const createPost = (newPost) =>{
    setPosts([...posts, newPost]);
  }
  const removePost = (post) => {
    setPosts(posts.filter(el=>el.id !== post.id))
  }


  return (
    <div className="App">
      <PostForm create={createPost}/>
      {posts.length !== 0
          ? <PostList remove={removePost} posts={posts} title="JS list"/>
          : <h1 style={{textAlign: "center"}}>There are no posts!</h1>
      }

    </div>
  );
}

export default App;
