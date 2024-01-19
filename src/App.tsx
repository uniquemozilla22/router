import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/"> Home</Link>
          <Link to="/category/books?sorted=DESC"> Books</Link>
          <Link to="/category/Fruits"> Fruits</Link>
          <Link to="/category/Vegetables"> Vegetables</Link>
          <Link to="/category/Dry fruits"> Dry fruits</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/category/:query" element={<Category />}></Route>
      </Routes>
    </>
  );
}

export default App;
