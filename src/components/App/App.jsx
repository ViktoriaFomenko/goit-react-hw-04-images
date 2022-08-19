import { useState, useEffect } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import APIServise from '../../ApiServise/ApiServise';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalLength, setTotalLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    setIsLoading(true);
    try {
      const response = APIServise(query, page);
      const addImages = response.hits;

      setImages(images => [...images, ...addImages]);
      setTotalLength(response.totalLength);
      console.log(images);
      console.log(addImages);

      if (response.total === 0) {
        setError(toast.info(`No results for ${query}!`));
      }
    } catch (error) {
      setError(toast.error('Something went wrong...'));
    } finally {
      setIsLoading(false);
    }
  }, [page, query]);

  const handleSubmit = value => {
    if (value.trim() === '') {
      return toast.warning('Please enter something!');
    }

    setImages([]);
    setQuery(value);
    setPage(1);
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setLargeImageURL(largeImageURL);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const LoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.App}>
      <ToastContainer autoClose={2000} position="top-center" closeOnClick />
      <Searchbar onSubmit={handleSubmit} />

      {images.length > 0 && !error && (
        <ImageGallery images={images} openModal={openModal} />
      )}

      {!isLoading && images.length !== totalLength && !error && (
        <Button onClick={LoadMore} />
      )}

      {isLoading && <Loader />}
      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={largeImageURL} />
      )}
    </div>
  );
};
