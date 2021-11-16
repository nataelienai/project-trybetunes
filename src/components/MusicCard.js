import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFavorite: false,
      isLoading: false,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange({ target: { checked } }) {
    if (checked) {
      this.setState({ isLoading: true }, async () => {
        const { song } = this.props;

        await addSong(song);
        this.setState({ isFavorite: checked, isLoading: false });
      });
    } else {
      this.setState({ isLoading: true }, async () => {
        const { song } = this.props;

        await removeSong(song);
        this.setState({ isFavorite: checked, isLoading: false });
      });
    }
  }
  // this.setState({ isLoading: true }, async () => {
  //   const { song } = this.props;

  //   if (checked) await addSong(song);
  //   else await removeSong(song);

  //   this.setState({ isFavorite: checked, isLoading: false });
  // });
  render() {
    const { song: { trackId, trackName, previewUrl } } = this.props;
    const { isFavorite, isLoading } = this.state;

    return (
      <div>
        {isLoading ? <Loading /> : (
          <>
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              Este navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <label htmlFor="favorite">
              <input
                type="checkbox"
                name="favorite"
                id="favorite"
                checked={ isFavorite }
                onChange={ this.handleInputChange }
                data-testid={ `checkbox-music-${trackId}` }
              />
              Favorita
            </label>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;
