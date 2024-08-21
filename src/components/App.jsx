import { useState, useEffect, useCallback } from 'react';
import style from './App.module.css';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';

import SearchBar from './SearchBar/SearchBar';
import Statistics from './Statistics/Statistics';
import useApi from 'hooks/useApi';
import usePagination from 'hooks/usePagination';
// Przykładowy link: https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

export default function App() {
  // Definiowanie stanów
  // Poprawna definicja setTotal

  const [selectedImage, setSelectedImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { total, error, hits, isLoading, setIsLoading, updateSearchValue } =
    useApi(handleNextPage);
  const { showButton, handleNextPage } = usePagination();

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

  const handleSelectImage = value => {
    setIsLoading(true);
    setSelectedImage(value);
    setIsModalOpen(true);
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
