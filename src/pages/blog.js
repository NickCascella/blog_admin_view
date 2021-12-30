import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";
import Loading_page from "./loading";
import Button from "../components/button";
import Input from "../components/input";
import Redirect from "../components/redirect";
import { changeInputValue } from "../helper_functions/helper_functions";

const Blog_page = (props) => {
  const { id } = useParams();
  const user_context = useContext(UserContext);
  const token = user_context.token;
  const [blog, setBlog] = useState("");
  const [errorResponse, setErrorResponse] = useState(null);
  const [editing, setEditing] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogEditedDate, setBlogEditedDate] = useState("");

  useEffect(async () => {
    get_blog();
  }, []);

  const get_blog = async () => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
    };
    const get_blog = await axios.get(
      `http://localhost:4000/blogs/${id}`,
      options
    );
    const response = get_blog;
    setBlog(response.data);
  };

  const edit_blog = (blog) => {
    setBlogTitle(blog.title);
    setBlogBody(blog.body);
    setBlogDescription(blog.description);
    return (
      <div>
        <form>
          <Input
            type={"text"}
            value={blogTitle}
            on_change={(e) => {
              changeInputValue(e.target.value, setBlogTitle);
            }}
          />
          <Input
            type={"text"}
            value={blogBody}
            on_change={(e) => {
              changeInputValue(e.target.value, setBlogBody);
            }}
          />
          <Input
            type={"text"}
            value={blogDescription}
            on_change={(e) => {
              changeInputValue(e.target.value, setBlogDescription);
            }}
          />
          <Button
            text={"Submit changes"}
            on_click={() => {
              submit_edits();
            }}
          />
        </form>
      </div>
    );
  };

  const submit_edits = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    // const format_comment = editedComment.date.split("edited");
    // format_comment[0]
    //   ? (editedComment.date = `edited - ${format_comment[0]}`)
    //   : (editedComment.date = `edited ${format_comment[1]}`);
    const options = {
      data: {
        blog_id: id,
        blog_title: blogTitle,
        blog_body: blogBody,
        blog_description: blogDescription,
        blog_edited_date: blogEditedDate,
      },
    };

    const submit_edits = await axios.put(
      `http://localhost:4000/blogs/${id}/comments`,
      options,
      { headers }
    );
    setEditing(false);
    const error_array = submit_edits.data.errors;
    if (error_array) {
      return error_array;
    }
  };

  if (!token) {
    return <Redirect route={"/login"} />;
  } else if (!blog) {
    return <Loading_page message={"Loading :("} />;
  }

  return (
    <div>
      {!editing && (
        <div>
          <h1>{blog.title}</h1>
          <div>{blog.body}</div>
        </div>
      )}

      <Button
        on_click={(blog) => {
          edit_blog(blog);
          setEditing(!editing);
        }}
      />
      <form></form>

      <div>
        {errorResponse &&
          errorResponse.map((error) => {
            return <div key={error.msg}>{error.msg}</div>;
          })}
      </div>
    </div>
  );
};

export default Blog_page;
