import { useEffect, useState } from 'react';
import useApi from './useApi';

export default function usePagination() {
  const [showButton, setShowButton] = useState(false);
  const [activePage, setActivePage] = useState(1);

  const { total } = useApi(activePage);

  useEffect(() => {
    console.log('total: ' + total);
    if (activePage * 12 < total) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [activePage, total]);

  const handleNextPage = () => {
    setActivePage(activePage + 1);
  };

  return {
    activePage,
    showButton,
    setShowButton,
    handleNextPage,
    setActivePage,
  };
}
