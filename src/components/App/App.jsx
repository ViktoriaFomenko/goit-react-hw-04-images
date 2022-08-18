import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import css from './App.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import APIServise from '../../ApiServise/ApiServise';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    largeImageURL: '',
    totalLength: 0,
    isLoading: false,
    showModal: false,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });

      try {
        const response = await APIServise(query, page);
        const addImages = response.hits;
        this.setState(({ images, page }) => ({
          images: [...images, ...addImages],
          totalLength: response.totalHits,
        }));
        if (response.total === 0) {
          this.setState({ error: toast.info(`No results for ${query}!`) });
        }
      } catch (error) {
        this.setState({ error: toast.error('Something went wrong...') });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSubmit = value => {
    if (value.trim() === '') {
      return toast.warning('Please enter something!');
    }

    this.setState({
      images: [],
      query: value,
      page: 1,
    });
  };

  openModal = largeImageURL => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  LoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images, isLoading, showModal, error, largeImageURL, totalLength } =
      this.state;
    return (
      <div className={css.App}>
        <ToastContainer autoClose={2000} position="top-center" closeOnClick />
        <Searchbar onSubmit={this.handleSubmit} />

        {images.length > 0 && !error && (
          <ImageGallery images={images} openModal={this.openModal} />
        )}

        {!isLoading && images.length !== totalLength && !error && (
          <Button onClick={this.LoadMore} />
        )}

        {isLoading && <Loader />}
        {showModal && (
          <Modal onClose={this.toggleModal} largeImageURL={largeImageURL} />
        )}
      </div>
    );
  }
}
