import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export default function useApi(activePage, setIsLoading) {
  const [API_KEY] = useState('32705986-6617e254891a5833ed9977223');
  const [querry, setQuerry] = useState('');

  const [hits, setHits] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const callToApi = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `?key=${API_KEY}&q=${querry}&page=${activePage}&per_page=12&image_type=photo&orientation=horizontal`
        );
        setHits(prevHits => [...prevHits, ...data.hits]); // Dodawanie nowych wyników do poprzednich
        setTotal(data.total);
        if (activePage !== 1) {
          console.log('STRONA: ' + activePage);
        }
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
  }, [querry, activePage, setIsLoading, API_KEY]);

  const updateSearchValue = value => {
    if (value !== querry) {
      setQuerry(value.trim());
      setHits([]);
    }
  };

  return {
    total,
    error,
    hits,
    updateSearchValue,
  };
}
