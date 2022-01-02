import { useState, useContext, useEffect } from "react";
import {
  create_timestamp,
  changeInputValue,
  render_errors,
} from "../helper_functions/helper_functions";
import { UserContext } from "../App";
import axios from "axios";
import Button from "../components/button";
import Input from "../components/input";
import Label from "../components/label";
import Textarea from "../components/textarea";
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
        author: user_context.userId,
      },
    };

    const create_blog_request = await axios.post(
      `http://localhost:4000/blogs/admin`,
      options,
      { headers }
    );

    if (create_blog_request.data.errors) {
      console.log("errors");
      setErrorResponse(create_blog_request.data.errors);
      return;
    }

    setCreated(true);
    const error_array = create_blog_request.data.errors;
    if (error_array) {
      return error_array;
    }
  };

  if (created) {
    return <Redirect route={"/blogs"} />;
  } else if (!token) {
    return <Redirect route={"/login"} />;
  }

  return (
    <div className="blog-create-page">
      <div className="create-form">
        <Label label={"Blog title"} />
        <Input
          type={"text"}
          placeholder={"Blog title..."}
          value={blogTitle}
          on_change={(e) => {
            changeInputValue(e.target.value, setBlogTitle);
          }}
        ></Input>
        <Label label={"Blog description"} />
        <Textarea
          placeholder={"Blog description..."}
          setState={setBlogDescription}
          state={blogDescription}
          maxRowsStart={10}
        />
        <Label label={"Blog content"} />
        <Textarea
          placeholder={"Blog content..."}
          setState={setBlogBody}
          state={blogBody}
          minRowsStart={9}
          maxRowsStart={20}
        />
        <Label
          label={
            <span className="published-notice">
              {!blogPublished && (
                <span>
                  Your blog is currently set to be <b>unpublished</b>. Meaning
                  it will not be viewable by standard users, but will be saved
                  here in the admin portal where you can edit, then publish it
                  to general users when you see fit.
                </span>
              )}
              {blogPublished && (
                <span>
                  Your blog is currently set to be <b>published</b>. Meaning it
                  will be viewable and availible for comment by general users.
                </span>
              )}
            </span>
          }
        />
      </div>

      <Button
        text={
          <div>
            {!blogPublished && <span>Publish</span>}
            {blogPublished && <span>Do not publish</span>}
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
      {errorResponse && render_errors(errorResponse)}
    </div>
  );
};

export default Blog_create_page;
