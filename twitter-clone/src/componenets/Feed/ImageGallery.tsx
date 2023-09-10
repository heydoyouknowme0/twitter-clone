import { useState } from "react";
import "./ImageGallery.css";

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleImageClick = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    index: number
  ) => {
    e.stopPropagation();
    setSelectedImage(index);
  };

  const handleCloseModal = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setSelectedImage(null);
  };
  const handleLeftArrowClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setSelectedImage(selectedImage - 1);
  };

  const handleRightArrowClick = (e) => {
    e.stopPropagation();
    setSelectedImage(selectedImage + 1);
  };
  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <div key={index} className="image-container">
          <img
            src={image}
            alt={`Image ${index}`}
            className="thumbnail"
            onClick={(e) => handleImageClick(e, index)}
          />
        </div>
      ))}

      {selectedImage != null && (
        <div className="modalss">
          <div className="modal-content">
            {selectedImage ? (
              <button
                className="left-button nav-button lr-button"
                onClick={(e) => handleLeftArrowClick(e)}
              >
                {"<"}{" "}
              </button>
            ) : null}
            <img
              src={images[selectedImage]}
              alt="Selected Image"
              className="selected-image"
            />
            <button
              className="close-button nav-button"
              onClick={(e) => {
                handleCloseModal(e);
              }}
            >
              X
            </button>
            {images[selectedImage + 1] ? (
              <button
                className="right-button nav-button lr-button"
                onClick={(e) => {
                  handleRightArrowClick(e);
                }}
              >
                {">"}
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
