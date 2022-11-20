import "./styles/App.css"
import PostItem from "./components/PostItem";
import {useState} from "react";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";

function App() {
  const [posts, setPosts] = useState([
    {id:1, title: "JavaScript", body: "Description"},
    {id:2, title: "JavaScript", body: "Description"},
    {id:3, title: "JavaScript", body: "Description"},
    {id:4, title: "JavaScript", body: "Description"}
  ])
  return (
    <div className="App">
      <form>
        <input type="text" placeholder="Post title"/>
        <input type="text" placeholder="Post description"/>
        <MyButton>Create post</MyButton>
      </form>
      <PostList posts={posts} title="JS list"/>
    </div>
  );
}

export default App;
