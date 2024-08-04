import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import style from './ImageGallery.module.css';

export default function ImageGallery({ images, selectedImage }) {
  return (
    <ul className={style.gallery}>
      {images.map(image => {
        return (
          <ImageGalleryItem
            key={image.id}
            image={image}
            clickedImage={values => selectedImage(values)}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

//! THIS COMPONENT SHOULD RERENDER WHEN GALLERY CHANGE
