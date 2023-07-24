import { useState } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";

const Feed = () => {
  const [feedSelectbox, setFeedSelectbox] = useState("For You");

  const handleFeedSelectbox = (value: string) => {
    setFeedSelectbox(value);
  };

  return (
    <div className="feed-con">
      <div className="feed">
        {/* Header */}
        <div className="feed__header">
          <h2>Home</h2>
          <div className="feed__select">
            <div
              className={`feed__selectbox ${
                feedSelectbox === "For You" && "feed__selectbox--active"
              }`}
              onClick={() => handleFeedSelectbox("For You")}
            >
              <div className="sub">For You</div>
              {feedSelectbox === "For You" && (
                <div className="feed__selectbox-bar"></div>
              )}
            </div>
            <div
              className={`feed__selectbox ${
                feedSelectbox === "Following" && "feed__selectbox--active"
              }`}
              onClick={() => handleFeedSelectbox("Following")}
            >
              <div className="sub">Following</div>
              {feedSelectbox === "Following" && (
                <div className="feed__selectbox-bar"></div>
              )}
            </div>
          </div>
        </div>

        <TweetBox />

        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        {/* Post */}
        {/* Post */}
        {/* Post */}
        {/* Post */}
        {/* Post */}
        {/* Post */}
      </div>
    </div>
  );
};

export default Feed;
