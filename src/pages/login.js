import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import Redirect from "../components/redirect";
import Label from "../components/label";
import Input from "../components/input";
import Button from "../components/button";
import { render_errors } from "../helper_functions/helper_functions";

const Login_page = () => {
  const [loginUser, setLoginUser] = useState();
  const [password, setPassword] = useState();
  const [adminCode, setAdminCode] = useState();
  const user_context = useContext(UserContext);
  const [errorResponse, setErrorResponse] = useState(null);

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
      `${user_context.webAddress}/auth/admin/login`,
      options
    );

    if (get_token.data.errors) {
      setErrorResponse(get_token.data.errors);
      return;
    }

    setLoginUser("");
    setPassword("");
    setAdminCode("");
    setErrorResponse(null);
    user_context.setUser(get_token.data.user);
    user_context.setUserId(get_token.data.userId);
    user_context.setToken(get_token.data.accessToken);
  };

  if (user_context.token) {
    return <Redirect route={"/blogs"} />;
  }
  return (
    <div className="login-page">
      <h1>Admin Blog Portal</h1>
      <h2>Create and edit all blogs viewed by yourself and standard users</h2>
      <form>
        <Label label={"Username"}></Label>
        <Input
          type={"text"}
          on_change={(e) => {
            setLoginUser(e.target.value);
          }}
        />
        <Label label={"Password"}></Label>
        <Input
          type={"password"}
          on_change={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Label label={"Admin Code"}></Label>
        <Input
          type={"password"}
          on_change={(e) => {
            setAdminCode(e.target.value);
          }}
        />
        <Button
          text={"Login"}
          on_click={(e) => {
            e.preventDefault();
            login();
          }}
        />
      </form>

      {errorResponse && render_errors(errorResponse)}
    </div>
  );
};

export default Login_page;
