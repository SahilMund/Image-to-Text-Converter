
import React from "react";

const ImageWrapper = ({ uploadImage, loading }) => {
  return (
    <div className="image-wrapper">
      {loading ? (
        <h2 className='wraptext'>Processing... please wait</h2>
      ) : (
        <form>
          <input
            type="file"
            className="custom-file-input"
            name="image"
            onChange={e => uploadImage(e)}
          />
        </form>
      )}
    </div>
  );
};

export default ImageWrapper;
