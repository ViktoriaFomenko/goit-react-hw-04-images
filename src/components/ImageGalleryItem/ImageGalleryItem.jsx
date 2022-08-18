import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, tags, openModal }) => {
  return (
    <li className={css.item}>
      <img
        src={webformatURL}
        alt={tags}
        className={css.image}
        onClick={openModal}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
