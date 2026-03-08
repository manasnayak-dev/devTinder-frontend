import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser, removeUser } from "../store/userSlice";
import BASE_URL from "../store/base_url";

const Body = () => {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL+"/profile", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (error) {
      console.log("not logged data..");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Body;
