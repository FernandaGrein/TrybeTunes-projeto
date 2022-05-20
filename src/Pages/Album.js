import propTypes from 'prop-types';
import React from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    musicArray: [],
    colectionName: '',
    artistName: '',
    loading: false,
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
    const { favoriteList } = this.state;

    const isCheked = favoriteList.some((music) => (music.trackName === favSong.name));

    if (isCheked) {
      this.removeFromFavorites(favSong.name);
    } else {
      this.saveOnFavorites(favSong.name);
    }
  }

  saveOnFavorites = async (songName) => {
    // console.log('na função de salvar', songName);
    const { musicArray, favoriteList } = this.state;
    this.setState({ loading: true });
    const getSong = musicArray.filter((elemt) => (elemt.trackName === songName));
    favoriteList.push(getSong[0]);
    // console.log(getSong[0]);
    await addSong(getSong[0]);
    this.setState({ loading: false });
    // console.log(favoriteList);
  }

  removeFromFavorites = async (songName) => {
    const { favoriteList } = this.state;
    // console.log('na função de remover', songName);
    const musicToRemove = favoriteList.filter((elemt) => (elemt.trackName === songName));
    this.setState({ loading: true });
    await removeSong(musicToRemove[0]);
    console.log(favoriteList);
    const newList = favoriteList.filter((item) => (item.trackName !== songName));
    this.setState({ favoriteList: newList, loading: false });
  }

  returnSong = async () => {
    this.setState({ loading: true });
    const favoriteList = await getFavoriteSongs();
    this.setState({ favoriteList, loading: false });
  }

  isFavorite = (musicparam) => {
    const { favoriteList } = this.state;
    return favoriteList.some((music) => music.trackId === musicparam.trackId);
  }

  render() {
    const { musicArray, colectionName, artistName, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h3 data-testid="artist-name">{artistName}</h3>
        <h4 data-testid="album-name">{colectionName}</h4>
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
