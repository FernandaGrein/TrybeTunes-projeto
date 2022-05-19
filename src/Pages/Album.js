import propTypes from 'prop-types';
import React from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { addSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    musicArray: [],
    colectionName: '',
    artistName: '',
    loading: false,
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { location: { pathname } } = this.props;
    const id = pathname.split('/album/');
    const music = await getMusics(id[1]);
    this.setState({ musicArray: music }, () => this.getAlbumAndArtistName());
  }

  getAlbumAndArtistName = () => {
    const { musicArray } = this.state;
    const firstIndex = musicArray[0];
    this.setState({ colectionName: firstIndex.collectionName,
      artistName: firstIndex.artistName });
  }

  getTarget = async (event) => {
    const favSong = event.target;
    const { musicArray } = this.state;
    this.setState({ loading: true });
    const getSong = musicArray.filter((elemt) => (elemt.trackName === favSong.name));
    await addSong(getSong);
    this.setState({ loading: false });
  }

  render() {
    const { musicArray, colectionName, artistName, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading && <Loading /> }
        <h3 data-testid="artist-name">{artistName}</h3>
        <h4 data-testid="album-name">{colectionName}</h4>
        <section>
          MusicCard
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
        </section>
      </div>);
  }
}

Album.propTypes = {
  location: propTypes.objectOf(propTypes.string).isRequired,
};

export default Album;
