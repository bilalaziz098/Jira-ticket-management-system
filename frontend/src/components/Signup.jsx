import React, { useState } from "react";
import { useDispatch } from "react-redux";
import google from "../assets/images/google.png";
import microsoft from "../assets/images/microsoft.png";
import img1 from "../assets/images/img1.png";
import img2 from "../assets/images/img2.png";
import apple from "../assets/images/apple.png";
import slack from "../assets/images/slack.png";
import {
  loginFailed,
  loginSuccess,
  registerUser,
} from "../features/auth/authSlice";
import { FaAtlassian } from "react-icons/fa";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signup = async (event) => {
    event.preventDefault();

    if (!email || !pass || !name) {
      alert("Please fill in both email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/signup", {
        name: name,
        role: role,
        email: email,
        password: pass,
      });
      const { data } = response;
      const { name: user, role: teamRole } = data.user;

      dispatch(registerUser({ user, teamRole }));
      navigate("/");
    } catch (err) {
      const error = err.response.data.message;
      setError(error);
    }
  };
  const handleSignin = () => {
    navigate("/");
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

      <div className="signupDiv">
        <div className="head">
          <FaAtlassian style={{ color: "rgb(17,104,226)", fontSize: "20px" }} />
          <h2>ATLASSIAN</h2>
        </div>
        <h4>Sign up to continue</h4>
        <form className="formDiv" onSubmit={signup}>
          <input
            type="text"
            value={name}
            placeholder="Enter your Full Name"
            onChange={(event) => setName(event.target.value)}
          />
          <select
            name="role"
            className="status1"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Select your role</option>
            <option>Admin</option>
            <option>Project Manager</option>
            <option>Developer</option>
            <option>QA</option>
          </select>
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

          <p>
            By signing up, I accept the Atlassian{" "}
            <span style={{ color: "rgb(17,104,226)" }}>
              Cloud Terms of Service
            </span>{" "}
            and acknowledge the{" "}
            <span style={{ color: "rgb(17,104,226)" }}>Privacy Policy</span>.
          </p>
          <button className="formBtn" type="submit">
            Sign up
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
          <span onClick={handleSignin}>
            Already have an Atlassian account? Log in
          </span>
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
          <p>
            This site is protected by reCAPTCHA and the Google{" "}
            <span>Privacy Policy</span> and <span>Terms of Service</span> apply.
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
