import { Component } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import style from './ImageGallery.module.css';

class ImageGallery extends Component {
  getClickedImage = value => {
    this.props.selectedImage(value);
  };
  render() {
    const { images } = this.props;
    return (
      <ul className={style.gallery}>
        {images.map(image => {
          return (
            <ImageGalleryItem
              key={image.id}
              image={image}
              clickedImage={values => this.getClickedImage(values)}
            />
          );
        })}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;

//! THIS COMPONENT SHOULD RERENDER WHEN GALLERY CHANGE
