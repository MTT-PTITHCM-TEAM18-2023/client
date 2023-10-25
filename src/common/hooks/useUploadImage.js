import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";

import { storage } from "../utils/firebase";

export const useUploadImage = () => {
  const [imageUpload, setImageUpload] = useState();
  const handleUploadImage = async () => {
    if (imageUpload == null) return null; // Return null if no image selected
    const imageRef = ref(
      storage,
      `product/${imageUpload.name + new Date().getTime()}`
    );
    try {
      const snapshot = await uploadBytes(imageRef, imageUpload);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL; // Return the image download URL
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  return {
    handleUploadImage,
    imageUpload,
    setImageUpload,
  };
};
