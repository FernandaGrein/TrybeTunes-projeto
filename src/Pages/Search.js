import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  state = {
    bandName: '',
    disabled: true,
  }

  getBandName = (event) => {
    const { value } = event.target;
    const minValue = 2;
    this.setState({ bandName: value }, () => (
      value.length >= minValue ? this.setState({ disabled: false }) : (
        this.setState({ disabled: true })
      )));
  }

  render() {
    const { bandName, disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="name">
            Nome:
            <input
              id="name"
              type="text"
              value={ bandName }
              data-testid="search-artist-input"
              onChange={ this.getBandName }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ disabled }
          >
            Pesquisar
          </button>
        </form>
      </div>);
  }
}

export default Search;
