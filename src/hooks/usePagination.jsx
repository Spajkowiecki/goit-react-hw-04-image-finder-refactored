import { useEffect, useState } from 'react';

export default function usePagination(total, activePage, setActivePage) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    console.log('total: ' + total);
    if (activePage * 12 < total) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [activePage, total]);

  const handleNextPage = () => {
    setActivePage(prevPage => prevPage + 1);
  };

  return {
    showButton,
    setActivePage,
    handleNextPage,
  };
}
