import { useState, useContext, useEffect } from "react";
import { create_timestamp } from "../helper_functions/helper_functions";
import { UserContext } from "../App";
import axios from "axios";

const Blog_create_page = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [blogPublished, setBlogPublished] = useState(true);
  const user_context = useContext(UserContext);
  const token = user_context.token;

  useEffect(() => {
    console.log(user_context);
  });

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

    const create_blog_request = await axios.post(
      `http://localhost:4000/blogs/admin`,
      options,
      { headers }
    );
    console.log(create_blog_request);
    // const error_array = create_comment.data.errors;
    // if (error_array) {
    //   return error_array;
    // }
  };

  return (
    <div>
      <button
        onClick={() => {
          create_blog();
        }}
      >
        test
      </button>
    </div>
  );
};

export default Blog_create_page;
