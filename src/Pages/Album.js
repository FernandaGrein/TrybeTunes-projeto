import propTypes from 'prop-types';
import React from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    musicArray: [],
    colectionName: '',
    artistName: '',
    loading: false,
    loadingFav: false,
    favoriteList: [],
  }

  componentDidMount() {
    this.fetchMusics();
    this.returnSong();
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
    const { musicArray, favoriteList } = this.state;
    this.setState({ loading: true });
    const getSong = musicArray.filter((elemt) => (elemt.trackName === favSong.name));
    favoriteList.push(getSong[0]);
    console.log(getSong[0]);
    await addSong(getSong[0]);
    this.setState({ loading: false });
  }

  returnSong = async () => {
    this.setState({ loadingFav: true });
    const favoriteList = await getFavoriteSongs();
    this.setState({ favoriteList, loadingFav: false });
  }

  isFavorite = (musicparam) => {
    const { favoriteList } = this.state;
    // console.log(favoriteList);
    return favoriteList.some((music) => music.trackId === musicparam.trackId);
  }

  render() {
    const { musicArray, colectionName, artistName, loading, loadingFav } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">{artistName}</h3>
        <h4 data-testid="album-name">{colectionName}</h4>
        { loadingFav && <Loading /> }
        { loading && <Loading /> }
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
                  checked={ this.isFavorite(item) }
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
