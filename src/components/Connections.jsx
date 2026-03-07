import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../store/base_url";
import { useDispatch, useSelector } from "react-redux";
import { addConnections, removeConnections } from "../store/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connection", {
        withCredentials: true,
      });
      //   console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log("Not found..");
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  const handleonRemove = async (requestid) => {
    try {
      const res = await axios.post(
        BASE_URL + "/connection/remove/" + requestid,
        {},
        { withCredentials: true },
      );

      dispatch(removeConnections(requestid));
    } catch (error) {
      console.log("Can not remove...");
    }
  };
  return (
    <div>
      <div className="flex justify-center m-4 text-3xl font-bold">
        Connections
      </div>
      {connections.map((connection) => (
        <div
          key={connection._id}
          className="card card-side bg-base-300 shadow-sm mb-2"
        >
          <figure className="ml-5">
            <img
              className="size-20 rounded-box mr-1.5"
              src={connection.photoURL}
              alt="Movie"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{connection.firstName}</h2>
            <p>Click the button to watch on Jetflix app.</p>
            <div className="card-actions justify-end"></div>
          </div>
          <button
            className="btn btn-outline btn-accent mt-9.5 mr-10"
            onClick={() => handleonRemove(connection.connectionId)}
          >
            Remove Connection
          </button>
        </div>
      ))}
    </div>
  );
};

export default Connections;
