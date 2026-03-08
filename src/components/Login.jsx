import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../store/base_url";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  const handleonclick = async () => {
    if (!email) {
      seterror("Please enter email ID...");
      return;
    }
    if (!password) {
      seterror("Please enter password...");
      return;
    }

    try {
      const res = await axios.post(
        BASE_URL+"/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );
      seterror("");
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      if (error.response) {
        seterror(error.response.data.message);
      } else {
        seterror("Server error. Please try again.");
      }
    }
  };
  return (
    <div className="py-30 flex justify-center items-center">
      <div className="card bg-base-100 image-full w-96 shadow-sm">
        <figure>
          <img
            src="https://png.pngtree.com/thumb_back/fh260/background/20241231/pngtree-animated-login-image_16607697.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl font-bold">
            Login
          </h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg font-bold">
              Email ID
            </legend>
            <input
              value={email}
              type="email"
              className="input"
              placeholder="Enter your Email ID"
              onChange={(e) => setemail(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-lg font-bold">
              Password
            </legend>
            <input
              value={password}
              type="password"
              className="input"
              placeholder="Enter your password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </fieldset>
          {error && (
            <p className="text-red-500 text-center mt-2 font-semibold">
              {error}
            </p>
          )}
          <div className="card-actions  justify-center py-8">
            <button
              className="btn btn-primary text-lg font-bold mr-1"
              onClick={handleonclick}
            >
              Login!
            </button>
            <button
              className="btn btn-success text-lg font-bold ml-1"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
