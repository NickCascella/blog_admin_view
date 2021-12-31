import { useState, useContext, useEffect } from "react";
import {
  create_timestamp,
  changeInputValue,
} from "../helper_functions/helper_functions";
import { UserContext } from "../App";
import axios from "axios";
import Button from "../components/button";
import Input from "../components/input";
import Redirect from "../components/redirect";

const Blog_create_page = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [blogPublished, setBlogPublished] = useState(true);
  const [created, setCreated] = useState(false);
  const [errorResponse, setErrorResponse] = useState(null);
  const user_context = useContext(UserContext);
  const token = user_context.token;

  const create_blog = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const date = `Created @ ${create_timestamp()} by ${user_context.user}`;
    const options = {
      method: "POST",
      mode: "cors",
      data: {
        blog_title: blogTitle,
        blog_description: blogDescription,
        blog_body: blogBody,
        blog_published: blogPublished,
        created_date: date,
      },
    };
    console.log(options);

    const create_blog_request = await axios.post(
      `http://localhost:4000/blogs/admin`,
      options,
      { headers }
    );
    console.log(create_blog_request);
    if (create_blog_request.data.errors) {
      setErrorResponse(create_blog_request.data.errors);
      return;
    }
    setCreated(true);
    // const error_array = create_comment.data.errors;
    // if (error_array) {
    //   return error_array;
    // }
  };

  if (created) {
    return <Redirect route={"/blogs"} />;
  } else if (!token) {
    return <Redirect route={"/login"} />;
  }

  return (
    <div>
      <Input
        type={"text"}
        placeholder={"Blog title here.."}
        value={blogTitle}
        on_change={(e) => {
          changeInputValue(e.target.value, setBlogTitle);
        }}
      ></Input>
      <Input
        type={"text"}
        placeholder={"Blog description here.."}
        value={blogDescription}
        on_change={(e) => {
          changeInputValue(e.target.value, setBlogDescription);
        }}
      ></Input>
      <Input
        type={"text"}
        placeholder={"Blog body here.."}
        value={blogBody}
        on_change={(e) => {
          changeInputValue(e.target.value, setBlogBody);
        }}
      ></Input>
      <Button
        text={
          <div>
            {!blogPublished && <div>Publish</div>}
            {blogPublished && <div>Unpublish</div>}
          </div>
        }
        on_click={() => {
          setBlogPublished(!blogPublished);
        }}
      />
      <Button
        on_click={() => {
          create_blog();
        }}
        text={"Create Blog"}
      />
      {errorResponse &&
        errorResponse.map((error) => {
          return error.msg;
        })}
    </div>
  );
};

export default Blog_create_page;
