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
  render_errors,
} from "../helper_functions/helper_functions";
import Label from "../components/label";
import Textarea from "../components/textarea";

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
    console.log(options);
    const submit_edits = await axios.put(
      `http://localhost:4000/blogs/admin/${id}`,
      options,
      { headers }
    );
    setEditing(false);
    const error_array = submit_edits.data.errors;
    if (error_array) {
      setErrorResponse(error_array);
    } else {
      setErrorResponse(null);
    }
  };

  if (deleted) {
    return <Redirect route={"/blogs"} />;
  } else if (!token) {
    return <Redirect route={"/login"} />;
  } else if (!blog) {
    return <Loading_page message={"Loading :("} />;
  }

  return (
    <div className="blog-edit-page">
      {!editing && (
        <div className="blog">
          <h1 className="blog-title">{blog.title}</h1>
          <div className="blog-description">{blog.description}</div>

          <div className="blog-body">{blog.body}</div>
          <div className="blog-description">
            {blog.created_date && blog.created_date}
          </div>
          <div className="blog-edited-date">{blog.edited_date} </div>
        </div>
      )}
      {editing && (
        <div className="editing-form">
          <Label label={"Blog title"} />
          <Input
            type={"text"}
            on_change={(e) => {
              changeInputValue(e.target.value, setBlogTitle);
            }}
            value={blogTitle}
          />
          <Label label={"Blog description"} />
          <Textarea
            setState={setBlogDescription}
            state={blogDescription}
            maxRowsStart={10}
          />
          <Label label={"Blog content"} />
          <Textarea
            setState={setBlogBody}
            state={blogBody}
            minRowsStart={9}
            maxRowsStart={20}
          />
          <Label
            label={
              <span>
                {!blogPublished && (
                  <span>
                    Your blog is currently <b>unpublished</b>. Meaning it will
                    not be viewable by standard users, but will be saved here in
                    the admin portal where you can continue to edit and then
                    republish it to general users when you see fit.
                  </span>
                )}
                {blogPublished && (
                  <span>
                    Yout blog is currently <b>published</b>. Meaning it will be
                    viewable and availible for comment by general users. You do
                    not need to unpublish a blog to make edits.
                  </span>
                )}
              </span>
            }
          />
          <Button
            text={
              <span>
                {!blogPublished && <span>Publish</span>}
                {blogPublished && <span>Unpublish</span>}
              </span>
            }
            on_click={(e) => {
              e.preventDefault();
              setBlogPublished(!blogPublished);
            }}
          />

          <Button
            text={"Submit changes"}
            on_click={(e) => {
              e.preventDefault();
              submit_edits();
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
      {blog.author.username && (
        <Button
          text={
            <div>
              {!editing && <div>Edit</div>}
              {editing && <div>Cancel editing</div>}
            </div>
          }
          on_click={() => {
            setEditing(!editing);
          }}
        />
      )}
      {/* {blog.author.username !== user_context.user && (
        <div>This blog is only editable by its author {user_context.user}</div>
      )} */}

      <div>{errorResponse && render_errors(errorResponse)}</div>
    </div>
  );
};

export default Blog_edit_page;
