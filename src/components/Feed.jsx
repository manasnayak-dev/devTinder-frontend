import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../store/base_url";
import { addFeed, removeFeed } from "../store/feedSlice";
import { removeConnections } from "../store/connectionSlice";

const Feed = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      // console.log(res.data.data);
      dispatch(addFeed(res.data.data));
      // console.log(feed.firstName);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!feed) {
    return;
  }

  if (feed.length === 0) {
    return <h1 className="flex justify-center mt-30 font-bold text-5xl">Feeds are not there</h1>;
  }

  const handleoninterest = async (status, userid) => {
    try {
      const res = await axios.post(
        BASE_URL + "/connection/send" + "/" + status + "/" + userid,
        {},
        { withCredentials: true },
      );
      dispatch(removeFeed(userid));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {feed.map((feed) => (
        <div className="py-22 flex justify-center" key={feed._id}>
          <div className="card bg-base-300 w-96 shadow-sm">
            <figure className="px-10 pt-10">
              <img src={feed.photoURL} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center flex">
              <div className="flex">
                <h2 className="card-title mr-1">{feed.firstName}</h2>
                <h2 className="card-title ml-1">{feed.lastName}</h2>
              </div>
              <p>{feed.about}</p>
              <div className="card-actions m">
                <button
                  className="btn btn-neutral mr-3"
                  onClick={() => handleoninterest("ignored", feed._id)}
                >
                  Ignored
                </button>
                <button
                  className="btn btn-success ml-3"
                  onClick={() => handleoninterest("interested", feed._id)}
                >
                  Interested
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Feed;
