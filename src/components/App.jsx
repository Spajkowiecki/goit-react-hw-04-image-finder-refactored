import { Component, useEffect } from 'react';
import style from './App.module.css';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import axios from 'axios';
import SearchBar from './SearchBar/SearchBar';
import Statistics from './Statistics/Statistics';

import PropTypes from 'prop-types';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '32705986-6617e254891a5833ed9977223';
const allStates = {
  querry: '', //! database querry
  isLoading: false, //! waiting for response
  perPage: 12, //! limit images per quarry
  activePage: 1, //! active page
  hits: [], //! empty array for storing hits
  error: null,
  totalHits: 0, //! total hits
  total: 0, //! total images
  isModalOpen: false,
  selectedImage: '',
  showButton: false,
};
//example link https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

export default function App()
{
  //setting basics states for searching, statistics and display

  const [API_KEY] = setState('32705986-6617e254891a5833ed9977223');

  //! database querry
  const [querry, setQuerry] = setState('');

  //! active page
  const [activePage, setActivePage] = setState(0);

  //! limit images per quarry
  const [perPage, setPerPage] = setState(12);

  //! empty array for storing hits
  const [hits, setHits] = setState([]);

  //! total hits
  const [totalHits, setTotalHits] = setState(0);

  //! total images
  const [total, setTotal] = setState(0);
  //
  //! waiting for response
  const [isLoading, setIsLoading] = setState(false);
  const [error, setError] = setState(null);

  //
  const [selectedImage, setSelectedImage] = setState('');
  const [isModalOpen, setIsModalOpen] = setState(false);

  const [showButton, setShowButton] = setState(false);


  useEffect(() =>{
    apiCall = async () =>
    {
      setIsLoading(true);
      setShowButton(false);
    }
  }, [])

}

class App extends Component {
  //! refactorisation of application
  //? setting the default props from preventing errors before they are loaded in
  static defaultProps = {
    ...allStates,
  };

  // search - field to write new Querries for searching images, need to update galleryImage after sending request

  state = {
    ...allStates,
  };

  //! sending request to API
  apiCall = async () => {
    const { querry, activePage, perPage } = this.state;
    this.setState({ isLoading: true, showButton: false });
    try {
      const { data } = await axios.get(
        `?key=${API_KEY}&q=${querry}&page=${activePage}&per_page=${perPage}&image_type=photo&orientation=horizontal`
      );

      // const newHits = data.hits.filter(
      //   newImage =>
      //     !this.state.hits.some(
      //       existingImage => existingImage.id === newImage.id
      //     )
      // );
      //? setting states after getting querry response

      this.setState({
        hits: [...this.state.hits, ...data.hits],
        total: data.total,
        totalHits: data.totalHits,
      });

      // this.setState({
      //   hits: data.hits,
      //   total: data.total,
      //   totalHits: data.totalHits,
      // });

      console.log('1: APICALL[DATA]:', data.hits);
    } catch (error) {
      console.log('APICALL[ERROR]: ', error.message);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false, showButton: true });
    }
  };
  componentDidUpdate(_, prevState) {
    console.log('[CDU]------->');
    if (
      prevState.activePage !== this.state.activePage ||
      this.state.querry !== prevState.querry
    ) {
      this.apiCall();
    }
  }

  updateSearchValue = value => {
    this.setState({ querry: value.trim(), hits: [], activePage: 1 });
  };

  keyPressEvent = event => {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  };

  clickEvent = event => {
    if (event.target.nodeName !== 'IMG') {
      this.closeModal();
    }
  };

  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
    window.addEventListener('keydown', this.keyPressEvent);
    window.addEventListener('click', this.clickEvent);
    document.body.style.overflowY = 'hidden';
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
    document.body.style.overflowY = 'auto';
    window.removeEventListener('keypress', this.keyPressEvent);
    window.removeEventListener('click', this.clickEvent);
  };

  handleSelectImage = value => {
    this.setState({
      selectedImage: value,
    });

    this.openModal();
  };

  //!Hide / Show for loading more photos
  showLoadMoreButton = () => {
    const { total, hits, activePage } = this.state;
    if (hits.length > 0 && total - activePage * 12 > 0) {
      return false;
    }
    if (total - activePage * 12 < 0) {
      return true;
    }
  };

  //! Next page function, changing state of activePage
  handleNextPage = () => {
    this.setState(prev => ({
      activePage: prev.activePage + 1,
    }));
  };

  render() {
    const {
      hits,
      total,
      isLoading,
      selectedImage,
      isModalOpen,
      error,
      showButton,
    } = this.state;
    return (
      <div className={style.container}>
        {isModalOpen && (
          <Modal>
            <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
          </Modal>
        )}
        <header>
          <SearchBar value={this.updateSearchValue} />
        </header>
        <main>
          <Statistics
            toLoad={total}
            loadedImages={this.state.activePage * this.state.perPage}
          />
          {isLoading && <Loader />}
          {error && <p>Something went wrong...</p>}
          <ImageGallery
            selectedImage={this.handleSelectImage}
            images={[...hits]}
          />
        </main>
        {showButton === true ? <Button nextPage={this.handleNextPage} /> : null}
      </div>
    );
  }
}

App.propTypes = {
  querry: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  perPage: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  hits: PropTypes.array.isRequired,
  error: PropTypes.object,
  totalHits: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  selectedImage: PropTypes.string.isRequired,
};

export default App;
