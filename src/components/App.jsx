import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Searchbar from './Searchbar/Searchbar';
import { Container } from './App.styled';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMore from './LoadMore/LoadMore';
import { fetchPhotosByQuery } from 'services/Api';
import { Loader } from './Loader/Loader';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [showLoadMore, setShowLoadMore] = useState(false);

  useEffect(() => {
    if (!query) return;

    const getImage = async () => {
      setIsLoading(true);
      try {
        const { hits, totalHits } = await fetchPhotosByQuery(query, page);
        setImages(prevState => [...prevState, ...hits]);
        setShowLoadMore(page < Math.ceil(totalHits / 12));
        if (hits.length === 0) {
          return alert('Nothing found for your request. Please, try again');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getImage();
  }, [query, page]);

  const handleSearchbarSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setError(null);
    setIsLoading(false);
    setShowLoadMore(false);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSearchbarSubmit} />
      {isLoading && <Loader />}
      {images && <ImageGallery images={images} />}
      {showLoadMore && <LoadMore onClick={loadMore}>Load more</LoadMore>}
      {error && <h1>{error}</h1>}
    </Container>
  );
}

App.propTypes = {
  word: PropTypes.string,
  query: PropTypes.string,
  page: PropTypes.number,
  error: PropTypes.string,
  isLoading: PropTypes.bool,
  showLoadMore: PropTypes.bool,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      hits: PropTypes.array.isRequired,
      totalHits: PropTypes.number.isRequired,
    })
  ),
};
