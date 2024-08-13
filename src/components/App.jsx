import { useState, useEffect, useCallback } from 'react';
import style from './App.module.css';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import axios from 'axios';
import SearchBar from './SearchBar/SearchBar';
import Statistics from './Statistics/Statistics';

axios.defaults.baseURL = 'https://pixabay.com/api/';
// Przykładowy link: https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

export default function App() {
  // Definiowanie stanów
  const [API_KEY] = useState('32705986-6617e254891a5833ed9977223');
  const [querry, setQuerry] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [perPage] = useState(12); // Nie potrzebujemy setPerPage, ponieważ wartość się nie zmienia
  const [hits, setHits] = useState([]);
  const [total, setTotal] = useState(0); // Poprawna definicja setTotal
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Funkcje obsługi zdarzeń z użyciem useCallback
  const keyPressEvent = useCallback(
    event => {
      if (event.key === 'Escape') {
        closeModal();
      }
    },
    [] // Brak zależności, funkcja jest stabilna
  );

  const clickEvent = useCallback(
    event => {
      if (event.target.nodeName !== 'IMG') {
        closeModal();
      }
    },
    [] // Brak zależności, funkcja jest stabilna
  );

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflowY = 'auto';
  };

  useEffect(() => {
    const callToApi = async () => {
      setShowButton(false);
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `?key=${API_KEY}&q=${querry}&page=${activePage}&per_page=${perPage}&image_type=photo&orientation=horizontal`
        );
        setHits(prevHits => [...prevHits, ...data.hits]); // Dodawanie nowych wyników do poprzednich
        setTotal(data.totalHits);
      } catch (error) {
        console.log(`[API ERROR] -> Są problemy z ładowaniem obrazów:`, error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (querry) {
      callToApi();
    }
  }, [querry, activePage, API_KEY, perPage]);

  useEffect(() => {
    if (activePage * perPage < total) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [activePage, perPage, total]);

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('keydown', keyPressEvent);
      window.addEventListener('click', clickEvent);
      document.body.style.overflowY = 'hidden'; // Zapobieganie przewijaniu strony pod modalem
    }

    return () => {
      window.removeEventListener('keydown', keyPressEvent);
      window.removeEventListener('click', clickEvent);
      document.body.style.overflowY = 'auto';
    };
  }, [isModalOpen, keyPressEvent, clickEvent]);

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
    setActivePage(prevPage => prevPage + 1);
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
        <Statistics toLoad={total} loadedImages={hits.length} />
        {isLoading && <Loader />}
        {error && <p>Coś poszło nie tak...</p>}
        <ImageGallery selectedImage={handleSelectImage} images={hits} />
      </main>
      {showButton && <Button nextPage={handleNextPage} />}
    </div>
  );
}
