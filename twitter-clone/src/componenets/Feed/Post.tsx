import "./Post.css";

import { Avatar } from "@mui/material";
import Heart from "react-animated-heart";
import {
  ChatBubbleOutline,
  Repeat,
  ShareOutlined,
  VerifiedUser,
} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";

import {
  DocumentData,
  DocumentReference,
  updateDoc,
  increment,
  collection,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import ImageGallery from "./ImageGallery";
import { useUserAuth } from "../../auth";
interface Prop {
  text: string;
  image?: string[];
  likes: number;
  userRef: DocumentReference<DocumentData>;
  postRef: DocumentReference<DocumentData>;
  onClick?: () => void;
}
interface UserData {
  displayname: string;
  displayName: string;
  avatar?: string;
  verified: boolean;
}
const Post = ({ text, image, likes, userRef, postRef }: Prop) => {
  const { users } = useUserAuth();
  const [user, setUser] = useState<UserData>({
    displayName: "", // Default values
    displayname: "",
    avatar: "",
    verified: false,
  });
  useEffect(() => {
    const fetchUser = async () => {
      const foundUser = users.find((user) => user.userRef.id === userRef.id);
      if (foundUser) {
        setUser(foundUser);
      }
    };

    fetchUser();
  }, [users]);

  const [likeCount, setLikeCount] = useState(likes);
  const [isclick, setIsclick] = useState(false);
  const handleLikeClick = async () => {};
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar src={user.avatar}></Avatar>
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>
              {user.displayname}
              <span className="post__headerSpecial">
                {user.verified ? <VerifiedUser className="post__badge" /> : ""}{" "}
                @{user.displayName}
              </span>
            </h3>
          </div>
          <div className="post__headerDescription">
            <p>{text}</p>
          </div>
        </div>
        {image ? <ImageGallery images={image} /> : ""}
        <div className="post__footer">
          <ChatBubbleOutline fontSize="small" />
          <Repeat fontSize="small" />
          <div className="liker">
            <div className="heart_wrapper">
              <Heart
                isClick={!isclick}
                onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                  handleLikeClick(e)
                }
              />
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
