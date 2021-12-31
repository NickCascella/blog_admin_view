import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Redirect from "./components/redirect";
import Login_page from "./pages/login";
import Blogs_page from "./pages/blogs";
import Blog_edit_page from "./pages/blog_edit";
import Blog_create_page from "./pages/blog_create";
import Custom_Link from "./components/link";

const UserContext = React.createContext();

function App() {
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <Router>
      <UserContext.Provider
        value={{
          token: token,
          setToken: setToken,
          user: user,
          setUser: setUser,
          userId: userId,
          setUserId: setUserId,
          blogs: blogs,
          setBlogs: setBlogs,
        }}
      >
        <div className="App">
          {token && (
            <nav>
              <div className="inner-nav">
                <Custom_Link
                  text={"Create"}
                  route={"/blogs/create"}
                ></Custom_Link>

                <Custom_Link text={"Blogs"} route={"/blogs"}></Custom_Link>
              </div>
            </nav>
          )}
          <Routes>
            <Route
              exact
              path="/"
              element={<Redirect route={"/login"} />}
            ></Route>
            <Route path="/login" element={<Login_page />}></Route>
            <Route path="/blogs" element={<Blogs_page />}></Route>
            <Route path="/blogs/:id" element={<Blog_edit_page />}></Route>
            <Route path="/blogs/create" element={<Blog_create_page />}></Route>
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
export { UserContext };
