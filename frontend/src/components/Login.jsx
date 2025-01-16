import React, { useState } from "react";
import { useDispatch } from "react-redux";
import google from "../assets/images/google.png";
import microsoft from "../assets/images/microsoft.png";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import apple from "../assets/images/apple.png";
import slack from "../assets/images/slack.png";
import { loginFailed, loginSuccess } from "../features/auth/authSlice";
import { FaAtlassian } from "react-icons/fa";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();

    if (!email || !pass) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/", {
        email: email,
        password: pass,
      });

      if (response.status === 200) {
        console.log(response.data);
        dispatch(loginSuccess({ user: response.data.user }));
        setEmail("");
        setPass("");
      } else {
        dispatch(loginFailed());
        alert("Login failure");
      }
    } catch (err) {
      const error = err.response.data.message;
      setError(error);
    }
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <>
      <div>.</div>
      <div>
        <img style={{ position: "fixed", bottom: "0" }} src={img1} alt="" />
        <img
          style={{ position: "fixed", bottom: "0", right: "0" }}
          src={img2}
          alt=""
        />
      </div>

      <div className="loginDiv">
        <div className="head">
          <FaAtlassian style={{ color: "rgb(37,90,192)", fontSize: "20px" }} />
          <h2>ATLASSIAN</h2>
        </div>
        <h4>Log in to continue</h4>
        <form className="formDiv" onSubmit={login}>
          <input
            type="text"
            value={email}
            placeholder="Enter your email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            value={pass}
            placeholder="Password"
            onChange={(event) => setPass(event.target.value)}
          />
          <button className="formBtn" type="submit">
            Login
          </button>
          {error && (
            <p className="errorMessage" style={{ color: "red" }}>
              {error}
            </p>
          )}
        </form>
        <h5>Or continue with:</h5>
        <div className="signinOptions">
          <button>
            <img src={google} alt="" /> <p>Google</p>
          </button>
          <button>
            <img src={microsoft} alt="" />
            <p>Microsoft</p>
          </button>
          <button>
            <img src={apple} alt="" /> <p>Apple</p>
          </button>
          <button>
            <img src={slack} alt="" /> <p>Slack</p>
          </button>
        </div>

        <div className="signupOptions">
          <p>Can't log in?</p>
          <span style={{ color: "black" }}>.</span>
          <p onClick={handleSignup}>Create an account</p>
        </div>
        <div
          style={{
            borderBottom: ".5px solid rgb(177, 177, 177",
          }}
        ></div>

        <div className="bottom">
          <div>
            <h3 className="footer">
              <FaAtlassian
                style={{ color: "rgb(102, 102, 102)", fontSize: "15px" }}
              />
              ATLASSIAN
            </h3>
          </div>
          <p>
            One account for Jira, Confluence, Trello and{" "}
            <span style={{ color: "#234bcf" }}>more</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
