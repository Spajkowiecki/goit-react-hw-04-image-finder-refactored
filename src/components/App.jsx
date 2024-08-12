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

  const callToApi = async () => {
    //? 1. at first we need to turn on loading spinner to show for user that data are loaded
    setIsLoading(true);
    try {
      //? 3. Calling for data for API, destructured object {data}
      const { data } = await axios.get(
        `?key=${API_KEY}&q=${querry}&page=${activePage}&per_page=${perPage}&image_type=photo&orientation=horizontal`
      );
      //? 4. Apply data to variables
      setHits(data.hits); //! hits
      setTotalHits(data.totalHits); //! totalHits
      setTotal(data.total); //! total
    } catch (error) {
      //when error occurs
      console.log(
        `[API ERROR] -> There are problems with images loading:`,
        error
      );
    } finally {
      //? 2. turn of loading spinner when loading images are finished(status: 200 | status: error)
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getImages = async () => {
      setIsLoading(true);
      console.log('WAITING FOR RESPONSE...');
      try {
        //destructured to get data from response
        const { data } = await axios.get(
          `?key=${API_KEY}&q=${querry}&page=${activePage}&per_page=${perPage}&image_type=photo&orientation=horizontal`
        );
        console.log(data);
        //----------------------------
        if (activePage > 1) {
          setHits(prevHits => [...prevHits, ...data.hits]);
        } else {
          setHits(data.hits);
        }
        setTotal(data.total);
        setTotalHits(data.totalHits);
        //----------------------------
      } catch (error) {
        console.log('[ERROR]: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [querry, activePage, API_KEY, perPage]);

  //@ DOROBIC SPRAWDZANIE ILOSCI OBRAZÓW
  useEffect(() => {
    console.log(`total: ${total} | totalHits: ${totalHits} | hits:`, hits);
  }, [total, totalHits, hits]);

  useEffect(() => {
    if (isModalOpen) {
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

      window.addEventListener('keydown', keyPressEvent);
      window.addEventListener('click', clickEvent);
      document.body.style.overflowY = 'hidden';

      return () => {
        window.removeEventListener('keydown', keyPressEvent);
        window.removeEventListener('click', clickEvent);
        document.body.style.overflowY = 'auto';
      };
    }
  }, [isModalOpen]);

  const updateSearchValue = value => {
    setQuerry(value.trim());
    setHits([]);
    setActivePage(1);
  };

  const handleSelectImage = value => {
    setSelectedImage(value);
    setIsModalOpen(true);
  };

  const handleNextPage = () => {
    setActivePage(activePage + 1);
  };

  const showLoadMoreButton = () => {
    if (hits.length > 0 && total - activePage * 12 > 0) {
      return false;
    }
    if (total - activePage * 12 < 0) {
      return true;
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflowY = 'auto';
    window.removeEventListener('keypress', keyPressEvent);
    window.removeEventListener('click', clickEvent);
  };

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

  return (
    <div className={style.container}>
      {isModalOpen && (
        <Modal>
          <img src={selectedImage.largeImageURL} alt={selectedImage.tags} />
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
