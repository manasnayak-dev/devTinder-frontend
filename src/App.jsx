import "./App.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Feed from "./components/Feed";
import Contact from "./components/Contact";
import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useSelector } from "react-redux";
import Profile from "./components/Profile";
import { Toaster } from "react-hot-toast";
import Connections from "./components/Connections";
import Request from "./components/Request";
import Chat from "./components/chat";
// import { ToastBar } from './../node_modules/react-hot-toast/src/components/toast-bar';
function App() {
  const user = useSelector((store) => store.user);
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route
              path="/"
              element={user ? <Feed /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/contact"
              element={user ? <Contact /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" replace /> : <Login />}
            />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/connections"
              element={user ? <Connections /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/request"
              element={user ? <Request /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/chat"
              element={user ? <Chat /> : <Navigate to="/login" replace />}
            />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
