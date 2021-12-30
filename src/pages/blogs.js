import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import Redirect from "../components/redirect";
import Loading_page from "./loading";
import { Link } from "react-router-dom";
import { get_blogs } from "../helper_functions/helper_functions";

const Blogs_page = () => {
  const user_context = useContext(UserContext);
  const token = user_context.token;
  const blogs = user_context.blogs;
  const setBlogs = user_context.setBlogs;

  useEffect(() => {
    get_blogs(token, setBlogs);
  }, []);

  const render_blogs = () => {
    return blogs.map((blog) => {
      return (
        <div key={blog._id}>
          <Link to={`/blogs/${blog._id}`}>
            <h1>{blog.title}</h1>
            <h2>{blog.description}</h2>
          </Link>
        </div>
      );
    });
  };

  if (!token) {
    return <Redirect route={"/login"} />;
  } else if (!blogs) {
    return <Loading_page message="No blogs yet :/" />;
  }

  return (
    <div>
      <div>Welcome to blogs</div>
      {render_blogs()}
    </div>
  );
};

export default Blogs_page;
