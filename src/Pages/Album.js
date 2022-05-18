import React from 'react';
import Header from '../Components/Header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album Component</p>
      </div>);
  }
}

export default Album;
