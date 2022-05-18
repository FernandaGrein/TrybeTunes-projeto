import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
   state = {
     username: '',
     load: false,
   }

   componentDidMount() {
     this.getUserName();
   }

    getUserName = async () => {
      this.setState({ load: true });
      const fetch = await getUser();
      this.setState({ username: fetch.name, load: false });
    }

    render() {
      const { username, load } = this.state;
      return (
        <header data-testid="header-component">
          {load ? <Loading /> : (
            <p data-testid="header-user-name">{`Olá, ${username}`}</p>
          )}
          <nav>
            <Link data-testid="link-to-search" to="/search"> Search </Link>
            <Link data-testid="link-to-favorites" to="/favorites"> Favorites </Link>
            <Link data-testid="link-to-profile" to="/profile"> Profile </Link>
          </nav>
        </header>);
    }
}

export default Header;
