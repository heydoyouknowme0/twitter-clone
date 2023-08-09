import { useState } from "react";

interface ImageGalleryProps {
  image: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ image }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (imag: string) => {
    setSelectedImage(imag);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="image-gallery">
      {image.map((imag, index) => (
        <div key={index} className="image-container">
          <img
            src={imag}
            alt={`Image ${index}`}
            className="thumbnail"
            onClick={() => handleImageClick(imag)}
          />
        </div>
      ))}

      {selectedImage && (
        <div className="modal">
          <div className="modal-content">
            <img
              src={selectedImage}
              alt="Selected Image"
              className="selected-image"
            />
            <button className="close-button" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
