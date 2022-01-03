import React, { useContext, useEffect } from "react";
import { UserContext } from "../App";
import Redirect from "../components/redirect";
import Loading_page from "../components/loading";
import { Link } from "react-router-dom";
import { get_blogs } from "../helper_functions/helper_functions";

const Blogs_page = () => {
  const user_context = useContext(UserContext);
  const token = user_context.token;
  const setToken = user_context.setToken;
  const refreshToken = user_context.refreshToken;
  const blogs = user_context.blogs;
  const setBlogs = user_context.setBlogs;

  useEffect(() => {
    get_blogs(token, setBlogs, refreshToken, setToken);
  }, []);

  const render_blogs = () => {
    return blogs.map((blog) => {
      return (
        <div className="blog-preview" key={blog._id}>
          <Link className="blog-link" to={`/blogs/${blog._id}`}>
            <h1 className="blog-title">{blog.title}</h1>
            <h2 className="blog-author-container">
              By{" "}
              <span className="blog-author-name">{blog.author.username}</span>
            </h2>
            <p className="blog-description">{blog.description}</p>
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
    <div className="blogs-page">
      <h1 className="blogs-list-header">Blogs - Admin preview</h1>
      <div className="blogs-list">{render_blogs()}</div>
    </div>
  );
};

export default Blogs_page;
