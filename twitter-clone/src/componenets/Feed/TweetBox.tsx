import "./tweetBox.css";
import { Avatar, Button } from "@material-ui/core";

const TweetBox = () => {
  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"></Avatar>
          <input placeholder="What's happening?" type="text"></input>
        </div>
        <input
          placeholder="Optional : Enter image URL"
          className="tweetBox__ImageInput"
          type="text"
        ></input>
        <Button className="tweetBox__tweetButton">Tweet</Button>
      </form>
    </div>
  );
};

export default TweetBox;
