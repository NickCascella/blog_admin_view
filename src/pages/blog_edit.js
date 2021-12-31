import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";
import Loading_page from "./loading";
import Button from "../components/button";
import Input from "../components/input";
import Redirect from "../components/redirect";
import {
  changeInputValue,
  create_timestamp,
  get_blog,
  delete_blog,
  check_published,
} from "../helper_functions/helper_functions";

const Blog_edit_page = () => {
  const { id } = useParams();
  const user_context = useContext(UserContext);
  const token = user_context.token;
  const [blog, setBlog] = useState("");
  const [errorResponse, setErrorResponse] = useState(null);
  const [editing, setEditing] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogPublished, setBlogPublished] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(async () => {
    setBlogTitle(blog.title);
    setBlogBody(blog.body);
    setBlogDescription(blog.description);
    get_blog(token, id, setBlog, setBlogPublished);
  }, [editing]);

  const submit_edits = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const blogEditedDate = `Updated @ ${create_timestamp()} by ${
      user_context.user
    }`;
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
        blog_published: blogPublished,
      },
    };
    console.log(blogPublished);
    const submit_edits = await axios.put(
      `http://localhost:4000/blogs/admin/${id}`,
      options,
      { headers }
    );
    setEditing(false);
    const error_array = submit_edits.data.errors;
    if (error_array) {
      setErrorResponse(error_array);
    }
  };

  // const check_published = () => {
  //   return blogPublished ? true : false;
  // };

  if (deleted) {
    return <Redirect route={"/blogs"} />;
  } else if (!token) {
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
          <div>{blog.description}</div>
          <div>{blog.edited_date} </div>
        </div>
      )}
      <Button
        text={
          <div>
            {!editing && <div>Edit</div>}
            {editing && <div>Cancel</div>}
          </div>
        }
        on_click={() => {
          setEditing(!editing);
        }}
      />
      {editing && (
        <div>
          <Input
            type={"text"}
            on_change={(e) => {
              changeInputValue(e.target.value, setBlogTitle);
            }}
            value={blogTitle}
          />
          <Input
            type={"text"}
            value={blogTitle}
            on_change={(e) => {
              changeInputValue(e.target.value, setBlogBody);
            }}
            value={blogBody}
          />
          <Input
            type={"text"}
            on_change={(e) => {
              changeInputValue(e.target.value, setBlogDescription);
            }}
            value={blogDescription}
          />
          <Button
            text={"Submit changes"}
            on_click={(e) => {
              e.preventDefault();
              submit_edits();
            }}
          />
          <Button
            text={
              <div>
                {!blogPublished && <div>Publish</div>}
                {blogPublished && <div>Unpublish</div>}
              </div>
            }
            on_click={(e) => {
              e.preventDefault();
              setBlogPublished(!blogPublished);
            }}
          />
          <Button
            text={"Delete"}
            on_click={async () => {
              await delete_blog(token, id, setDeleted);
              setEditing(!editing);
            }}
          />
        </div>
      )}

      <div>
        {errorResponse &&
          errorResponse.map((error) => {
            return <div key={error.msg}>{error.msg}</div>;
          })}
      </div>
    </div>
  );
};

export default Blog_edit_page;
