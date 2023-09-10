import React, { useState, useEffect } from "react";
import {
  DocumentData,
  DocumentReference,
  getDocs,
  getDoc,
  collection,
  doc,
} from "firebase/firestore";

import Post from "../Feed/Post";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../auth";
import TweetFeed from "../Feed/TweetFeed";

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
  postRef: DocumentReference<DocumentData>;
}

interface OpenedTweetProps extends PostData {}

const OpenedTweet: React.FC<OpenedTweetProps> = ({
  text,
  image,
  likes,
  userRef,
  postRef,
}) => {
  const [comments, setComments] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true); // Added loading state
  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true); // Set loading state to true before fetching

      const reff = collection(postRef, "posts");
      const snapshot = await getDocs(reff);
      const commentsData: PostData[] = [];

      for (const commentDoc of snapshot.docs) {
        const commentData = commentDoc.data() as CommentData;
        const completeCommentData = {
          ...commentData,
          postRef: commentDoc.ref,
        };
        commentsData.push(completeCommentData);
      }

      setComments(commentsData);
      setLoading(false); // Set loading state to false after fetching
    };

    fetchComments();
  }, [postRef]);

  const navigate = useNavigate();
  const { removeToPostStack, addToPostStack } = useUserAuth();
  const handleGoBack = () => {
    removeToPostStack();
    navigate(-1); // This navigates back by one step in the history
  };
  const navigator = useNavigate();
  const handleNav = (post: PostData) => {
    addToPostStack(post);
    navigator(`/home/`);
  };

  return (
    <div>
      <button onClick={handleGoBack}>Go Back</button>
      <Post
        key={postRef.id}
        text={text}
        image={image}
        likes={likes}
        userRef={userRef}
        postRef={postRef}
      />

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
        <TweetFeed posts={comments} handleNav={handleNav} postRef={postRef} />
      )}
    </div>
  );
};

export default OpenedTweet;
