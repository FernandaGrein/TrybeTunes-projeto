import React from 'react';
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
        </header>);
    }
}

export default Header;
