import PropTypes from 'prop-types';
import style from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ image, clickedImage }) {
  return (
    <li
      className={style.galleryItem}
      onClick={ev => clickedImage(image)}
      id={image.id}
    >
      <div className={style.photo}>
        <img src={image.webformatURL} alt={image.tags}></img>
      </div>
      <p>{image.id}</p>
      <div className={style.stats}>
        <span>
          <svg>
            <path d="M30 19v-5c0-1.654-1.346-3-3-3-0.535 0-1.037 0.14-1.472 0.386-0.534-0.833-1.467-1.386-2.528-1.386-0.768 0-1.469 0.29-2 0.766-0.531-0.476-1.232-0.766-2-0.766-0.35 0-0.687 0.060-1 0.171v-7.171c0-1.654-1.346-3-3-3s-3 1.346-3 3v12.334l-5.501-2.932c-0.454-0.262-0.973-0.401-1.499-0.401-1.654 0-3 1.346-3 3 0 0.824 0.327 1.592 0.922 2.163 0.008 0.007 0.015 0.015 0.023 0.022l7.474 6.815h-1.419c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h20c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1h-1.382l2.276-4.553c0.069-0.139 0.106-0.292 0.106-0.447zM28 27c0 0.552-0.448 1-1 1s-1-0.448-1-1 0.448-1 1-1 1 0.448 1 1zM28 18.764l-2.618 5.236h-11.995l-9.088-8.286c-0.193-0.19-0.299-0.443-0.299-0.714 0-0.551 0.449-1 1-1 0.171 0 0.332 0.041 0.479 0.122 0.017 0.010 0.033 0.020 0.051 0.029l7 3.732c0.31 0.165 0.684 0.156 0.985-0.025s0.485-0.506 0.485-0.857v-14c0-0.551 0.449-1 1-1s1 0.449 1 1v10c0 0.552 0.448 1 1 1s1-0.448 1-1c0-0.551 0.449-1 1-1s1 0.449 1 1c0 0.552 0.448 1 1 1s1-0.448 1-1c0-0.551 0.449-1 1-1s1 0.449 1 1v1c0 0.552 0.448 1 1 1s1-0.448 1-1c0-0.551 0.449-1 1-1s1 0.449 1 1v4.764z"></path>
          </svg>
          {image.likes}
        </span>
        <span>
          <svg>
            <path d="M16 6c-6.979 0-13.028 4.064-16 10 2.972 5.936 9.021 10 16 10s13.027-4.064 16-10c-2.972-5.936-9.021-10-16-10zM23.889 11.303c1.88 1.199 3.473 2.805 4.67 4.697-1.197 1.891-2.79 3.498-4.67 4.697-2.362 1.507-5.090 2.303-7.889 2.303s-5.527-0.796-7.889-2.303c-1.88-1.199-3.473-2.805-4.67-4.697 1.197-1.891 2.79-3.498 4.67-4.697 0.122-0.078 0.246-0.154 0.371-0.228-0.311 0.854-0.482 1.776-0.482 2.737 0 4.418 3.582 8 8 8s8-3.582 8-8c0-0.962-0.17-1.883-0.482-2.737 0.124 0.074 0.248 0.15 0.371 0.228v0zM16 13c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3z"></path>
          </svg>
          {image.views}
        </span>
        <span>
          <svg>
            <path d="M16 18l8-8h-6v-8h-4v8h-6zM23.273 14.727l-2.242 2.242 8.128 3.031-13.158 4.907-13.158-4.907 8.127-3.031-2.242-2.242-8.727 3.273v8l16 6 16-6v-8z"></path>
          </svg>
          {image.downloads}
        </span>
      </div>
    </li>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
