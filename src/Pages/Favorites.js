import React from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  state = {
    loading: false,
    favoriteSongs: [],
  }

  componentDidMount() {
    this.getFavoriteSongs();
  }

  getFavoriteSongs = async () => {
    this.setState({ loading: true });
    const getSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs: getSongs, loading: false });
  }

  isFavorite = (musicparam) => {
    const { favoriteSongs } = this.state;
    return favoriteSongs.some((music) => music.trackId === musicparam.trackId);
  }

  removeSong = async (event) => {
    const song = event.target;
    const { favoriteSongs } = this.state;
    const musicToRemove = favoriteSongs.filter((elemt) => (
      elemt.trackName === song.name));
    this.setState({ loading: true });
    await removeSong(musicToRemove[0]);
    console.log(favoriteSongs);
    const newList = favoriteSongs.filter((item) => (item.trackName !== song.name));
    this.setState({ favoriteSongs: newList, loading: false });
  }

  render() {
    const { loading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading && <Loading /> }
        <section>
          MusicCard
          { favoriteSongs.map((item) => (
            <div key={ item.trackName }>
              <p>{item.trackName}</p>
              <label htmlFor={ item.trackId }>
                Favorita
                <input
                  id={ item.trackId }
                  type="checkbox"
                  checked={ this.isFavorite(item) }
                  data-testid={ `checkbox-music-${item.trackId}` }
                  onChange={ this.removeSong }
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

export default Favorites;
