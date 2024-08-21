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
import useModal from 'hooks/useModal';
// Przykładowy link: https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12

export default function App() {
  // Definiowanie stanów
  // Poprawna definicja setTotal

  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { total, error, hits, updateSearchValue } = useApi(
    activePage,
    setIsLoading
  );
  const { showButton, handleNextPage } = usePagination(
    total,
    activePage,
    setActivePage
  );

  const { isModalOpen, selectedImage, handleSelectImage } =
    useModal(setIsLoading);

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
