import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      favoriteSongs: [],
      isLoading: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.getArtistName = this.getArtistName.bind(this);
    this.getAlbumName = this.getAlbumName.bind(this);
    this.getAlbumCoverSource = this.getAlbumCoverSource.bind(this);
    this.isFavorite = this.isFavorite.bind(this);
    this.fetchSongs = this.fetchSongs.bind(this);
    this.fetchFavoriteSongs = this.fetchSongs.bind(this);
  }

  componentDidMount() {
    this.fetchSongs();
  }

  handleInputChange({ target: { checked } }, song) {
    this.setState({ isLoading: true }, async () => {
      if (checked) await addSong(song);
      else await removeSong(song);

      await this.fetchFavoriteSongs();

      this.setState({ isLoading: false });
    });
  }

  getArtistName() {
    const { songs } = this.state;
    return songs[0].artistName;
  }

  getAlbumName() {
    const { songs } = this.state;
    return songs[0].collectionName;
  }

  getAlbumCoverSource() {
    const { songs } = this.state;
    return songs[0].artworkUrl100;
  }

  isFavorite(trackId) {
    const { favoriteSongs } = this.state;
    const foundSong = favoriteSongs.find((song) => song.trackId === trackId);

    return Boolean(foundSong);
  }

  async fetchSongs() {
    const { match: { params: { id } } } = this.props;

    this.setState({
      songs: await getMusics(id),
      favoriteSongs: await getFavoriteSongs(),
      isLoading: false,
    });
  }

  async fetchFavoriteSongs() {
    this.setState({ favoriteSongs: await getFavoriteSongs() });
  }

  render() {
    const { songs, isLoading } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {isLoading ? <Loading /> : (
          <div>
            <img src={ this.getAlbumCoverSource() } alt="capa do álbum" />
            <h2 data-testid="album-name">{ this.getAlbumName() }</h2>
            <h3 data-testid="artist-name">{ this.getArtistName() }</h3>
            {songs.slice(1).map((song) => (
              <MusicCard
                key={ song.trackId }
                song={ song }
                isFavorite={ this.isFavorite(song.trackId) }
                handleInputChange={ (event) => this.handleInputChange(event, song) }
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
