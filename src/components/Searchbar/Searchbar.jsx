import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import { ReactComponent as SearchIcon } from '../icons/searchIcon.svg';
import { SearchbarHeader, SearchForm, Input } from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [word, setWord] = useState('');

  const handleChangeWord = e => {
    setWord(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (word.trim() === '') {
      alert('Please, enter a search word!');
      return;
    }
    onSubmit(word);
    setWord('');
  };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handleSubmit}>
        <Button>
          <SearchIcon width="20" height="20" />
        </Button>
        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="word"
          value={word}
          onChange={handleChangeWord}
        />
      </SearchForm>
    </SearchbarHeader>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  word: PropTypes.string,
};
