import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    bandName: '',
    disabled: true,
    loading: false,
    saveName: '',
    apiResponse: [],
  }

  getBandName = (event) => {
    const { value } = event.target;
    const minValue = 2;
    this.setState({ bandName: value, saveName: value }, () => (
      value.length >= minValue ? this.setState({ disabled: false }) : (
        this.setState({ disabled: true })
      )));
  }

  handleClick = async () => {
    const { saveName } = this.state;
    this.setState({ bandName: '', loading: true });
    const albuns = await searchAlbumsAPI(saveName);
    this.setState({ apiResponse: albuns, loading: false });
  }

  render() {
    const { bandName, disabled, loading, apiResponse, saveName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading && <Loading /> }
        { apiResponse.length > 0 ? (<div>
          <p>{`Resultado de álbuns de: ${saveName}`}</p>
          {apiResponse.map((album) => (
            <div key={ album.collectionId }>
              <p>{album.artistId}</p>
              <p>{album.artistName}</p>
              <p>{album.collectionId}</p>
              <p>{album.collectionName}</p>
              <p>{album.collectionPrice}</p>
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                Album
              </Link>
              <img src={ album.artworkUrl100 } alt={ album.artistName } />
              <p>{album.trackCount}</p>
            </div>
          ))}
        </div>) : (<p>Nenhum álbum foi encontrado</p>)}
        <form>
          <label htmlFor="bandName">
            Nome:
            <input
              id="bandName"
              type="text"
              value={ bandName }
              data-testid="search-artist-input"
              onChange={ this.getBandName }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
      </div>);
  }
}

export default Search;
