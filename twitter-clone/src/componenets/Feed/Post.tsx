import "./Post.css";
import { useNavigate } from "react-router";
import { Avatar } from "@mui/material";
import Heart from "react-animated-heart";
import {
  ChatBubbleOutline,
  FavoriteBorder,
  Repeat,
  ShareOutlined,
  VerifiedUser,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useUserAuth } from "../../auth";
import { DocumentData, DocumentReference, updateDoc } from "firebase/firestore";
import ImageGallery from "./ImageGallery";
interface Prop {
  text: string;
  image?: string[];
  likes: number;
  postRef: DocumentReference<DocumentData>;
  displayname: string;
  displayName: string;
  verified: boolean;
  avatar?: string;
}
const Post = ({
  displayname,
  displayName,
  verified,
  text,
  image,
  avatar,
  likes,
  postRef,
}: Prop) => {
  const [isclick, setClick] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const { addToPostStack } = useUserAuth();
  useEffect(() => {
    const updateLikeCount = async () => {
      await updateDoc(postRef, { likes: likeCount });
    };
    updateLikeCount();
  }, [likeCount]);

  const handleLikeClick = () => {
    setClick(!isclick);
    setLikeCount(likeCount + (isclick ? -1 : 1));
  };

  const navigator = useNavigate();
  const handleNav = () => {
    addToPostStack({
      displayname,
      displayName,
      verified,
      text,
      image,
      avatar,
      likes,
      postRef,
    });
    navigator("/home/");
  };

  return (
    <div className="post" onClick={handleNav}>
      <div className="post__avatar">
        <Avatar src={avatar}></Avatar>
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {displayname}
              <span className="post__headerSpecial">
                {verified ? <VerifiedUser className="post__badge" /> : ""} @
                {displayName}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{text}</p>
          </div>
        </div>
        {/* {image ? <ImageGallery image={image} /> : ""} */}
        <div className="post__footer">
          <ChatBubbleOutline fontSize="small" />
          <Repeat fontSize="small" />
          <div className="liker">
            <div className="heart_wrapper">
              <Heart isClick={isclick} onClick={handleLikeClick} />
            </div>
            <div>{likeCount}</div>
          </div>
          <ShareOutlined fontSize="small" />
        </div>
      </div>
    </div>
  );
};

export default Post;
