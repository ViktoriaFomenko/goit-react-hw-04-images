import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({
      query: '',
    });
  };

  render() {
    const { query } = this.state;
    return (
      <header className={css.searchbar} onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
