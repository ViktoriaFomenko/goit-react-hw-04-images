import PropTypes from 'prop-types';
import React, { useState } from 'react';
import css from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <header className={css.searchbar} onSubmit={handleSubmit}>
      <form className={css.form}>
        <button type="submit" className={css.button}>
          <FiSearch size="16px" />
        </button>
        <input
          className={css.input}
          type="text"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
