import axios from "axios";
import {
  loginFailed,
  loginSuccess,
  registerUser,
} from "../store/features/auth/authSlice";

const AuthRoutes = {
  signup: async ({ name, role, email, pass, setError, dispatch, navigate }) => {
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        name: name,
        role: role,
        email: email,
        password: pass,
      });

      if (response.status === 201) {
        const { data } = response;
        const { name: user, role: teamRole } = data.user;
        console.log(name, user, role, teamRole);

        dispatch(registerUser({ user, teamRole }));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      const error = err.response?.data?.message;
      setError(error);
    }
  },
  login: async ({ email, pass, setError, dispatch }) => {
    try {
      const response = await axios.post("http://localhost:3000/", {
        email: email,
        password: pass,
      });

      if (response.status === 200) {
        console.log(response.data);
        dispatch(loginSuccess({ user: response.data.user }));
        // setEmail("");
        // setPass("");
      } else {
        dispatch(loginFailed());
        alert("Login Failure");
      }
    } catch (err) {
      const error = err.response.data.message;
      setError(error);
    }
  },
};

export default AuthRoutes;
