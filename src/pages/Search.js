import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artist: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange({ target: { value } }) {
    this.setState({
      artist: value,
    });
  }

  render() {
    const { artist } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="search"
            name="artist"
            value={ artist }
            onChange={ this.handleInputChange }
            placeholder="Nome do artista"
            data-testid="search-artist-input"
          />
          <button
            type="button"
            disabled={ artist.length < 2 }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
