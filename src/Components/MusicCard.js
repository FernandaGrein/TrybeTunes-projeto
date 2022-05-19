import React from 'react';
import propTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicArray, loading, loadingFav } = this.props;
    return (
      <>
        { loadingFav && <Loading /> }
        { loading && <Loading /> }
        { musicArray.filter((item) => item.trackId).map((item) => (
          <div key={ item.trackNumber }>
            <p>{item.trackName}</p>
            <label htmlFor={ item.trackId }>
              Favorita
              <input
                id={ item.trackId }
                type="checkbox"
                data-testid={ `checkbox-music-${item.trackId}` }
                onChange={ this.getTarget }
                name={ item.trackName }
              />
            </label>
            <audio data-testid="audio-component" src={ item.previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
          </div>
        )) }
      </>);
  }
}

Album.propTypes = {
  location: propTypes.objectOf(propTypes.string).isRequired,
};

export default MusicCard;
