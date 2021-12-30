import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Redirect from "./components/redirect";
import Login_page from "./pages/login";
import Blogs_page from "./pages/blogs";

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
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          <Routes>
            <Route
              exact
              path="/"
              element={<Redirect route={"/login"} />}
            ></Route>
            <Route path="/login" element={<Login_page />}></Route>
            <Route path="/blogs" element={<Blogs_page />}></Route>
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
export { UserContext };
