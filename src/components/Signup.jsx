import axios from "axios";
import React, { useState } from "react";
import BASE_URL from "../store/base_url";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);

  const handleonsignup = async () => {
    seterror("");

    if (!email.trim()) {
      return seterror("Please enter email ID...");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return seterror("Please enter valid email address...");
    }

    if (!password.trim()) {
      return seterror("Please enter password...");
    }

    if (password.length < 6) {
      return seterror("Password must be at least 6 characters...");
    }

    try {
      setloading(true);

      await axios.post(
        BASE_URL + "/signup",
        { email, password, firstName},
        { withCredentials: true }
      );

      navigate("/login");
    } catch (error) {
      if (error.response) {
        seterror(error.response.data.message);
      } else {
        seterror("Server error. Please try again.");
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex justify-center py-24">
      <div className="card bg-base-300 image-full w-96 shadow-xl">
        <figure>
          <img
            src="https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b"
            alt="Signup"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title text-center justify-center text-2xl">
            Create Account
          </h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input input-bordered"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              className="input input-bordered"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input input-bordered"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </fieldset>

          {error && (
            <p className="text-red-500 text-center mt-2 font-semibold">
              {error}
            </p>
          )}

          <div className="card-actions justify-center mt-4">
            <button
              className={`btn btn-primary w-full ${
                loading ? "loading" : ""
              }`}
              onClick={handleonsignup}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Signup"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;