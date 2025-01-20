import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/Authentication";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import Projects from "./components/Projects";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Authentication />}></Route>
            {/* <Route path="login" element={<Login />}></Route> */}
            <Route path="signup" element={<Signup />}></Route>
            <Route path="home" element={<Home />}></Route>
            <Route path="projects" element={<Projects />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Home /> */}
    </>
  );
}

export default App;
