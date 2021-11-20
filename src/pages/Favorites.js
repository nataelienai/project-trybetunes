import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      favoriteSongs: [],
      isLoading: true,
    };

    this.fetchFavoriteSongs = this.fetchFavoriteSongs.bind(this);
    this.removeFavoriteSong = this.removeFavoriteSong.bind(this);
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  async fetchFavoriteSongs() {
    this.setState({
      favoriteSongs: await getFavoriteSongs(),
      isLoading: false,
    });
  }

  removeFavoriteSong(song) {
    this.setState({ isLoading: true }, async () => {
      await removeSong(song);
      this.fetchFavoriteSongs();
    });
  }

  render() {
    const { favoriteSongs, isLoading } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading ? <Loading /> : (
          favoriteSongs.map((song) => (
            <MusicCard
              key={ song.trackId }
              song={ song }
              isFavorite
              handleInputChange={ () => this.removeFavoriteSong(song) }
            />
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
