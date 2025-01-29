import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/Authentication";
import Layout from "./components/Layout";
import Signup from "./components/Signup";
import Projects from "./components/projectUI/Projects";
import ProtectedRoute from "./components/ProtectedRoute";
import Page404 from "./components/Page404";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Authentication />}></Route>
            {/* <Route path="login" element={<Login />}></Route> */}
            <Route path="signup" element={<Signup />}></Route>
            <Route
              path="home/:projectId"
              element={<ProtectedRoute element={<Home />} />}
            ></Route>
            <Route
              path="projects"
              element={<ProtectedRoute element={<Projects />} />}
            ></Route>
            <Route path="*" element={<Page404 />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Home /> */}
    </>
  );
}

export default App;
