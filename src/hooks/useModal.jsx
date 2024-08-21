import { useCallback, useEffect } from 'react';
import { useState } from 'react';

export default function useModal(setIsLoading) {
  // Funkcje obsługi zdarzeń z użyciem useCallback
  const [selectedImage, setSelectedImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(true);
    setSelectedImage(value);
  };

  return {
    isModalOpen,
    selectedImage,
    setIsModalOpen,
    handleSelectImage,
  };
}
