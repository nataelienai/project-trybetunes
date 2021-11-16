import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchedArtist: '',
      artistInput: '',
      albums: [],
      isLoading: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleInputChange({ target: { value } }) {
    this.setState({ artistInput: value });
  }

  handleButtonClick() {
    this.setState({ isLoading: true }, async () => {
      const { artistInput } = this.state;
      const albums = await searchAlbumsAPI(artistInput);

      this.setState({
        albums,
        searchedArtist: artistInput,
        artistInput: '',
        isLoading: false,
      });
    });
  }

  render() {
    const { searchedArtist, artistInput, albums, isLoading } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {isLoading ? <Loading /> : (
          <form>
            <input
              type="search"
              name="artistInput"
              value={ artistInput }
              onChange={ this.handleInputChange }
              placeholder="Nome do artista"
              data-testid="search-artist-input"
            />
            <button
              type="button"
              disabled={ artistInput.length < 2 }
              onClick={ this.handleButtonClick }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </form>
        )}
        {searchedArtist && <p>{`Resultado de álbuns de: ${searchedArtist}`}</p>}
        {albums.length === 0
          ? <p>Nenhum álbum foi encontrado</p>
          : albums.map(({ collectionId, collectionName }) => (
            <div key={ collectionId }>
              <Link
                to={ `/album/${collectionId}` }
                data-testid={ `link-to-album-${collectionId}` }
              >
                <h2>{ collectionName }</h2>
              </Link>
            </div>
          ))}
      </div>
    );
  }
}

export default Search;
