import axios from "axios";
import { useState, useContext } from "react";
import { UserContext } from "../App";
import Redirect from "../components/redirect";

const Login_page = () => {
  const [loginUser, setLoginUser] = useState();
  const [password, setPassword] = useState();
  const [adminCode, setAdminCode] = useState();
  const user_context = useContext(UserContext);

  const login = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      data: {
        username: loginUser,
        password: password,
        admin_code: adminCode,
      },
    };

    const get_token = await axios.post(
      "http://localhost:4000/auth/admin/login",
      options
    );
    console.log(get_token, "k");
    // setLoginUser("");
    // setPassword("");
    // setAdminCode("");
    user_context.setUser(get_token.data.user);
    user_context.setUserId(get_token.data.userId);
    user_context.setToken(get_token.data.token);
  };

  if (user_context.token) {
    return <Redirect route={"/blogs"} />;
  }
  return (
    <div>
      <form>
        <input
          type={"text"}
          onChange={(e) => {
            setLoginUser(e.target.value);
          }}
        />
        <input
          type={"password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type={"password"}
          onChange={(e) => {
            setAdminCode(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login_page;
