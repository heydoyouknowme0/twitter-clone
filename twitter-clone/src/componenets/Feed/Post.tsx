import { ReactNode } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  Repeat,
  ShareOutlined,
  VerifiedUser,
} from "@mui/icons-material";
interface Prop {
  displayName: string;
  username: string;
  verified: boolean;
  text: string;
  image: ReactNode;
  avatar: ReactNode;
}
const Post = ({
  displayName,
  username,
  verified,
  text,
  image,
  avatar,
}: Prop) => {
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"></Avatar>
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              New user{" "}
              <span className="post__headerSpecial">
                <VerifiedUser className="post__badge" /> @yono
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>Average tailwind fan vs Average bootstrap Enjoyer</p>
          </div>
        </div>
        <img
          src="https://thumbs.gfycat.com/WelllitSnappyFrogmouth-max-1mb.gif"
          alt=""
        />
        <div className="post__footer">
          <ChatBubbleOutline fontSize="small" />
          <Repeat fontSize="small" />
          <FavoriteBorder fontSize="small" />
          <ShareOutlined fontSize="small" />
        </div>
      </div>
    </div>
  );
};

export default Post;
