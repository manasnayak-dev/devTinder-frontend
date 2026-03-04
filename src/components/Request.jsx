import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addrequest, removerequest } from "../store/Request";
import BASE_URL from "../store/base_url";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request) || [];

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const reviewstatus = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/connection/review" + "/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );

      dispatch(removerequest(_id));
    } catch (error) {
      console.log("Something Went wrong...");
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/request?page=${page}`, {
        withCredentials: true,
      });

      dispatch(addrequest(res.data.data));
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log("Not found..");
    }
  };

  useEffect(() => {
    fetchRequest();
  }, [page]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Requests</h1>

      {requests.length === 0 ? (
        <p>No Requests Found</p>
      ) : (
        requests.map((request) => (
          <div
            key={request._id}
            className="p-4 mb-3 border rounded-lg shadow flex justify-between"
          >
            <div className="flex">
              <img
                className="size-10 rounded-box mr-1.5"
                src={request.fromUserID.photoURL}
                alt="profile"
              />
              <h2 className="ml-1.5 mt-0.5 text-2xl font-bold">
                {request.fromUserID.firstName} {request.fromUserID.lastName}
              </h2>
            </div>
            <div>
              <button
                className="btn btn-success mr-3"
                onClick={() => reviewstatus("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-error ml-3"
                onClick={() => reviewstatus("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      <div className="flex gap-3 mt-5">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="btn btn-outline btn-sm"
        >
          Prev
        </button>

        <span className="self-center">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="btn btn-outline btn-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Request;
