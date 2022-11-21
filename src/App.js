import "./styles/App.css"
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Navbar from "./components/UI/Navbar/Navbar";


function App() {

  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Posts />} />
        </Routes>
    </BrowserRouter>

  );
}

export default App;
