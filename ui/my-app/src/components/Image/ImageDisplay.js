// ImageDisplay.js
import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import Loader from '../Loader/CustomLoader';
import SpinLoader from '../Loader/CustomSpinner';

const ImageDisplay = ({ imgPath, imgalt,width }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false); 
  };

  const handleImageError = () => {
    setImageLoaded(false);
    setImageError(true);
  };

  const imageStyle = {
    display: imageLoaded ? 'block' : 'none',
    ...(width && { width }),
    PointerEvent:'none'
  };

  if (!imgPath) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        <SpinLoader />
        No image path provided
      </div>
    );
  }

  return (
    <>
        {!imageLoaded && !imageError && <Loader />}
        {imageError && (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <br/><br/>
              <SpinLoader/>
              <br/><br/>
              Error loading image
            </div>
        )}
          <Image
            src={imgPath}
            alt={imgalt}
            style={imageStyle}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
    </>
  );
};

export default ImageDisplay;