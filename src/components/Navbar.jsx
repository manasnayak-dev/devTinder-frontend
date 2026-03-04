import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import BASE_URL from "./../store/base_url";
import { Navigate, useNavigate } from "react-router-dom";
import { removeUser } from "../store/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleonlogout = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        },
      );

      dispatch(removeUser());
      Navigate("/login");
    } catch (error) {
      console.log("Something went wrong");
    }
  };

  return (
    <>
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">DevTinder</a>
        </div>
        {user && <p>Welcome, {user.firstName} </p>}
        {user && (
          <div className="flex gap-2">
            <div className="dropdown dropdown-end mx-5">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between" onClick={() => Navigate("/profile")}>
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a onClick={() => Navigate("/connections")}>Connections</a>
                </li>
                <li>
                  <a onClick={() => Navigate("/request")}>Request</a>
                </li>
                <li>
                  <a onClick={handleonlogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
export function App() {
  return (
    <>
      <Navbar></Navbar>
    </>
  );
}
