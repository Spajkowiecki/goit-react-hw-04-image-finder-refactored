import { useState, useEffect } from 'react';
import style from './App.module.css';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import axios from 'axios';
import SearchBar from './SearchBar/SearchBar';
import Statistics from './Statistics/Statistics';

axios.defaults.baseURL = 'https://pixabay.com/api/';
//example link https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

export default function App() {
  //setting basics states for searching, statistics and display

  const [API_KEY] = useState('32705986-6617e254891a5833ed9977223');

  //! database querry
  const [querry, setQuerry] = useState('');

  //! active page
  const [activePage, setActivePage] = useState(1);

  //! limit images per quarry
  const [perPage, setPerPage] = useState(12);

  //! empty array for storing hits
  const [hits, setHits] = useState([]);

  //! total hits
  const [totalHits, setTotalHits] = useState(0);

  //! total images
  const [total, setTotal] = useState(0);
  //
  //! waiting for response
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //
  const [selectedImage, setSelectedImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [showButton, setShowButton] = useState(false);

  //just on stert and for the core changes

  useEffect(() => {
    const callToApi = async () => {
      //? 1. at first we need to turn on loading spinner to show for user that data are loaded
      setShowButton(false);
      setIsLoading(true);
      try {
        //? 3. Calling for data for API, destructured object {data}
        const { data } = await axios.get(
          `?key=${API_KEY}&q=${querry}&page=${activePage}&per_page=${perPage}&image_type=photo&orientation=horizontal`
        );
        //? 4. Apply data to variables
        //! when querry not change, but page is we need to add photos together to array
        setHits(data.hits); //! hits
        setTotalHits(data.totalHits); //! totalHits
        setTotal(data.total); //! total
      } catch (error) {
        //when error occurs
        console.log(
          `[API ERROR] -> There are problems with images loading:`,
          error
        );
        setError(error);
      } finally {
        //? 2. turn of loading spinner when loading images are finished(status: 200 | status: error)
        setIsLoading(false);
      }
    };

    callToApi();
  }, [querry, activePage, API_KEY, perPage]);

  //@ DOROBIC SPRAWDZANIE ILOSCI OBRAZÓW
  useEffect(() => {
    //! calculations to determine when button ( + ) should show
    if (activePage * perPage <= total) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
    //!-----------------------------------
  }, [activePage, perPage, total]);

  useEffect(() => {
    //! everything with modal

    if (isModalOpen) {
      window.addEventListener('keypress', keyPressEvent);
      window.addEventListener('click', clickEvent);
    }

    return () => {
      window.removeEventListener('keydown', keyPressEvent);
      window.removeEventListener('click', clickEvent);
      document.body.style.overflowY = 'auto';
    };
  }, [isModalOpen]);

  const keyPressEvent = event => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  const clickEvent = event => {
    if (event.target.nodeName !== 'IMG') {
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflowY = 'auto';
    window.removeEventListener('keydown', keyPressEvent);
    window.removeEventListener('click', clickEvent);
  };

  const updateSearchValue = value => {
    setQuerry(value.trim());
    setHits([]);
    setActivePage(1);
  };

  const handleSelectImage = value => {
    setIsLoading(true);
    setSelectedImage(value);
    setIsModalOpen(true);
  };

  const handleNextPage = () => {
    setActivePage(activePage + 1);
  };

  return (
    <div className={style.container}>
      {isModalOpen && (
        <Modal>
          {isLoading && <Loader />}
          <img
            onLoad={() => setIsLoading(false)}
            src={selectedImage.largeImageURL}
            alt={selectedImage.tags}
          />
        </Modal>
      )}
      <header>
        <SearchBar value={updateSearchValue} />
      </header>
      <main>
        <Statistics toLoad={total} loadedImages={activePage * perPage} />
        {isLoading && <Loader />}
        {error && <p>Something went wrong...</p>}
        <ImageGallery selectedImage={handleSelectImage} images={[...hits]} />
      </main>
      {showButton ? <Button nextPage={handleNextPage} /> : null}
    </div>
  );
}
