import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      isLoading: true,
    };

    this.fetchSongs = this.fetchSongs.bind(this);
    this.getArtistName = this.getArtistName.bind(this);
    this.getAlbumName = this.getAlbumName.bind(this);
    this.getAlbumCoverSource = this.getAlbumCoverSource.bind(this);
  }

  componentDidMount() {
    this.fetchSongs();
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

  async fetchSongs() {
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);

    this.setState({ songs, isLoading: false });
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
              <MusicCard key={ song.trackId } { ...song } />
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
