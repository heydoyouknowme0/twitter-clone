import "./tweetBox.css";
import { Avatar, Button } from "@mui/material";
import {
  addDoc,
  serverTimestamp,
  doc,
  CollectionReference,
  DocumentData,
  collection,
} from "firebase/firestore";
import { ChangeEvent, FormEvent, useState } from "react"; // Import useState hook if not already imported
import { db, storage } from "../../firebase";
import { useUserAuth } from "../../auth";
import Compressor from "compressorjs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const TweetBox = ({
  colRef,
}: {
  colRef: CollectionReference<DocumentData>;
}) => {
  const { user } = useUserAuth();
  const [selectedImages, setSelectedImages] = useState<File[]>();
  const [errorMessage, setErrorMessage] = useState("");
  const compressImage = (file: File): Promise<File> => {
    return new Promise<File>((resolve, reject) => {
      new Compressor(file, {
        quality: 0.8,
        success: (result) => {
          resolve(new File([result], file.name, { type: result.type }));
        },
        error: (error: Error) => reject(error),
      });
    });
  };
  const handleImageSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const fileSizeLimit = 5 * 1024 * 1024;
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      const validFiles = files.filter(
        (file) => file.size <= fileSizeLimit && allowedTypes.includes(file.type)
      );

      if (validFiles.length === files.length) {
        setErrorMessage("");

        try {
          const compressedFiles = await Promise.all(
            validFiles.map((file) => compressImage(file))
          );

          setSelectedImages(compressedFiles);
        } catch (error) {
          console.error("Error compressing images:", error);
          event.target.value = "";
          setErrorMessage("Error compressing");
        }
      } else {
        event.target.value = "";
        setErrorMessage(
          "Invalid file(s) selected. Please choose valid image files."
        );
      }
    }
  };
  const handleTweet = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const userId = user?.uid;

    const text = formData.get("tweetText") as string;
    try {
      const imageUrls = [];

      if (selectedImages && selectedImages.length > 0) {
        for (const imageFile of selectedImages) {
          const storageRef = ref(storage, `images/${imageFile.name}`);
          await uploadBytes(storageRef, imageFile);

          // Get download URL for the uploaded image
          const imageURL = await getDownloadURL(storageRef);
          imageUrls.push(imageURL);
        }
      }
      const docRef = await addDoc(colRef, {
        userRef: doc(db, "users/" + userId),
        text,
        image: imageUrls,
        likes: 0,
        likesRef: [],
        timestamp: serverTimestamp(),
      });

      console.log("Tweet added with ID: ", docRef.id);
      form.reset();
    } catch (error) {
      console.error("Error adding tweet: ", error);
    }
  };
  return (
    <div className="tweetBox">
      <form onSubmit={handleTweet}>
        <div className="tweetBox__input">
          <Avatar src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"></Avatar>
          <textarea placeholder="What's happening?" name="tweetText"></textarea>
        </div>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          multiple
          onChange={handleImageSelect}
        />

        {errorMessage && <p style={{ textAlign: "center" }}>{errorMessage}</p>}
        <Button className="tweetBox__tweetButton" type="submit">
          Tweet
        </Button>
      </form>
    </div>
  );
};

export default TweetBox;
