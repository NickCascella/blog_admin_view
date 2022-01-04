import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Redirect from "./components/redirect";
import Login_page from "./pages/login";
import Blogs_page from "./pages/blogs";
import Blog_edit_page from "./pages/blog_edit";
import Blog_create_page from "./pages/blog_create";
import Custom_Link from "./components/link";
import Missing_page_404 from "./pages/404";

const UserContext = React.createContext();

function App() {
  const [token, setToken] = useState(null);
  const [blogs, setBlogs] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [webAddress, setWebAddress] = useState(
    "https://enigmatic-harbor-91646.herokuapp.com"
  );
  // "http://localhost:4000"
  return (
    <Router>
      <UserContext.Provider
        value={{
          token,
          setToken,
          user,
          setUser,
          userId,
          setUserId,
          blogs,
          setBlogs,
          webAddress,
          setWebAddress,
        }}
      >
        <div className="App">
          {token && (
            <nav>
              <div className="inner-nav">
                <div className="nav-links">
                  <Custom_Link
                    text={"Create"}
                    route={"/blogs/create"}
                  ></Custom_Link>
                  <Custom_Link text={"Blogs"} route={"/blogs"}></Custom_Link>
                  <Custom_Link
                    text={"Logout"}
                    route={"/login"}
                    on_click={() => {
                      setToken(null);
                      setUser(null);
                      setUserId(null);
                    }}
                  ></Custom_Link>
                </div>
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
            <Route path="*" element={<Missing_page_404 />}></Route>
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
export { UserContext };
