import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age, setage] = useState(user.age);
  const [gender, setgender] = useState(user.gender);
  const [photoURL, setphotoURL] = useState(user.photoURL);
  const [about, setabout] = useState(user.about);

  const handleonsave = async () => {
    try {
      const res = await axios.patch(
        "http://localhost:7777/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoURL,
          about,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res.data.data));
      toast.success("Profile updated successful..");
    } catch (error) {
      toast.error("Failed to update profile ❌");
    }
  };
  return (
    <div className="flex py-30 justify-center items-center">
      <div className="card bg-base-100 image-full w-96 shadow-sm">
        <figure>
          <img src={user.photoURL} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title flex justify-center font-bold">Edit Profile</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">FirstName</legend>
            <input
              type="text"
              className="input"
              placeholder={user.firstName}
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">LastName</legend>
            <input
              type="text"
              className="input"
              placeholder={user.lastName}
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="text"
              className="input"
              placeholder={user.age}
              value={age}
              onChange={(e) => setage(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Gender</legend>
            <input
              type="text"
              className="input"
              placeholder={user.gender}
              value={gender}
              onChange={(e) => setgender(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Profile Photo</legend>
            <input
              type="text"
              className="input"
              placeholder="Profile Photo"
              value={photoURL}
              onChange={(e) => setphotoURL(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <input
              type="text"
              className="input"
              placeholder={user.about}
              value={about}
              onChange={(e) => setabout(e.target.value)}
            />
          </fieldset>
          <div className="card-actions justify-center mt-2">
            <button className="btn btn-success" onClick={handleonsave}>
              EDIT & SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
