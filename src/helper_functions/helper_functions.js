import axios from "axios";
import { format } from "date-fns";

const changeInputValue = (value, state_changing) => {
  state_changing(value);
};

const create_timestamp = () => {
  let date = format(new Date(), "yyyy-MM-dd @ ");
  const hours = format(new Date(), "HH");
  let formatted_hours = hours > 12 ? hours - 12 : hours;
  let am_or_pm = hours > 12 ? "pm" : "am";
  const minutes = format(new Date(), "mm");
  return (date += `${formatted_hours}:${minutes}${am_or_pm} EST`);
};

const logout = (setToken, setUser, setUserId, setBlogs) => {
  setToken(null);
  setUser(null);
  setUserId(null);
  setBlogs(null);
};

//GET BLOGS

const get_blogs = async (token, setBlogs) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
  };
  const get_all_blogs = await axios.get("http://localhost:4000/blogs", options);
  const response = get_all_blogs;
  setBlogs(response.data);
};

const get_blog = async (token, id, setBlog, setBlogPublished) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    mode: "cors",
  };
  const get_blog_request = await axios.get(
    `http://localhost:4000/blogs/${id}`,
    options
  );
  const response = get_blog_request;
  setBlog(response.data);
  setBlogPublished(response.data.published);
};

const delete_blog = async (token, id, setDeleted) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: {
      blog_id: id,
    },
  };
  setDeleted(true);
  const delete_blog_request = await axios.delete(
    `http://localhost:4000/blogs/admin/${id}`,
    options
  );

  // const error_array = submit_edits.data.errors;
  // if (error_array) {
  //   return error_array;
  // }
};

const render_errors = (error_array) => {
  return (
    <div className="rendered-errors">
      <div className="rendered-error-header">
        Please note the following issues with your request
      </div>
      <ul className="rendered-errors-list">
        {error_array.map((error) => {
          return <li className="rendered-error-message">{error.msg}</li>;
        })}
      </ul>
    </div>
  );
};

export {
  get_blogs,
  logout,
  changeInputValue,
  create_timestamp,
  get_blog,
  delete_blog,
  render_errors,
};
