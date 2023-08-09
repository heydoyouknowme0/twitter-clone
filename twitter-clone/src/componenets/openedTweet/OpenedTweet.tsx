import React, { useState, useEffect } from "react";
import {
  DocumentData,
  DocumentReference,
  getDocs,
  getDoc,
  collection,
} from "firebase/firestore";

import Post from "../Feed/Post";
import TweetBox from "../Feed/TweetBox";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../auth";

interface CommentData {
  text: string;
  image?: string[];
  likes: number;
  userRef: DocumentReference<DocumentData>;
}

interface UserData {
  displayname: string;
  displayName: string;
  avatar?: string;
  verified: boolean;
}

interface PostData extends CommentData {
  userRef: DocumentReference<DocumentData>;
  postRef: DocumentReference<DocumentData>;
  displayname: string;
  displayName: string;
  verified: boolean;
  avatar?: string;
}

interface OpenedTweetProps extends PostData {}

const OpenedTweet: React.FC<OpenedTweetProps> = ({
  displayname,
  displayName,
  verified,
  text,
  image,
  avatar,
  likes,
  postRef,
}) => {
  const [comments, setComments] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true); // Set loading state to true before fetching

      const reff = collection(postRef, "comments");
      const snapshot = await getDocs(reff);
      const commentsData: PostData[] = [];

      for (const commentDoc of snapshot.docs) {
        const commentData = commentDoc.data() as CommentData;

        const userDoc = await getDoc(commentData.userRef);
        const userData: UserData = userDoc.data() as UserData;

        const completeCommentData = {
          ...commentData,
          postRef: commentDoc.ref,
          displayName: userData.displayName,
          displayname: userData.displayname,
          verified: userData.verified,
          avatar: userData.avatar,
        };
        commentsData.push(completeCommentData);
      }

      setComments(commentsData);
      setLoading(false); // Set loading state to false after fetching
    };

    fetchComments();
  }, [postRef]);

  const navigate = useNavigate();
  const { removeToPostStack } = useUserAuth();
  const handleGoBack = () => {
    removeToPostStack();
    navigate(-1); // This navigates back by one step in the history
  };

  return (
    <div>
      <button onClick={handleGoBack}>Go Back</button>
      <Post
        displayname={displayname}
        displayName={displayName}
        verified={verified}
        text={text}
        avatar={avatar}
        image={image}
        likes={likes}
        postRef={postRef}
      />
      <TweetBox colRef={collection(postRef, "comments")} />
      {loading ? (
        <div className="center">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
      ) : (
        comments.map((post) => (
          <Post
            displayname={post.displayname}
            displayName={post.displayName}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
            likes={post.likes}
            postRef={post.postRef}
            key={post.postRef.id}
          />
        ))
      )}
    </div>
  );
};

export default OpenedTweet;
